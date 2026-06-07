import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserPlus, Clock } from "lucide-react";

export default function Connections() {
  const pendingRequests = [
    { name: "Robert Fox", role: "UI Designer at Dribbble", time: "2 hours ago", init: "RF" },
    { name: "Cody Fisher", role: "Product Manager at Spotify", time: "1 day ago", init: "CF" },
  ];

  const myConnections = [
    { name: "Jane Cooper", role: "Software Engineer at Google", init: "JC" },
    { name: "Kristin Watson", role: "Data Scientist at Meta", init: "KW" },
    { name: "Esther Howard", role: "Frontend Developer at Vercel", init: "EH" },
    { name: "Cameron Williamson", role: "VP of Engineering at Stripe", init: "CW" },
  ];

  const suggestedConnections = [
    { name: "Ralph Edwards", role: "Marketing Manager at Notion", mutual: "3 mutual connections", init: "RE" },
    { name: "Arlene McCoy", role: "UX Researcher at Airbnb", mutual: "1 mutual connection", init: "AM" },
    { name: "Theresa Webb", role: "DevOps Engineer at AWS", mutual: "5 mutual connections", init: "TW" },
  ];

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">My Connections</h2>
          <p className="text-muted-foreground">Manage your network and discover new people.</p>
        </div>
      </div>

      <Tabs defaultValue="my-network" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="my-network" className="px-6">My Network</TabsTrigger>
          <TabsTrigger value="pending" className="px-6 relative">
            Pending Requests
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] rounded-full">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="discover" className="px-6">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="my-network" className="space-y-6">
          <div className="flex justify-between items-center bg-card border border-border p-4 rounded-lg shadow-sm">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search your connections..." className="pl-9 bg-background" />
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">Showing {myConnections.length} connections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myConnections.map((person, i) => (
              <Card key={i} className="border-border shadow-sm flex flex-row items-center p-4">
                <Avatar className="h-16 w-16 border border-border">
                  <AvatarFallback className="bg-primary/10 text-primary">{person.init}</AvatarFallback>
                </Avatar>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold">{person.name}</h4>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Message</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>People who want to connect with you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.map((req, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary">{req.init}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h4 className="font-semibold">{req.name}</h4>
                      <p className="text-sm text-muted-foreground">{req.role}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" /> {req.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Decline</Button>
                    <Button size="sm">Accept</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Suggested for You</CardTitle>
              <CardDescription>Based on your profile and mutual connections.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestedConnections.map((person, i) => (
                  <Card key={i} className="border border-border flex flex-col items-center text-center p-6 bg-background shadow-sm hover:shadow-md transition-shadow">
                    <Avatar className="h-20 w-20 mb-4 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">{person.init}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold">{person.name}</h4>
                    <p className="text-sm text-muted-foreground h-10 mb-4 line-clamp-2">{person.role}</p>
                    <div className="text-xs text-muted-foreground mb-6 flex items-center">
                      <UserCheck className="mr-1 h-3 w-3" />
                      {person.mutual}
                    </div>
                    <Button className="w-full mt-auto" variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" /> Connect
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
