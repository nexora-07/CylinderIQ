import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    // Reduced outer padding for mobile (py-20 px-6)
    <section className="py-20 md:py-32 px-6 md:px-8 bg-white">
      {/* The CTA Box */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        // Adjusted padding: p-8 on mobile, p-16 on desktop
        className="max-w-5xl mx-auto bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
      >
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c56d0]/40 to-transparent"></div>

        <div className="relative z-10">
          {/* Headline: text-3xl on mobile, text-5xl on desktop */}
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 md:mb-8 tracking-tight leading-tight">
            Ready to optimize your network?
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 md:mb-12 font-body">
            Join the world's most advanced LPG distributors using CylinderIQ to
            drive efficiency and eliminate losses.
          </p>

          {/* Buttons: flex-col on small mobile, flex-row on larger mobile/desktop */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Link to="/register" className="w-full sm:w-auto">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px rgba(12, 86, 208, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0c56d0] text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all w-full sm:w-auto"
              >
                Book a Demo
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-sm text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all w-full sm:w-auto"
            >
              Contact Sales
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Footer: Stacks vertically on mobile, horizontally on desktop */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-7xl mx-auto mt-20 md:mt-32 pt-12 border-t border-[#abb3b7]/15 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8"
      >
        <div>
          <span className="font-headline font-bold text-2xl text-[#2b3437]">
            CylinderIQ
          </span>
          <p className="text-[#586064] text-sm mt-2 font-body">
            © 2026 Architectural Intelligence Framework.
          </p>
        </div>

        <div className="flex gap-6 md:gap-8 text-[#586064] text-sm font-medium font-body">
          <a href="#" className="hover:text-[#0c56d0] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#0c56d0] transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-[#0c56d0] transition-colors">
            Security
          </a>
        </div>
      </motion.footer>
    </section>
  );
};

export default CallToAction;
