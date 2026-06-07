import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, CalendarDays, Clock, Video, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { getUserProfile, createSession } from "@/lib/firestoreService";
import type { UserProfile } from "@/lib/types";
import { toast } from "sonner";

export default function BookMentorship() {
  const { alumniId } = useParams<{ alumniId: string }>();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [agenda, setAgenda] = useState<string>("");
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const slots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"];

  useEffect(() => {
    if (!alumniId) return;
    getUserProfile(alumniId).then((p) => {
      setMentor(p);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      toast.error("Failed to load mentor profile.");
      setLoading(false);
    });
  }, [alumniId]);

  const parseDateTime = (date: Date, slot: string) => {
    const d = new Date(date);
    const [time, modifier] = slot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const handleBook = async () => {
    if (!currentUser || !mentor) return;
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }
    if (!selectedSlot) {
      toast.error("Please select a time slot.");
      return;
    }
    if (!agenda.trim()) {
      toast.error("Please write a short agenda.");
      return;
    }

    setSubmitting(true);
    try {
      const scheduledTime = parseDateTime(selectedDate, selectedSlot);
      await createSession({
        studentId: currentUser.uid,
        mentorId: mentor.uid,
        collegeId: userProfile?.collegeId || mentor.collegeId,
        scheduledAt: scheduledTime,
        duration: selectedDuration,
        status: "pending",
        meetingLink: "https://meet.google.com/abc-defg-hij",
        notes: agenda.trim(),
        feedback: {},
      });
      setIsBooked(true);
      toast.success("Mentorship session booked successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to book session.");
    } finally {
      setSubmitting(false);
    }
  };

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="flex-1 max-w-xl mx-auto w-full p-8 pt-12 text-center space-y-6">
        <h3 className="text-xl font-bold uppercase">Mentor Profile Not Found</h3>
        <p className="text-muted-foreground">The requested mentor is not available.</p>
        <Button asChild className="border-2 border-border rounded-none uppercase font-bold text-xs">
          <Link to="/student/alumni">Back to Directory</Link>
        </Button>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="flex-1 max-w-xl mx-auto w-full p-8 pt-12 text-center space-y-6">
        <Card className="border-2 border-border shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none p-8 bg-card text-card-foreground">
          <CardHeader className="items-center pb-2">
            <div className="h-16 w-16 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-4 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-tight">Booking Requested!</CardTitle>
            <CardDescription className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mt-2">
              Your session request has been submitted to {mentor.name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 text-left border-t border-border mt-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">{initials(mentor.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold uppercase">{mentor.name}</p>
                <p className="text-xs text-muted-foreground">{mentor.occupation}{mentor.company ? ` at ${mentor.company}` : ""}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/10 text-xs font-semibold text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span>{selectedDate?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{selectedSlot} ({selectedDuration} mins)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-muted-foreground">
              <Video className="h-4 w-4 text-primary" />
              <span>Google Meet (meet.google.com/abc-defg-hij)</span>
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
      <Link to={`/student/alumni/${mentor.uid}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="size-3" /> Back to Profile
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Book Mentorship</h2>
          <p className="text-muted-foreground">Select an open availability slot with {mentor.name} and describe your agenda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-card">
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
                    {slots.map((slot) => (
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

          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-card">
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
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{initials(mentor.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm uppercase">{mentor.name}</h4>
                  <p className="text-xs text-muted-foreground">{mentor.occupation}{mentor.company ? ` at ${mentor.company}` : ""}</p>
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
            <CardFooter className="p-6 border-t border-border bg-muted/10">
              <Button 
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" 
                onClick={handleBook}
                disabled={submitting}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Confirm Booking"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
