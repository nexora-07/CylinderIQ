import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 px-6 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Animated Feature List */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-[#dae2ff] text-[#0c56d0] px-4 py-1.5 rounded-full text-sm font-bold mb-6 md:mb-8 font-body">
            <span>●</span> IoT Intelligence
          </div>
          
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-[#2b3437]">
            Technology Built for <span className="text-[#0c56d0]">Energy Security</span>
          </h2>

          <div className="space-y-8 md:space-y-10 text-left">
            {[
              { 
                id: 1, 
                title: "Deep Sleep Autonomy", 
                desc: "Active power gating and ultra-low consumption logic ensure the ESP32-driven scale lasts months on a single charge." 
              },
              { 
                id: 2, 
                title: "Noise-Filtering AI", 
                desc: "Our Moving Average Algorithm filters out physical interference to provide a stable, precise gas level prediction." 
              },
              { 
                id: 3, 
                title: "DaaS Logistics Optimization", 
                desc: "Predictive analytics for distributors that reduce fuel waste and operational costs by an estimated 30%." 
              }
            ].map((feature, index) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex gap-4 md:gap-6"
              >
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#0c56d0] text-white flex items-center justify-center font-bold text-sm md:text-base">
                  {feature.id}
                </div>
                <div>
                  <h4 className="font-headline text-lg md:text-xl font-bold mb-1 md:mb-2 text-[#2b3437]">{feature.title}</h4>
                  <p className="text-[#586064] text-sm md:text-base font-body">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Predictive Map & Floating Performance Card */}
        <div className="lg:w-1/2 w-full h-[400px] sm:h-[500px] md:h-[600px] relative">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden relative border border-[#abb3b7]/15 shadow-2xl"
          >
            {/* Contextual Image of IoT Map from your PDF */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI80eEoZn3X-hF7klxSTQHzUpLtovD_GyMGibPj2_r_arh0yHVRxbasyk0MEWN4PfnJk6vGVoJL63vy4Rtr2bJhoKEfk-bOwSRPJspxg9xlehXOQmgAfGWyTPlC-BtTzRJkv9FSh2wJCemNgAymurUP8AgBbtaEu9CQIXk1CbK8p5jgsAPqhdYSTKcG7YAogCD2D1GdcEcBa6UnBKPN_C0RY5-Wk20aglWK_fpIbCfOuUJbmckfey8I_w80zOnS9TsBJ3HXLcksD4u" 
              alt="Predictive Distribution Map" 
              className="w-full h-full object-cover brightness-[0.7] contrast-[1.2]"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
                <div>
                  <p className="text-xs md:text-sm font-bold text-[#0c56d0] mb-1 font-body">Logistics Efficiency</p>
                  <p className="text-2xl md:text-3xl font-black text-[#2b3437] font-headline">30% Savings</p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="text-xs md:text-sm font-bold text-green-600 mb-2 font-body">Predictive Status</p>
                  <div className="w-full sm:w-32 h-2 bg-[#eaeff1] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.4, duration: 1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-[#0c56d0] to-[#0253cd]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Features;