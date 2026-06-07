import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Server,
  Building2,
  Users,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  CreditCard
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Platform Admin</h2>
          <p className="text-muted-foreground">System overview and global metrics.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 py-1.5 px-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            System Operational
          </Badge>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+4</span> this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124,592</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+1,204</span> this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,890</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm border-destructive/20 bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Pending Approvals</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground mt-1">Organizations awaiting verification</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border shadow-sm">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>User registrations across all organizations over the past year.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] bg-muted/20 rounded-md mx-6 mb-6 border border-dashed border-border flex items-center justify-center text-muted-foreground">
            <span>Chart Visualization Placeholder</span>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border shadow-sm">
          <CardHeader>
            <CardTitle>System Activity Log</CardTitle>
            <CardDescription>Real-time platform events and alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { message: "New organization 'TechCorp' requested approval.", time: "2 mins ago", type: "warning" },
                { message: "Database backup completed successfully.", time: "1 hour ago", type: "info" },
                { message: "Spike in API requests detected from Org ID 42.", time: "3 hours ago", type: "alert" },
                { message: "User milestone: 100k verified alumni reached.", time: "Yesterday", type: "success" },
                { message: "Server patch deployment initiated.", time: "Yesterday", type: "info" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                    log.type === "warning" ? "bg-amber-500" :
                    log.type === "alert" ? "bg-destructive" :
                    log.type === "success" ? "bg-emerald-500" : "bg-primary"
                  }`} />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{log.message}</p>
                    <p className="text-xs text-muted-foreground">{log.time}</p>
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
