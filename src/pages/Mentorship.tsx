import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, MessageSquare, Calendar as CalendarIcon, Target } from "lucide-react";

export default function Mentorship() {
  const activeMentorships = [
    { name: "Eleanor Pena", role: "Product Designer at Figma", status: "Active", nextMeeting: "Tomorrow, 2:00 PM", init: "EP" },
  ];

  const suggestedMentors = [
    { name: "Robert Fox", role: "Senior Engineer at Stripe", expertise: ["System Design", "Career Growth"], init: "RF", available: true },
    { name: "Kristin Watson", role: "Design Lead at Vercel", expertise: ["UI/UX", "Portfolio Review"], init: "KW", available: true },
    { name: "Cody Fisher", role: "Founder at TechStart", expertise: ["Fundraising", "Leadership"], init: "CF", available: false },
    { name: "Jane Cooper", role: "VP of Engineering at Google", expertise: ["Management", "Scaling"], init: "JC", available: true },
  ];

  return (
    <div className="flex-1 p-8 pt-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Mentorship Hub</h2>
          <p className="text-muted-foreground">Find a mentor or give back to the community.</p>
        </div>
        <Button>Become a Mentor</Button>
      </div>

      <Tabs defaultValue="find" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="find" className="px-6">Find a Mentor</TabsTrigger>
          <TabsTrigger value="my-mentorships" className="px-6">My Mentorships</TabsTrigger>
          <TabsTrigger value="requests" className="px-6">Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-6">
          {/* Search Banner */}
          <Card className="border-border shadow-sm bg-primary/5 border-primary/20">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold">What are you looking to learn?</h3>
                <p className="text-muted-foreground text-sm">Search by skill, industry, or specific company to find the perfect match.</p>
              </div>
              <div className="w-full md:w-96 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="e.g. System Design, Product Management..." className="pl-9 bg-background h-12" />
                <Button className="absolute right-1 top-1 bottom-1 h-auto px-4">Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Mentors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Featured Mentors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedMentors.map((mentor, i) => (
                <Card key={i} className="border border-border flex flex-col hover:border-primary/50 transition-colors shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary">{mentor.init}</AvatarFallback>
                      </Avatar>
                      {mentor.available ? (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">Available</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Waitlist</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription className="line-clamp-1">{mentor.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {mentor.expertise.map((exp, j) => (
                        <Badge key={j} variant="secondary" className="font-normal text-xs">{exp}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-border mt-auto p-4 bg-muted/20">
                    <Button variant="outline" className="w-full bg-background">View Profile</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-mentorships" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-semibold">Active Sessions</h3>
              {activeMentorships.map((mentor, i) => (
                <Card key={i} className="border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center">
                        <Avatar className="h-16 w-16 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary text-xl">{mentor.init}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{mentor.name}</h4>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">{mentor.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{mentor.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                        <Button className="flex-1 md:flex-none">
                          <MessageSquare className="mr-2 h-4 w-4" /> Message
                        </Button>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg flex items-center justify-between border border-border">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-medium">Next Meeting:</span>
                        <span className="ml-2 text-muted-foreground">{mentor.nextMeeting}</span>
                      </div>
                      <Button variant="outline" size="sm">Reschedule</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="space-y-6">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Your Goals</CardTitle>
                  <CardDescription>Track your mentorship progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium flex items-center"><Target className="mr-2 h-4 w-4 text-primary"/> Master System Design</span>
                      <span className="text-muted-foreground">70%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[70%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium flex items-center"><Target className="mr-2 h-4 w-4 text-primary"/> Transition to Senior Role</span>
                      <span className="text-muted-foreground">35%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[35%]" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t border-border mt-auto p-4 bg-muted/20">
                  <Button variant="ghost" className="w-full text-xs">Update Goals</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requests">
          <Card className="border-border shadow-sm py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No Pending Requests</h3>
              <p className="text-muted-foreground max-w-sm mt-1">
                You don't have any incoming or outgoing mentorship requests at the moment.
              </p>
              <Button variant="outline" className="mt-6">Explore Mentors</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
