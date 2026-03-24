import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState('Admin');
  const [showPassword, setShowPassword] = useState(false);

  const roles = ['Admin', 'Vendor', 'Driver', 'Customer'];

  return (
    <main className="flex-grow flex flex-col md:flex-row min-h-screen overflow-hidden bg-[#f8f9fa]">
      
      {/* 1. LEFT SIDE: Brand & Image Section (Architectural) */}
      <section className="hidden md:flex w-1/2 relative bg-[#eaeff1] overflow-hidden group">
        {/* Subtle Gradient Overlay for "Soul" */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c56d0]/10 to-[#0253cd]/5 z-10"></div>
        
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          alt="Industrial cylinders" 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 transition-transform duration-700 group-hover:scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_TLyXjSh8e-puqnh-CYVPk51_k7goAdpBOrN77c_Z31it8kRHsPkWVsSKTtlAEp5m_wbbtM5JfjNp4ckCK88FnYwCJDVVxKwaPUhF8mjCpi0uQMVq0gtsrGtrlPMtJAvk5bqGn7rLMatSc20qBPyW_GPBA1v_25kxKse8QNuQK-1kyNcJBV_OBY9lRoWnKV8iJm8rqEavI7GbZfQK1LMX9ChnuPzWvYKsFi2WcG3Cc7UvW-BAQnm8ZsLt3L_n13RmZdg_bH85KzQe"
        />

        <div className="relative z-20 flex flex-col justify-between h-full p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* <h1 className="font-headline font-extrabold text-4xl tracking-tight text-white">CylinderIQ</h1> */}
            <p className="mt-4 text-slate-300 font-medium max-w-sm text-lg leading-relaxed font-body">
              Architectural Intelligence for Industrial Logistics.
            </p>
          </motion.div>

          {/* Glassmorphism Status Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-[20px] p-8 rounded-[1.5rem] border border-white/20 shadow-2xl max-w-md"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0c56d0] block mb-3 font-body">Enterprise Status</span>
            <h2 className="font-headline text-2xl font-bold mb-2 text-white">Real-Time Asset Control</h2>
            <p className="text-sm text-slate-300 leading-relaxed font-body">
              Precision tracking and predictive logistics for the global LPG market. Access your centralized dashboard.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="h-full bg-[#0c56d0]" 
                />
              </div>
              <span className="text-xs font-bold font-headline text-[#0c56d0]">Live</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. RIGHT SIDE: Login Form Section */}
      <section className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
        
        {/* Mobile Header Only */}
        <div className="md:hidden w-full max-w-md mb-12">
          <h1 className="font-headline font-extrabold text-3xl tracking-tight text-[#0c56d0]">CylinderIQ</h1>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-headline text-3xl font-extrabold text-[#2b3437] mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-[#586064] text-sm font-body">Select your portal role to securely access your workspace.</p>
          </div>

          {/* Role Switcher (The Segmented Control) */}
          <div className="flex p-1 bg-[#f1f4f6] rounded-xl mb-8 overflow-x-auto scrollbar-hide">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`flex-1 min-w-[80px] py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeRole === role 
                  ? "bg-white text-[#0c56d0] shadow-sm ring-1 ring-black/5" 
                  : "text-[#586064] hover:text-[#2b3437]"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#586064] mb-2 px-1 font-body" htmlFor="email">Email Address</label>
              <input 
                className="w-full px-4 py-3.5 bg-white border-0 ring-1 ring-[#abb3b7]/15 rounded-xl focus:ring-2 focus:ring-[#0c56d0] transition-all duration-200 text-[#2b3437] placeholder:text-[#abb3b7]/50 font-body" 
                id="email" placeholder="name@company.com" type="email"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2 px-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#586064] font-body" htmlFor="password">Password</label>
                <a className="text-xs font-bold text-[#0c56d0] hover:text-[#0253cd] transition-colors font-body" href="#">Forgot Password?</a>
              </div>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3.5 bg-white border-0 ring-1 ring-[#abb3b7]/15 rounded-xl focus:ring-2 focus:ring-[#0c56d0] transition-all duration-200 text-[#2b3437] placeholder:text-[#abb3b7]/50 font-body" 
                  id="password" placeholder="••••••••" type={showPassword ? "text" : "password"}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#abb3b7] hover:text-[#586064]"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 px-1">
              <input className="w-4 h-4 rounded border-[#abb3b7]/30 text-[#0c56d0] focus:ring-[#0c56d0]/20" id="remember" type="checkbox"/>
              <label className="text-sm text-[#586064] font-body" htmlFor="remember">Remember device for 30 days</label>
            </div>

            <button className="w-full bg-[#0c56d0] text-white py-4 px-6 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-[#0c56d0]/20 hover:bg-[#004aba] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group font-headline" type="submit">
              Sign In to Portal
              <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-[#abb3b7]/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#586064] font-medium font-body">© 2024 CylinderIQ Architectural Intelligence.</p>
              <div className="flex gap-4">
                <Link to="/register" className="text-xs font-bold text-[#586064] hover:text-[#0c56d0] transition-colors font-body">Create Account</Link>
                <a className="text-xs font-bold text-[#586064] hover:text-[#0c56d0] transition-colors font-body" href="#">Support</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;