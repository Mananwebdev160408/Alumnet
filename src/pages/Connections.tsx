import { useState } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCheck, 
  UserX, 
  Clock, 
  MessageCircle, 
  Mail, 
  CheckCircle,
  Zap,
  Activity,
  Layers,
  Network,
  Maximize2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock data updated for Neo-Industrial theme
const mockConnections = [
  {
    id: 1,
    name: "SARAH_JOHNSON",
    nodeId: "NODE_S102",
    occupation: "Software Engineer at Google",
    graduationYear: "2019",
    avatar: "SJ",
    connectionDate: "14D_AGO",
    mutualConnections: 5,
    status: "STABLE"
  },
  {
    id: 2,
    name: "MIKE_CHEN",
    nodeId: "NODE_M405",
    occupation: "Product Manager at Meta",
    graduationYear: "2018", 
    avatar: "MC",
    connectionDate: "30D_AGO",
    mutualConnections: 3,
    status: "STABLE"
  },
  {
    id: 3,
    name: "EMMA_WILSON",
    nodeId: "NODE_E901",
    occupation: "Data Scientist at Netflix",
    graduationYear: "2020",
    avatar: "EW",
    connectionDate: "3D_AGO",
    mutualConnections: 7,
    status: "STABLE"
  }
];

const mockPendingRequests = [
  {
    id: 4,
    name: "DAVID_RODRIGUEZ",
    nodeId: "NODE_D708",
    occupation: "UX Designer at Apple",
    graduationYear: "2017",
    avatar: "DR",
    requestDate: "48H_AGO",
    mutualConnections: 2,
    type: "sent"
  },
  {
    id: 5,
    name: "LISA_ZHANG", 
    nodeId: "NODE_L211",
    occupation: "Marketing Manager at Spotify",
    graduationYear: "2021",
    avatar: "LZ",
    requestDate: "24H_AGO",
    mutualConnections: 4,
    type: "received"
  },
  {
    id: 6,
    name: "ALEX_THOMPSON",
    nodeId: "NODE_A552",
    occupation: "Technical Intern",
    graduationYear: "2025",
    avatar: "AT", 
    requestDate: "5H_AGO",
    mutualConnections: 1,
    type: "received"
  }
];

export const Connections = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState(mockConnections);
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);

  const handleAcceptRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      setConnections(prev => [...prev, {
        ...request,
        connectionDate: "SYNC_NOW",
        status: "STABLE"
      }]);
      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
      toast({ title: "LINK_ESTABLISHED", description: `Node ${request.name} added to primary network.` });
    }
  };

  const handleDeclineRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    toast({ variant: "destructive", title: "PROTOCOL_DENIED", description: `Connection request from ${request?.name} aborted.` });
  };

  const handleWithdrawRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    toast({ title: "RELAY_WITHDRAWN", description: `Request to ${request?.name} cancelled.` });
  };

  const receivedRequests = pendingRequests.filter(r => r.type === "received");
  const sentRequests = pendingRequests.filter(r => r.type === "sent");

  return (
    <div className="p-4 lg:p-10 space-y-10 mt-16 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Network className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Network Map // AlumNet_OS</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none">
            My_Connections
          </h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Network Load</p>
              <p className="text-xl font-display font-bold">1.24 TB/s</p>
           </div>
           <div className="size-12 industrial-border flex items-center justify-center bg-foreground/5">
              <Activity className="size-5 text-safety-orange" />
           </div>
        </div>
      </div>

      {/* Grid: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-8 border-foreground/5 transition-all hover:border-safety-orange/30 group">
          <div className="flex justify-between items-start mb-6">
            <div className="size-10 bg-foreground/5 flex items-center justify-center industrial-border group-hover:bg-safety-orange/10 transition-colors">
              <UserCheck className="size-5 text-safety-orange" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">SYNC_STABLE</span>
          </div>
          <h3 className="text-4xl font-display font-black tracking-tighter">{connections.length}</h3>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Total_Established_Nodes</p>
        </GlassCard>

        <GlassCard className="p-8 border-foreground/5 transition-all hover:border-electric-blue/30 group">
          <div className="flex justify-between items-start mb-6">
            <div className="size-10 bg-foreground/5 flex items-center justify-center industrial-border group-hover:bg-electric-blue/10 transition-colors">
              <Clock className="size-5 text-electric-blue" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">PENDING_INPUT</span>
          </div>
          <h3 className="text-4xl font-display font-black tracking-tighter">{receivedRequests.length}</h3>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Incoming_Protocol_Requests</p>
        </GlassCard>

        <GlassCard className="p-8 border-foreground/5 transition-all hover:border-muted-foreground/30 group">
          <div className="flex justify-between items-start mb-6">
            <div className="size-10 bg-foreground/5 flex items-center justify-center industrial-border group-hover:bg-foreground/10 transition-colors">
              <Layers className="size-5 text-muted-foreground" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">ACTIVE_RELAY</span>
          </div>
          <h3 className="text-4xl font-display font-black tracking-tighter">{sentRequests.length}</h3>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Transmitted_Link_Requests</p>
        </GlassCard>
      </div>

      {/* Main Interface */}
      <Tabs defaultValue="established" className="space-y-8">
        <TabsList className="bg-transparent border-b border-foreground/10 w-full justify-start gap-8 h-12 p-0 rounded-none">
          <TabsTrigger 
            value="established" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-safety-orange data-[state=active]:bg-transparent text-[11px] font-mono uppercase tracking-widest px-0 h-10 transition-all hover:text-safety-orange"
          >
            Established_Nodes ({connections.length})
          </TabsTrigger>
          <TabsTrigger 
            value="protocols" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-safety-orange data-[state=active]:bg-transparent text-[11px] font-mono uppercase tracking-widest px-0 h-10 transition-all hover:text-safety-orange"
          >
            Protocol_Requests ({receivedRequests.length + sentRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="established" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           {connections.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {connections.map((node) => (
                 <GlassCard key={node.id} className="p-6 border-foreground/5 group hover:bg-foreground/[0.02] transition-colors relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 size-1 bg-safety-orange opacity-50" />
                    
                    <div className="flex items-start gap-4 mb-6">
                       <Avatar className="size-16 rounded-none border border-foreground/10 group-hover:border-safety-orange/50 transition-colors">
                          <AvatarFallback className="bg-foreground/5 text-xl font-display font-black">{node.avatar}</AvatarFallback>
                       </Avatar>
                       <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-mono text-muted-foreground tracking-widest mb-1">{node.nodeId}</p>
                          <h3 className="font-display font-bold text-lg uppercase leading-none truncate mb-2">{node.name}</h3>
                          <div className="flex gap-2">
                             <StatusBadge status="online" label="STABLE" />
                             <span className="text-[9px] font-mono text-muted-foreground uppercase opacity-50">CLASS_{node.graduationYear}</span>
                          </div>
                       </div>
                    </div>

                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter h-8 mb-6">
                      {node.occupation}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                       <IndustrialButton variant="outline" className="h-10 text-[9px] uppercase tracking-widest font-mono">
                          <MessageCircle className="mr-2 size-3" /> Transmit
                       </IndustrialButton>
                       <IndustrialButton variant="outline" className="h-10 text-[9px] uppercase tracking-widest font-mono">
                          <Maximize2 className="mr-2 size-3" /> Profile
                       </IndustrialButton>
                    </div>
                 </GlassCard>
               ))}
             </div>
           ) : (
             <div className="h-64 border border-dashed border-foreground/10 flex flex-col items-center justify-center gap-4">
                <Zap className="size-8 text-muted-foreground opacity-20" />
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">No established nodes detected</p>
             </div>
           )}
        </TabsContent>

        <TabsContent value="protocols" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {/* Incoming */}
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">_Incoming_Transmissions</h2>
                 <div className="flex-1 h-px bg-foreground/5" />
              </div>
              
              <div className="grid gap-4">
                 {receivedRequests.map((req) => (
                   <div key={req.id} className="p-6 border border-foreground/5 bg-foreground/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-electric-blue/20 transition-colors">
                      <div className="flex items-center gap-5">
                         <Avatar className="size-14 rounded-none border border-foreground/5 grayscale">
                            <AvatarFallback className="bg-foreground/5 font-display font-black">{req.avatar}</AvatarFallback>
                         </Avatar>
                         <div>
                            <div className="flex items-center gap-3">
                               <h4 className="font-display font-bold uppercase tracking-tight">{req.name}</h4>
                               <span className="text-[9px] font-mono text-muted-foreground">ID: {req.nodeId}</span>
                            </div>
                            <p className="text-[10px] font-mono text-muted-foreground uppercase mt-1 tracking-tighter">
                               {req.occupation} • RELAY_SENT: {req.requestDate}
                            </p>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                         <IndustrialButton variant="safety" onClick={() => handleAcceptRequest(req.id)} className="h-10 px-8">
                            <CheckCircle className="mr-2 size-4" /> ACCEPT_LINK
                         </IndustrialButton>
                         <IndustrialButton variant="outline" onClick={() => handleDeclineRequest(req.id)} className="h-10 px-6">
                            <UserX className="mr-2 size-4" /> ABORT
                         </IndustrialButton>
                      </div>
                   </div>
                 ))}
                 {receivedRequests.length === 0 && <p className="text-[9px] font-mono text-muted-foreground uppercase text-center p-12 bg-foreground/[0.01]">Zero incoming protocol requests</p>}
              </div>
           </div>

           {/* Outgoing */}
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">_Outbound_Protocols</h2>
                 <div className="flex-1 h-px bg-foreground/5" />
              </div>
              
              <div className="grid gap-4">
                 {sentRequests.map((req) => (
                   <div key={req.id} className="p-6 border border-foreground/5 bg-foreground/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-80 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-5">
                         <Avatar className="size-12 rounded-none border border-foreground/5">
                            <AvatarFallback className="bg-foreground/5 font-mono text-xs">{req.avatar}</AvatarFallback>
                         </Avatar>
                         <div>
                            <h4 className="font-display font-bold uppercase tracking-tight text-sm">{req.name}</h4>
                            <p className="text-[9px] font-mono text-muted-foreground uppercase mt-1">TRANSMITTED: {req.requestDate} // STATUS: PENDING_SYNC</p>
                         </div>
                      </div>
                      <IndustrialButton variant="outline" onClick={() => handleWithdrawRequest(req.id)} className="h-10 px-6 text-[9px]">
                         WITHDRAW_RELAY
                      </IndustrialButton>
                   </div>
                 ))}
                 {sentRequests.length === 0 && <p className="text-[9px] font-mono text-muted-foreground uppercase text-center p-12 bg-foreground/[0.01]">Zero outbound protocols active</p>}
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};