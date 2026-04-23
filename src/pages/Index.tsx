import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "person_search",
      title: "Alumni Discovery",
      description: "Search across global institutional data points with precision.",
      color: "text-primary"
    },
    {
      icon: "calendar_today",
      title: "Direct Scheduling",
      description: "Slot-based booking with automated conflict resolution.",
      color: "text-secondary"
    },
    {
      icon: "video_call",
      title: "Built-in Video",
      description: "Native signaling for high-fidelity mentorship sessions.",
      color: "text-emerald-600"
    },
    {
      icon: "ads_click",
      title: "Referral Board",
      description: "Internal job relay system with direct alumni vouchers.",
      color: "text-amber-600"
    },
  ];

  return (
    <div className="min-h-screen bg-surface-container-low selection:bg-primary-container selection:text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2"></div>
      
      <main className="relative pt-32 pb-20 px-6 lg:px-8 max-w-[1400px] mx-auto space-y-32">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-[#c7c4d8]/10 rounded-full shadow-sm">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest">Protocol v3.0 Active</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-on-surface tracking-tighter leading-[0.85] uppercase">
              The Private <br />
              <span className="text-primary-container">Mentorship</span> <br />
              Network.
            </h1>
            
            <p className="text-xl lg:text-2xl text-on-surface-variant font-medium leading-relaxed max-w-xl opacity-60">
              High-trust institutional isolation for the next generation of industry leaders.
              Secure your professional legacy within the AlumNet core.
            </p>
            
            <div className="flex flex-wrap gap-5 pt-4">
              <button 
                onClick={() => navigate("/auth/signup")}
                className="px-10 py-5 bg-primary-container text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-container/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3"
              >
                Apply for Access
                <span className="material-symbols-outlined font-black">arrow_forward</span>
              </button>
              <button 
                onClick={() => navigate("/auth/login")}
                className="px-10 py-5 bg-white text-on-surface rounded-[2rem] font-black text-sm uppercase tracking-widest border border-[#c7c4d8]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Operator Login
              </button>
            </div>

            <div className="flex gap-12 pt-10 border-t border-[#c7c4d8]/10">
              {[
                { val: "10K+", label: "Identified Units" },
                { val: "500+", label: "Active Nodes" },
                { val: "50+", label: "Secure Zones" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-4xl font-black text-on-surface tracking-tighter">{stat.val}</p>
                  <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-3 rounded-[3rem] shadow-2xl shadow-primary/10 border border-[#c7c4d8]/10 relative z-10">
               <div className="aspect-[4/5] bg-surface-container-low rounded-[2.5rem] overflow-hidden relative flex flex-col p-8 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-[#c7c4d8]/10">
                     <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Interface Preview</p>
                     <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                     </div>
                  </div>
                  
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-[#c7c4d8]/5 flex items-center gap-4 shadow-sm hover:translate-x-2 transition-transform cursor-pointer group">
                       <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined">person</span>
                       </div>
                       <div className="flex-1 space-y-2">
                          <div className="h-2.5 w-24 bg-surface-container rounded-full"></div>
                          <div className="h-1.5 w-40 bg-surface-container opacity-50 rounded-full"></div>
                       </div>
                    </div>
                  ))}

                  <div className="mt-auto flex justify-between items-center text-[9px] font-black text-on-surface-variant/20 tracking-widest uppercase pb-2">
                     <span>Encryption: AES-256</span>
                     <span>Sync: Active</span>
                  </div>
               </div>
            </div>
            
            {/* Visual Flare */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-container rounded-[2rem] -z-0 blur-2xl opacity-10"></div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {features.map((feature, i) => (
             <div key={i} className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all group">
                <div className="w-14 h-14 bg-surface-container rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                   <span className={cn("material-symbols-outlined text-3xl font-black group-hover:text-white", feature.color)}>{feature.icon}</span>
                </div>
                <h3 className="text-lg font-black text-on-surface uppercase tracking-tight mb-4">{feature.title}</h3>
                <p className="text-sm font-medium text-on-surface-variant opacity-60 leading-relaxed">
                   {feature.description}
                </p>
             </div>
           ))}
        </section>

        {/* CTA Banner */}
        <section className="bg-on-surface rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 grayscale invert"></div>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
           
           <div className="relative space-y-10">
              <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] max-w-3xl mx-auto">
                 Ready to <span className="text-primary-container">Initialize</span> Your Node?
              </h2>
              <p className="text-lg lg:text-xl text-white/50 max-w-xl mx-auto font-medium">
                 Join the encrypted network of elite professionals. 
                 Verified alumni authentication required for establish link.
              </p>
              <div className="flex flex-wrap gap-5 justify-center">
                 <button 
                  onClick={() => navigate("/auth/signup")}
                  className="px-12 py-5 bg-primary-container text-white rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-container/30 hover:scale-105 active:scale-95 transition-all"
                 >
                   Establish Connection
                 </button>
                 <button 
                  onClick={() => navigate("/apply")}
                  className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:bg-white hover:text-on-surface transition-all"
                 >
                   Institute Inquiry
                 </button>
              </div>
           </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-[#c7c4d8]/10 px-8 py-12 bg-white/50 backdrop-blur-md">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-on-surface rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">hub</span>
               </div>
               <span className="text-sm font-black text-on-surface uppercase tracking-tighter">AlumNet.SYS</span>
            </div>
            <p className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.5em] text-center">
               © 2026 AlumNet Global Infrastructure // Strategic Connectivity
            </p>
            <div className="flex gap-8">
               {['Status', 'Privacy', 'Security'].map(t => (
                 <a key={t} href="#" className="text-[10px] font-black uppercase text-on-surface-variant/40 hover:text-primary transition-colors tracking-widest">{t}</a>
               ))}
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Index;
