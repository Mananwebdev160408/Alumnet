import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Mail, Save, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SysAdminSettings() {
  const { toast } = useToast();
  
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [smtpServer, setSmtpServer] = useState("smtp.sendgrid.net");
  const [sessionTimeout, setSessionTimeout] = useState("60");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Global Config Saved",
      description: "Platform settings updated successfully."
    });
  };

  const handleMaintenanceToggle = (checked: boolean) => {
    setMaintenanceMode(checked);
    toast({
      title: checked ? "Maintenance Active" : "Maintenance Disabled",
      description: checked 
        ? "Platform locked down. All sessions redirected to banner site."
        : "Platform unlocked and active."
    });
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Platform Settings</h2>
          <p className="text-muted-foreground">Manage global email gateways, maintenance modes, and access session timeouts.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none border-destructive/20 bg-destructive/5">
          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-lg uppercase flex items-center gap-2 text-destructive">
                <ShieldAlert className="h-5 w-5 animate-pulse" /> Maintenance Mode
              </h3>
              <p className="text-xs text-muted-foreground font-semibold max-w-md">
                Lock down platform access across all institutional nodes. Users will see a global maintenance announcement banner.
              </p>
            </div>
            <Switch checked={maintenanceMode} onCheckedChange={handleMaintenanceToggle} className="data-[state=checked]:bg-destructive" />
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="border-b border-border">
            <CardTitle className="uppercase text-sm tracking-wider flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" /> SMTP Gateway Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">SMTP Host Server</span>
                <Input value={smtpServer} onChange={e => setSmtpServer(e.target.value)} required className="rounded-none border-2 border-border" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">SMTP Port (SSL)</span>
                <Input value="465" disabled className="rounded-none border-2 border-border bg-muted/30 font-bold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="border-b border-border">
            <CardTitle className="uppercase text-sm tracking-wider flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> Access Timout Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Session Limit (Minutes)</span>
              <Input type="number" value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)} required className="rounded-none border-2 border-border" />
            </div>
          </CardContent>
          <CardFooter className="p-6 border-t border-border flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold">
              <Save className="mr-2 h-4.5 w-4.5" /> Save Configuration
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
