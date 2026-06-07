import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Briefcase, Activity } from "lucide-react";

export default function PlatformAnalytics() {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Platform Analytics</h2>
          <p className="text-muted-foreground">Aggregated metrics, college benchmarks, and feature adoption indices.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">Active Nodes</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142 Colleges</div>
            <p className="text-xs text-muted-foreground mt-1">98% monthly active rate</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">Global Matches</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,902 calls</div>
            <p className="text-xs text-muted-foreground mt-1">Mentorship sessions conducted</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">Job Funnel</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,450 Referrals</div>
            <p className="text-xs text-muted-foreground mt-1">42% success conversion rate</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">Growth Index</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12% MoM</div>
            <p className="text-xs text-muted-foreground mt-1">User signup rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader>
            <CardTitle className="uppercase text-sm tracking-wider">Feature Adoption Index</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { feature: "Alumni Directory Module", count: "98% of nodes active", percent: 98 },
              { feature: "Mentorship Scheduler", count: "85% of nodes active", percent: 85 },
              { feature: "Job referral Board", count: "72% of nodes active", percent: 72 },
              { feature: "AI Career Chatbot", count: "40% of nodes active", percent: 40 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                  <span className="text-foreground uppercase">{item.feature}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 w-full bg-muted border border-border rounded-none overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3 border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader>
            <CardTitle className="uppercase text-sm tracking-wider">Top Performing Nodes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "MIT", count: "14,500 active connections", rating: "Enterprise" },
              { name: "Stanford", count: "10,200 active connections", rating: "Enterprise" },
              { name: "IIT Delhi", count: "2,350 active connections", rating: "Premium" }
            ].map((node, i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-border bg-white text-sm font-semibold">
                <span className="uppercase">{node.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{node.count}</span>
                  <Badge variant="outline" className="border-border text-[9px] uppercase font-bold bg-muted/10">{node.rating}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
