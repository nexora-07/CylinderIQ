const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 px-8 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          {/* Reduced text sizes here */}
          <h1 className="font-headline text-4xl lg:text-5xl font-extrabold text-[#2b3437] leading-tight tracking-tight mb-6">
            Smart LPG Tracking for <span className="text-[#0c56d0] italic">Modern Distribution</span>
          </h1>
          <p className="text-lg text-[#586064] max-w-xl mb-10 leading-relaxed font-body">
            The architectural intelligence framework for your distribution network. Eliminate opacity and regain control over your critical industrial assets.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#0c56d0] hover:bg-[#004aba] text-white px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-[1.02] shadow-xl">
              Get Started
            </button>
            <button className="bg-[#e3e9ec] text-[#2b3437] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#dbe4e7] transition-all">
              Watch the Video
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative">
          <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl relative z-10 border border-[#abb3b7]/15">
            {/* Added a real image to replace the placeholder div */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtgs5K8fpcoHL6CBm3I0CsJ7aBSSvfVGkCMYHN8c_KWHNlMpLDdB2FwGzqOnrBAOWSEDs8ZTCJI6nMd84rwYEzwYVZbwWEqldXp_Z4cslBATBZqXz5yofEUe8ma-uwq_6uDDHdbTVzawGMDPjWKzCQsziyt8wClJFtKXfgL5BuU8azQTsTQr-TrE5L9CEl9yKn_ZTORFD50TwUCExeYG77MYqHeR1hi61Th0SKqnb4ms-H66Io1Zr1TeDjB975Fbha5pXjbZoIURHg" 
              alt="CylinderIQ Dashboard Preview"
              className="w-full h-auto rounded-[2rem] object-cover aspect-[4/3]"
            />
          </div>
          {/* Added a soft glow behind the image to match "Atmospheric Layering" */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#0c56d0]/10 blur-[100px] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;