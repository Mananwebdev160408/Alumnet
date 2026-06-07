import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react";

export default function Messages() {
  const conversations = [
    { name: "John Doe", lastMessage: "Sounds good, let's connect tomorrow.", time: "10:30 AM", unread: 2, init: "JD", active: true },
    { name: "Jane Cooper", lastMessage: "Can you send me the latest pitch deck?", time: "Yesterday", unread: 0, init: "JC", active: false },
    { name: "Kristin Watson", lastMessage: "Thanks for the referral!", time: "Monday", unread: 0, init: "KW", active: false },
    { name: "Esther Howard", lastMessage: "Are you attending the alumni event?", time: "Mar 12", unread: 0, init: "EH", active: false },
    { name: "Cameron Williamson", lastMessage: "Great to meet you.", time: "Mar 10", unread: 0, init: "CW", active: false },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-6 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Messages</h2>
        <p className="text-muted-foreground">Chat with your connections and mentors.</p>
      </div>

      <div className="flex flex-1 overflow-hidden bg-card border border-border shadow-sm rounded-lg">
        {/* Sidebar */}
        <div className="w-full md:w-80 flex flex-col border-r border-border bg-muted/20">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages" className="pl-9 bg-background" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {conversations.map((chat, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                    chat.active ? "bg-background shadow-sm border border-border" : "hover:bg-muted/50 border border-transparent"
                  }`}
                >
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">{chat.init}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold text-sm truncate">{chat.name}</h4>
                      <span className="text-[10px] text-muted-foreground ml-2 shrink-0">{chat.time}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${chat.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="ml-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {chat.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col hidden md:flex">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-background">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h4 className="font-semibold text-sm">John Doe</h4>
                <p className="text-xs text-emerald-500 font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Video className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4 bg-muted/10">
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">Today</span>
              </div>
              
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0 border border-border mt-auto">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 max-w-[70%]">
                  <div className="bg-background border border-border p-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <p className="text-sm">Hi there! Thanks for connecting. I saw you also went to Tech University.</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground ml-1">10:15 AM</span>
                </div>
              </div>

              <div className="flex gap-3 flex-row-reverse">
                <div className="flex flex-col gap-1 max-w-[70%] items-end">
                  <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-br-sm shadow-sm">
                    <p className="text-sm">Hey John! Yes, I graduated in 2018. How about you?</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground mr-1">10:22 AM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0 border border-border mt-auto">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 max-w-[70%]">
                  <div className="bg-background border border-border p-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <p className="text-sm">Class of 2016 here. We're looking for a senior frontend dev at TechCorp. Are you open to new opportunities?</p>
                  </div>
                  <div className="bg-background border border-border p-3 rounded-2xl shadow-sm mt-1">
                    <p className="text-sm">Sounds good, let's connect tomorrow.</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground ml-1">10:30 AM</span>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 bg-background border-t border-border">
            <div className="flex items-end gap-2 bg-muted/20 border border-border p-2 rounded-xl focus-within:ring-1 focus-within:ring-primary/50 transition-all">
              <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground h-8 w-8 hover:text-foreground hover:bg-muted/50 rounded-full">
                <Paperclip className="h-4 w-4" />
              </Button>
              <textarea 
                className="flex-1 max-h-32 min-h-8 bg-transparent border-0 focus:ring-0 resize-none py-1.5 px-2 text-sm placeholder:text-muted-foreground"
                placeholder="Type a message..."
                rows={1}
              />
              <div className="flex items-center gap-1 shrink-0 pb-0.5">
                <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8 hover:text-foreground hover:bg-muted/50 rounded-full">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="icon" className="h-8 w-8 rounded-full ml-1">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
