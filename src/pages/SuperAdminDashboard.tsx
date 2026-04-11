import { useState } from "react";
import { Link } from "react-router-dom";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Building2, 
  Users, 
  Server, 
  Activity, 
  MoreHorizontal, 
  Check, 
  X, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Cpu
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingRequests = [
    { id: "REQ_9921", name: "MIT Engineering", domain: "mit.edu", date: "2026-04-10", status: "pending" },
    { id: "REQ_9925", name: "Stanford Alumni", domain: "stanford.edu", date: "2026-04-11", status: "pending" },
    { id: "REQ_9930", name: "Harvard Business", domain: "harvard.edu", date: "2026-04-11", status: "pending" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 mt-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Global Security Cluster</p>
          </div>
          <h1 className="text-3xl font-display font-black tracking-tighter uppercase leading-none">
            Command <span className="text-safety-orange">Center</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <IndustrialButton variant="outline" size="sm">
            <Cpu className="mr-2 size-3" />
            System Health
          </IndustrialButton>
          <IndustrialButton variant="safety" size="sm">
            <Server className="mr-2 size-3" />
            Global Deploy
          </IndustrialButton>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Building2, label: "Total Nodes", val: "142", sub: "+3 Pending", color: "text-foreground" },
          { icon: Users, label: "Global Agents", val: "12,840", sub: "Active Now", color: "text-electric-blue" },
          { icon: Server, label: "Server Load", val: "24%", sub: "Optimal Status", color: "text-emerald-500" },
          { icon: Activity, label: "Uptime", val: "99.98%", sub: "Last 30 Cycles", color: "text-safety-orange" }
        ].map((m, i) => (
          <GlassCard key={i} className="p-0 border-foreground/5 hover:border-foreground/20">
             <div className="p-6">
               <div className="flex justify-between items-start mb-4">
                 <div className="p-2 border border-foreground/5 bg-foreground/5">
                   <m.icon className="size-4 text-muted-foreground" />
                 </div>
                 <StatusBadge status="online" label="ACTIVE" />
               </div>
               <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{m.label}</p>
               <h3 className={`text-2xl font-display font-black tracking-tighter ${m.color}`}>{m.val}</h3>
               <p className="text-[9px] font-mono text-muted-foreground mt-2 uppercase">{m.sub}</p>
             </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pending Requests Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab("pending")}
                className={`text-[11px] font-mono uppercase tracking-wider pb-4 -mb-[17px] border-b-2 transition-all ${activeTab === 'pending' ? 'border-safety-orange text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Pending Authorization
              </button>
              <button 
                onClick={() => setActiveTab("active")}
                className={`text-[11px] font-mono uppercase tracking-wider pb-4 -mb-[17px] border-b-2 transition-all ${activeTab === 'active' ? 'border-safety-orange text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Active Institutes
              </button>
            </div>
            <Link to="/admin/global/colleges">
              <IndustrialButton variant="ghost" size="sm">View All</IndustrialButton>
            </Link>
          </div>

          <GlassCard className="p-0 overflow-hidden border-foreground/5">
            <Table>
              <TableHeader className="bg-foreground/[0.02] font-mono text-[10px] uppercase tracking-widest">
                <TableRow className="border-foreground/5 hover:bg-transparent">
                  <TableHead className="w-[100px]">Req_ID</TableHead>
                  <TableHead>Institute</TableHead>
                  <TableHead>Email Domain</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((req) => (
                  <TableRow key={req.id} className="border-foreground/5 hover:bg-foreground/[0.02]">
                    <TableCell className="font-mono text-[10px] text-muted-foreground">{req.id}</TableCell>
                    <TableCell className="font-display font-bold uppercase text-xs tracking-wider">{req.name}</TableCell>
                    <TableCell className="font-mono text-[10px]">{req.domain}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <IndustrialButton variant="ghost" size="icon" className="size-8 hover:text-emerald-500">
                          <Check className="size-4" />
                        </IndustrialButton>
                        <IndustrialButton variant="ghost" size="icon" className="size-8 hover:text-destructive">
                          <X className="size-4" />
                        </IndustrialButton>
                        <IndustrialButton variant="ghost" size="icon" className="size-8">
                          <ExternalLink className="size-4" />
                        </IndustrialButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GlassCard>
        </div>

        {/* Global Warnings/Logs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
             <h3 className="text-[11px] font-mono uppercase tracking-wider">Security Logs</h3>
             <IndustrialButton variant="ghost" size="sm">Clear</IndustrialButton>
          </div>
          <div className="space-y-2">
            {[
              { type: 'warn', msg: "Unauthorized access attempt: Node #7721", time: "2m ago" },
              { type: 'info', msg: "New Institution Application: Harvard Unit", time: "14m ago" },
              { type: 'crit', msg: "Cluster B Latency Alert - Region: US-East", time: "26m ago" },
              { type: 'info', msg: "Global Encryption Key Rotated", time: "1h ago" },
            ].map((log, i) => (
              <div key={i} className="p-3 border border-foreground/5 bg-foreground/[0.01] flex items-start gap-3 group hover:border-foreground/10 transition-all">
                {log.type === 'warn' && <AlertTriangle className="size-3 text-amber-500 mt-0.5" />}
                {log.type === 'crit' && <ShieldCheck className="size-3 text-safety-orange mt-0.5" />}
                {log.type === 'info' && <Activity className="size-3 text-electric-blue mt-0.5" />}
                <div className="flex-1">
                  <p className="text-[10px] font-mono leading-tight">{log.msg}</p>
                  <p className="text-[9px] font-mono text-muted-foreground mt-1 uppercase">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <IndustrialButton variant="outline" className="w-full text-[10px] uppercase font-mono tracking-widest mt-4">
            View Protocol History
          </IndustrialButton>
        </div>
      </div>
    </div>
  );
};
