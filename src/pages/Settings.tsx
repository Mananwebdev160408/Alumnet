import { useState } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Settings as SettingsIcon, 
  Shield, 
  User, 
  Bell, 
  Lock, 
  Eye, 
  Monitor, 
  Trash2,
  ChevronRight,
  Database,
  Globe
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-4 lg:p-10 space-y-12 mt-16 max-w-[1200px] mx-auto min-h-screen">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">User // System_Config</p>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase leading-none">
            Settings_Node
          </h1>
        </div>
        <div className="text-right hidden sm:block">
           <p className="text-[9px] font-mono text-muted-foreground uppercase">Last Sys_Sync</p>
           <p className="text-sm font-display font-bold">2026-04-11 14:02</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          {[
            { id: "profile", label: "Agent_Profile", icon: User },
            { id: "security", label: "Security_Protocols", icon: Lock },
            { id: "notifications", label: "Signal_Relays", icon: Bell },
            { id: "privacy", label: "Visibility_Mask", icon: Eye },
            { id: "appearance", label: "Interface_Style", icon: Monitor },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 border transition-all ${
                activeTab === item.id 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-transparent text-muted-foreground border-transparent hover:bg-foreground/5 hover:border-foreground/10'
              }`}
            >
              <item.icon className="size-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="ml-auto size-3" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <GlassCard className="p-8 border-foreground/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                   <div className="size-16 industrial-border bg-foreground/5 flex items-center justify-center">
                     <User className="size-8 text-muted-foreground" />
                   </div>
                   <div>
                      <h3 className="text-lg font-display font-black uppercase tracking-tight">Public_Identity</h3>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase">Managed by IIT_Delhi Infrastructure</p>
                   </div>
                   <IndustrialButton variant="outline" size="sm" className="ml-auto">Update_Avatar</IndustrialButton>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label className="text-[10px] font-mono uppercase text-muted-foreground">Full_Name</Label>
                      <Input defaultValue="AG_USER_01" className="industrial-input" />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-[10px] font-mono uppercase text-muted-foreground">Primary_Email</Label>
                      <Input defaultValue="user01@iitd.ac.in" disabled className="industrial-input opacity-50" />
                   </div>
                   <div className="space-y-2 md:col-span-2">
                      <Label className="text-[10px] font-mono uppercase text-muted-foreground">Agent_Bio</Label>
                      <textarea className="w-full h-24 industrial-input p-3 focus:outline-none" defaultValue="Specializing in neural architecture and complex system navigation." />
                   </div>
                </div>

                <div className="pt-6 border-t border-foreground/5 flex justify-end">
                   <IndustrialButton variant="safety" className="px-10">Save_Changes</IndustrialButton>
                </div>
              </GlassCard>

              <GlassCard className="p-8 border-foreground/5">
                 <div className="flex items-center gap-3 mb-6">
                    <Globe className="size-5 text-electric-blue" />
                    <h3 className="text-lg font-display font-black uppercase tracking-tight">External_Links</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-foreground/5 border border-foreground/10">
                       <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">LinkedIn_Protocol</span>
                       <StatusBadge status="online" label="LINKED" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-foreground/5 border border-foreground/10 opacity-50">
                       <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">GitHub_Relay</span>
                       <IndustrialButton variant="outline" size="sm">Connect</IndustrialButton>
                    </div>
                 </div>
              </GlassCard>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <GlassCard className="p-8 border-foreground/5 space-y-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="size-5 text-safety-orange" />
                    <h3 className="text-lg font-display font-black uppercase tracking-tight">Credential_Update</h3>
                  </div>
                  
                  <div className="space-y-6 max-w-md">
                     <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase">Current_Cypher</Label>
                        <Input type="password" placeholder="********" className="industrial-input" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase">New_Cypher</Label>
                        <Input type="password" placeholder="********" className="industrial-input" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase">Confirm_Cypher</Label>
                        <Input type="password" placeholder="********" className="industrial-input" />
                     </div>
                  </div>
                  <div className="pt-6 border-t border-foreground/5">
                     <IndustrialButton variant="safety" className="px-10">Rotate_Keys</IndustrialButton>
                  </div>
               </GlassCard>

               <div className="p-6 border border-destructive/20 bg-destructive/5 space-y-4">
                  <div className="flex items-center gap-3">
                     <Trash2 className="size-5 text-destructive" />
                     <h4 className="text-xs font-display font-bold uppercase tracking-widest text-destructive">Termination_Zone</h4>
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase leading-relaxed">
                     Permanently disconnect this agent from the AlumNet nodes. All data will be purged. This action is irreversible.
                  </p>
                  <IndustrialButton variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive hover:text-white transition-colors">
                     Request_Purge
                  </IndustrialButton>
               </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <GlassCard className="p-8 border-foreground/5">
                  <h3 className="text-lg font-display font-black uppercase tracking-tight mb-8">Relay_Configuration</h3>
                  <div className="space-y-8">
                     {[
                       { title: "Network_Broadcasts", desc: "Receive global pulses from institutional nodes.", default: true },
                       { title: "Direct_Link_Requests", desc: "Notify when agents attempt to initiate connection.", default: true },
                       { title: "Huddle_Signals", desc: "Alert for new message packets in active threads.", default: false },
                       { title: "System_Maintenance", desc: "Critical updates regarding node stability.", default: true },
                     ].map((n, i) => (
                       <div key={i} className="flex items-center justify-between gap-8 pb-6 border-b border-foreground/5 last:border-0 last:pb-0">
                          <div className="space-y-1">
                             <p className="text-xs font-display font-bold uppercase tracking-wider">{n.title}</p>
                             <p className="text-[10px] font-mono text-muted-foreground uppercase">{n.desc}</p>
                          </div>
                          <Switch defaultChecked={n.default} className="data-[state=checked]:bg-safety-orange" />
                       </div>
                     ))}
                  </div>
               </GlassCard>
            </div>
          )}
        </div>
      </div>

      {/* Footer System Status */}
      <div className="flex flex-wrap justify-between items-center gap-4 text-muted-foreground pt-10 border-t border-foreground/5">
         <div className="flex items-center gap-4 text-[9px] font-mono uppercase">
            <span className="flex items-center gap-2"><div className="size-1 bg-safety-orange" /> Node_IITD_S4</span>
            <span className="flex items-center gap-2"><Database className="size-3" /> Encrypted_Vault_V2</span>
         </div>
         <p className="text-[9px] font-mono uppercase tracking-widest">
            Configuration saved locally. Synchronize with central core to propagate changes globally.
         </p>
      </div>
    </div>
  );
};
