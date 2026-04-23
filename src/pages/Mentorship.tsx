import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowRight, 
  MessageCircle, 
  Sparkles,
  Flower,
  LayoutGrid,
  List as ListIcon,
  RefreshCw,
  Video,
  Calendar,
  Award,
  ShieldCheck,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

// Mock data for Mentors
const mockMentors = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Product Designer @ Meta",
    bio: "Helping juniors navigate the transition from academic theory to industry-standard UX practices and systems.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    tags: ["DesignSystems", "Figma", "CareerGrowth"],
    badge: "Grandmaster",
    type: "top"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "AI Researcher @ OpenAI",
    bio: "Focusing on LLM safety and ethical alignment. Happy to chat about PhD applications and research paths.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    tags: ["MachineLearning", "PyTorch", "Ethics"],
    badge: "Rising Spirit",
    type: "new"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "VP Engineering @ Stripe",
    bio: "Passionate about scaling engineering organizations and maintaining culture during hyper-growth phases.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    tags: ["Leadership", "Fintech", "Scaling"],
    badge: "Arch-Mentor",
    type: "top"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founding Partner @ VentureX",
    bio: "Always looking for the next big idea. I mentor early-stage founders on pitch decks and fundraising.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    tags: ["Startups", "Fundraising", "Pitching"],
    badge: "Artisan",
    type: "artisan"
  }
];

export const Mentorship = () => {
  const { toast } = useToast();
  const [mentors] = useState(mockMentors);
  const [activeFilter, setActiveFilter] = useState("All Mentors");

  const handleBookSession = (name: string) => {
    toast({
      title: "Rite Initiated",
      description: `A request for wisdom has been sent to ${name}.`,
    });
  };

  return (
    <div className="space-y-16 font-serif pb-20">
      {/* Header & Filters */}
      <motion.section {...FADE_UP} className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-border pb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="size-6 bg-primary rotate-45 shadow-[2px_2px_0px_0px_#000]" />
              <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase italic">The High Council</span>
            </div>
            <h2 className="text-5xl font-bold tracking-tighter text-foreground italic">Mentorship Halls</h2>
            <p className="text-foreground/60 text-lg leading-relaxed italic border-l-4 border-primary/20 pl-6">
              Connect with 2,482 masters of their craft. Seek guidance, share wisdom, and forge bonds that transcend the digital ether.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="outline" className="h-14 px-8 border-2 border-border bg-card shadow-[4px_4px_0px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-xs uppercase tracking-widest italic">
               My Rites
             </Button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-4">
          {["All Mentors", "Software Engineering", "Product Design", "Marketing", "Entrepreneurship"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "h-12 px-6 border-2 border-border font-black text-[10px] uppercase tracking-[0.2em] transition-all italic",
                activeFilter === filter 
                  ? "bg-primary text-white shadow-none translate-x-0.5 translate-y-0.5" 
                  : "bg-card/40 text-foreground/60 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
              )}
            >
              {filter}
              {filter !== "All Mentors" && <ChevronDown className="size-3 inline-block ml-3 opacity-50" />}
            </button>
          ))}
          <div className="h-10 w-px bg-border/20 mx-4 hidden lg:block" />
          <Button variant="ghost" className="text-primary font-black text-[10px] uppercase tracking-[0.3em] italic hover:bg-primary/5">Clear Path</Button>
        </div>
      </motion.section>

      {/* Mentor Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {mentors.map((mentor, i) => (
          <motion.div 
            key={mentor.id} 
            {...FADE_UP}
            transition={{ delay: i * 0.1 }}
            className="group japanese-card bg-card/60 p-10 hover:translate-y-[-8px] transition-all duration-500 border-2 border-border/10 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[16px_16px_0px_0px_rgba(0,0,0,0.2)] relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-12 -right-12 size-40 opacity-5 pointer-events-none group-hover:rotate-45 transition-transform duration-1000">
               <Flower className="size-full" />
            </div>

            <div className="flex items-start justify-between relative z-10 mb-8">
              <div className="relative size-24">
                <div className="absolute inset-0 border-2 border-border rotate-45 bg-primary/5 group-hover:rotate-[225deg] transition-transform duration-1000" />
                <div className="absolute inset-2 border-4 border-border overflow-hidden bg-card z-10 rotate-3 group-hover:rotate-0 transition-transform">
                  <img 
                    alt={mentor.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    src={mentor.avatar} 
                  />
                </div>
              </div>
              {mentor.badge && (
                <div className={cn(
                  "px-4 py-1.5 border-2 border-border text-[10px] font-black uppercase tracking-[0.2em] italic shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]",
                  mentor.type === "top" ? "bg-primary text-white" : "bg-card text-primary"
                )}>
                  {mentor.badge}
                </div>
              )}
            </div>

            <div className="mb-8 relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-2 italic tracking-tight">{mentor.name}</h3>
              <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-6 italic">{mentor.role}</p>
              <p className="text-sm text-foreground/60 font-medium italic leading-relaxed line-clamp-3">
                "{mentor.bio}"
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-10 min-h-[48px] relative z-10">
              {mentor.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-background border-2 border-border/10 text-[10px] font-black text-foreground/40 uppercase tracking-widest italic group-hover:border-primary/30 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 relative z-10">
              <Button 
                onClick={() => handleBookSession(mentor.name)}
                className="flex-1 h-16 bg-primary text-white rounded-none font-black text-[10px] uppercase tracking-[0.3em] shadow-[8px_8px_0px_0px_#1A1A1A] dark:shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4 italic"
              >
                <Calendar className="size-5" />
                Book Rite
              </Button>
              <Button variant="outline" className="size-16 border-2 border-border bg-card rounded-none shadow-[6px_6px_0px_0px_#1A1A1A] dark:shadow-[6px_6px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center">
                <MessageCircle className="size-6 text-primary" />
              </Button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Pagination */}
      <motion.div {...FADE_UP} transition={{ delay: 0.5 }} className="mt-20 flex flex-col items-center">
        <Button variant="outline" className="h-16 px-12 border-4 border-border bg-card/60 rounded-none font-black text-xs uppercase tracking-[0.4em] italic shadow-[12px_12px_0px_0px_#1A1A1A] dark:shadow-[12px_12px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-6">
          Behold More Masters
          <ChevronDown className="size-5 text-primary" />
        </Button>
        <p className="mt-8 text-[11px] font-black text-foreground/20 uppercase tracking-[0.8em] italic">
          REVEALING 4 OF 2,482 NODES
        </p>
      </motion.div>

      {/* FAB: The Eternal Request */}
      <motion.button 
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        className="fixed bottom-12 right-12 size-24 bg-primary text-white rounded-none border-4 border-border shadow-[12px_12px_0px_0px_#1A1A1A] dark:shadow-[12px_12px_0px_0px_#000] flex items-center justify-center hover:shadow-none active:scale-95 transition-all z-50 group"
      >
        <Plus className="size-10" />
        <span className="absolute right-32 bg-card text-foreground px-8 py-4 font-black text-xs uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none italic border-4 border-border shadow-[8px_8px_0px_0px_#1A1A1A] dark:shadow-[8px_8px_0px_0px_#000]">
          Offer Wisdom
        </span>
      </motion.button>
    </div>
  );
};