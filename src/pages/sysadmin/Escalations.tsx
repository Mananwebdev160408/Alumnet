import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, AlertTriangle, CheckCircle, Reply } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Escalations() {
  const { toast } = useToast();
  
  const [tickets, setTickets] = useState([
    {
      id: 1,
      college: "IIT Delhi",
      escalatedBy: "Registrar Alpha",
      title: "Suspicious Batch Accounts Creation",
      desc: "An abnormal number of account registrations with similar patterns are coming from iitd.com domains. Suspect email scraping bot.",
      date: "June 7, 2026"
    }
  ]);

  const handleResolve = (id: number) => {
    setTickets(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Ticket Resolved",
      description: "Resolved flag set. Local admin notified."
    });
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase flex items-center gap-3">
            Escalation queue 
            {tickets.length > 0 && (
              <Badge variant="destructive" className="rounded-none border-2 border-border font-bold text-xs">
                {tickets.length} ACTIVE
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">Resolve disputes, platform bugs, or security alerts escalated by local College Admins.</p>
        </div>
      </div>

      <div className="space-y-4">
        {tickets.map(t => (
          <Card key={t.id} className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border bg-muted/20 font-semibold">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="uppercase text-[9px] font-bold tracking-wider rounded-none">
                      Escalated from {t.college}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Date: {t.date}</span>
                  </div>
                  <h4 className="font-bold text-sm uppercase">Raised by: {t.escalatedBy}</h4>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Headline</span>
                <p className="text-sm font-bold text-destructive flex items-center gap-1.5 uppercase">
                  <AlertTriangle className="h-4.5 w-4.5" /> {t.title}
                </p>
              </div>

              <div className="p-4 bg-muted/40 border border-border rounded-none space-y-1">
                <span className="text-[9px] font-black text-muted-foreground tracking-widest uppercase block">Description</span>
                <p className="text-sm font-medium leading-relaxed">{t.desc}</p>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t border-border flex justify-end gap-2 bg-muted/10">
              <Button variant="outline" size="sm" className="rounded-none border-2 border-border uppercase text-[10px] font-bold">
                <Reply className="h-4 w-4 mr-1.5" /> Contact Admin
              </Button>
              <Button size="sm" className="rounded-none border-2 border-border bg-emerald-600 hover:bg-emerald-700 text-white uppercase text-[10px] font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none" onClick={() => handleResolve(t.id)}>
                <CheckCircle className="h-4 w-4 mr-1.5" /> Mark Resolved
              </Button>
            </CardFooter>
          </Card>
        ))}
        {tickets.length === 0 && (
          <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium">
            Escalation queue is clear. No active tickets.
          </div>
        )}
      </div>
    </div>
  );
}
