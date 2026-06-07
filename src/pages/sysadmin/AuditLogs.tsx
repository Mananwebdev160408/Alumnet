import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Search, ShieldCheck } from "lucide-react";

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const mockLogs = [
    {
      time: "2026-06-07 17:15:30",
      actor: "Registrar Alpha (IIT Delhi)",
      action: "Approve User",
      entity: "Marcus Aurelius (Student)",
      details: "State changed: PENDING -> ACTIVE"
    },
    {
      time: "2026-06-07 16:04:12",
      actor: "SysAdmin Zero (Global)",
      action: "Onboard College",
      entity: "IIT Delhi (Node #4)",
      details: "Created college profile with tier: PREMIUM"
    },
    {
      time: "2026-06-06 12:45:00",
      actor: "Dean Alpha (MIT)",
      action: "Toggle Feature",
      entity: "Job referral board",
      details: "State changed: DISABLED -> ENABLED"
    }
  ];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">System Audit Logs</h2>
          <p className="text-muted-foreground">Searchable history of all administrative actions executed across AlumNet college nodes.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs by actor, action, or entity..." 
            className="pl-9 w-full bg-background" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockLogs
              .filter(l => l.actor.toLowerCase().includes(searchQuery.toLowerCase()) || l.action.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((log, idx) => (
                <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-semibold text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-primary text-primary font-bold text-[9px] uppercase tracking-wider bg-primary/5">
                        {log.action}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center font-semibold"><Calendar className="h-3.5 w-3.5 mr-1" /> {log.time}</span>
                    </div>
                    <h4 className="font-bold uppercase text-foreground leading-tight pt-1">Actor: {log.actor}</h4>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider pt-0.5">Entity: {log.entity}</p>
                    <p className="text-sm font-medium text-foreground/80 font-mono bg-muted/20 p-2 border border-border/10 mt-2">{log.details}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
