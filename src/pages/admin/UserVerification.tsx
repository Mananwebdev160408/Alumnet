import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserCheck, UserX, AlertCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserVerification() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      name: "Marcus Aurelius",
      role: "Student",
      email: "marcus.aurelius@student.edu",
      date: "June 7, 2026",
      details: "Branch: Computer Science | Batch: Class of 2027",
      init: "MA"
    },
    {
      id: 2,
      name: "Sophia Loren",
      role: "Alumni",
      email: "sophia.loren@alumni.edu",
      date: "June 6, 2026",
      details: "Company: Netflix | Role: Senior DevOps Engineer | Graduation Year: 2019",
      init: "SL"
    }
  ]);

  const handleApprove = (id: number, name: string) => {
    setPendingUsers(prev => prev.filter(u => u.id !== id));
    toast({
      title: "User Verified",
      description: `${name} has been approved and added to the network.`
    });
  };

  const handleReject = (id: number, name: string) => {
    setPendingUsers(prev => prev.filter(u => u.id !== id));
    toast({
      title: "Registration Rejected",
      description: `Rejection email notification has been dispatched to ${name}.`,
      variant: "destructive"
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">User Verification</h2>
          <p className="text-muted-foreground">Approve or reject newly registered student and alumni accounts to maintain verified trust.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search pending registrations by name or email..." 
            className="pl-9 w-full bg-background" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {pendingUsers
          .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((user) => (
            <Card key={user.id} className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border border-border rounded-none shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg rounded-none">{user.init}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg leading-tight uppercase">{user.name}</h4>
                      <Badge variant="outline" className={`font-bold text-[9px] uppercase tracking-wider ${user.role === "Student" ? "border-sky-300 text-sky-700 bg-sky-50" : "border-emerald-300 text-emerald-700 bg-emerald-50"}`}>
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground mt-0.5">{user.email} &mdash; Applied: {user.date}</p>
                    <p className="text-sm text-foreground/80 font-medium mt-2">{user.details}</p>
                  </div>
                </div>
                <div className="flex gap-2 self-end md:self-center">
                  <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-xs font-bold" onClick={() => handleReject(user.id, user.name)}>
                    <UserX className="h-4 w-4 mr-1.5" /> Reject
                  </Button>
                  <Button size="sm" className="rounded-none border-2 border-border bg-emerald-600 hover:bg-emerald-700 text-white uppercase text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none" onClick={() => handleApprove(user.id, user.name)}>
                    <UserCheck className="h-4 w-4 mr-1.5" /> Verify User
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        {pendingUsers.length === 0 && (
          <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium">
            Verification queue is clear. No pending approvals.
          </div>
        )}
      </div>
    </div>
  );
}
