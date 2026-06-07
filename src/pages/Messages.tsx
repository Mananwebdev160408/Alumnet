import React, { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Send, MoreVertical, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import {
  subscribeToConversations,
  subscribeToMessages,
  sendMessage,
  getUserProfile,
  getOrCreateConversation,
} from "@/lib/firestoreService";
import type { Conversation, Message, UserProfile } from "@/lib/types";
import { useParams, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function Messages() {
  const { currentUser, userProfile } = useAuth();
  const { conversationId: paramConvId } = useParams<{ conversationId?: string }>();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(paramConvId ?? null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUsers, setOtherUsers] = useState<Record<string, UserProfile>>({});
  const [messageText, setMessageText] = useState("");
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const role = userProfile?.role ?? "student";

  // Load conversations
  useEffect(() => {
    if (!currentUser) return;
    const unsub = subscribeToConversations(currentUser.uid, async (convs) => {
      setConversations(convs);
      setLoadingConvs(false);

      // Fetch other user profiles
      const uids = new Set<string>();
      convs.forEach((c) =>
        c.participants.filter((p) => p !== currentUser.uid).forEach((p) => uids.add(p))
      );
      const fetched: Record<string, UserProfile> = {};
      await Promise.all(
        Array.from(uids).map(async (uid) => {
          const p = await getUserProfile(uid);
          if (p) fetched[uid] = p;
        })
      );
      setOtherUsers((prev) => ({ ...prev, ...fetched }));

      // Auto-select first conversation if none selected
      if (!selectedConvId && convs.length > 0) {
        setSelectedConvId(convs[0].id);
      }
    });
    return unsub;
  }, [currentUser]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConvId) return;
    const unsub = subscribeToMessages(selectedConvId, (msgs) => {
      setMessages(msgs);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    return unsub;
  }, [selectedConvId]);

  const handleSend = async () => {
    if (!messageText.trim() || !selectedConvId || !currentUser || sending) return;
    const text = messageText.trim();
    setMessageText("");
    setSending(true);
    try {
      await sendMessage(selectedConvId, currentUser.uid, text);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getOtherUser = (conv: Conversation): UserProfile | null => {
    const uid = conv.participants.find((p) => p !== currentUser?.uid);
    return uid ? otherUsers[uid] ?? null : null;
  };

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const selectedConv = conversations.find((c) => c.id === selectedConvId);
  const selectedOtherUser = selectedConv ? getOtherUser(selectedConv) : null;

  const filteredConvs = conversations.filter((c) => {
    const other = getOtherUser(c);
    return !search || (other && other.name.toLowerCase().includes(search.toLowerCase()));
  });

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
              <Input
                placeholder="Search messages"
                className="pl-9 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {loadingConvs ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : filteredConvs.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No conversations yet. Connect with alumni to start messaging!
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredConvs.map((conv) => {
                  const other = getOtherUser(conv);
                  const isActive = conv.id === selectedConvId;
                  return (
                    <button
                      key={conv.id}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-background shadow-sm border border-border"
                          : "hover:bg-muted/50 border border-transparent"
                      }`}
                      onClick={() => setSelectedConvId(conv.id)}
                    >
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {other ? initials(other.name) : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-semibold text-sm truncate">{other?.name ?? "Unknown"}</h4>
                          <span className="text-[10px] text-muted-foreground ml-2 shrink-0">
                            {conv.lastMessageAt
                              ? formatDistanceToNow(conv.lastMessageAt, { addSuffix: true })
                              : ""}
                          </span>
                        </div>
                        <p className="text-xs truncate mt-0.5 text-muted-foreground">
                          {conv.lastMessage || "No messages yet"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col hidden md:flex">
          {!selectedConvId ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="text-sm">Select a conversation to start chatting</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-background">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedOtherUser ? initials(selectedOtherUser.name) : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="font-semibold text-sm">{selectedOtherUser?.name ?? "Unknown"}</h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedOtherUser?.occupation}
                      {selectedOtherUser?.company ? ` at ${selectedOtherUser.company}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4 bg-muted/10">
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isMine = msg.senderId === currentUser?.uid;
                    return (
                      <div key={msg.id} className={`flex gap-3 ${isMine ? "flex-row-reverse" : ""}`}>
                        {!isMine && (
                          <Avatar className="h-8 w-8 shrink-0 border border-border mt-auto">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {selectedOtherUser ? initials(selectedOtherUser.name) : "?"}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`flex flex-col gap-1 max-w-[70%] ${isMine ? "items-end" : ""}`}>
                          <div
                            className={`p-3 rounded-2xl shadow-sm text-sm ${
                              isMine
                                ? "bg-primary text-primary-foreground rounded-br-sm"
                                : "bg-background border border-border rounded-bl-sm"
                            }`}
                          >
                            {msg.content}
                          </div>
                          <span className="text-[10px] text-muted-foreground mx-1">
                            {msg.createdAt
                              ? formatDistanceToNow(msg.createdAt, { addSuffix: true })
                              : ""}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 bg-background border-t border-border">
                <div className="flex items-end gap-2 bg-muted/20 border border-border p-2 rounded-xl focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                  <textarea
                    className="flex-1 max-h-32 min-h-8 bg-transparent border-0 focus:ring-0 resize-none py-1.5 px-2 text-sm placeholder:text-muted-foreground outline-none"
                    placeholder="Type a message..."
                    rows={1}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full ml-1 shrink-0"
                    onClick={handleSend}
                    disabled={!messageText.trim() || sending}
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
