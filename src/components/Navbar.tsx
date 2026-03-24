import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Height reduced from h-20 to h-16. Horizontal padding tightened.
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-[20px] shadow-sm h-16 flex justify-between items-center px-6 md:px-10 max-w-full mx-auto transition-all duration-300">
      
      {/* Left: Logo and Desktop Links */}
      <div className="flex items-center gap-10">
        {/* Logo scaled down from text-2xl to text-xl */}
        <span className="text-xl font-extrabold tracking-tight text-[#2b3437] font-headline">
          CylinderIQ
        </span>
        
        {/* Desktop Navigation - Smaller text and tighter gaps */}
        <div className="hidden md:flex gap-6">
          <a className="text-[#0c56d0] font-bold border-b-2 border-[#0c56d0] text-sm transition-colors" href="#">Features</a>
          <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm" href="#">Solutions</a>
          <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm" href="#">Pricing</a>
        </div>
      </div>

      {/* Right: Actions & Mobile Toggle */}
      <div className="flex items-center gap-3">
        {/* Desktop Buttons - Slimmer padding and smaller text */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <button className="px-4 py-1.5 text-[#586064] font-medium hover:text-[#0c56d0] transition-colors text-sm font-body">
              Login
            </button>
          </Link>
          
          <Link to="/register">
            <button className="bg-[#0c56d0] hover:bg-[#004aba] text-[#f8f7ff] px-5 py-2 rounded-lg font-semibold transition-all shadow-sm text-sm font-headline">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#2b3437]"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white border-b border-[#abb3b7]/15 p-6 flex flex-col gap-5 md:hidden shadow-xl"
          >
            <a className="text-base font-bold text-[#0c56d0]" href="#" onClick={() => setIsOpen(false)}>Features</a>
            <a className="text-base font-medium text-[#586064]" href="#" onClick={() => setIsOpen(false)}>Solutions</a>
            <a className="text-base font-medium text-[#586064]" href="#" onClick={() => setIsOpen(false)}>Pricing</a>
            <hr className="border-[#abb3b7]/15" />
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full py-2.5 text-[#586064] font-medium border border-[#abb3b7]/30 rounded-lg text-sm">Login</button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="w-full py-2.5 bg-[#0c56d0] text-white font-bold rounded-lg shadow-lg text-sm">Get Started</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;