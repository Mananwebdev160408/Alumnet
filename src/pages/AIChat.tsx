import { useState, useEffect, useRef } from "react";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Bot, Send, User, Sparkles, Zap, Cpu, Activity, Terminal, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + "-user",
      content: message.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = message.trim();
    setMessage(""); 
    setIsLoading(true);

    try {
      const functionUrl = import.meta.env.VITE_AICHAT_FUNCTION_URL;
      
      if (!functionUrl) {
        throw new Error("CORE_AUTH_FAILURE: Missing API endpoint");
      }

      const res = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage })
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || "UNIDENTIFIED_CORE_ERROR");
      }

      const aiResponseContent = data.message || "NO_RELAY_RECEIVED";
      const messageContent = typeof aiResponseContent === 'string' ? aiResponseContent : JSON.stringify(aiResponseContent);
      
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: messageContent,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error: any) {
      console.error("AI_CORE_LINK_ERROR:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + "-ai-error",
        content: `CRITICAL_SYS_ERR: ${error.message}. TRANSMISSION_ABORTED.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 lg:p-10 mt-16 max-w-[1200px] mx-auto h-[calc(100vh-10rem)] flex flex-col gap-6">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="size-4 text-safety-orange" />
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Neural Core // Interface_V2</p>
          </div>
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase leading-none">
            AI_Assistant
          </h1>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right hidden sm:block">
              <p className="text-[9px] font-mono text-muted-foreground uppercase">Neural Load</p>
              <p className="text-sm font-display font-bold">12.5 GFlops</p>
           </div>
           <StatusBadge status={isLoading ? "offline" : "online"} text={isLoading ? "CORE_PROCESSING" : "READY"} />
        </div>
      </div>

      {/* Main Terminal */}
      <GlassCard className="flex-1 flex flex-col border-foreground/5 relative overflow-hidden">
        {/* Terminal Header */}
        <div className="px-6 py-3 border-b border-foreground/5 bg-foreground/[0.02] flex items-center justify-between">
           <div className="flex items-center gap-3">
              <Terminal className="size-3 text-muted-foreground" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">COMMS_TERMINAL_SESSION_0x1A4</span>
           </div>
           <div className="flex gap-1.5">
              <div className="size-1.5 bg-foreground/20" />
              <div className="size-1.5 bg-foreground/20" />
              <div className="size-1.5 bg-safety-orange" />
           </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 terminal-scrollbar custom-scanlines">
           {messages.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4">
                <Bot className="size-12" />
                <p className="text-[10px] font-mono uppercase tracking-[0.5em]">Awaiting User Input Protocol...</p>
             </div>
           ) : (
             messages.map((msg) => (
               <div
                 key={msg.id}
                 className={cn(
                   "flex flex-col gap-2 max-w-[85%] animate-in fade-in slide-in-from-bottom-2",
                   msg.sender === "user" ? "ml-auto items-end" : "items-start"
                 )}
               >
                 <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                       {msg.sender === "user" ? "USER_ID" : "AI_CORE"} // {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                 </div>
                 
                 <div className={cn(
                   "p-4 border font-mono text-xs uppercase tracking-tighter leading-relaxed",
                   msg.sender === "user" 
                    ? "bg-safety-orange text-black border-safety-orange" 
                    : "bg-foreground/5 text-foreground border-foreground/10 industrial-border shadow-[4px_4px_0px_rgba(255,114,33,0.1)]"
                 )}>
                    {msg.content}
                 </div>
               </div>
             ))
           )}
           {isLoading && (
             <div className="flex flex-col gap-2 items-start max-w-[85%] animate-pulse">
                <span className="text-[9px] font-mono uppercase tracking-widest text-safety-orange px-1">AI_CORE // PROCESSING...</span>
                <div className="p-4 bg-foreground/5 border border-foreground/10 text-foreground industrial-border size-full flex items-center gap-3">
                   <div className="size-1 bg-safety-orange animate-bounce" />
                   <div className="size-1 bg-safety-orange animate-bounce delay-75" />
                   <div className="size-1 bg-safety-orange animate-bounce delay-150" />
                   <span className="text-[9px] font-mono uppercase text-muted-foreground ml-2">Analyzing transmission packets...</span>
                </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Terminal Footer / Input */}
        <div className="p-4 border-t border-foreground/5 bg-foreground/[0.02]">
           <div className="flex gap-4">
              <div className="flex-1 relative">
                 <textarea
                    placeholder="ENTER_COMMAND_OR_QUERY_"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full h-16 bg-black/50 border border-foreground/10 p-4 font-mono text-xs uppercase tracking-tighter focus:outline-none focus:border-safety-orange resize-none"
                 />
                 <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                    <Sparkles className="size-4" />
                 </div>
              </div>
              <IndustrialButton 
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                variant="safety"
                className="h-16 px-10 group"
              >
                <div className="flex flex-col items-center gap-1">
                   <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   <span className="text-[8px] font-mono">TRANSMIT</span>
                </div>
              </IndustrialButton>
           </div>
           
           <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                 <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-safety-orange animate-pulse" />
                    <span className="text-[8px] font-mono text-muted-foreground">LINK_ACTIVE</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Activity className="size-3 text-muted-foreground" />
                    <span className="text-[8px] font-mono text-muted-foreground uppercase opacity-50">LATENCY: 42MS</span>
                 </div>
              </div>
              <div className="flex items-center gap-1 opacity-20">
                 <AlertCircle className="size-3" />
                 <span className="text-[8px] font-mono uppercase">Stateless_Relay_Mode</span>
              </div>
           </div>
        </div>
      </GlassCard>

      {/* Footer System Status */}
      <div className="flex flex-wrap justify-between items-center gap-4 text-muted-foreground">
         <div className="flex items-center gap-4 text-[9px] font-mono uppercase">
            <span>Core: GPT-4o-Mini</span>
            <span>Ref: ALM_HUB_01</span>
            <span>Proto: ALM_S_42</span>
         </div>
         <p className="text-[9px] font-mono uppercase tracking-widest text-center md:text-right max-w-lg">
            WARNING: Neural core operates in transient mode. History persistence not active for this session.
         </p>
      </div>
    </div>
  );
};

