import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Building,
  GraduationCap,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  MapPin
} from "lucide-react";

export default function OrgDashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Organization Overview</h2>
          <p className="text-muted-foreground">Welcome to your alumni management portal.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Download Report</Button>
          <Button>Invite Alumni</Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,249</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+120</span> this month
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,102</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+8%</span> engagement
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events Hosted</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-foreground font-medium">3</span> upcoming
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Employer</CardTitle>
                <Building className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold truncate mt-1">Google (340)</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  Followed by Meta, Amazon
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-border shadow-sm">
              <CardHeader>
                <CardTitle>Network Geography</CardTitle>
                <CardDescription>
                  Where your alumni are located globally.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] bg-muted/20 rounded-md mx-6 mb-6 border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground">
                <MapPin className="h-10 w-10 mb-2 opacity-50" />
                <span>Map Visualization Placeholder</span>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-border shadow-sm">
              <CardHeader>
                <CardTitle>Recent Approvals</CardTitle>
                <CardDescription>
                  Alumni recently verified into your network.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: "Robert Fox", role: "Software Engineer", year: "2018", init: "RF" },
                    { name: "Cody Fisher", role: "Product Manager", year: "2015", init: "CF" },
                    { name: "Esther Howard", role: "Designer", year: "2020", init: "EH" },
                    { name: "Jane Cooper", role: "Founder", year: "2012", init: "JC" },
                  ].map((person, i) => (
                    <div key={i} className="flex items-center">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary">{person.init}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{person.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                           <GraduationCap className="h-3 w-3 mr-1"/> Class of {person.year}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Button variant="ghost" size="sm" className="text-xs h-8">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-border shadow-sm py-12">
            <CardContent className="text-center">
              <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
              <p className="text-muted-foreground mt-1">Detailed demographic and engagement data will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
