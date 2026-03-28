import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [gasLevel] = useState(18);
  const [weight] = useState(2.25);
  const [daysLeft] = useState(4);

  // Mock data for the last 7 days of consumption (in kg)
  const weeklyUsage = [
    { day: 'Mon', usage: 0.8 },
    { day: 'Tue', usage: 1.2 },
    { day: 'Wed', usage: 0.9 },
    { day: 'Thu', usage: 1.5 },
    { day: 'Fri', usage: 1.1 },
    { day: 'Sat', usage: 2.4 }, // Weekend cooking spike!
    { day: 'Sun', usage: 1.8 },
  ];

  const maxUsage = Math.max(...weeklyUsage.map(u => u.usage));

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-8 pb-12 px-6 font-body text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div>
            <span className="text-[#0c56d0] font-bold text-xs uppercase tracking-[0.2em]">Active Terminal: Main Kitchen</span>
            <h1 className="text-3xl font-headline font-black text-[#2b3437] mt-1 text-left">Welcome back, Kiki</h1>
          </div>
          <Link 
            to="/link-device" 
            className="flex items-center gap-2 bg-white border-2 border-dashed border-[#abb3b7]/30 px-4 py-2 rounded-xl text-[#586064] hover:border-[#0c56d0] hover:text-[#0c56d0] transition-all group"
          >
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">add</span>
            <span className="text-xs font-bold uppercase tracking-wider text-left">Add Hardware</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* GAUGE CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0px_20px_50px_rgba(0,0,0,0.04)] border border-[#abb3b7]/10"
          >
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="128" cy="128" r="110" stroke="#f1f4f6" strokeWidth="20" fill="transparent" />
                  <motion.circle 
                    cx="128" cy="128" r="110" 
                    stroke={gasLevel < 20 ? "#9f403d" : "#0c56d0"} 
                    strokeWidth="20" fill="transparent" strokeDasharray="691"
                    initial={{ strokeDashoffset: 691 }}
                    animate={{ strokeDashoffset: 691 - (691 * gasLevel) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
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

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-[#586064] font-bold text-xs uppercase tracking-widest mb-2 text-left">Predictive Analysis</h3>
                  <p className="text-4xl font-headline font-black text-[#2b3437] text-left">
                    {daysLeft} Days <span className="text-lg font-medium text-[#abb3b7]">Estimated</span>
                  </p>
                  <p className="text-[#586064] mt-2 text-sm leading-relaxed text-left">
                    Refill recommended by <strong>Thursday</strong> to avoid interruption.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 py-4 bg-[#0c56d0] text-white font-bold rounded-xl shadow-lg shadow-[#0c56d0]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    Order Refill
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SIDE STATS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-[#abb3b7]/10 shadow-sm">
              <span className="material-symbols-outlined text-[#0c56d0] mb-3">scale</span>
              <h3 className="text-[#abb3b7] text-[10px] font-black uppercase tracking-widest text-left">Net Gas Weight</h3>
              <p className="text-2xl font-headline font-bold text-[#2b3437] text-left">{weight} kg</p>
              <div className="w-full bg-[#f1f4f6] h-1.5 mt-4 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${gasLevel}%` }} className={`h-full ${gasLevel < 20 ? 'bg-[#9f403d]' : 'bg-[#0c56d0]'}`} />
              </div>
            </div>

            <div className="bg-[#2b3437] p-8 rounded-[2rem] text-white shadow-xl shadow-[#2b3437]/20">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-green-400">verified_user</span>
                <span className="text-[9px] font-bold text-white/30 tracking-tighter uppercase">ID: X8-Q2-771</span>
              </div>
              <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest text-left">Hardware Security</h3>
              <p className="text-xl font-bold italic text-left">Telemetry Encrypted</p>
            </div>
          </div>

          {/* CONSUMPTION CHART CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-12 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-[#abb3b7]/10"
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-[#2b3437] font-headline font-bold text-xl text-left">Weekly Consumption</h3>
                <p className="text-[#586064] text-xs font-medium uppercase tracking-wider mt-1 text-left">Average usage: 1.3kg / day</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#f1f4f6] rounded-full text-[10px] font-bold text-[#586064]">
                  <div className="w-2 h-2 rounded-full bg-[#0c56d0]" /> Cooking
                </div>
              </div>
            </div>

            {/* Bars Container */}
            <div className="flex items-end justify-between h-48 gap-2 md:gap-4 px-2">
              {weeklyUsage.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full flex flex-col items-center justify-end h-40">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2b3437] text-white text-[10px] px-2 py-1 rounded mb-2 font-bold whitespace-nowrap z-10">
                      {data.usage}kg
                    </div>
                    {/* The Bar */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.usage / maxUsage) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`w-full max-w-[40px] rounded-t-lg transition-colors cursor-pointer ${
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