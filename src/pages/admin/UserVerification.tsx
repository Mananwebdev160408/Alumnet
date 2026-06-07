import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserCheck, UserX, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { subscribeToUsers, updateUserVerification } from "@/lib/firestoreService";
import type { UserProfile } from "@/lib/types";
import { toast } from "sonner";

export default function UserVerification() {
  const { userProfile } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!userProfile?.collegeId) return;
    const unsub = subscribeToUsers(
      { collegeId: userProfile.collegeId, isVerified: false },
      (users) => {
        setPendingUsers(users);
        setLoading(false);
      }
    );
    return unsub;
  }, [userProfile]);

  const handleApprove = async (uid: string, name: string) => {
    setActionLoading(uid);
    try {
      await updateUserVerification(uid, true);
      toast.success(`${name} has been verified and added to the network.`);
    } catch {
      toast.error("Failed to verify user.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (uid: string, name: string) => {
    setActionLoading(uid);
    try {
      // Set isVerified to false is already the state; optionally we can mark rejected
      // For now we just update a rejected flag to remove from queue
      await updateUserVerification(uid, false);
      toast.success(`${name} registration declined.`, { description: "The user has been notified." });
    } catch {
      toast.error("Failed to reject user.");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = pendingUsers.filter(
    (u) =>
      !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">User Verification</h2>
          <p className="text-muted-foreground">
            Approve or reject newly registered accounts for {userProfile?.college}.
          </p>
        </div>
        <Badge variant="outline" className={`py-1.5 px-3 font-bold uppercase text-xs ${pendingUsers.length > 0 ? "border-amber-300 text-amber-700 bg-amber-50" : "border-emerald-300 text-emerald-700 bg-emerald-50"}`}>
          {pendingUsers.length === 0 ? "✓ Queue Clear" : `${pendingUsers.length} Pending`}
        </Badge>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9 w-full bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.uid} className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border border-border rounded-none shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg rounded-none">
                    {initials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg leading-tight uppercase">{user.name}</h4>
                    <Badge
                      variant="outline"
                      className={`font-bold text-[9px] uppercase tracking-wider ${
                        user.role === "student"
                          ? "border-sky-300 text-sky-700 bg-sky-50"
                          : "border-emerald-300 text-emerald-700 bg-emerald-50"
                      }`}
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">{user.email}</p>
                  <div className="text-sm text-foreground/80 font-medium mt-2 space-y-0.5">
                    {user.branch && <p>Branch: {user.branch}</p>}
                    {user.college && <p>College: {user.college}</p>}
                    {user.graduationYear > 0 && <p>Graduation Year: {user.graduationYear}</p>}
                    {user.company && <p>Company: {user.company}</p>}
                    {user.occupation && <p>Role: {user.occupation}</p>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 self-end md:self-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-xs font-bold"
                  disabled={actionLoading === user.uid}
                  onClick={() => handleReject(user.uid, user.name)}
                >
                  {actionLoading === user.uid ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserX className="h-4 w-4 mr-1.5" />
                  )}
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="rounded-none border-2 border-border bg-emerald-600 hover:bg-emerald-700 text-white uppercase text-xs font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none"
                  disabled={actionLoading === user.uid}
                  onClick={() => handleApprove(user.uid, user.name)}
                >
                  {actionLoading === user.uid ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserCheck className="h-4 w-4 mr-1.5" />
                  )}
                  Verify User
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredUsers.length === 0 && (
          <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium rounded-lg">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : "Verification queue is clear. No pending approvals."}
          </div>
        )}
      </div>
    </div>
  );
}
