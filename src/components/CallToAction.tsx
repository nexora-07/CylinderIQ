const CallToAction = () => {
  return (
    <section className="py-32 px-8 bg-white">
      {/* The CTA Box: Using the "Signature Texture" Gradient */}
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
        
        {/* Subtle Gradient Overlay for "Soul" */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c56d0]/40 to-transparent"></div>
        
        <div className="relative z-10">
          <h2 className="font-headline text-5xl font-extrabold mb-8 tracking-tight">
            Ready to optimize your network?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-body">
            Join the world's most advanced LPG distributors using CylinderIQ to drive efficiency and eliminate losses.
          </p>
          
          <div className="flex justify-center gap-6 flex-wrap">
            {/* Primary Button: Tactile Command */}
            <button className="bg-[#0c56d0] hover:bg-[#004aba] text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-lg hover:shadow-[#0c56d0]/20 hover:scale-[1.02]">
              Book a Demo
            </button>
            
            {/* Secondary Button: Soft Alternative */}
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-xl font-bold text-xl transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Simple Editorial Footer */}
      <footer className="max-w-7xl mx-auto mt-32 pt-12 border-t border-[#abb3b7]/15 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-left">
          <span className="font-headline font-bold text-2xl text-[#2b3437]">CylinderIQ</span>
          <p className="text-[#586064] text-sm mt-2 font-body">© 2026 Architectural Intelligence Framework.</p>
        </div>
        <div className="flex gap-8 text-[#586064] text-sm font-medium font-body">
          <a href="#" className="hover:text-[#0c56d0] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#0c56d0] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#0c56d0] transition-colors">Security</a>
        </div>
      </footer>
    </section>
  );
};

export default CallToAction;