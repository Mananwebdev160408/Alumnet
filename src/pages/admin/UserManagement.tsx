import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Download, ShieldAlert, Ban, AlertTriangle, ArrowLeft, GraduationCap, Building, MapPin, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { subscribeToUsers, updateUserProfile } from "@/lib/firestoreService";
import type { UserProfile } from "@/lib/types";
import { toast } from "sonner";

export default function UserManagement() {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("students");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!userProfile?.collegeId) return;

    // Fetch verified users for this college
    const unsub = subscribeToUsers({ collegeId: userProfile.collegeId, isVerified: true }, (list) => {
      setUsers(list);
      setLoading(false);
    });

    return unsub;
  }, [userProfile]);

  const handleAction = async (uid: string, action: string) => {
    setActionLoading(uid);
    try {
      const targetStatus = action === "suspend" ? "Suspended" : "Active";
      await updateUserProfile(uid, { status: targetStatus });
      toast.success(`User status updated to ${targetStatus}.`);
    } catch {
      toast.error("Failed to update user status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleExport = () => {
    if (users.length === 0) return;
    const headers = ["Name", "Email", "Role", "Branch", "Graduation Year", "Status"];
    const rows = users.map(u => [
      u.name,
      u.email,
      u.role,
      u.branch,
      u.graduationYear,
      u.status || "Active"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${userProfile?.collegeId || "college"}_users.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV database exported successfully!");
  };

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const selectedUser = users.find(u => u.uid === selectedUserId);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (selectedUserId && selectedUser) {
    return (
      <div className="flex-1 max-w-4xl mx-auto w-full p-8 pt-6 space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedUserId(null)}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3" /> Back to Users
        </Button>

        <Card className="border-2 border-border shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none bg-card">
          <CardHeader className="border-b border-border bg-muted/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-border rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl rounded-none">
                    {initials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black uppercase">{selectedUser.name}</h3>
                    <Badge variant="outline" className={`font-bold text-[9px] uppercase tracking-wider ${selectedUser.role === "student" ? "border-sky-300 text-sky-700 bg-sky-50" : "border-emerald-300 text-emerald-700 bg-emerald-50"}`}>
                      {selectedUser.role}
                    </Badge>
                    <Badge variant={(selectedUser.status || "Active") === "Active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                      {selectedUser.status || "Active"}
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
                <span>Class of {selectedUser.graduationYear} &mdash; {selectedUser.branch}</span>
              </div>
              {selectedUser.company && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  <span>Employed at {selectedUser.company}</span>
                </div>
              )}
              {selectedUser.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Located in {selectedUser.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{selectedUser.email}</span>
              </div>
            </div>

            {selectedUser.bio && (
              <div className="space-y-2 pt-4 border-t border-border/10">
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Bio</h4>
                <p className="text-sm leading-relaxed">{selectedUser.bio}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-6 border-t border-border flex justify-end gap-2 bg-muted/10">
            <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-amber-600 hover:bg-amber-50 uppercase text-[10px] font-bold" onClick={() => toast.success("Warning sent to user log.")}>
              <AlertTriangle className="h-4 w-4 mr-1.5" /> Warn User
            </Button>
            {(selectedUser.status || "Active") === "Active" ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-[10px] font-bold"
                disabled={actionLoading === selectedUser.uid}
                onClick={() => handleAction(selectedUser.uid, "suspend")}
              >
                <Ban className="h-4 w-4 mr-1.5" /> Suspend
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="rounded-none border-2 border-border bg-emerald-600 hover:bg-emerald-700 text-white uppercase text-[10px] font-bold"
                disabled={actionLoading === selectedUser.uid}
                onClick={() => handleAction(selectedUser.uid, "activate")}
              >
                Activate Account
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  const students = users.filter((u) => u.role === "student");
  const alumni = users.filter((u) => u.role === "alumni");

  const filteredStudents = students.filter(
    (u) =>
      !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlumni = alumni.filter(
    (u) =>
      !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">User Management</h2>
          <p className="text-muted-foreground">Oversight directory of verified students and alumni members for {userProfile?.college}.</p>
        </div>
        <Button variant="outline" className="rounded-none border-2 border-border uppercase text-xs font-bold" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Tabs defaultValue="students" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="students" className="px-6 uppercase text-xs font-bold tracking-wider">Students ({students.length})</TabsTrigger>
          <TabsTrigger value="alumni" className="px-6 uppercase text-xs font-bold tracking-wider">Alumni ({alumni.length})</TabsTrigger>
        </TabsList>

        <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search user database by name, branch, company..." 
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
                    <th className="px-6 py-4">Branch</th>
                    <th className="px-6 py-4">Grad Year</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredStudents.map((user) => (
                    <tr key={user.uid} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-bold uppercase">{user.name}</td>
                      <td className="px-6 py-4 text-muted-foreground font-semibold">{user.branch || "—"}</td>
                      <td className="px-6 py-4 font-semibold">{user.graduationYear || "—"}</td>
                      <td className="px-6 py-4">
                        <Badge variant={(user.status || "Active") === "Active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                          {user.status || "Active"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedUserId(user.uid)}>Manage</Button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-muted-foreground text-sm font-semibold">
                        No verified students found.
                      </td>
                    </tr>
                  )}
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
                    <th className="px-6 py-4">Grad Year</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAlumni.map((user) => (
                    <tr key={user.uid} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-bold uppercase">{user.name}</td>
                      <td className="px-6 py-4 text-muted-foreground font-semibold">{user.company || "—"}</td>
                      <td className="px-6 py-4 font-semibold">{user.graduationYear || "—"}</td>
                      <td className="px-6 py-4">
                        <Badge variant={(user.status || "Active") === "Active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                          {user.status || "Active"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedUserId(user.uid)}>Manage</Button>
                      </td>
                    </tr>
                  ))}
                  {filteredAlumni.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-muted-foreground text-sm font-semibold">
                        No verified alumni found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
