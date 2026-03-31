import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    // FIX: Reduced pt-24/pt-32 to pt-16 to pull content UP
    <section className="relative overflow-hidden pt-16 md:pt-16 pb-16 md:pb-32 px-6 md:px-8 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        {/* Animated Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // Ensure z-index keeps text readable over background glow
          className="w-full md:w-1/2 text-center md:text-left z-20"
        >
          {/* Headline: Now has margin-bottom for better spacing */}
          <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2b3437] leading-tight tracking-tight mb-8">
            Never Run Out of Gas{" "}
            <span className="text-[#0c56d0] italic">Ever Again.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-[#586064] max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed font-body">
            CylinderIQ uses IoT smart scales and predictive AI to monitor your
            LPG levels in real-time. We tell you exactly how many days of
            cooking you have left and automate the refill before the flame goes
            out.
          </p>
          
          {/* Dynamic Buttons: Get Started & Sign In */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link to="/register">
              <button className="bg-[#0c56d0] hover:bg-[#004aba] text-white px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-[1.02] shadow-xl w-full sm:w-auto">
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-white border-2 border-[#0c56d0] text-[#0c56d0] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#0c56d0]/5 transition-all w-full sm:w-auto">
                Sign In
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Image Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ willChange: "transform, opacity" }}
          className="w-full md:w-1/2 relative"
        >
          {/* Card: Restored border for a clean visualization frame */}
          <div className="bg-white p-2 sm:p-4 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl relative z-10 border border-[#abb3b7]/15">
            <img
              // FIX: Replaced generic user image placeholder with the Dashboard visualization
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtgs5K8fpcoHL6CBm3I0CsJ7aBSSvfVGkCMYHN8c_KWHNlMpLDdB2FwGzqOnrBAOWSEDs8ZTCJI6nMd84rwYEzwYVZbwWEqldXp_Z4cslBATBZqXz5yofEUe8ma-uwq_6uDDHdbTVzawGMDPjWKzCQsziyt8wClJFtKXfgL5BuU8azQTsTQr-TrE5L9CEl9yKn_ZTORFD50TwUCExeYG77MYqHeR1hi61Th0SKqnb4ms-H66Io1Zr1TeDjB975Fbha5pXjbZoIURHg"
              alt="CylinderIQ Distributor Dashboard Analytics"
              className="w-full h-auto rounded-[1.2rem] sm:rounded-[2rem] object-cover aspect-[4/3]"
            />
          </div>

          {/* Glow: The decorative background effect remains z-0 */}
          <div className="absolute -top-5 -left-5 sm:-top-10 sm:-left-10 w-48 h-48 sm:w-64 sm:h-64 bg-[#0c56d0]/10 blur-[80px] sm:blur-[100px] rounded-full z-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;