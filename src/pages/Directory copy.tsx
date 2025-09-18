import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Briefcase, GraduationCap, Users, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with real API
const mockAlumni = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    occupation: "Software Engineer",
    company: "Google",
    graduationYear: "2019",
    course: "Computer Science",
    location: "Mountain View, CA",
    avatar: "SJ",
    connectionStatus: "none", // none, pending, connected
    bio: "Full-stack developer passionate about AI and machine learning."
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    occupation: "Product Manager",
    company: "Meta",
    graduationYear: "2018",
    course: "Business Administration",
    location: "Menlo Park, CA",
    avatar: "MC",
    connectionStatus: "connected",
    bio: "Product leader with 6+ years in tech, focusing on user experience."
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@email.com",
    occupation: "Data Scientist",
    company: "Netflix",
    graduationYear: "2020",
    course: "Statistics",
    location: "Los Angeles, CA",
    avatar: "EW",
    connectionStatus: "none",
    bio: "Data scientist specializing in recommendation systems and analytics."
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.r@email.com",
    occupation: "UX Designer",
    company: "Apple",
    graduationYear: "2017",
    course: "Design",
    location: "Cupertino, CA",
    avatar: "DR",
    connectionStatus: "pending",
    bio: "Senior UX designer creating intuitive user experiences for millions."
  },
  {
    id: 5,
    name: "Lisa Zhang",
    email: "lisa.z@email.com",
    occupation: "Marketing Manager",
    company: "Spotify",
    graduationYear: "2021",
    course: "Marketing",
    location: "New York, NY",
    avatar: "LZ",
    connectionStatus: "none",
    bio: "Digital marketing specialist with expertise in growth and analytics."
  },
  {
    id: 6,
    name: "Alex Thompson",
    email: "alex.t@email.com",
    occupation: "Student",
    company: "University",
    graduationYear: "2025",
    course: "Computer Science",
    location: "Campus, CA",
    avatar: "AT",
    connectionStatus: "none",
    bio: "Final year CS student interested in software engineering and startups."
  }
];

const graduationYears = Array.from({ length: 20 }, (_, i) => (2024 - i).toString());
const courses = ["Computer Science", "Business Administration", "Statistics", "Design", "Marketing", "Engineering"];
const locations = ["Mountain View, CA", "Menlo Park, CA", "Los Angeles, CA", "Cupertino, CA", "New York, NY", "Campus, CA"];

export const Directory = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    graduationYear: "",
    course: "",
    location: ""
  });
  const [alumni, setAlumni] = useState(mockAlumni);

  const filteredAlumni = useMemo(() => {
    return alumni.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           person.occupation.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesYear = !filters.graduationYear || person.graduationYear === filters.graduationYear;
      const matchesCourse = !filters.course || person.course === filters.course;
      const matchesLocation = !filters.location || person.location === filters.location;
      
      return matchesSearch && matchesYear && matchesCourse && matchesLocation;
    });
  }, [alumni, searchQuery, filters]);

  const handleConnect = (personId: number) => {
    setAlumni(prev => prev.map(person => 
      person.id === personId 
        ? { ...person, connectionStatus: "pending" }
        : person
    ));
    
    toast({
      title: "Connection request sent!",
      description: "Your connection request has been sent successfully.",
    });
  };

  const clearFilters = () => {
    setFilters({
      graduationYear: "",
      course: "",
      location: ""
    });
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient">Alumni Directory</h1>
        <p className="text-muted-foreground mt-2">
          Connect with {filteredAlumni.length} alumni and students from your university
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, or occupation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                value={filters.graduationYear}
                onValueChange={(value) => setFilters(prev => ({ ...prev, graduationYear: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Graduation Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Years</SelectItem>
                  {graduationYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.course}
                onValueChange={(value) => setFilters(prev => ({ ...prev, course: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Course/Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.location}
                onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((person) => (
          <Card key={person.id} className="hover-lift transition-all duration-200">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarImage src={`/placeholder-${person.id}.jpg`} />
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {person.avatar}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold text-lg">{person.name}</h3>
                  <p className="text-muted-foreground">
                    {person.occupation} at {person.company}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <GraduationCap className="mr-1 h-3 w-3" />
                    {person.graduationYear === "2025" ? "Current Student" : `Class of ${person.graduationYear}`}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="mr-1 h-3 w-3" />
                    {person.location.split(',')[0]}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {person.bio}
                </p>

                <div className="flex space-x-2">
                  {person.connectionStatus === "none" && (
                    <Button 
                      onClick={() => handleConnect(person.id)}
                      className="flex-1"
                      size="sm"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  )}
                  
                  {person.connectionStatus === "pending" && (
                    <Button variant="outline" className="flex-1" size="sm" disabled>
                      Pending
                    </Button>
                  )}
                  
                  {person.connectionStatus === "connected" && (
                    <Button variant="outline" className="flex-1" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Connected
                    </Button>
                  )}

                  <Button variant="ghost" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No alumni found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};