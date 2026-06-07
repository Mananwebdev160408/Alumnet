import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Building2, Search, PlusCircle, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CollegeManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState([
    { id: 1, name: "MIT", admin: "Dean Alpha", users: "12,400", tier: "Enterprise", status: "Active" },
    { id: 2, name: "Stanford", admin: "Registrar Beta", users: "8,900", tier: "Enterprise", status: "Active" },
    { id: 3, name: "Imperial Academy", admin: "Sarah Chen", users: "4,500", tier: "Premium", status: "Active" },
    { id: 4, name: "IIT Delhi", admin: "Registrar Alpha", users: "1,200", tier: "Premium", status: "Active" }
  ]);

  const handleToggleStatus = (id: number) => {
    setColleges(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "Active" ? "Suspended" : "Active" } : c));
    toast({
      title: "College Status Updated",
      description: "College lifecycle state updated."
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">College Nodes Management</h2>
          <p className="text-muted-foreground">Onboard new institutional instances, manage license tiers, and suspend nodes.</p>
        </div>
        <Button className="rounded-none border-2 border-border bg-primary hover:bg-primary/95 text-white uppercase text-xs font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none">
          <PlusCircle className="mr-2 h-4.5 w-4.5" /> Onboard College
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search registered colleges by name or admin..." 
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
                <th className="px-6 py-4">Assigned Admin</th>
                <th className="px-6 py-4">User Count</th>
                <th className="px-6 py-4">SaaS Tier</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {colleges
                .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.admin.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((col) => (
                  <tr key={col.id} className="hover:bg-muted/10 transition-colors font-semibold">
                    <td className="px-6 py-4 flex items-center gap-2 uppercase font-bold">
                      <Building2 className="h-4.5 w-4.5 text-primary shrink-0" /> {col.name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{col.admin}</td>
                    <td className="px-6 py-4">{col.users}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="border-border bg-muted/10 text-foreground font-bold uppercase text-[9px]">
                        {col.tier}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={col.status === "Active" ? "secondary" : "destructive"} className="uppercase text-[9px]">
                        {col.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="rounded-none border-2 border-border font-bold uppercase text-[10px] tracking-wider" onClick={() => handleToggleStatus(col.id)}>
                        {col.status === "Active" ? "Suspend" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
