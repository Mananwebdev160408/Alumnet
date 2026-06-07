import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserPlus, Clock, Loader2, MessageSquare } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { subscribeToConnections, updateConnectionStatus, getUserProfile, sendConnectionRequest, getUsers } from "@/lib/firestoreService";
import type { Connection, UserProfile } from "@/lib/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Connections() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
  const [suggested, setSuggested] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = subscribeToConnections(currentUser.uid, async (conns) => {
      setConnections(conns);
      setLoading(false);

      // Fetch profiles for all connection partners
      const uids = new Set<string>();
      conns.forEach((c) => {
        const other = c.requesterId === currentUser.uid ? c.recipientId : c.requesterId;
        uids.add(other);
      });

      const fetched: Record<string, UserProfile> = {};
      await Promise.all(
        Array.from(uids).map(async (uid) => {
          if (!profiles[uid]) {
            const p = await getUserProfile(uid);
            if (p) fetched[uid] = p;
          }
        })
      );
      setProfiles((prev) => ({ ...prev, ...fetched }));
    });
    return unsub;
  }, [currentUser]);

  // Discover: fetch alumni not in connections
  useEffect(() => {
    if (!currentUser) return;
    getUsers({ role: "alumni" }).then((allAlumni) => {
      setSuggested(allAlumni.filter((a) => a.uid !== currentUser.uid));
    });
  }, [currentUser]);

  const accepted = connections.filter((c) => c.status === "accepted");
  const pending = connections.filter(
    (c) => c.status === "pending" && c.recipientId === currentUser?.uid
  );
  const sent = connections.filter(
    (c) => c.status === "pending" && c.requesterId === currentUser?.uid
  );

  const connectedUids = new Set(
    accepted.map((c) =>
      c.requesterId === currentUser?.uid ? c.recipientId : c.requesterId
    )
  );

  const discoverable = suggested.filter((u) => !connectedUids.has(u.uid));

  const getOtherUid = (c: Connection) =>
    c.requesterId === currentUser?.uid ? c.recipientId : c.requesterId;

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const handleAccept = async (connId: string, name: string) => {
    setActionLoading(connId);
    try {
      await updateConnectionStatus(connId, "accepted");
      toast.success(`Connected with ${name}!`);
    } catch {
      toast.error("Failed to accept connection.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (connId: string, name: string) => {
    setActionLoading(connId);
    try {
      await updateConnectionStatus(connId, "declined");
      toast.success(`Declined request from ${name}.`);
    } catch {
      toast.error("Failed to decline.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleConnect = async (uid: string, name: string) => {
    if (!currentUser) return;
    setActionLoading(uid);
    try {
      await sendConnectionRequest(currentUser.uid, uid);
      toast.success(`Request sent to ${name}!`);
    } catch {
      toast.error("Failed to send request.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleMessage = (uid: string) => {
    const role = userProfile?.role;
    navigate(`/${role}/messages`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">My Connections</h2>
          <p className="text-muted-foreground">Manage your network and discover new people.</p>
        </div>
      </div>

      <Tabs defaultValue="my-network" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="my-network" className="px-6">
            My Network ({accepted.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="px-6 relative">
            Pending
            {pending.length > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] rounded-full">
                {pending.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="discover" className="px-6">Discover</TabsTrigger>
        </TabsList>

        {/* My Network */}
        <TabsContent value="my-network" className="space-y-6">
          <div className="flex justify-between items-center bg-card border border-border p-4 rounded-lg shadow-sm">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your connections..."
                className="pl-9 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">
              {accepted.length} connection{accepted.length !== 1 ? "s" : ""}
            </p>
          </div>

          {accepted.length === 0 ? (
            <Card className="border-border shadow-sm py-12">
              <CardContent className="flex flex-col items-center text-center">
                <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No connections yet</h3>
                <p className="text-sm text-muted-foreground mt-1">Discover alumni and send connection requests.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accepted
                .filter((c) => {
                  const uid = getOtherUid(c);
                  const p = profiles[uid];
                  return !search || (p && p.name.toLowerCase().includes(search.toLowerCase()));
                })
                .map((conn) => {
                  const uid = getOtherUid(conn);
                  const p = profiles[uid];
                  return (
                    <Card key={conn.id} className="border-border shadow-sm flex flex-row items-center p-4">
                      <Avatar className="h-16 w-16 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {p ? initials(p.name) : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold">{p?.name ?? uid}</h4>
                        <p className="text-sm text-muted-foreground">
                          {p?.occupation}{p?.company ? ` at ${p.company}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleMessage(uid)}>
                          <MessageSquare className="h-3 w-3 mr-1" /> Message
                        </Button>
                      </div>
                    </Card>
                  );
                })}
            </div>
          )}
        </TabsContent>

        {/* Pending */}
        <TabsContent value="pending" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Incoming Requests</CardTitle>
              <CardDescription>People who want to connect with you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pending.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No pending requests.</p>
              ) : (
                pending.map((req) => {
                  const uid = req.requesterId;
                  const p = profiles[uid];
                  return (
                    <div key={req.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {p ? initials(p.name) : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <h4 className="font-semibold">{p?.name ?? uid}</h4>
                          <p className="text-sm text-muted-foreground">
                            {p?.occupation}{p?.company ? ` at ${p.company}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={actionLoading === req.id}
                          onClick={() => handleDecline(req.id, p?.name ?? "user")}
                        >
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          disabled={actionLoading === req.id}
                          onClick={() => handleAccept(req.id, p?.name ?? "user")}
                        >
                          {actionLoading === req.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Accept"}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {sent.length > 0 && (
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle>Sent Requests</CardTitle>
                <CardDescription>Waiting for their response.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sent.map((req) => {
                  const uid = req.recipientId;
                  const p = profiles[uid];
                  return (
                    <div key={req.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {p ? initials(p.name) : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <h4 className="font-semibold">{p?.name ?? uid}</h4>
                          <p className="text-sm text-muted-foreground">{p?.occupation}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                        <Clock className="h-3 w-3 mr-1" /> Awaiting
                      </Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Discover */}
        <TabsContent value="discover" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Suggested for You</CardTitle>
              <CardDescription>Alumni you haven't connected with yet.</CardDescription>
            </CardHeader>
            <CardContent>
              {discoverable.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  You've connected with all available alumni!
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {discoverable.map((person) => (
                    <Card key={person.uid} className="border border-border flex flex-col items-center text-center p-6 bg-background shadow-sm hover:shadow-md transition-shadow">
                      <Avatar className="h-20 w-20 mb-4 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                          {initials(person.name)}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold">{person.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {person.occupation}{person.company ? ` at ${person.company}` : ""}
                      </p>
                      {person.isMentor && (
                        <Badge variant="secondary" className="mb-4 text-xs bg-emerald-100 text-emerald-800">
                          Open to Mentor
                        </Badge>
                      )}
                      <Button
                        className="w-full mt-auto"
                        variant="outline"
                        disabled={actionLoading === person.uid}
                        onClick={() => handleConnect(person.uid, person.name)}
                      >
                        {actionLoading === person.uid ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <UserPlus className="mr-2 h-4 w-4" />
                        )}
                        Connect
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
