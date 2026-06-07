import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, CalendarDays, Clock, Video, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BookMentorship() {
  const { alumniId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [agenda, setAgenda] = useState<string>("");
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // Mock alumni data
  const alumni = {
    name: "Eleanor Pena",
    role: "Product Designer",
    company: "Figma",
    init: "EP",
    slots: ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"]
  };

  const handleBook = () => {
    if (!selectedSlot) {
      toast({
        title: "Selection Required",
        description: "Please select a time slot for your session.",
        variant: "destructive"
      });
      return;
    }
    if (!agenda.trim()) {
      toast({
        title: "Agenda Required",
        description: "Please write a short agenda explaining your goals.",
        variant: "destructive"
      });
      return;
    }

    setIsBooked(true);
    toast({
      title: "Session Booked",
      description: "Confirmation email and meeting link sent successfully."
    });
  };

  if (isBooked) {
    return (
      <div className="flex-1 max-w-xl mx-auto w-full p-8 pt-12 text-center space-y-6">
        <Card className="border-2 border-border shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none p-8 bg-card text-card-foreground">
          <CardHeader className="items-center pb-2">
            <div className="h-16 w-16 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-4 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-tight">Booking Confirmed!</CardTitle>
            <CardDescription className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mt-2">
              Your mentorship slot has been reserved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 text-left border-t border-border mt-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">{alumni.init}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold">{alumni.name}</p>
                <p className="text-xs text-muted-foreground">{alumni.role} at {alumni.company}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/10 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span>{selectedDate?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{selectedSlot} ({selectedDuration} mins)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 text-sm font-medium">
              <Video className="h-4 w-4 text-primary" />
              <span className="text-primary hover:underline cursor-pointer">meet.google.com/abc-defg-hij</span>
            </div>
          </CardContent>
          <CardFooter className="pt-6 border-t border-border flex flex-col gap-2">
            <Button className="w-full bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" onClick={() => navigate("/student/mentorship")}>
              Go to My Mentorships
            </Button>
            <Button variant="outline" className="w-full font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border" onClick={() => navigate("/student/alumni")}>
              Find More Alumni
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-8 pt-6 space-y-6">
      <Link to="/student/alumni" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="size-3" /> Back to Directory
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Book Mentorship</h2>
          <p className="text-muted-foreground">Select an open availability slot with {alumni.name} and describe your agenda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">1. Select Date & Slots</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-none border border-border p-3 bg-white"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Duration</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[30, 60].map((d) => (
                      <Button
                        key={d}
                        type="button"
                        variant={selectedDuration === d ? "default" : "outline"}
                        className={`rounded-none border-2 border-border font-bold text-xs uppercase ${selectedDuration === d ? "bg-primary text-white" : "bg-white"}`}
                        onClick={() => setSelectedDuration(d)}
                      >
                        {d} Minutes
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Available Slots</span>
                  <div className="grid grid-cols-2 gap-2">
                    {alumni.slots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={selectedSlot === slot ? "default" : "outline"}
                        className={`rounded-none border-2 border-border font-bold text-xs uppercase ${selectedSlot === slot ? "bg-primary text-white" : "bg-white"}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">2. Agenda & Goals</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">What would you like to discuss? *</span>
                <Textarea
                  placeholder="Explain briefly what you'd like guidance on (e.g. Portfolio review, interview prep, career transitions)..."
                  maxLength={200}
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  className="rounded-none border-2 border-border min-h-[100px] resize-none"
                />
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                  <span>Required. Maximum 200 characters.</span>
                  <span>{agenda.length}/200</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side overview */}
        <div className="space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-muted/20">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{alumni.init}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm uppercase">{alumni.name}</h4>
                  <p className="text-xs text-muted-foreground">{alumni.role} at {alumni.company}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3 text-xs font-semibold text-muted-foreground">
                <div className="flex justify-between">
                  <span>DATE:</span>
                  <span className="text-foreground uppercase">{selectedDate?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="flex justify-between">
                  <span>TIME SLOT:</span>
                  <span className="text-foreground uppercase">{selectedSlot || "NOT SELECTED"}</span>
                </div>
                <div className="flex justify-between">
                  <span>DURATION:</span>
                  <span className="text-foreground uppercase">{selectedDuration} MINS</span>
                </div>
                <div className="flex justify-between">
                  <span>PLATFORM:</span>
                  <span className="text-foreground uppercase flex items-center gap-1"><Video className="h-3 w-3" /> GOOGLE MEET</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t border-border">
              <Button className="w-full bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" onClick={handleBook}>
                Confirm Booking
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
