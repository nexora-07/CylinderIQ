import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Added useNavigate here

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('household');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 2. Initialize the navigate function

  // 3. Create a submit handler function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    // In a real app, you would save the data here
    console.log("Registration data saved locally.");

    // 4. Move to the hardware linking page
    navigate('/link-device'); 
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const roles = [
    { id: 'household', label: 'Household', icon: 'home_iot_device' },
    { id: 'distributor', label: 'Distributor', icon: 'monitoring' },
    { id: 'retailer', label: 'Vendor', icon: 'storefront' },
    { id: 'logistics', label: 'Logistics', icon: 'local_shipping' },
  ];

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-body text-[#2b3437] flex items-center justify-center p-6 md:p-12 pt-32">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
      >
        {/* LEFT SIDE: Narrative Content */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col justify-between py-12 order-2 lg:order-1"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl font-extrabold leading-tight tracking-tight text-center lg:text-left">
                Setup your <span className="text-[#0c56d0]">predictive</span> terminal.
              </h1>
              <p className="text-lg text-[#586064] max-w-md leading-relaxed mx-auto lg:mx-0 text-center lg:text-left">
                Connect your IoT hardware to the cloud and eliminate run-out anxiety forever.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-8">
              {[
                { title: 'IoT Sync', desc: 'Securely link your ESP32-driven scale.', icon: 'sync', color: 'bg-[#dae2ff] text-[#0c56d0]' },
                { title: 'Level Prediction', desc: 'Predictive days-to-empty analytics.', icon: 'query_stats', color: 'bg-[#e4e2e6] text-[#5f5f62]' },
                { title: 'Safety Protocol', desc: 'Encrypted telemetry and audit trails.', icon: 'encrypted', color: 'bg-[#e3dbfd] text-[#615b77]' }
              ].map((prop, i) => (
                <div key={i} className="p-6 bg-white rounded-xl flex items-start gap-4 border border-[#abb3b7]/15 hover:bg-[#f1f4f6] transition-colors duration-300">
                  <div className={`p-3 rounded-lg flex items-center justify-center ${prop.color}`}>
                    <span className="material-symbols-outlined">{prop.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-[#2b3437]">{prop.title}</h3>
                    <p className="text-sm text-[#586064]">{prop.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="pt-12 text-sm text-[#586064] opacity-60 text-center lg:text-left">© 2026 CylinderIQ. Predictive Energy Systems.</p>
        </motion.div>

        {/* RIGHT SIDE: Registration Form Card */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-7 flex items-center order-1 lg:order-2"
        >
          <div className="w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-[0px_24px_48px_rgba(43,52,55,0.06)] relative overflow-hidden border border-[#abb3b7]/10">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#eaeff1]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "33.3%" }}
                className="h-full bg-gradient-to-r from-[#0c56d0] to-[#0253cd]" 
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-6 sm:gap-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0c56d0] text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-[#0c56d0]/20">1</div>
                  <div className="w-8 h-px bg-[#e3e9ec]"></div>
                  <div className="w-8 h-8 rounded-full bg-[#e3e9ec] text-[#586064] flex items-center justify-center text-xs font-bold">2</div>
                  <div className="w-8 h-px bg-[#e3e9ec]"></div>
                  <div className="w-8 h-8 rounded-full bg-[#e3e9ec] text-[#586064] flex items-center justify-center text-xs font-bold">3</div>
                </div>
                <div>
                  <h2 className="font-headline text-3xl font-bold text-[#2b3437]">Create Account</h2>
                  <p className="text-[#586064] mt-1 text-sm font-body">Step 1: Role & Identity</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-[#586064]">Already have an account?</span><br/>
                <Link to="/login" className="text-[#0c56d0] text-sm font-semibold hover:underline">Log in</Link>
              </div>
            </div>

            {/* 5. Added onSubmit here */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#586064] ml-1 uppercase tracking-wider text-[11px]">Full Name</label>
                  <input type="text" required placeholder="Kiki Aborisade" className="w-full px-5 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl focus:ring-2 focus:ring-[#0c56d0]/20 focus:bg-white transition-all outline-none font-body" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#586064] ml-1 uppercase tracking-wider text-[11px]">Contact Email</label>
                  <input type="email" required placeholder="kiki@cylinderiq.com" className="w-full px-5 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl focus:ring-2 focus:ring-[#0c56d0]/20 focus:bg-white transition-all outline-none font-body" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-[#586064] ml-1 uppercase tracking-wider text-[11px]">Select Your Primary Role</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-2 min-h-[100px] ${
                        selectedRole === role.id 
                        ? "border-[#0c56d0] bg-[#0c56d0]/5 text-[#0c56d0]" 
                        : "border-transparent bg-[#f1f4f6] text-[#586064] hover:bg-[#e3e9ec]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {role.icon}
                      </span>
                      <span className="font-headline font-bold text-xs">{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#586064] ml-1 uppercase tracking-wider text-[11px]">Access Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••••••" 
                    className="w-full px-5 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl focus:ring-2 focus:ring-[#0c56d0]/20 focus:bg-white transition-all outline-none font-body" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#abb3b7] hover:text-[#0c56d0] transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#f1f4f6] rounded-xl border border-[#0c56d0]/10">
                <input type="checkbox" required className="w-4 h-4 rounded border-gray-300 text-[#0c56d0] focus:ring-[#0c56d0]" />
                <label className="text-xs font-medium text-[#586064] font-body">
                  I am ready to sync my CylinderIQ Smart Scale in the next step.
                </label>
              </div>

              <motion.button 
                type="submit" // 6. Ensure this is a submit button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-[#0c56d0] text-white font-headline font-bold text-lg rounded-xl shadow-lg shadow-[#0c56d0]/20 flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Register;