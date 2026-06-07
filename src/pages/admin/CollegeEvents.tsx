import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Video, Clock, PlusCircle, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CollegeEvents() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("list");
  
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Global Tech Trends 2026",
      type: "Webinar",
      date: "2026-06-18",
      time: "18:00",
      location: "Online (Google Meet)",
      capacity: 100,
      rsvps: 76,
      speaker: "Sarah Chen",
      description: "Join our distinguished alumni as they talk about the emerging tech landscapes."
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    type: "Webinar",
    date: "",
    time: "",
    location: "",
    capacity: "100",
    speaker: "",
    description: ""
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in the required fields.",
        variant: "destructive"
      });
      return;
    }

    const newEvent = {
      id: events.length + 1,
      name: formData.name,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      location: formData.location || "Online",
      capacity: parseInt(formData.capacity) || 100,
      rsvps: 0,
      speaker: formData.speaker || "TBA",
      description: formData.description
    };

    setEvents(prev => [...prev, newEvent]);
    toast({
      title: "Event Created",
      description: "Event has been published to the student and alumni dashboards."
    });
    setActiveTab("list");
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Events Management</h2>
          <p className="text-muted-foreground">Plan webinars, workshops, and career fairs for your institutional community.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="list" className="px-6 uppercase text-xs font-bold tracking-wider">All Events</TabsTrigger>
          <TabsTrigger value="new" className="px-6 uppercase text-xs font-bold tracking-wider">Create Event</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="font-bold text-[9px] uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                      {event.type}
                    </Badge>
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 uppercase text-[9px]">
                      {event.rsvps} / {event.capacity} RSVPs
                    </Badge>
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
                  {event.speaker && (
                    <div className="pt-2 border-t border-border/10 text-foreground font-bold">
                      SPEAKER: {event.speaker}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">New Event details</CardTitle>
            </CardHeader>
            <form onSubmit={handleCreate}>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Event Name *</span>
                    <Input placeholder="e.g. Annual Networking Reunion" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="rounded-none border-2 border-border" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Event Type</span>
                    <Select value={formData.type} onValueChange={val => setFormData({ ...formData, type: val })}>
                      <SelectTrigger className="rounded-none border-2 border-border bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Webinar">Webinar</SelectItem>
                        <SelectItem value="Career Fair">Career Fair</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Date *</span>
                    <Input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required className="rounded-none border-2 border-border" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Time *</span>
                    <Input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required className="rounded-none border-2 border-border" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Location / Room Link</span>
                    <Input placeholder="e.g. meet.google.com/abc or Campus Auditorium" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="rounded-none border-2 border-border" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Max Capacity</span>
                    <Input type="number" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} className="rounded-none border-2 border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Guest Speaker (Alumni Name)</span>
                  <Input placeholder="e.g. Sarah Chen (Optional)" value={formData.speaker} onChange={e => setFormData({ ...formData, speaker: e.target.value })} className="rounded-none border-2 border-border" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Event Description</span>
                  <Textarea placeholder="Detail the event's goals, presentation schedule, agenda, and requirements..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="rounded-none border-2 border-border min-h-[120px] resize-none" />
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border flex justify-end">
                <Button type="submit" className="bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold">
                  <PlusCircle className="mr-2 h-4.5 w-4.5" /> Publish Event
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
