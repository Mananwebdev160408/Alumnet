import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CalendarDays, CheckCircle2, XCircle, Star, Save, Smile } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AlumniMentorship() {
  const { toast } = useToast();
  
  const [weeklyAvailability, setWeeklyAvailability] = useState([
    { day: "Saturday", slots: ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"] },
    { day: "Sunday", slots: ["02:00 PM - 03:00 PM"] }
  ]);

  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      studentName: "James Miller",
      major: "Computer Science",
      batch: "Class of 2025",
      slot: "Saturday, June 13 at 10:00 AM",
      agenda: "Looking for tips on portfolio reviews and mock interview preparation.",
      init: "JM"
    }
  ]);

  const [pastSessions, setPastSessions] = useState([
    {
      id: 1,
      studentName: "Olivia Martin",
      date: "May 25, 2026",
      rating: 5,
      review: "Awesome mentorship. Helped me refine my resume and design workflow.",
      init: "OM",
      notes: "Reviewed portfolio site. Highly motivated student."
    }
  ]);

  const handleAcceptRequest = (id: number) => {
    setBookingRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Request Approved",
      description: "Confirmation email and link sent to student."
    });
  };

  const handleDeclineRequest = (id: number) => {
    setBookingRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Request Declined",
      description: "Notification sent back to student."
    });
  };

  const handleUpdateAvailability = () => {
    toast({
      title: "Availability Updated",
      description: "Weekly template updated successfully."
    });
  };

  const handleSaveNotes = (id: number, notes: string) => {
    setPastSessions(prev => prev.map(s => s.id === id ? { ...s, notes } : s));
    toast({
      title: "Session Notes Saved",
      description: "Feedback saved locally."
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Mentorship Management</h2>
          <p className="text-muted-foreground">Configure availability slots, manage student booking requests, and view session notes.</p>
        </div>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="requests" className="px-6 uppercase text-xs font-bold tracking-wider relative">
            Booking Requests
            {bookingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2 rounded-none border border-border text-[9px] px-1.5 py-0.5">{bookingRequests.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="availability" className="px-6 uppercase text-xs font-bold tracking-wider">Weekly Template</TabsTrigger>
          <TabsTrigger value="sessions" className="px-6 uppercase text-xs font-bold tracking-wider">Past Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          {bookingRequests.map((req) => (
            <Card key={req.id} className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
              <CardHeader className="border-b border-border bg-muted/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 border border-border flex items-center justify-center bg-primary/10 text-primary font-bold">
                      {req.init}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">{req.studentName}</h4>
                      <p className="text-xs text-muted-foreground">{req.major} &mdash; {req.batch}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary font-bold text-[10px] uppercase py-1 px-2 shrink-0">
                    {req.slot}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Session Agenda</span>
                  <p className="text-sm font-semibold">{req.agenda}</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border flex justify-end gap-2 bg-muted/10">
                <Button variant="outline" className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-xs font-bold px-4" onClick={() => handleDeclineRequest(req.id)}>
                  <XCircle className="mr-2 h-4 w-4" /> Decline
                </Button>
                <Button className="rounded-none border-2 border-border bg-primary hover:bg-primary/95 text-white uppercase text-xs font-bold px-4" onClick={() => handleAcceptRequest(req.id)}>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Accept Session
                </Button>
              </CardFooter>
            </Card>
          ))}
          {bookingRequests.length === 0 && (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium">
              You have no pending booking requests.
            </div>
          )}
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">Availability Scheduler</CardTitle>
              <CardDescription>Setup weekly recurring hours when students can book calls with you.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {weeklyAvailability.map((avail, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border bg-white">
                  <span className="font-bold text-sm uppercase tracking-wider">{avail.day}</span>
                  <div className="flex flex-wrap gap-2">
                    {avail.slots.map((s, i) => (
                      <Badge key={i} variant="outline" className="border-border text-foreground font-semibold px-3 py-1 bg-muted/20">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <Button className="bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold" onClick={handleUpdateAvailability}>
                  Save Template Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          {pastSessions.map((session) => (
            <Card key={session.id} className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
              <CardHeader className="border-b border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm uppercase">{session.studentName}</h4>
                    <p className="text-xs text-muted-foreground">Session Date: {session.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < session.rating ? "text-amber-500 fill-amber-500" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {session.review && (
                  <div className="p-3 bg-muted/25 border border-border/50 text-sm italic">
                    "{session.review}"
                  </div>
                )}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Internal Session Notes</span>
                  <Textarea
                    defaultValue={session.notes}
                    onChange={(e) => session.notes = e.target.value}
                    className="rounded-none border-2 border-border min-h-[80px]"
                    placeholder="Enter private reminders, topics discussed, or progress checklist for this student..."
                  />
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border flex justify-end">
                <Button size="sm" variant="outline" className="rounded-none border-2 border-border font-bold uppercase text-[10px] tracking-wider" onClick={() => handleSaveNotes(session.id, session.notes)}>
                  <Save className="h-4.5 w-4.5 mr-2" /> Save Notes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
