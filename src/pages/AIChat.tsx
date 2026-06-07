import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles, RefreshCcw } from "lucide-react";

export default function AIChat() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-6 w-full max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
            AI Assistant <Sparkles className="ml-2 h-5 w-5 text-primary" />
          </h2>
          <p className="text-muted-foreground">Ask questions about the network, events, or get career advice.</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCcw className="mr-2 h-4 w-4" /> New Chat
        </Button>
      </div>

      <Card className="flex-1 flex flex-col border-border shadow-sm overflow-hidden bg-background">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Intro Message */}
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border border-primary/20 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted/30 border border-border p-4 rounded-2xl rounded-tl-sm shadow-sm">
                <p className="text-sm font-medium mb-2">Hello! I'm your AlumNet AI Assistant.</p>
                <p className="text-sm text-muted-foreground mb-4">
                  I can help you find connections, prep for interviews, or navigate the platform. How can I assist you today?
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-background">Find a mentor</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-background">Review my profile</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-background">Upcoming events</Button>
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start gap-4 flex-row-reverse">
              <Avatar className="h-10 w-10 border border-border shrink-0">
                <AvatarFallback className="bg-secondary/50 text-foreground">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-sm shadow-sm">
                <p className="text-sm">Can you help me find someone working at Vercel in San Francisco?</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border border-primary/20 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted/30 border border-border p-4 rounded-2xl rounded-tl-sm shadow-sm w-full">
                <p className="text-sm mb-3">
                  I found a few alumni working at Vercel in the San Francisco area:
                </p>
                
                <div className="space-y-3 mb-3">
                  <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">WW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Wade Warren</p>
                        <p className="text-xs text-muted-foreground">Frontend Developer</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">View Profile</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">IN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Isabella Nguyen</p>
                        <p className="text-xs text-muted-foreground">UX Designer</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">View Profile</Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Would you like me to draft an introduction message for you?
                </p>
              </div>
            </div>
            
            {/* Thinking indicator could go here */}
            
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-muted/10">
          <div className="max-w-3xl mx-auto relative flex items-end">
            <Input 
              placeholder="Type your message..." 
              className="pr-12 h-12 bg-background border-border shadow-sm focus-visible:ring-primary/50 text-base"
            />
            <Button size="icon" className="absolute right-1 top-1 bottom-1 h-10 w-10 rounded-md bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-w-3xl mx-auto text-center mt-2">
            <p className="text-[10px] text-muted-foreground">AI can make mistakes. Consider verifying important information.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
