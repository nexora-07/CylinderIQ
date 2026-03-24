const Problem = () => {
  return (
    <section className="py-24 px-8 bg-[#f1f4f6]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Column: The Editorial Header */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <span className="text-[#0c56d0] font-bold uppercase tracking-widest text-sm mb-4 font-body">
              The Challenge
            </span>
            <h2 className="font-headline text-5xl font-bold mb-6 text-[#2b3437] leading-tight">
              Invisible Losses, <br/>Vulnerable Networks.
            </h2>
            <p className="text-[#586064] text-lg leading-relaxed font-body max-w-md">
              Traditional LPG distribution suffers from blind spots that bleed revenue every single day through inefficient manual processes.
            </p>
          </div>

          {/* Right Column: The Asymmetrical Card Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Distribution Losses */}
            <div className="bg-[#ffffff] p-8 rounded-[2rem] border border-[#abb3b7]/15 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-sm">
              <span className="text-[#9f403d] text-4xl italic font-headline">01</span>
              <h3 className="font-headline text-xl font-bold text-[#2b3437]">Distribution losses</h3>
              <p className="text-[#586064] text-sm leading-relaxed font-body">
                Unaccounted variances in cylinder volume throughout the supply chain that impact margins and bottom-line growth.
              </p>
            </div>
            
            {/* Card 2: Inventory Mismanagement (Asymmetrical Offset) */}
            <div className="bg-[#ffffff] p-8 rounded-[2rem] border border-[#abb3b7]/15 flex flex-col gap-5 md:mt-12 hover:translate-y-[-4px] transition-transform shadow-sm">
              <span className="text-[#9f403d] text-4xl italic font-headline">02</span>
              <h3 className="font-headline text-xl font-bold text-[#2b3437]">Inventory mismanagement</h3>
              <p className="text-[#586064] text-sm leading-relaxed font-body">
                Deadstock and localized shortages caused by stagnant data and slow manual auditing processes.
              </p>
            </div>

            {/* Card 3: Opaque Logistics (Wide Span) */}
            <div className="bg-[#ffffff] p-8 rounded-[2rem] border border-[#abb3b7]/15 flex flex-col gap-5 sm:col-span-2 hover:translate-y-[-4px] transition-transform shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-[#9f403d] text-4xl italic font-headline">03</span>
                <h3 className="font-headline text-2xl font-bold text-[#2b3437]">Opaque logistics</h3>
              </div>
              <p className="text-[#586064] text-md leading-relaxed max-w-2xl font-body">
                A total lack of real-time location data for individual cylinders, leading to theft, misplacement, and inefficient routing across the network.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;