import { useState,useEffect,useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Sparkles, Zap, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import {api} from "../../axios.js"
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

  
 const handleSendMessage = async () => {
  if (!message.trim()) return;

  // Add user message to conversation first
  const userMessage: Message = {
    id: Date.now().toString() + "-user",
    content: message.trim(),
    sender: "user",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  const currentMessage = message.trim();
  setMessage(""); // Clear input
  setIsLoading(true);

  try {
    // Send request to backend
    const axiosres = await api.post("/users/aichat", { message: currentMessage });
    
    if (!axiosres.data.success) {
      console.error("Error from AI service:", axiosres.data.message);
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString() + "-ai-error",
        content: "Sorry, I encountered an error. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Extract AI response - now it's directly in data property
    const aiResponseContent = axiosres.data.message || "No response received";
    
    // Ensure it's a string
    const messageContent = typeof aiResponseContent === 'string' ? 
      aiResponseContent : 
      JSON.stringify(aiResponseContent);
    
    const aiMessage: Message = {
      id: Date.now().toString() + "-ai",
      content: messageContent,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    
  } catch (error) {
    console.error("Error communicating with AI service:", error);
    
    // Add error message to chat
    const errorMessage: Message = {
      id: Date.now().toString() + "-ai-error",
      content: "Sorry, I encountered an error while processing your request. Please try again.",
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};
const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">
          Chat with AI - appears conversational but each message is processed
          independently
        </p>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Conversation</h2>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px]">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                <div>
                  <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Start a conversation with the AI assistant</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.sender === "ai" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.sender === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-sm text-muted-foreground">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[80px] max-h-[120px] resize-none"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              size="lg"
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 bg-muted/30">
        <CardContent className="pt-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              <strong>Note:</strong> This AI doesn't actually remember previous
              messages - each response is generated independently.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
