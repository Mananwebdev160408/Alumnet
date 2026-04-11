import { useState } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ExternalLink, 
  ShieldAlert,
  Globe,
  Users,
  Calendar,
  ChevronRight,
  ChevronLeft
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

const institutes = [
  { id: "INST-001", name: "IIT_Delhi", domain: "iitd.ac.in", location: "New_Delhi", nodes: "4,201", status: "online" as const, health: "98%" },
  { id: "INST-002", name: "MIT_Engineering", domain: "mit.edu", location: "Cambridge_MA", nodes: "12,840", status: "online" as const, health: "99%" },
  { id: "INST-003", name: "Stanford_Alumni", domain: "stanford.edu", location: "Stanford_CA", nodes: "8,920", status: "online" as const, health: "97%" },
  { id: "INST-004", name: "Harvard_Business", domain: "harvard.edu", location: "Boston_MA", nodes: "5,400", status: "away" as const, health: "94%" },
  { id: "INST-005", name: "BITS_Pilani", domain: "bits-pilani.ac.in", location: "Pilani_RJ", nodes: "3,150", status: "online" as const, health: "96%" },
  { id: "INST-006", name: "Oxford_Connect", domain: "ox.ac.uk", location: "Oxford_UK", nodes: "7,200", status: "offline" as const, health: "0%" },
];

export const SuperAdminColleges = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 lg:p-10 space-y-12 mt-16 max-w-[1400px] mx-auto min-h-screen">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Globe className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Global_Infrastructure // Management</p>
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-black tracking-tighter uppercase leading-none">
            Institute_Nodes
          </h1>
        </div>
        <div className="flex gap-3">
          <IndustrialButton variant="outline" className="h-12 px-6">
            <ShieldAlert className="mr-2 size-4" />
            Security_Audit
          </IndustrialButton>
          <IndustrialButton variant="safety" className="h-12 px-8">
            <Plus className="mr-2 size-4" />
            Onboard_Institute
          </IndustrialButton>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: "Active_Clusters", val: "142", sub: "Nodes" },
           { label: "Pending_Apps", val: "12", sub: "Requests" },
           { label: "Global_Uptime", val: "99.9%", sub: "Last_24h" },
           { label: "Total_Bandwidth", val: "4.2TB", sub: "Sync_Load" },
         ].map((s, i) => (
           <div key={i} className="p-6 border border-foreground/5 bg-foreground/[0.02] industrial-border">
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{s.label}</p>
              <h3 className="text-2xl font-display font-black uppercase text-foreground">{s.val}</h3>
              <p className="text-[8px] font-mono text-muted-foreground uppercase">{s.sub}</p>
           </div>
         ))}
      </div>

      {/* Manifest Table */}
      <GlassCard className="p-0 border-foreground/5 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-foreground/5 bg-foreground/[0.02] flex flex-wrap items-center justify-between gap-4">
           <div className="flex items-center gap-3 flex-1 max-w-md">
              <Search className="size-4 text-muted-foreground" />
              <Input 
                 placeholder="SEARCH_NODE_IDENTIFIER..." 
                 className="border-none bg-transparent h-8 font-mono text-xs focus-visible:ring-0 p-0 uppercase"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2">
              <IndustrialButton variant="outline" size="sm" className="h-8">
                 <Filter className="mr-2 size-3" />
                 Filters
              </IndustrialButton>
              <div className="h-4 w-px bg-foreground/10 mx-2" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase">{institutes.length} Nodes Synchronized</span>
           </div>
        </div>

        <Table>
           <TableHeader className="bg-foreground/[0.02] font-mono text-[10px] uppercase tracking-widest">
              <TableRow className="border-foreground/5">
                 <TableHead>Institute_ID</TableHead>
                 <TableHead>Identification</TableHead>
                 <TableHead>Location</TableHead>
                 <TableHead>Network_Nodes</TableHead>
                 <TableHead>Sys_Health</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead className="text-right">Action</TableHead>
              </TableRow>
           </TableHeader>
           <TableBody>
              {institutes.map((inst) => (
                 <TableRow key={inst.id} className="border-foreground/5 hover:bg-foreground/[0.01] transition-colors group">
                    <TableCell className="font-mono text-[10px] text-muted-foreground">{inst.id}</TableCell>
                    <TableCell>
                       <div className="flex flex-col">
                          <span className="font-display font-bold uppercase text-xs tracking-wider">{inst.name}</span>
                          <span className="text-[9px] font-mono text-muted-foreground uppercase">{inst.domain}</span>
                       </div>
                    </TableCell>
                    <TableCell className="text-[10px] font-mono uppercase text-muted-foreground">{inst.location}</TableCell>
                    <TableCell>
                       <div className="flex items-center gap-2">
                          <Users className="size-3 text-muted-foreground" />
                          <span className="text-xs font-mono font-bold">{inst.nodes}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <div className="flex flex-col gap-1 w-24">
                          <div className="h-1 w-full bg-foreground/5 overflow-hidden">
                             <div 
                                className="h-full bg-safety-orange transition-all duration-1000" 
                                style={{ width: inst.health }} 
                             />
                          </div>
                          <span className="text-[8px] font-mono text-muted-foreground uppercase">{inst.health} Operational</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <StatusBadge status={inst.status} label={inst.status} />
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex justify-end gap-1 opacity-10 group-hover:opacity-100 transition-opacity">
                          <IndustrialButton variant="ghost" size="icon" className="size-8">
                             <ExternalLink className="size-3" />
                          </IndustrialButton>
                          <IndustrialButton variant="ghost" size="icon" className="size-8">
                             <MoreVertical className="size-3" />
                          </IndustrialButton>
                       </div>
                    </TableCell>
                 </TableRow>
              ))}
           </TableBody>
        </Table>

        {/* Table Footer / Pagination */}
        <div className="p-4 border-t border-foreground/5 bg-foreground/[0.02] flex items-center justify-between">
           <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Displaying 1-10 of 142 Nodes</p>
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

      {/* Global Alerts Feed */}
      <div className="grid md:grid-cols-2 gap-8">
         <div className="space-y-4">
            <h3 className="text-[11px] font-mono uppercase tracking-widest">Node_Alert_Feed</h3>
            <div className="space-y-2">
               {[
                 { msg: "Node_Oxford reporting packet loss", time: "12m ago", type: "warn" },
                 { msg: "BITS_Pilani request for user limit extension", time: "44m ago", type: "info" },
                 { msg: "MIT_Sync protocol deviation detected", time: "1h ago", type: "crit" },
               ].map((a, i) => (
                 <div key={i} className="p-3 border border-foreground/10 bg-foreground/[0.01] flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase">{a.msg}</span>
                    <span className="text-[8px] font-mono text-muted-foreground">{a.time}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="space-y-4">
            <h3 className="text-[11px] font-mono uppercase tracking-widest">Onboarding_Requests</h3>
            <div className="p-6 border border-foreground/10 bg-foreground/[0.02] industrial-border flex flex-col justify-center items-center text-center gap-4 group cursor-pointer hover:bg-foreground/[0.04]">
               <div className="size-10 industrial-border bg-foreground/5 flex items-center justify-center">
                  <Plus className="size-5 text-safety-orange group-hover:scale-125 transition-transform" />
               </div>
               <div>
                  <p className="text-[10px] font-display font-bold uppercase tracking-[0.2em]">Launch_Request_Protocol</p>
                  <p className="text-[8px] font-mono text-muted-foreground uppercase mt-1">Initiate institution validation sequence</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
