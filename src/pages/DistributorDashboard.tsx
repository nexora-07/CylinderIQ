import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore'; 
// IMPORT YOUR NEW COMPONENT
import DistributorMap from '../components/DistributorMap'; 

const Dashboard = () => {
  const [userRole, setUserRole] = useState<'household' | 'distributor' | 'logistics' | null>(null);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);

  // --- NEW: State for real-time households ---
  const [households, setHouseholds] = useState<any[]>([]);

  const [gasLevel] = useState(18);
  const [weight] = useState(2.25);
  const [daysLeft] = useState(4);

  // 1. Fetch CURRENT Logged-in User Data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserName(data.fullName || 'User');
            setUserRole(data.role || 'household');
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, []);

  // 2. NEW: Real-time Listener for ALL Household users (Only for Distributors)
  useEffect(() => {
    if (userRole === 'distributor' || userRole === 'logistics') {
      const q = query(collection(db, "users"), where("role", "==", "household"));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          // Fallback gasLevel if it doesn't exist in DB yet
          gasLevel: doc.data().gasLevel || Math.floor(Math.random() * 100) 
        }));
        setHouseholds(data);
      });

      return () => unsubscribe();
    }
  }, [userRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="w-12 h-12 border-4 border-[#0c56d0]/20 border-t-[#0c56d0] rounded-full animate-spin" />
      </div>
    );
  }

  // --- HOUSEHOLD VIEW ---
  if (userRole === 'household') {
    return (
      <main className="min-h-screen bg-[#f8f9fa] pt-8 pb-12 px-6 font-body text-left">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
            <div className="text-left">
              <span className="text-[#0c56d0] font-bold text-xs uppercase tracking-[0.2em]">Active Terminal: Main Kitchen</span>
              <h1 className="text-3xl font-headline font-black text-[#2b3437] mt-1 text-left">
                Welcome back, <span className="text-[#0c56d0]">{userName}</span>
              </h1>
            </div>
            <Link to="/link-device" className="flex items-center gap-2 bg-white border-2 border-dashed border-[#abb3b7]/30 px-4 py-2 rounded-xl text-[#586064] hover:border-[#0c56d0] hover:text-[#0c56d0] transition-all group">
              <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">add</span>
              <span className="text-xs font-bold uppercase tracking-wider text-left">Add Hardware</span>
            </Link>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#abb3b7]/10">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="relative w-64 h-64">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="128" cy="128" r="110" stroke="#f1f4f6" strokeWidth="20" fill="transparent" />
                    <motion.circle cx="128" cy="128" r="110" stroke={gasLevel < 20 ? "#9f403d" : "#0c56d0"} strokeWidth="20" fill="transparent" strokeDasharray="691" animate={{ strokeDashoffset: 691 - (691 * gasLevel) / 100 }} transition={{ duration: 1.5 }} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-6xl font-headline font-black ${gasLevel < 20 ? 'text-[#9f403d]' : 'text-[#2b3437]'}`}>{gasLevel}%</span>
                    <span className="text-[10px] font-bold text-[#abb3b7] uppercase tracking-[0.2em]">Fuel Level</span>
                  </div>
                </div>
                <div className="flex-1 space-y-6 text-left">
                  <h3 className="text-[#586064] font-bold text-xs uppercase tracking-widest mb-2">Predictive Analysis</h3>
                  <p className="text-4xl font-headline font-black text-[#2b3437]">{daysLeft} Days <span className="text-lg font-medium text-[#abb3b7]">Estimated</span></p>
                  <button className="py-4 px-8 bg-[#0c56d0] text-white font-bold rounded-xl shadow-lg flex items-center gap-2">Order Refill</button>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[2rem] border border-[#abb3b7]/10 shadow-sm text-left">
                <h3 className="text-[#abb3b7] text-[10px] font-black uppercase tracking-widest">Net Gas Weight</h3>
                <p className="text-2xl font-headline font-bold text-[#2b3437]">{weight} kg</p>
              </div>
              <div className="bg-[#2b3437] p-8 rounded-[2rem] text-white text-left">
                <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest">Hardware Security</h3>
                <p className="text-xl font-bold italic">Telemetry Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- DISTRIBUTOR VIEW ---
  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-8 pb-12 px-6 font-body text-left">
      <div className="max-w-7xl mx-auto text-left">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div className="text-left">
            <span className="text-[#0c56d0] font-bold text-xs uppercase tracking-[0.2em]">Logistics Terminal: Lagos Central</span>
            <h1 className="text-3xl font-headline font-black text-[#2b3437] mt-1">Fleet Overview</h1>
            <p className="text-sm text-[#586064]">Welcome, <span className="font-bold">{userName}</span></p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-white border border-[#abb3b7]/30 rounded-xl font-bold text-xs text-[#586064]">Download Report</button>
            <button className="px-6 py-2 bg-[#0c56d0] text-white rounded-xl font-bold text-xs shadow-lg shadow-[#0c56d0]/20">Dispatch Truck</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Top Stats Cards */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            {[
              { label: 'Network Points', val: households.length, icon: 'sensors', color: 'text-blue-500' },
              { label: 'Urgent Refills', val: households.filter(h => h.gasLevel < 20).length, icon: 'priority_high', color: 'text-red-500' },
              { label: 'Total Gas (MT)', val: '12.4', icon: 'database', color: 'text-gray-700' },
              { label: 'Revenue/mo', val: '₦2.4M', icon: 'payments', color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#abb3b7]/10 shadow-sm text-left">
                <span className={`material-symbols-outlined mb-2 ${stat.color}`}>{stat.icon}</span>
                <p className="text-2xl font-headline font-black text-[#2b3437]">{stat.val}</p>
                <p className="text-xs font-bold text-[#586064] uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Left: Priority Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-6 bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#abb3b7]/10">
            <h3 className="text-xl font-headline font-black text-[#2b3437] mb-6">Refill Priority Queue</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#f1f4f6] text-[10px] font-black text-[#abb3b7] uppercase tracking-widest">
                    <th className="pb-4">Customer</th>
                    <th className="pb-4">Level</th>
                    <th className="pb-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f4f6]">
                  {households.sort((a,b) => a.gasLevel - b.gasLevel).slice(0, 5).map((cust, i) => (
                    <tr key={i} className="group hover:bg-[#f8f9fa] transition-colors">
                      <td className="py-5">
                        <p className="font-bold text-[#2b3437] text-sm">{cust.fullName}</p>
                        <p className="text-[10px] text-[#abb3b7] font-bold uppercase tracking-tighter truncate max-w-[150px]">{cust.address}</p>
                      </td>
                      <td className="py-5">
                        <span className={`text-xs font-black ${cust.gasLevel < 20 ? 'text-red-500' : 'text-[#2b3437]'}`}>{cust.gasLevel}%</span>
                      </td>
                      <td className="py-5 text-right">
                        <button className="text-[10px] font-black uppercase text-[#0c56d0] hover:underline">Assign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right: REAL-TIME MAP replacing mock heatmap */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-[#abb3b7]/10 h-full min-h-[500px]">
              <h3 className="text-xl font-headline font-black text-[#2b3437] mb-2 px-4 pt-4">Live Demand Map</h3>
              <p className="text-xs text-[#586064] mb-4 px-4 font-medium italic">Showing all active IoT terminals in the region.</p>
              
              {/* THE MAP COMPONENT */}
              <DistributorMap usersData={households} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;