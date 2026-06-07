import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Building, GraduationCap, Loader2, UserPlus, UserCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import {
  subscribeToUsers,
  sendConnectionRequest,
  getConnectionStatus,
} from "@/lib/firestoreService";
import type { UserProfile } from "@/lib/types";
import { toast } from "sonner";

type ConnStatus = "none" | "pending" | "accepted" | "sent";

export default function Directory() {
  const { currentUser } = useAuth();
  const [alumni, setAlumni] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [connStatuses, setConnStatuses] = useState<Record<string, ConnStatus>>({});
  const [connecting, setConnecting] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToUsers({ role: "alumni" }, (list) => {
      setAlumni(list.filter((u) => u.uid !== currentUser?.uid));
      setLoading(false);
    });
    return unsub;
  }, [currentUser]);

  // Load connection statuses
  useEffect(() => {
    if (!currentUser || alumni.length === 0) return;
    const load = async () => {
      const statuses: Record<string, ConnStatus> = {};
      await Promise.all(
        alumni.map(async (a) => {
          statuses[a.uid] = await getConnectionStatus(currentUser.uid, a.uid);
        })
      );
      setConnStatuses(statuses);
    };
    load();
  }, [currentUser, alumni]);

  const handleConnect = async (alumniUid: string, name: string) => {
    if (!currentUser) return;
    setConnecting(alumniUid);
    try {
      await sendConnectionRequest(currentUser.uid, alumniUid);
      setConnStatuses((prev) => ({ ...prev, [alumniUid]: "sent" }));
      toast.success(`Connection request sent to ${name}!`);
    } catch {
      toast.error("Failed to send request.");
    } finally {
      setConnecting(null);
    }
  };

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const filtered = alumni
    .filter((a) =>
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.occupation.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "year") return b.graduationYear - a.graduationYear;
      return 0;
    });

  const ConnectButton = ({ uid, name }: { uid: string; name: string }) => {
    const status = connStatuses[uid] ?? "none";
    if (status === "accepted") {
      return (
        <Button className="w-full text-xs h-8" variant="secondary" disabled>
          <UserCheck className="mr-1 h-3 w-3" /> Connected
        </Button>
      );
    }
    if (status === "sent") {
      return (
        <Button className="w-full text-xs h-8" variant="outline" disabled>
          <Clock className="mr-1 h-3 w-3" /> Requested
        </Button>
      );
    }
    if (status === "pending") {
      return (
        <Button className="w-full text-xs h-8" variant="outline" disabled>
          <Clock className="mr-1 h-3 w-3" /> Pending
        </Button>
      );
    }
    return (
      <Button
        className="w-full text-xs h-8"
        onClick={() => handleConnect(uid, name)}
        disabled={connecting === uid}
      >
        {connecting === uid ? (
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
        ) : (
          <UserPlus className="mr-1 h-3 w-3" />
        )}
        Connect
      </Button>
    );
  };

  return (
    <div className="flex-1 p-8 pt-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Alumni Directory</h2>
        <p className="text-muted-foreground">Find and connect with fellow alumni.</p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, company, or role..."
            className="pl-9 w-full bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[140px] bg-background">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="year">Grad Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No alumni found{search ? ` for "${search}"` : ""}.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((alumni) => (
              <Card
                key={alumni.uid}
                className="border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors cursor-pointer group"
              >
                <CardHeader className="text-center pb-2 pt-6">
                  <Avatar className="h-20 w-20 mx-auto mb-4 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                      {initials(alumni.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg leading-none truncate">{alumni.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1 truncate">{alumni.occupation}</p>
                </CardHeader>
                <CardContent className="text-center pb-4 flex-1">
                  <div className="space-y-2 text-sm text-muted-foreground mt-2 flex flex-col items-center">
                    {alumni.company && (
                      <div className="flex items-center">
                        <Building className="mr-1.5 h-3.5 w-3.5" />
                        <span className="truncate max-w-[150px]">{alumni.company}</span>
                      </div>
                    )}
                    {alumni.location && (
                      <div className="flex items-center">
                        <MapPin className="mr-1.5 h-3.5 w-3.5" />
                        <span className="truncate max-w-[150px]">{alumni.location}</span>
                      </div>
                    )}
                    {alumni.graduationYear > 0 && (
                      <div className="flex items-center">
                        <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
                        <span>Class of {alumni.graduationYear}</span>
                      </div>
                    )}
                    {alumni.isMentor && (
                      <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200 mt-1">
                        Open to Mentor
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t border-border mt-auto flex justify-between gap-2 p-4">
                  <Button variant="outline" className="w-full text-xs h-8" asChild>
                    <Link to={`/student/alumni/${alumni.uid}`}>View Profile</Link>
                  </Button>
                  <ConnectButton uid={alumni.uid} name={alumni.name} />
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filtered.length}</span> alumni
            </p>
          </div>
        </>
      )}
    </div>
  );
}
