import { useState, useEffect, useRef } from "react";
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
        throw new Error("AI Service Unavailable: Missing API endpoint");
      }

      const res = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage })
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || "Unidentified AI Core Error");
      }

      const messageContent = typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
      
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
        content: `Error: ${error.message}. Please try again later.`,
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
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      {/* Header Panel */}
      <section className="bg-surface-container-lowest p-6 rounded-[1.5rem] border border-[#c7c4d8]/10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-white shadow-lg shadow-primary-container/20">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-on-surface tracking-tight leading-tight">AI Network Assistant</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={cn("w-2 h-2 rounded-full", isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-500")}></div>
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest leading-none">
                {isLoading ? "Processing Request" : "System Online"}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-4 items-center">
           <div className="text-right">
              <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">Powered By</p>
              <p className="text-sm font-black text-primary-container">AlumNet Core</p>
           </div>
           <button className="p-3 bg-surface-container rounded-xl text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined">settings_suggest</span>
           </button>
        </div>
      </section>

      {/* Chat Canvas */}
      <div className="flex-1 bg-surface-container-lowest rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar relative">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto opacity-50">
               <div className="w-20 h-20 rounded-[2rem] bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">forum</span>
               </div>
               <h3 className="text-lg font-bold text-on-surface">How can I help you today?</h3>
               <p className="text-sm text-on-surface-variant font-medium">
                  Ask me about alumni connections, career paths, mentorship opportunities, or campus events.
               </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4",
                  msg.sender === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                  msg.sender === "user" ? "bg-white border border-slate-100" : "bg-primary-container text-white"
                )}>
                  <span className="material-symbols-outlined text-xl">
                    {msg.sender === "user" ? "person" : "smart_toy"}
                  </span>
                </div>
                <div className={cn(
                  "max-w-[80%] space-y-1",
                  msg.sender === "user" ? "text-right" : ""
                )}>
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest px-1">
                    {msg.sender === "user" ? "You" : "Assistant"} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <div className={cn(
                    "p-5 rounded-2xl text-sm leading-relaxed shadow-sm font-medium",
                    msg.sender === "user" 
                      ? "bg-white border border-slate-100 text-on-surface rounded-tr-none" 
                      : "bg-surface-container-high text-on-surface rounded-tl-none border border-[#c7c4d8]/10"
                  )}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-start gap-4 animate-pulse">
               <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-xl text-primary-container">smart_toy</span>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-bold text-primary-container uppercase tracking-widest px-1">Assistant is thinking...</p>
                  <div className="p-5 bg-surface-container rounded-2xl rounded-tl-none border border-[#c7c4d8]/5 flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-container animate-bounce"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-container animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-container animate-bounce delay-200"></div>
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 bg-white dark:bg-slate-950 border-t border-[#c7c4d8]/10">
          <div className="relative max-w-4xl mx-auto group">
            <textarea 
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] p-5 pr-16 text-sm focus:ring-4 focus:ring-primary-container/10 placeholder:text-slate-400 resize-none no-scrollbar h-16 shadow-inner transition-all group-focus-within:bg-white border-transparent focus:border-primary-container/20 group-focus-within:ring-primary-container/10" 
              placeholder="Type your message to the network assistant..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
            ></textarea>
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="absolute right-3 bottom-3 w-10 h-10 bg-primary-container text-white rounded-xl shadow-lg shadow-primary-container/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
             <div className="flex items-center gap-2 opacity-50">
                <span className="material-symbols-outlined text-xs">shield_lock</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Private Data Room</span>
             </div>
             <div className="flex items-center gap-2 opacity-50">
                <span className="material-symbols-outlined text-xs">history</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Session Context Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
