import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Video, Clock, ArrowLeft, ArrowRight, Play, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentEvents() {
  const { toast } = useToast();
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [rsvpedEvents, setRsvpedEvents] = useState<number[]>([1]);

  const mockEvents = [
    {
      id: 1,
      name: "Global Tech Trends 2026",
      type: "Webinar",
      date: "June 18, 2026",
      time: "6:00 PM - 7:30 PM",
      location: "Online (Google Meet)",
      capacity: 100,
      rsvps: 76,
      host: "Sarah Chen (Google PM)",
      init: "SC",
      description: "Join our distinguished alumni as they talk about the emerging tech landscapes, focusing on AI automation, web performance, and startup engineering in the year 2026.",
      isPast: false,
      recordingUrl: "",
      resources: []
    },
    {
      id: 2,
      name: "Annual Career Fair",
      type: "Career Fair",
      date: "July 5, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Campus Auditorium",
      capacity: 500,
      rsvps: 412,
      host: "College Relations Office",
      init: "CR",
      description: "Network with over 30 top employers recruiting for full-time and internship positions. Alumni recruiters from Stripe, Google, Figma, and Vercel will be present.",
      isPast: false,
      recordingUrl: "",
      resources: []
    },
    {
      id: 3,
      name: "System Design Masterclass",
      type: "Workshop",
      date: "May 20, 2026",
      time: "2:00 PM - 4:00 PM",
      location: "Online Recording",
      capacity: 150,
      rsvps: 150,
      host: "Michael Rodriguez (Meta Engineer)",
      init: "MR",
      description: "An intensive masterclass on scaling web infrastructure, microservice design, and caching strategies. This session has concluded.",
      isPast: true,
      recordingUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      resources: [
        { name: "Masterclass Slides.pdf", size: "2.4 MB" },
        { name: "System Design CheatSheet.pdf", size: "1.1 MB" }
      ]
    }
  ];

  const handleRsvp = (eventId: number) => {
    if (rsvpedEvents.includes(eventId)) {
      setRsvpedEvents(prev => prev.filter(id => id !== eventId));
      toast({
        title: "RSVP Cancelled",
        description: "Your slot has been released back to the community."
      });
    } else {
      setRsvpedEvents(prev => [...prev, eventId]);
      toast({
        title: "RSVP Confirmed",
        description: "You have successfully registered for the event. Meeting details sent."
      });
    }
  };

  const selectedEvent = mockEvents.find(e => e.id === selectedEventId);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Events Board</h2>
          <p className="text-muted-foreground">Stay updated on webinars, workshops, career fairs, and networking meets.</p>
        </div>
      </div>

      {selectedEventId !== null && selectedEvent ? (
        <div className="space-y-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedEventId(null)}
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
                        {selectedEvent.type}
                      </Badge>
                      <CardTitle className="text-3xl font-black uppercase leading-tight">{selectedEvent.name}</CardTitle>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm font-semibold text-muted-foreground">
                        <span className="flex items-center text-foreground uppercase"><Calendar className="mr-1 h-4 w-4 text-primary" /> {selectedEvent.date}</span>
                        <span className="flex items-center"><Clock className="mr-1 h-4 w-4 text-primary" /> {selectedEvent.time}</span>
                        <span className="flex items-center"><MapPin className="mr-1 h-4 w-4 text-primary" /> {selectedEvent.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">About the Event</h3>
                    <p className="text-sm leading-relaxed">{selectedEvent.description}</p>
                  </div>

                  {selectedEvent.isPast ? (
                    <div className="space-y-4 pt-6 border-t border-border/10">
                      <div className="space-y-2">
                        <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Session Recording</h3>
                        <Button className="bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase rounded-none border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none transition-all flex items-center gap-2">
                          <Play className="h-4 w-4" /> Watch Recording
                        </Button>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Available Resources</h3>
                        <div className="grid gap-2">
                          {selectedEvent.resources.map((res, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border border-border bg-white text-sm">
                              <span className="font-semibold">{res.name} ({res.size})</span>
                              <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/5">
                                <Download className="h-4 w-4 mr-1" /> Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-muted/20">
                <CardHeader className="border-b border-border">
                  <CardTitle className="uppercase text-sm tracking-wider">Attendance Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4 text-sm font-semibold">
                  <div className="flex justify-between">
                    <span>HOSTED BY:</span>
                    <span className="text-foreground uppercase">{selectedEvent.host}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SEATS TAKEN:</span>
                    <span className="text-foreground">{selectedEvent.rsvps} / {selectedEvent.capacity}</span>
                  </div>
                  {!selectedEvent.isPast && (
                    <div className="pt-2">
                      <div className="h-2 w-full bg-muted border border-border rounded-none overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(selectedEvent.rsvps / selectedEvent.capacity) * 100}%` }} />
                      </div>
                      <p className="text-[10px] text-muted-foreground text-right mt-1">
                        {selectedEvent.capacity - selectedEvent.rsvps} seats remaining
                      </p>
                    </div>
                  )}
                </CardContent>
                {!selectedEvent.isPast && (
                  <CardFooter className="p-6 border-t border-border">
                    <Button 
                      className={`w-full font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border transition-all ${
                        rsvpedEvents.includes(selectedEvent.id)
                          ? "bg-muted text-foreground border-border hover:bg-muted"
                          : "bg-primary hover:bg-primary/95 text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none"
                      }`}
                      onClick={() => handleRsvp(selectedEvent.id)}
                    >
                      {rsvpedEvents.includes(selectedEvent.id) ? "Cancel RSVP" : "Reserve Seat"}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[160px] bg-background">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="webinar">Webinars</SelectItem>
                  <SelectItem value="career fair">Career Fairs</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents
              .filter(e => filterType === "all" || e.type.toLowerCase() === filterType)
              .map((event) => (
                <Card key={event.id} className="border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors group">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="font-bold text-[9px] uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                        {event.type}
                      </Badge>
                      {event.isPast ? (
                        <Badge variant="outline" className="text-muted-foreground uppercase text-[9px]">Concluded</Badge>
                      ) : rsvpedEvents.includes(event.id) ? (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 uppercase text-[9px]">RSVPed</Badge>
                      ) : (
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 uppercase text-[9px]">Open</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">{event.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 space-y-2 text-xs font-semibold text-muted-foreground mt-auto">
                    <div className="flex items-center">
                      <Calendar className="mr-1.5 h-3.5 w-3.5 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1.5 h-3.5 w-3.5 text-primary" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-border mt-auto p-4 bg-muted/20 flex gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full text-xs h-8 bg-background uppercase font-bold"
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      Details
                    </Button>
                    {!event.isPast && (
                      <Button 
                        className="w-full text-xs h-8 uppercase font-bold"
                        variant={rsvpedEvents.includes(event.id) ? "secondary" : "default"}
                        onClick={() => handleRsvp(event.id)}
                      >
                        {rsvpedEvents.includes(event.id) ? "Un-RSVP" : "RSVP"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
