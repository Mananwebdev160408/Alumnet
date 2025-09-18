import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  User,
  MapPin,
  Mail,
  ExternalLink,
  Building,
  GraduationCap,
  Search,
  ArrowLeft,
} from "lucide-react";
import mockAlumni from "@/data.json";
// Mock data - this would be your actual data source

const AlumniProfilePage = () => {
  // Simulate getting ID from URL params
  const navigate = useNavigate();
  // In a real React Router setup, you'd use: const { id } = useParams();
  const [currentProfileId, setCurrentProfileId] = useState(1);

  // Find profile data based on ID
  const profile = mockAlumni.find((alumni) => alumni._id === currentProfileId);

  // Simulate navigation functions
  const handleBackToDirectory = () => {
    navigate("/directory");
    // In a real app: navigate('/directory')
  };

  const handleViewProfile = (id) => {
    // In a real app: navigate(`/alumni/${id}`)
    setCurrentProfileId(id);
    console.log(`Navigate to /alumni/${id}`);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Profile Not Found
            </h1>
            <p className="text-muted-foreground mb-4">
              The requested profile could not be found.
            </p>
            <Button onClick={handleBackToDirectory}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={handleBackToDirectory}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>

        {/* Demo Profile Selector */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={`/placeholder-${profile._id}.jpg`} />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {profile.name}
                      </h1>
                      <p className="text-xl text-muted-foreground">
                        {profile.occupation} at {profile.company}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary">
                          <GraduationCap className="mr-1 h-3 w-3" />
                          {profile.graduationYear === "2025"
                            ? "Current Student"
                            : `Class of ${profile.graduationYear}`}
                        </Badge>
                        <Badge variant="outline">
                          <MapPin className="mr-1 h-3 w-3" />
                          {profile.location}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Professional Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <span className="font-medium">{profile.occupation}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        at {profile.company}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                    <span className="text-muted-foreground">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {profile.email}
                    </a>
                  </div>

                  {/* <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 text-muted-foreground mr-3" />
                    <a 
                      href={profile.linkedinProfile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  
                  {profile.personalWebsite && (
                    <div className="flex items-center">
                      <ExternalLink className="h-4 w-4 text-muted-foreground mr-3" />
                      <a 
                        href={profile.personalWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Personal Website
                      </a>
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Academic Information
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 text-muted-foreground mr-3" />
                    <div>
                      <div className="font-medium">{profile.branch}</div>
                      <div className="text-sm text-muted-foreground">
                        {profile.graduationYear === "2025"
                          ? "Current Student"
                          : `Class of ${profile.graduationYear}`}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Other Alumni</h2>
                <div className="space-y-3">
                  {mockAlumni
                    .filter((alumni) => alumni._id !== currentProfileId)
                    .slice(0, 2)
                    .map((alumni) => (
                      <div
                        key={alumni._id}
                        className="flex items-center space-x-3"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {alumni.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{alumni.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {alumni.occupation}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewProfile(alumni._id)}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfilePage;
