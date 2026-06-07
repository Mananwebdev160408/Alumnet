import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Star, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { subscribeToSessions, updateSessionStatus, getUserProfile } from "@/lib/firestoreService";
import type { Session, UserProfile } from "@/lib/types";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";

export default function AlumniMentorship() {
  const { currentUser, userProfile } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [studentProfiles, setStudentProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = subscribeToSessions(currentUser.uid, "alumni", async (sess) => {
      setSessions(sess);
      setLoading(false);
      // Fetch student profiles
      const uids = new Set(sess.map((s) => s.studentId));
      const fetched: Record<string, UserProfile> = {};
      await Promise.all(
        Array.from(uids).map(async (uid) => {
          const p = await getUserProfile(uid);
          if (p) fetched[uid] = p;
        })
      );
      setStudentProfiles((prev) => ({ ...prev, ...fetched }));
    });
    return unsub;
  }, [currentUser]);

  const pendingSessions = sessions.filter((s) => s.status === "pending");
  const confirmedSessions = sessions.filter((s) => s.status === "confirmed");
  const pastSessions = sessions.filter((s) =>
    s.status === "completed" || s.status === "cancelled"
  );

  const handleAccept = async (sessionId: string) => {
    setActionLoading(sessionId);
    try {
      await updateSessionStatus(sessionId, "confirmed");
      toast.success("Session confirmed! Student has been notified.");
    } catch {
      toast.error("Failed to confirm session.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (sessionId: string) => {
    setActionLoading(sessionId);
    try {
      await updateSessionStatus(sessionId, "cancelled");
      toast.success("Session declined.");
    } catch {
      toast.error("Failed to decline session.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async (sessionId: string) => {
    setActionLoading(sessionId);
    try {
      await updateSessionStatus(sessionId, "completed");
      toast.success("Session marked as completed!");
    } catch {
      toast.error("Failed to update session.");
    } finally {
      setActionLoading(null);
    }
  };

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
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Mentorship Management</h2>
          <p className="text-muted-foreground">Manage student booking requests and view session history.</p>
        </div>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1.5">
          {userProfile?.isMentor ? "✓ Mentor Profile Active" : "Not a Mentor"}
        </Badge>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="requests" className="px-6 uppercase text-xs font-bold tracking-wider relative">
            Booking Requests
            {pendingSessions.length > 0 && (
              <Badge variant="destructive" className="ml-2 rounded-none text-[9px] px-1.5 py-0.5">
                {pendingSessions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="px-6 uppercase text-xs font-bold tracking-wider">
            Confirmed ({confirmedSessions.length})
          </TabsTrigger>
          <TabsTrigger value="sessions" className="px-6 uppercase text-xs font-bold tracking-wider">
            Past Sessions ({pastSessions.length})
          </TabsTrigger>
        </TabsList>

        {/* Pending Requests */}
        <TabsContent value="requests" className="space-y-6">
          {pendingSessions.length === 0 ? (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium rounded-lg">
              No pending booking requests.
            </div>
          ) : (
            pendingSessions.map((sess) => {
              const student = studentProfiles[sess.studentId];
              return (
                <Card key={sess.id} className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
                  <CardHeader className="border-b border-border bg-muted/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 border border-border flex items-center justify-center bg-primary/10 text-primary font-bold">
                          {student ? initials(student.name) : "?"}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase">{student?.name ?? "Student"}</h4>
                          <p className="text-xs text-muted-foreground">
                            {student?.branch} — {student?.college}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-primary text-primary font-bold text-[10px] uppercase py-1 px-2 shrink-0">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {format(sess.scheduledAt, "MMM d, yyyy 'at' h:mm a")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Session Agenda / Notes</span>
                      <p className="text-sm font-semibold">{sess.notes || "No agenda provided."}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Duration: <span className="font-semibold">{sess.duration ?? 60} minutes</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 border-t border-border flex justify-end gap-2 bg-muted/10">
                    <Button
                      variant="outline"
                      className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-xs font-bold px-4"
                      disabled={actionLoading === sess.id}
                      onClick={() => handleDecline(sess.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" /> Decline
                    </Button>
                    <Button
                      className="rounded-none border-2 border-border bg-primary hover:bg-primary/95 text-white uppercase text-xs font-bold px-4"
                      disabled={actionLoading === sess.id}
                      onClick={() => handleAccept(sess.id)}
                    >
                      {actionLoading === sess.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      )}
                      Accept Session
                    </Button>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Confirmed */}
        <TabsContent value="confirmed" className="space-y-6">
          {confirmedSessions.length === 0 ? (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium rounded-lg">
              No confirmed sessions yet.
            </div>
          ) : (
            confirmedSessions.map((sess) => {
              const student = studentProfiles[sess.studentId];
              const isPast = sess.scheduledAt < new Date();
              return (
                <Card key={sess.id} className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 border border-border flex items-center justify-center bg-primary/10 text-primary font-bold">
                          {student ? initials(student.name) : "?"}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase">{student?.name ?? "Student"}</h4>
                          <p className="text-xs text-muted-foreground">
                            {format(sess.scheduledAt, "MMM d, yyyy 'at' h:mm a")}
                            {" "}({formatDistanceToNow(sess.scheduledAt, { addSuffix: true })})
                          </p>
                        </div>
                      </div>
                      {isPast && (
                        <Button
                          size="sm"
                          className="rounded-none bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-border uppercase text-[10px] font-bold"
                          disabled={actionLoading === sess.id}
                          onClick={() => handleComplete(sess.id)}
                        >
                          {actionLoading === sess.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                          )}
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Past Sessions */}
        <TabsContent value="sessions" className="space-y-6">
          {pastSessions.length === 0 ? (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium rounded-lg">
              No past sessions yet.
            </div>
          ) : (
            pastSessions.map((sess) => {
              const student = studentProfiles[sess.studentId];
              return (
                <Card key={sess.id} className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
                  <CardHeader className="border-b border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm uppercase">{student?.name ?? "Student"}</h4>
                        <p className="text-xs text-muted-foreground">
                          Session Date: {format(sess.scheduledAt, "MMM d, yyyy")}
                        </p>
                      </div>
                      <Badge variant={sess.status === "completed" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                        {sess.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {sess.feedback?.rating && (
                      <div>
                        <div className="flex gap-0.5 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < (sess.feedback.rating ?? 0) ? "text-amber-500 fill-amber-500" : "text-muted"}`} />
                          ))}
                        </div>
                        {sess.feedback.comment && (
                          <div className="p-3 bg-muted/25 border border-border/50 text-sm italic">
                            "{sess.feedback.comment}"
                          </div>
                        )}
                      </div>
                    )}
                    {sess.notes && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Session Notes</span>
                        <p className="text-sm">{sess.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
