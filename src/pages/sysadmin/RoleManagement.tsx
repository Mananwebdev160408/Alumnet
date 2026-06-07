import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, ShieldAlert, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RoleManagement() {
  const { toast } = useToast();
  
  const [admins, setAdmins] = useState([
    { id: 1, name: "Registrar Alpha", college: "IIT Delhi", assigned: "June 1, 2026", email: "iitd_admin@alumnet.com" },
    { id: 2, name: "Dean Alpha", college: "MIT", assigned: "May 20, 2026", email: "mit_admin@alumnet.com" }
  ]);

  const handleRevoke = (id: number, name: string) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Role Revoked",
      description: `${name} has been stripped of College Admin privileges.`,
      variant: "destructive"
    });
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Role Management</h2>
          <p className="text-muted-foreground">Assign or revoke College Admin roles to verified institutional personnel.</p>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle className="uppercase text-sm tracking-wider">Active College Admins</CardTitle>
          <CardDescription>Roster of currently authorized administrative accounts.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Institution</th>
                <th className="px-6 py-4">Assigned Date</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-muted/10 transition-colors font-semibold">
                  <td className="px-6 py-4 font-bold uppercase flex items-center gap-2">
                    <Shield className="h-4.5 w-4.5 text-primary shrink-0" /> {admin.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{admin.college}</td>
                  <td className="px-6 py-4">{admin.assigned}</td>
                  <td className="px-6 py-4 text-muted-foreground">{admin.email}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="rounded-none border-2 border-border text-destructive hover:bg-destructive/10 uppercase text-[10px] font-bold" onClick={() => handleRevoke(admin.id, admin.name)}>
                      Revoke Access
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
