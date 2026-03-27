import { motion } from 'framer-motion';

const Problem = () => {
  const cardVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    /* This ID must match the href in your Navbar exactly */
    <section id="problem" className="py-16 md:py-24 px-6 md:px-8 bg-[#f1f4f6]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column: The "Analog" Reality */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 flex flex-col justify-center text-center md:text-left"
          >
            <span className="text-[#0c56d0] font-bold uppercase tracking-widest text-sm mb-4 font-body block">
              The Problem
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#2b3437] leading-tight">
              A supply chain <br className="hidden md:block"/>working in the dark.
            </h2>
            <p className="text-[#586064] text-lg leading-relaxed font-body max-w-md mx-auto md:mx-0">
              Traditional LPG logistics suffer from an <strong>information black hole</strong>, leaving both households and vendors guessing about gas levels.
            </p>
          </motion.div>

          {/* Right Column: The Data Gap Breakdown */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Consumer Run-Out Anxiety */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-[#ffffff] p-6 sm:p-8 rounded-[2rem] border border-[#abb3b7]/15 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-sm"
            >
              <span className="text-[#9f403d] text-3xl sm:text-4xl italic font-headline">01</span>
              <h3 className="font-headline text-xl font-bold text-[#2b3437]">Run-Out Anxiety</h3>
              <p className="text-[#586064] text-sm leading-relaxed font-body">
                Households rely on manual "shaking" to guess gas levels, often leading to <strong>half-cooked meals</strong> when the flame flickers out.
              </p>
            </motion.div>
            
            {/* Card 2: Blind Vendor Logistics */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#ffffff] p-6 sm:p-8 rounded-[2rem] border border-[#abb3b7]/15 flex flex-col gap-5 md:mt-12 hover:translate-y-[-4px] transition-transform shadow-sm"
            >
              <span className="text-[#9f403d] text-3xl sm:text-4xl italic font-headline">02</span>
              <h3 className="font-headline text-xl font-bold text-[#2b3437]">Blind Logistics</h3>
              <p className="text-[#586064] text-sm leading-relaxed font-body">
                Vendors drive inefficient, reactive routes, missing customers who need gas while wasting fuel delivering to those who don't.
              </p>
            </motion.div>

            {/* Card 3: The Predictive Solution */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#0c56d0] p-6 sm:p-8 rounded-[2rem] text-white flex flex-col gap-5 sm:col-span-2 hover:translate-y-[-4px] transition-transform shadow-xl shadow-[#0c56d0]/20"
            >
              <div className="flex items-center gap-4">
                <span className="text-white/40 text-3xl sm:text-4xl italic font-headline">03</span>
                <h3 className="font-headline text-xl sm:text-2xl font-bold">Predictive Intelligence</h3>
              </div>
              <p className="text-white/80 text-sm sm:text-md leading-relaxed max-w-2xl font-body">
                Our IoT hardware provides <strong>real-time telemetry</strong>. By predicting exactly when gas will run out, we allow vendors to reduce fuel waste by <strong>30%</strong>.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;