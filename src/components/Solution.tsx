import { motion } from 'framer-motion';

const Solution = () => {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    // Reduced padding on mobile (py-20) vs desktop (py-32)
    <section className="py-20 md:py-32 px-6 md:px-8 bg-white">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        
        {/* Section Header: Centered on all screens, but tighter margins on mobile */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#2b3437]">
            Architectural Intelligence
          </h2>
          <p className="text-lg md:text-xl text-[#586064] font-body px-4">
            We don't just track gas. We engineer visibility through a sophisticated integration of IoT and AI.
          </p>
        </motion.div>

        {/* Bento Grid Container: 1 Column on Mobile, 3 on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* 1. Real-time Tracking (Large Blue Block) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            // Occupies full width on mobile, 2 columns on desktop
            className="md:col-span-2 bg-[#0c56d0] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-end min-h-[350px] md:min-h-[450px] shadow-xl cursor-default"
          >
            <div className="relative z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                <span className="text-xl md:text-2xl">⊕</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">Real-time tracking</h3>
              <p className="text-blue-100 text-base md:text-lg max-w-md font-body">
                GPS and IoT sensor fusion provides sub-meter accuracy for every cylinder.
              </p>
            </div>
          </motion.div>

          {/* 2. AI-powered Inventory (Tall White Block) */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -5 }}
            className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-[#abb3b7]/15 flex flex-col gap-6 md:gap-8 shadow-sm cursor-default"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#dae2ff] flex items-center justify-center rounded-2xl text-[#0c56d0] text-2xl md:text-3xl font-bold">◈</div>
            <h3 className="font-headline text-xl md:text-2xl font-bold text-[#2b3437]">AI-powered inventory</h3>
            <p className="text-[#586064] text-sm md:text-base leading-relaxed font-body">
              Predictive analytics that forecast demand surges before they happen.
            </p>
          </motion.div>

          {/* 3. Network Visibility (Standard Grey Block) */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -5 }}
            className="bg-[#e3e9ec] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col gap-4 md:gap-6 cursor-default"
          >
            <span className="text-[#0c56d0] text-3xl md:text-4xl font-bold">☗</span>
            <h3 className="font-headline text-xl md:text-2xl font-bold text-[#2b3437]">Clear network visibility</h3>
            <p className="text-[#586064] text-sm md:text-base font-body">
              A unified command center for your entire distribution fleet.
            </p>
          </motion.div>

          {/* 4. Enterprise Grade (Wide Block) */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -5 }}
            // Full width on mobile, 2 columns on desktop
            className="md:col-span-2 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-[#abb3b7]/15 overflow-hidden relative group shadow-sm cursor-default"
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-center">
                <h3 className="font-headline text-xl md:text-2xl font-bold mb-4 text-[#2b3437]">Enterprise Grade</h3>
                <p className="text-[#586064] text-sm md:text-base font-body">
                  Built for demanding logistics with 99.99% uptime and military-grade encryption.
                </p>
              </div>
              {/* Image height fixed on mobile (h-48), full height on desktop */}
              <div className="h-48 md:h-auto md:w-1/2 bg-[#eaeff1] overflow-hidden">
                 <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    alt="Industrial"
                 />
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Solution;