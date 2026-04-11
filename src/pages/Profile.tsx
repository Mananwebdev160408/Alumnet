import { useState, useEffect } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/lib/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Edit,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Save,
  X,
  User,
  Loader2,
  ShieldCheck,
  Zap,
  Globe,
  Settings,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const graduationYears = Array.from({ length: 50 }, (_, i) => 2024 - i);

export const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
    email: "",
    graduationYear: "",
    branch: "",
    occupation: "",
    company: "",
    location: "",
    description: "",
    linkedin: "",
    personalwebsite: "",
    role: "",
    college: "",
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchCurrentUser(currentUser.uid);
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchCurrentUser = async (uid: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setProfileData({
          id: userData.uid || "",
          name: userData.name || "",
          email: userData.email || "",
          graduationYear: userData.graduationYear?.toString() || "",
          branch: userData.branch || "",
          occupation: userData.occupation || "",
          company: userData.company || "",
          location: userData.location || "",
          description: userData.description || "",
          linkedin: userData.linkedin || "",
          personalwebsite: userData.personalwebsite || "",
          role: userData.role || "",
          college: userData.college || "",
        });
      }
    } catch (error: any) {
      console.error('Sync Failure:', error);
      toast({
        variant: "destructive",
        title: "Link Error",
        description: "Failed to synchronize profile data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;
    try {
      setSaving(true);
      const updateData = {
        name: profileData.name,
        graduationYear: parseInt(profileData.graduationYear) || profileData.graduationYear,
        branch: profileData.branch,
        occupation: profileData.occupation,
        company: profileData.company,
        location: profileData.location,
        description: profileData.description,
        linkedin: profileData.linkedin,
        personalwebsite: profileData.personalwebsite,
        college: profileData.college,
      };

      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, updateData);

      toast({
        title: "Protocol Update Successful",
        description: "Your operational profile has been updated.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update Failure:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Protocol update aborted due to connection error.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <Zap className="size-8 text-safety-orange animate-pulse" />
        <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Syncing Identity Node...</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-8 mt-16 max-w-[1200px] mx-auto">
      {/* Header / Identity Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-foreground/10 pb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative group">
            <Avatar className="size-32 md:size-40 rounded-none border-2 border-foreground/5 shadow-2xl transition-all grayscale group-hover:grayscale-0">
               <AvatarFallback className="bg-foreground/5 text-4xl font-display font-black">
                 {profileData.name?.slice(0,2)}
               </AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-2 -right-2 p-2 bg-safety-orange text-black industrial-border opacity-0 group-hover:opacity-100 transition-opacity">
               <Edit className="size-4" />
            </button>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
               <ShieldCheck className="size-4 text-safety-orange" />
               <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Active_Asset Status</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none">
               {profileData.name || "UNNAMED_NODE"}
            </h1>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mt-4">
               ID: {currentUser?.uid.slice(0, 12)}... // ROLE: {profileData.role || "MEMBER"}
            </p>
          </div>
        </div>
        
        <IndustrialButton 
          variant={isEditing ? "outline" : "safety"} 
          onClick={isEditing ? () => setIsEditing(false) : () => setIsEditing(true)}
          className="h-12 px-8"
        >
          {isEditing ? <><X className="mr-2 size-4" /> Abort</> : <><Edit className="mr-2 size-4" /> Edit Profile</>}
        </IndustrialButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-8">
          <GlassCard className="p-6 md:p-10 border-foreground/5">
             <div className="flex items-center gap-3 mb-8">
                <Database className="size-4 text-safety-orange" />
                <h3 className="text-sm font-display font-bold uppercase tracking-widest">Protocol Attributes</h3>
             </div>
             
             <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Full Designation</label>
                      <Input 
                        disabled={!isEditing}
                        value={profileData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="h-12 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-sm placeholder:text-muted-foreground focus-visible:ring-safety-orange"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Sector / Branch</label>
                      <Input 
                        disabled={!isEditing}
                        value={profileData.branch}
                        onChange={(e) => handleChange("branch", e.target.value)}
                        className="h-12 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-sm focus-visible:ring-safety-orange"
                      />
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Operational Role</label>
                      <Input 
                        disabled={!isEditing}
                        value={profileData.occupation}
                        onChange={(e) => handleChange("occupation", e.target.value)}
                        className="h-12 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-sm focus-visible:ring-safety-orange"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Primary Collective (Company)</label>
                      <Input 
                        disabled={!isEditing}
                        value={profileData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        className="h-12 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-sm focus-visible:ring-safety-orange"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Unit_Bio (Description)</label>
                   <textarea 
                     disabled={!isEditing}
                     value={profileData.description}
                     onChange={(e) => handleChange("description", e.target.value)}
                     rows={4}
                     className="w-full p-4 rounded-none bg-foreground/[0.02] border border-foreground/10 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-safety-orange resize-none"
                   />
                </div>
                
                {isEditing && (
                  <div className="flex justify-end pt-4">
                     <IndustrialButton variant="safety" onClick={handleSave} disabled={saving} className="h-12 px-12">
                        {saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
                        Commit Changes
                     </IndustrialButton>
                  </div>
                )}
             </div>
          </GlassCard>
        </div>

        {/* Sidebar / Secondary Nodes */}
        <div className="lg:col-span-4 space-y-8">
           <div className="space-y-4">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.3em] flex items-center gap-2">
                 <Globe className="size-3 text-electric-blue" />
                 Relay Links
              </h3>
              <GlassCard className="p-0 border-foreground/5 bg-foreground/[0.01]">
                 <div className="p-6 space-y-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Primary Node (Email)</label>
                       <Input 
                         disabled
                         value={profileData.email}
                         className="h-10 rounded-none bg-foreground/5 border-transparent font-mono text-xs opacity-50"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Synapse Link (LinkedIn)</label>
                       <Input 
                         disabled={!isEditing}
                         value={profileData.linkedin}
                         onChange={(e) => handleChange("linkedin", e.target.value)}
                         placeholder="linkedin.com/in/..."
                         className="h-10 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-xs focus-visible:ring-electric-blue"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">External Terminal (Website)</label>
                       <Input 
                         disabled={!isEditing}
                         value={profileData.personalwebsite}
                         onChange={(e) => handleChange("personalwebsite", e.target.value)}
                         placeholder="https://..."
                         className="h-10 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-xs focus-visible:ring-electric-blue"
                       />
                    </div>
                 </div>
              </GlassCard>
           </div>

           <div className="p-6 border border-foreground/5 bg-foreground/[0.01] space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Settings className="size-3 text-muted-foreground" />
                 <h4 className="text-[10px] font-mono uppercase tracking-widest">Node Settings</h4>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground leading-relaxed uppercase">
                Privacy Protocol: <span className="text-foreground">STRICT</span>
                <br />
                Identity Visibility: <span className="text-foreground">INSTITUTION_ONLY</span>
              </p>
              <IndustrialButton variant="outline" className="w-full text-[9px] uppercase font-mono tracking-widest h-10 mt-2">
                 Advanced Configuration
              </IndustrialButton>
           </div>
        </div>
      </div>
    </div>
  );
};