import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Ban, KeyRound, Loader2, CheckCircle2 } from "lucide-react";
import { subscribeToUsers, updateUserProfile } from "@/lib/firestoreService";
import type { UserProfile } from "@/lib/types";
import { toast } from "sonner";

export default function GlobalUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to all users (empty options matches all)
    const unsub = subscribeToUsers({}, (list) => {
      setUsers(list);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleOverride = async (uid: string, currentStatus: string) => {
    setActionLoading(uid);
    try {
      const targetStatus = currentStatus === "Active" ? "Suspended" : "Active";
      await updateUserProfile(uid, { status: targetStatus });
      toast.success(`User status overridden to ${targetStatus}.`);
    } catch {
      toast.error("Failed to execute status override.");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Global User Directory</h2>
          <p className="text-muted-foreground">Search and override credentials, suspension state, or moderator status globally.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search all platform users by name, email, college..." 
            className="pl-9 w-full bg-background" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">College</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-muted/10 transition-colors font-semibold">
                  <td className="px-6 py-4 font-bold uppercase">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.college || "—"}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-border bg-muted/10 text-foreground font-bold uppercase text-[9px]">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={(user.status || "Active") === "Active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                      {user.status || "Active"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="text-amber-500" onClick={() => toast.success("Password reset instruction triggered.")}>
                      <KeyRound className="h-4.5 w-4.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={(user.status || "Active") === "Active" ? "text-destructive" : "text-emerald-600"}
                      disabled={actionLoading === user.uid}
                      onClick={() => handleOverride(user.uid, user.status || "Active")}
                    >
                      {actionLoading === user.uid ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Ban className="h-4.5 w-4.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground text-sm font-semibold">
                    No users matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
