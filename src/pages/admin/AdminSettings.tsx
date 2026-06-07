import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Globe, Building, ShieldCheck, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    collegeName: "IIT Delhi",
    domainWhitelist: "iitd.ac.in, iitd.com",
    website: "https://www.iitd.ac.in",
    enableJobs: true,
    enableMentorship: true,
    enableChat: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "College parameters successfully synchronized."
    });
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">College Settings</h2>
          <p className="text-muted-foreground">Manage whitelist email domains, college branding info, and module access control.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="border-b border-border">
            <CardTitle className="uppercase text-sm tracking-wider flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" /> College Branding Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">College Name</span>
                <Input value={formData.collegeName} onChange={e => setFormData({ ...formData, collegeName: e.target.value })} required className="rounded-none border-2 border-border" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Official Website</span>
                <Input value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} required className="rounded-none border-2 border-border" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="border-b border-border">
            <CardTitle className="uppercase text-sm tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Verification Whitelist
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Whitelisted Domain List (comma separated)</span>
              <Input value={formData.domainWhitelist} onChange={e => setFormData({ ...formData, domainWhitelist: e.target.value })} required className="rounded-none border-2 border-border font-mono text-sm" />
              <p className="text-[10px] text-muted-foreground font-semibold italic">
                Only students and alumni with email addresses ending in these domains can register.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
          <CardHeader className="border-b border-border">
            <CardTitle className="uppercase text-sm tracking-wider">Module Toggles</CardTitle>
            <CardDescription>Activate or deactivate specific AlumNet features for this college.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-bold uppercase tracking-wider">Enable Job Referral Board</span>
                <p className="text-xs text-muted-foreground font-medium">Allow alumni to share job openings and students to request referrals.</p>
              </div>
              <Switch checked={formData.enableJobs} onCheckedChange={checked => setFormData({ ...formData, enableJobs: checked })} className="data-[state=checked]:bg-primary" />
            </div>

            <div className="flex items-center justify-between border-t border-border/10 pt-6">
              <div className="space-y-0.5">
                <span className="text-sm font-bold uppercase tracking-wider">Enable Mentorship Bookings</span>
                <p className="text-xs text-muted-foreground font-medium">Permit students to schedule recurring mentorship sessions with alumni.</p>
              </div>
              <Switch checked={formData.enableMentorship} onCheckedChange={checked => setFormData({ ...formData, enableMentorship: checked })} className="data-[state=checked]:bg-primary" />
            </div>

            <div className="flex items-center justify-between border-t border-border/10 pt-6">
              <div className="space-y-0.5">
                <span className="text-sm font-bold uppercase tracking-wider">Enable Live Messaging Hub</span>
                <p className="text-xs text-muted-foreground font-medium">Allow real-time 1:1 chat between verified connections.</p>
              </div>
              <Switch checked={formData.enableChat} onCheckedChange={checked => setFormData({ ...formData, enableChat: checked })} className="data-[state=checked]:bg-primary" />
            </div>
          </CardContent>
          <CardFooter className="p-6 border-t border-border flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold">
              <Save className="mr-2 h-4.5 w-4.5" /> Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
