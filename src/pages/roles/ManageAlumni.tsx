import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, CheckCircle, XCircle, Download, UserPlus } from "lucide-react";

export default function ManageAlumni() {
  const alumni = [
    { id: 1, name: "Robert Fox", email: "robert@example.com", year: "2018", status: "Verified", init: "RF" },
    { id: 2, name: "Kristin Watson", email: "kristin@example.com", year: "2020", status: "Pending", init: "KW" },
    { id: 3, name: "Cody Fisher", email: "cody@example.com", year: "2015", status: "Verified", init: "CF" },
    { id: 4, name: "Jane Cooper", email: "jane@example.com", year: "2022", status: "Pending", init: "JC" },
    { id: 5, name: "Esther Howard", email: "esther@example.com", year: "2012", status: "Verified", init: "EH" },
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Manage Alumni</h2>
          <p className="text-muted-foreground">Verify and manage members of your network.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
          <Button><UserPlus className="mr-2 h-4 w-4" /> Add Alumni</Button>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search alumni by name or email..." className="pl-9 bg-background" />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[140px] bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="newest">
                <SelectTrigger className="w-full md:w-[140px] bg-background">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
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
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Grad Year</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {alumni.map((person) => (
                  <tr key={person.id} className="bg-background hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{person.init}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{person.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{person.email}</td>
                    <td className="px-6 py-4 text-muted-foreground">{person.year}</td>
                    <td className="px-6 py-4">
                      {person.status === "Verified" ? (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                          <CheckCircle className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {person.status === "Pending" ? (
                        <div className="flex justify-end gap-2">
                           <Button size="sm" variant="outline" className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200">Approve</Button>
                           <Button size="sm" variant="ghost" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10">Reject</Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing 1-5 of 8,249 alumni</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
