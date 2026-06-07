import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Search, PlusCircle, Loader2 } from "lucide-react";
import { subscribeToColleges, updateCollegeStatus, createCollege } from "@/lib/firestoreService";
import type { College } from "@/lib/types";
import { toast } from "sonner";

export default function CollegeManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [onboardLoading, setOnboardLoading] = useState(false);

  // New college form fields
  const [newCollege, setNewCollege] = useState({
    name: "",
    shortName: "",
    website: "",
    domain: "",
    country: "India",
    cityState: "",
    description: "",
    subscriptionTier: "basic" as College["subscriptionTier"],
  });

  useEffect(() => {
    const unsub = subscribeToColleges((list) => {
      setColleges(list);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleToggleStatus = async (collegeId: string, currentStatus: "active" | "suspended") => {
    setActionLoading(collegeId);
    try {
      const targetStatus = currentStatus === "active" ? "suspended" : "active";
      await updateCollegeStatus(collegeId, targetStatus);
      toast.success(`College status updated to ${targetStatus}.`);
    } catch {
      toast.error("Failed to update college status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollege.name.trim() || !newCollege.shortName.trim()) {
      toast.error("Name and Short Name are required.");
      return;
    }
    setOnboardLoading(true);
    try {
      await createCollege({
        name: newCollege.name.trim(),
        shortName: newCollege.shortName.trim(),
        website: newCollege.website.trim(),
        domain: newCollege.domain.trim(),
        country: newCollege.country.trim(),
        cityState: newCollege.cityState.trim(),
        description: newCollege.description.trim(),
        status: "active",
        subscriptionTier: newCollege.subscriptionTier,
      });
      toast.success(`College node '${newCollege.shortName}' onboarded successfully!`);
      setDialogOpen(false);
      setNewCollege({
        name: "",
        shortName: "",
        website: "",
        domain: "",
        country: "India",
        cityState: "",
        description: "",
        subscriptionTier: "basic",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to onboard college.");
    } finally {
      setOnboardLoading(false);
    }
  };

  const filteredColleges = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortName.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">College Nodes Management</h2>
          <p className="text-muted-foreground">Onboard new institutional instances, manage license tiers, and suspend nodes.</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-none border-2 border-border bg-primary hover:bg-primary/95 text-white uppercase text-xs font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none">
              <PlusCircle className="mr-2 h-4.5 w-4.5" /> Onboard College
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-card">
            <DialogHeader>
              <DialogTitle className="uppercase text-sm tracking-wider">Onboard College Node</DialogTitle>
              <DialogDescription>Initialize a new university network instance.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleOnboardSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-muted-foreground">College Full Name *</Label>
                <Input value={newCollege.name} onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })} required placeholder="e.g. Stanford University" className="rounded-none border-2 border-border" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground">Short Name *</Label>
                  <Input value={newCollege.shortName} onChange={(e) => setNewCollege({ ...newCollege, shortName: e.target.value })} required placeholder="e.g. Stanford" className="rounded-none border-2 border-border" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground">Domain</Label>
                  <Input value={newCollege.domain} onChange={(e) => setNewCollege({ ...newCollege, domain: e.target.value })} placeholder="e.g. stanford.edu" className="rounded-none border-2 border-border" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground">Website</Label>
                  <Input value={newCollege.website} onChange={(e) => setNewCollege({ ...newCollege, website: e.target.value })} placeholder="e.g. https://stanford.edu" className="rounded-none border-2 border-border" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground">City, State</Label>
                  <Input value={newCollege.cityState} onChange={(e) => setNewCollege({ ...newCollege, cityState: e.target.value })} placeholder="e.g. Stanford, CA" className="rounded-none border-2 border-border" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground">Country</Label>
                  <Input value={newCollege.country} onChange={(e) => setNewCollege({ ...newCollege, country: e.target.value })} className="rounded-none border-2 border-border" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground">License Tier</Label>
                  <Select value={newCollege.subscriptionTier} onValueChange={(val) => setNewCollege({ ...newCollege, subscriptionTier: val as College["subscriptionTier"] })}>
                    <SelectTrigger className="rounded-none border-2 border-border bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-muted-foreground">Description</Label>
                <Textarea value={newCollege.description} onChange={(e) => setNewCollege({ ...newCollege, description: e.target.value })} placeholder="Institution description..." rows={3} className="rounded-none border-2 border-border resize-none" />
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="rounded-none border-2 border-border">Cancel</Button>
                <Button type="submit" disabled={onboardLoading} className="rounded-none border-2 border-border bg-primary hover:bg-primary/95 text-white">
                  {onboardLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Onboard"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search registered colleges..." 
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
                <th className="px-6 py-4">College Name</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">SaaS Tier</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredColleges.map((col) => (
                <tr key={col.id} className="hover:bg-muted/10 transition-colors font-semibold">
                  <td className="px-6 py-4 flex items-center gap-2 uppercase font-bold">
                    <Building2 className="h-4.5 w-4.5 text-primary shrink-0" /> {col.name} ({col.shortName})
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{col.domain || "—"}</td>
                  <td className="px-6 py-4 text-muted-foreground">{col.country}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-border bg-muted/10 text-foreground font-bold uppercase text-[9px]">
                      {col.subscriptionTier}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={col.status === "active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                      {col.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-none border-2 border-border font-bold uppercase text-[10px] tracking-wider" 
                      disabled={actionLoading === col.id}
                      onClick={() => handleToggleStatus(col.id, col.status)}
                    >
                      {actionLoading === col.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : col.status === "active" ? "Suspend" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredColleges.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground text-sm font-semibold">
                    No colleges found.
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
