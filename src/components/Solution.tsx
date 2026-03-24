const Solution = () => {
  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-headline text-5xl font-extrabold mb-6 tracking-tight text-[#2b3437]">
            Architectural Intelligence
          </h2>
          <p className="text-xl text-[#586064] font-body">
            We don't just track gas. We engineer visibility through a sophisticated integration of IoT and AI.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Real-time Tracking (Large Blue Block) */}
          <div className="md:col-span-2 bg-[#0c56d0] p-12 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-end min-h-[450px] shadow-xl">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-gradient-to-l from-white/20 to-transparent">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu0hfNppMLmVk6o71PE1eAcnHTc6NzJF6lzqmLZOAIY45o361iJgcqhGRD_JgEHz0Bf9_OjeYoCIvx-6CQqmtm2Tdhr9q0M8FGO1iFIiG3pxGiTkvJz6iVbR6S1fiXQRNIPwoRrbxpYnhrxx25yfgd2gwcW1uuY-KelD72UmTmZM2SEAllrhshvTAie41T54K0Ej0yWpf0Ht7oBAb5WUPhHpzWemjYeS4rdw4KkP50CXc3HlZ8H26dhrN7vB_v3nx_XW70VOH8GH4m" alt="image" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                <span className="text-2xl">⊕</span>
              </div>
              <h3 className="font-headline text-3xl font-bold mb-4">Real-time tracking</h3>
              <p className="text-blue-100 text-lg max-w-md font-body">
                GPS and IoT sensor fusion provides sub-meter accuracy for every cylinder in your global inventory network.
              </p>
            </div>
          </div>

          {/* 2. AI-powered Inventory (Tall White Block) */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-[#abb3b7]/15 flex flex-col gap-8 shadow-sm">
            <div className="w-16 h-16 bg-[#dae2ff] flex items-center justify-center rounded-2xl">
              <span className="text-[#0c56d0] text-3xl">◈</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-[#2b3437]">AI-powered inventory</h3>
            <p className="text-[#586064] leading-relaxed font-body">
              Predictive analytics that forecast demand surges before they happen, optimizing your refill cycles.
            </p>
            <div className="mt-auto pt-4 border-t border-[#abb3b7]/10">
              {/* Simplified Trend line placeholder */}
              <div className="h-16 w-full bg-[#f1f4f6] rounded-xl flex items-end px-2 gap-1">
                <div className="h-1/2 w-full bg-[#0c56d0]/20 rounded-t-sm"></div>
                <div className="h-2/3 w-full bg-[#0c56d0]/40 rounded-t-sm"></div>
                <div className="h-full w-full bg-[#0c56d0] rounded-t-sm"></div>
                <div className="h-3/4 w-full bg-[#0c56d0]/60 rounded-t-sm"></div>
              </div>
            </div>
          </div>

          {/* 3. Network Visibility (Standard Grey Block) */}
          <div className="bg-[#e3e9ec] p-10 rounded-[2.5rem] flex flex-col gap-6">
            <span className="text-[#0c56d0] text-4xl font-bold">☗</span>
            <h3 className="font-headline text-2xl font-bold text-[#2b3437]">Clear network visibility</h3>
            <p className="text-[#586064] font-body">
              A unified command center for your entire distribution fleet, regardless of geography.
            </p>
          </div>

          {/* 4. Enterprise Grade (Wide Mini Overlay Block) */}
          <div className="md:col-span-2 bg-white rounded-[2.5rem] border border-[#abb3b7]/15 overflow-hidden relative group">
            <div className="flex flex-col md:flex-row h-full">
              <div className="p-10 md:w-1/2 flex flex-col justify-center">
                <h3 className="font-headline text-2xl font-bold mb-4 text-[#2b3437]">Enterprise Grade</h3>
                <p className="text-[#586064] font-body">
                  Built for demanding logistics with 99.99% uptime and military-grade encryption.
                </p>
              </div>
              <div className="md:w-1/2 bg-[#eaeff1] flex items-center justify-center">
                 {/* Imagine a high-end industrial photo here */}
                 <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMb1_qhEm2wAzWFHxhYO-aiuMo7ycAvYyFICl1QBnE0mh4xnrx6Y2FAuZO-v7KvNiL3_6lMtVob-o0CBaTCi37Izhj4nzDWDQr-Pe_Tbte0A0xRWbI99sKuDyQVYz1OpVEVCgUFdq3inUCn3xdVwJqCg2eyhdPlPRvFW2JwpsixthIv72qz1l0fbHFMnDWxwqz1g9OaCyvcT7AaP2YhrjoBAZfo_wDbFbATOTKGoqFwNIlscRyOR_fVzIspvSmIaBTCPaubHrY-IJ6" 
                    className="w-full h-full object-cover"
                    alt="Industrial"
                 />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Solution;