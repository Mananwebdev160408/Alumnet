import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Trash2, ShieldAlert, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContentModeration() {
  const { toast } = useToast();
  
  const [flaggedItems, setFlaggedItems] = useState([
    {
      id: 1,
      reporterName: "James Miller",
      reportedUser: "Marcus Aurelius",
      reason: "Spam / Direct marketing via DM",
      content: "\"Hey there, please subscribe to my crypto newsletter link: cryptonews.com...\"",
      date: "June 7, 2026",
      type: "Message"
    },
    {
      id: 2,
      reporterName: "Sarah Chen",
      reportedUser: "Sophia Loren",
      reason: "Inappropriate bio details",
      content: "Profile bio contains offensive or highly subjective political stances.",
      date: "June 6, 2026",
      type: "Profile"
    }
  ]);

  const handleResolve = (id: number, action: string) => {
    setFlaggedItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: `Report Resolved`,
      description: `Action '${action}' applied and report cleared.`
    });
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase flex items-center gap-3">
            Content Moderation 
            {flaggedItems.length > 0 && (
              <Badge variant="destructive" className="rounded-none border-2 border-border font-bold text-xs">
                {flaggedItems.length} PENDING
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">Review and moderate reported messages, community posts, or profile violations.</p>
        </div>
      </div>

      <div className="space-y-4">
        {flaggedItems.map(item => (
          <Card key={item.id} className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="uppercase text-[9px] font-bold tracking-wider rounded-none">
                      {item.type} Report
                    </Badge>
                    <span className="text-xs font-semibold text-muted-foreground">Reported: {item.date}</span>
                  </div>
                  <h4 className="font-bold text-sm uppercase">Reported User: {item.reportedUser}</h4>
                </div>
                <div className="text-xs font-semibold text-muted-foreground shrink-0">
                  REPORTER: <span className="text-foreground">{item.reporterName}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Reason for flag</span>
                <p className="text-sm font-semibold text-destructive flex items-center gap-1.5">
                  <AlertCircle className="h-4.5 w-4.5" /> {item.reason}
                </p>
              </div>

              <div className="p-4 bg-muted/40 border border-border rounded-none space-y-1">
                <span className="text-[9px] font-black text-muted-foreground tracking-widest uppercase block">Flagged Content</span>
                <p className="text-sm font-medium leading-relaxed font-mono whitespace-pre-wrap">{item.content}</p>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t border-border flex justify-end gap-2 bg-muted/10">
              <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-emerald-600 hover:bg-emerald-50 border-emerald-200 uppercase text-[10px] font-bold" onClick={() => handleResolve(item.id, "dismiss")}>
                <CheckCircle className="h-4 w-4 mr-1.5" /> Dismiss Report
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-amber-600 hover:bg-amber-50 border-amber-200 uppercase text-[10px] font-bold" onClick={() => handleResolve(item.id, "warn")}>
                <AlertTriangle className="h-4 w-4 mr-1.5" /> Warn User
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-[10px] font-bold" onClick={() => handleResolve(item.id, "remove")}>
                <Trash2 className="h-4 w-4 mr-1.5" /> Remove Content
              </Button>
            </CardFooter>
          </Card>
        ))}
        {flaggedItems.length === 0 && (
          <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium">
            No pending moderation alerts. Platform content is clean.
          </div>
        )}
      </div>
    </div>
  );
}
