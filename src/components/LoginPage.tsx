import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Added useNavigate here

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 2. Initialize the hook

  // 3. Create the handler function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // This is the magic line that stops the refresh
    
    // In the future, you'd check your credentials here
    console.log("Terminal Access Granted");

    // 4. Send the user to the dashboard
    navigate('/dashboard'); 
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-body text-[#2b3437] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full"
      >
        {/* Logo / Branding */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <span className="font-headline text-3xl font-extrabold tracking-tight text-[#2b3437]">
              Cylinder<span className="text-[#0c56d0]">IQ</span>
            </span>
          </Link>
          <p className="text-[#586064] mt-3 font-medium">Access your predictive dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0px_24px_48px_rgba(43,52,55,0.06)] border border-[#abb3b7]/10 relative overflow-hidden">
          {/* Top Decorative Bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#f1f4f6]">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-full w-1/3 bg-[#0c56d0]"
            />
          </div>

          {/* 5. ADDED onSubmit HERE */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#586064] ml-1 uppercase tracking-wider text-[10px]">
                Registered Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#abb3b7] text-xl">
                  alternate_email
                </span>
                <input 
                  type="email" 
                  required // Good practice to add 'required'
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-5 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl focus:ring-2 focus:ring-[#0c56d0]/20 focus:bg-white transition-all outline-none font-body"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-[#586064] uppercase tracking-wider text-[10px]">
                  Secure Password
                </label>
                <a href="#" className="text-[10px] font-bold text-[#0c56d0] hover:underline uppercase tracking-wider">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#abb3b7] text-xl">
                  lock
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-[#f1f4f6] border border-[#abb3b7]/15 rounded-xl focus:ring-2 focus:ring-[#0c56d0]/20 focus:bg-white transition-all outline-none font-body" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#abb3b7] hover:text-[#0c56d0] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input 
                type="checkbox" 
                id="remember"
                className="w-4 h-4 rounded border-gray-300 text-[#0c56d0] focus:ring-[#0c56d0]" 
              />
              <label htmlFor="remember" className="text-xs font-medium text-[#586064] font-body">
                Remeber Me
              </label>
            </div>

            <motion.button 
              type="submit" // 6. Ensure type is 'submit'
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 bg-[#0c56d0] text-white font-headline font-bold text-lg rounded-xl shadow-lg shadow-[#0c56d0]/20 flex items-center justify-center gap-2"
            >
              <span>Initialize Dashboard</span>
              <span className="material-symbols-outlined">login</span>
            </motion.button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-[#586064] text-sm font-body">
          Don't have a terminal account? {' '}
          <Link to="/register" className="text-[#0c56d0] font-bold hover:underline">
            Register your device
          </Link>
        </p>
      </motion.div>
    </main>
  );
};

export default Login;