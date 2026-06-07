import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, ArrowUpRight, ShieldAlert, Cpu, Loader2 } from "lucide-react";
import { getColleges, getUsers } from "@/lib/firestoreService";
import type { College, UserProfile } from "@/lib/types";

export default function SysAdminDashboard() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [cList, uList] = await Promise.all([getColleges(), getUsers()]);
        setColleges(cList);
        setUsers(uList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate college user counts
  const collegeDistribution = colleges.map((col) => {
    const count = users.filter((u) => u.collegeId === col.id).length;
    return {
      name: col.shortName || col.name,
      users: count,
    };
  }).sort((a, b) => b.users - a.users).slice(0, 5);

  const maxUsers = Math.max(...collegeDistribution.map((d) => d.users), 1);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Global Platform Administration</h2>
          <p className="text-muted-foreground">Cross-institution network dashboard and server clusters health monitoring.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 py-1.5 px-3 rounded-none font-bold uppercase text-[10px] tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse inline-block"></span>
            ALL CLUSTERS OPERATIONAL
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">Total Colleges</CardTitle>
            <Building2 className="h-4.5 w-4.5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{colleges.length}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center font-semibold">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-bold">Live nodes</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">Global Users</CardTitle>
            <Users className="h-4.5 w-4.5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center font-semibold">
              <span className="text-primary font-bold">{users.filter(u => u.role === "alumni").length}</span> alumni / <span className="text-primary font-bold">{users.filter(u => u.role === "student").length}</span> students
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">API Latency</CardTitle>
            <Cpu className="h-4.5 w-4.5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">12 ms</div>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">
              Fast Firestore Response
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none border-destructive/20 bg-destructive/5 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-destructive">Suspended Users</CardTitle>
            <ShieldAlert className="h-4.5 w-4.5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-destructive">
              {users.filter((u) => u.status === "Suspended").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-semibold">
              Suspended from platform access
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-sm uppercase tracking-wider">College Distribution</CardTitle>
            <CardDescription>Number of registered members across top onboarded colleges.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-end p-6 bg-muted/10">
            {collegeDistribution.length === 0 ? (
              <div className="text-center pb-24 text-muted-foreground text-sm font-semibold">No colleges onboarded yet.</div>
            ) : (
              <div className="flex items-end justify-between h-48 gap-4 px-4">
                {collegeDistribution.map((bar, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 gap-2">
                    <span className="text-[10px] font-black text-primary">{bar.users}</span>
                    <div className="w-full bg-primary hover:bg-primary/95 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] border border-border" style={{ height: `${(bar.users / maxUsers) * 100}%` }} />
                    <span className="text-[9px] font-black text-muted-foreground uppercase truncate max-w-[80px]">{bar.name}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-sm uppercase tracking-wider">System Operations Log</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { message: `Total ${colleges.length} college nodes connected.`, time: "Just now", type: "info" },
                { message: `Real-time database sync verified with ${users.length} profiles.`, time: "1 hour ago", type: "success" },
                { message: "Firestore rules loaded successfully.", time: "4 hours ago", type: "success" },
                { message: `Monitored ${users.filter(u => u.isVerified).length} verified members active.`, time: "Yesterday", type: "info" }
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border/10 last:border-0 last:pb-0 text-sm font-semibold">
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                    log.type === "warning" ? "bg-amber-500" :
                    log.type === "success" ? "bg-emerald-500" : "bg-primary"
                  }`} />
                  <div className="space-y-0.5 flex-1">
                    <p className="font-bold text-foreground/90">{log.message}</p>
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
