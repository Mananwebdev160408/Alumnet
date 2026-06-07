import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, GraduationCap, Briefcase, CheckCheck, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AlumniNotifications() {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "connection",
      title: "New Connection Request Received",
      message: "James Miller (Student, CS Class of '25) sent you a connection request with a note.",
      time: "10 minutes ago",
      isUnread: true
    },
    {
      id: 2,
      type: "mentorship",
      title: "Mentorship Booking Requested",
      message: "James Miller requested a session: 'Saturday, June 13 at 10:00 AM'. Check your queue.",
      time: "20 minutes ago",
      isUnread: true
    },
    {
      id: 3,
      type: "referral",
      title: "New Referral Request In Queue",
      message: "James Miller requested a referral for the 'Backend Engineer Intern' role.",
      time: "1 hour ago",
      isUnread: false
    },
    {
      id: 4,
      type: "message",
      title: "New message from Registrar Alpha",
      message: "\"Hi Sarah, we are hosting a campus seminar on startup growth...\"",
      time: "3 days ago",
      isUnread: false
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
    toast({
      title: "All Notifications Read",
      description: "Marked all items as read."
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: "Notifications Cleared",
      description: "Removed all alerts."
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-sky-500" />;
      case "mentorship":
        return <GraduationCap className="h-5 w-5 text-emerald-500" />;
      case "referral":
        return <Briefcase className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const unreadCount = notifications.filter(n => n.isUnread).length;

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase flex items-center gap-3">
            Notifications 
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-none border-2 border-border font-bold text-xs">
                {unreadCount} NEW
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">Keep track of students looking for mentorship, referral requests, or platform updates.</p>
        </div>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <>
              <Button variant="outline" size="sm" className="rounded-none border-2 border-border" onClick={handleMarkAllRead}>
                <CheckCheck className="h-4 w-4 mr-2" /> Mark All Read
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10" onClick={handleClearAll}>
                <Trash2 className="h-4 w-4 mr-2" /> Clear All
              </Button>
            </>
          )}
        </div>
      </div>

      <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {notifications.map(n => (
              <div 
                key={n.id} 
                className={`p-6 flex gap-4 transition-colors ${n.isUnread ? "bg-primary/5 hover:bg-primary/10" : "bg-card hover:bg-muted/10"}`}
              >
                <div className="p-3 bg-white border border-border rounded-none shrink-0 self-start shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-base font-bold uppercase truncate ${n.isUnread ? "text-primary" : "text-foreground"}`}>
                      {n.title}
                    </h4>
                    <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="p-12 text-center text-muted-foreground text-sm font-medium">
                You have no notifications at this time.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
