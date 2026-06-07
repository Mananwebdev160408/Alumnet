import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Building2, ShieldCheck, ShieldAlert, CheckCircle, XCircle, Settings2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManageOrgs() {
  const organizations = [
    { id: 1, name: "Stanford University", type: "Education", members: 12450, status: "Active", init: "SU" },
    { id: 2, name: "Vercel", type: "Company", members: 340, status: "Active", init: "VC" },
    { id: 3, name: "Acme Corp", type: "Company", members: 0, status: "Pending", init: "AC" },
    { id: 4, name: "TechStart Bootcamps", type: "Education", members: 0, status: "Pending", init: "TB" },
    { id: 5, name: "Stripe", type: "Company", members: 890, status: "Active", init: "ST" },
    { id: 6, name: "Suspended LLC", type: "Company", members: 12, status: "Suspended", init: "SL" },
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Manage Organizations</h2>
          <p className="text-muted-foreground">Approve, suspend, and configure platform tenants.</p>
        </div>
        <Button><Building2 className="mr-2 h-4 w-4" /> Register New Org</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="all" className="px-6">All Organizations</TabsTrigger>
          <TabsTrigger value="pending" className="px-6 relative">
            Pending Approvals
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] rounded-full">2</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search organizations by name or type..." className="pl-9 bg-background" />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[140px] bg-background">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-status">
                    <SelectTrigger className="w-full md:w-[140px] bg-background">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground border-b border-border uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-medium">Organization</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Members</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {organizations.map((org) => (
                      <tr key={org.id} className="bg-background hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3 border border-border">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{org.init}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{org.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{org.type}</td>
                        <td className="px-6 py-4 text-muted-foreground">{org.members.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          {org.status === "Active" ? (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                              <ShieldCheck className="mr-1 h-3 w-3" /> Active
                            </Badge>
                          ) : org.status === "Pending" ? (
                            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/5">
                              <ShieldAlert className="mr-1 h-3 w-3" /> Suspended
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                             <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">Manage</Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                               <Settings2 className="h-4 w-4" />
                             </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizations.filter(o => o.status === "Pending").map((org) => (
                <Card key={org.id} className="border-border shadow-sm flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarFallback className="bg-primary/10 text-primary">{org.init}</AvatarFallback>
                      </Avatar>
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Requires Review</Badge>
                    </div>
                    <CardTitle className="text-lg">{org.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <Building2 className="mr-1.5 h-3.5 w-3.5" /> {org.type}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="text-sm border border-border p-3 rounded-md bg-muted/20">
                      <p className="text-muted-foreground mb-1 text-xs uppercase font-semibold">Contact Info</p>
                      <p>admin@{org.name.toLowerCase().replace(/\s/g, '')}.com</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </CardContent>
                  <CardContent className="pt-0 border-t border-border flex justify-between gap-3 p-4">
                    <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 border-destructive/20 hover:text-destructive">
                       <XCircle className="mr-2 h-4 w-4" /> Reject
                    </Button>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                       <CheckCircle className="mr-2 h-4 w-4" /> Approve
                    </Button>
                  </CardContent>
                </Card>
              ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
