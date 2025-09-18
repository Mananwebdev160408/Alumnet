import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Phone, Video, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "Thanks for the advice about the interview process!",
    timestamp: "2 min ago",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "MC",
    lastMessage: "Let's schedule that coffee meeting next week",
    timestamp: "1 hour ago",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "EW",
    lastMessage: "The Netflix referral program is really helpful",
    timestamp: "3 hours ago",
    unread: 1,
    online: true
  },
  {
    id: 4,
    name: "David Rodriguez",
    avatar: "DR",
    lastMessage: "I'll send you the design portfolio examples",
    timestamp: "Yesterday",
    unread: 0,
    online: false
  }
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    content: "Hi John! I saw your profile and noticed you work at Tech Corp. I'm interested in transitioning to a similar role.",
    timestamp: "2:30 PM",
    isOwnMessage: false
  },
  {
    id: 2,
    senderId: "current",
    content: "Hi Sarah! I'd be happy to help. Tech Corp is a great place to work. What specific questions do you have?",
    timestamp: "2:35 PM",
    isOwnMessage: true
  },
  {
    id: 3,
    senderId: 1,
    content: "I'm mainly curious about the interview process and what skills they value most for senior engineering roles.",
    timestamp: "2:37 PM",
    isOwnMessage: false
  },
  {
    id: 4,
    senderId: "current",
    content: "The interview process typically has 4 rounds: initial screening, technical coding, system design, and behavioral. They really value problem-solving skills and cultural fit. I can share some specific tips if you'd like.",
    timestamp: "2:40 PM",
    isOwnMessage: true
  },
  {
    id: 5,
    senderId: 1,
    content: "Thanks for the advice about the interview process!",
    timestamp: "2:42 PM",
    isOwnMessage: false
  }
];

export const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: "current",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwnMessage: true
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="absolute inset-0 bg-background/60 w-[calc(100vw-17rem)] h-[calc(100vh-5rem)] mt-[5rem] ml-[20rem] backdrop-blur-md flex items-center justify-center z-50">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold">Coming Soon 🚀</h2>
      <p className="text-muted-foreground">This feature will be available in a future update</p>
    </div>
    </div>
    <div className="h-[calc(100vh-8rem)] flex bg-background">
      {/* Conversations List */}
      <div className="w-80 border-r border-border">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="pb-3">
            <h2 className="text-xl font-semibold">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={cn(
                    "p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                    selectedConversation.id === conversation.id && "bg-muted"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={`/placeholder-${conversation.id}.jpg`} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{conversation.name}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={`/placeholder-${selectedConversation.id}.jpg`} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedConversation.avatar}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{selectedConversation.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedConversation.online ? "Online" : "Last seen recently"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isOwnMessage ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] p-3 rounded-lg",
                  message.isOwnMessage
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  message.isOwnMessage ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-border p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  
    </>
  );
};