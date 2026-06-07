import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Download, ShieldAlert, Ban, AlertTriangle, ArrowLeft, GraduationCap, Building, MapPin, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("students");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [users, setUsers] = useState([
    { id: 1, name: "Marcus Aurelius", role: "student", email: "marcus.aurelius@student.edu", batch: "2027", dept: "Computer Science", company: "", location: "Delhi, India", bio: "Fascinated by distributed systems and system architecture.", init: "MA", status: "Active" },
    { id: 2, name: "Sophia Loren", role: "alumni", email: "sophia.loren@alumni.edu", batch: "2019", dept: "Information Technology", company: "Netflix", location: "Los Gatos, CA", bio: "Currently managing cloud deployments and container orchestrations.", init: "SL", status: "Active" },
    { id: 3, name: "Sarah Chen", role: "alumni", email: "alumni@alumnet.com", batch: "2018", dept: "Electronics", company: "Google", location: "Mountain View, CA", bio: "Product Manager passionate about scaling products from 0 to 1.", init: "SC", status: "Active" },
    { id: 4, name: "James Miller", role: "student", email: "student@alumnet.com", batch: "2025", dept: "Computer Science", company: "", location: "London, UK", bio: "Web developer searching for React opportunities.", init: "JM", status: "Active" }
  ]);

  const handleAction = (id: number, action: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: action === "suspend" ? "Suspended" : "Active" } : u));
    toast({
      title: `User ${action === "suspend" ? "Suspended" : "Updated"}`,
      description: `Action has been registered and user status refreshed.`
    });
  };

  const handleExport = () => {
    toast({
      title: "Data Export Complete",
      description: "User database exported as CSV file."
    });
  };

  const selectedUser = users.find(u => u.id === selectedUserId);

  if (selectedUserId !== null && selectedUser) {
    return (
      <div className="flex-1 max-w-4xl mx-auto w-full p-8 pt-6 space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedUserId(null)}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3" /> Back to Users
        </Button>

        <Card className="border-2 border-border shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="border-b border-border bg-muted/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-border rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl rounded-none">{selectedUser.init}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black uppercase">{selectedUser.name}</h3>
                    <Badge variant="outline" className={`font-bold text-[9px] uppercase tracking-wider ${selectedUser.role === "student" ? "border-sky-300 text-sky-700 bg-sky-50" : "border-emerald-300 text-emerald-700 bg-emerald-50"}`}>
                      {selectedUser.role}
                    </Badge>
                    <Badge variant={selectedUser.status === "Active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-semibold uppercase">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-muted-foreground">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span>Class of {selectedUser.batch} &mdash; {selectedUser.dept}</span>
              </div>
              {selectedUser.company && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  <span>Employed at {selectedUser.company}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Located in {selectedUser.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{selectedUser.email}</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/10">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Bio</h4>
              <p className="text-sm leading-relaxed">{selectedUser.bio}</p>
            </div>
          </CardContent>
          <CardFooter className="p-6 border-t border-border flex justify-end gap-2 bg-muted/10">
            <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-amber-600 hover:bg-amber-50 uppercase text-[10px] font-bold" onClick={() => toast({ title: "Warning Sent", description: "Admin warning has been logged." })}>
              <AlertTriangle className="h-4 w-4 mr-1.5" /> Warn User
            </Button>
            {selectedUser.status === "Active" ? (
              <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-[10px] font-bold" onClick={() => handleAction(selectedUser.id, "suspend")}>
                <Ban className="h-4 w-4 mr-1.5" /> Suspend
              </Button>
            ) : (
              <Button size="sm" className="rounded-none border-2 border-border bg-emerald-600 hover:bg-emerald-700 text-white uppercase text-[10px] font-bold" onClick={() => handleAction(selectedUser.id, "activate")}>
                Activate Account
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">User Management</h2>
          <p className="text-muted-foreground">Oversight directory of verified students and alumni members.</p>
        </div>
        <Button variant="outline" className="rounded-none border-2 border-border uppercase text-xs font-bold" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Tabs defaultValue="students" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="students" className="px-6 uppercase text-xs font-bold tracking-wider">Students</TabsTrigger>
          <TabsTrigger value="alumni" className="px-6 uppercase text-xs font-bold tracking-wider">Alumni</TabsTrigger>
        </TabsList>

        <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search user database by name, batch, department..." 
              className="pl-9 w-full bg-background" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="students" className="m-0">
          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-bold">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Batch</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users
                    .filter(u => u.role === "student")
                    .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.dept.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((user) => (
                      <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 font-bold uppercase">{user.name}</td>
                        <td className="px-6 py-4 text-muted-foreground font-semibold">{user.dept}</td>
                        <td className="px-6 py-4 font-semibold">{user.batch}</td>
                        <td className="px-6 py-4">
                          <Badge variant={user.status === "Active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedUserId(user.id)}>Manage</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alumni" className="m-0">
          <Card className="border-border shadow-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-bold">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Graduation</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users
                    .filter(u => u.role === "alumni")
                    .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.company.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((user) => (
                      <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 font-bold uppercase">{user.name}</td>
                        <td className="px-6 py-4 text-muted-foreground font-semibold">{user.company}</td>
                        <td className="px-6 py-4 font-semibold">{user.batch}</td>
                        <td className="px-6 py-4">
                          <Badge variant={user.status === "Active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedUserId(user.id)}>Manage</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
