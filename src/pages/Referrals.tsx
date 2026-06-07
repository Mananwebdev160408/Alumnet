import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Briefcase, MapPin, Building, Send, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import {
  subscribeToReferrals,
  subscribeToReferralRequests,
  submitReferralRequest,
  getUserProfile,
} from "@/lib/firestoreService";
import type { Referral, ReferralRequest, UserProfile } from "@/lib/types";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function Referrals() {
  const { currentUser, userProfile } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [myRequests, setMyRequests] = useState<ReferralRequest[]>([]);
  const [posterProfiles, setPosterProfiles] = useState<Record<string, UserProfile>>({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [pitch, setPitch] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser || !userProfile) return;

    const unsub1 = subscribeToReferrals(
      { collegeId: userProfile.collegeId, status: "open" },
      async (refs) => {
        setReferrals(refs);
        setLoading(false);
        // Fetch poster profiles
        const uids = new Set(refs.map((r) => r.postedBy));
        const fetched: Record<string, UserProfile> = {};
        await Promise.all(
          Array.from(uids).map(async (uid) => {
            const p = await getUserProfile(uid);
            if (p) fetched[uid] = p;
          })
        );
        setPosterProfiles((prev) => ({ ...prev, ...fetched }));
      }
    );

    const unsub2 = subscribeToReferralRequests(
      { studentId: currentUser.uid },
      (reqs) => setMyRequests(reqs)
    );

    return () => { unsub1(); unsub2(); };
  }, [currentUser, userProfile]);

  const handleRequestReferral = (ref: Referral) => {
    // Check if already requested
    const existing = myRequests.find((r) => r.referralId === ref.id);
    if (existing) {
      toast.info("You've already requested a referral for this job.");
      return;
    }
    setSelectedReferral(ref);
    setRequestDialogOpen(true);
  };

  const handleSubmitRequest = async () => {
    if (!currentUser || !selectedReferral || !pitch.trim()) return;
    setSubmitting(true);
    try {
      await submitReferralRequest({
        studentId: currentUser.uid,
        referralId: selectedReferral.id,
        alumniId: selectedReferral.postedBy,
        company: selectedReferral.company,
        role: selectedReferral.title,
        resumeName: resumeName || "Attached",
        pitch: pitch.trim(),
        status: "pending",
      });
      toast.success("Referral request submitted!");
      setRequestDialogOpen(false);
      setPitch("");
      setResumeName("");
      setSelectedReferral(null);
    } catch {
      toast.error("Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const filtered = referrals.filter(
    (r) =>
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase())
  );

  const statusIcon = (status: string) => {
    if (status === "referred") return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    if (status === "declined") return <XCircle className="h-4 w-4 text-destructive" />;
    return <Clock className="h-4 w-4 text-amber-500" />;
  };

  const statusLabel = (status: string) => {
    if (status === "referred") return "Referred";
    if (status === "declined") return "Declined";
    return "Pending";
  };

  return (
    <div className="flex-1 p-8 pt-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Job Referrals</h2>
          <p className="text-muted-foreground">Find opportunities shared by alumni in your network.</p>
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="browse" className="px-6">Browse Roles ({referrals.length})</TabsTrigger>
          <TabsTrigger value="my-referrals" className="px-6">
            My Requests ({myRequests.length})
          </TabsTrigger>
        </TabsList>

        {/* Browse */}
        <TabsContent value="browse" className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:max-w-2xl flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search job title, company..."
                  className="pl-9 bg-background"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <Card className="border-border shadow-sm py-12">
              <CardContent className="flex flex-col items-center text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No referrals available</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Check back later — alumni post new opportunities regularly.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((job) => {
                const poster = posterProfiles[job.postedBy];
                const alreadyRequested = myRequests.some((r) => r.referralId === job.id);
                return (
                  <Card key={job.id} className="border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors group">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">
                            {job.title}
                          </CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground gap-3 flex-wrap">
                            <span className="flex items-center font-medium text-foreground">
                              <Building className="mr-1 h-3.5 w-3.5" /> {job.company}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="mr-1 h-3.5 w-3.5" /> {job.location}
                            </span>
                            <span className="flex items-center">
                              <Briefcase className="mr-1 h-3.5 w-3.5" /> {job.employmentType}
                            </span>
                          </div>
                        </div>
                        {alreadyRequested && (
                          <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800 shrink-0">
                            Applied
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
                      <div className="flex items-center pt-4 border-t border-border">
                        <Avatar className="h-8 w-8 mr-3 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {poster ? initials(poster.name) : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium leading-none">Posted by {poster?.name ?? "Alumni"}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {job.createdAt ? formatDistanceToNow(job.createdAt, { addSuffix: true }) : ""}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/20 border-t border-border p-4 gap-3">
                      <Button
                        className="w-full flex-1"
                        onClick={() => handleRequestReferral(job)}
                        disabled={alreadyRequested}
                        variant={alreadyRequested ? "secondary" : "default"}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {alreadyRequested ? "Already Requested" : "Request Referral"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* My Requests */}
        <TabsContent value="my-referrals">
          {myRequests.length === 0 ? (
            <Card className="border-border shadow-sm py-12">
              <CardContent className="flex flex-col items-center text-center">
                <Send className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold">No referrals requested</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Browse available roles to request a referral from an alumnus.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {myRequests.map((req) => (
                <Card key={req.id} className="border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{req.role}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Building className="h-3.5 w-3.5" /> {req.company}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Requested {req.createdAt ? formatDistanceToNow(req.createdAt, { addSuffix: true }) : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {statusIcon(req.status)}
                        <Badge
                          variant="outline"
                          className={
                            req.status === "referred" ? "border-emerald-300 text-emerald-700 bg-emerald-50" :
                            req.status === "declined" ? "border-red-300 text-red-700 bg-red-50" :
                            "border-amber-300 text-amber-700 bg-amber-50"
                          }
                        >
                          {statusLabel(req.status)}
                        </Badge>
                      </div>
                    </div>
                    {req.pitch && (
                      <div className="mt-3 p-3 bg-muted/20 rounded-lg border border-border">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Your pitch:</p>
                        <p className="text-sm">{req.pitch}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Request Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Referral</DialogTitle>
            <DialogDescription>
              {selectedReferral && (
                <>For <strong>{selectedReferral.title}</strong> at <strong>{selectedReferral.company}</strong></>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="resume">Resume / Portfolio Link</Label>
              <Input
                id="resume"
                placeholder="https://your-portfolio.com or resume filename"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pitch">Your Pitch *</Label>
              <Textarea
                id="pitch"
                placeholder="Why are you a great fit for this role? What makes you stand out?"
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitRequest} disabled={!pitch.trim() || submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
