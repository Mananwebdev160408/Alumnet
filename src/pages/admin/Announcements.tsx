import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Megaphone, Trash2, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Announcements() {
  const { toast } = useToast();
  
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to AlumNet Onboarding!",
      target: "All",
      message: "Welcome to AlumNet! Use the system directories to sync and engage with fellow alumni.",
      date: "June 7, 2026"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    target: "All",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      toast({
        title: "Required fields",
        description: "Please fill in title and message.",
        variant: "destructive"
      });
      return;
    }

    const newAnnouncement = {
      id: announcements.length + 1,
      title: formData.title,
      target: formData.target,
      message: formData.message,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    toast({
      title: "Broadcast Published",
      description: `Announcement posted to dashboard banner for ${formData.target} user network.`
    });
    setFormData({ title: "", target: "All", message: "" });
  };

  const handleDelete = (id: number) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Announcement Removed",
      description: "Item cleared from target feeds."
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Campus Announcements</h2>
          <p className="text-muted-foreground">Compose messages and broadcast them as dashboard banners or notifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" /> Compose Announcement
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Headline / Title *</span>
                  <Input placeholder="e.g. Server Maintenance or Event Update" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="rounded-none border-2 border-border" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Target Audience</span>
                  <Select value={formData.target} onValueChange={val => setFormData({ ...formData, target: val })}>
                    <SelectTrigger className="rounded-none border-2 border-border bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Users</SelectItem>
                      <SelectItem value="Students">Students Only</SelectItem>
                      <SelectItem value="Alumni">Alumni Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Message body *</span>
                  <Textarea placeholder="Compose your announcement detail here..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required className="rounded-none border-2 border-border min-h-[120px] resize-none" />
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border flex justify-end">
                <Button type="submit" className="bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold">
                  Broadcast Message
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-2">History Log</h3>
          {announcements.map((ann) => (
            <Card key={ann.id} className="border border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-wider border-primary text-primary bg-primary/5">
                        <Users className="h-3 w-3 mr-1" /> {ann.target}
                      </Badge>
                      <span className="text-xs font-semibold text-muted-foreground flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" /> {ann.date}</span>
                    </div>
                    <h4 className="font-bold text-lg leading-tight uppercase pt-1">{ann.title}</h4>
                    <p className="text-sm font-medium text-foreground/80 leading-relaxed pt-2">{ann.message}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 shrink-0" onClick={() => handleDelete(ann.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {announcements.length === 0 && (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium">
              No past announcements on record.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
