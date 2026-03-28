import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import Firebase
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods

const Dashboard = () => {
  // 1. Firebase State
  const [userRole, setUserRole] = useState<'household' | 'distributor' | null>(null);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);

  // 2. Household Stats (Mock data)
  const [gasLevel] = useState(18);
  const [weight] = useState(2.25);
  const [daysLeft] = useState(4);

  // 3. Fetch User Data from Firestore
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

  // Mock data for a Distributor's fleet
  const customers = [
    { id: 'CUST-001', name: 'Kiki Aborisade', level: 18, location: 'Ikeja, Lagos', status: 'Urgent' },
    { id: 'CUST-002', name: 'John Doe', level: 45, location: 'Lekki, Lagos', status: 'Stable' },
    { id: 'CUST-003', name: 'Sarah Chen', level: 12, location: 'Surulere, Lagos', status: 'Urgent' },
    { id: 'CUST-004', name: 'Amaka Obi', level: 88, location: 'Victoria Island', status: 'Optimal' },
  ];

  // Mock data for the last 7 days (Household)
  const weeklyUsage = [
    { day: 'Mon', usage: 0.8 }, { day: 'Tue', usage: 1.2 }, { day: 'Wed', usage: 0.9 },
    { day: 'Thu', usage: 1.5 }, { day: 'Fri', usage: 1.1 }, { day: 'Sat', usage: 2.4 }, { day: 'Sun', usage: 1.8 },
  ];
  const maxUsage = Math.max(...weeklyUsage.map(u => u.usage));

  // 4. Loading State
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
            {/* GAUGE CARD */}
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

            {/* SIDE STATS */}
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
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            {[
              { label: 'Active Scales', val: '1,240', icon: 'sensors', color: 'text-blue-500' },
              { label: 'Urgent Refills', val: '42', icon: 'priority_high', color: 'text-red-500' },
              { label: 'Total Gas (MT)', val: '12.4', icon: 'database', color: 'text-gray-700' },
              { label: 'Revenue/mo', val: '₦2.4M', icon: 'payments', color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#abb3b7]/10 shadow-sm text-left">
                <div className="flex justify-between items-start mb-2">
                  <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
                </div>
                <p className="text-2xl font-headline font-black text-[#2b3437]">{stat.val}</p>
                <p className="text-xs font-bold text-[#586064] uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#abb3b7]/10">
            <h3 className="text-xl font-headline font-black text-[#2b3437] mb-6">Refill Priority Queue</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#f1f4f6] text-[10px] font-black text-[#abb3b7] uppercase tracking-widest">
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Level</th>
                  <th className="pb-4">Location</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f4f6]">
                {customers.map((cust, i) => (
                  <tr key={i} className="group hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-5">
                      <p className="font-bold text-[#2b3437] text-sm">{cust.name}</p>
                      <p className="text-[10px] text-[#abb3b7] font-bold uppercase tracking-tighter">{cust.id}</p>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-[#f1f4f6] rounded-full overflow-hidden">
                          <div className={`h-full ${cust.level < 20 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${cust.level}%` }} />
                        </div>
                        <span className={`text-xs font-black ${cust.level < 20 ? 'text-red-500' : 'text-[#2b3437]'}`}>{cust.level}%</span>
                      </div>
                    </td>
                    <td className="py-5 text-xs font-medium text-[#586064]">{cust.location}</td>
                    <td className="py-5"><button className="text-[10px] font-black uppercase text-[#0c56d0] hover:underline">Assign Driver</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="lg:col-span-4">
            <div className="bg-[#2b3437] rounded-[2.5rem] h-full p-8 text-white relative overflow-hidden min-h-[400px]">
              <h3 className="text-xl font-headline font-bold mb-2">Live Heatmap</h3>
              <p className="text-xs text-white/40 mb-8 font-medium">Concentration of "Urgent" status cylinders.</p>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                     <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                     <p className="text-[10px] font-bold text-left">Depletion alert in {customers[i-1].location}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;