import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Briefcase, MapPin, Building, Calendar, ArrowLeft, ArrowUpRight, CheckCircle2, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentJobs() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const mockJobs = [
    { 
      id: 1,
      title: "Backend Engineer Intern", 
      company: "Google", 
      location: "Mountain View, CA", 
      type: "Internship", 
      postedBy: "Sarah Chen", 
      init: "SC",
      deadline: "July 15, 2026",
      description: "We are seeking a Backend Engineer Intern to help design and implement core infrastructure components for our cloud division. Strong programming skills in Java, Go, or C++ and familiarity with distributed systems are desired.",
      requirements: [
        "Currently pursuing a BS, MS, or PhD in Computer Science or related fields.",
        "Experience with Go, Java, or C++.",
        "Familiarity with database technologies (SQL/NoSQL) and RESTful API development.",
        "Prior internship experience is a plus."
      ]
    },
    { 
      id: 2,
      title: "Frontend Developer", 
      company: "Vercel", 
      location: "Remote", 
      type: "Full-time", 
      postedBy: "Wade Warren", 
      init: "WW",
      deadline: "June 30, 2026",
      description: "Join the team building the future of web development. You will contribute to our core open-source frameworks and develop high-fidelity user experiences for Vercel's cloud deployment interface.",
      requirements: [
        "3+ years of professional web development experience.",
        "Proficiency in React, Next.js, and TypeScript.",
        "Strong understanding of CSS systems (Tailwind, CSS Modules).",
        "Experience with UI testing frameworks."
      ]
    },
    { 
      id: 3,
      title: "Associate Product Manager", 
      company: "Stripe", 
      location: "San Francisco, CA", 
      type: "Full-time", 
      postedBy: "Eleanor Pena", 
      init: "EP",
      deadline: "August 1, 2026",
      description: "Help build the financial infrastructure of the internet. In this role, you will work closely with engineering, design, and operations teams to launch and optimize payment processing systems.",
      requirements: [
        "Bachelors degree in Computer Science, Business, or a technical discipline.",
        "Strong analytical capability and problem-solving skills.",
        "Exceptional communication skills.",
        "Familiarity with payments infrastructure is a plus."
      ]
    }
  ];

  const [appliedJobs, setAppliedJobs] = useState<number[]>([1]);

  const handleApply = (jobId: number) => {
    if (appliedJobs.includes(jobId)) return;
    
    setAppliedJobs(prev => [...prev, jobId]);
    toast({
      title: "Application Submitted",
      description: "Your AlumNet profile & resume have been sent to the posting alumnus."
    });
  };

  const selectedJob = mockJobs.find(job => job.id === selectedJobId);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Job Board</h2>
          <p className="text-muted-foreground">Find exclusive job opportunities shared by verified alumni.</p>
        </div>
      </div>

      {selectedJobId !== null && selectedJob ? (
        <div className="space-y-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedJobId(null)}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3" /> Back to Board
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
                <CardHeader className="border-b border-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="border-primary text-primary font-bold text-[10px] uppercase tracking-wider mb-2">
                        {selectedJob.type}
                      </Badge>
                      <CardTitle className="text-3xl font-black uppercase">{selectedJob.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm font-semibold text-muted-foreground">
                        <span className="flex items-center text-foreground uppercase"><Building className="mr-1 h-4 w-4 text-primary" /> {selectedJob.company}</span>
                        <span className="flex items-center"><MapPin className="mr-1 h-4 w-4 text-primary" /> {selectedJob.location}</span>
                        <span className="flex items-center"><Calendar className="mr-1 h-4 w-4 text-primary" /> Apply by: {selectedJob.deadline}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Job Description</h3>
                    <p className="text-sm leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border/10">
                    <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Requirements</h3>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-muted/20">
                <CardHeader className="border-b border-border">
                  <CardTitle className="uppercase text-sm tracking-wider">Poster Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{selectedJob.init}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-sm uppercase">Posted by {selectedJob.postedBy}</h4>
                      <p className="text-xs text-muted-foreground">Alumni Contact at {selectedJob.company}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/10">
                    Applying to this position will submit your resume and profile directly to the alumnus, who can refer you or schedule a call.
                  </p>
                </CardContent>
                <CardFooter className="p-6 border-t border-border">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    onClick={() => handleApply(selectedJob.id)}
                    disabled={appliedJobs.includes(selectedJob.id)}
                  >
                    {appliedJobs.includes(selectedJob.id) ? (
                      <span className="flex items-center justify-center gap-1"><CheckCircle2 className="h-4 w-4" /> APPLIED</span>
                    ) : (
                      <span>ONE-CLICK APPLY</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="browse" onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/50 p-1 mb-6">
            <TabsTrigger value="browse" className="px-6 uppercase text-xs font-bold tracking-wider">Browse Roles</TabsTrigger>
            <TabsTrigger value="applications" className="px-6 uppercase text-xs font-bold tracking-wider">My Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full max-w-2xl flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by job title, company, location..." 
                    className="pl-9 bg-background" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockJobs
                .filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((job) => (
                  <Card key={job.id} className="border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors group">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">{job.title}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground gap-3">
                            <span className="flex items-center font-medium text-foreground"><Building className="mr-1 h-3.5 w-3.5"/> {job.company}</span>
                            <span className="flex items-center"><MapPin className="mr-1 h-3.5 w-3.5"/> {job.location}</span>
                            <span className="flex items-center"><Briefcase className="mr-1 h-3.5 w-3.5"/> {job.type}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
                      <div className="flex items-center pt-4 border-t border-border mt-auto">
                        <Avatar className="h-8 w-8 mr-3 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">{job.init}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium leading-none">Posted by {job.postedBy}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Alumni Connection</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/20 border-t border-border p-4 gap-3">
                      <Button 
                        className="w-full flex-1"
                        onClick={() => handleApply(job.id)}
                        disabled={appliedJobs.includes(job.id)}
                      >
                        {appliedJobs.includes(job.id) ? "Applied" : "Apply Now"}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full flex-1 bg-background"
                        onClick={() => setSelectedJobId(job.id)}
                      >
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border">
                <CardTitle className="uppercase text-sm tracking-wider">Submitted Applications</CardTitle>
                <CardDescription>Review the status of jobs you applied for through the network.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {appliedJobs.map(jobId => {
                    const job = mockJobs.find(j => j.id === jobId);
                    if (!job) return null;
                    return (
                      <div key={job.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 border border-primary/20 text-primary shrink-0">
                            <Briefcase className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg leading-tight uppercase">{job.title}</h4>
                            <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">{job.company}</p>
                            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center"><MapPin className="mr-1 h-3 w-3" /> {job.location}</span>
                              <span className="flex items-center"><Calendar className="mr-1 h-3 w-3" /> Applied June 7, 2026</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50 font-bold uppercase text-[10px] py-1 px-3">
                            <UserCheck className="h-3 w-3 mr-1" /> Shortlisted
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedJobId(job.id)}>View details</Button>
                        </div>
                      </div>
                    );
                  })}
                  {appliedJobs.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground text-sm">
                      You haven't applied to any job postings yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
