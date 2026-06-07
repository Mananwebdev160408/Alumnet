import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Building2, Users, Activity, CreditCard, ArrowUpRight, ShieldAlert, Cpu } from "lucide-react";

export default function SysAdminDashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Global Platform Administration</h2>
          <p className="text-muted-foreground">Cross-institution network dashboard and server clusters health monitoring.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-250 py-1.5 px-3 rounded-none font-bold uppercase text-[10px] tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse inline-block"></span>
            ALL CLUSTERS OPERATIONAL
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">Total Colleges</CardTitle>
            <Building2 className="h-4.5 w-4.5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">142</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center font-semibold">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-bold">+4</span> this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">Global Users</CardTitle>
            <Users className="h-4.5 w-4.5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">124,592</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center font-semibold">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-bold">+1,204</span> this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">API Latency</CardTitle>
            <Cpu className="h-4.5 w-4.5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">42 ms</div>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">
              Average across 4 region clusters
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none border-destructive/20 bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-destructive">Platform Alerts</CardTitle>
            <ShieldAlert className="h-4.5 w-4.5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-destructive">12</div>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">
              Active escalations from college admins
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-sm uppercase tracking-wider">College Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-end p-6 bg-muted/10">
            <div className="flex items-end justify-between h-48 gap-4 px-4">
              {[
                { name: "MIT", val: 95 },
                { name: "Stanford", val: 80 },
                { name: "Imperial", val: 75 },
                { name: "NUS", val: 65 },
                { name: "IIT Delhi", val: 90 }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2">
                  <div className="w-full bg-primary hover:bg-primary/95 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] border border-border" style={{ height: `${bar.val}%` }} />
                  <span className="text-[9px] font-black text-muted-foreground uppercase">{bar.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-sm uppercase tracking-wider">System Operations Log</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { message: "New College 'Kyoto Tech' onboarded.", time: "10 mins ago", type: "info" },
                { message: "Escalation #422 resolved: db deadlock.", time: "1 hour ago", type: "success" },
                { message: "Cluster API usage surge detected.", time: "4 hours ago", type: "warning" },
                { message: "Server patch v1.2.4 successfully applied.", time: "Yesterday", type: "success" }
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border/10 last:border-0 last:pb-0 text-sm">
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                    log.type === "warning" ? "bg-amber-500" :
                    log.type === "success" ? "bg-emerald-500" : "bg-primary"
                  }`} />
                  <div className="space-y-0.5 flex-1">
                    <p className="font-semibold text-foreground/90">{log.message}</p>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
