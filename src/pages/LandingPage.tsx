import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Target, 
  Globe, 
  Shield, 
  Search,
  Zap,
  LayoutGrid,
  Cpu,
  Unplug,
  Flower,
  Users,
  Landmark,
  Video,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  return (
    <div className="min-h-screen selection:bg-primary/20 font-serif bg-background text-foreground transition-colors duration-500">
      {/* Traditional Header */}
      <nav className="fixed top-0 z-50 w-full border-b-2 border-border bg-background/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 border-2 border-border bg-primary flex items-center justify-center rotate-45 shadow-[4px_4px_0px_0px_#000]">
              <Flower className="size-6 text-white -rotate-45" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-foreground uppercase italic ml-2">AlumNet</span>
          </Link>
          
          <div className="hidden items-center gap-10 md:flex">
            {["Zen", "Network", "Legacy", "Scrolls"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black tracking-[0.3em] uppercase text-foreground/60 hover:text-primary transition-all italic">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <ThemeToggle />
            <Link to="/auth/login" className="text-xs font-black text-foreground hover:text-primary transition-colors uppercase tracking-widest italic">
              Enter
            </Link>
            <Link to="/auth/register-org">
              <Button className="bg-primary rounded-none h-12 px-8 text-[10px] font-black text-white sumi-border hover:bg-primary/90 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shadow-[6px_6px_0px_0px_#1A1A1A] dark:shadow-[6px_6px_0px_0px_#000] uppercase tracking-[0.2em] italic">
                Join_Lineage
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero: The Garden of Connections */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden mountain-bg">
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...FADE_UP} className="space-y-8">
              <div className="inline-block border-2 border-border bg-primary/10 px-8 py-2.5 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">
                Est. Reiwa // 令和六年
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] text-foreground tracking-tighter">
                Honor your <br />
                <span className="text-primary italic">Heritage.</span>
              </h1>

              <p className="max-w-xl text-lg font-medium leading-relaxed text-foreground/80 border-l-4 border-primary pl-8 italic bg-card/60 backdrop-blur-sm p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
                "Like a cherry blossom branch that grows stronger over time, 
                your institutional network is a living legacy. AlumNet nurtures 
                these bonds with traditional grace and modern precision."
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/auth/register-org">
                  <Button className="bg-primary rounded-none h-16 px-10 text-base font-bold text-white sumi-border shadow-[8px_8px_0px_0px_#1A1A1A] dark:shadow-[8px_8px_0px_0px_#000] group italic">
                    Begin the Journey
                    <ArrowRight className="ml-4 size-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" className="bg-card/40 backdrop-blur-sm rounded-none h-16 px-10 text-base font-bold border-2 border-border shadow-[6px_6px_0px_0px_#1A1A1A] dark:shadow-[6px_6px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all italic">
                  View Scrolls
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-10 border-t-2 border-border/10">
                {[
                  { label: "Vibrancy", value: "99.9%" },
                  { label: "Ancestry", value: "Verified" }
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-[10px] tracking-[0.5em] font-black text-foreground/30 uppercase italic mb-2">{stat.label}</p>
                    <p className="text-4xl font-bold text-foreground tracking-tighter italic">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              style={{ scale }}
              className="relative aspect-square md:aspect-auto md:h-[550px] border-4 border-border bg-card p-2 shadow-[20px_20px_0px_0px_#1A1A1A] dark:shadow-[20px_20px_0px_0px_#000] overflow-hidden group"
            >
              <div className="absolute inset-0 washi-texture opacity-30 pointer-events-none z-20" />
              <img 
                src="/japanese_sakura_mountains_sketch.png" 
                alt="Zen Garden Landscape" 
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-8 right-8 writing-vertical text-3xl font-bold text-foreground/20 italic select-none">
                結びつき - Connection
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy: Ink and Brush */}
      <section className="bg-foreground py-48 text-background relative overflow-hidden">
        <div className="absolute inset-0 washi-texture opacity-5" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <h2 className="text-6xl md:text-8xl font-bold leading-[0.85] italic opacity-95 tracking-tighter">
                The Art of <br/> Scalable <br/> Trust.
              </h2>
              <div className="h-2 w-32 bg-primary shadow-[4px_4px_0px_0px_rgba(212,61,97,0.3)]" />
              <p className="text-2xl text-background/80 leading-relaxed font-medium italic border-l-4 border-primary/40 pl-10">
                In the old ways, trust was forged through shared experience. 
                Our Sumi-Verified™ architecture restores this value to the 
                digital age, ensuring every node in your network is 
                a true member of your academic family.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-4 border-background/20 bg-background/5 p-4 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)]">
              {[
                "Sumi_Identity", "Sakura_UX", "Bushido_Security", "Zen_Flow",
                "Discovery_Scrolls", "Spirit_Sync", "Legacy_Logs", "Family_API"
              ].map(tag => (
                <div key={tag} className="p-8 border-2 border-background/10 text-[10px] font-black tracking-[0.4em] text-background/60 flex items-center justify-between hover:bg-primary/20 hover:text-white transition-all cursor-default uppercase italic">
                  {tag}
                  <Zap className="size-5 text-primary sakura-glow" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules: The Four Pillars */}
      <section id="modules" className="py-48 washi-texture bg-card/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center mb-32 space-y-8">
             <div className="text-[10px] font-black tracking-[0.5em] text-primary border-4 border-primary px-10 py-3 uppercase italic">Core Principles</div>
            <h2 className="text-6xl font-bold text-center text-foreground italic tracking-tighter">The Architecture of Legacy</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-4 border-border shadow-[20px_20px_0px_0px_#1A1A1A] dark:shadow-[20px_20px_0px_0px_#000]">
            {[
              {
                icon: Globe,
                title: "Path of Discovery",
                desc: "A vast directory that flows like a river, allowing you to find mentors and peers with the ease of a breeze."
              },
              {
                icon: Target,
                title: "Harmony Matching",
                desc: "Wisdom-driven pairing. We connect you based on the resonance of your career journeys and shared values."
              },
              {
                icon: Shield,
                title: "Fortress of Identity",
                desc: "Your academic honor is protected by institutional verification, ensuring a sanctuary of authentic alumni."
              },
              {
                icon: LayoutGrid,
                title: "Imperial Dashboard",
                desc: "An elegant overview of your network's growth, vital signs, and the blooming velocity of connections."
              },
              {
                icon: Search,
                title: "Seeker's Wisdom",
                desc: "Peer through the mist with deep semantic search that understands the true essence of a profile."
              },
              {
                icon: Unplug,
                title: "Natural Bridges",
                desc: "Connect seamlessly with your existing scrolls and systems through our harmonious REST gateways."
              }
            ].map((mod, i) => (
              <div key={i} className="group p-16 border-2 border-border bg-card/60 hover:bg-primary/5 transition-all relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                   <mod.icon className="size-48" />
                </div>
                <div className="size-16 border-2 border-border flex items-center justify-center bg-background mb-12 shadow-[4px_4px_0px_0px_#1A1A1A] group-hover:rotate-12 transition-transform">
                  <mod.icon className="size-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-8 italic tracking-tight">{mod.title}</h3>
                <p className="text-base font-medium text-foreground/60 leading-relaxed italic">
                  {mod.desc}
                </p>
                <div className="mt-12 pt-8 border-t border-border/20 text-[10px] font-black tracking-[0.4em] text-primary/40 uppercase italic">
                  PILLAR_REF: 00{i+1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Path: How it Works */}
      <section className="py-48 bg-card/10 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="absolute -left-16 top-0 bottom-0 w-1 bg-border/10" />
              <div className="space-y-28">
                {[
                  { step: "01", title: "Seek the Wisdom", desc: "Access our ancient directory of verified kindred. Filter by era, lineage (department), and mastery.", icon: Search },
                  { step: "02", title: "Resonance Check", desc: "Our spirit-matching algorithms find kindred whose journeys align with your future path.", icon: Zap },
                  { step: "03", title: "Forge the Bond", desc: "Initialize a rite of mentorship or peer link. Secure, verified, and built for institutional honor.", icon: Flower }
                ].map((s, i) => (
                  <div key={i} className="relative pl-20 group">
                    <div className="absolute left-[-20px] top-0 size-10 border-2 border-border bg-card flex items-center justify-center rotate-45 group-hover:bg-primary group-hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] group-hover:shadow-none">
                      <span className="text-[12px] font-black -rotate-45">{s.step}</span>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-6 italic tracking-tight">{s.title}</h3>
                    <p className="text-xl text-foreground/60 leading-relaxed italic border-l-2 border-border/10 pl-8">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-16">
              <div className="text-[10px] font-black tracking-[0.6em] text-primary uppercase italic">The Methodology</div>
              <h2 className="text-7xl md:text-8xl font-bold leading-[0.85] text-foreground italic tracking-tighter">
                From ancient <br /> values to <br /> digital <br /> speed.
              </h2>
              <p className="text-2xl text-foreground/70 leading-relaxed border-l-8 border-primary pl-12 italic py-4">
                We believe that the strength of an institution lies not in its buildings, 
                but in the continuity of its people. Our platform is the digital bridge 
                that preserves this eternal flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voices: The Scroll of Honor */}
      <section className="py-48 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 washi-texture opacity-5 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-32 space-y-6">
            <h2 className="text-6xl font-bold italic tracking-tighter">Voices of the Lineage</h2>
            <div className="h-1.5 w-32 bg-primary mx-auto shadow-[0_0_15px_rgba(212,61,97,0.5)]" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              {
                quote: "AlumNet restored the sense of family I thought was lost after graduation. The verification gives me peace of mind.",
                author: "Kenji Sato",
                era: "Class of '12",
                org: "Tokyo Tech"
              },
              {
                quote: "The interface is a breath of fresh air. It feels like a sanctuary for professional growth rather than a noisy marketplace.",
                author: "Elena Rodriguez",
                era: "Alumni Director",
                org: "Heritage University"
              },
              {
                quote: "We've seen a 40% increase in mentorship engagement since switching to the Sakura-Verified system. Truly transformative.",
                author: "Dr. Aris Thorne",
                era: "Dean of Arts",
                org: "St. Jude Institute"
              }
            ].map((v, i) => (
              <div key={i} className="p-16 pt-20 border-2 border-background/10 bg-background/5 hover:bg-background/10 transition-all group relative shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)]">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-all group-hover:rotate-[15deg]">
                  <Flower className="size-16 text-primary" />
                </div>
                <p className="text-2xl font-medium leading-relaxed italic mb-12 opacity-90 border-l-2 border-primary/30 pl-8">"{v.quote}"</p>
                <div className="border-t-2 border-background/10 pt-10">
                  <h4 className="font-bold text-2xl italic tracking-tight">{v.author}</h4>
                  <p className="text-[10px] font-black text-primary tracking-[0.4em] uppercase mt-3 italic">{v.era} // {v.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Garden: The Stats */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute inset-0 washi-texture opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-4 gap-16 text-center">
            {[
              { label: "Active Spirits", value: "125k+", icon: Users },
              { label: "Temples Linked", value: "450+", icon: Landmark },
              { label: "Rites Completed", value: "890k", icon: Video },
              { label: "Honor Velocity", value: "99.9%", icon: ShieldCheck }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                {...FADE_UP}
                transition={{ delay: i * 0.1 }}
                className="group p-10 hover:translate-y-[-10px] transition-all"
              >
                <div className="size-20 mx-auto mb-10 border-4 border-border bg-card flex items-center justify-center rotate-45 group-hover:bg-primary group-hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] group-hover:shadow-none">
                  <stat.icon className="size-10 -rotate-45" />
                </div>
                <p className="text-5xl font-bold text-foreground mb-4 tracking-tighter italic">{stat.value}</p>
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40 italic">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Entering the Temple */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-8 border-border p-16 md:p-32 relative overflow-hidden bg-card shadow-[32px_32px_0px_0px_#1A1A1A] dark:shadow-[32px_32px_0px_0px_#000]">
            <div className="absolute inset-0 washi-texture opacity-40 pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-24 items-end">
              <div className="space-y-12">
                <h2 className="text-7xl md:text-[10rem] font-bold text-foreground leading-[0.75] italic tracking-tighter">
                  Begin your <br/> <span className="text-primary">Legacy.</span>
                </h2>
                <p className="max-w-xl text-[12px] font-black text-foreground/60 uppercase tracking-[0.5em] leading-[2] italic border-l-4 border-primary pl-10">
                  Establish your temple of connectivity and preserve the spirit of your institution for generations to come.
                </p>
              </div>
              <div className="flex flex-col gap-10 items-center">
                 <Link to="/auth/register-org">
                  <Button className="bg-primary rounded-none h-28 px-24 text-3xl font-bold text-white sumi-border shadow-[12px_12px_0px_0px_#1A1A1A] dark:shadow-[12px_12px_0px_0px_#000] hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-none transition-all italic">
                    Initialize Lineage
                  </Button>
                </Link>
                <p className="text-[11px] text-center font-black tracking-[1em] text-primary/60 italic uppercase">
                  — FLOW WITH THE WIND —
                </p>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 p-16 text-[12px] font-black text-foreground/20 uppercase pointer-events-none writing-vertical tracking-[1em] italic">
                令和六年 • 卯月 • 廿三日
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Footer */}
      <footer className="border-t-8 border-border bg-card py-32 washi-texture">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-24 text-foreground/60">
            <div className="space-y-10">
               <div className="flex items-center gap-4">
                <div className="size-12 border-4 border-border bg-primary/10 flex items-center justify-center rotate-45">
                  <Flower className="size-6 text-primary -rotate-45" />
                </div>
                <span className="text-3xl font-bold tracking-tighter text-foreground uppercase italic">AlumNet</span>
              </div>
              <p className="text-[11px] font-black tracking-[0.3em] max-w-xs leading-relaxed uppercase italic opacity-80">
                Preserving institutional honor through digital connectivity. Built for eternity, inspired by the path of the ancient masters.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
               {[
                 { t: "SCROLLS", l: ["History", "Script", "Legends"] },
                 { t: "ETHICS", l: ["Honor", "Trust", "Code"] },
                 { t: "TEMPLES", l: ["Nodes", "Status", "Contact"] },
                 { t: "KINDRED", l: ["Garden", "Labs", "Future"] }
               ].map(c => (
                 <div key={c.t} className="space-y-8">
                   <h4 className="text-[11px] font-black tracking-[0.5em] text-foreground uppercase border-b-2 border-border/20 pb-4 italic">{c.t}</h4>
                   <ul className="space-y-5">
                     {c.l.map(link => (
                       <li key={link}><a href="#" className="text-[11px] font-black tracking-[0.2em] hover:text-primary transition-all italic uppercase">{link}</a></li>
                     ))}
                   </ul>
                 </div>
               ))}
            </div>
          </div>
          <div className="mt-32 pt-16 border-t-4 border-border/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black tracking-[0.6em] opacity-40 uppercase italic">
            <div>© 2024 ALUMNET_LINEAGE // ALL_HONOR_RESERVED</div>
            <div className="flex gap-12">
              <span>NATURE</span> <span>HARMONY</span> <span>SPIRIT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
