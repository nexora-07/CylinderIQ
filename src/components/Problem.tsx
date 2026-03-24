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
    // Reduced padding on mobile (py-16) vs desktop (py-24)
    <section className="py-16 md:py-24 px-6 md:px-8 bg-[#f1f4f6]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column: Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            // Center text on mobile for better flow
            className="md:col-span-5 flex flex-col justify-center text-center md:text-left"
          >
            <span className="text-[#0c56d0] font-bold uppercase tracking-widest text-sm mb-4 font-body block">
              The Challenge
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#2b3437] leading-tight">
              Invisible Losses, <br className="hidden md:block"/>Vulnerable Networks.
            </h2>
            <p className="text-[#586064] text-lg leading-relaxed font-body max-w-md mx-auto md:mx-0">
              Traditional LPG distribution suffers from blind spots that bleed revenue every single day through inefficient manual processes.
            </p>
          </motion.div>

          {/* Right Column: The Card Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-[#ffffff] p-6 sm:p-8 rounded-[2rem] border border-[#abb3b7]/15 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-sm"
            >
              <span className="text-[#9f403d] text-3xl sm:text-4xl italic font-headline">01</span>
              <h3 className="font-headline text-xl font-bold text-[#2b3437]">Distribution losses</h3>
              <p className="text-[#586064] text-sm leading-relaxed font-body">
                Unaccounted variances in cylinder volume throughout the supply chain that impact margins and bottom-line growth.
              </p>
            </motion.div>
            
            {/* Card 2: Asymmetrical Offset removed on mobile (md:mt-12) */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              // mt-0 on mobile, mt-12 on medium screens and up
              className="bg-[#ffffff] p-6 sm:p-8 rounded-[2rem] border border-[#abb3b7]/15 flex flex-col gap-5 md:mt-12 hover:translate-y-[-4px] transition-transform shadow-sm"
            >
              <span className="text-[#9f403d] text-3xl sm:text-4xl italic font-headline">02</span>
              <h3 className="font-headline text-xl font-bold text-[#2b3437]">Inventory mismanagement</h3>
              <p className="text-[#586064] text-sm leading-relaxed font-body">
                Deadstock and localized shortages caused by stagnant data and slow manual auditing processes.
              </p>
            </motion.div>

            {/* Card 3: Opaque Logistics */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#ffffff] p-6 sm:p-8 rounded-[2rem] border border-[#abb3b7]/15 flex flex-col gap-5 sm:col-span-2 hover:translate-y-[-4px] transition-transform shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#9f403d] text-3xl sm:text-4xl italic font-headline">03</span>
                <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#2b3437]">Opaque logistics</h3>
              </div>
              <p className="text-[#586064] text-sm sm:text-md leading-relaxed max-w-2xl font-body">
                A total lack of real-time location data for individual cylinders, leading to theft, misplacement, and inefficient routing across the network.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;