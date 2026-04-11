import { useState } from "react";
import { Link } from "react-router-dom";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  FileUp, 
  Megaphone, 
  BarChart3, 
  Search,
  Settings,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export const CollegeAdminDashboard = () => {
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="p-6 lg:p-8 space-y-8 mt-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Unit: IIT Delhi Infrastructure</p>
          </div>
          <h1 className="text-3xl font-display font-black tracking-tighter uppercase leading-none">
            Admin <span className="text-safety-orange">Hub</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <IndustrialButton variant="outline" size="sm">
            <Megaphone className="mr-2 size-3" />
            Broadcast
          </IndustrialButton>
          <IndustrialButton variant="safety" size="sm">
            <FileUp className="mr-2 size-3" />
            Import Batch
          </IndustrialButton>
        </div>
      </div>

      {/* Local Metrics */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Verified Students", val: "4,201", color: "text-foreground" },
          { label: "Verified Alumni", val: "2,150", color: "text-electric-blue" },
          { label: "Pending Verification", val: "128", color: "text-safety-orange" }
        ].map((m, i) => (
          <GlassCard key={i} className="p-6 border-foreground/5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{m.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={`text-3xl font-display font-black tracking-tighter ${m.color}`}>{m.val}</h3>
              <span className="text-[9px] font-mono text-muted-foreground uppercase">+12% vs last cycle</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Administrative Area */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="space-y-1">
          {[
            { id: "overview", label: "Overview", icon: BarChart3, href: null },
            { id: "verification", label: "Verifications", icon: UserCheck, count: 128, href: null },
            { id: "directory", label: "Unit Directory", icon: Users, href: "/admin/college/users" },
            { id: "settings", label: "Preferences", icon: Settings, href: "/settings" },
          ].map((item) => (
            item.href ? (
              <Link key={item.id} to={item.href}>
                <button
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 border transition-all bg-transparent text-muted-foreground border-transparent hover:bg-foreground/5 hover:border-foreground/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="size-4" />
                    <span className="text-[11px] font-mono uppercase tracking-wider">{item.label}</span>
                  </div>
                </button>
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 border transition-all",
                  activeView === item.id 
                  ? 'bg-foreground text-background border-foreground' 
                  : 'bg-transparent text-muted-foreground border-transparent hover:bg-foreground/5 hover:border-foreground/10'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="size-4" />
                  <span className="text-[11px] font-mono uppercase tracking-wider">{item.label}</span>
                </div>
                {item.count && (
                  <span className={cn(
                    "px-1.5 py-0.5 text-[9px] font-mono",
                    activeView === item.id ? 'bg-background text-foreground' : 'bg-safety-orange text-white'
                  )}>
                    {item.count}
                  </span>
                )}
              </button>
            )
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
           <GlassCard className="p-0 border-foreground/5">
             <div className="p-4 border-b border-foreground/5 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 max-w-md">
                   <Search className="size-4 text-muted-foreground" />
                   <Input 
                    placeholder="Search UID, Name or Domain..." 
                    className="border-none bg-transparent h-8 font-mono text-xs focus-visible:ring-0 p-0"
                   />
                </div>
                <IndustrialButton variant="ghost" size="icon">
                  <MoreVertical className="size-4" />
                </IndustrialButton>
             </div>
             
             <Table>
               <TableHeader className="bg-foreground/[0.02] font-mono text-[10px] uppercase tracking-widest">
                 <TableRow className="border-foreground/5">
                   <TableHead>Agent UID</TableHead>
                   <TableHead>Affiliation</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead className="text-right">Action</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {[
                   { uid: "AL-770x-01", name: "Sarah Chen", role: "Alumni '18", status: "PENDING" },
                   { uid: "ST-221y-92", name: "James Miller", role: "Student '25", status: "PENDING" },
                   { uid: "AL-445z-12", name: "Elena Rossi", role: "Alumni '12", status: "PENDING" },
                 ].map((u) => (
                   <TableRow key={u.uid} className="border-foreground/5 hover:bg-foreground/[0.01]">
                     <TableCell className="font-mono text-[10px] text-muted-foreground">{u.uid}</TableCell>
                     <TableCell>
                       <p className="font-display font-bold uppercase text-xs tracking-wider">{u.name}</p>
                       <p className="text-[9px] font-mono text-muted-foreground uppercase">{u.role}</p>
                     </TableCell>
                     <TableCell>
                        <span className="px-2 py-0.5 bg-safety-orange/10 text-safety-orange text-[9px] font-mono border border-safety-orange/20">
                          {u.status}
                        </span>
                     </TableCell>
                     <TableCell className="text-right">
                       <IndustrialButton variant="ghost" className="size-8 p-0">
                         <ChevronRight className="size-4" />
                       </IndustrialButton>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
             <div className="p-4 border-t border-foreground/5 bg-foreground/[0.02] text-center">
                <IndustrialButton variant="ghost" size="sm" className="text-[10px] uppercase font-mono tracking-widest">
                  View full queue protocol
                </IndustrialButton>
             </div>
           </GlassCard>

           {/* Batch Processing Tool Hint */}
           <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 border border-foreground/10 bg-foreground/[0.02] relative group cursor-pointer hover:bg-foreground/[0.04] transition-all">
                <FileUp className="size-6 text-safety-orange mb-4" />
                <h4 className="text-[11px] font-display font-bold uppercase tracking-widest mb-1">Batch Import Engine</h4>
                <p className="text-[10px] font-mono text-muted-foreground uppercase leading-relaxed">
                  Upload .CSV or .XLSX to authorize multiple units simultaneously.
                </p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="size-4 text-safety-orange" />
                </div>
              </div>
              <div className="p-6 border border-foreground/10 bg-foreground/[0.02] relative group cursor-pointer hover:bg-foreground/[0.04] transition-all">
                <Megaphone className="size-6 text-electric-blue mb-4" />
                <h4 className="text-[11px] font-display font-bold uppercase tracking-widest mb-1">Unit Broadcast</h4>
                <p className="text-[10px] font-mono text-muted-foreground uppercase leading-relaxed">
                  Transmit announcements to all verified students and alumni.
                </p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="size-4 text-electric-blue" />
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
