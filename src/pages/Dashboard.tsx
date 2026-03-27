import { motion } from 'framer-motion';
import { useState } from 'react';

const Dashboard = () => {
  // We'll simulate the data that will eventually come from your Scale
  const [gasLevel] = useState(18); // 18% remaining
  const [weight] = useState(2.25); // 2.25kg of gas left
  const [daysLeft] = useState(4);

  return (
    // Inside Dashboard.tsx
      <main className="min-h-screen bg-[#f8f9fa] pt-8 pb-12 px-6 font-body">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Greeting */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <span className="text-[#0c56d0] font-bold text-xs uppercase tracking-[0.2em]">Live Terminal</span>
            <h1 className="text-3xl font-headline font-black text-[#2b3437] mt-1">Welcome back, Kiki</h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-[#abb3b7] uppercase">System Status</p>
            <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Telemetry Active
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN GAUGE CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0px_20px_50px_rgba(0,0,0,0.04)] border border-[#abb3b7]/10"
          >
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* The Circular Progress Gauge */}
              <div className="relative w-64 h-64">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="128" cy="128" r="110" stroke="#f1f4f6" strokeWidth="20" fill="transparent" />
                  <motion.circle 
                    cx="128" cy="128" r="110" 
                    stroke={gasLevel < 20 ? "#9f403d" : "#0c56d0"} 
                    strokeWidth="20" 
                    fill="transparent" 
                    strokeDasharray="691"
                    initial={{ strokeDashoffset: 691 }}
                    animate={{ strokeDashoffset: 691 - (691 * gasLevel) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-6xl font-headline font-black ${gasLevel < 20 ? 'text-[#9f403d]' : 'text-[#2b3437]'}`}>
                    {gasLevel}%
                  </span>
                  <span className="text-[10px] font-bold text-[#abb3b7] uppercase tracking-[0.2em]">Fuel Level</span>
                </div>
              </div>

              {/* Predictive Text Content */}
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div>
                  <h3 className="text-[#586064] font-bold text-xs uppercase tracking-widest mb-2">Predictive Analysis</h3>
                  <p className="text-4xl font-headline font-black text-[#2b3437]">
                    {daysLeft} Days <span className="text-lg font-medium text-[#abb3b7]">Estimated</span>
                  </p>
                  <p className="text-[#586064] mt-2 text-sm leading-relaxed">
                    Based on your average consumption, you will likely run out by <span className="font-bold text-[#2b3437]">Thursday evening</span>.
                  </p>
                </div>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 py-4 bg-[#0c56d0] text-white font-bold rounded-xl shadow-lg shadow-[#0c56d0]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    Order Refill
                  </button>
                  <button className="flex-1 py-4 bg-[#f1f4f6] text-[#2b3437] font-bold rounded-xl hover:bg-[#eaeff1] transition-all">
                    View Usage Log
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SIDE STATS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-[#abb3b7]/10 shadow-sm">
              <span className="material-symbols-outlined text-[#0c56d0] mb-3">scale</span>
              <h3 className="text-[#abb3b7] text-[10px] font-black uppercase tracking-widest">Net Gas Weight</h3>
              <p className="text-2xl font-headline font-bold text-[#2b3437]">{weight} kg</p>
              <div className="w-full bg-[#f1f4f6] h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-[#0c56d0] h-full w-[18%]" />
              </div>
            </div>

            <div className="bg-[#2b3437] p-8 rounded-[2rem] text-white shadow-xl shadow-[#2b3437]/20">
              <span className="material-symbols-outlined text-green-400 mb-3">verified_user</span>
              <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest">Safety Check</h3>
              <p className="text-xl font-bold italic">Stable Pressure</p>
              <p className="text-xs text-white/50 mt-2">Last leak scan completed 4 mins ago.</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Dashboard;