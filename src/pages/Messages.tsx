import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock data
const mockConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    lastMessage: "I've reviewed the portfolio you sent over. Great work!",
    timestamp: "2:02 PM",
    unread: 2,
    online: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    role: "Senior Product Designer"
  },
  {
    id: 2,
    name: "Mike Chen",
    lastMessage: "Are we still on for the mentorship session tomorrow?",
    timestamp: "1:45 PM",
    unread: 0,
    online: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    role: "Cybersecurity Analyst"
  },
  {
    id: 3,
    name: "Emma Wilson",
    lastMessage: "The referral has been submitted successfully.",
    timestamp: "10:30 AM",
    unread: 1,
    online: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
    role: "DevOps Engineer"
  }
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    content: "Hi Sarah! I'm interested in the Senior Product Designer role you posted.",
    timestamp: "2:10 PM",
    isOwnMessage: true
  },
  {
    id: 2,
    senderId: 2,
    content: "Hey there! Happy to chat about it. Do you have a portfolio I can look at?",
    timestamp: "2:12 PM",
    isOwnMessage: false
  },
  {
    id: 3,
    senderId: 1,
    content: "Yes, absolutely! Sending it over right now.",
    timestamp: "2:15 PM",
    isOwnMessage: true
  }
];

export const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: 1,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwnMessage: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-surface-container-lowest rounded-[2rem] border border-[#c7c4d8]/10 shadow-sm flex overflow-hidden">
      {/* Sidebar: Conversations List */}
      <div className="w-80 border-r border-[#c7c4d8]/10 flex flex-col">
        <div className="p-6 border-b border-[#c7c4d8]/10">
          <h2 className="text-xl font-black text-on-surface mb-4">Messages</h2>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input 
              className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 placeholder:text-slate-400" 
              placeholder="Search chat..." 
              type="text"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {mockConversations.map((conv) => (
            <div 
              key={conv.id} 
              onClick={() => setSelectedConversation(conv)}
              className={cn(
                "p-4 flex gap-3 cursor-pointer transition-all hover:bg-surface-container-low/50",
                selectedConversation.id === conv.id && "bg-primary/5 border-r-4 border-primary"
              )}
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <img alt={conv.name} className="w-full h-full rounded-full object-cover shadow-sm" src={conv.avatar} />
                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-on-surface truncate">{conv.name}</h4>
                  <span className="text-[10px] text-on-surface-variant font-medium opacity-60">{conv.timestamp}</span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-1 opacity-70 font-medium">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold ml-1">
                  {conv.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-950">
        {/* Chat Header */}
        <div className="px-6 h-20 border-b border-[#c7c4d8]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
               <img alt={selectedConversation.name} className="w-full h-full object-cover" src={selectedConversation.avatar} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface leading-tight">{selectedConversation.name}</h3>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">OnlineNow</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined text-xl">videocam</span>
            </button>
            <button className="p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined text-xl">info</span>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex flex-col max-w-[70%]",
                msg.isOwnMessage ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                msg.isOwnMessage 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-surface-container-highest text-on-surface rounded-tl-none"
              )}>
                {msg.content}
              </div>
              <span className="mt-1.5 text-[10px] text-on-surface-variant font-bold opacity-50">{msg.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-[#c7c4d8]/10 bg-white dark:bg-slate-950">
          <div className="flex gap-3 items-end">
            <button className="p-3 rounded-2xl bg-surface-container-low text-on-surface-variant hover:text-primary transition-all mb-0.5">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="flex-1 relative">
              <textarea 
                className="w-full bg-surface-container-low border-none rounded-2xl p-4 pr-12 text-sm focus:ring-2 focus:ring-primary-container/20 placeholder:text-slate-400 resize-none no-scrollbar h-12" 
                placeholder="Type your message..." 
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              ></textarea>
              <button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="absolute right-2 bottom-1.5 p-2 bg-primary text-white rounded-xl shadow-md disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Panel (Optional) */}
      <div className="hidden xl:flex w-72 border-l border-[#c7c4d8]/10 flex-col p-8 space-y-8 bg-surface-container-lowest">
        <div className="text-center space-y-4">
           <div className="w-24 h-24 mx-auto rounded-[2rem] overflow-hidden shadow-xl ring-4 ring-primary/5">
              <img alt={selectedConversation.name} className="w-full h-full object-cover" src={selectedConversation.avatar} />
           </div>
           <div>
              <h3 className="text-lg font-black text-on-surface leading-tight">{selectedConversation.name}</h3>
              <p className="text-xs text-primary font-bold mt-1 uppercase tracking-tighter">{selectedConversation.role}</p>
           </div>
        </div>

        <div className="space-y-4">
           <h4 className="text-[10px] font-black uppercase text-on-surface-variant/50 tracking-widest border-b border-[#c7c4d8]/10 pb-2">Actions</h4>
           <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-primary/5 hover:text-primary transition-all text-sm font-bold opacity-80 hover:opacity-100">
                 <span className="material-symbols-outlined text-sm">person</span>
                 View Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-primary/5 hover:text-primary transition-all text-sm font-bold opacity-80 hover:opacity-100">
                 <span className="material-symbols-outlined text-sm">schedule</span>
                 Mentorship Status
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-error/5 hover:text-error transition-all text-sm font-bold opacity-80 hover:opacity-100">
                 <span className="material-symbols-outlined text-sm text-error">block</span>
                 Block Contact
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};