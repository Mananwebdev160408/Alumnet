import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Lock, Globe, Shield } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-8 pt-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <Tabs defaultValue="account" className="w-full flex flex-col md:flex-row gap-6">
          <TabsList className="flex flex-row md:flex-col justify-start h-auto bg-transparent gap-1 md:w-64 overflow-x-auto w-full pb-2 md:pb-0">
            <TabsTrigger value="account" className="justify-start data-[state=active]:bg-muted/50 data-[state=active]:text-foreground w-full py-2.5">
              <User className="mr-2 h-4 w-4" /> Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="justify-start data-[state=active]:bg-muted/50 data-[state=active]:text-foreground w-full py-2.5">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="justify-start data-[state=active]:bg-muted/50 data-[state=active]:text-foreground w-full py-2.5">
              <Lock className="mr-2 h-4 w-4" /> Privacy & Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="justify-start data-[state=active]:bg-muted/50 data-[state=active]:text-foreground w-full py-2.5">
              <Globe className="mr-2 h-4 w-4" /> Appearance
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="account" className="mt-0 space-y-6">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>Update your personal information and email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                    <p className="text-[10px] text-muted-foreground">This is the email you use to log in to AlumNet.</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (US)</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border mt-6 pt-6">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-border shadow-sm border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions related to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Delete Account</h4>
                      <p className="text-[10px] text-muted-foreground">Permanently remove your account and all data.</p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0 space-y-6">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Choose what updates you want to receive via email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Connection Requests</Label>
                      <p className="text-sm text-muted-foreground">Receive emails when someone wants to connect.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Direct Messages</Label>
                      <p className="text-sm text-muted-foreground">Receive emails when you get a new message.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Mentorship Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about your mentorship sessions.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Marketing & Events</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about upcoming alumni events and news.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0 space-y-6">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Profile Visibility</CardTitle>
                  <CardDescription>Control who can see your profile details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to search engines.</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Show Contact Info</Label>
                      <p className="text-sm text-muted-foreground">Allow your connections to see your email and phone number.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your password and authentication.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/20 border border-border rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-emerald-500" />
                      <div>
                        <h4 className="font-medium text-sm">Two-Factor Authentication</h4>
                        <p className="text-[10px] text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border mt-6 pt-6">
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-0 space-y-6">
               <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Theme Preferences</CardTitle>
                  <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    The platform currently defaults to a Light Swiss design. Dark mode toggles and accent overrides can be managed here in the future.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     <div className="border-2 border-primary rounded-lg p-2 cursor-pointer bg-background">
                       <div className="h-24 bg-background border border-border rounded-md shadow-sm mb-2 flex items-start p-2 gap-2">
                         <div className="w-4 h-full bg-muted/50 rounded-sm"></div>
                         <div className="flex-1 space-y-2">
                           <div className="h-2 w-full bg-primary/20 rounded-sm"></div>
                           <div className="h-8 w-full bg-card border border-border shadow-sm rounded-sm"></div>
                         </div>
                       </div>
                       <p className="text-center text-sm font-medium">Light (Default)</p>
                     </div>
                     <div className="border-2 border-transparent hover:border-border rounded-lg p-2 cursor-pointer opacity-50">
                       <div className="h-24 bg-[#0a0a0a] border border-[#222] rounded-md shadow-sm mb-2 flex items-start p-2 gap-2">
                         <div className="w-4 h-full bg-[#111] rounded-sm"></div>
                         <div className="flex-1 space-y-2">
                           <div className="h-2 w-full bg-[#222] rounded-sm"></div>
                           <div className="h-8 w-full bg-[#111] border border-[#333] shadow-sm rounded-sm"></div>
                         </div>
                       </div>
                       <p className="text-center text-sm font-medium">Dark Mode</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
