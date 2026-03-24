const Features = () => {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Column: Feature List */}
        <div className="lg:w-1/2">
          {/* Pill Shape Badge from Design Specs */}
          <div className="inline-flex items-center gap-2 bg-[#dae2ff] text-[#0c56d0] px-4 py-1.5 rounded-full text-sm font-bold mb-8 font-body">
            <span>●</span> Global Control
          </div>
          
          <h2 className="font-headline text-5xl font-extrabold mb-8 tracking-tight text-[#2b3437]">
            Features Built for Scale
          </h2>

          <div className="space-y-10">
            {/* Feature 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0c56d0] text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-headline text-xl font-bold mb-2 text-[#2b3437]">Map view</h4>
                <p className="text-[#586064] font-body">
                  Interactive 3D geospatial dashboard that visualizes the physical movement of your assets across borders.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0c56d0] text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-headline text-xl font-bold mb-2 text-[#2b3437]">Automated reporting</h4>
                <p className="text-[#586064] font-body">
                  Schedule detailed compliance and inventory reports delivered directly to your stakeholders weekly.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0c56d0] text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-headline text-xl font-bold mb-2 text-[#2b3437]">Enterprise security</h4>
                <p className="text-[#586064] font-body">
                  Biometric access controls for fleet operators and encrypted data transmission for all IoT sensors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The "Map View" Visualization */}
        <div className="lg:w-1/2 w-full h-[600px] rounded-[3rem] overflow-hidden relative border border-[#abb3b7]/15 shadow-2xl">
          {/* Main Map Image */}
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI80eEoZn3X-hF7klxSTQHzUpLtovD_GyMGibPj2_r_arh0yHVRxbasyk0MEWN4PfnJk6vGVoJL63vy4Rtr2bJhoKEfk-bOwSRPJspxg9xlehXOQmgAfGWyTPlC-BtTzRJkv9FSh2wJCemNgAymurUP8AgBbtaEu9CQIXk1CbK8p5jgsAPqhdYSTKcG7YAogCD2D1GdcEcBa6UnBKPN_C0RY5-Wk20aglWK_fpIbCfOuUJbmckfey8I_w80zOnS9TsBJ3HXLcksD4u" 
            alt="Global Tracking Map" 
            className="w-full h-full object-cover brightness-[0.7] contrast-[1.2]"
          />
          
          {/* Overlay Card: Atmospheric Layering Principle */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-[#0c56d0] mb-1 font-body">Active Distribution</p>
                <p className="text-3xl font-black text-[#2b3437] font-headline">4,829 Units</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600 mb-2 font-body">Optimal Status</p>
                {/* Cylinder Status Chip from Design Specs */}
                <div className="w-32 h-2 bg-[#eaeff1] rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-[#0c56d0]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;