import { useState } from "react";
import { cn } from "@/lib/utils";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="space-y-10">
      {/* Header Panel */}
      <section className="bg-surface-container-lowest p-8 rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-3xl font-black text-on-surface tracking-tight">Account Settings</h1>
          <p className="text-on-surface-variant font-bold text-sm opacity-60">Manage your profile, security, and notification preferences</p>
        </div>
        <div className="flex gap-4">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Last Synced</p>
              <p className="text-sm font-black text-primary">Just Now</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container">sync</span>
           </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {[
            { id: "account", label: "Account Profile", icon: "person" },
            { id: "security", label: "Security & Access", icon: "shield" },
            { id: "notifications", label: "Notifications", icon: "notifications" },
            { id: "privacy", label: "Privacy & Data", icon: "lock" },
            { id: "appearance", label: "App Appearance", icon: "palette" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-sm font-bold group text-left",
                activeTab === item.id 
                  ? "bg-primary-container text-white shadow-lg shadow-primary-container/20" 
                  : "bg-transparent text-on-surface-variant hover:bg-surface-container"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeTab === item.id ? "'FILL' 1" : "" }}>{item.icon}</span>
                <span className="tracking-tight">{item.label}</span>
              </div>
              <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-40 transition-all">chevron_right</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === "account" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-[#c7c4d8]/10 shadow-sm space-y-8">
                <div className="flex items-center gap-4 border-b border-[#c7c4d8]/10 pb-6">
                   <div className="w-16 h-16 rounded-[1.25rem] bg-surface-container flex items-center justify-center">
                     <span className="material-symbols-outlined text-primary-container text-3xl">account_circle</span>
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-on-surface">Personal Information</h3>
                      <p className="text-xs font-medium text-on-surface-variant opacity-60">This information will be visible to your verified network.</p>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Displayed Name</label>
                      <input className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all" defaultValue="Manan" />
                   </div>
                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Email Address</label>
                       <input className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium opacity-50 cursor-not-allowed" defaultValue="manan@alumnet.com" disabled />
                   </div>
                   <div className="space-y-2 md:col-span-2">
                       <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Professional Bio</label>
                       <textarea className="w-full h-24 bg-surface-container-low border-none rounded-2xl p-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all resize-none no-scrollbar" defaultValue="Full stack developer passionate about building modern web experiences and scaling community networks." />
                   </div>
                </div>

                <div className="flex justify-end pt-4">
                   <button className="bg-primary-container text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg">save</span>
                      Save Changes
                   </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-[#c7c4d8]/10 shadow-sm space-y-6">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-container">language</span>
                    <h3 className="text-lg font-black text-on-surface">Connected Accounts</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-surface-container-low/50 rounded-3xl border border-[#c7c4d8]/5">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                             <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-on-surface">Google Account</p>
                             <p className="text-xs font-medium text-emerald-600">Currently Connected</p>
                          </div>
                       </div>
                       <button className="text-xs font-black uppercase tracking-widest text-on-surface-variant/40 hover:text-error transition-all">Disconnect</button>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-surface-container-low/50 rounded-3xl border border-[#c7c4d8]/5 opacity-60">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                             <img src="https://github.com/favicon.ico" className="w-5 h-5 grayscale" alt="GitHub" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-on-surface">GitHub Relay</p>
                             <p className="text-xs font-medium text-on-surface-variant">Not Connected</p>
                          </div>
                       </div>
                       <button className="text-xs font-black uppercase tracking-widest text-primary-container hover:underline">Connect</button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-[#c7c4d8]/10 shadow-sm space-y-8">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-container">encrypted</span>
                    <h3 className="text-xl font-black text-on-surface">Update Password</h3>
                 </div>
                 
                 <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Current Password</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">New Password</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Confirm New Password</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all" />
                    </div>
                 </div>
                 <div className="pt-4">
                    <button className="bg-primary-container text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-98 transition-all">
                       Update Credentials
                    </button>
                 </div>
              </div>

              <div className="bg-error/5 p-10 rounded-[2.5rem] border border-error/10 space-y-6">
                 <div className="flex items-center gap-3 text-error">
                    <span className="material-symbols-outlined font-black">delete_forever</span>
                    <h4 className="text-sm font-black uppercase tracking-widest">Danger Zone</h4>
                 </div>
                 <p className="text-sm font-medium text-on-surface-variant opacity-80 leading-relaxed max-w-lg">
                    Once you delete your account, there is no going back. All your data, connections, and progress will be permanently removed from the AlumNet core servers.
                 </p>
                 <button className="px-8 py-3 bg-white border border-error/20 text-error font-black rounded-2xl hover:bg-error hover:text-white transition-all text-xs uppercase tracking-widest">
                    Request Deletion
                 </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-[#c7c4d8]/10 shadow-sm space-y-10">
                  <h3 className="text-xl font-black text-on-surface">Mailing Preferences</h3>
                  <div className="space-y-0">
                     {[
                       { title: "Network Broadcasts", desc: "Global announcements and institutional updates.", default: true },
                       { title: "Direct Link Solicitations", desc: "Notifications when peers request a connection.", default: true },
                       { title: "Message Alerts", desc: "Instant signals for new message packets in threads.", default: false },
                       { title: "System Maintenance", desc: "Critical reports regarding node stability and updates.", default: true },
                     ].map((n, i) => (
                       <div key={i} className="flex items-center justify-between gap-10 py-8 border-b border-[#c7c4d8]/5 last:border-0">
                          <div className="space-y-1">
                             <p className="text-sm font-black text-on-surface">{n.title}</p>
                             <p className="text-xs font-medium text-on-surface-variant opacity-60 leading-relaxed">{n.desc}</p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-surface-container">
                            <input type="checkbox" className="sr-only" defaultChecked={n.default} />
                            <span className={cn(
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0 group-data-[state=checked]:translate-x-5",
                              n.default ? "translate-x-5 !bg-primary-container" : "translate-x-0 bg-white"
                            )}></span>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-10 border-t border-[#c7c4d8]/10 flex flex-wrap justify-between items-center gap-6">
         <div className="flex items-center gap-6 text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Node: IITD_ALUM_04</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">enhanced_encryption</span> AES-256 Vault Active</span>
         </div>
         <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">
            AlumNet Engineering © 2026
         </p>
      </div>
    </div>
  );
};
