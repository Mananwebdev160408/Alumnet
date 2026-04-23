import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
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
      if (id) {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ _id: docSnap.id, ...docSnap.data() } as Alumni);
        }
      }

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
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-primary text-3xl">refresh</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Synchronizing Identity...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
         <div className="bg-surface-container-lowest p-12 rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-xl text-center max-w-md space-y-6">
            <div className="w-20 h-20 bg-error/5 rounded-[2rem] flex items-center justify-center mx-auto">
               <span className="material-symbols-outlined text-error text-4xl">person_off</span>
            </div>
            <h2 className="text-2xl font-black text-on-surface">Profile Not Found</h2>
            <p className="text-sm font-medium text-on-surface-variant opacity-70">The requested alumni profile could not be located in our current network registry.</p>
            <button 
              onClick={() => navigate("/directory")}
              className="w-full py-4 bg-primary-container text-white rounded-2xl font-black shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-98 transition-all"
            >
              Return to Directory
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface -mt-2">
      {/* Cover Header */}
      <div className="h-48 md:h-80 bg-surface-container-low relative overflow-hidden border-b border-[#c7c4d8]/10">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
         <div className="max-w-7xl mx-auto h-full relative px-6 md:px-10 py-10">
            <button 
              onClick={() => navigate("/directory")}
              className="px-6 py-2.5 bg-white/80 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-white hover:text-primary transition-all flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Network
            </button>
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-10 -mt-24 relative z-10 pb-20">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Profile Content */}
          <div className="lg:col-span-8 space-y-10">
             <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
                <div className="relative group">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white bg-surface-container flex items-center justify-center text-5xl font-black text-on-surface-variant">
                    {profile.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-lg font-bold">verified</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left space-y-3 pb-2">
                   <h1 className="text-4xl md:text-6xl font-black text-on-surface tracking-tighter leading-none">
                      {profile.name}
                   </h1>
                   <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                      <p className="text-xl font-bold text-primary-container">
                        {profile.occupation}
                      </p>
                      <span className="text-on-surface-variant opacity-40 font-black">@</span>
                      <p className="text-xl font-bold text-on-surface opacity-80">
                        {profile.company || "Independent"}
                      </p>
                   </div>
                </div>
             </div>

             {/* Action Center */}
             <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 border border-[#c7c4d8]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex gap-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Graduation</p>
                      <p className="text-base font-black text-on-surface underline decoration-primary decoration-4 underline-offset-4">Class of {profile.graduationYear || '2024'}</p>
                   </div>
                   <div className="w-px h-10 bg-[#c7c4d8]/20 hidden md:block" />
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Branch</p>
                      <p className="text-base font-black text-on-surface italic">{profile.branch || 'General'}</p>
                   </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                   <button className="flex-1 md:flex-none px-8 py-3.5 bg-surface-container rounded-2xl font-black text-sm text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">chat</span>
                      Message
                   </button>
                   <button className="flex-1 md:flex-none px-8 py-3.5 bg-primary-container text-white rounded-2xl font-black text-sm shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                      Mentorship
                   </button>
                </div>
             </div>

             {/* Bio and Timeline */}
             <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <h3 className="text-sm font-black text-on-surface uppercase tracking-widest flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary-container">description</span>
                      Alumni Bio
                   </h3>
                   <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm">
                      <p className="text-sm leading-relaxed text-on-surface-variant font-medium opacity-80 italic">
                         "{profile.bio || "This alumni hasn't added a bio yet. Look at their professional profile for more details."}"
                      </p>
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-sm font-black text-on-surface uppercase tracking-widest flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary-container">history</span>
                      Timeline
                   </h3>
                   <div className="space-y-6 pl-4 border-l-4 border-primary/10 py-2">
                      <div className="relative pl-6">
                         <div className="absolute -left-[14px] top-1 w-3 h-3 bg-primary rounded-full ring-4 ring-white shadow-sm"></div>
                         <p className="text-[10px] font-black text-primary-container uppercase tracking-tighter">Current Role</p>
                         <h4 className="text-sm font-black text-on-surface">{profile.occupation}</h4>
                         <p className="text-xs font-bold text-on-surface-variant opacity-60 uppercase">{profile.company}</p>
                      </div>
                      <div className="relative pl-6">
                         <div className="absolute -left-[14px] top-1 w-3 h-3 bg-surface-container-high rounded-full ring-4 ring-white shadow-sm"></div>
                         <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-tighter">Graduation</p>
                         <h4 className="text-sm font-black text-on-surface">Institutional Member</h4>
                         <p className="text-xs font-bold text-on-surface-variant opacity-60 uppercase">Class of {profile.graduationYear}</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
             {/* Contact Info */}
             <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 border border-[#c7c4d8]/10 shadow-sm space-y-6">
                <h3 className="text-sm font-black text-on-surface uppercase tracking-widest">Connect</h3>
                <div className="space-y-2">
                   <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl group cursor-pointer hover:bg-primary/5 transition-all decoration-primary underline-offset-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                         <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">mail</span>
                         <span className="text-xs font-bold text-on-surface truncate pr-2">{profile.email}</span>
                      </div>
                      <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-all">open_in_new</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl group cursor-pointer hover:bg-primary/5 transition-all">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">language</span>
                         <span className="text-xs font-bold text-on-surface">Digital Portfolio</span>
                      </div>
                      <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-all">open_in_new</span>
                   </div>
                </div>
             </div>

             {/* Similar Nodes */}
             <div className="space-y-6">
                <h3 className="text-sm font-black text-on-surface uppercase tracking-widest">Discover Network</h3>
                <div className="space-y-4">
                   {mockAlumni.map((alumni) => (
                      <div 
                        key={alumni._id} 
                        onClick={() => navigate(`/alumni/${alumni._id}`)}
                        className="bg-surface-container-lowest p-5 rounded-[1.5rem] border border-[#c7c4d8]/10 flex items-center gap-4 group cursor-pointer hover:shadow-lg transition-all"
                      >
                         <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-xs font-black text-on-surface-variant shadow-inner">
                           {alumni.name?.slice(0, 2).toUpperCase()}
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-on-surface truncate group-hover:text-primary transition-colors">{alumni.name}</p>
                            <p className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase truncate">{alumni.occupation}</p>
                         </div>
                         <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_right_alt</span>
                      </div>
                   ))}
                   <Link to="/directory" className="block">
                      <button className="w-full py-3.5 bg-surface-container-low text-primary text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-white transition-all">
                        Full Network Directory
                      </button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlumniProfilePage;