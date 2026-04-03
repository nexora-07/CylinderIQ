import { motion } from 'framer-motion';
import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore'; 

const Dashboard = () => {
  // 1. Dynamic States
  const [gasLevel, setGasLevel] = useState(18);
  const [weight, setWeight] = useState(2.25);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);

  // Mock data for the last 7 days of consumption (in kg)
  const weeklyUsage = [
    { day: 'Mon', usage: 0.8 },
    { day: 'Tue', usage: 1.2 },
    { day: 'Wed', usage: 0.9 },
    { day: 'Thu', usage: 1.5 },
    { day: 'Fri', usage: 1.1 },
    { day: 'Sat', usage: 2.4 }, 
    { day: 'Sun', usage: 1.8 },
  ];

  // 2. SMART PREDICTION LOGIC
  const totalWeeklyUsage = weeklyUsage.reduce((acc, curr) => acc + curr.usage, 0);
  const avgDailyUsage = totalWeeklyUsage / 7;
  const currentKgLeft = gasLevel * 0.125;
  const daysLeft = Math.floor(currentKgLeft / avgDailyUsage) || 0;

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
            if(data.gasLevel) setGasLevel(data.gasLevel);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, []);

  const maxUsage = Math.max(...weeklyUsage.map(u => u.usage));

  if (loading) return <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center font-black text-[#0c56d0] animate-pulse">SYNCING TERMINAL...</div>;

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-24 pb-12 px-6 font-body text-left text-[#2b3437]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="text-left">
            <span className="text-[#0c56d0] font-bold text-xs uppercase tracking-[0.2em]">Active Terminal: Main Kitchen</span>
            <h1 className="text-4xl font-headline font-black text-[#2b3437] mt-1">
              Welcome back, <span className="text-[#0c56d0]">{userName}</span>
            </h1>
          </div>
          <Link to="/link-device" className="flex items-center gap-2 bg-white border-2 border-dashed border-[#abb3b7]/30 px-4 py-2 rounded-xl text-[#586064] hover:border-[#0c56d0] hover:text-[#0c56d0] transition-all group">
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">add</span>
            <span className="text-xs font-bold uppercase tracking-wider">Sync Hardware</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* GAUGE CARD */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#abb3b7]/10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="128" cy="128" r="110" stroke="#f1f4f6" strokeWidth="20" fill="transparent" />
                  <motion.circle 
                    cx="128" cy="128" r="110" 
                    stroke={gasLevel < 20 ? "#9f403d" : "#0c56d0"} 
                    strokeWidth="20" fill="transparent" strokeDasharray="691"
                    animate={{ strokeDashoffset: 691 - (691 * gasLevel) / 100 }}
                    transition={{ duration: 1.5 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-6xl font-headline font-black ${gasLevel < 20 ? 'text-[#9f403d]' : 'text-[#2b3437]'}`}>{gasLevel}%</span>
                  <span className="text-[10px] font-bold text-[#abb3b7] uppercase tracking-[0.2em]">Fuel Level</span>
                </div>
              </div>

              <div className="flex-1 space-y-6 text-left">
                <div>
                  <h3 className="text-[#586064] font-bold text-xs uppercase tracking-widest mb-2">Predictive Analysis</h3>
                  <p className="text-4xl font-headline font-black text-[#2b3437]">
                    {daysLeft} Days <span className="text-lg font-medium text-[#abb3b7]">Remaining</span>
                  </p>
                  <p className="text-[#586064] mt-2 text-sm leading-relaxed">
                    Based on your average usage of <strong>{avgDailyUsage.toFixed(1)}kg/day</strong>.
                  </p>
                </div>
                <button className="w-full py-4 bg-[#0c56d0] text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest shadow-[#0c56d0]/20">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  Request Refill
                </button>
              </div>
            </div>
          </motion.div>

          {/* SIDE CARDS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-[#abb3b7]/10 shadow-sm text-left">
              <h3 className="text-[#abb3b7] text-[10px] font-black uppercase tracking-widest">Net Gas Weight</h3>
              <p className="text-2xl font-headline font-bold text-[#2b3437] mt-1">{weight} kg</p>
              <div className="w-full bg-[#f1f4f6] h-1.5 mt-4 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${gasLevel}%` }} className={`h-full ${gasLevel < 20 ? 'bg-[#9f403d]' : 'bg-[#0c56d0]'}`} />
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-[2.5rem] border border-[#abb3b7]/10 shadow-sm text-left">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#2b3437] font-headline font-bold text-sm uppercase tracking-widest">Activity History</h3>
                <span className="material-symbols-outlined text-[#0c56d0] text-lg">history</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <div>
                    <p className="text-xs font-bold text-[#2b3437]">Refill Completed</p>
                    <p className="text-[9px] text-[#abb3b7] uppercase tracking-tighter">Full 12.5kg Cylinder</p>
                  </div>
                  <p className="text-[10px] font-black text-[#0c56d0]">MAR 28</p>
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <div>
                    <p className="text-xs font-bold text-[#2b3437]">Low Level Alert</p>
                    <p className="text-[9px] text-[#abb3b7] uppercase tracking-tighter">System trigger at 15%</p>
                  </div>
                  <p className="text-[10px] font-black text-[#9f403d]">MAR 26</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* WEEKLY CHART WITH RESTORED TOOLTIPS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-12 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-[#abb3b7]/10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-[#2b3437] font-headline font-bold text-xl">Consumption Trends</h3>
                <p className="text-[#586064] text-xs font-medium uppercase tracking-wider mt-1">Tap a bar to see exact usage</p>
              </div>
            </div>

            <div className="flex items-end justify-between h-44 gap-2 px-2">
              {weeklyUsage.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative">
                  
                  {/* --- THE TOOLTIP (Kg display) --- */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#2b3437] text-white text-[10px] px-2 py-1 rounded-lg font-black z-20 pointer-events-none">
                    {data.usage}kg
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2b3437] rotate-45" />
                  </div>

                  <div className="relative w-full flex flex-col items-center justify-end h-32">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.usage / maxUsage) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`w-full max-w-[35px] rounded-t-xl transition-all cursor-pointer ${
                        data.usage > 1.5 ? 'bg-[#0c56d0]' : 'bg-[#dae2ff] group-hover:bg-[#0c56d0]'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-black text-[#abb3b7] uppercase tracking-tighter">{data.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default Dashboard;