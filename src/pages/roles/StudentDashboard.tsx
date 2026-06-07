import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { getUsers, subscribeToSessions, subscribeToReferrals } from "@/lib/firestoreService";
import type { UserProfile, Session, Referral } from "@/lib/types";

export default function StudentDashboard() {
  const { currentUser, userProfile } = useAuth();
  const [mentors, setMentors] = useState<UserProfile[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [alumniCount, setAlumniCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !userProfile) return;

    // Fetch recommended mentors
    getUsers({ isMentor: true, limitCount: 3 }).then((mentorList) => {
      setMentors(mentorList.filter((m) => m.uid !== currentUser.uid));
      setLoading(false);
    });

    // Fetch total alumni count
    getUsers({ role: "alumni" }).then((list) => setAlumniCount(list.length));

    // Real-time sessions
    const unsub1 = subscribeToSessions(currentUser.uid, "student", (s) => setSessions(s));

    // Real-time referrals
    const unsub2 = subscribeToReferrals(
      { collegeId: userProfile.collegeId, status: "open" },
      (r) => setReferrals(r)
    );

    return () => { unsub1(); unsub2(); };
  }, [currentUser, userProfile]);

  const activeSessions = sessions.filter((s) =>
    ["confirmed", "pending"].includes(s.status)
  );

  const mentorStatus = activeSessions.length > 0
    ? `${activeSessions.length} active`
    : "Not Assigned";

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
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {userProfile?.name?.split(" ")[0] ?? "Student"}!
          </h2>
          <p className="text-muted-foreground">Here are resources to jumpstart your career.</p>
        </div>
        <Button asChild>
          <Link to="/student/alumni">Find a Mentor <GraduationCap className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alumni in Network</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alumniCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Available to connect</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referrals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Jobs posted by alumni</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Sessions</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeSessions.length} upcoming
            </p>
          </CardContent>
        </Card>

        <Card className={`border-border shadow-sm ${activeSessions.length > 0 ? "border-primary/20 bg-primary/5" : ""}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${activeSessions.length > 0 ? "text-primary" : ""}`}>
              Mentorship Status
            </CardTitle>
            <BookOpen className={`h-4 w-4 ${activeSessions.length > 0 ? "text-primary" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${activeSessions.length > 0 ? "text-primary" : ""}`}>
              {mentorStatus}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeSessions.length > 0 ? "Sessions booked" : "Find a mentor today"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recommended Mentors */}
        <Card className="col-span-4 border-border shadow-sm">
          <CardHeader>
            <CardTitle>Recommended Mentors</CardTitle>
            <CardDescription>Alumni who are accepting new mentees.</CardDescription>
          </CardHeader>
          <CardContent>
            {mentors.length === 0 ? (
              <p className="text-sm text-muted-foreground">No mentors available right now.</p>
            ) : (
              <div className="space-y-6">
                {mentors.map((mentor) => (
                  <div key={mentor.uid} className="flex items-center">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {initials(mentor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{mentor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {mentor.occupation}{mentor.company ? ` at ${mentor.company}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {mentor.skills.slice(0, 1).map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs font-normal">{s}</Badge>
                      ))}
                      <Button variant="ghost" size="sm" className="text-xs" asChild>
                        <Link to={`/student/alumni/${mentor.uid}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="col-span-3 border-border shadow-sm">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Action items to maximize your AlumNet experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-2 p-3 border border-border rounded-md bg-muted/20">
                <h4 className="text-sm font-semibold">Complete your profile</h4>
                <p className="text-xs text-muted-foreground">
                  Add your major, graduation year, and career interests.
                </p>
                <Button variant="link" className="p-0 h-auto justify-start text-xs text-primary" asChild>
                  <Link to="/student/profile">Go to Profile <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </div>
              <div className="flex flex-col gap-2 p-3 border border-border rounded-md bg-muted/20">
                <h4 className="text-sm font-semibold">Browse Referrals</h4>
                <p className="text-xs text-muted-foreground">
                  {referrals.length} open referrals posted by alumni in your network.
                </p>
                <Button variant="link" className="p-0 h-auto justify-start text-xs text-primary" asChild>
                  <Link to="/student/referrals">View Jobs <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </div>
              <div className="flex flex-col gap-2 p-3 border border-border rounded-md bg-muted/20">
                <h4 className="text-sm font-semibold">Find a Mentor</h4>
                <p className="text-xs text-muted-foreground">
                  Connect with alumni who are open to mentoring.
                </p>
                <Button variant="link" className="p-0 h-auto justify-start text-xs text-primary" asChild>
                  <Link to="/student/alumni">Browse Alumni <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
