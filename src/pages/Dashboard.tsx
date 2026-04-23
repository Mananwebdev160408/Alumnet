import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Calendar, 
  Video, 
  Network, 
  Award, 
  TrendingUp, 
  MessageCircle, 
  Plus,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Flower,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export const Dashboard = () => {
  return (
    <div className="space-y-16 font-serif pb-20">
      {/* 1. Welcome Hero Section */}
      <motion.section 
        {...FADE_UP}
        className="relative overflow-hidden border-4 border-border bg-card/50 p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between group shadow-[16px_16px_0px_0px_#1A1A1A] dark:shadow-[16px_16px_0px_0px_#000]"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Flower className="size-80" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block border-2 border-border bg-primary/10 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 italic"
          >
            Current Era: Reiwa // 令和六年
          </motion.div>
          <h2 className="text-6xl font-bold text-foreground tracking-tighter mb-8 leading-none italic">
            Greetings, <span className="text-primary">Sarah</span>
          </h2>
          <p className="text-xl text-foreground/80 font-medium leading-relaxed italic border-l-4 border-primary pl-8 mb-12">
            "The river of your lineage grows. Your network has blossomed by <span className="text-primary font-black underline underline-offset-4 decoration-2">12 new kindred</span> this cycle. Three rites of mentorship await your wisdom today."
          </p>
          <div className="flex flex-wrap gap-8">
            <Button className="h-16 px-10 bg-primary text-white rounded-none font-bold uppercase tracking-[0.2em] flex items-center gap-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[8px_8px_0px_0px_#1A1A1A] dark:shadow-[8px_8px_0px_0px_#000] text-xs italic">
              Begin a Rite <ArrowRight className="size-5" />
            </Button>
            <Button variant="outline" className="h-16 px-10 border-2 border-border bg-transparent text-foreground rounded-none font-bold uppercase tracking-[0.2em] hover:bg-card transition-all shadow-[6px_6px_0px_0px_#1A1A1A] dark:shadow-[6px_6px_0px_0px_#000] text-xs italic">
              View Scrolls
            </Button>
          </div>
        </div>
        <div className="hidden lg:block relative mt-12 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="w-80 h-64 border-4 border-border bg-card p-2 shadow-[12px_12px_0px_0px_#1A1A1A] dark:shadow-[12px_12px_0px_0px_#000] overflow-hidden"
          >
            <img 
              alt="Zen Workspace" 
              className="w-full h-full object-cover grayscale-[0.4] hover:grayscale-0 transition-all duration-700" 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 writing-vertical text-[10px] font-black text-primary uppercase tracking-[1em] italic select-none">
            静寂
          </div>
        </div>
      </motion.section>

      {/* 2. Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { label: "Rites this cycle", value: "24", icon: Video, color: "text-primary", trend: "+12% from last cycle", subIcon: TrendingUp },
          { label: "Kindred bonds", value: "842", icon: Network, color: "text-accent", trend: "42 spirits seeking link", subIcon: Flower },
          { label: "Honor Points", value: "12,450", icon: Award, color: "text-primary", trend: "Grandmaster Status", subIcon: ShieldCheck }
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            {...FADE_UP}
            transition={{ delay: 0.1 * i }}
            className="japanese-card bg-card/60 group hover:translate-y-[-6px] transition-all duration-500 border-2 border-border/50 p-8"
          >
            <div className={`w-16 h-16 border-2 border-border bg-background flex items-center justify-center ${stat.color} mb-10 shadow-[6px_6px_0px_0px_#1A1A1A] dark:shadow-[6px_6px_0px_0px_#000] group-hover:rotate-[15deg] transition-all duration-500`}>
              <stat.icon className="size-8" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/40 mb-3 italic">{stat.label}</p>
            <h3 className="text-5xl font-bold text-foreground tracking-tighter">{stat.value}</h3>
            <div className={`mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] ${stat.color} opacity-80 italic`}>
              <stat.subIcon className="size-4" />
              <span>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 3. Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-20">
        {/* Upcoming Rites */}
        <motion.div {...FADE_UP} className="xl:col-span-5">
          <div className="flex justify-between items-end mb-12 pb-4 border-b-2 border-border/20">
            <h4 className="text-3xl font-bold tracking-tighter text-foreground italic flex items-center gap-4">
              Pending Rites <Sparkles className="size-5 text-primary" />
            </h4>
            <button className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:underline mb-1 italic">All Scrolls</button>
          </div>
          <div className="space-y-4 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border/20"></div>
            
            {[
              { time: "Today • 2:00 PM", title: "Portfolio Wisdom", name: "Marcus J.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50&h=50", active: true },
              { time: "Tomorrow • 10:00 AM", title: "Path Seekers Q&A", name: "Dr. Helena Ray", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=50&h=50", active: false }
            ].map((rite, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="relative pl-16 pb-12 group"
              >
                <div className={`absolute left-[28px] top-2 size-4 border-2 border-border z-10 rotate-45 transition-all duration-500 group-hover:rotate-[225deg] ${rite.active ? 'bg-primary shadow-[0_0_15px_rgba(212,61,97,0.5)]' : 'bg-background'}`}></div>
                <div className="japanese-card bg-card/40 p-8 group-hover:bg-card/80 group-hover:translate-x-2 transition-all duration-500 border border-border/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] block mb-3 italic ${rite.active ? 'text-primary' : 'text-foreground/30'}`}>{rite.time}</span>
                  <h5 className="font-bold text-xl text-foreground mb-6 tracking-tight italic">{rite.title}</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-10 border-2 border-border grayscale hover:grayscale-0 transition-all rotate-3 group-hover:rotate-0 overflow-hidden">
                        <img className="w-full h-full object-cover" src={rite.img} alt={rite.name} />
                      </div>
                      <span className="text-[11px] font-bold text-foreground/50 uppercase tracking-widest italic">with {rite.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="size-10 border border-border/20 rounded-none hover:bg-primary hover:text-white transition-all">
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Suggested Mentors */}
        <motion.div {...FADE_UP} className="xl:col-span-7">
          <div className="flex justify-between items-end mb-12 pb-4 border-b-2 border-border/20">
            <h4 className="text-3xl font-bold tracking-tighter text-foreground italic">Kindred Spirits</h4>
            <div className="flex gap-6 mb-1">
              <Button variant="ghost" size="icon" className="size-10 border-2 border-border bg-card shadow-[4px_4px_0px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                <ChevronLeft className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="size-10 border-2 border-border bg-card shadow-[4px_4px_0px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
          <div className="flex gap-10 overflow-x-auto pb-10 snap-x no-scrollbar">
            {[
              { name: "Alex Rivera", role: "Master Artisan @ Stripe", tags: ["Fintech", "Arts"], score: "98%", img: "https://images.unsplash.com/photo-1573164713988-862a3b2b003a?auto=format&fit=crop&q=80&w=150&h=150" },
              { name: "Sarah Drasner", role: "Arch-Engineer @ Google", tags: ["Architecture", "Zen"], score: "92%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" }
            ].map((mentor, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="min-w-[360px] snap-start border-4 border-border bg-card/80 p-10 text-center shadow-[16px_16px_0px_0px_#1A1A1A] dark:shadow-[16px_16px_0px_0px_#000] group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-500"
              >
                <div className="relative size-32 mx-auto mb-10">
                  <div className="absolute inset-0 border-2 border-border rotate-45 group-hover:rotate-[225deg] transition-transform duration-1000 bg-primary/5"></div>
                  <div className="absolute inset-3 border-4 border-border overflow-hidden bg-card z-10 rotate-3 group-hover:rotate-0 transition-transform">
                    <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={mentor.img} alt={mentor.name} />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-primary p-2 border-2 border-border z-20 shadow-[4px_4px_0px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_0px_#000]">
                    <ShieldCheck className="size-5 text-white" />
                  </div>
                </div>
                <h5 className="text-2xl font-bold text-foreground mb-3 italic tracking-tight">{mentor.name}</h5>
                <p className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.3em] mb-8 italic">{mentor.role}</p>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  {mentor.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 border-2 border-border/10 bg-background text-[10px] font-black uppercase tracking-widest italic hover:border-primary/50 transition-colors">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-8 border-t-2 border-border/10">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em] italic mb-1">Resonance</p>
                    <p className="text-2xl font-bold text-primary tracking-tighter">{mentor.score}</p>
                  </div>
                  <Button className="size-16 bg-primary text-white rounded-none border-2 border-border shadow-[6px_6px_0px_0px_#1A1A1A] dark:shadow-[6px_6px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center">
                    <MessageCircle className="size-7" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FAB: The Eternal Addition */}
      <motion.button 
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        className="fixed bottom-12 right-12 size-24 bg-primary text-white rounded-none border-4 border-border shadow-[12px_12px_0px_0px_#1A1A1A] dark:shadow-[12px_12px_0px_0px_#000] flex items-center justify-center hover:shadow-none active:scale-95 transition-all z-50 group"
      >
        <Plus className="size-10" />
        <span className="absolute right-32 bg-card text-foreground px-8 py-4 font-black text-xs uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none italic border-4 border-border shadow-[8px_8px_0px_0px_#1A1A1A] dark:shadow-[8px_8px_0px_0px_#000]">
          Create New Legacy
        </span>
      </motion.button>
    </div>
  );
};