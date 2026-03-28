import { motion } from 'framer-motion';
import { useState } from 'react';

const Dashboard = () => {
  // Switch this to 'household' to see your previous screen
  const [userRole] = useState('distributor'); 

  // Mock data for a Distributor's fleet
  const customers = [
    { id: 'CUST-001', name: 'Kiki Aborisade', level: 18, location: 'Ikeja, Lagos', status: 'Urgent' },
    { id: 'CUST-002', name: 'John Doe', level: 45, location: 'Lekki, Lagos', status: 'Stable' },
    { id: 'CUST-003', name: 'Sarah Chen', level: 12, location: 'Surulere, Lagos', status: 'Urgent' },
    { id: 'CUST-004', name: 'Amaka Obi', level: 88, location: 'Victoria Island', status: 'Optimal' },
  ];

  if (userRole === 'household') {
    return (
      /* ... (Your existing Household Dashboard Code here) ... */
      <div>Household View</div> 
    );
  }

  // --- DISTRIBUTOR VIEW ---
  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-8 pb-12 px-6 font-body text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Distributor Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-[#0c56d0] font-bold text-xs uppercase tracking-[0.2em]">Logistics Terminal: Lagos Central</span>
            <h1 className="text-3xl font-headline font-black text-[#2b3437] mt-1">Fleet Overview</h1>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-white border border-[#abb3b7]/30 rounded-xl font-bold text-xs text-[#586064] hover:bg-[#f1f4f6]">
              Download Report
            </button>
            <button className="px-6 py-2 bg-[#0c56d0] text-white rounded-xl font-bold text-xs shadow-lg shadow-[#0c56d0]/20">
              Dispatch Truck
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* STATS OVERVIEW */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Scales', val: '1,240', icon: 'sensors', color: 'text-blue-500' },
              { label: 'Urgent Refills', val: '42', icon: 'priority_high', color: 'text-red-500' },
              { label: 'Total Gas (MT)', val: '12.4', icon: 'database', color: 'text-gray-700' },
              { label: 'Revenue/mo', val: '₦2.4M', icon: 'payments', color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#abb3b7]/10 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
                  <span className="text-[10px] font-black text-[#abb3b7] uppercase tracking-tighter">Live</span>
                </div>
                <p className="text-2xl font-headline font-black text-[#2b3437]">{stat.val}</p>
                <p className="text-xs font-bold text-[#586064] uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* PRIORITY QUEUE (Main Content) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#abb3b7]/10"
          >
            <h3 className="text-xl font-headline font-black text-[#2b3437] mb-6">Refill Priority Queue</h3>
            <div className="overflow-hidden">
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
                            <div 
                              className={`h-full ${cust.level < 20 ? 'bg-red-500' : 'bg-blue-500'}`} 
                              style={{ width: `${cust.level}%` }} 
                            />
                          </div>
                          <span className={`text-xs font-black ${cust.level < 20 ? 'text-red-500' : 'text-[#2b3437]'}`}>
                            {cust.level}%
                          </span>
                        </div>
                      </td>
                      <td className="py-5 text-xs font-medium text-[#586064]">{cust.location}</td>
                      <td className="py-5">
                        <button className="text-[10px] font-black uppercase text-[#0c56d0] hover:underline">Assign Driver</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* LOGISTICS MAP PLACEHOLDER */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#2b3437] rounded-[2.5rem] h-full p-8 text-white relative overflow-hidden min-h-[400px]">
              <div className="relative z-10">
                <h3 className="text-xl font-headline font-bold mb-2">Live Heatmap</h3>
                <p className="text-xs text-white/40 mb-8 font-medium">Concentration of "Urgent" status cylinders.</p>
                
                {/* Mock Map Dots */}
                <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                       <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                       <p className="text-[10px] font-bold">New depletion alert in {customers[i-1].location}</p>
                     </div>
                   ))}
                </div>
              </div>
              
              {/* Decorative Map Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
                  <path d="M0 20 Q 25 10 50 20 T 100 20 V 80 Q 75 90 50 80 T 0 80 Z" fill="none" stroke="white" strokeWidth="0.5" />
                  <circle cx="20" cy="30" r="1" fill="red" />
                  <circle cx="60" cy="50" r="1" fill="red" />
                  <circle cx="40" cy="70" r="1" fill="red" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Dashboard;