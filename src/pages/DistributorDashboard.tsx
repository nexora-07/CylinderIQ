import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added useNavigate
import { auth, db } from '../firebase'; 
import { signOut } from 'firebase/auth'; // 2. Added signOut import
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc } from 'firebase/firestore'; 
import DistributorMap from '../components/DistributorMap'; 

const Dashboard = () => {
  const navigate = useNavigate(); // 3. Initialize navigate
  const [loading, setLoading] = useState(true);
  const [households, setHouseholds] = useState<any[]>([]);
  const [distributorName, setDistributorName] = useState('Partner');

  // --- NEW: CENTRALIZED LOGOUT ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Force redirect to login
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // --- REFILL BOOKING & AI ENGINE ---
  const aiInsight = useMemo(() => {
    if (households.length === 0) return { title: "Initializing...", text: "Syncing..." };

    const activeRequests = households.filter(h => h.deviceStatus === 'requesting');
    if (activeRequests.length > 0) {
      return {
        title: "Manual Refill Request",
        text: `Urgent! ${activeRequests[0].fullName} has requested a refill. Move this unit to priority 1.`
      };
    }

    const pending = households.filter(h => h.deviceStatus !== 'dispatched');
    const mostUrgent = [...pending].sort((a, b) => a.gasLevel - b.gasLevel)[0];
    const hoursLeft = mostUrgent ? (mostUrgent.gasLevel / 5) * 24 : 0;

    if (mostUrgent?.gasLevel <= 15) {
      return {
        title: "Immediate Depletion Risk",
        text: `Unit "${mostUrgent.fullName}" will hit 0% in approx ${hoursLeft.toFixed(0)} hours. Plan route now.`
      };
    }

    return { title: "Stable Forecast", text: "No active requests or critical depletion alerts in your sector." };
  }, [households]);

  const handleDispatch = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        deviceStatus: "dispatched",
        dispatchTime: new Date().toISOString()
      });
    } catch (error) { console.error("Dispatch Error:", error); }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      const user = auth.currentUser;
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) setDistributorName(snap.data().fullName || 'Partner');
      }
    };
    fetchCompany();
    const q = query(collection(db, "users"), where("role", "==", "household"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHouseholds(snapshot.docs.map(doc => ({ 
        id: doc.id, ...doc.data(),
        gasLevel: Number(doc.data().gasLevel ?? 0),
        deviceStatus: doc.data().deviceStatus || "online" 
      })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-white font-black text-[#0c56d0] text-xs tracking-widest uppercase">Initializing...</div>;

  const lowGasCount = households.filter(h => h.gasLevel < 20).length;

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-950 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* Header stays exactly as it was, but we reduced the pt gap on the main tag later */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-100 z-[100] px-10 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">Cylinder<span className="text-[#0c56d0]">IQ</span></h1>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer">notifications</span>
          <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0c56d0] font-bold uppercase">{distributorName.charAt(0)}</div>
            {/* UPDATED: Calling handleLogout instead of a raw inline arrow function */}
            <button onClick={handleLogout} className="text-xs font-bold text-red-700 uppercase tracking-wide">Logout</button>
          </div>
        </div>
      </header>

      {/* Reduced pt-20 to pt-16 to pull content up and reduce the gap */}
      <main className="max-w-[1750px] mx-auto pt-16 px-8 pb-10 text-left">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight text-left">Welcome back, {distributorName}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Fleet intelligence overview</p>
        </div>
        
        {/* ... Rest of your UI ... */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
           {/* Stat cards logic stays same */}
           {[ { label: 'Network Reach', val: '2,540', icon: 'hub', color: 'text-blue-600' }, { label: 'Critical Alerts', val: lowGasCount, icon: 'error', color: 'text-red-600', alert: lowGasCount > 0 }, { label: 'Active Fleet', val: '12', icon: 'navigation', color: 'text-sky-600' }, { label: 'Refills Handled', val: '45', icon: 'task_alt', color: 'text-emerald-600' } ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className={`bg-white p-5 rounded-3xl border transition-all shadow-sm ${stat.alert ? 'border-red-100 bg-red-50/40' : 'border-white'}`}>
              <div className="flex justify-between items-center mb-3">
                <span className={`material-symbols-outlined ${stat.color} text-2xl`}>{stat.icon}</span>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Live</span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-4xl font-bold tracking-tighter ${stat.alert ? 'text-red-700' : 'text-slate-950'}`}>{stat.val}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-md h-[580px] overflow-hidden relative">
              <div className="absolute top-6 left-6 z-10"><div className="bg-white/90 px-4 py-2 rounded-xl border flex items-center gap-3"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" /><p className="text-[10px] font-bold text-slate-900 uppercase">Telemetry active</p></div></div>
              <DistributorMap usersData={households} />
            </div>

            <motion.div whileHover={{ scale: 1.01 }} className="bg-slate-900 p-6 rounded-[2rem] text-white flex items-center justify-between shadow-xl text-left">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><span className="material-symbols-outlined text-blue-400 text-2xl font-bold">psychology</span></div>
                <div><h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1">Predictive Insights</h4><p className="text-base font-bold text-blue-400 uppercase leading-none mb-1">{aiInsight.title}</p><p className="text-sm font-medium text-slate-300 opacity-90">{aiInsight.text}</p></div>
              </div>
              <button className="bg-[#0c56d0] text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-blue-700">Mobilize</button>
            </motion.div>
          </section>

          <section className="lg:col-span-4 flex flex-col h-[715px]">
            <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-lg flex-1 flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between"><h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Priority Dispatch</h3><span className="text-[10px] font-bold text-white bg-[#0c56d0] px-3 py-1 rounded-full">{households.length}</span></div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-10 custom-scrollbar text-left">
                <AnimatePresence>
                  {households.sort((a,b) => a.gasLevel - b.gasLevel).map((cust) => {
                    const estDays = (cust.gasLevel / 5).toFixed(1);
                    return (
                      <motion.div key={cust.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`p-5 rounded-[2rem] border-2 transition-all text-left ${cust.deviceStatus === 'requesting' ? 'border-[#0c56d0] bg-blue-50/20' : cust.gasLevel < 20 ? 'border-red-100 bg-red-50/30' : 'border-slate-100 bg-white'}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="max-w-[70%]"><p className="text-base font-bold text-slate-950 truncate leading-tight">{cust.fullName}</p><p className={`text-[9px] font-black uppercase mt-1 tracking-tighter ${cust.deviceStatus === 'requesting' ? 'text-blue-600' : 'text-slate-400'}`}>{cust.deviceStatus === 'requesting' ? '🔴 MANUAL REQUEST ACTIVE' : `STABLE: ~${estDays} DAYS LEFT`}</p></div>
                          <p className={`text-lg font-black ${cust.gasLevel < 20 ? 'text-red-600' : 'text-[#0c56d0]'}`}>{cust.gasLevel}%</p>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mb-5 overflow-hidden"><div className={`h-full transition-all duration-700 ${cust.gasLevel < 20 ? 'bg-red-600' : 'bg-[#0c56d0]'}`} style={{ width: `${cust.gasLevel}%` }} /></div>
                        <button onClick={() => handleDispatch(cust.id)} disabled={cust.deviceStatus === 'dispatched'} className={`w-full py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${cust.deviceStatus === 'dispatched' ? 'bg-slate-50 text-slate-300' : 'bg-[#0c56d0] text-white hover:bg-blue-800'}`}>{cust.deviceStatus === 'dispatched' ? 'Unit Assigned' : 'Dispatch Now'}</button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;