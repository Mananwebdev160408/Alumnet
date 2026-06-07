import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Building, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";

export default function Directory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const alumniList = [
    { name: "Eleanor Pena", role: "Product Designer", company: "Figma", location: "New York, NY", year: "2018", init: "EP" },
    { name: "Wade Warren", role: "Frontend Developer", company: "Vercel", location: "San Francisco, CA", year: "2019", init: "WW" },
    { name: "Esther Howard", role: "Data Scientist", company: "OpenAI", location: "Remote", year: "2015", init: "EH" },
    { name: "Cameron Williamson", role: "VP of Engineering", company: "Stripe", location: "Austin, TX", year: "2012", init: "CW" },
    { name: "Brooklyn Simmons", role: "UX Researcher", company: "Airbnb", location: "Seattle, WA", year: "2020", init: "BS" },
    { name: "Leslie Alexander", role: "Marketing Manager", company: "Notion", location: "London, UK", year: "2017", init: "LA" },
    { name: "Jenny Wilson", role: "Software Engineer", company: "Microsoft", location: "Redmond, WA", year: "2021", init: "JW" },
    { name: "Guy Hawkins", role: "DevOps Engineer", company: "AWS", location: "Denver, CO", year: "2016", init: "GH" },
  ];

  return (
    <div className="flex-1 p-8 pt-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Alumni Directory</h2>
          <p className="text-muted-foreground">Find and connect with fellow alumni.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, company, or role..." className="pl-9 w-full bg-background" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[140px] bg-background">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="health">Healthcare</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="recent">
            <SelectTrigger className="w-full md:w-[140px] bg-background">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="year">Grad Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="shrink-0 bg-background">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {alumniList.map((alumni, index) => (
          <Card key={index} className="border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="text-center pb-2 pt-6">
              <Avatar className="h-20 w-20 mx-auto mb-4 border-2 border-background shadow-sm group-hover:scale-105 transition-transform">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{alumni.init}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg leading-none truncate">{alumni.name}</h3>
              <p className="text-sm text-primary font-medium mt-1 truncate">{alumni.role}</p>
            </CardHeader>
            <CardContent className="text-center pb-4 flex-1">
              <div className="space-y-2 text-sm text-muted-foreground mt-2 flex flex-col items-center">
                <div className="flex items-center">
                  <Building className="mr-1.5 h-3.5 w-3.5" />
                  <span className="truncate max-w-[150px]">{alumni.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1.5 h-3.5 w-3.5" />
                  <span className="truncate max-w-[150px]">{alumni.location}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
                  <span>Class of {alumni.year}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t border-border mt-auto flex justify-between gap-2 p-4">
              <Button variant="outline" className="w-full text-xs h-8">View Profile</Button>
              <Button className="w-full text-xs h-8">Connect</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <p className="text-sm text-muted-foreground">Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">1,248</span> results</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4 mr-1" /> Prev
          </Button>
          <Button variant="outline" size="sm">
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
