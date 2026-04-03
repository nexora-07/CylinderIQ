import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  // --- UPDATED LOGIC: Add /driver-mode to the dashboard check ---
  const isDashboard = 
    location.pathname === '/dashboard' || 
    location.pathname === '/distributor-panel' || 
    location.pathname === '/driver-mode';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-[20px] shadow-sm h-16 flex justify-between items-center px-6 md:px-10 max-w-full mx-auto transition-all duration-300">
      
      {/* Left: Logo and Desktop Links */}
      <div className="flex items-center gap-10">
        <Link 
          to="/"
          onClick={scrollToTop}
          className="text-xl font-extrabold tracking-tight text-[#2b3437] font-headline cursor-pointer"
        >
          Cylinder<span className="text-[#0c56d0]">IQ</span>
        </Link>

        {/* Desktop Navigation - Hidden on Driver/Distributor panels */}
        {!isDashboard && (
          <div className="hidden md:flex gap-8">
            <button
              onClick={scrollToTop}
              className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body"
            >
              Home
            </button>
            <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body" href="#problem">
              Problem
            </a>
            <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body" href="#solution">
              Solution
            </a>
            <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body" href="#features">
              Features
            </a>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {!isDashboard ? (
          /* PUBLIC VIEW */
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <button className="px-4 py-1.5 text-[#586064] font-bold hover:text-[#0c56d0] transition-colors text-sm font-body">
                Sign In
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-[#0c56d0] hover:bg-[#004aba] text-[#f8f7ff] px-5 py-2 rounded-lg font-bold transition-all shadow-sm text-sm font-headline">
                Get Started
              </button>
            </Link>
          </div>
        ) : (
          /* LOGISTICS & DASHBOARD VIEW */
          <div className="flex items-center gap-5">
             <span className="material-symbols-outlined text-[#abb3b7] cursor-pointer hover:text-[#0c56d0] transition-colors">
              notifications
            </span>
            <div className="flex items-center gap-3 border-l border-[#abb3b7]/20 pl-5">
              <div className="w-8 h-8 rounded-full bg-[#0c56d0]/10 border border-[#0c56d0]/20 flex items-center justify-center text-[#0c56d0] font-bold text-xs">
                KA
              </div>
              <Link to="/login" className="text-xs font-bold text-[#9f403d] hover:underline uppercase tracking-wider">
                Logout
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Toggle */}
        {!isDashboard && (
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#2b3437]">
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-current rounded-full" />
              <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-full h-0.5 bg-current rounded-full" />
              <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-current rounded-full" />
            </div>
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && !isDashboard && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white border-b border-[#abb3b7]/15 p-6 flex flex-col gap-5 md:hidden shadow-xl"
          >
            <button className="text-left text-base font-medium text-[#586064]" onClick={scrollToTop}>Home</button>
            <a className="text-base font-medium text-[#586064]" href="#problem" onClick={() => setIsOpen(false)}>Problem</a>
            <a className="text-base font-medium text-[#586064]" href="#solution" onClick={() => setIsOpen(false)}>Solution</a>
            <a className="text-base font-medium text-[#586064]" href="#features" onClick={() => setIsOpen(false)}>Features</a>
            
            <hr className="border-[#abb3b7]/15" />
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full py-2.5 text-[#586064] font-bold border border-[#abb3b7]/30 rounded-lg text-sm">
                  Sign In
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="w-full py-2.5 bg-[#0c56d0] text-white font-bold rounded-lg shadow-lg text-sm">
                  Get Started
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;