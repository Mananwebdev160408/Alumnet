import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Loader2, Calendar as CalendarIcon, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { getUsers, subscribeToSessions } from "@/lib/firestoreService";
import type { UserProfile, Session } from "@/lib/types";
import { formatDistanceToNow, format } from "date-fns";

export default function Mentorship() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<UserProfile[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [mentorProfiles, setMentorProfiles] = useState<Record<string, UserProfile>>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getUsers({ isMentor: true }).then((list) => {
      setMentors(list.filter((u) => u.uid !== currentUser.uid));
      setLoading(false);
    });

    const unsub = subscribeToSessions(currentUser.uid, "student", async (s) => {
      setSessions(s);
      // Fetch mentor profiles
      const uids = new Set(s.map((sess) => sess.mentorId));
      const fetched: Record<string, UserProfile> = {};
      await Promise.all(
        Array.from(uids).map(async (uid) => {
          const p = await import("@/lib/firestoreService").then((m) => m.getUserProfile(uid));
          if (p) fetched[uid] = p;
        })
      );
      setMentorProfiles((prev) => ({ ...prev, ...fetched }));
    });
    return unsub;
  }, [currentUser]);

  const activeSessions = sessions.filter((s) => s.status === "confirmed" || s.status === "pending");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  const filteredMentors = mentors.filter(
    (m) =>
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      (m.company && m.company.toLowerCase().includes(search.toLowerCase()))
  );

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
    <div className="flex-1 p-8 pt-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Mentorship Hub</h2>
          <p className="text-muted-foreground">Find a mentor or give back to the community.</p>
        </div>
      </div>

      <Tabs defaultValue="find" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="find" className="px-6">Find a Mentor</TabsTrigger>
          <TabsTrigger value="my-mentorships" className="px-6">
            My Sessions ({sessions.length})
          </TabsTrigger>
        </TabsList>

        {/* Find a Mentor */}
        <TabsContent value="find" className="space-y-6">
          <Card className="border-border shadow-sm bg-primary/5 border-primary/20">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold">What are you looking to learn?</h3>
                <p className="text-muted-foreground text-sm">
                  Search by skill, company, or name to find the perfect mentor.
                </p>
              </div>
              <div className="w-full md:w-96 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="e.g. System Design, Product Management..."
                  className="pl-9 bg-background h-12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {search ? `Results for "${search}"` : "Available Mentors"}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredMentors.length} mentors)
              </span>
            </h3>
            {filteredMentors.length === 0 ? (
              <Card className="border-border shadow-sm py-12">
                <CardContent className="flex flex-col items-center text-center">
                  <Star className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold">No mentors found</h3>
                  <p className="text-muted-foreground text-sm mt-1">Try a different search term.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMentors.map((mentor) => (
                  <Card key={mentor.uid} className="border border-border flex flex-col hover:border-primary/50 transition-colors shadow-sm">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {initials(mentor.name)}
                          </AvatarFallback>
                        </Avatar>
                        {mentor.openToMentor ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">Waitlist</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {mentor.occupation}{mentor.company ? ` at ${mentor.company}` : ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4 flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.skills.slice(0, 3).map((exp) => (
                          <Badge key={exp} variant="secondary" className="font-normal text-xs">{exp}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 border-t border-border mt-auto p-4 bg-muted/20 gap-2">
                      <Button
                        className="w-full bg-background"
                        variant="outline"
                        asChild
                      >
                        <Link to={`/student/alumni/${mentor.uid}`}>View Profile</Link>
                      </Button>
                      {mentor.openToMentor && (
                        <Button
                          className="w-full"
                          asChild
                        >
                          <Link to={`/student/mentorship/book/${mentor.uid}`}>Book Session</Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* My Sessions */}
        <TabsContent value="my-mentorships" className="space-y-6">
          {sessions.length === 0 ? (
            <Card className="border-border shadow-sm py-12">
              <CardContent className="flex flex-col items-center text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No sessions yet</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Book a session with one of our mentors to get started.
                </p>
                <Button className="mt-4" variant="outline">Explore Mentors</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sessions.map((sess) => {
                const mentor = mentorProfiles[sess.mentorId];
                const isPast = sess.scheduledAt < new Date();
                const statusColor =
                  sess.status === "confirmed" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                  sess.status === "completed" ? "bg-blue-100 text-blue-800 border-blue-200" :
                  sess.status === "pending" ? "bg-amber-100 text-amber-800 border-amber-200" :
                  "bg-red-100 text-red-800 border-red-200";

                return (
                  <Card key={sess.id} className="border-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center">
                          <Avatar className="h-16 w-16 border border-border">
                            <AvatarFallback className="bg-primary/10 text-primary text-xl">
                              {mentor ? initials(mentor.name) : "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-lg">{mentor?.name ?? "Mentor"}</h4>
                              <Badge variant="secondary" className={`text-xs ${statusColor}`}>
                                {sess.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {mentor?.occupation}{mentor?.company ? ` at ${mentor.company}` : ""}
                            </p>
                            {sess.notes && (
                              <p className="text-xs text-muted-foreground mt-1 italic">"{sess.notes}"</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/${userProfile?.role}/messages`}>
                              <MessageSquare className="mr-1 h-4 w-4" /> Message
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-muted/30 rounded-lg flex items-center justify-between border border-border">
                        <div className="flex items-center text-sm">
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {isPast ? "Was scheduled for" : "Scheduled for"}:
                          </span>
                          <span className="ml-2 text-muted-foreground">
                            {format(sess.scheduledAt, "MMMM d, yyyy 'at' h:mm a")}
                            {" "}({formatDistanceToNow(sess.scheduledAt, { addSuffix: true })})
                          </span>
                        </div>
                        {sess.duration && (
                          <Badge variant="outline">{sess.duration} min</Badge>
                        )}
                      </div>
                      {sess.feedback?.rating && (
                        <div className="mt-3 p-3 bg-muted/20 rounded-lg border border-border">
                          <p className="text-xs font-medium">Your Feedback:</p>
                          <p className="text-sm text-muted-foreground mt-1">⭐ {sess.feedback.rating}/5 — {sess.feedback.comment}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
