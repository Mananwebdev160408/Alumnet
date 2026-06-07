import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Briefcase, Building, MapPin, Search, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminJobs() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [pendingJobs, setPendingJobs] = useState([
    {
      id: 1,
      title: "Design Systems Intern",
      company: "Figma",
      location: "San Francisco, CA (Hybrid)",
      type: "Internship",
      postedBy: "Eleanor Pena",
      description: "Join the design systems team at Figma to help build tomorrow's design tools.",
      date: "June 7, 2026"
    }
  ]);

  const handleApprove = (id: number, title: string) => {
    setPendingJobs(prev => prev.filter(j => j.id !== id));
    toast({
      title: "Posting Approved",
      description: `"${title}" has been published to the student job board.`
    });
  };

  const handleReject = (id: number, title: string) => {
    setPendingJobs(prev => prev.filter(j => j.id !== id));
    toast({
      title: "Posting Rejected",
      description: `The job posting "${title}" has been rejected. Notification dispatched.`,
      variant: "destructive"
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Job Postings Approval</h2>
          <p className="text-muted-foreground">Review and approve referral job listings requested by alumni before going live.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search job listings by title, company, poster..." 
            className="pl-9 w-full bg-background" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {pendingJobs
          .filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((job) => (
            <Card key={job.id} className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 border border-primary/20 text-primary shrink-0 rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg leading-tight uppercase">{job.title}</h4>
                      <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-wider border-border bg-muted/10 text-foreground">
                        {job.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground mt-1">
                      <span className="flex items-center text-foreground uppercase"><Building className="h-3.5 w-3.5 mr-1 text-primary" /> {job.company}</span>
                      <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1 text-primary" /> {job.location}</span>
                      <span>Posted: {job.date} &mdash; by {job.postedBy}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground/80 mt-3">{job.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 self-end md:self-center">
                  <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-xs font-bold" onClick={() => handleReject(job.id, job.title)}>
                    <XCircle className="h-4 w-4 mr-1.5" /> Reject
                  </Button>
                  <Button size="sm" className="rounded-none border-2 border-border bg-emerald-600 hover:bg-emerald-700 text-white uppercase text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none" onClick={() => handleApprove(job.id, job.title)}>
                    <CheckCircle className="h-4 w-4 mr-1.5" /> Publish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        {pendingJobs.length === 0 && (
          <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium">
            No pending job approvals. Queue is empty.
          </div>
        )}
      </div>
    </div>
  );
}
