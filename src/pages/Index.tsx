import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  MessageCircle, 
  ArrowRight, 
  Hexagon,
  Target,
  Zap,
  Globe,
  Lock,
  Calendar,
  Video
} from "lucide-react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Alumni Discovery",
      description: "Neural search across global institutional data points.",
    },
    {
      icon: Calendar,
      title: "Direct Scheduling",
      description: "Slot-based booking with automated conflict resolution.",
    },
    {
      icon: Video,
      title: "Built-in Video",
      description: "Native signaling for high-fidelity mentorship sessions.",
    },
    {
      icon: Target,
      title: "Referral Board",
      description: "Internal job relay system with direct alumni vouchers.",
    },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-safety-orange selection:text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_400px,hsl(var(--safety-orange)/0.05),transparent)]" />
      </div>

      <main className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="staggered-reveal" style={{ animationDelay: "0.1s" }}>
            <StatusBadge status="verified" label="Protocol v1.0 Active" className="mb-6" />
            <h1 className="text-5xl lg:text-8xl font-display font-black tracking-tighter leading-[0.9] mb-8 uppercase">
              The Private <span className="text-safety-orange">Mentorship</span> Network.
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl mb-10">
              High-trust institutional isolation for the next generation of industry leaders.
              Secure your professional legacy.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <IndustrialButton 
                variant="safety" 
                size="lg" 
                className="group h-14"
                onClick={() => navigate("/auth/signup")}
              >
                Apply for Access
                <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
              </IndustrialButton>
              <IndustrialButton 
                variant="outline" 
                size="lg" 
                className="h-14"
                onClick={() => navigate("/auth/login")}
              >
                Operator Login
              </IndustrialButton>
            </div>

            <div className="mt-12 flex gap-10 items-center justify-between lg:justify-start border-t border-foreground/5 pt-10">
              {[
                { val: "10K+", label: "Units" },
                { val: "500+", label: "Nodes" },
                { val: "50+", label: "Zones" }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-display font-bold leading-none">{stat.val}</p>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative staggered-reveal" style={{ animationDelay: "0.3s" }}>
            <GlassCard className="border-foreground/10 bg-foreground/[0.02] p-2">
              <div className="relative aspect-[4/5] bg-background border border-foreground/5 overflow-hidden group">
                {/* Mock UI for Alumni Directory */}
                <div className="absolute inset-0 p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-foreground/5 pb-4">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Directory_View</div>
                    <div className="flex gap-1">
                      <div className="size-2 bg-foreground/20" />
                      <div className="size-2 bg-foreground/20" />
                      <div className="size-2 bg-safety-orange" />
                    </div>
                  </div>
                  
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-4 border border-foreground/5 bg-foreground/[0.02] flex gap-4 items-center group/card transition-all hover:bg-foreground/[0.04]">
                      <div className="size-12 bg-foreground/5 industrial-border flex items-center justify-center grayscale group-hover/card:grayscale-0">
                        <Hexagon className="size-6 text-muted-foreground group-hover/card:text-safety-orange transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-foreground/10 mb-2" />
                        <div className="h-4 w-40 bg-foreground/20" />
                      </div>
                      <div className="size-4 border border-foreground/20" />
                    </div>
                  ))}

                  <div className="mt-auto border-t border-foreground/5 pt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[9px] font-mono text-muted-foreground">SYS_STATUS: OPTIMAL</div>
                      <div className="text-[9px] font-mono text-safety-orange">ENCRYPTED</div>
                    </div>
                  </div>
                </div>
                
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[size:100%_4px]" />
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,107,0,0.1),transparent_40%)]" />
              </div>
            </GlassCard>
            
            {/* Floating Info Pod */}
            <div className="absolute -bottom-10 -right-10 hidden lg:block">
              <GlassCard className="p-4 border-safety-orange/20">
                <div className="flex items-center gap-4">
                  <Zap className="size-5 text-safety-orange fill-safety-orange/20" />
                  <div>
                    <p className="text-[10px] font-mono font-bold uppercase">Real-time Sync</p>
                    <p className="text-[9px] font-mono text-muted-foreground">v2.4 Engine Active</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-40 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 staggered-reveal" style={{ animationDelay: "0.5s" }}>
          {features.map((feature, i) => (
            <div key={i} className="p-8 border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all group">
              <feature.icon className="size-6 mb-6 text-muted-foreground group-hover:text-safety-orange transition-colors" />
              <h3 className="text-sm font-display font-bold mb-3 tracking-widest">{feature.title}</h3>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* Global Access Section */}
        <section className="mt-40 border border-foreground/10 overflow-hidden relative group">
          <div className="absolute inset-0 bg-foreground/[0.02]" />
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,hsl(var(--safety-orange)),transparent)]" />
          <div className="relative p-12 lg:p-24 text-center">
            <h2 className="text-4xl lg:text-7xl font-display font-black tracking-tighter mb-8 uppercase max-w-3xl mx-auto">
              Ready to <span className="text-safety-orange">Initialize</span>?
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-light">
              Join the encrypted network of elite professionals. 
              Verified alumni only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <IndustrialButton 
                variant="safety" 
                size="lg" 
                className="h-14 px-10"
                onClick={() => navigate("/auth/signup")}
              >
                Establish Connection
              </IndustrialButton>
              <IndustrialButton 
                variant="outline" 
                size="lg" 
                className="h-14 px-10"
                onClick={() => navigate("/apply")}
              >
                Institute Inquiry
              </IndustrialButton>
            </div>
          </div>
        </section>
      </main>

      {/* Footer System */}
      <footer className="border-t border-foreground/10 px-6 lg:px-8 py-10 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 grayscale opacity-50">
             <Hexagon className="size-5" />
             <span className="font-display font-bold text-xs tracking-tighter uppercase">Alumnet.SYS</span>
          </div>
          <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
            © 2026 AlumNet Global Infrastructure. All Rights Reserved.
          </div>
          <div className="flex gap-8">
            {['Status', 'Privacy', 'Compliance'].map((t) => (
              <a key={t} href="#" className="text-[10px] font-mono uppercase text-muted-foreground hover:text-foreground transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
