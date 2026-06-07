import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Link as LinkIcon, Building, GraduationCap, Mail, MessageSquare, UserPlus, UserCheck, Clock, Loader2, Calendar, Award } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { getUserProfile, getConnectionStatus, sendConnectionRequest, getOrCreateConversation } from "@/lib/firestoreService";
import type { UserProfile } from "@/lib/types";
import { toast } from "sonner";

type ConnStatus = "none" | "pending" | "accepted" | "sent";

export default function AlumniProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [connStatus, setConnStatus] = useState<ConnStatus>("none");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const p = await getUserProfile(id);
        setProfile(p);
        if (currentUser && p) {
          const status = await getConnectionStatus(currentUser.uid, p.uid);
          setConnStatus(status);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, currentUser]);

  const handleConnect = async () => {
    if (!currentUser || !profile) return;
    setActionLoading(true);
    try {
      await sendConnectionRequest(currentUser.uid, profile.uid);
      setConnStatus("sent");
      toast.success(`Connection request sent to ${profile.name}!`);
    } catch {
      toast.error("Failed to send connection request.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleMessage = async () => {
    if (!currentUser || !profile) return;
    setActionLoading(true);
    try {
      const convId = await getOrCreateConversation(currentUser.uid, profile.uid);
      const userRole = userProfile?.role ?? "student";
      navigate(`/${userRole}/messages/${convId}`);
    } catch {
      toast.error("Failed to start chat.");
    } finally {
      setActionLoading(false);
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

  if (!profile) {
    return (
      <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 text-center">
        <h3 className="text-xl font-bold uppercase">User Profile Not Found</h3>
        <p className="text-muted-foreground mt-2">The requested profile does not exist or has been removed.</p>
        <Button asChild className="mt-4 border-2 border-border rounded-none uppercase font-bold text-xs shadow-[2px_2px_0_0_rgba(0,0,0,1)] bg-primary hover:bg-primary/95 text-white">
          <Link to="/directory">Back to Directory</Link>
        </Button>
      </div>
    );
  }

  const ConnectButton = () => {
    if (currentUser?.uid === profile.uid) return null;
    if (connStatus === "accepted") {
      return (
        <Button className="w-full uppercase text-xs font-bold rounded-none border-2 border-border" variant="secondary" disabled>
          <UserCheck className="mr-2 h-4 w-4" /> Connected
        </Button>
      );
    }
    if (connStatus === "sent") {
      return (
        <Button className="w-full uppercase text-xs font-bold rounded-none border-2 border-border" variant="outline" disabled>
          <Clock className="mr-2 h-4 w-4" /> Request Sent
        </Button>
      );
    }
    if (connStatus === "pending") {
      return (
        <Button className="w-full uppercase text-xs font-bold rounded-none border-2 border-border bg-emerald-600 text-white" asChild>
          <Link to="/student/connections">
            Review Request
          </Link>
        </Button>
      );
    }
    return (
      <Button
        className="w-full uppercase text-xs font-bold rounded-none border-2 border-border bg-primary hover:bg-primary/95 text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none"
        onClick={handleConnect}
        disabled={actionLoading}
      >
        {actionLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UserPlus className="mr-2 h-4 w-4" />
        )}
        Connect
      </Button>
    );
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
        <Link to="/student/alumni" className="hover:text-foreground transition-colors">Directory</Link>
        <span>/</span>
        <span className="text-foreground">{profile.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none overflow-hidden bg-card">
            <div className="h-28 bg-muted relative"></div>
            <CardContent className="px-6 pb-6 pt-0 relative">
              <div className="flex justify-between items-end -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-card rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <AvatarFallback className="rounded-none text-2xl font-bold bg-primary/10 text-primary">{initials(profile.name)}</AvatarFallback>
                </Avatar>
                <Badge variant="outline" className="mb-2 uppercase font-black text-[10px] border-primary text-primary bg-primary/5">
                  {profile.role}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold uppercase">{profile.name}</h3>
                <p className="text-muted-foreground font-semibold text-sm">
                  {profile.occupation}{profile.company ? ` at ${profile.company}` : ""}
                </p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <ConnectButton />
                {currentUser?.uid !== profile.uid && (
                  <Button variant="outline" size="icon" className="shrink-0 border-2 border-border rounded-none" onClick={handleMessage} disabled={actionLoading}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {profile.location && (
                  <div className="flex items-center text-sm text-muted-foreground font-semibold">
                    <MapPin className="mr-2 h-4 w-4 text-primary/70" />
                    {profile.location}
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center text-sm text-muted-foreground font-semibold">
                    <Building className="mr-2 h-4 w-4 text-primary/70" />
                    {profile.company}
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground font-semibold">
                  <Mail className="mr-2 h-4 w-4 text-primary/70" />
                  {profile.email}
                </div>
                {profile.linkedin && (
                  <div className="flex items-center text-sm text-muted-foreground font-semibold">
                    <LinkIcon className="mr-2 h-4 w-4 text-primary/70" />
                    <a href={profile.linkedin.startsWith("http") ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{profile.linkedin}</a>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="font-normal text-xs">{skill}</Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No skills listed</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions (Book Mentorship / Request Referral) */}
          {currentUser?.uid !== profile.uid && (profile.isMentor || profile.openToRefer) && (
            <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none p-4 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Quick Actions</h4>
              {profile.isMentor && profile.openToMentor && (
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-none border-2 border-border uppercase font-bold text-xs" asChild>
                  <Link to={`/student/mentorship/book/${profile.uid}`}>Book 1:1 Session</Link>
                </Button>
              )}
              {profile.openToRefer && (
                <Button className="w-full bg-primary hover:bg-primary/95 text-white rounded-none border-2 border-border uppercase font-bold text-xs" asChild>
                  <Link to={`/student/referral/new/${profile.uid}`}>Request Referral</Link>
                </Button>
              )}
            </Card>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle className="uppercase text-sm tracking-wider">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {profile.bio || "No professional biography listed."}
              </p>
            </CardContent>
          </Card>

          {/* Academic Background */}
          <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader>
              <CardTitle className="uppercase text-sm tracking-wider">Academic Record</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-muted border border-border rounded-none shrink-0">
                  <GraduationCap className="h-6 w-6 text-foreground/70" />
                </div>
                <div>
                  <h4 className="text-base font-bold uppercase">{profile.college || "University"}</h4>
                  {profile.branch && <p className="text-sm font-semibold text-foreground/80 mt-0.5">{profile.branch}</p>}
                  {profile.graduationYear > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 mb-3 flex items-center">
                      <Calendar className="mr-1 h-3 w-3" /> Class of {profile.graduationYear}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
