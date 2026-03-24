import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-[20px] shadow-sm h-20 flex justify-between items-center px-6 md:px-12">
      
      {/* Left: Logo and Desktop Links */}
      <div className="flex items-center gap-12">
        <span className="text-2xl font-extrabold tracking-tight text-[#2b3437] font-headline">
          CylinderIQ
        </span>
        
        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex gap-8">
          <a className="text-[#0c56d0] font-bold border-b-2 border-[#0c56d0]" href="#">Features</a>
          <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors" href="#">Solutions</a>
          <a className="text-[#586064] font-medium hover:text-[#0c56d0] transition-colors" href="#">Pricing</a>
        </div>
      </div>

      {/* Right: Actions & Mobile Toggle */}
      <div className="flex items-center gap-4">
        {/* Desktop Buttons - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 text-[#586064] font-medium hover:text-[#0c56d0] transition-colors">Login</button>
          <button className="bg-[#0c56d0] hover:bg-[#004aba] text-[#f8f7ff] px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button - Visible only on Mobile */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#2b3437]"
        >
          {/* Simple Animated Hamburger Icon */}
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-[#abb3b7]/15 p-6 flex flex-col gap-6 md:hidden shadow-xl"
          >
            <a className="text-lg font-bold text-[#0c56d0]" href="#" onClick={() => setIsOpen(false)}>Features</a>
            <a className="text-lg font-medium text-[#586064]" href="#" onClick={() => setIsOpen(false)}>Solutions</a>
            <a className="text-lg font-medium text-[#586064]" href="#" onClick={() => setIsOpen(false)}>Pricing</a>
            <hr className="border-[#abb3b7]/15" />
            <div className="flex flex-col gap-4">
              <button className="w-full py-3 text-[#586064] font-medium border border-[#abb3b7]/30 rounded-lg">Login</button>
              <button className="w-full py-3 bg-[#0c56d0] text-white font-bold rounded-lg shadow-lg">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;