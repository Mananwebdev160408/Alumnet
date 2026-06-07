import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { MapPin, Link as LinkIcon, Building, GraduationCap, Mail, Loader2, Save } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { updateUserProfile } from "@/lib/firestoreService";
import { toast } from "sonner";

export default function Profile() {
  const { currentUser, userProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  // General state
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Professional state
  const [company, setCompany] = useState("");
  const [occupation, setOccupation] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [isMentor, setIsMentor] = useState(false);
  const [openToMentor, setOpenToMentor] = useState(false);
  const [openToRefer, setOpenToRefer] = useState(false);

  // Academic state
  const [branch, setBranch] = useState("");
  const [graduationYear, setGraduationYear] = useState(0);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name ?? "");
      setBio(userProfile.bio ?? "");
      setLocation(userProfile.location ?? "");
      setLinkedin(userProfile.linkedin ?? "");
      setCompany(userProfile.company ?? "");
      setOccupation(userProfile.occupation ?? "");
      setSkills(userProfile.skills ?? []);
      setIsMentor(userProfile.isMentor ?? false);
      setOpenToMentor(userProfile.openToMentor ?? false);
      setOpenToRefer(userProfile.openToRefer ?? false);
      setBranch(userProfile.branch ?? "");
      setGraduationYear(userProfile.graduationYear ?? 0);
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      await updateUserProfile(currentUser.uid, {
        name,
        bio,
        location,
        linkedin,
        company,
        occupation,
        skills,
        isMentor,
        openToMentor,
        openToRefer,
        branch,
        graduationYear,
      });
      await refreshProfile();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const initials = (n: string) =>
    n.split(" ").map((x) => x[0]).join("").toUpperCase().slice(0, 2);

  if (!userProfile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">My Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and network presence.</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="rounded-none border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none uppercase text-xs font-bold bg-primary hover:bg-primary/95 text-white">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="space-y-6">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none overflow-hidden">
            <div className="h-28 bg-muted relative"></div>
            <CardContent className="px-6 pb-6 pt-0 relative">
              <div className="flex justify-between items-end -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-card rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <AvatarFallback className="rounded-none text-2xl font-bold bg-primary/10 text-primary">
                    {initials(name || userProfile.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <Badge variant="outline" className="mb-2 uppercase font-bold text-[10px] border-primary text-primary bg-primary/5">
                  {userProfile.role}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold uppercase">{name || "Your Name"}</h3>
                <p className="text-muted-foreground font-semibold text-sm">
                  {occupation} {company ? `at ${company}` : ""}
                </p>
              </div>
              
              <div className="mt-6 space-y-3">
                {location && (
                  <div className="flex items-center text-sm text-muted-foreground font-semibold">
                    <MapPin className="mr-2 h-4 w-4 text-primary/70" />
                    {location}
                  </div>
                )}
                {company && (
                  <div className="flex items-center text-sm text-muted-foreground font-semibold">
                    <Building className="mr-2 h-4 w-4 text-primary/70" />
                    {company}
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground font-semibold">
                  <Mail className="mr-2 h-4 w-4 text-primary/70" />
                  {userProfile.email}
                </div>
                {linkedin && (
                  <div className="flex items-center text-sm text-muted-foreground font-semibold">
                    <LinkIcon className="mr-2 h-4 w-4 text-primary/70" />
                    <a href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{linkedin}</a>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.length === 0 ? (
                    <span className="text-xs text-muted-foreground">No skills listed</span>
                  ) : (
                    skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="font-normal text-xs">{skill}</Badge>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs & Forms */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="bg-muted/50 p-1 mb-4 grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="general" className="uppercase text-xs font-bold tracking-wider">General</TabsTrigger>
              <TabsTrigger value="professional" className="uppercase text-xs font-bold tracking-wider">Career</TabsTrigger>
              <TabsTrigger value="academic" className="uppercase text-xs font-bold tracking-wider">Academic</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
                <CardHeader>
                  <CardTitle className="uppercase text-sm tracking-wider">Basic Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-none border-2 border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Location</Label>
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-none border-2 border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">LinkedIn Profile URL</Label>
                    <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="rounded-none border-2 border-border" placeholder="linkedin.com/in/username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Professional Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us a little bit about yourself" 
                      className="min-h-[120px] rounded-none border-2 border-border"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
                <CardHeader>
                  <CardTitle className="uppercase text-sm tracking-wider">Career & Expertise</CardTitle>
                  <CardDescription>Manage your current role and skills.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="occupation" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Current Role / Occupation</Label>
                      <Input id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} className="rounded-none border-2 border-border" placeholder="e.g. Senior Software Engineer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Company / Organization</Label>
                      <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-none border-2 border-border" placeholder="e.g. Google" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Skills (Press Enter to add)</Label>
                    <Input 
                      id="skills" 
                      value={skillInput} 
                      onChange={(e) => setSkillInput(e.target.value)} 
                      onKeyDown={addSkill} 
                      className="rounded-none border-2 border-border" 
                      placeholder="e.g. React, TypeScript, Product Management" 
                    />
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {skills.map(s => (
                        <Badge key={s} variant="secondary" className="font-semibold text-xs rounded-none border border-border bg-muted/50 flex items-center gap-1">
                          {s}
                          <button onClick={() => removeSkill(s)} className="text-[9px] hover:text-destructive font-black ml-1">×</button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mt-6 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Preferences</h4>
                    
                    <div className="flex items-center justify-between p-3 border border-border/50 bg-muted/10">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-bold">Register as Mentor</Label>
                        <p className="text-xs text-muted-foreground">Make your profile discoverable as a mentor in the directory.</p>
                      </div>
                      <Switch checked={isMentor} onCheckedChange={setIsMentor} />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border/50 bg-muted/10">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-bold">Open to Bookings</Label>
                        <p className="text-xs text-muted-foreground">Allow students to book 1-on-1 mentorship sessions with you.</p>
                      </div>
                      <Switch checked={openToMentor} onCheckedChange={setOpenToMentor} disabled={!isMentor} />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border/50 bg-muted/10">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-bold">Open to Referral Requests</Label>
                        <p className="text-xs text-muted-foreground">Allow students to request job referrals from you.</p>
                      </div>
                      <Switch checked={openToRefer} onCheckedChange={setOpenToRefer} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6">
              <Card className="border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
                <CardHeader>
                  <CardTitle className="uppercase text-sm tracking-wider">Academic Record</CardTitle>
                  <CardDescription>Your college academic details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">College / Institution</Label>
                    <Input value={userProfile.college} disabled className="rounded-none border-2 border-border bg-muted/30 font-bold" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Branch / Major</Label>
                      <Input id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} className="rounded-none border-2 border-border" placeholder="e.g. Computer Science" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gradYear" className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">Graduation Year</Label>
                      <Input id="gradYear" type="number" value={graduationYear || ""} onChange={(e) => setGraduationYear(Number(e.target.value))} className="rounded-none border-2 border-border" placeholder="e.g. 2024" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
