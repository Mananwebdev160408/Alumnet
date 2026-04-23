import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowRight, 
  Mail, 
  Sparkles,
  Flower,
  LayoutGrid,
  List as ListIcon,
  RefreshCw,
  Building2,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export const Directory = () => {
  const [alumniData, setAlumniData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    industry: "All Industries",
    expertise: "All Expertise",
    company: "All Companies",
  });

  const fetchAlumni = async () => {
    setIsLoading(true);
    try {
      const usersCol = collection(db, "users");
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
      setAlumniData(userList);
    } catch (error) {
      console.error("Error fetching alumni data:", error);
      toast({
        variant: "destructive",
        title: "Link Failure",
        description: "Could not synchronize with the global directory node.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const filteredAlumni = useMemo(() => {
    return alumniData.filter((person) => {
      const matchesSearch =
        person.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.occupation?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [alumniData, searchQuery]);

  return (
    <div className="space-y-16 font-serif pb-20">
      {/* Hero & Filter Section */}
      <motion.section {...FADE_UP} className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-border pb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="size-6 bg-primary rotate-45 shadow-[2px_2px_0px_0px_#000]" />
              <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase italic">Global Lineage</span>
            </div>
            <h2 className="text-5xl font-bold tracking-tighter text-foreground italic">Alumni Directory</h2>
            <p className="text-foreground/60 text-lg leading-relaxed italic border-l-4 border-primary/20 pl-6">
              Connect with over 15,000 graduates across the globe. Traverse the paths of expertise, organization, and wisdom.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <Button 
               variant="ghost" 
               onClick={() => setViewMode("grid")}
               className={cn("size-12 rounded-none border-2 border-border shadow-[4px_4px_0px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_0px_#000] hover:bg-primary hover:text-white transition-all", viewMode === "grid" && "bg-primary text-white shadow-none translate-x-0.5 translate-y-0.5")}
             >
               <LayoutGrid className="size-5" />
             </Button>
             <Button 
               variant="ghost" 
               onClick={() => setViewMode("list")}
               className={cn("size-12 rounded-none border-2 border-border shadow-[4px_4px_0px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_0px_#000] hover:bg-primary hover:text-white transition-all", viewMode === "list" && "bg-primary text-white shadow-none translate-x-0.5 translate-y-0.5")}
             >
               <ListIcon className="size-5" />
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-end">
          {/* Search Bar */}
          <div className="xl:col-span-5 relative group">
            <label className="text-[10px] font-black uppercase text-foreground/40 ml-2 mb-3 block tracking-[0.3em] italic">Search the Records</label>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-foreground/30 group-focus-within:text-primary transition-colors" />
              <input 
                className="w-full bg-card/50 border-4 border-border rounded-none pl-16 pr-8 py-5 text-base font-bold focus:ring-0 focus:border-primary transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] placeholder:text-foreground/20 italic" 
                placeholder="Search alumni, skills, or institutions..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="xl:col-span-7 flex flex-wrap gap-6">
            {[
              { label: "Industry", value: filters.industry },
              { label: "Expertise", value: filters.expertise },
              { label: "Company", value: filters.company }
            ].map((f, i) => (
              <div key={i} className="flex-1 min-w-[160px] space-y-3">
                <label className="text-[10px] font-black uppercase text-foreground/40 ml-2 block tracking-[0.3em] italic">{f.label}</label>
                <Button variant="outline" className="w-full h-16 border-2 border-border bg-card/40 rounded-none flex items-center justify-between px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  <span className="text-xs font-bold uppercase tracking-widest truncate">{f.value}</span>
                  <ChevronDown className="size-4 text-primary" />
                </Button>
              </div>
            ))}
            <Button 
              variant="ghost"
              className="h-16 px-6 text-primary hover:text-primary hover:bg-primary/5 font-black text-[10px] uppercase tracking-[0.3em] italic"
              onClick={() => setSearchQuery("")}
            >
              <RefreshCw className="size-4 mr-3" />
              Reset Path
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Directory Content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="japanese-card bg-card/20 h-96 animate-pulse border-2 border-border/20 shadow-none"></div>
            ))}
          </motion.div>
        ) : (
          <motion.section 
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" 
              : "space-y-6"
            }
          >
            {filteredAlumni.map((person, i) => (
              viewMode === "grid" ? (
                <motion.div 
                  key={person._id} 
                  {...FADE_UP}
                  transition={{ delay: i * 0.05 }}
                  className="group japanese-card bg-card/60 p-8 hover:translate-y-[-8px] transition-all duration-500 border-2 border-border/10 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="relative size-20">
                      <div className="absolute inset-0 border-2 border-border rotate-45 bg-primary/5 group-hover:rotate-[225deg] transition-transform duration-1000" />
                      <div className="absolute inset-2 border-2 border-border overflow-hidden bg-card z-10 rotate-3 group-hover:rotate-0 transition-transform">
                        <img 
                          alt={person.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                          src={person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=D43D61&color=fff&bold=true`} 
                        />
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary border-2 border-primary/20 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase italic">
                      Class of '{person.graduationYear?.toString().slice(-2) || "??"}'
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-8">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight italic">{person.name}</h3>
                    <p className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] italic flex items-center gap-2">
                      <Building2 className="size-3 text-primary" /> {person.occupation} @ {person.company || "Noble Institution"}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-10 min-h-[48px]">
                    {person.skills?.slice(0, 3).map((skill: string) => (
                       <span key={skill} className="text-[10px] border-2 border-border/10 bg-background px-3 py-1 font-black text-foreground/60 uppercase tracking-widest italic">{skill}</span>
                    )) || (
                      <span className="text-[10px] border-2 border-border/10 bg-background px-3 py-1 font-black text-foreground/60 uppercase tracking-widest italic">Artisan</span>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full h-16 bg-card border-2 border-border rounded-none font-black text-[10px] uppercase tracking-[0.4em] italic shadow-[6px_6px_0px_0px_#1A1A1A] dark:shadow-[6px_6px_0px_0px_#000] hover:bg-primary hover:text-white hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-4"
                    onClick={() => navigate(`/alumni/${person._id}`)}
                  >
                    Enter Link
                    <ArrowRight className="size-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  key={person._id}
                  {...FADE_UP}
                  className="group bg-card/40 border-4 border-border p-6 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-card/80 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center gap-8">
                    <div className="size-16 border-2 border-border grayscale group-hover:grayscale-0 transition-all rotate-3 group-hover:rotate-0 overflow-hidden">
                      <img className="w-full h-full object-cover" src={person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=D43D61&color=fff&bold=true`} alt={person.name} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold italic">{person.name}</h4>
                      <p className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] italic">
                        {person.occupation} at {person.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="hidden lg:block text-right">
                      <p className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.3em] mb-1 italic">Lineage Node</p>
                      <p className="text-xs font-bold uppercase tracking-widest">Class of {person.graduationYear}</p>
                    </div>
                    <Button 
                      className="size-14 bg-primary text-white rounded-none border-2 border-border shadow-[4px_4px_0px_0px_#1A1A1A] dark:shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                      onClick={() => navigate(`/alumni/${person._id}`)}
                    >
                      <ArrowRight className="size-5" />
                    </Button>
                  </div>
                </motion.div>
              )
            ))}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Recently Joined Section */}
      <motion.section {...FADE_UP} transition={{ delay: 0.3 }} className="space-y-10 pt-16">
        <div className="flex items-end justify-between border-b-2 border-border/20 pb-6 px-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-foreground italic flex items-center gap-4">
              Recently Joined <Sparkles className="size-5 text-primary" />
            </h2>
            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.4em] italic">New Kindred spirits in the network</p>
          </div>
          <Link to="#" className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:underline italic decoration-2 underline-offset-8">View All New Members</Link>
        </div>
        
        <div className="bg-card/40 border-4 border-border shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-foreground/5">
                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-foreground/60 italic">Kindred</th>
                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-foreground/60 italic">Institution</th>
                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-foreground/60 italic">Path</th>
                <th className="px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-foreground/60 italic text-right">Rite</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border/10">
              {filteredAlumni.slice(0, 4).map((person) => (
                <tr key={person._id} className="hover:bg-primary/5 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="size-12 border-2 border-border bg-card flex items-center justify-center font-bold text-primary group-hover:rotate-12 transition-all">
                        {person.name?.[0]}{person.name?.split(' ')[1]?.[0] || person.name?.[1]}
                      </div>
                      <div>
                        <p className="text-base font-bold text-foreground italic">{person.name}</p>
                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em]">Class of {person.graduationYear}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-foreground/70">{person.company || "N/A"}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 border-2 border-border/10 bg-background text-primary italic">
                      {person.occupation || "Seeker"}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <Button variant="ghost" size="icon" className="size-10 border-2 border-border rounded-none hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                      <Mail className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};