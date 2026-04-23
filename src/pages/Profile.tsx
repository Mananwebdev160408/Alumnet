import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
        title: "Connection Error",
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
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update Failure:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Unable to save profile changes.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-primary text-3xl">refresh</span>
        </div>
        <p className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">Synchronizing Identity...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero Header Section */}
      <section className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-[#c7c4d8]/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex flex-col md:flex-row items-center md:items-end gap-10 relative">
          <div className="relative group">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] overflow-hidden shadow-2xl ring-8 ring-white">
              <div className="w-full h-full bg-surface-container flex items-center justify-center text-4xl font-black text-on-surface-variant">
                {profileData.name?.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary-container text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
               <span className="material-symbols-outlined">photo_camera</span>
            </button>
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-[10px] font-black uppercase text-primary tracking-widest">
                Verified Member
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-on-surface tracking-tighter leading-none">
                {profileData.name || "Alumni Member"}
              </h1>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
               <div className="flex items-center gap-2 text-on-surface-variant font-bold text-sm opacity-60">
                 <span className="material-symbols-outlined text-lg">school</span>
                 {profileData.college || "University"}
               </div>
               <div className="flex items-center gap-2 text-on-surface-variant font-bold text-sm opacity-60">
                 <span className="material-symbols-outlined text-lg">location_on</span>
                 {profileData.location || "Earth"}
               </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={isEditing ? () => setIsEditing(false) : () => setIsEditing(true)}
               className={cn(
                 "flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95",
                 isEditing ? "bg-surface-container text-on-surface-variant" : "bg-primary-container text-white shadow-primary-container/20"
               )}
             >
               <span className="material-symbols-outlined">{isEditing ? "close" : "edit"}</span>
               {isEditing ? "Cancel" : "Edit Profile"}
             </button>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-[#c7c4d8]/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-[#c7c4d8]/10 pb-4">
               <span className="material-symbols-outlined text-primary-container">person</span>
               <h3 className="text-lg font-black text-on-surface uppercase tracking-tight">Professional Profile</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Full Name</label>
                 <input 
                   disabled={!isEditing}
                   value={profileData.name}
                   onChange={(e) => handleChange("name", e.target.value)}
                   className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-60" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Department / Branch</label>
                 <input 
                   disabled={!isEditing}
                   value={profileData.branch}
                   onChange={(e) => handleChange("branch", e.target.value)}
                   className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-60" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Current Role</label>
                 <input 
                   disabled={!isEditing}
                   value={profileData.occupation}
                   onChange={(e) => handleChange("occupation", e.target.value)}
                   className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-60" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Company / University</label>
                 <input 
                   disabled={!isEditing}
                   value={profileData.company}
                   onChange={(e) => handleChange("company", e.target.value)}
                   className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-60" 
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">About You</label>
               <textarea 
                 disabled={!isEditing}
                 value={profileData.description}
                 onChange={(e) => handleChange("description", e.target.value)}
                 rows={4}
                 className="w-full bg-surface-container-low border-none rounded-2xl p-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all resize-none disabled:opacity-60 no-scrollbar" 
               />
            </div>

            {isEditing && (
              <div className="pt-4">
                 <button 
                   onClick={handleSave} 
                   disabled={saving} 
                   className="w-full bg-primary-container text-white py-4 rounded-2xl font-black shadow-lg shadow-primary-container/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3"
                 >
                    {saving ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span className="material-symbols-outlined">save</span>}
                    Commit Changes
                 </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Controls Area */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-[#c7c4d8]/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-[#c7c4d8]/10 pb-4">
               <span className="material-symbols-outlined text-primary-container">link</span>
               <h3 className="text-lg font-black text-on-surface uppercase tracking-tight">Social Connect</h3>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Official Email</label>
                 <div className="w-full bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium opacity-50 flex items-center gap-3">
                   <span className="material-symbols-outlined text-sm">mail</span>
                   {profileData.email}
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">LinkedIn Profile</label>
                 <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 text-lg">link</span>
                    <input 
                      disabled={!isEditing}
                      value={profileData.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                      placeholder="linkedin.com/in/..."
                      className="w-full bg-surface-container-low border-none rounded-2xl py-3 pl-12 pr-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-60" 
                    />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant/40 ml-1 tracking-widest">Portfolio / Site</label>
                 <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 text-lg">language</span>
                    <input 
                      disabled={!isEditing}
                      value={profileData.personalwebsite}
                      onChange={(e) => handleChange("personalwebsite", e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-surface-container-low border-none rounded-2xl py-3 pl-12 pr-5 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-60" 
                    />
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-surface-container p-8 rounded-[2.5rem] space-y-6">
             <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant/60">lock</span>
                <h4 className="text-xs font-black uppercase text-on-surface-variant/60 tracking-widest">Privacy Controls</h4>
             </div>
             <p className="text-xs font-medium text-on-surface-variant opacity-70 leading-relaxed">
               Your profile visibility is currently set to <span className="font-black text-primary">Institution Only</span>. Change this in application settings.
             </p>
             <Link to="/settings" className="block">
               <button className="w-full py-3 bg-white rounded-2xl text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all border border-[#c7c4d8]/10 shadow-sm">
                 Security Hub
               </button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};