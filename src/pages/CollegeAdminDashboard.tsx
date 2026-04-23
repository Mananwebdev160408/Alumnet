import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const CollegeAdminDashboard = () => {
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container text-sm">account_balance</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">Unit: IIT Delhi Infrastructure</p>
          </div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight">Admin Hub</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container rounded-2xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-all">
            <span className="material-symbols-outlined text-lg">campaign</span>
            Broadcast
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">upload_file</span>
            Import Batch
          </button>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Verified Students", val: "4,201", trend: "+12%", color: "text-primary" },
          { label: "Verified Alumni", val: "2,150", trend: "+5%", color: "text-secondary" },
          { label: "Pending Requests", val: "128", trend: "High Priority", color: "text-error" }
        ].map((m, i) => (
          <div key={i} className="bg-surface-container-lowest p-8 rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 mb-4">{m.label}</p>
            <div className="flex items-baseline gap-3 relative">
              <h3 className={cn("text-4xl font-black tracking-tighter", m.color)}>{m.val}</h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">{m.trend}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Admin Area */}
      <section className="grid lg:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: "overview", label: "Dashboard Overview", icon: "dashboard" },
            { id: "verification", label: "Verifications", icon: "verified", count: 128 },
            { id: "directory", label: "Unit Directory", icon: "groups", href: "/admin/college/users" },
            { id: "settings", label: "Campus Settings", icon: "settings", href: "/settings" },
          ].map((item) => (
            item.href ? (
              <Link key={item.id} to={item.href} className="block">
                <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-transparent text-on-surface-variant font-bold hover:bg-surface-container transition-all text-sm group">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-xl opacity-60 group-hover:text-primary group-hover:opacity-100 transition-all">{item.icon}</span>
                    <span className="tracking-tight">{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-40 transition-all">chevron_right</span>
                </button>
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-sm font-bold group",
                  activeView === item.id 
                    ? "bg-primary-container text-white shadow-lg shadow-primary-container/20" 
                    : "bg-transparent text-on-surface-variant hover:bg-surface-container"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeView === item.id ? "'FILL' 1" : "" }}>{item.icon}</span>
                  <span className="tracking-tight">{item.label}</span>
                </div>
                {item.count && (
                  <span className={cn(
                    "px-2 py-0.5 text-[9px] font-black rounded-full",
                    activeView === item.id ? "bg-white text-primary-container" : "bg-error text-white"
                  )}>
                    {item.count}
                  </span>
                )}
              </button>
            )
          ))}
        </div>

        {/* Content View */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-surface-container-lowest rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="px-8 py-6 border-b border-[#c7c4d8]/10 flex items-center justify-between bg-surface-container-low/30">
               <div className="flex items-center gap-4 flex-1 max-w-sm">
                  <span className="material-symbols-outlined text-slate-400">search</span>
                  <input className="w-full bg-transparent border-none text-sm font-medium focus:ring-0 placeholder:text-slate-400" placeholder="Search UID, Name or Domain..." />
               </div>
               <button className="p-2 rounded-xl hover:bg-surface-container transition-all">
                  <span className="material-symbols-outlined">filter_list</span>
               </button>
            </div>
            
            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#c7c4d8]/10">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Agent UID</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Affiliation</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c7c4d8]/5">
                  {[
                    { uid: "AL-770x-01", name: "Sarah Chen", role: "Alumni '18", status: "PENDING" },
                    { uid: "ST-221y-92", name: "James Miller", role: "Student '25", status: "PENDING" },
                    { uid: "AL-445z-12", name: "Elena Rossi", role: "Alumni '12", status: "PENDING" },
                  ].map((u) => (
                    <tr key={u.uid} className="hover:bg-primary/5 transition-all">
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-black text-on-surface-variant/50 tracking-wider">#{u.uid}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-on-surface text-sm">{u.name}</p>
                          <p className="text-[10px] font-bold text-primary opacity-60 uppercase">{u.role}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full text-[9px] font-black text-amber-600 border border-amber-100">
                           <span className="w-1 h-1 bg-amber-600 rounded-full animate-pulse"></span>
                           {u.status}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="w-10 h-10 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all active:scale-95">
                          <span className="material-symbols-outlined text-xl">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-surface-container-low/30 text-center border-t border-[#c7c4d8]/10">
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                 View Full Queue Protocol
              </button>
            </div>
          </div>

          {/* Quick Tools Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-surface-container-lowest rounded-[2rem] border border-[#c7c4d8]/10 hover:border-primary/30 transition-all group flex gap-6 cursor-pointer shadow-sm">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">cloud_upload</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-on-surface uppercase tracking-tight">Batch Import Engine</h4>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed opacity-70">
                  Upload .CSV or .XLSX to authorize multiple user units simultaneously through our verification pipeline.
                </p>
              </div>
            </div>

            <div className="p-8 bg-surface-container-lowest rounded-[2rem] border border-[#c7c4d8]/10 hover:border-secondary/30 transition-all group flex gap-6 cursor-pointer shadow-sm">
              <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">broadcast_on_home</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-on-surface uppercase tracking-tight">Unit Broadcast</h4>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed opacity-70">
                   Transmit important announcements and policy updates to all verified campus residents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
