import { useState } from "react";
import { cn } from "@/lib/utils";

const users = [
  { id: "AL-770x-01", name: "Sarah Chen", email: "s.chen@iitd.ac.in", role: "ALUMNI", batch: "2018", status: "Verified", lastActive: "2h ago", company: "Google" },
  { id: "ST-221y-92", name: "James Miller", email: "j.miller@iitd.ac.in", role: "STUDENT", batch: "2025", status: "Pending", lastActive: "14m ago", company: "N/A" },
  { id: "AL-445z-12", name: "Elena Rossi", email: "e.rossi@iitd.ac.in", role: "ALUMNI", batch: "2012", status: "Verified", lastActive: "1d ago", company: "SpaceX" },
  { id: "AL-555w-33", name: "Marcus Thorne", email: "m.thorne@iitd.ac.in", role: "ALUMNI", batch: "2015", status: "Verified", lastActive: "5h ago", company: "Neuralink" },
  { id: "ST-888q-10", name: "Lila Vance", email: "l.vance@iitd.ac.in", role: "STUDENT", batch: "2024", status: "Verified", lastActive: "Active Now", company: "N/A" },
  { id: "AL-111r-44", name: "Zack Reed", email: "z.reed@iitd.ac.in", role: "ALUMNI", batch: "2020", status: "Verified", lastActive: "3d ago", company: "Apple" },
];

export const AdminUsers = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-10">
      {/* HUD Header */}
      <section className="bg-surface-container-lowest p-8 rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="material-symbols-outlined text-primary-container text-sm">shield_person</span>
              <p className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest">Administrative Context</p>
           </div>
           <h1 className="text-3xl font-black text-on-surface tracking-tight leading-none">User Registry</h1>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-surface-container rounded-2xl text-xs font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">file_download</span>
              Export
           </button>
           <button className="px-6 py-2.5 bg-primary-container text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">person_add</span>
              Provision
           </button>
        </div>
      </section>

      {/* Main Table Container */}
      <section className="bg-surface-container-lowest rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="px-8 py-6 border-b border-[#c7c4d8]/10 bg-surface-container-low/30 md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
           <div className="flex items-center gap-4 flex-1 max-w-sm">
              <span className="material-symbols-outlined text-slate-400">search</span>
              <input 
                 className="w-full bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-400" 
                 placeholder="Search registry..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-6">
              <div className="flex gap-4">
                 {['All', 'Alumni', 'Students', 'Pending'].map(f => (
                   <button key={f} className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 hover:text-primary transition-colors">
                     {f}
                   </button>
                 ))}
              </div>
              <div className="h-4 w-px bg-[#c7c4d8]/20" />
              <button className="w-10 h-10 rounded-xl bg-white border border-[#c7c4d8]/10 flex items-center justify-center text-primary-container hover:shadow-lg transition-all">
                 <span className="material-symbols-outlined text-xl">refresh</span>
              </button>
           </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-[#c7c4d8]/5">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Member Details</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Classification</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Last Presence</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-[#c7c4d8]/5">
                 {users.map((user) => (
                    <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-xs font-black text-on-surface-variant shadow-inner group-hover:scale-110 transition-transform">
                                {user.name.slice(0, 2).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-sm font-black text-on-surface uppercase tracking-tight">{user.name}</p>
                                <p className="text-[10px] font-black text-primary-container opacity-50">{user.id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="space-y-1">
                             <div className="flex items-center gap-2">
                                <span className={cn(
                                   "material-symbols-outlined text-sm font-black",
                                   user.role === 'ALUMNI' ? "text-primary" : "text-amber-600"
                                )}>
                                   {user.role === 'ALUMNI' ? "work" : "school"}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                             </div>
                             <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">
                                {user.company !== 'N/A' ? user.company : `Graduation ${user.batch}`}
                             </p>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={cn(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase border tracking-widest",
                             user.status === 'Verified' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             <span className={cn("w-1 h-1 rounded-full", user.status === 'Verified' ? "bg-emerald-600" : "bg-amber-600 animate-pulse")}></span>
                             {user.status}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest italic">{user.lastActive}</p>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="w-9 h-9 rounded-xl flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-primary transition-all shadow-sm">
                                <span className="material-symbols-outlined text-lg">mail</span>
                             </button>
                             <button className="w-9 h-9 rounded-xl flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-error transition-all shadow-sm">
                                <span className="material-symbols-outlined text-lg">person_remove</span>
                             </button>
                             <button className="w-9 h-9 rounded-xl flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-on-surface hover:text-white transition-all shadow-sm">
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
           <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Registry Synchronization Active</p>
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

      {/* Analytics Summary */}
      <section className="grid lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm flex flex-col md:flex-row justify-around items-center gap-10">
            <div className="text-center md:text-left space-y-1">
               <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Total Population</p>
               <p className="text-4xl font-black text-on-surface tracking-tighter">6,420</p>
            </div>
            <div className="text-center md:text-left space-y-1">
               <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pending Verification</p>
               <p className="text-4xl font-black text-on-surface tracking-tighter">128</p>
            </div>
            <div className="text-center md:text-left space-y-1">
               <p className="text-[10px] font-black text-primary uppercase tracking-widest">Active Units</p>
               <p className="text-4xl font-black text-on-surface tracking-tighter">4,128</p>
            </div>
         </div>
         <div className="bg-on-surface p-8 rounded-[2.5rem] text-center space-y-4 flex flex-col justify-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h4 className="text-xs font-black text-white/50 uppercase tracking-widest relative">Global Broadcast</h4>
            <p className="text-xs font-medium text-white/70 leading-relaxed relative">
               Transmit institutional alerts to all verified alumni and student units across the network.
            </p>
            <button className="w-full py-3.5 bg-primary-container text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-98 transition-all relative">
               Initialize Relay
            </button>
         </div>
      </section>
    </div>
  );
};
