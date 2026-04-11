import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  MapPin,
  Mail,
  ExternalLink,
  Building,
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Briefcase,
  Globe,
  Plus
} from "lucide-react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Alumni = {
  _id: string;
  name?: string;
  occupation?: string;
  company?: string;
  profileImage?: string;
  graduationYear?: string;
  location?: string;
  email?: string;
  linkedin?: string;
  personalwebsite?: string;
  branch?: string;
  bio?: string;
};

const AlumniProfilePage = () => {
  const [mockAlumni, setMockAlumni] = useState<Alumni[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Alumni | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const datamanagement = async () => {
    setIsLoading(true);
    try {
      // Fetch current profile
      if (id) {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ _id: docSnap.id, ...docSnap.data() } as Alumni);
        }
      }

      // Fetch others for sidebar
      const usersCol = collection(db, "users");
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() })) as Alumni[];
      setMockAlumni(userList.filter(u => u._id !== id).slice(0, 3));
    } catch (error) {
      console.error("Sync Failure:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    datamanagement();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <Zap className="size-8 text-safety-orange animate-pulse" />
           <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Synchronizing Unit Node...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
         <GlassCard className="max-w-md text-center p-12">
            <h2 className="text-2xl font-display font-black uppercase mb-4">Node Not Found</h2>
            <p className="text-xs font-mono text-muted-foreground uppercase mb-8">The requested unit ID does not exist in the current institutional cluster.</p>
            <IndustrialButton variant="safety" onClick={() => navigate("/directory")}>Return to directory</IndustrialButton>
         </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background mt-16 pb-20">
      {/* Header / Cover Area */}
      <div className="h-48 md:h-64 bg-foreground/[0.03] border-b border-foreground/10 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--safety-orange)/0.03),transparent)]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
         <div className="max-w-7xl mx-auto h-full relative">
            <button 
              onClick={() => navigate("/directory")}
              className="absolute top-6 left-6 md:left-8 px-4 py-2 bg-background border border-foreground/10 text-[10px] font-mono uppercase tracking-widest hover:bg-foreground hover:text-background transition-all flex items-center gap-2"
            >
              <ArrowLeft className="size-3" />
              Directory_Back
            </button>
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Hero Profile Info */}
          <div className="lg:col-span-8 space-y-8">
             <div className="flex flex-col md:flex-row gap-8 items-end md:items-center">
                <Avatar className="size-40 md:size-48 rounded-none border-4 border-background shadow-2xl grayscale hover:grayscale-0 transition-all">
                  <AvatarFallback className="bg-foreground/5 text-4xl font-display font-black uppercase">
                    {profile.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3 pb-2">
                   <div className="flex items-center gap-4 flex-wrap">
                      <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase leading-none">
                        {profile.name}
                      </h1>
                      <StatusBadge status="verified" label="V_CERTIFIED_UNIT" />
                   </div>
                   <p className="text-xl font-mono text-muted-foreground uppercase">
                      {profile.occupation} @ <span className="text-foreground font-bold">{profile.company}</span>
                   </p>
                </div>
             </div>

             {/* Action Bar */}
             <GlassCard className="p-1 border-foreground/5 bg-foreground/[0.02]">
                <div className="flex flex-wrap items-center justify-between p-4 gap-4">
                  <div className="flex gap-4">
                     <div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase">Active Cluster</p>
                        <p className="text-xs font-mono font-bold uppercase">{profile.branch || 'GENERAL'}</p>
                     </div>
                     <div className="w-px h-8 bg-foreground/10" />
                     <div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase">Temporal Node</p>
                        <p className="text-xs font-mono font-bold uppercase">Batch_{profile.graduationYear}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <IndustrialButton variant="outline" size="sm">Message</IndustrialButton>
                     <IndustrialButton variant="safety" size="sm" className="px-6">Request Mentorship</IndustrialButton>
                  </div>
                </div>
             </GlassCard>

             {/* Content Tabs / Info */}
             <div className="grid md:grid-cols-2 gap-8">
                {/* About Section */}
                <div className="space-y-4">
                   <h3 className="text-[11px] font-mono uppercase tracking-[0.3em] flex items-center gap-2">
                      <User className="size-3 text-safety-orange" />
                      Unit_Profile
                   </h3>
                   <div className="p-6 border border-foreground/5 bg-foreground/[0.01]">
                      <p className="text-sm leading-relaxed text-muted-foreground font-light italic">
                         "{profile.bio || 'Initial profile synchronization pending. No bio data transmitted for this unit.'}"
                      </p>
                   </div>
                </div>

                {/* Professional Timeline */}
                <div className="space-y-4">
                   <h3 className="text-[11px] font-mono uppercase tracking-[0.3em] flex items-center gap-2">
                      <Clock className="size-3 text-electric-blue" />
                      Protocol_Timeline
                   </h3>
                   <div className="relative pl-6 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-foreground/10">
                      <div className="relative">
                         <div className="absolute -left-[27px] size-3 bg-electric-blue border-2 border-background" />
                         <p className="text-[10px] font-mono text-electric-blue uppercase mb-1">Current</p>
                         <h4 className="text-sm font-display font-bold uppercase">{profile.occupation}</h4>
                         <p className="text-[10px] font-mono text-muted-foreground uppercase">{profile.company}</p>
                      </div>
                      <div className="relative opacity-50">
                         <div className="absolute -left-[27px] size-3 bg-foreground/20 border-2 border-background" />
                         <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Batch_{profile.graduationYear}</p>
                         <h4 className="text-sm font-display font-bold uppercase">Institutional Member</h4>
                         <p className="text-[10px] font-mono text-muted-foreground uppercase">IIT Delhi</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Sidebar: Details & Peer Nodes */}
          <div className="lg:col-span-4 space-y-8">
             {/* Systematic Connect */}
             <div className="space-y-4">
               <h3 className="text-[11px] font-mono uppercase tracking-[0.3em]">Synapse_Relays</h3>
               <GlassCard className="p-0 border-foreground/5">
                  <div className="divide-y divide-foreground/5 font-mono">
                     <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-foreground/[0.02]">
                        <div className="flex items-center gap-3">
                           <Mail className="size-3.5 text-muted-foreground" />
                           <span className="text-[10px] uppercase truncate max-w-[150px]">{profile.email}</span>
                        </div>
                        <ExternalLink className="size-3 opacity-0 group-hover:opacity-100" />
                     </div>
                     <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-foreground/[0.02]">
                        <div className="flex items-center gap-3">
                           <Globe className="size-3.5 text-muted-foreground" />
                           <span className="text-[10px] uppercase">Node Website</span>
                        </div>
                        <ExternalLink className="size-3 opacity-0 group-hover:opacity-100" />
                     </div>
                  </div>
               </GlassCard>
             </div>

             {/* Peer Nodes */}
             <div className="space-y-4">
                <h3 className="text-[11px] font-mono uppercase tracking-[0.3em]">Similar_Nodes</h3>
                <div className="space-y-3">
                   {mockAlumni.map((alumni) => (
                      <div 
                        key={alumni._id} 
                        className="p-4 border border-foreground/5 bg-foreground/[0.01] flex items-center gap-4 group cursor-pointer hover:border-foreground/20 transition-all"
                        onClick={() => navigate(`/alumni/${alumni._id}`)}
                      >
                         <Avatar className="size-10 rounded-none border border-foreground/10 grayscale group-hover:grayscale-0">
                           <AvatarFallback className="text-[10px] font-mono font-bold">{alumni.name?.slice(0, 2)}</AvatarFallback>
                         </Avatar>
                         <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-display font-bold uppercase truncate">{alumni.name}</p>
                            <p className="text-[9px] font-mono text-muted-foreground uppercase truncate">{alumni.occupation}</p>
                         </div>
                         <ChevronRight className="size-3 text-muted-foreground group-hover:text-safety-orange transition-all" />
                      </div>
                   ))}
                   <IndustrialButton variant="ghost" className="w-full h-10 text-[9px] uppercase font-mono tracking-widest" onClick={() => navigate("/directory")}>
                      View Cluster Directory
                   </IndustrialButton>
                </div>
             </div>

             {/* Support Local Node */}
             <GlassCard className="p-6 border-safety-orange/20 bg-safety-orange/[0.02]">
                <h4 className="text-xs font-display font-black uppercase mb-2">Institutional Support</h4>
                <p className="text-[10px] font-mono text-muted-foreground leading-relaxed uppercase mb-4">
                  Establish a verified link with this alumni to receive career protocol blueprints.
                </p>
                <IndustrialButton variant="safety" className="w-full h-10">Request Endorsement</IndustrialButton>
             </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlumniProfilePage;