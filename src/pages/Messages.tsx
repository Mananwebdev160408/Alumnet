import { useState } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Send, 
  MoreVertical, 
  ArrowLeft, 
  Zap, 
  Radio, 
  Activity, 
  Shield, 
  Cpu, 
  Terminal,
  Paperclip,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data updated for Neo-Industrial theme
const mockConversations = [
  {
    id: 1,
    name: "SARAH_JOHNSON",
    nodeId: "NODE_S102",
    avatar: "SJ",
    lastMessage: "SYNC: Advice on technical protocol received.",
    timestamp: "14:02",
    unread: 2,
    online: true,
    sector: "Cloud Architecture"
  },
  {
    id: 2,
    name: "MIKE_CHEN",
    nodeId: "NODE_M405",
    avatar: "MC",
    lastMessage: "Requesting node relay for coffee meeting.",
    timestamp: "13:45",
    unread: 0,
    online: false,
    sector: "Cybersecurity"
  },
  {
    id: 3,
    name: "EMMA_WILSON",
    nodeId: "NODE_E901",
    avatar: "EW",
    lastMessage: "Asset referral program initialized.",
    timestamp: "10:30",
    unread: 1,
    online: true,
    sector: "DevOps"
  }
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    content: "IDENTITY BROADCAST: Requesting insights on Tech Corp transition protocol.",
    timestamp: "14:10",
    isOwnMessage: false
  },
  {
    id: 2,
    senderId: "current",
    content: "ACKNOWLEDGMENT: Tech Corp operational standards are high. Technical coding phase is critical.",
    timestamp: "14:12",
    isOwnMessage: true
  },
  {
    id: 3,
    senderId: 1,
    content: "QUERY: Which specific skill nodes are prioritized for L5 roles?",
    timestamp: "14:15",
    isOwnMessage: false
  }
];

export const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showConversationList, setShowConversationList] = useState(true);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: "current",
        content: newMessage.toUpperCase(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        isOwnMessage: true
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] mt-16 overflow-hidden bg-background">
      {/* COLUMN 1: COMMS NODES */}
      <div className={cn(
        "w-full md:w-[350px] border-r border-foreground/10 flex flex-col transition-all duration-300",
        !showConversationList && "hidden md:flex"
      )}>
        <div className="p-6 border-b border-foreground/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-black tracking-tighter uppercase">Comms_Nodes</h2>
            <Radio className="size-4 text-safety-orange animate-pulse" />
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-safety-orange" />
            <Input
              placeholder="FILTER_NODES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-none bg-foreground/[0.02] border-foreground/10 font-mono text-[10px] uppercase tracking-widest focus-visible:ring-safety-orange"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => { setSelectedConversation(conv); setShowConversationList(false); }}
              className={cn(
                "p-5 cursor-pointer border-b border-foreground/5 transition-all hover:bg-foreground/[0.02]",
                selectedConversation.id === conv.id && "bg-foreground/[0.03] border-l-2 border-l-safety-orange"
              )}
            >
              <div className="flex gap-4">
                <div className="relative">
                  <Avatar className="size-12 rounded-none border border-foreground/10">
                    <AvatarFallback className="bg-foreground/5 text-xs font-mono">{conv.avatar}</AvatarFallback>
                  </Avatar>
                  {conv.online && <div className="absolute -bottom-1 -right-1 size-3 bg-safety-orange industrial-border" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[11px] font-mono tracking-widest text-muted-foreground">{conv.nodeId}</span>
                    <span className="text-[9px] font-mono text-muted-foreground">{conv.timestamp}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm tracking-tight text-foreground uppercase">{conv.name}</h4>
                  <p className="text-[10px] font-mono text-muted-foreground truncate uppercase mt-1">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMN 2: MESSAGE FEED */}
      <div className={cn(
        "flex-1 flex flex-col relative",
        showConversationList && "hidden md:flex"
      )}>
        {/* Feed Header */}
        <div className="h-20 border-b border-foreground/10 flex items-center justify-between px-6 bg-background/50 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowConversationList(true)}
              className="md:hidden p-2 -ml-2 hover:text-safety-orange transition-colors"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 bg-safety-orange animate-pulse" />
                <h3 className="text-sm font-display font-black uppercase tracking-widest">{selectedConversation.name}</h3>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase mt-0.5 tracking-tighter">
                ACTIVE_RELAY // SECTOR: {selectedConversation.sector}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <StatusBadge status={selectedConversation.online ? "online" : "offline"} text={selectedConversation.online ? "STABLE" : "STANDBY"} />
             <IndustrialButton variant="outline" className="size-10 p-0">
                <MoreVertical className="size-4" />
             </IndustrialButton>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed overflow-x-hidden custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[80%] md:max-w-[60%] animate-in fade-in slide-in-from-bottom-2",
                msg.isOwnMessage ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-[9px] font-mono text-muted-foreground uppercase">{msg.isOwnMessage ? "USER_MASTER" : selectedConversation.name}</span>
                 <span className="text-[9px] font-mono text-muted-foreground opacity-50">{msg.timestamp}</span>
              </div>
              <div className={cn(
                "p-4 border font-mono text-xs md:text-sm leading-relaxed tracking-tight relative overflow-hidden",
                msg.isOwnMessage 
                  ? "bg-safety-orange/5 border-safety-orange/30 text-foreground" 
                  : "bg-foreground/[0.03] border-foreground/10 text-muted-foreground"
              )}>
                {/* Visual accent for own messages */}
                {msg.isOwnMessage && <div className="absolute top-0 right-0 size-2 bg-safety-orange" />}
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Transmit Input */}
        <div className="p-6 border-t border-foreground/10 bg-background">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <textarea
                placeholder="INPUT_TRANSMISSION..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                rows={1}
                className="w-full h-12 p-3 bg-foreground/[0.02] border border-foreground/10 rounded-none font-mono text-xs uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-safety-orange resize-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                 <button className="text-muted-foreground hover:text-safety-orange transition-colors">
                    <Paperclip className="size-4" />
                 </button>
              </div>
            </div>
            <IndustrialButton 
              variant="safety" 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="h-12 px-8 flex items-center gap-2"
            >
              <span className="hidden md:inline">TRANSMIT</span>
              <Send className="size-4" />
            </IndustrialButton>
          </div>
          <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-muted-foreground tracking-[0.2em]">
             <span>ENCRYPTION: AES-256_ACTIVE</span>
             <span>RELAY: {selectedConversation.nodeId}</span>
          </div>
        </div>
      </div>

      {/* COLUMN 3: NODE INTEL (DESKTOP ONLY) */}
      <div className="hidden lg:flex w-[300px] border-l border-foreground/10 flex-col bg-foreground/[0.01]">
         <div className="p-8 space-y-8">
            <div className="space-y-4">
               <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground border-b border-foreground/5 pb-2">Node_Identity</h4>
               <Avatar className="size-32 rounded-none border border-foreground/10 grayscale">
                  <AvatarFallback className="text-4xl font-display font-black bg-foreground/5">{selectedConversation.avatar}</AvatarFallback>
               </Avatar>
               <div>
                  <h2 className="text-2xl font-display font-black tracking-tighter uppercase">{selectedConversation.name}</h2>
                  <p className="text-[10px] font-mono text-safety-orange mt-1 uppercase tracking-widest">Verified_Asset</p>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground border-b border-foreground/5 pb-2">Technical_Specs</h4>
               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <Cpu className="size-3 text-muted-foreground" />
                     <span className="text-[10px] font-mono uppercase text-foreground">L5 ENGINEER</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Shield className="size-3 text-muted-foreground" />
                     <span className="text-[10px] font-mono uppercase text-foreground">ALUMNI_VERIFIED</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Terminal className="size-3 text-muted-foreground" />
                     <span className="text-[10px] font-mono uppercase text-foreground">{selectedConversation.sector}</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground border-b border-foreground/5 pb-2">Operational_Links</h4>
               <div className="flex flex-wrap gap-2">
                  <IndustrialButton variant="outline" className="w-full text-[9px] uppercase font-mono tracking-widest h-8">
                     <Share2 className="mr-2 size-3" /> Export Comms
                  </IndustrialButton>
                  <IndustrialButton variant="outline" className="w-full text-[9px] uppercase font-mono tracking-widest h-8">
                     <Activity className="mr-2 size-3" /> Connectivity Log
                  </IndustrialButton>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};