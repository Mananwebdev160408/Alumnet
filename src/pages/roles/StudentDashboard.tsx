import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  GraduationCap,
  Briefcase,
  Search,
  BookOpen,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Student Hub</h2>
          <p className="text-muted-foreground">Welcome back! Here are resources to jumpstart your career.</p>
        </div>
        <Button asChild>
          <Link to="/mentorship">Find a Mentor <Search className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alumni in Network</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground mt-1">Available to connect</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground mt-1">Jobs posted by alumni</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Mentorship Status</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">Not Assigned</div>
            <p className="text-xs text-muted-foreground mt-1">Find a mentor today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border shadow-sm">
          <CardHeader>
            <CardTitle>Recommended Mentors</CardTitle>
            <CardDescription>
              Alumni in your field who are accepting new mentees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Sarah Chen", role: "Product Manager at Google", init: "SC" },
                { name: "Michael Rodriguez", role: "Software Engineer at Meta", init: "MR" },
                { name: "Emily Watson", role: "UX Designer at Stripe", init: "EW" },
              ].map((person, i) => (
                <div key={i} className="flex items-center">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary">{person.init}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Button variant="ghost" size="sm" className="text-xs">Connect</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border shadow-sm">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              Action items to maximize your AlumNet experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="flex flex-col gap-2 p-3 border border-border rounded-md bg-muted/20">
                 <h4 className="text-sm font-semibold">Complete your profile</h4>
                 <p className="text-xs text-muted-foreground">Add your major, expected graduation year, and career interests so mentors can find you.</p>
                 <Button variant="link" className="p-0 h-auto justify-start text-xs text-primary" asChild>
                    <Link to="/profile">Go to Profile <ArrowRight className="ml-1 h-3 w-3" /></Link>
                 </Button>
               </div>
               <div className="flex flex-col gap-2 p-3 border border-border rounded-md bg-muted/20">
                 <h4 className="text-sm font-semibold">Browse Referrals</h4>
                 <p className="text-xs text-muted-foreground">Looking for an internship or full-time role? Check the referral board.</p>
                 <Button variant="link" className="p-0 h-auto justify-start text-xs text-primary" asChild>
                    <Link to="/referrals">View Jobs <ArrowRight className="ml-1 h-3 w-3" /></Link>
                 </Button>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
