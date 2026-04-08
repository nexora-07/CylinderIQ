import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc } from 'firebase/firestore'; 
import DistributorMap from '../components/DistributorMap'; 

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [households, setHouseholds] = useState<any[]>([]);
  const [distributorName, setDistributorName] = useState('Partner');

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
  }, []);

  useEffect(() => {
    const q = query(collection(db, "users"), where("role", "==", "household"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHouseholds(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        gasLevel: Number(doc.data().gasLevel ?? 0),
        deviceStatus: doc.data().deviceStatus || "online" 
      })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-white font-bold text-[#0c56d0] text-xs tracking-widest uppercase">Initializing...</div>;

  const lowGasCount = households.filter(h => h.gasLevel < 20).length;

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-950 font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* 1. EXACT NAV FROM IMAGE */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-100 z-[100] px-10 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">
          Cylinder<span className="text-[#0c56d0]">IQ</span>
        </h1>
        
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer">notifications</span>
          <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0c56d0] font-bold">
              {distributorName.charAt(0).toUpperCase()}
            </div>
            <button 
              onClick={() => auth.signOut()}
              className="text-xs font-bold text-red-700 uppercase tracking-wide hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT (Tightened pt-16 to h-16 ratio) */}
      <main className="max-w-[1750px] mx-auto pt-20 px-8 pb-10">
        
        {/* COMPACT WELCOME */}
        <div className="mb-4 text-left">
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Welcome back, {distributorName}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Fleet intelligence overview</p>
        </div>
        
        {/* STATS OVERVIEW (Floating Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-left">
          {[
            { label: 'Network Reach', val: '2,540', icon: 'hub', color: 'text-blue-600' },
            { label: 'Critical Alerts', val: lowGasCount, icon: 'error', color: 'text-red-600', alert: lowGasCount > 0 },
            { label: 'Active Fleet', val: '12', icon: 'navigation', color: 'text-sky-600' },
            { label: 'Refills Handled', val: '45', icon: 'task_alt', color: 'text-emerald-600' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white p-5 rounded-3xl border transition-all shadow-sm ${stat.alert ? 'border-red-100 bg-red-50/40 shadow-red-100' : 'border-white'}`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`material-symbols-outlined ${stat.color} text-2xl`}>{stat.icon}</span>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Live</span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-4xl font-bold tracking-tighter ${stat.alert ? 'text-red-700' : 'text-slate-950'}`}>{stat.val}</p>
            </motion.div>
          ))}
        </div>

        {/* MAP & DISPATCH ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* MIDDLE: THE MAP */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-md h-[580px] overflow-hidden relative">
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-100 shadow-xl flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Telemetry active</p>
                </div>
              </div>
              <DistributorMap usersData={households} />
            </div>

            {/* AI PREDICTION BAR (High Contrast Slate) */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-slate-900 p-6 rounded-[2rem] text-white flex items-center justify-between shadow-xl text-left"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                  <span className="material-symbols-outlined text-blue-400 text-2xl font-bold">psychology</span>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1 text-left">Predictive Insights</h4>
                  <p className="text-base font-bold text-left">Zone 4 demand surge predicted in <span className="text-blue-400 underline underline-offset-4">48 hours</span>.</p>
                </div>
              </div>
              <button className="bg-[#0c56d0] hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg">Mobilize</button>
            </motion.div>
          </section>

          {/* RIGHT: DISPATCH PANEL */}
          <section className="lg:col-span-4 flex flex-col h-[715px]">
            <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-lg flex-1 flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest text-left">Priority Dispatch</h3>
                <span className="text-[10px] font-bold text-white bg-[#0c56d0] px-3 py-1 rounded-full">{households.length}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar pb-10">
                <AnimatePresence>
                  {households.sort((a,b) => a.gasLevel - b.gasLevel).map((cust) => (
                    <motion.div 
                      key={cust.id}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      className={`p-5 rounded-[2rem] border-2 transition-all text-left ${cust.gasLevel < 20 ? 'border-red-100 bg-red-50/30 shadow-sm' : 'border-slate-100 bg-white'}`}
                    >
                      <div className="flex justify-between items-start mb-3 text-left">
                        <div className="max-w-[70%] text-left">
                          <p className="text-base font-bold text-slate-950 truncate leading-tight">{cust.fullName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5 truncate">{cust.address || "Pending GPS..."}</p>
                        </div>
                        <p className={`text-lg font-black ${cust.gasLevel < 20 ? 'text-red-600' : 'text-[#0c56d0]'}`}>{cust.gasLevel}%</p>
                      </div>

                      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-5 overflow-hidden">
                        <div className={`h-full transition-all duration-700 ${cust.gasLevel < 20 ? 'bg-red-600' : 'bg-[#0c56d0]'}`} style={{ width: `${cust.gasLevel}%` }} />
                      </div>

                      <button 
                        onClick={() => handleDispatch(cust.id)}
                        disabled={cust.deviceStatus === 'dispatched'}
                        className={`w-full py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          cust.deviceStatus === 'dispatched' 
                          ? 'bg-slate-50 text-slate-300 border border-slate-200 cursor-not-allowed' 
                          : 'bg-[#0c56d0] text-white hover:bg-blue-800 shadow-md active:scale-95'
                        }`}
                      >
                        {cust.deviceStatus === 'dispatched' ? 'Unit Assigned' : 'Dispatch Now'}
                      </button>
                    </motion.div>
                  ))}
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