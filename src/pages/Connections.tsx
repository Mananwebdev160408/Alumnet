import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock data updated for Stitch theme
const mockConnections = [
  {
    id: 1,
    name: "Sarah Johnson",
    nodeId: "AL-102",
    occupation: "Software Engineer at Google",
    graduationYear: "2019",
    avatar: "SJ",
    connectionDate: "14 days ago",
    mutualConnections: 5,
    status: "Active"
  },
  {
    id: 2,
    name: "Mike Chen",
    nodeId: "AL-405",
    occupation: "Product Manager at Meta",
    graduationYear: "2018", 
    avatar: "MC",
    connectionDate: "30 days ago",
    mutualConnections: 3,
    status: "Active"
  },
  {
    id: 3,
    name: "Emma Wilson",
    nodeId: "AL-901",
    occupation: "Data Scientist at Netflix",
    graduationYear: "2020",
    avatar: "EW",
    connectionDate: "3 days ago",
    mutualConnections: 7,
    status: "Active"
  }
];

const mockPendingRequests = [
  {
    id: 4,
    name: "David Rodriguez",
    nodeId: "ST-708",
    occupation: "UX Designer at Apple",
    graduationYear: "2017",
    avatar: "DR",
    requestDate: "48h ago",
    mutualConnections: 2,
    type: "sent"
  },
  {
    id: 5,
    name: "Lisa Zhang", 
    nodeId: "AL-211",
    occupation: "Marketing Manager at Spotify",
    graduationYear: "2021",
    avatar: "LZ",
    requestDate: "24h ago",
    mutualConnections: 4,
    type: "received"
  },
  {
    id: 6,
    name: "Alex Thompson",
    nodeId: "ST-552",
    occupation: "Technical Intern",
    graduationYear: "2025",
    avatar: "AT", 
    requestDate: "5h ago",
    mutualConnections: 1,
    type: "received"
  }
];

export const Connections = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState(mockConnections);
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [activeTab, setActiveTab] = useState("established");

  const handleAcceptRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      setConnections(prev => [...prev, {
        ...request,
        connectionDate: "Just now",
        status: "Active"
      }]);
      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
      toast({ title: "Connection Established", description: `${request.name} is now in your network.` });
    }
  };

  const handleDeclineRequest = (requestId: number) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    toast({ variant: "destructive", title: "Request Declined", description: "The connection request has been removed." });
  };

  const handleWithdrawRequest = (requestId: number) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    toast({ title: "Request Withdrawn", description: "Your connection request was cancelled." });
  };

  const receivedRequests = pendingRequests.filter(r => r.type === "received");
  const sentRequests = pendingRequests.filter(r => r.type === "sent");

  return (
    <div className="space-y-10">
      {/* Network Header */}
      <section className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
           <h1 className="text-3xl font-black text-on-surface tracking-tight">Network Map</h1>
           <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">AlumNet Collaborative Ecosystem</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Network Load</p>
              <p className="text-sm font-black text-primary">High Fidelity</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container text-2xl font-black">hub</span>
           </div>
        </div>
      </section>

      {/* Analytics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Established Nodes", val: connections.length, color: "text-primary", icon: "group", trend: "STABLE" },
          { label: "Incoming Requests", val: receivedRequests.length, color: "text-secondary", icon: "inbox", trend: "PENDING" },
          { label: "Transmitted Relays", val: sentRequests.length, color: "text-on-surface-variant", icon: "send", trend: "ACTIVE" }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm group hover:border-primary/20 transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                   <span className={cn("material-symbols-outlined text-2xl", stat.color)}>{stat.icon}</span>
                </div>
                <span className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-widest">{stat.trend}</span>
             </div>
             <div className="space-y-1">
                <h3 className="text-4xl font-black text-on-surface tracking-tighter leading-none">{stat.val}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">{stat.label}</p>
             </div>
          </div>
        ))}
      </section>

      {/* Main Connection Interface */}
      <section className="space-y-8">
        <div className="flex bg-surface-container-low p-1.5 rounded-[1.5rem] w-fit">
           <button 
             onClick={() => setActiveTab("established")}
             className={cn(
               "px-8 py-3 rounded-[1.25rem] text-sm font-black transition-all",
               activeTab === "established" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant opacity-60 hover:opacity-100"
             )}
           >
             Established ({connections.length})
           </button>
           <button 
             onClick={() => setActiveTab("requests")}
             className={cn(
               "px-8 py-3 rounded-[1.25rem] text-sm font-black transition-all",
               activeTab === "requests" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant opacity-60 hover:opacity-100"
             )}
           >
             Requests ({receivedRequests.length + sentRequests.length})
           </button>
        </div>

        {activeTab === "established" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {connections.map((node) => (
               <div key={node.id} className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-[#c7c4d8]/10 shadow-sm group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-bl-xl opacity-30 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-center gap-6 mb-8">
                     <div className="w-16 h-16 rounded-[1.5rem] bg-surface-container-low flex items-center justify-center text-xl font-black text-on-surface-variant shadow-inner group-hover:scale-110 transition-transform">
                        {node.avatar}
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-black text-on-surface truncate tracking-tight">{node.name}</h4>
                        <p className="text-[10px] font-black text-primary-container uppercase tracking-widest mb-1 italic">Class of {node.graduationYear}</p>
                        <div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-50 w-fit rounded-full">
                           <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                           <span className="text-[9px] font-black text-emerald-600 uppercase">Synchronized</span>
                        </div>
                     </div>
                  </div>

                  <p className="text-xs font-medium text-on-surface-variant opacity-70 h-10 mb-8 line-clamp-2 leading-relaxed">
                     {node.occupation}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                     <button className="py-3 bg-surface-container-low rounded-xl text-[10px] font-black uppercase text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">chat</span>
                        Message
                     </button>
                     <button className="py-3 bg-surface-container-low rounded-xl text-[10px] font-black uppercase text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">person</span>
                        Profile
                     </button>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Incoming Requests */}
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <h3 className="text-xs font-black text-on-surface uppercase tracking-[0.2em]">Incoming Portals</h3>
                  <div className="flex-1 h-px bg-[#c7c4d8]/20" />
               </div>
               <div className="space-y-4">
                  {receivedRequests.map((req) => (
                    <div key={req.id} className="bg-surface-container-lowest p-6 rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary/30 transition-all">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center text-sm font-black text-on-surface-variant shadow-inner">
                             {req.avatar}
                          </div>
                          <div>
                             <h4 className="font-black text-on-surface uppercase tracking-tight">{req.name}</h4>
                             <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                                {req.occupation} • {req.requestDate}
                             </p>
                          </div>
                       </div>
                       <div className="flex gap-2 w-full md:w-auto">
                          <button onClick={() => handleAcceptRequest(req.id)} className="flex-1 md:flex-none h-11 px-6 bg-primary-container text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all">
                             Accept
                          </button>
                          <button onClick={() => handleDeclineRequest(req.id)} className="h-11 px-4 bg-surface-container text-on-surface-variant rounded-xl hover:bg-error/5 hover:text-error transition-all">
                             <span className="material-symbols-outlined text-sm font-black">close</span>
                          </button>
                       </div>
                    </div>
                  ))}
                  {receivedRequests.length === 0 && <p className="text-xs font-bold text-center py-12 text-on-surface-variant opacity-40 uppercase tracking-widest border-2 border-dashed border-[#c7c4d8]/20 rounded-[2rem]">No incoming requests</p>}
               </div>
            </div>

            {/* Outgoing Requests */}
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                  <h3 className="text-xs font-black text-on-surface uppercase tracking-[0.2em]">Outgoing Relays</h3>
                  <div className="flex-1 h-px bg-[#c7c4d8]/20" />
               </div>
               <div className="space-y-4">
                  {sentRequests.map((req) => (
                    <div key={req.id} className="bg-surface-container-low/30 p-6 rounded-[2rem] border border-[#c7c4d8]/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-80 hover:opacity-100 transition-opacity">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[10px] font-black text-on-surface-variant shadow-sm uppercase">
                             {req.avatar}
                          </div>
                          <div>
                             <h4 className="font-black text-on-surface/60 uppercase tracking-tight text-sm">{req.name}</h4>
                             <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">Sent {req.requestDate} • Pending Sync</p>
                          </div>
                       </div>
                       <button onClick={() => handleWithdrawRequest(req.id)} className="w-full md:w-auto px-6 py-2.5 bg-white border border-[#c7c4d8]/10 text-[10px] font-black uppercase text-on-surface-variant hover:text-error transition-all rounded-xl">
                          Withdraw
                       </button>
                    </div>
                  ))}
                  {sentRequests.length === 0 && <p className="text-xs font-bold text-center py-12 text-on-surface-variant opacity-40 uppercase tracking-widest border-2 border-dashed border-[#c7c4d8]/20 rounded-[2rem]">No outoing relays</p>}
               </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};