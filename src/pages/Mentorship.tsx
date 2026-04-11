import { useState } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  MessageCircle, 
  Clock, 
  BookOpen,
  Heart,
  Filter,
  Zap,
  Activity,
  Cpu,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock data updated for Neo-Industrial theme
const mockRequests = [
  {
    id: 1,
    title: "PROTOCOL_QUERY: MACHINE_LEARNING_CAREER_PATH",
    description: "Seeking expert-level guidance on ML deployment protocols and career architectural shifts. Priority: High-load production insights.",
    author: "ALEX_THOMPSON",
    authorAvatar: "AT",
    graduationYear: "2025",
    category: "Technical Skills",
    tags: ["ML", "AI", "INFRASTRUCTURE"],
    timePosted: "2H_AGO",
    replies: 3,
    helpful: 5,
    status: "open"
  },
  {
    id: 2,
    title: "VENTURE_INIT: SAAS_ARCH_VALIDATION",
    description: "Requesting node relay for SaaS business architecture. Focusing on market validation and seed-round protocols.",
    author: "JESSICA_LEE",
    authorAvatar: "JL",
    graduationYear: "2023",
    category: "Entrepreneurship",
    tags: ["SAAS", "VENTURE", "CAPITAL"],
    timePosted: "24H_AGO",
    replies: 7,
    helpful: 12,
    status: "open"
  },
  {
    id: 3,
    title: "RELAY_SHIFT: ACADEMIA_TO_INDUSTRY_OPS",
    description: "Post-PhD transition protocol. Optimizing academic research nodes for industry engineering standards.",
    author: "DR_MICHAEL_ZHANG",
    authorAvatar: "MZ",
    graduationYear: "2019",
    category: "Career Transition",
    tags: ["PHD", "R&D", "INDUSTRY"],
    timePosted: "3D_AGO",
    replies: 5,
    helpful: 8,
    status: "answered"
  }
];

const categories = ["All", "Career Guidance", "Entrepreneurship", "Career Transition", "Technical Skills", "Networking"];

export const Mentorship = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockRequests);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    tags: ""
  });

  const filteredRequests = requests.filter(request => 
    selectedCategory === "All" || request.category === selectedCategory
  );

  const handleCreateRequest = () => {
    if (newRequest.title && newRequest.description && newRequest.category) {
      const request = {
        id: requests.length + 1,
        title: newRequest.title.toUpperCase(),
        description: newRequest.description,
        author: "USER_ADMIN",
        authorAvatar: "UA",
        graduationYear: "2020",
        category: newRequest.category,
        tags: newRequest.tags.split(',').map(tag => tag.trim().toUpperCase()).filter(tag => tag),
        timePosted: "SYNC_NOW",
        replies: 0,
        helpful: 0,
        status: "open" as const
      };
      
      setRequests(prev => [request, ...prev]);
      setNewRequest({ title: "", description: "", category: "", tags: "" });
      setIsNewRequestOpen(false);
      
      toast({ title: "TRANSMISSION_COMPLETE", description: "Knowledge relay request broadcasted." });
    }
  };

  const handleReply = (requestId: number) => {
    toast({ title: "RELAY_ACKNOWLEDGED", description: "Transmission bridge established." });
  };

  return (
    <div className="p-4 lg:p-10 space-y-10 mt-16 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Relay Board // AlumNet_OS</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none">
            Knowledge_Relays
          </h1>
        </div>
        
        <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          <DialogTrigger asChild>
            <IndustrialButton variant="safety" className="h-12 px-8">
              <Plus className="mr-2 size-4" /> BROADCAST_REQUEST
            </IndustrialButton>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-black border-foreground/20 rounded-none industrial-overlay">
            <DialogHeader className="border-b border-foreground/10 pb-6">
              <DialogTitle className="text-2xl font-display font-black uppercase tracking-tight">TRANSMISSION_PARAMETER_INIT</DialogTitle>
              <DialogDescription className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Configure knowledge relay parameters</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 pt-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-mono uppercase text-muted-foreground">TRANSMISSION_TITLE</label>
                 <Input 
                   value={newRequest.title}
                   onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                   className="h-12 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-xs uppercase"
                 />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-muted-foreground">KNOWLEDGE_SECTOR</label>
                <Select onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="h-12 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-xs uppercase">
                    <SelectValue placeholder="SELECT_SECTOR..." />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-foreground/10 text-xs font-mono uppercase">
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-mono uppercase text-muted-foreground">CORE_INTENT (DESCRIPTION)</label>
                 <textarea 
                   rows={4}
                   value={newRequest.description}
                   onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                   className="w-full p-4 rounded-none bg-foreground/[0.02] border border-foreground/10 font-mono text-xs uppercase focus:outline-none focus:ring-1 focus:ring-safety-orange"
                 />
              </div>

              <div className="flex gap-4 pt-4">
                <IndustrialButton variant="safety" onClick={handleCreateRequest} className="flex-1 h-12">
                  INITIALIZE_BROADCAST
                </IndustrialButton>
                <IndustrialButton variant="outline" onClick={() => setIsNewRequestOpen(false)} className="h-12 px-8">
                  ABORT
                </IndustrialButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active_Relays", val: requests.length, icon: BookOpen, color: "text-safety-orange" },
          { label: "Pending_Sync", val: requests.filter(r => r.status === "open").length, icon: Clock, color: "text-electric-blue" },
          { label: "Total_Transmissions", val: requests.reduce((sum, r) => sum + r.replies, 0), icon: Activity, color: "text-foreground" },
          { label: "Node_Helpfulness", val: requests.reduce((sum, r) => sum + r.helpful, 0), icon: Heart, color: "text-muted-foreground" }
        ].map((stat, i) => (
          <GlassCard key={i} className="p-6 border-foreground/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 size-1 bg-foreground/10" />
             <div className="flex items-center gap-4 mb-4">
                <div className="size-8 industrial-border flex items-center justify-center bg-foreground/5">
                   <stat.icon className={cn("size-4", stat.color)} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</span>
             </div>
             <p className="text-3xl font-display font-black tracking-tighter">{stat.val}</p>
          </GlassCard>
        ))}
      </div>

      {/* Filter System */}
      <GlassCard className="p-2 border-foreground/5 bg-foreground/[0.01]">
         <div className="flex flex-wrap items-center gap-2 p-2">
            <Filter className="size-3 text-muted-foreground ml-2" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 h-8 text-[9px] font-mono tracking-widest uppercase transition-all flex items-center gap-2",
                    selectedCategory === cat 
                      ? "bg-safety-orange text-black border border-safety-orange" 
                      : "bg-transparent border border-foreground/10 text-muted-foreground hover:border-foreground/30"
                  )}
                >
                  {cat === "All" ? <Zap className="size-3" /> : null}
                  {cat}
                </button>
              ))}
            </div>
         </div>
      </GlassCard>

      {/* Knowledge Requests */}
      <div className="grid gap-6">
        {filteredRequests.map((req) => (
          <GlassCard key={req.id} className="p-8 border-foreground/5 group hover:bg-foreground/[0.01] transition-colors relative">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-3">
                 <Avatar className="size-16 rounded-none border border-foreground/10 grayscale group-hover:grayscale-0 transition-all">
                    <AvatarFallback className="bg-foreground/5 font-display font-black">{req.authorAvatar}</AvatarFallback>
                 </Avatar>
                 <div className="text-center">
                    <p className="text-[9px] font-mono font-bold">{req.author}</p>
                    <p className="text-[8px] font-mono text-muted-foreground uppercase mt-1">CLASS_{req.graduationYear}</p>
                 </div>
              </div>
              
              <div className="flex-1">
                 <div className="flex flex-wrap items-center gap-3 mb-4">
                    <StatusBadge status={req.status === "open" ? "online" : "offline"} text={req.status === "open" ? "ACTIVE_RELAY" : "SESSION_CLOSED"} />
                    <span className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase">/ SECTOR: {req.category}</span>
                    <div className="flex-1 h-px bg-foreground/5 md:block hidden" />
                    <span className="text-[9px] font-mono text-muted-foreground uppercase">{req.timePosted}</span>
                 </div>
                 
                 <h3 className="text-xl font-display font-black uppercase tracking-tight mb-4 group-hover:text-safety-orange transition-colors">{req.title}</h3>
                 <p className="text-sm font-mono text-muted-foreground leading-relaxed uppercase tracking-tighter mb-6">
                    {req.description}
                 </p>
                 
                 <div className="flex flex-wrap gap-2 mb-8">
                    {req.tags.map((tag, idx) => (
                       <span key={idx} className="px-2 py-1 bg-foreground/5 border border-foreground/10 text-[8px] font-mono text-muted-foreground uppercase">{tag}</span>
                    ))}
                 </div>

                 <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-foreground/5">
                    <div className="flex items-center gap-8">
                       <div className="flex items-center gap-2">
                          <MessageCircle className="size-3 text-muted-foreground" />
                          <span className="text-[10px] font-mono text-muted-foreground font-bold">{req.replies} RESPONSES</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Heart className="size-3 text-muted-foreground" />
                          <span className="text-[10px] font-mono text-muted-foreground font-bold">{req.helpful} NODE_UPVOTES</span>
                       </div>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                       <IndustrialButton variant="outline" className="h-10 px-8 flex-1 md:flex-none uppercase text-[9px] font-mono tracking-widest">
                          <Share2 className="mr-2 size-3" /> EXPORT
                       </IndustrialButton>
                       <IndustrialButton 
                         variant={req.status === "open" ? "safety" : "outline"}
                         onClick={() => handleReply(req.id)}
                         className="h-10 px-10 flex-1 md:flex-none uppercase text-[9px] font-mono tracking-widest"
                       >
                         <Zap className="mr-2 size-3" /> ESTABLISH_BRIDGE
                       </IndustrialButton>
                    </div>
                 </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="h-96 border border-dashed border-foreground/10 flex flex-col items-center justify-center gap-6">
           <Zap className="size-12 text-muted-foreground/10" />
           <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.4em]">Zero Knowledge Nodes Detected In Filter</p>
           <IndustrialButton variant="outline" onClick={() => setSelectedCategory("All")} className="px-12 h-12">
              RESET_FILTER_PROTOCOL
           </IndustrialButton>
        </div>
      )}
    </div>
  );
};