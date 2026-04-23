import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Kinshuk Kashyap",
    role: "Unit Leader",
    designation: "UX Architect",
    description: "Lead architect for core interface protocols & visual systems. Optimization specialist.",
    delay: "0s"
  },
  {
    name: "Manan Gupta",
    role: "Full Stack Engineer",
    designation: "Core Systems",
    description: "Engineering robust infrastructure with MERN stack & Firebase cloud arrays.",
    delay: "0.2s"
  },
  {
    name: "Tanvi Gupta", 
    role: "Systems Designer",
    designation: "Strategic Intel",
    description: "Conceptualization of problem-solution matrices & strategic presentation architecture.",
    delay: "0.4s"
  },
  {
    name: "Rishabh Mishra",
    role: "Data Analyst", 
    designation: "Intel Operations",
    description: "Validation of problem statements through deep-node data research & market analytics.",
    delay: "0.6s"
  },
  {
    name: "Prashant Singh",
    role: "Marketing Strategist",
    designation: "Relay Communications",
    description: "Architecting narrative protocols & value proposition transmissions for global delivery.",
    delay: "0.8s"
  },
  {
    name: "Sameer",
    role: "AI Lead",
    designation: "Neural Core Dev",
    description: "Implementation of autonomous neural chatbot relays & cognitive interaction models.",
    delay: "1s"
  }
];

const achievements = [
  { icon: "workspace_premium", text: "SIH 2025 Deployed", label: "Active Phase" },
  { icon: "school", text: "Education Sector", label: "Target Domain" },
  { icon: "verified", text: "Software Solution", label: "Category" },
  { icon: "military_tech", text: "National Level", label: "Achievement" }
];

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className={cn(
        "text-center space-y-8 transition-all duration-1000 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/5 rounded-full text-primary text-[10px] font-black tracking-widest uppercase">
            Project Dossier // 0x25017
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-on-surface tracking-tighter leading-none">
            AlumNet Core
          </h1>
          <p className="text-lg md:text-xl font-medium text-on-surface-variant opacity-70 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing institutional connectivity through high-fidelity networking and autonomous engagement protocols.
          </p>
        </div>

        {/* Strategic Overview Card */}
        <div className="bg-surface-container-lowest rounded-[3rem] p-12 border border-[#c7c4d8]/10 shadow-xl shadow-primary/5 max-w-6xl mx-auto relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left relative">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                       <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
                       Operational
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">SIH 2025 Release</span>
                 </div>
                 <h2 className="text-4xl font-black text-on-surface tracking-tight leading-none uppercase">Strategy Overview</h2>
                 <p className="text-sm font-medium text-on-surface-variant leading-relaxed opacity-80">
                    Centralized alumni data management platform engineered for the Smart India Hackathon. We focus on intelligent automation, high-density networking, and institutional legacy preservation at scale.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {achievements.map((item, i) => (
                    <div key={i} className="p-6 bg-surface-container rounded-[2rem] border border-[#c7c4d8]/5 flex flex-col gap-3 group/item hover:bg-white hover:shadow-md transition-all">
                       <span className="material-symbols-outlined text-primary-container text-2xl group-hover/item:scale-110 transition-transform">{item.icon}</span>
                       <div>
                          <p className="text-xs font-black text-on-surface uppercase tracking-tight">{item.text}</p>
                          <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">{item.label}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Team Manifest */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
           <h2 className="text-3xl md:text-5xl font-black text-on-surface tracking-tighter uppercase">Unit Manifest</h2>
           <div className="flex-1 h-px bg-[#c7c4d8]/20" />
           <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Syntax Squad // Team 1042</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div 
              key={i} 
              className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-[#c7c4d8]/10 shadow-sm group hover:translate-y-[-8px] hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
               <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shadow-inner">
                     <span className="material-symbols-outlined text-3xl">developer_mode</span>
                  </div>
                  <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">{member.designation}</span>
               </div>
               
               <div className="space-y-1 mb-6">
                  <h4 className="text-2xl font-black text-on-surface tracking-tight leading-none uppercase">{member.name}</h4>
                  <p className="text-[11px] font-black text-primary-container uppercase tracking-widest">{member.role}</p>
               </div>
               
               <p className="text-sm font-medium text-on-surface-variant leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                  {member.description}
               </p>
               
               <div className="mt-10 pt-8 border-t border-[#c7c4d8]/10 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-tighter flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                    Operational
                  </span>
                  <div className="flex gap-1.5">
                     {[1,2,3].map(b => <div key={b} className="w-1.5 h-1.5 bg-primary rounded-full" />)}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Vision */}
      <section className="relative group">
         <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-80 bg-primary/10 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
         <div className="bg-on-surface text-white rounded-[4rem] p-16 md:p-24 text-center space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative space-y-6">
               <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Strategic Vision</h3>
               <p className="text-xl md:text-3xl font-black leading-tight italic max-w-5xl mx-auto text-primary-container-variant bg-clip-text text-transparent bg-gradient-to-r from-primary-fixed-dim to-secondary-fixed">
                 "To create a revolutionary digital bridge between institutions and their legacy networks, fostering meritocratic growth through autonomous engagement protocols."
               </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6 relative">
               <button className="px-10 py-4 bg-white text-on-surface rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                  Explore Ecosystem
               </button>
               <button className="px-10 py-4 bg-transparent border-2 border-white/20 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                  Join Network
               </button>
            </div>
         </div>
      </section>

      {/* Operational Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Units", val: "06", icon: "groups_3" },
          { label: "Mission Sync", val: "100%", icon: "target" },
          { label: "Protocol ID", val: "25017", icon: "fingerprint" },
          { label: "Legacy Nodes", val: "∞", icon: "lan" }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-8 rounded-[2rem] border border-[#c7c4d8]/10 hover:border-primary/40 transition-all group shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary-container text-xl group-hover:rotate-12 transition-transform">{stat.icon}</span>
                <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">{stat.label}</span>
             </div>
             <p className="text-4xl font-black text-on-surface tracking-tighter group-hover:translate-x-2 transition-transform">{stat.val}</p>
          </div>
        ))}
      </section>

      {/* Footer Branding */}
      <div className="pt-20 border-t border-[#c7c4d8]/10 flex flex-wrap justify-between items-center gap-6">
         <div className="flex items-center gap-8 text-[11px] font-black uppercase text-on-surface-variant/40 tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-primary-container rounded-full"></span> 
              System Stable
            </span>
            <span>Ref: 1.0.4-Stitch</span>
         </div>
         <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em]">
            AlumNet Engineering © 2026
         </p>
      </div>
    </div>
  );
};