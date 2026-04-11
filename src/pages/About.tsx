import { useState, useEffect } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Users, 
  Target, 
  Award, 
  Code, 
  Palette, 
  BarChart, 
  MessageSquare, 
  Bot,
  Sparkles,
  Trophy,
  Lightbulb,
  Rocket,
  Star,
  Shield,
  Cpu,
  Zap,
  Activity,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "KINSHUK_KASHYAP",
    role: "Unit Leader",
    designation: "UX_ARCHITECT",
    description: "Lead architect for core interface protocols & visual systems. Optimization specialist.",
    icon: Code,
    delay: "0s"
  },
  {
    name: "MANAN_GUPTA",
    role: "Full Stack Engineer",
    designation: "CORE_SYSTEMS",
    description: "Engineering robust infrastructure with MERN stack & Firebase cloud arrays.",
    icon: Users,
    delay: "0.2s"
  },
  {
    name: "TANVI_GUPTA", 
    role: "Systems Designer",
    designation: "STRATEGIC_INTEL",
    description: "Conceptualization of problem-solution matrices & strategic presentation architecture.",
    icon: Palette,
    delay: "0.4s"
  },
  {
    name: "RISHABH_MISHRA",
    role: "Data Analyst", 
    designation: "INTEL_OPERATIONS",
    description: "Validation of problem statements through deep-node data research & market analytics.",
    icon: BarChart,
    delay: "0.6s"
  },
  {
    name: "PRASHANT_SINGH",
    role: "Marketing Strategist",
    designation: "RELAY_COMMUNICATIONS",
    description: "Architecting narrative protocols & value proposition transmissions for global delivery.",
    icon: MessageSquare,
    delay: "0.8s"
  },
  {
    name: "SAMEER",
    role: "AI Lead",
    designation: "NEURAL_CORE_DEV",
    description: "Implementation of autonomous neural chatbot relays & cognitive interaction models.",
    icon: Bot,
    delay: "1s"
  }
];

const achievements = [
  { icon: Trophy, text: "SIH_2025_DEPLOYED", label: "STATUS: ACTIVE" },
  { icon: Target, text: "PROB_STMT_25017", label: "SECTOR: EDUCATION" },
  { icon: Star, text: "SMART_EXP_PROTO", label: "TYPE: SOFTWARE" },
  { icon: Award, text: "VAL_CATEGORY_01", label: "LEVEL: NATIONAL" }
];

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="p-4 lg:p-10 space-y-20 mt-16 max-w-[1400px] mx-auto min-h-screen">
      {/* Hero Section */}
      <section className={cn(
        "space-y-12 text-center transition-all duration-1000 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}>
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-safety-orange" />
             <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-safety-orange">Project Dossier // 0x25017</p>
             <div className="h-px w-12 bg-safety-orange" />
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter uppercase leading-none">
            AlumNet_OS
          </h1>
          <p className="text-sm md:text-lg font-mono text-muted-foreground uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
            Revolutionizing institutional connectivity through high-fidelity data nodes & autonomous engagement protocols.
          </p>
        </div>

        {/* Strategic Card */}
        <GlassCard className="max-w-5xl mx-auto p-12 border-foreground/10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
              <Shield className="size-12 text-safety-orange" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <StatusBadge status="online" label="OPERATIONAL_PHASE" />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">SIH_2025_RELEASE</span>
                 </div>
                 <h2 className="text-3xl font-display font-black uppercase tracking-tight">Strategy_Overview</h2>
                 <p className="font-mono text-xs text-muted-foreground uppercase leading-relaxed tracking-tighter">
                    Centralized alumni data management platform engineered for the Smart India Hackathon. Focus: Intelligent automation, high-density networking, and institutional legacy preservation.
                 </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {achievements.map((item, i) => (
                    <div key={i} className="p-4 bg-foreground/5 border border-foreground/10 flex flex-col gap-2">
                       <item.icon className="size-4 text-safety-orange" />
                       <p className="text-[10px] font-display font-bold uppercase tracking-tight">{item.text}</p>
                       <p className="text-[8px] font-mono text-muted-foreground uppercase">{item.label}</p>
                    </div>
                 ))}
              </div>
           </div>
        </GlassCard>
      </section>

      {/* Unit Manifest (Team) */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
           <h2 className="text-2xl md:text-4xl font-display font-black uppercase tracking-tighter">Unit_Manifest</h2>
           <div className="flex-1 h-px bg-foreground/10" />
           <p className="text-[10px] font-mono text-muted-foreground uppercase">Syntax_Squad // Team_ID: 1042</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <GlassCard key={i} className="p-8 border-foreground/5 group hover:border-safety-orange/30 transition-all">
               <div className="flex justify-between items-start mb-8">
                  <div className="size-12 border border-foreground/10 flex items-center justify-center bg-foreground/5 group-hover:bg-safety-orange/10 transition-colors">
                     <member.icon className="size-5 text-muted-foreground group-hover:text-safety-orange transition-colors" />
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{member.designation}</span>
               </div>
               
               <div className="space-y-2 mb-6">
                  <h4 className="text-xl font-display font-black uppercase tracking-tight leading-none">{member.name}</h4>
                  <p className="text-[10px] font-mono text-safety-orange uppercase font-bold tracking-[0.2em]">{member.role}</p>
               </div>
               
               <p className="text-[10px] font-mono text-muted-foreground uppercase leading-relaxed tracking-tighter group-hover:text-foreground transition-colors">
                  {member.description}
               </p>
               
               <div className="mt-8 pt-6 border-t border-foreground/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] font-mono text-muted-foreground">STATUS: ENGAGED</span>
                  <div className="flex gap-1">
                     {[1,2,3,4].map(b => <div key={b} className="size-1 bg-safety-orange" />)}
                  </div>
               </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="relative">
         <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-safety-orange/5 blur-3xl rounded-full pointer-events-none" />
         <GlassCard className="p-16 border-foreground/10 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 p-6 opacity-5">
               <Zap className="size-24 scale-150" />
            </div>
            
            <div className="space-y-4">
               <h3 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">Strategic_Vision</h3>
               <p className="text-xl md:text-2xl font-mono text-foreground uppercase tracking-tighter max-w-4xl mx-auto leading-tight italic">
                 "To create a revolutionary digital bridge between institutions and their legacy networks, fostering meritocratic growth through autonomous engagement protocols."
               </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-10">
               <IndustrialButton variant="safety" className="h-14 px-12 text-[10px] tracking-[0.3em]">
                  <Rocket className="mr-3 size-4" /> EXPLORE_SYSTEMS
               </IndustrialButton>
               <IndustrialButton variant="outline" className="h-14 px-12 text-[10px] tracking-[0.3em]">
                  <Users className="mr-3 size-4" /> JOIN_NETWORK
               </IndustrialButton>
            </div>
         </GlassCard>
      </section>

      {/* Operational Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Unit_Active", val: "06", icon: Users },
          { label: "Mission_Sync", val: "100%", icon: Target },
          { label: "Protocol_ID", val: "25017", icon: Award },
          { label: "Legacy_Nodes", val: "∞", icon: Activity }
        ].map((stat, i) => (
          <div key={i} className="p-6 industrial-border bg-foreground/5 hover:bg-foreground/10 transition-colors group">
             <div className="flex items-center gap-3 mb-4">
                <stat.icon className="size-3 text-safety-orange" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</span>
             </div>
             <p className="text-3xl font-display font-black tracking-tighter group-hover:translate-x-1 transition-transform">{stat.val}</p>
          </div>
        ))}
      </section>

      {/* Security Footer Overlay (Purely visual) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background/80 backdrop-blur-sm border-t border-foreground/10 z-50 sm:flex hidden justify-between items-center">
         <div className="flex gap-8 text-[8px] font-mono text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-2"><div className="size-1.5 bg-safety-orange animate-pulse" /> SYSTEM_STABLE</span>
            <span>OS_VERSION: 1.0.4-NEO</span>
            <span>DEDICATED_LINE_SECURED</span>
         </div>
         <div className="text-[8px] font-mono text-muted-foreground uppercase opacity-50">
            © 2025 ALUMNET_SYSTEMS_INTL // ALL_RIGHTS_RESERVED
         </div>
      </div>
    </div>
  );
};