import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building, GraduationCap, Calendar, ArrowUpRight, TrendingUp, Loader2, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { subscribeToUsers } from "@/lib/firestoreService";
import type { UserProfile } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

export default function OrgDashboard() {
  const { currentUser, userProfile } = useAuth();
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile?.collegeId) return;

    const unsub = subscribeToUsers({ collegeId: userProfile.collegeId }, (users) => {
      setAllUsers(users);
      setPendingUsers(users.filter((u) => !u.isVerified));
      setLoading(false);
    });
    return unsub;
  }, [userProfile]);

  const alumni = allUsers.filter((u) => u.role === "alumni");
  const students = allUsers.filter((u) => u.role === "student");
  const recentlyVerified = allUsers
    .filter((u) => u.isVerified)
    .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
    .slice(0, 4);

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
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Organization Overview</h2>
          <p className="text-muted-foreground">
            Welcome to {userProfile?.college ?? "your"} alumni management portal.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {pendingUsers.length > 0 && (
            <Button variant="outline" asChild>
              <Link to="/admin/users/verify">
                {pendingUsers.length} Pending Verifications
              </Link>
            </Button>
          )}
          <Button asChild>
            <Link to="/admin/announcements">Post Announcement</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alumni.length}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">{alumni.filter((u) => u.isVerified).length}</span> verified
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.length}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">{students.filter((u) => u.isVerified).length}</span> verified
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${pendingUsers.length > 0 ? "text-amber-600" : ""}`}>
                  {pendingUsers.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {pendingUsers.length > 0 ? (
                    <Link to="/admin/users/verify" className="text-primary underline">
                      Review now
                    </Link>
                  ) : "All clear!"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Building className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allUsers.length}</div>
                <p className="text-xs text-muted-foreground mt-1">across all roles</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Quick Links */}
            <Card className="col-span-4 border-border shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common admin tasks for {userProfile?.college}.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Verify Users", link: "/admin/users/verify", desc: `${pendingUsers.length} pending` },
                    { label: "Manage Users", link: "/admin/users/students", desc: `${allUsers.length} total` },
                    { label: "Post Announcement", link: "/admin/announcements", desc: "Broadcast to all" },
                    { label: "View Events", link: "/admin/events", desc: "Upcoming events" },
                    { label: "Job Board", link: "/admin/jobs", desc: "Alumni referrals" },
                    { label: "Analytics", link: "/admin/analytics", desc: "View insights" },
                  ].map((item) => (
                    <Button key={item.link} variant="outline" className="h-auto flex-col items-start p-4 text-left" asChild>
                      <Link to={item.link}>
                        <span className="font-semibold text-sm">{item.label}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Approvals */}
            <Card className="col-span-3 border-border shadow-sm">
              <CardHeader>
                <CardTitle>Recent Members</CardTitle>
                <CardDescription>Recently added to your network.</CardDescription>
              </CardHeader>
              <CardContent>
                {recentlyVerified.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No verified members yet.</p>
                ) : (
                  <div className="space-y-6">
                    {recentlyVerified.map((person) => (
                      <div key={person.uid} className="flex items-center">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {initials(person.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{person.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {person.role} · {person.branch}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Badge variant="secondary" className="text-xs font-normal">
                            {person.createdAt
                              ? formatDistanceToNow(person.createdAt, { addSuffix: true })
                              : "New"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-border shadow-sm py-12">
            <CardContent className="text-center">
              <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
              <p className="text-muted-foreground mt-1">
                {alumni.length} alumni · {students.length} students · {allUsers.filter((u) => u.isMentor).length} mentors active
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-sm mx-auto">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold">{alumni.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Alumni</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold">{students.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Students</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold">{allUsers.filter((u) => u.isMentor).length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Mentors</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
