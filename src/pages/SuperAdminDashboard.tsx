import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingRequests = [
    { id: "REQ-9921", name: "MIT Engineering", domain: "mit.edu", date: "2026-04-10", status: "Pending" },
    { id: "REQ-9925", name: "Stanford Alumni", domain: "stanford.edu", date: "2026-04-11", status: "Pending" },
    { id: "REQ-9930", name: "Harvard Business", domain: "harvard.edu", date: "2026-04-11", status: "Pending" },
  ];

  return (
    <div className="space-y-10">
      {/* Strategic Header */}
      <section className="bg-surface-container-lowest p-8 rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="material-symbols-outlined text-primary-container text-sm">security</span>
              <p className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest">Global Authority Protocol</p>
           </div>
           <h1 className="text-3xl font-black text-on-surface tracking-tight leading-none uppercase">Command Center</h1>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-surface-container rounded-2xl text-xs font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">monitoring</span>
              System Health
           </button>
           <button className="px-6 py-2.5 bg-primary-container text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">cloud_sync</span>
              Global Deploy
           </button>
        </div>
      </section>

      {/* Global Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Nodes", val: "142", trend: "+3 Pending", color: "text-primary", icon: "apartment" },
          { label: "Global Agents", val: "12,840", trend: "Active Now", color: "text-secondary", icon: "groups_3" },
          { label: "Server Load", val: "24%", trend: "Optimal", color: "text-emerald-600", icon: "storage" },
          { label: "Network Uptime", val: "99.98%", trend: "Last 30 Days", color: "text-primary-container", icon: "activity_zone" }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm group hover:border-primary/20 transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                   <span className={cn("material-symbols-outlined text-2xl font-black", stat.color)}>{stat.icon}</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-50 rounded-full">
                   <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                   <span className="text-[9px] font-black text-emerald-600 uppercase">Live</span>
                </div>
             </div>
             <div className="space-y-1">
                <h3 className="text-3xl font-black text-on-surface tracking-tighter leading-none">{stat.val}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">{stat.label}</p>
                <p className="text-[9px] font-bold text-on-surface-variant/30 uppercase mt-2">{stat.trend}</p>
             </div>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Core Management View */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between border-b border-[#c7c4d8]/10 pb-4">
              <div className="flex bg-surface-container-low p-1 rounded-2xl">
                 <button 
                   onClick={() => setActiveTab("pending")}
                   className={cn(
                     "px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                     activeTab === "pending" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant opacity-60 hover:opacity-100"
                   )}
                 >
                   Pending Authorization
                 </button>
                 <button 
                   onClick={() => setActiveTab("active")}
                   className={cn(
                     "px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                     activeTab === "active" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant opacity-60 hover:opacity-100"
                   )}
                 >
                   Active Institutes
                 </button>
              </div>
              <Link to="/admin/global/colleges">
                 <button className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2 hover:underline">
                    Manage All
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </button>
              </Link>
           </div>

           <div className="bg-surface-container-lowest rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-surface-container-low/30 border-b border-[#c7c4d8]/5">
                    <tr>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Request ID</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Institution</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Email Domain</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 text-right">Operations</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#c7c4d8]/5">
                    {pendingRequests.map((req) => (
                       <tr key={req.id} className="hover:bg-primary/5 transition-colors group">
                          <td className="px-8 py-6 font-black text-[10px] text-on-surface-variant/50">#{req.id}</td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary-container text-xl">account_balance</span>
                                <span className="text-sm font-black text-on-surface uppercase tracking-tight">{req.name}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest bg-surface-container px-3 py-1 rounded-full">{req.domain}</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center hover:scale-110 active:scale-95 shadow-sm transition-all">
                                   <span className="material-symbols-outlined text-lg">check</span>
                                </button>
                                <button className="w-9 h-9 rounded-xl bg-surface-container text-error flex items-center justify-center hover:bg-error hover:text-white transition-all shadow-sm">
                                   <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                                <button className="w-9 h-9 rounded-xl bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-on-surface hover:text-white transition-all shadow-sm">
                                   <span className="material-symbols-outlined text-lg">open_in_new</span>
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Global Security Logs */}
        <div className="space-y-6">
           <div className="flex items-center justify-between border-b border-[#c7c4d8]/10 pb-4">
              <h3 className="text-xs font-black text-on-surface uppercase tracking-widest flex items-center gap-3">
                 <span className="material-symbols-outlined text-primary-container">list_alt</span>
                 Security Log
              </h3>
              <button className="text-[10px] font-black uppercase text-on-surface-variant/40 hover:text-error transition-colors">Clear</button>
           </div>
           
           <div className="space-y-4">
              {[
                { type: 'warn', msg: "Unauthorized access attempt: Node #7721", time: "2m ago", icon: "warning" },
                { type: 'info', msg: "New Institution Application: Harvard Unit", time: "14m ago", icon: "add_home" },
                { type: 'crit', msg: "Cluster B Latency Alert - Region: US-East", time: "26m ago", icon: "emergency" },
                { type: 'info', msg: "Global Encryption Key Rotated", time: "1h ago", icon: "enhanced_encryption" },
              ].map((log, i) => (
                <div key={i} className="p-5 bg-surface-container-lowest border border-[#c7c4d8]/10 rounded-[1.5rem] flex items-start gap-4 group hover:border-primary/20 transition-all shadow-sm">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex flex-shrink-0 items-center justify-center transition-colors",
                    log.type === 'warn' ? "bg-amber-50 text-amber-600" : 
                    log.type === 'crit' ? "bg-error/5 text-error" : "bg-primary/5 text-primary"
                  )}>
                    <span className="material-symbols-outlined text-lg">{log.icon}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[11px] font-black text-on-surface leading-snug uppercase tracking-tight">{log.msg}</p>
                    <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">{log.time}</p>
                  </div>
                </div>
              ))}
           </div>
           
           <button className="w-full py-4 bg-surface-container-low text-on-surface-variant rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-on-surface hover:text-white transition-all shadow-sm">
              Full Protocol History
           </button>
        </div>
      </div>
    </div>
  );
};
