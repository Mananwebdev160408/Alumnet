import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, ShieldCheck, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="flex-1 p-8 pt-6 max-w-5xl mx-auto w-full space-y-8">
      <div className="text-center space-y-4 py-8">
        <Badge variant="secondary" className="px-4 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">About AlumNet</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Connecting Alumni Worldwide
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AlumNet provides a premium, professional platform to help you network, find mentorships, and discover new career opportunities with your fellow alumni.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border shadow-sm text-center p-6 border-t-4 border-t-primary">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mb-2">Vibrant Community</CardTitle>
          <p className="text-sm text-muted-foreground">Join thousands of verified alumni spanning hundreds of industries globally.</p>
        </Card>
        
        <Card className="border-border shadow-sm text-center p-6 border-t-4 border-t-accent">
          <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6 text-accent" />
          </div>
          <CardTitle className="mb-2">Trusted Network</CardTitle>
          <p className="text-sm text-muted-foreground">All accounts are verified, ensuring you interact with a safe, authentic network.</p>
        </Card>
        
        <Card className="border-border shadow-sm text-center p-6 border-t-4 border-t-primary-light">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mb-2">Global Reach</CardTitle>
          <p className="text-sm text-muted-foreground">Find local meetups or connect with professionals across borders seamlessly.</p>
        </Card>
      </div>

      <Card className="border-border shadow-sm bg-muted/20">
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          <h2 className="text-2xl font-bold">Have Questions?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our support team is always ready to help you navigate the platform or resolve any issues you might face.
          </p>
          <Button size="lg" className="px-8">
            <Mail className="mr-2 h-4 w-4" /> Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
