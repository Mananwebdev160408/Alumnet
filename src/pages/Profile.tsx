import { useState,useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FormInput } from "@/components/ui/form-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Save,
  X,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const graduationYears = Array.from({ length: 50 }, (_, i) => 2024 - i);

export const Profile = () => {
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@university.edu",
    graduationYear: "2020",
    branch: "Computer Science",
    occupation: "Senior Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 4+ years of experience in full-stack development. Love mentoring students and contributing to open source projects.",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev",
    role: "Student",
  });

  const handleSave = () => {
    // Mock save - replace with real API call
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center w-full  h-full ">
      <div className="max-w-4xl space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-profile.jpg" />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{profileData.name}</h1>
                <p className="text-xl text-muted-foreground mt-1">
                  {profileData.occupation} at {profileData.company}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <Badge variant="secondary" className="flex items-center">
                    <GraduationCap className="mr-1 h-3 w-3" />
                    Class of {profileData.graduationYear}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <User className="mr-1 h-3 w-3" />
                    {profileData.role}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {profileData.location}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
              >
                {isEditing ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <FormInput
                    multiline
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {profileData.bio}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Occupation"
                        value={profileData.occupation}
                        onChange={(e) =>
                          handleChange("occupation", e.target.value)
                        }
                      />
                      <FormInput
                        label="Company"
                        value={profileData.company}
                        onChange={(e) =>
                          handleChange("company", e.target.value)
                        }
                      />
                    </div>
                    <FormInput
                      label="Location"
                      value={profileData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <span>
                        {profileData.occupation} at {profileData.company}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{profileData.location}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <FormInput
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <FormInput
                      label="LinkedIn"
                      value={profileData.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                    />
                    <FormInput
                      label="Website"
                      value={profileData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profileData.email}</span>
                    </div>
                    {profileData.linkedin && (
                      <div>
                        <a
                          href={`https://${profileData.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-primary-dark transition-colors"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                    {profileData.website && (
                      <div>
                        <a
                          href={`https://${profileData.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-primary-dark transition-colors"
                        >
                          Personal Website
                        </a>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Graduation Year
                      </label>
                      <Select
                        value={profileData.graduationYear}
                        onValueChange={(value) =>
                          handleChange("graduationYear", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {graduationYears.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormInput
                      label="branch/Department"
                      value={profileData.branch}
                      onChange={(e) => handleChange("branch", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{profileData.branch}</p>
                        <p className="text-sm text-muted-foreground">
                          Class of {profileData.graduationYear}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {isEditing && (
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
