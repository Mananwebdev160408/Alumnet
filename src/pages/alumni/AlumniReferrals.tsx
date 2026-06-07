import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Send, Download, FileText, ChevronRight, CheckCircle2, MessageSquare, AlertCircle, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AlumniReferrals() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("queue");

  // Mock referral queue
  const [referralRequests, setReferralRequests] = useState([
    {
      id: 1,
      studentName: "James Miller",
      role: "Backend Engineer Intern",
      company: "Figma",
      resumeName: "james_miller_resume.pdf",
      pitch: "I have built three full-stack projects using Node.js and have contributed to open source libraries. I would love to join the core team at Figma.",
      date: "June 5, 2026",
      status: "Pending", // Pending, Accepted, Declined, Referred
      init: "JM"
    }
  ]);

  // Mock job postings
  const [myJobs, setMyJobs] = useState([
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Figma",
      status: "Live",
      applications: 14,
      date: "May 20, 2026"
    },
    {
      id: 2,
      title: "Design Systems Intern",
      company: "Figma",
      status: "Pending Approval",
      applications: 0,
      date: "June 6, 2026"
    }
  ]);

  // Form State for Posting Job
  const [postJobData, setPostJobData] = useState({
    title: "",
    type: "Full-time",
    location: "Remote",
    description: "",
    deadline: ""
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setReferralRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast({
      title: "Status Updated",
      description: `Referral request marked as ${newStatus}.`
    });
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postJobData.title.trim() || !postJobData.description.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill all required inputs.",
        variant: "destructive"
      });
      return;
    }

    const newJob = {
      id: myJobs.length + 1,
      title: postJobData.title,
      company: "Figma",
      status: "Pending Approval",
      applications: 0,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    setMyJobs(prev => [...prev, newJob]);
    toast({
      title: "Job Submitted",
      description: "Submitted for College Admin approval."
    });
    setActiveTab("postings");
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Referral Portal</h2>
          <p className="text-muted-foreground">Manage your student referral queue, post openings at your company, or review past jobs.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="queue" className="px-6 uppercase text-xs font-bold tracking-wider relative">
            Referral Queue
            {referralRequests.filter(r => r.status === "Pending").length > 0 && (
              <Badge variant="destructive" className="ml-2 rounded-none border border-border text-[9px] px-1.5 py-0.5">
                {referralRequests.filter(r => r.status === "Pending").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="post" className="px-6 uppercase text-xs font-bold tracking-wider">Post a Job</TabsTrigger>
          <TabsTrigger value="postings" className="px-6 uppercase text-xs font-bold tracking-wider">My Job Postings</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          {referralRequests.map((req) => (
            <Card key={req.id} className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
              <CardHeader className="border-b border-border bg-muted/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 border border-border flex items-center justify-center bg-primary/10 text-primary font-bold">
                      {req.init}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">{req.studentName}</h4>
                      <p className="text-xs text-muted-foreground">Requested: {req.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground">STATUS:</span>
                    <Badge variant={req.status === "Pending" ? "outline" : "secondary"} className={`uppercase text-[10px] ${req.status === "Referred" ? "bg-emerald-100 text-emerald-800" : ""}`}>
                      {req.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Target Job Title</span>
                    <p className="text-sm font-semibold uppercase">{req.role}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Resume PDF</span>
                    <a href="#" className="inline-flex items-center text-xs font-bold text-primary hover:underline gap-1">
                      <FileText className="h-4 w-4" /> {req.resumeName} <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
                <div className="space-y-1 pt-2 border-t border-border/10">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Student Pitch</span>
                  <p className="text-sm leading-relaxed">{req.pitch}</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border flex justify-end gap-2 bg-muted/10">
                {req.status === "Pending" ? (
                  <>
                    <Button size="sm" variant="outline" className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-[10px] font-bold" onClick={() => handleStatusChange(req.id, "Declined")}>
                      Decline
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-none border-2 border-border uppercase text-[10px] font-bold">
                      <MessageSquare className="h-4 w-4 mr-1" /> Chat
                    </Button>
                    <Button size="sm" className="rounded-none border-2 border-border bg-primary hover:bg-primary/95 text-white uppercase text-[10px] font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none" onClick={() => handleStatusChange(req.id, "Accepted")}>
                      Accept Request
                    </Button>
                  </>
                ) : req.status === "Accepted" ? (
                  <Button size="sm" className="rounded-none border-2 border-border bg-emerald-600 hover:bg-emerald-700 text-white uppercase text-[10px] font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none" onClick={() => handleStatusChange(req.id, "Referred")}>
                    <CheckCircle2 className="h-4 w-4 mr-1.5" /> Mark As Referred
                  </Button>
                ) : (
                  <span className="text-xs font-bold text-muted-foreground italic">No further actions required.</span>
                )}
              </CardFooter>
            </Card>
          ))}
          {referralRequests.length === 0 && (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium">
              Your referral queue is empty.
            </div>
          )}
        </TabsContent>

        <TabsContent value="post" className="space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">Post New Opportunity</CardTitle>
              <CardDescription>Share a job or internship at your current employer with the student directory.</CardDescription>
            </CardHeader>
            <form onSubmit={handlePostSubmit}>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Job Title *</span>
                    <Input placeholder="e.g. Frontend Engineer" value={postJobData.title} onChange={e => setPostJobData({ ...postJobData, title: e.target.value })} required className="rounded-none border-2 border-border" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Company (Auto-filled)</span>
                    <Input value="Figma" disabled className="rounded-none border-2 border-border bg-muted/30 font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Employment Type</span>
                    <Select value={postJobData.type} onValueChange={val => setPostJobData({ ...postJobData, type: val })}>
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
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Location</span>
                    <Input placeholder="e.g. Remote, San Francisco, NY" value={postJobData.location} onChange={e => setPostJobData({ ...postJobData, location: e.target.value })} required className="rounded-none border-2 border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Application Deadline *</span>
                  <Input type="date" value={postJobData.deadline} onChange={e => setPostJobData({ ...postJobData, deadline: e.target.value })} required className="rounded-none border-2 border-border" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Job Description *</span>
                  <Textarea placeholder="Detail the duties, project stack, experience level required, and interview stages..." value={postJobData.description} onChange={e => setPostJobData({ ...postJobData, description: e.target.value })} required className="rounded-none border-2 border-border min-h-[150px] resize-none" />
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border flex justify-end">
                <Button type="submit" className="bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold">
                  <PlusCircle className="mr-2 h-4.5 w-4.5" /> Submit For Approval
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="postings" className="space-y-6">
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
                    <th className="px-6 py-4">Date Added</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-bold uppercase">{job.title}</td>
                      <td className="px-6 py-4 font-semibold text-muted-foreground">{job.company}</td>
                      <td className="px-6 py-4 font-bold">{job.applications}</td>
                      <td className="px-6 py-4 text-muted-foreground">{job.date}</td>
                      <td className="px-6 py-4">
                        <Badge variant={job.status === "Live" ? "secondary" : "outline"} className={`uppercase text-[9px] ${job.status === "Live" ? "bg-emerald-100 text-emerald-800" : "bg-amber-50 text-amber-700 border-amber-250"}`}>
                          {job.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
