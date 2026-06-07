import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Briefcase, Send, FileText, CheckCircle2, MessageSquare, PlusCircle, Loader2, XCircle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import {
  subscribeToReferralRequests,
  subscribeToReferrals,
  createReferral,
  updateReferralRequestStatus,
  updateReferralStatus,
  getUserProfile,
} from "@/lib/firestoreService";
import type { ReferralRequest, Referral, UserProfile } from "@/lib/types";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function AlumniReferrals() {
  const { currentUser, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("queue");
  const [referralRequests, setReferralRequests] = useState<ReferralRequest[]>([]);
  const [myJobs, setMyJobs] = useState<Referral[]>([]);
  const [studentProfiles, setStudentProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [postJobData, setPostJobData] = useState({
    title: "",
    type: "Full-time",
    location: "Remote",
    description: "",
    deadline: "",
    jobUrl: "",
  });

  useEffect(() => {
    if (!currentUser || !userProfile) return;

    const unsub1 = subscribeToReferralRequests({ alumniId: currentUser.uid }, async (reqs) => {
      setReferralRequests(reqs);
      setLoading(false);
      // Fetch student profiles
      const uids = new Set(reqs.map((r) => r.studentId));
      const fetched: Record<string, UserProfile> = {};
      await Promise.all(
        Array.from(uids).map(async (uid) => {
          const p = await getUserProfile(uid);
          if (p) fetched[uid] = p;
        })
      );
      setStudentProfiles((prev) => ({ ...prev, ...fetched }));
    });

    const unsub2 = subscribeToReferrals({ postedBy: currentUser.uid }, (jobs) => {
      setMyJobs(jobs);
    });

    return () => { unsub1(); unsub2(); };
  }, [currentUser, userProfile]);

  const handleStatusChange = async (reqId: string, status: "referred" | "declined") => {
    setActionLoading(reqId);
    try {
      await updateReferralRequestStatus(reqId, status);
      toast.success(`Marked as ${status}.`);
    } catch {
      toast.error("Failed to update status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleJobStatus = async (jobId: string, currentStatus: string) => {
    setActionLoading(jobId);
    try {
      await updateReferralStatus(jobId, currentStatus === "open" ? "closed" : "open");
      toast.success("Job status updated.");
    } catch {
      toast.error("Failed to update.");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postJobData.title.trim() || !postJobData.description.trim() || !currentUser || !userProfile) return;
    setSubmitting(true);
    try {
      await createReferral({
        postedBy: currentUser.uid,
        collegeId: userProfile.collegeId,
        title: postJobData.title,
        company: userProfile.company || "My Company",
        location: postJobData.location,
        employmentType: postJobData.type,
        jobUrl: postJobData.jobUrl,
        deadline: postJobData.deadline ? new Date(postJobData.deadline) : new Date(),
        description: postJobData.description,
        status: "open",
      });
      toast.success("Job posted successfully! Students can now see and request referrals.");
      setPostJobData({ title: "", type: "Full-time", location: "Remote", description: "", deadline: "", jobUrl: "" });
      setActiveTab("postings");
    } catch {
      toast.error("Failed to post job.");
    } finally {
      setSubmitting(false);
    }
  };

  const pendingRequests = referralRequests.filter((r) => r.status === "pending");
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
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Referral Portal</h2>
          <p className="text-muted-foreground">Manage referral requests, post job openings, and review your postings.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="queue" className="px-6 uppercase text-xs font-bold tracking-wider relative">
            Referral Queue
            {pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2 rounded-none text-[9px] px-1.5 py-0.5">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="post" className="px-6 uppercase text-xs font-bold tracking-wider">Post a Job</TabsTrigger>
          <TabsTrigger value="postings" className="px-6 uppercase text-xs font-bold tracking-wider">
            My Postings ({myJobs.length})
          </TabsTrigger>
        </TabsList>

        {/* Referral Queue */}
        <TabsContent value="queue" className="space-y-6">
          {referralRequests.length === 0 ? (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium rounded-lg">
              Your referral queue is empty.
            </div>
          ) : (
            referralRequests.map((req) => {
              const student = studentProfiles[req.studentId];
              return (
                <Card key={req.id} className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
                  <CardHeader className="border-b border-border bg-muted/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 border border-border flex items-center justify-center bg-primary/10 text-primary font-bold">
                          {student ? initials(student.name) : "?"}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase">{student?.name ?? "Student"}</h4>
                          <p className="text-xs text-muted-foreground">
                            {req.createdAt ? formatDistanceToNow(req.createdAt, { addSuffix: true }) : ""}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={req.status === "pending" ? "outline" : "secondary"}
                        className={`uppercase text-[10px] ${
                          req.status === "referred" ? "bg-emerald-100 text-emerald-800" :
                          req.status === "declined" ? "bg-red-100 text-red-800" : ""
                        }`}
                      >
                        {req.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Target Role</span>
                        <p className="text-sm font-semibold uppercase">{req.role}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Company</span>
                        <p className="text-sm font-semibold">{req.company}</p>
                      </div>
                    </div>
                    {req.resumeName && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Resume / Portfolio</span>
                        <p className="text-xs font-semibold flex items-center gap-1 text-primary">
                          <FileText className="h-4 w-4" /> {req.resumeName}
                        </p>
                      </div>
                    )}
                    <div className="space-y-1 pt-2 border-t border-border/10">
                      <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Student Pitch</span>
                      <p className="text-sm leading-relaxed">{req.pitch}</p>
                    </div>
                  </CardContent>
                  {req.status === "pending" && (
                    <CardFooter className="p-6 border-t border-border flex justify-end gap-2 bg-muted/10">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-[10px] font-bold"
                        disabled={actionLoading === req.id}
                        onClick={() => handleStatusChange(req.id, "declined")}
                      >
                        <XCircle className="mr-1 h-4 w-4" /> Decline
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-none border-2 border-border bg-primary hover:bg-primary/95 text-white uppercase text-[10px] font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none"
                        disabled={actionLoading === req.id}
                        onClick={() => handleStatusChange(req.id, "referred")}
                      >
                        {actionLoading === req.id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                        )}
                        Mark as Referred
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Post a Job */}
        <TabsContent value="post" className="space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">Post New Opportunity</CardTitle>
              <CardDescription>Share a job or internship at your company with the student directory.</CardDescription>
            </CardHeader>
            <form onSubmit={handlePostSubmit}>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Job Title *</Label>
                    <Input
                      placeholder="e.g. Frontend Engineer"
                      value={postJobData.title}
                      onChange={(e) => setPostJobData({ ...postJobData, title: e.target.value })}
                      required
                      className="rounded-none border-2 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Company (auto-filled)</Label>
                    <Input
                      value={userProfile?.company || "Your Company"}
                      disabled
                      className="rounded-none border-2 border-border bg-muted/30 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Employment Type</Label>
                    <Select value={postJobData.type} onValueChange={(val) => setPostJobData({ ...postJobData, type: val })}>
                      <SelectTrigger className="rounded-none border-2 border-border bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Location</Label>
                    <Input
                      placeholder="e.g. Remote, San Francisco"
                      value={postJobData.location}
                      onChange={(e) => setPostJobData({ ...postJobData, location: e.target.value })}
                      className="rounded-none border-2 border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Application Deadline</Label>
                    <Input
                      type="date"
                      value={postJobData.deadline}
                      onChange={(e) => setPostJobData({ ...postJobData, deadline: e.target.value })}
                      className="rounded-none border-2 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Job URL (optional)</Label>
                    <Input
                      placeholder="https://jobs.company.com/..."
                      value={postJobData.jobUrl}
                      onChange={(e) => setPostJobData({ ...postJobData, jobUrl: e.target.value })}
                      className="rounded-none border-2 border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Job Description *</Label>
                  <Textarea
                    placeholder="Detail the duties, project stack, experience level, and interview stages..."
                    value={postJobData.description}
                    onChange={(e) => setPostJobData({ ...postJobData, description: e.target.value })}
                    required
                    className="rounded-none border-2 border-border min-h-[150px] resize-none"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold"
                >
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                  Post Job
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* My Postings */}
        <TabsContent value="postings" className="space-y-6">
          {myJobs.length === 0 ? (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium rounded-lg">
              You haven't posted any jobs yet. Share opportunities from your company!
            </div>
          ) : (
            <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
              <CardHeader className="border-b border-border">
                <CardTitle className="uppercase text-sm tracking-wider">Posted Positions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-bold">
                    <tr>
                      <th className="px-6 py-4">Job Title</th>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Applications</th>
                      <th className="px-6 py-4">Posted</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {myJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 font-bold uppercase">{job.title}</td>
                        <td className="px-6 py-4 font-semibold text-muted-foreground">{job.company}</td>
                        <td className="px-6 py-4 font-bold">{job.applications?.length ?? 0}</td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">
                          {job.createdAt ? formatDistanceToNow(job.createdAt, { addSuffix: true }) : ""}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="secondary"
                            className={`uppercase text-[9px] ${
                              job.status === "open"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {job.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-none border-2 border-border uppercase text-[10px] font-bold"
                            disabled={actionLoading === job.id}
                            onClick={() => handleToggleJobStatus(job.id, job.status)}
                          >
                            {actionLoading === job.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : job.status === "open" ? "Close" : "Reopen"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
