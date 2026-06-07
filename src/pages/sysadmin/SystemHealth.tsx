import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Activity, Database, Cpu, Mail } from "lucide-react";

export default function SystemHealth() {
  const traces = [
    { type: "API", msg: "GET /api/v1/sessions - 200 OK", latency: "24ms", time: "17:30:15" },
    { type: "Firestore", msg: "Query users collection index lookup", latency: "12ms", time: "17:30:12" },
    { type: "Auth", msg: "Firebase token signature verification verified", latency: "42ms", time: "17:30:01" }
  ];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">System Clusters Status</h2>
          <p className="text-muted-foreground">Real-time health panels, db connections pool depth, and live server log traces.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">API Uptime</CardTitle>
            <Server className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.98%</div>
            <p className="text-xs text-muted-foreground mt-1">Status: fully operational</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">DB Connections</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 / 100 pool</div>
            <p className="text-xs text-muted-foreground mt-1">Latency: 2ms response time</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">SMTP Queue</CardTitle>
            <Mail className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 pending</div>
            <p className="text-xs text-muted-foreground mt-1">Delivery success rate: 99.8%</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">WebSocket Hub</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,124 sockets</div>
            <p className="text-xs text-muted-foreground mt-1">Real-time sync connections</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
        <CardHeader className="border-b border-border">
          <CardTitle className="uppercase text-sm tracking-wider">Live API Request Stream</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border font-mono text-xs">
            {traces.map((trace, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-bold border-border bg-muted/20 uppercase text-[9px] py-0.5 px-1.5">{trace.type}</Badge>
                  <span className="font-medium text-foreground">{trace.msg}</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{trace.latency}</span>
                  <span>{trace.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
