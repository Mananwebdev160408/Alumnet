import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Briefcase, MapPin, Building, ExternalLink, Send } from "lucide-react";

export default function Referrals() {
  const jobs = [
    { 
      title: "Senior Frontend Engineer", 
      company: "Vercel", 
      location: "Remote", 
      type: "Full-time", 
      postedBy: "Wade Warren", 
      init: "WW",
      description: "Looking for an experienced frontend engineer to join our core product team. React and Next.js experience is a must."
    },
    { 
      title: "Product Designer", 
      company: "Figma", 
      location: "San Francisco, CA", 
      type: "Full-time", 
      postedBy: "Eleanor Pena", 
      init: "EP",
      description: "Join our design systems team to build the future of design tools. Looking for someone with a strong portfolio in complex SaaS applications."
    },
    { 
      title: "Machine Learning Engineer", 
      company: "OpenAI", 
      location: "San Francisco, CA", 
      type: "Full-time", 
      postedBy: "Esther Howard", 
      init: "EH",
      description: "Help us build safe and beneficial AGI. Strong background in Python, PyTorch, and deep learning architectures."
    },
    { 
      title: "Developer Advocate", 
      company: "Stripe", 
      location: "Remote", 
      type: "Contract", 
      postedBy: "Cameron Williamson", 
      init: "CW",
      description: "We are looking for a developer advocate to help improve our documentation and developer experience."
    },
  ];

  return (
    <div className="flex-1 p-8 pt-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Job Referrals</h2>
          <p className="text-muted-foreground">Find opportunities shared by alumni or post a role.</p>
        </div>
        <Button>Post a Job</Button>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="browse" className="px-6">Browse Roles</TabsTrigger>
          <TabsTrigger value="my-referrals" className="px-6">My Referrals</TabsTrigger>
          <TabsTrigger value="posted" className="px-6">Posted Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search bar */}
          <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-2xl flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search job title, company, or keywords..." className="pl-9 bg-background" />
              </div>
              <Button className="shrink-0">Search</Button>
            </div>
          </div>

          {/* Job List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <Card key={i} className="border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors group">
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
                  <Button className="w-full flex-1">
                    <Send className="mr-2 h-4 w-4" /> Request Referral
                  </Button>
                  <Button variant="outline" className="w-full flex-1 bg-background">
                    <ExternalLink className="mr-2 h-4 w-4" /> View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-referrals">
           <Card className="border-border shadow-sm py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No Referrals Requested</h3>
              <p className="text-muted-foreground max-w-sm mt-1">
                You haven't requested any referrals yet. Browse the available roles to find your next opportunity.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posted">
          <Card className="border-border shadow-sm py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No Jobs Posted</h3>
              <p className="text-muted-foreground max-w-sm mt-1">
                You haven't posted any jobs. Share opportunities from your company to help fellow alumni.
              </p>
              <Button variant="outline" className="mt-6">Post a Job</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
