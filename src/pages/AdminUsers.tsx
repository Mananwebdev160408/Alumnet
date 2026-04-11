import { useState } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  ShieldCheck, 
  UserX,
  RefreshCw,
  FileDown,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  { id: "UID-77-01", name: "Sarah Chen", email: "s.chen@iitd.ac.in", role: "ALUMNI", batch: "2018", status: "verified" as const, lastActive: "2h ago", company: "Google" },
  { id: "UID-22-92", name: "James Miller", email: "j.miller@iitd.ac.in", role: "STUDENT", batch: "2025", status: "pending" as const, lastActive: "14m ago", company: "N/A" },
  { id: "UID-44-12", name: "Elena Rossi", email: "e.rossi@iitd.ac.in", role: "ALUMNI", batch: "2012", status: "verified" as const, lastActive: "1d ago", company: "SpaceX" },
  { id: "UID-55-33", name: "Marcus Thorne", email: "m.thorne@iitd.ac.in", role: "ALUMNI", batch: "2015", status: "verified" as const, lastActive: "5h ago", company: "Neuralink" },
  { id: "UID-88-10", name: "Lila Vance", email: "l.vance@iitd.ac.in", role: "STUDENT", batch: "2024", status: "verified" as const, lastActive: "Direct", company: "N/A" },
  { id: "UID-11-44", name: "Zack Reed", email: "z.reed@iitd.ac.in", role: "ALUMNI", batch: "2020", status: "verified" as const, lastActive: "3d ago", company: "Apple" },
];

export const AdminUsers = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 lg:p-10 space-y-12 mt-16 max-w-[1400px] mx-auto min-h-screen">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Unit_Infrastructure // User_Registry</p>
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-black tracking-tighter uppercase leading-none">
            User_Management
          </h1>
        </div>
        <div className="flex gap-2">
          <IndustrialButton variant="outline" className="h-12 px-6">
            <FileDown className="mr-2 size-4" />
            Export_Registry
          </IndustrialButton>
          <IndustrialButton variant="safety" className="h-12 px-8">
            <UserPlus className="mr-2 size-4" />
            Provision_User
          </IndustrialButton>
        </div>
      </div>

      {/* Main Registry Table */}
      <GlassCard className="p-0 border-foreground/5 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-foreground/5 bg-foreground/[0.02] flex flex-wrap items-center justify-between gap-4">
           <div className="flex items-center gap-3 flex-1 max-w-md">
              <Search className="size-4 text-muted-foreground" />
              <Input 
                 placeholder="SEARCH_BY_UID_NAME_OR_EMAIL..." 
                 className="border-none bg-transparent h-8 font-mono text-xs focus-visible:ring-0 p-0 uppercase"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-4">
              <div className="flex gap-4">
                {['ALL', 'ALUMNI', 'STUDENTS', 'PENDING'].map(f => (
                  <button key={f} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">
                    [{f}]
                  </button>
                ))}
              </div>
              <div className="h-4 w-px bg-foreground/10" />
              <IndustrialButton variant="ghost" size="icon" className="size-8">
                 <RefreshCw className="size-4" />
              </IndustrialButton>
           </div>
        </div>

        <Table>
           <TableHeader className="bg-foreground/[0.02] font-mono text-[10px] uppercase tracking-widest">
              <TableRow className="border-foreground/5">
                 <TableHead>Agent_Identity</TableHead>
                 <TableHead>Designation</TableHead>
                 <TableHead>Affiliation</TableHead>
                 <TableHead>Last_Sync</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead className="text-right">Operations</TableHead>
              </TableRow>
           </TableHeader>
           <TableBody>
              {users.map((user) => (
                 <TableRow key={user.id} className="border-foreground/5 hover:bg-foreground/[0.01] transition-colors group">
                    <TableCell>
                       <div className="flex items-center gap-4">
                          <Avatar className="size-10 rounded-none border border-foreground/10 group-hover:border-safety-orange/30 transition-colors">
                             <AvatarFallback className="text-xs font-mono font-bold">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                             <span className="font-display font-bold uppercase text-xs tracking-wider">{user.name}</span>
                             <span className="text-[9px] font-mono text-muted-foreground uppercase">{user.id}</span>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          {user.role === 'ALUMNI' ? <Briefcase className="size-3 text-electric-blue" /> : <GraduationCap className="size-3 text-safety-orange" />}
                          <span className="text-[10px] font-mono font-bold uppercase">{user.role}</span>
                       </div>
                       <p className="text-[9px] font-mono text-muted-foreground uppercase mt-0.5">{user.company !== 'N/A' ? user.company : `BATCH_${user.batch}`}</p>
                    </TableCell>
                    <TableCell className="text-[10px] font-mono uppercase text-muted-foreground">IIT_DELHI // NODE_S4</TableCell>
                    <TableCell className="text-[10px] font-mono uppercase text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell>
                       <StatusBadge status={user.status} label={user.status} />
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex justify-end gap-1 opacity-10 group-hover:opacity-100 transition-opacity">
                          <IndustrialButton variant="ghost" size="icon" className="size-8 hover:text-electric-blue" title="Transmit Message">
                             <Mail className="size-4" />
                          </IndustrialButton>
                          <IndustrialButton variant="ghost" size="icon" className="size-8 hover:text-destructive" title="Revoke Access">
                             <UserX className="size-4" />
                          </IndustrialButton>
                          <IndustrialButton variant="ghost" size="icon" className="size-8">
                             <MoreVertical className="size-4" />
                          </IndustrialButton>
                       </div>
                    </TableCell>
                 </TableRow>
              ))}
           </TableBody>
        </Table>

        {/* Table Footer / Pagination */}
        <div className="p-4 border-t border-foreground/5 bg-foreground/[0.02] flex items-center justify-between">
           <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Registry Synchronization Active</p>
           <div className="flex gap-2">
              <IndustrialButton variant="outline" size="icon" className="size-8" disabled>
                 <ChevronLeft className="size-4" />
              </IndustrialButton>
              <IndustrialButton variant="outline" size="icon" className="size-8">
                 <ChevronRight className="size-4" />
              </IndustrialButton>
           </div>
        </div>
      </GlassCard>

      {/* Batch Operations Slot */}
      <div className="grid md:grid-cols-3 gap-6">
         <div className="md:col-span-2 p-8 border border-foreground/10 bg-foreground/[0.01] space-y-6">
            <h3 className="text-[11px] font-mono uppercase tracking-[0.3em]">Operational_Summary</h3>
            <div className="grid grid-cols-3 gap-8">
               <div>
                  <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Total_Units</p>
                  <p className="text-2xl font-display font-black">6,420</p>
               </div>
               <div>
                  <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Pending_Ver</p>
                  <p className="text-2xl font-display font-black text-safety-orange">128</p>
               </div>
               <div>
                  <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Active_Duty</p>
                  <p className="text-2xl font-display font-black text-electric-blue">4.1k</p>
               </div>
            </div>
         </div>
         <div className="p-8 border border-safety-orange/20 bg-safety-orange/[0.02] space-y-4 flex flex-col justify-center text-center">
            <h4 className="text-[11px] font-display font-bold uppercase tracking-widest">Protocol_Broadcast</h4>
            <p className="text-[9px] font-mono text-muted-foreground uppercase leading-relaxed">
               Transmit institutional alerts to all verified alumni and student units.
            </p>
            <IndustrialButton variant="safety" size="sm" className="w-full mt-2">Initialize_Relay</IndustrialButton>
         </div>
      </div>
    </div>
  );
};
