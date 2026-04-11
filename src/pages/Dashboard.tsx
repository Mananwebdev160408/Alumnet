import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Users, 
  MessageCircle, 
  GraduationCap, 
  Zap, 
  Bell, 
  ChevronRight,
  Search,
  ArrowUpRight,
  Globe,
  Radio
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Dashboard = () => {
  const broadcasts = [
    { id: 1, title: "Career Fair: Tech Sector", loc: "Virtual Hub", time: "2h ago" },
    { id: 2, title: "Alumni Meet: Bangalore", loc: "Sector 4", time: "5h ago" },
  ];

  const onlinePeers = [
    { id: 'AG-72', name: "Alex Riv", role: "SDE @ Google", status: "online" as const },
    { id: 'AG-44', name: "Mina Sun", role: "Founder @ Neo", status: "away" as const },
    { id: 'AG-12', name: "Jordan K", role: "PhD @ Stanford", status: "online" as const },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 mt-16 max-w-[1600px] mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="size-2 bg-safety-orange animate-pulse" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Authorized Connection Active</p>
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-none">
            Welcome, <span className="text-safety-orange">Agent #01</span>
          </h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mt-4">
            Unit: IIT Delhi Infrastructure // Node Access: Level 4
          </p>
        </div>
        <div className="flex gap-3">
          <div className="text-right hidden md:block mr-4">
            <p className="text-[10px] font-mono text-muted-foreground uppercase">Network Latency</p>
            <p className="text-sm font-mono font-bold uppercase">12ms <span className="text-emerald-500">OPTIMAL</span></p>
          </div>
          <IndustrialButton variant="outline" size="icon" className="size-12">
            <Bell className="size-5" />
          </IndustrialButton>
          <IndustrialButton variant="safety" size="lg" className="h-12 px-8">
            New Broadcast
          </IndustrialButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Broadcasts */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono uppercase tracking-widest flex items-center gap-2">
              <Radio className="size-3 text-safety-orange" />
              Official Stream
            </h3>
            <span className="text-[9px] font-mono text-muted-foreground">LIVE_FEED</span>
          </div>
          
          <div className="space-y-4">
            {broadcasts.map((b) => (
              <GlassCard key={b.id} className="p-3 border-foreground/5 hover:border-safety-orange/20 cursor-pointer group">
                <p className="text-[9px] font-mono text-safety-orange uppercase mb-1">{b.time}</p>
                <h4 className="text-xs font-display font-bold uppercase tracking-wider mb-2 group-hover:text-safety-orange transition-colors">
                  {b.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground italic">
                  <span>@ {b.loc}</span>
                </div>
              </GlassCard>
            ))}
            <button className="w-full py-3 border border-dashed border-foreground/10 text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-all">
              Load Archive Data
            </button>
          </div>
        </div>

        {/* Center Column: Activity Stream */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono uppercase tracking-widest">Activity Node Stream</h3>
            <div className="flex gap-4">
              {['All', 'Mentorship', 'Units'].map(f => (
                <button key={f} className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground">
                  [{f}]
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Connection Request Card */}
            <GlassCard className="p-6 border-electric-blue/20 bg-electric-blue/[0.02] relative overflow-hidden staggered-reveal">
               <div className="absolute top-0 right-0 p-2 opacity-10">
                 <Zap className="size-12 text-electric-blue" />
               </div>
               <div className="flex items-start gap-4">
                  <Avatar className="size-12 rounded-none border border-electric-blue/30">
                    <AvatarFallback className="bg-electric-blue text-black font-bold font-mono">SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-display font-bold uppercase tracking-wider">Sarah Chen</p>
                      <StatusBadge status="verified" label="ALUMNI_18" />
                    </div>
                    <p className="text-[11px] text-muted-foreground font-mono leading-relaxed mb-4">
                      Requested a mentorship session regarding: <span className="text-foreground">"Neural Architecture Design"</span>
                    </p>
                    <div className="flex gap-3">
                      <IndustrialButton variant="electric" size="sm" className="h-8">Initialize link</IndustrialButton>
                      <IndustrialButton variant="outline" size="sm" className="h-8">Details</IndustrialButton>
                    </div>
                  </div>
               </div>
            </GlassCard>

            {/* General Activity */}
            {[1, 2].map(i => (
              <GlassCard key={i} className="p-6 border-foreground/5 hover:border-foreground/10 staggered-reveal">
                <div className="flex gap-4">
                  <div className="size-10 industrial-border bg-foreground/5 flex items-center justify-center grayscale text-muted-foreground">
                    <Globe className="size-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                       <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Protocol_Update // Connection</p>
                       <p className="text-[9px] font-mono text-muted-foreground uppercase">14m ago</p>
                    </div>
                    <p className="text-xs font-mono">
                      User <span className="text-foreground font-bold">James Miller</span> synchronized with the <span className="text-safety-orange italic">SF Tech Sector</span> node.
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: Node Connectivity */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono uppercase tracking-widest flex items-center gap-2">
              <Users className="size-3 text-electric-blue" />
              Active Nodes
            </h3>
            <span className="text-[9px] font-mono text-muted-foreground">PEER_TRACKING</span>
          </div>

          <GlassCard className="p-0 border-foreground/5 divide-y divide-foreground/5">
            {onlinePeers.map((peer) => (
              <div key={peer.id} className="p-4 flex items-center gap-4 hover:bg-foreground/[0.02] transition-colors group cursor-pointer">
                <Avatar className="size-8 rounded-none border border-foreground/10 group-hover:border-foreground/30 transition-colors">
                  <AvatarFallback className="text-[10px] font-mono uppercase">{peer.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-display font-bold uppercase truncate tracking-wide">{peer.name}</p>
                  <p className="text-[9px] font-mono text-muted-foreground uppercase truncate mt-0.5">{peer.role}</p>
                </div>
                <StatusBadge status={peer.status} label={peer.status} className="border-none bg-transparent p-0" />
              </div>
            ))}
            <div className="p-4 bg-foreground/[0.02]">
              <IndustrialButton variant="outline" className="w-full text-[10px] uppercase font-mono tracking-widest">
                Search Subnet
              </IndustrialButton>
            </div>
          </GlassCard>

          {/* Quick Stats Pod */}
          <div className="p-6 border border-foreground/5 bg-foreground/[0.01] space-y-4">
             <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
               <span>Subnet Load</span>
               <span>72%</span>
             </div>
             <div className="h-1 w-full bg-foreground/5 overflow-hidden">
                <div className="h-full bg-safety-orange w-[72%]" />
             </div>
             <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase">
                <span>Active Relays</span>
                <span>12 Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};