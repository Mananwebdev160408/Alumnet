import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, MapPin, Link as LinkIcon, Building, GraduationCap, Calendar, Mail } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and network presence.</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm overflow-hidden">
            <div className="h-32 bg-muted relative">
              <Button size="icon" variant="secondary" className="absolute top-4 right-4 h-8 w-8 rounded-full shadow-sm">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="px-6 pb-6 pt-0 relative">
              <div className="flex justify-between items-end -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-card rounded-xl">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <AvatarFallback className="rounded-xl text-2xl font-bold bg-primary/10 text-primary">JD</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="mb-2">Change Avatar</Button>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-muted-foreground font-medium">Senior Software Engineer at TechCorp</p>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4 text-primary/70" />
                  San Francisco, CA
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="mr-2 h-4 w-4 text-primary/70" />
                  TechCorp Inc.
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4 text-primary/70" />
                  john.doe@example.com
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <LinkIcon className="mr-2 h-4 w-4 text-primary/70" />
                  <a href="#" className="text-primary hover:underline">linkedin.com/in/johndoe</a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">System Design</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs & Forms */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="bg-muted/50 p-1 mb-4 grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us a little bit about yourself" 
                      className="min-h-[120px]"
                      defaultValue="Passionate software engineer with over 8 years of experience building scalable web applications. Currently focused on frontend architecture and performance optimization."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card className="border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Your professional journey.</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">Add Role</Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Experience Item */}
                  <div className="relative pl-6 border-l border-border pb-6 last:pb-0">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                    <h4 className="text-base font-semibold">Senior Software Engineer</h4>
                    <p className="text-sm font-medium text-foreground/80">TechCorp Inc.</p>
                    <p className="text-xs text-muted-foreground mt-1 mb-3 flex items-center">
                      <Calendar className="mr-1 h-3 w-3" /> 2020 - Present
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Led the frontend team in rebuilding the core platform using React and TypeScript. Improved load times by 40% and established new coding standards.
                    </p>
                  </div>
                  
                  {/* Experience Item */}
                  <div className="relative pl-6 border-l border-border">
                    <div className="absolute w-3 h-3 bg-muted-foreground/30 rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                    <h4 className="text-base font-semibold">Software Engineer</h4>
                    <p className="text-sm font-medium text-foreground/80">StartupCo</p>
                    <p className="text-xs text-muted-foreground mt-1 mb-3 flex items-center">
                      <Calendar className="mr-1 h-3 w-3" /> 2017 - 2020
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Developed and maintained full-stack features using Node.js and React. Collaborated closely with design and product teams.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <Card className="border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Academic background.</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">Add Degree</Button>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-muted rounded-md shrink-0">
                      <GraduationCap className="h-6 w-6 text-foreground/70" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold">University of Technology</h4>
                      <p className="text-sm font-medium text-foreground/80">B.S. in Computer Science</p>
                      <p className="text-xs text-muted-foreground mt-1">2013 - 2017</p>
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
