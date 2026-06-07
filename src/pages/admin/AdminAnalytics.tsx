import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Briefcase, Activity, Calendar } from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">College Analytics</h2>
          <p className="text-muted-foreground">Detailed analytical reports on community growth and network engagement.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">Community Growth</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,200</div>
            <p className="text-xs text-muted-foreground mt-1">New accounts this semester</p>
          </CardContent>
        </Card>
        
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">Mentorship Match</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground mt-1">Student booking fulfillment rate</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">Active Referrals</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">Jobs approved this month</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase">Network Activity</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,890</div>
            <p className="text-xs text-muted-foreground mt-1">Messages exchanged weekly</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="uppercase text-sm tracking-wider">Growth Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-end p-6 bg-muted/10 border border-dashed border-border rounded-none">
            <div className="flex items-end justify-between h-48 gap-4 px-4">
              {[
                { label: "Jan", val: 30 },
                { label: "Feb", val: 45 },
                { label: "Mar", val: 70 },
                { label: "Apr", val: 55 },
                { label: "May", val: 80 },
                { label: "Jun", val: 95 }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2">
                  <div className="w-full bg-primary hover:bg-primary/95 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,1)] border border-border" style={{ height: `${bar.val}%` }} />
                  <span className="text-[10px] font-black text-muted-foreground uppercase">{bar.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="uppercase text-sm tracking-wider">Top Branches</CardTitle>
            <CardDescription>Active users by university branch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { branch: "Computer Science", count: "4,200 Users", percent: 70 },
              { branch: "Information Technology", count: "2,100 Users", percent: 45 },
              { branch: "Electronics & Comm.", count: "1,400 Users", percent: 30 },
              { branch: "Mechanical Engineering", count: "800 Users", percent: 18 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                  <span className="text-foreground uppercase">{item.branch}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 w-full bg-muted border border-border rounded-none overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
