import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Link as LinkIcon, Building, GraduationCap, Calendar, Mail, MessageSquare, UserPlus } from "lucide-react";
import { useParams, Link } from "react-router-dom";

export default function AlumniProfilePage() {
  const { id } = useParams();

  // Mock data for the alumni profile
  const alumni = {
    name: "Eleanor Pena",
    role: "Product Designer",
    company: "Figma",
    location: "New York, NY",
    bio: "Passionate product designer with 5+ years of experience in building intuitive and accessible digital products. Specialized in design systems and user research.",
    email: "eleanor.pena@example.com",
    linkedin: "linkedin.com/in/eleanorpena",
    skills: ["UI/UX", "Figma", "User Research", "Design Systems"],
    experience: [
      {
        title: "Senior Product Designer",
        company: "Figma",
        period: "2021 - Present",
        description: "Leading the core design system team and establishing new accessibility standards across the platform."
      },
      {
        title: "UX Designer",
        company: "Stripe",
        period: "2018 - 2021",
        description: "Designed seamless checkout experiences for mobile and web."
      }
    ],
    education: [
      {
        school: "Rhode Island School of Design",
        degree: "BFA in Industrial Design",
        period: "2014 - 2018"
      }
    ],
    init: "EP"
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link to="/directory" className="hover:text-foreground transition-colors">Directory</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{alumni.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm overflow-hidden">
            <div className="h-32 bg-muted relative"></div>
            <CardContent className="px-6 pb-6 pt-0 relative">
              <div className="flex justify-between items-end -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-card rounded-xl">
                  <AvatarFallback className="rounded-xl text-2xl font-bold bg-primary/10 text-primary">{alumni.init}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{alumni.name}</h3>
                <p className="text-muted-foreground font-medium">{alumni.role} at {alumni.company}</p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button className="w-full flex-1">
                  <UserPlus className="mr-2 h-4 w-4" /> Connect
                </Button>
                <Button variant="outline" size="icon" className="shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4 text-primary/70" />
                  {alumni.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="mr-2 h-4 w-4 text-primary/70" />
                  {alumni.company}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4 text-primary/70" />
                  {alumni.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <LinkIcon className="mr-2 h-4 w-4 text-primary/70" />
                  <a href="#" className="text-primary hover:underline">{alumni.linkedin}</a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {alumni.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{alumni.bio}</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {alumni.experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l border-border pb-6 last:pb-0">
                  <div className="absolute w-3 h-3 bg-primary/40 rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                  <h4 className="text-base font-semibold">{exp.title}</h4>
                  <p className="text-sm font-medium text-foreground/80">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mt-1 mb-3 flex items-center">
                    <Calendar className="mr-1 h-3 w-3" /> {exp.period}
                  </p>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              {alumni.education.map((edu, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-2 bg-muted rounded-md shrink-0">
                    <GraduationCap className="h-6 w-6 text-foreground/70" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold">{edu.school}</h4>
                    <p className="text-sm font-medium text-foreground/80">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
