import { motion } from 'framer-motion';

const Solution = () => {
  const steps = [
    {
      number: "01",
      title: "Precision Sensing",
      desc: "Industrial-grade 50kg load cells capture raw weight data with surgical precision, eliminating manual guesswork.",
      icon: "scale",
      detail: "Hardware: HX711 + Load Cells"
    },
    {
      number: "02",
      title: "Edge Intelligence",
      desc: "An ESP32-driven Moving Average Algorithm filters noise and predicts depletion based on your unique cooking patterns.",
      icon: "psychology",
      detail: "Process: Deep Sleep Autonomy"
    },
    {
      number: "03",
      title: "Predictive Security",
      desc: "Real-time telemetry translates into 'Days Remaining.' Automated alerts ensure a refill arrives before the flame goes out.",
      icon: "verified_user",
      detail: "Outcome: 30% Logistics Saving"
    }
  ];

  return (
    <section id="solution" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#0c56d0] font-bold uppercase tracking-[0.2em] text-sm mb-4 font-body">
              Solution
            </h2>
            <h3 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2b3437] leading-tight">
              Hardware at the Edge, <br/>
              <span className="text-[#0c56d0]">DaaS in the Cloud.</span>
            </h3>
          </div>
          <p className="text-[#586064] text-lg max-w-sm font-body leading-relaxed">
            Bridging the gap between household energy security and optimized industrial distribution.
          </p>
        </div>

        {/* The Solution Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-[#f8f9fa] rounded-[2rem] border border-[#abb3b7]/15 hover:bg-white hover:shadow-2xl hover:shadow-[#0c56d0]/5 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-[#0c56d0]/5 rounded-xl flex items-center justify-center text-[#0c56d0] group-hover:bg-[#0c56d0] group-hover:text-white transition-colors duration-500">
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <span className="font-headline italic text-4xl text-[#abb3b7]/30 group-hover:text-[#0c56d0]/20 transition-colors">
                  {step.number}
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="font-headline text-xl font-bold text-[#2b3437]">{step.title}</h4>
                <p className="text-[#586064] text-sm leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>

              {/* Technical Ghost Label */}
              <div className="mt-8 pt-6 border-t border-[#abb3b7]/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#abb3b7]">
                  {step.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Device Pairing
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-8 bg-[#f1f4f6] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#abb3b7]/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm font-medium text-[#586064] font-body">
              Ready to sync your <strong>CylinderIQ Smart Scale</strong>?
            </p>
          </div>
          <button className="bg-[#0c56d0] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#004aba] transition-all shadow-lg shadow-[#0c56d0]/20 font-headline">
            Get Device ID
          </button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Solution;