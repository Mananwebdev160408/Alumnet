import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar, MapPin, Users, Clock, Video, Radio, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AlumniEvents() {
  const { toast } = useToast();
  const [availableToSpeak, setAvailableToSpeak] = useState<boolean>(true);
  const [rsvps, setRsvps] = useState<number[]>([1]);

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
      description: "Join our distinguished alumni as they talk about the emerging tech landscapes, focusing on AI automation, web performance, and startup engineering in the year 2026."
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
      description: "Network with over 30 top employers recruiting for full-time and internship positions. Alumni recruiters from Stripe, Google, Figma, and Vercel will be present."
    }
  ];

  const handleSpeakerToggle = (checked: boolean) => {
    setAvailableToSpeak(checked);
    toast({
      title: checked ? "Speaker Profile Active" : "Speaker Profile Paused",
      description: checked
        ? "College Admins can now invite you to speak at upcoming career events."
        : "You will not be suggested for future events."
    });
  };

  const handleRsvp = (eventId: number) => {
    if (rsvps.includes(eventId)) {
      setRsvps(prev => prev.filter(id => id !== eventId));
      toast({
        title: "RSVP Cancelled",
        description: "Your registration status has been updated."
      });
    } else {
      setRsvps(prev => [...prev, eventId]);
      toast({
        title: "RSVP Confirmed",
        description: "See you at the event!"
      });
    }
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Alumni Events Hub</h2>
          <p className="text-muted-foreground">Browse upcoming community events or manage your guest speaker availability.</p>
        </div>
      </div>

      <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-primary/5 border-primary/20">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-lg uppercase flex items-center gap-2 text-primary">
              <Radio className="h-5 w-5 animate-pulse" /> Available to Speak
            </h3>
            <p className="text-xs text-muted-foreground font-medium max-w-md">
              Flag your profile as a potential host, panelist, or guest speaker for upcoming university career fairs or engineering workshops.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Speaker Profile:</span>
            <Switch checked={availableToSpeak} onCheckedChange={handleSpeakerToggle} className="data-[state=checked]:bg-primary" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockEvents.map((event) => (
          <Card key={event.id} className="border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors group">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="font-bold text-[9px] uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                  {event.type}
                </Badge>
                {rsvps.includes(event.id) ? (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 uppercase text-[9px]">Attending</Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground uppercase text-[9px]">Not registered</Badge>
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
                className="w-full text-xs h-8 uppercase font-bold"
                variant={rsvps.includes(event.id) ? "secondary" : "default"}
                onClick={() => handleRsvp(event.id)}
              >
                {rsvps.includes(event.id) ? "Un-RSVP" : "RSVP to Attend"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
