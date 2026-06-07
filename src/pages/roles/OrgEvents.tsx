import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Plus, ExternalLink, Clock } from "lucide-react";

export default function OrgEvents() {
  const upcomingEvents = [
    { 
      title: "Tech Alumni Mixer 2026", 
      date: "Oct 15, 2026", 
      time: "6:00 PM - 9:00 PM",
      location: "San Francisco, CA", 
      attendees: 145, 
      status: "Published",
      type: "In-Person"
    },
    { 
      title: "Career Transition Webinar", 
      date: "Oct 22, 2026", 
      time: "1:00 PM - 2:30 PM",
      location: "Online", 
      attendees: 320, 
      status: "Draft",
      type: "Virtual"
    },
  ];

  const pastEvents = [
    { 
      title: "Spring Global Reunion", 
      date: "May 10, 2026", 
      location: "New York, NY", 
      attendees: 850, 
      type: "Hybrid"
    },
    { 
      title: "Founders & Funders Night", 
      date: "Mar 05, 2026", 
      location: "London, UK", 
      attendees: 210, 
      type: "In-Person"
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Events Management</h2>
          <p className="text-muted-foreground">Organize and track alumni events and webinars.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Create Event</Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="upcoming" className="px-6">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="px-6">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, i) => (
              <Card key={i} className="border-border shadow-sm flex flex-col group hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={event.status === "Published" ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">{event.type}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 flex-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4 text-primary/70" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4 text-primary/70" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4 text-primary/70" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground pt-3 border-t border-border mt-4">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground mr-1">{event.attendees}</span> registered
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t border-border p-4 gap-3">
                  <Button variant="outline" className="w-full flex-1 bg-background">Edit Event</Button>
                  <Button className="w-full flex-1" variant="secondary">View Dashboard</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground border-b border-border uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-medium">Event Name</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Location</th>
                      <th className="px-6 py-4 font-medium">Attendees</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pastEvents.map((event, i) => (
                      <tr key={i} className="bg-background hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{event.title}</td>
                        <td className="px-6 py-4 text-muted-foreground">{event.date}</td>
                        <td className="px-6 py-4 text-muted-foreground">{event.location}</td>
                        <td className="px-6 py-4 text-muted-foreground">{event.attendees}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8">View Report</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
