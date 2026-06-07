import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Cpu, MessageSquare, Briefcase, Bell, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FeatureFlags() {
  const { toast } = useToast();
  
  const [globalFlags, setGlobalFlags] = useState({
    jobBoard: true,
    groupMentorship: false,
    aiAssistant: true,
    pushNotifications: false,
    bulkImport: true
  });

  const handleToggle = (key: keyof typeof globalFlags, checked: boolean) => {
    setGlobalFlags(prev => ({ ...prev, [key]: checked }));
    toast({
      title: "Global Flag Updated",
      description: `Feature ${key} updated state to ${checked ? "Enabled" : "Disabled"}.`
    });
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Global Feature Flags</h2>
          <p className="text-muted-foreground">Toggle platform modules globally to roll out updates gradually.</p>
        </div>
      </div>

      <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
        <CardHeader className="border-b border-border">
          <CardTitle className="uppercase text-sm tracking-wider">Module Toggles</CardTitle>
          <CardDescription>Changes apply instantly across all onboarded institutions.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="p-2 border border-border bg-white text-primary shrink-0 self-start">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold uppercase tracking-wider">Alumni Job Board Module</span>
                <p className="text-xs text-muted-foreground font-medium">Controls access to job posting forms and referral tracking systems.</p>
              </div>
            </div>
            <Switch checked={globalFlags.jobBoard} onCheckedChange={checked => handleToggle("jobBoard", checked)} className="data-[state=checked]:bg-primary" />
          </div>

          <div className="flex items-center justify-between border-t border-border/10 pt-6">
            <div className="flex gap-3">
              <div className="p-2 border border-border bg-white text-primary shrink-0 self-start">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold uppercase tracking-wider">AI Career Assistant (aichat)</span>
                <p className="text-xs text-muted-foreground font-medium">Controls chat integration with Azure AI models client side.</p>
              </div>
            </div>
            <Switch checked={globalFlags.aiAssistant} onCheckedChange={checked => handleToggle("aiAssistant", checked)} className="data-[state=checked]:bg-primary" />
          </div>

          <div className="flex items-center justify-between border-t border-border/10 pt-6">
            <div className="flex gap-3">
              <div className="p-2 border border-border bg-white text-primary shrink-0 self-start">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold uppercase tracking-wider">Group Mentorship Workshops</span>
                <p className="text-xs text-muted-foreground font-medium">Permit alumni to schedule group video calls rather than 1:1 sessions.</p>
              </div>
            </div>
            <Switch checked={globalFlags.groupMentorship} onCheckedChange={checked => handleToggle("groupMentorship", checked)} className="data-[state=checked]:bg-primary" />
          </div>

          <div className="flex items-center justify-between border-t border-border/10 pt-6">
            <div className="flex gap-3">
              <div className="p-2 border border-border bg-white text-primary shrink-0 self-start">
                <Bell className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold uppercase tracking-wider">Push Web Notifications</span>
                <p className="text-xs text-muted-foreground font-medium">Active browser notification worker client side.</p>
              </div>
            </div>
            <Switch checked={globalFlags.pushNotifications} onCheckedChange={checked => handleToggle("pushNotifications", checked)} className="data-[state=checked]:bg-primary" />
          </div>

          <div className="flex items-center justify-between border-t border-border/10 pt-6">
            <div className="flex gap-3">
              <div className="p-2 border border-border bg-white text-primary shrink-0 self-start">
                <Database className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold uppercase tracking-wider">Bulk CSV Import Engine</span>
                <p className="text-xs text-muted-foreground font-medium">Allows college admins to upload CSV student lists.</p>
              </div>
            </div>
            <Switch checked={globalFlags.bulkImport} onCheckedChange={checked => handleToggle("bulkImport", checked)} className="data-[state=checked]:bg-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
