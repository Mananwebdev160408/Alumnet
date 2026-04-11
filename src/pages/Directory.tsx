import { useState, useMemo, useEffect } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  University,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Directory = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    graduationYear: "all",
    branch: "all",
    location: "all",
  });

  const fetchalumni = async () => {
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
    fetchalumni();
  }, []);

  const branchs = useMemo(
    () => Array.from(new Set(alumniData.map((person) => person.branch).filter(Boolean))),
    [alumniData]
  );
  
  const locations = useMemo(
    () => Array.from(new Set(alumniData.map((person) => person.location).filter(Boolean))),
    [alumniData]
  );

  const graduationYears = useMemo(() => {
    const years = Array.from(new Set(
      alumniData
        .map(person => String(person.graduationYear))
        .filter(year => year && year !== 'undefined' && year !== 'null')
    )).sort((a, b) => parseInt(b) - parseInt(a));
    return years;
  }, [alumniData]);

  const filteredAlumni = useMemo(() => {
    return alumniData.filter((person) => {
      const matchesSearch =
        person.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.occupation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.college?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesYear =
        filters.graduationYear === "all" ||
        String(person.graduationYear) === String(filters.graduationYear);
        
      const matchesbranch =
        filters.branch === "all" ||
        person.branch === filters.branch;
        
      const matchesLocation =
        filters.location === "all" ||
        person.location === filters.location;

      return matchesSearch && matchesYear && matchesbranch && matchesLocation;
    });
  }, [alumniData, searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      graduationYear: "all",
      branch: "all",
      location: "all",
    });
    setSearchQuery("");
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 mt-16 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Certified Alumni Infrastructure</p>
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-none">
            Node <span className="text-safety-orange">Directory</span>
          </h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mt-4">
             Connected Units: {filteredAlumni.length} // Filtered from {alumniData.length} Global Nodes
          </p>
        </div>
        <IndustrialButton variant="outline" onClick={fetchalumni} disabled={isLoading}>
          <Zap className={`mr-2 size-3 ${isLoading ? 'animate-pulse' : ''}`} />
          {isLoading ? 'Syncing...' : 'Resync Network'}
        </IndustrialButton>
      </div>

      {/* Filter Panel */}
      <GlassCard className="p-0 border-foreground/5 bg-foreground/[0.01]">
        <div className="p-4 lg:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-1 space-y-2">
             <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Search Query</label>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input 
                  placeholder="AGENT_NAME_OR_UID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-background border-foreground/10 font-mono text-xs rounded-none focus-visible:ring-safety-orange uppercase" 
                />
             </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Temporal Filter</label>
            <Select value={filters.graduationYear} onValueChange={(v) => setFilters(p => ({...p, graduationYear: v}))}>
              <SelectTrigger className="h-11 rounded-none border-foreground/10 font-mono text-xs bg-background uppercase">
                <SelectValue placeholder="YEAR_CYCLE" />
              </SelectTrigger>
              <SelectContent className="font-mono text-xs uppercase">
                <SelectItem value="all">ALL_CYCLES</SelectItem>
                {graduationYears.map(y => <SelectItem key={y} value={y}>{y}_BATCH</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Sector Filter</label>
            <Select value={filters.branch} onValueChange={(v) => setFilters(p => ({...p, branch: v}))}>
              <SelectTrigger className="h-11 rounded-none border-foreground/10 font-mono text-xs bg-background uppercase">
                <SelectValue placeholder="DEPARTMENT" />
              </SelectTrigger>
              <SelectContent className="font-mono text-xs uppercase">
                <SelectItem value="all">ALL_SECTORS</SelectItem>
                {branchs.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <IndustrialButton variant="ghost" onClick={clearFilters} className="h-11 border-dashed border-foreground/10 text-muted-foreground hover:text-foreground">
             <Filter className="mr-2 size-3" />
             Purge Filters
          </IndustrialButton>
        </div>
      </GlassCard>

      {/* Results Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-[4/5] border border-foreground/5 bg-foreground/[0.02] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAlumni.map((person) => (
            <GlassCard key={person._id} className="p-0 border-foreground/5 bg-foreground/[0.01] hover:border-foreground/20 transition-all group relative staggered-reveal">
               <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <Avatar className="size-16 rounded-none border border-foreground/10 grayscale group-hover:grayscale-0 transition-all">
                        <AvatarFallback className="bg-foreground/5 font-display font-bold text-lg uppercase">
                           {person.name?.slice(0, 2)}
                        </AvatarFallback>
                     </Avatar>
                     <StatusBadge status="verified" label="V_CERTIFIED" className="border-safety-orange/20 text-safety-orange" />
                  </div>

                  <div className="space-y-1 mb-6 min-h-[80px]">
                     <h3 className="text-xl font-display font-black tracking-tighter uppercase leading-none group-hover:text-safety-orange transition-colors">
                        {person.name}
                     </h3>
                     <p className="text-[11px] font-mono text-muted-foreground uppercase truncate">
                        {person.occupation} @ {person.company}
                     </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-0.5 border border-foreground/5 bg-foreground/5 text-[9px] font-mono tracking-widest uppercase text-muted-foreground flex items-center gap-1">
                       <GraduationCap className="size-2.5" />
                       {person.graduationYear}
                    </span>
                    <span className="px-2 py-0.5 border border-foreground/5 bg-foreground/5 text-[9px] font-mono tracking-widest uppercase text-muted-foreground flex items-center gap-1">
                       <MapPin className="size-2.5" />
                       {person.location?.split(',')[0]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                     <IndustrialButton 
                        variant="secondary" 
                        size="sm" 
                        className="h-9 border-foreground/5 hover:bg-foreground hover:text-background"
                        onClick={() => navigate(`/alumni/${person._id}`)}
                     >
                        View Unit
                     </IndustrialButton>
                     <IndustrialButton 
                        variant="safety" 
                        size="sm" 
                        className="h-9"
                     >
                        Connect
                     </IndustrialButton>
                  </div>
               </div>
               
               {/* Background detail */}
               <div className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-10 transition-opacity">
                  <span className="text-[10px] font-mono">ID_{person._id?.slice(-4)}</span>
               </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredAlumni.length === 0 && (
        <div className="py-40 text-center border border-dashed border-foreground/10 bg-foreground/[0.01]">
           <Users className="size-10 text-muted-foreground mx-auto mb-4 opacity-50" />
           <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-1">No Unit Symmetry Found</h3>
           <p className="text-xs font-mono text-muted-foreground uppercase opacity-70 mb-6">Purge filters or adjust search parameters to locate active nodes.</p>
           <IndustrialButton variant="outline" onClick={clearFilters}>Purge Protocol</IndustrialButton>
        </div>
      )}
    </div>
  );
};