import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { auth, db, rtdb } from '../firebase'; 
import { doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore'; 
import { ref, onValue } from 'firebase/database';

const Dashboard = () => {
  const [gasLevel, setGasLevel] = useState(0);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);
  const [deviceStatus, setDeviceStatus] = useState('online');
  const [lastUpdated, setLastUpdated] = useState<any>(null);

  // --- REFILL BOOKING LOGIC ---
  const handleRequestRefill = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        deviceStatus: "requesting",
        requestDate: serverTimestamp(),
      });
    } catch (error) { console.error("Request Error:", error); }
  };

  // --- HARDWARE SYNC LOGIC ---
  const getDeviceStatusInfo = () => {
    if (!lastUpdated) return { label: 'Syncing', color: 'bg-slate-300' };
    const lastSyncTime = lastUpdated instanceof Date ? lastUpdated.getTime() : new Date(lastUpdated).getTime();
    const diff = (Date.now() - lastSyncTime) / 60000;

    if (diff < 10) return { label: 'Active', color: 'bg-emerald-500' };
    if (diff < 1440) return { label: 'Sleep Mode', color: 'bg-amber-500' };
    return { label: 'Offline', color: 'bg-red-500' };
  };

  const status = getDeviceStatusInfo();

  // Prediction Logic
  const weeklyUsage = [
    { day: 'Mon', usage: 0.8 }, { day: 'Tue', usage: 1.2 }, { day: 'Wed', usage: 0.9 },
    { day: 'Thu', usage: 1.5 }, { day: 'Fri', usage: 1.1 }, { day: 'Sat', usage: 2.4 }, { day: 'Sun', usage: 1.8 },
  ];
  const avgDailyUsage = weeklyUsage.reduce((acc, curr) => acc + curr.usage, 0) / 7;
  const currentKgLeft = (gasLevel * 0.125).toFixed(2);
  const daysLeft = Math.floor(Number(currentKgLeft) / avgDailyUsage) || 0;
  const maxUsage = Math.max(...weeklyUsage.map(u => u.usage));

  useEffect(() => {
    // FIX: We check for the user here, but the effect doesn't strictly depend 
    // on a local 'user' variable that changes frequently.
    const currentUser = auth.currentUser;
    if (!currentUser) {
        setLoading(false);
        return;
    }

    // 1. LISTEN TO FIRESTORE (Profile Data)
    const unsubscribeFirestore = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserName(data.fullName || 'User');
        setDeviceStatus(data.deviceStatus || 'online');
      }
    });

    // 2. LISTEN TO REALTIME DATABASE (Live Scale Data)
    const deviceRef = ref(rtdb, 'devices/CIQ-ESP-001');
    const unsubscribeRTDB = onValue(deviceRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Realtime Data Received:", data)
      if (data) {
        setGasLevel(data.gas_percentage || 0);
        if (data.last_updated) {
          setLastUpdated(new Date(data.last_updated * 1000));
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribeFirestore();
      unsubscribeRTDB();
    };
    // Dependency array is empty because Firebase listeners handle 
    // their own internal subscription state.
  }, []);

  if (loading) return <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center font-black text-[#0c56d0] animate-pulse uppercase tracking-widest text-xs">Syncing Terminal...</div>;

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-16 pb-12 px-6 font-body text-left text-[#2b3437]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[#0c56d0] font-bold text-xs uppercase tracking-[0.2em]">Kitchen Terminal</span>
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${status.color}/10 border border-slate-100`}>
                <div className={`w-1.5 h-1.5 rounded-full ${status.color} ${status.label === 'Active' ? 'animate-pulse' : ''}`} />
                <span className={`text-[9px] font-black uppercase tracking-widest ${status.color.replace('bg-', 'text-')}`}>{status.label}</span>
              </div>
            </div>
            <h1 className="text-4xl font-headline font-black text-[#2b3437]">Hello, <span className="text-[#0c56d0]">{userName}</span></h1>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/link-device" className="flex items-center gap-2 bg-white border-2 border-dashed border-[#abb3b7]/30 px-5 py-2.5 rounded-2xl text-[#586064] text-xs font-bold uppercase hover:border-[#0c56d0] transition-all">
              Sync Hardware
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8 bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-slate-100 relative overflow-hidden">
            {status.label === 'Sleep Mode' && (
              <div className="absolute top-10 right-10 flex items-center gap-2 text-slate-300">
                <span className="material-symbols-outlined text-xl">bedtime</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Saving Power</span>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="relative w-72 h-72">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="144" cy="144" r="120" stroke="#f8fafc" strokeWidth="24" fill="transparent" />
                  <motion.circle 
                    cx="144" cy="144" r="120" 
                    stroke={gasLevel < 20 ? "#9f403d" : "#0c56d0"} 
                    strokeWidth="24" fill="transparent" strokeDasharray="754" 
                    animate={{ strokeDashoffset: 754 - (754 * gasLevel) / 100 }} 
                    transition={{ duration: 1.5, ease: "easeOut" }} 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-7xl font-headline font-black tracking-tighter ${gasLevel < 20 ? 'text-[#9f403d]' : 'text-[#2b3437]'}`}>{gasLevel}%</span>
                  <span className="text-[10px] font-bold text-[#abb3b7] uppercase tracking-[0.3em]">Fuel Volume</span>
                </div>
              </div>

              <div className="flex-1 space-y-8 text-left">
                <div>
                  <h3 className="text-[#586064] font-bold text-[10px] uppercase tracking-[0.2em] mb-3">AI Estimation</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-headline font-black text-[#2b3437] tracking-tight">{daysLeft} Days</p>
                    <p className="text-sm font-bold text-[#abb3b7] uppercase">Remaining</p>
                  </div>
                  <p className="text-[#586064] mt-3 text-sm leading-relaxed font-medium">
                    {deviceStatus === 'dispatched' ? "🚚 Dispatch unit is on the way!" : deviceStatus === 'requesting' ? "⌛ Refill request is pending approval..." : "Predictions are live. Data pings every 4 hours via IoT sync."}
                  </p>
                </div>
                <button 
                  onClick={handleRequestRefill}
                  disabled={deviceStatus === 'requesting' || deviceStatus === 'dispatched'}
                  className={`w-full py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] shadow-xl transition-all ${deviceStatus === 'online' ? 'bg-[#0c56d0] text-white shadow-blue-500/20' : 'bg-slate-100 text-slate-400'}`}
                >
                  {deviceStatus === 'dispatched' ? 'Unit En Route' : deviceStatus === 'requesting' ? 'Request Sent' : 'Request Refill'}
                </button>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-left">
              <h3 className="text-[#abb3b7] text-[10px] font-black uppercase tracking-widest">Net Content Weight</h3>
              <p className="text-3xl font-headline font-bold text-[#2b3437] mt-1">{currentKgLeft} kg</p>
              <div className="w-full bg-[#f1f4f6] h-2 mt-5 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${gasLevel}%` }} className={`h-full ${gasLevel < 20 ? 'bg-[#9f403d]' : 'bg-[#0c56d0]'}`} />
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-left">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#2b3437] font-bold text-xs uppercase tracking-widest">Device History</h3>
                <span className="material-symbols-outlined text-[#0c56d0] text-lg">history</span>
              </div>
              <div className="space-y-5">
                {[{ title: 'Refill Success', sub: 'Full 12.5kg Cylinder', date: 'APR 10', color: 'text-[#0c56d0]' }, { title: 'Hardware Sync', sub: 'IoT Scale Connected', date: 'APR 12', color: 'text-emerald-500' }, { title: 'Low Gas Alert', sub: 'Critical threshold hit', date: 'APR 13', color: 'text-red-500' }].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <div><p className="text-xs font-bold text-[#2b3437]">{item.title}</p><p className="text-[9px] text-[#abb3b7] uppercase tracking-tighter">{item.sub}</p></div>
                    <p className={`text-[10px] font-black ${item.color}`}>{item.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-12 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <div className="mb-10 text-left">
              <h3 className="text-[#2b3437] font-headline font-bold text-2xl">Usage Trends</h3>
              <p className="text-[#586064] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Daily consumption in kilograms</p>
            </div>
            <div className="flex items-end justify-between h-48 gap-3 px-4">
              {weeklyUsage.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group relative">
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-xl font-bold z-20">{data.usage}kg</div>
                  <div className="relative w-full flex flex-col items-center justify-end h-32">
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(data.usage / maxUsage) * 100}%` }} className={`w-full max-w-[40px] rounded-t-2xl transition-all ${data.usage > 1.8 ? 'bg-[#0c56d0]' : 'bg-slate-100 group-hover:bg-[#dae2ff]'}`} />
                  </div>
                  <span className="text-[10px] font-black text-[#abb3b7] uppercase">{data.day}</span>
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