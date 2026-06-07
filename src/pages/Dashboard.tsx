import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Activity, Briefcase, MessageSquare, ArrowUpRight, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { subscribeToConnections, subscribeToSessions, subscribeToReferrals, getUsers, getUserProfile } from "@/lib/firestoreService";
import type { UserProfile, Connection } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState<UserProfile[]>([]);
  const [connProfiles, setConnProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !userProfile) return;

    // Total alumni
    getUsers({ role: "alumni" }).then((list) => setTotalAlumni(list.length));

    // Recent users
    getUsers({ role: "alumni" }).then((list) => {
      setRecentUsers(
        list
          .filter((u) => u.uid !== currentUser.uid)
          .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
          .slice(0, 5)
      );
      setLoading(false);
    });

    const unsub1 = subscribeToConnections(currentUser.uid, async (conns) => {
      const accepted = conns.filter((c) => c.status === "accepted");
      setConnections(accepted);
      // Fetch profiles
      const uids = new Set(
        accepted.map((c) =>
          c.requesterId === currentUser.uid ? c.recipientId : c.requesterId
        )
      );
      const fetched: Record<string, UserProfile> = {};
      await Promise.all(
        Array.from(uids).map(async (uid) => {
          const p = await getUserProfile(uid);
          if (p) fetched[uid] = p;
        })
      );
      setConnProfiles((prev) => ({ ...prev, ...fetched }));
    });

    const unsub2 = subscribeToSessions(currentUser.uid, "alumni", (s) =>
      setSessionCount(s.length)
    );

    const unsub3 = subscribeToReferrals(
      { postedBy: currentUser.uid },
      (r) => setReferralCount(r.length)
    );

    return () => { unsub1(); unsub2(); unsub3(); };
  }, [currentUser, userProfile]);

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome, {userProfile?.name?.split(" ")[0] ?? "Alumni"}!
          </h2>
          <p className="text-muted-foreground">Here's an overview of your network activity.</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAlumni}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Active alumni</span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Connections</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{connections.length}</div>
                <p className="text-xs text-muted-foreground mt-1">In your network</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mentorship Sessions</CardTitle>
                <Briefcase className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sessionCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Total sessions</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Referrals Posted</CardTitle>
                <MessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{referralCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Jobs you've shared</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* My Connections */}
            <Card className="col-span-4 border-border shadow-sm">
              <CardHeader>
                <CardTitle>My Network</CardTitle>
                <CardDescription>Your accepted connections.</CardDescription>
              </CardHeader>
              <CardContent>
                {connections.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No connections yet. Start connecting with students!</p>
                ) : (
                  <div className="space-y-4">
                    {connections.slice(0, 5).map((conn) => {
                      const uid = conn.requesterId === currentUser?.uid ? conn.recipientId : conn.requesterId;
                      const p = connProfiles[uid];
                      return (
                        <div key={conn.id} className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {p ? initials(p.name) : "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{p?.name ?? uid}</p>
                            <p className="text-xs text-muted-foreground">{p?.occupation}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">{p?.role ?? "user"}</Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Signups */}
            <Card className="col-span-3 border-border shadow-sm">
              <CardHeader>
                <CardTitle>Recent Alumni</CardTitle>
                <CardDescription>Newest members in the network.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentUsers.map((person) => (
                    <div key={person.uid} className="flex items-center">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {initials(person.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{person.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {person.occupation}{person.company ? ` at ${person.company}` : ""}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge variant="secondary" className="font-normal text-xs">
                          {person.createdAt
                            ? formatDistanceToNow(person.createdAt, { addSuffix: true })
                            : "New"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}