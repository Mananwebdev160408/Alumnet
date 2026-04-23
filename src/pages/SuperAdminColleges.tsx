import { useState } from "react";
import { cn } from "@/lib/utils";

const institutes = [
  { id: "INST-001", name: "IIT Delhi", domain: "iitd.ac.in", location: "New Delhi", nodes: "4,201", status: "Online", health: 98 },
  { id: "INST-002", name: "MIT Engineering", domain: "mit.edu", location: "Cambridge, MA", nodes: "12,840", status: "Online", health: 99 },
  { id: "INST-003", name: "Stanford Alumni", domain: "stanford.edu", location: "Stanford, CA", nodes: "8,920", status: "Online", health: 97 },
  { id: "INST-004", name: "Harvard Business", domain: "harvard.edu", location: "Boston, MA", nodes: "5,400", status: "Busy", health: 94 },
  { id: "INST-005", name: "BITS Pilani", domain: "bits-pilani.ac.in", location: "Pilani, RJ", nodes: "3,150", status: "Online", health: 96 },
  { id: "INST-006", name: "Oxford Connect", domain: "ox.ac.uk", location: "Oxford, UK", nodes: "7,200", status: "Offline", health: 12 },
];

export const SuperAdminColleges = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-10 pb-20">
      {/* HUD Header */}
      <section className="bg-surface-container-lowest p-8 rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="material-symbols-outlined text-primary-container text-sm">hub</span>
              <p className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest">Global Node Management</p>
           </div>
           <h1 className="text-3xl font-black text-on-surface tracking-tight leading-none uppercase">Institute Nodes</h1>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-surface-container rounded-2xl text-xs font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">policy</span>
              Security Audit
           </button>
           <button className="px-6 py-2.5 bg-primary-container text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add_business</span>
              Onboard
           </button>
        </div>
      </section>

      {/* Global Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Active Nodes", val: "142", trend: "Clusters", color: "text-primary", icon: "lan" },
          { label: "Pending Apps", val: "12", trend: "Requests", color: "text-secondary", icon: "pending_actions" },
          { label: "Global Uptime", val: "99.9%", trend: "Last 24h", color: "text-emerald-600", icon: "offline_bolt" },
          { label: "Total Sync", val: "4.2TB", trend: "Bandwidth", color: "text-primary-container", icon: "sync_alt" }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-8 rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm transition-all hover:bg-white group">
             <div className="flex items-center gap-3 mb-4">
                <span className={cn("material-symbols-outlined text-lg", stat.color)}>{stat.icon}</span>
                <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">{stat.label}</span>
             </div>
             <p className="text-3xl font-black text-on-surface tracking-tighter group-hover:translate-x-1 transition-transform">{stat.val}</p>
             <p className="text-[9px] font-bold text-on-surface-variant/30 uppercase mt-1">{stat.trend}</p>
          </div>
        ))}
      </section>

      {/* Main Registry Table */}
      <section className="bg-surface-container-lowest rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="px-8 py-6 border-b border-[#c7c4d8]/10 bg-surface-container-low/30 md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
           <div className="flex items-center gap-4 flex-1 max-w-sm">
              <span className="material-symbols-outlined text-slate-400">search</span>
              <input 
                 className="w-full bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-400" 
                 placeholder="Search institute registry..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border border-[#c7c4d8]/10 rounded-xl text-[10px] font-black uppercase text-on-surface-variant/60 flex items-center gap-2 hover:shadow-md transition-all">
                 <span className="material-symbols-outlined text-sm">filter_list</span>
                 Filters
              </button>
              <div className="h-4 w-px bg-[#c7c4d8]/20 mx-2" />
              <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">{institutes.length} Localized Nodes</span>
           </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-[#c7c4d8]/5">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Node ID</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Institution Identity</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">User Base</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Performance</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 text-right">Operations</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-[#c7c4d8]/5">
                 {institutes.map((inst) => (
                    <tr key={inst.id} className="hover:bg-primary/5 transition-colors group">
                       <td className="px-8 py-6">
                          <span className="font-black text-[10px] text-on-surface-variant/50">#{inst.id}</span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-11 h-11 bg-surface-container rounded-xl flex items-center justify-center text-primary shadow-inner">
                                <span className="material-symbols-outlined">account_balance</span>
                             </div>
                             <div>
                                <p className="text-sm font-black text-on-surface uppercase tracking-tight">{inst.name}</p>
                                <p className="text-[10px] font-black text-on-surface-variant/40 lowercase italic tracking-tight">{inst.domain}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <span className="material-symbols-outlined text-sm text-slate-400">groups</span>
                             <span className="text-xs font-black text-on-surface">{inst.nodes}</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="space-y-2 w-28">
                             <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                <div 
                                   className={cn(
                                     "h-full transition-all duration-1000",
                                     inst.health > 80 ? "bg-emerald-500" : inst.health > 50 ? "bg-amber-500" : "bg-error"
                                   )}
                                   style={{ width: `${inst.health}%` }} 
                                />
                             </div>
                             <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-tighter">{inst.health}% Balanced</p>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={cn(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase border tracking-widest",
                             inst.status === 'Online' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                             inst.status === 'Busy' ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-error/5 text-error border-error/10"
                          )}>
                             <span className={cn("w-1 h-1 rounded-full", inst.status === 'Online' ? "bg-emerald-600" : inst.status === 'Busy' ? "bg-amber-600 animate-pulse" : "bg-error")}></span>
                             {inst.status}
                          </span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="w-9 h-9 rounded-xl bg-surface-container text-on-surface-variant hover:text-primary transition-all shadow-sm">
                                <span className="material-symbols-outlined text-lg">open_in_new</span>
                             </button>
                             <button className="w-9 h-9 rounded-xl bg-surface-container text-on-surface-variant hover:bg-on-surface hover:text-white transition-all shadow-sm">
                                <span className="material-symbols-outlined text-lg">more_vert</span>
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <div className="p-6 bg-surface-container-low/30 border-t border-[#c7c4d8]/10 flex items-center justify-between">
           <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Synchronizing 1-10 of 142 Global Nodes</p>
           <div className="flex gap-3">
              <button className="w-10 h-10 rounded-xl bg-white border border-[#c7c4d8]/10 flex items-center justify-center text-on-surface-variant opacity-40 cursor-not-allowed">
                 <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white border border-[#c7c4d8]/10 flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-all">
                 <span className="material-symbols-outlined text-xl font-black">chevron_right</span>
              </button>
           </div>
        </div>
      </section>

      {/* Auxiliary Interface */}
      <section className="grid md:grid-cols-2 gap-10">
         <div className="space-y-6">
            <h3 className="text-xs font-black text-on-surface uppercase tracking-[0.2em] flex items-center gap-3">
               <span className="material-symbols-outlined text-primary-container">rss_feed</span>
               Live Cluster Feed
            </h3>
            <div className="space-y-3">
               {[
                 { msg: "Oxford Node reporting localized latency", time: "12m ago", type: "warn", icon: "cloud_off" },
                 { msg: "MIT Cluster user limit extension request", time: "44m ago", type: "info", icon: "group_add" },
                 { msg: "Stanford Protocol Sync deviation detected", time: "1h ago", type: "crit", icon: "emergency" },
               ].map((a, i) => (
                 <div key={i} className="p-5 bg-surface-container-lowest border border-[#c7c4d8]/10 rounded-[1.5rem] flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                       <span className={cn(
                          "material-symbols-outlined text-lg",
                          a.type === 'warn' ? "text-amber-500" : a.type === 'crit' ? "text-error" : "text-primary"
                       )}>{a.icon}</span>
                       <span className="text-[11px] font-black text-on-surface uppercase tracking-tight">{a.msg}</span>
                    </div>
                    <span className="text-[9px] font-bold text-on-surface-variant/30 uppercase">{a.time}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="space-y-6">
            <h3 className="text-xs font-black text-on-surface uppercase tracking-[0.2em] flex items-center gap-3">
               <span className="material-symbols-outlined text-primary-container">add_box</span>
               Rapid Onboarding
            </h3>
            <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center gap-6 group cursor-pointer hover:bg-primary hover:text-white transition-all duration-500 shadow-sm">
               <div className="w-16 h-16 rounded-[1.5rem] bg-white text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl font-black">rocket_launch</span>
               </div>
               <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] mb-1">Initialize Node Protocol</p>
                  <p className="text-[10px] font-medium opacity-60 uppercase tracking-tighter">Kickstart the institution validation sequence</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};
