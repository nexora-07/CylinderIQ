import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc } from 'firebase/firestore'; 
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import DistributorMap from '../components/DistributorMap'; 

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false); 
  const [userName, setUserName] = useState('Operator');
  const [loading, setLoading] = useState(true);
  const [households, setHouseholds] = useState<any[]>([]);

  const toggleTheme = () => setDarkMode(!darkMode);

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
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) setUserName(userSnap.data().fullName || 'Operator');
      }
    };
    fetchUserData();
  }, []);

  // UPDATED: Enhanced Data Cleaning Listener
  useEffect(() => {
    const q = query(collection(db, "users"), where("role", "==", "household"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHouseholds(snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          // FORCE NUMBER HERE TOO
          gasLevel: Number(data.gasLevel ?? data.level ?? 0),
          deviceStatus: data.deviceStatus || "online" 
        };
      }));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center font-black tracking-widest ${
      darkMode ? 'bg-[#020617] text-[#0c56d0]' : 'bg-white text-[#0c56d0]'
    }`}>
      INITIALIZING CORE...
    </div>
  );

  return (
    <main className={`min-h-screen transition-all duration-500 font-body p-6 pt-24 text-left overflow-x-hidden ${
      darkMode ? 'bg-[#020617] text-slate-300' : 'bg-[#f1f4f6] text-slate-600'
    }`}>
      
      {/* 1. URGENT OPERATIONS STRIP */}
      <div className={`fixed top-16 left-0 w-full z-40 border-b backdrop-blur-md py-2 px-8 flex justify-between items-center transition-all ${
        darkMode ? 'bg-red-900/10 border-red-500/20 text-red-500' : 'bg-red-50 border-red-200 text-red-700'
      }`}>
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">
            Priority Alert: {households.filter(h => h.gasLevel < 20).length} Depleted Terminals
          </p>
        </div>
        <button onClick={toggleTheme} className="flex items-center gap-2 group opacity-60 hover:opacity-100 transition-all">
           <span className={`material-symbols-outlined text-sm ${darkMode ? 'text-amber-400' : 'text-blue-600'}`}>
              {darkMode ? 'light_mode' : 'dark_mode'}
           </span>
           <span className="text-[10px] font-black uppercase tracking-widest">
              {darkMode ? 'Switch to Light' : 'Switch to Dark'}
           </span>
        </button>
      </div>

      <div className="max-w-[1850px] mx-auto grid grid-cols-12 gap-6 mt-4">
        
        {/* LEFT: INTELLIGENCE */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <section className={`rounded-[2rem] p-6 border transition-all ${
            darkMode ? 'bg-[#0f172a]/60 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Network Volume</p>
            <h2 className={`text-4xl font-black mb-4 ${darkMode ? 'text-white' : 'text-[#2b3437]'}`}>14.2</h2>
            <div className="h-24 w-full opacity-50">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{v: 40}, {v: 70}, {v: 50}, {v: 90}]}>
                  <Area type="monotone" dataKey="v" stroke="#0c56d0" fill="#0c56d0" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={`rounded-[2.5rem] p-6 border transition-all ${
            darkMode ? 'bg-gradient-to-br from-[#0c56d0]/10 to-transparent border-blue-500/20' : 'bg-blue-50 border-blue-100'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#0c56d0] text-lg">insights</span>
              <h3 className="text-[10px] font-black text-[#0c56d0] uppercase tracking-widest">AI Prediction</h3>
            </div>
            <div className={`${darkMode ? 'bg-black/20' : 'bg-white'} p-4 rounded-2xl border ${darkMode ? 'border-white/5' : 'border-blue-200/50'}`}>
               <p className={`text-[11px] font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#0c56d0]'}`}>Demand Surge Warning</p>
               <p className="text-[10px] text-slate-500 leading-relaxed">Zone 4 depletion predicted by Saturday.</p>
            </div>
          </section>
        </div>

        {/* MIDDLE: THE MAP */}
        <div className={`col-span-12 lg:col-span-6 h-[700px] rounded-[3rem] border overflow-hidden relative shadow-2xl flex flex-col transition-all ${
          darkMode ? 'bg-[#0f172a] border-white/5' : 'bg-white border-slate-200'
        }`}>
           <div className="absolute top-8 left-8 z-[10]">
              <div className={`${darkMode ? 'bg-slate-900/80' : 'bg-white/90'} backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl text-left`}>
                <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Live Telemetry</p>
                <p className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#2b3437]'}`}>12 Units Active</p>
              </div>
           </div>
           
           <div className="w-full h-full flex-1">
              <DistributorMap usersData={households} />
           </div>
        </div>

        {/* RIGHT: DISPATCH ENGINE */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-[700px]">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 text-left">Priority Engine</h3>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {households.sort((a,b) => a.gasLevel - b.gasLevel).map((cust, i) => (
              <motion.div 
                key={i} 
                className={`p-5 rounded-[2rem] border transition-all relative overflow-hidden group ${
                  darkMode ? 'bg-[#0f172a]/60 border-white/5 hover:border-[#0c56d0]' : 'bg-white border-slate-200 hover:border-[#0c56d0]'
                } ${cust.gasLevel < 20 ? 'border-l-4 border-l-red-500 shadow-md' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-left">
                    <p className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#2b3437]'}`}>{cust.fullName || "User"}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">
                        {cust.address?.slice(0, 22) || "LOCATION NOT SET"}...
                    </p>
                  </div>
                  <div className="text-right">
                     <p className={`text-sm font-black ${cust.gasLevel < 20 ? 'text-red-500' : 'text-[#0c56d0]'}`}>{cust.gasLevel}%</p>
                     <p className="text-[8px] font-black text-slate-400 uppercase">Level</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                   <button 
                    disabled={cust.deviceStatus === 'dispatched'}
                    onClick={() => handleDispatch(cust.id)}
                    className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm ${
                      cust.deviceStatus === 'dispatched' 
                      ? "bg-slate-100 text-slate-400" 
                      : "bg-[#0c56d0] text-white hover:bg-blue-700 shadow-blue-900/10"
                    }`}
                   >
                     {cust.deviceStatus === 'dispatched' ? 'Unit Assigned' : 'Initialize Dispatch'}
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;