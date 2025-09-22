import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
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
import { api } from "../../axios.js";

type Alumni = {
  _id: string;
  name?: string;
  occupation?: string;
  company?: string;
  profileImage?: string;
  graduationYear?: string;
  location?: string;
  email?: string;
  linkedinProfile?: string;
  personalWebsite?: string;
  branch?: string;
  bio?: string;
};

const AlumniProfilePage = () => {
  const [mockAlumni, setMockAlumni] = useState<Alumni[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Alumni | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlumni = async () => {
    try {
      const response = await api.get("/users/getallusers");
      console.log(response.data);
      return response
    } catch (error) {
      console.error("Error fetching alumni data:", error);
    }
  };



  const fetchProfile = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const axiosRes = await api.get(`/users/getuserbyid/${userId}`);
      console.log(axiosRes.data);
      return axiosRes
    } catch (error) {
      console.error("Error fetching alumni data:", error);
      setError("Failed to fetch profile data");
    } finally {
      setIsLoading(false);
    }
  };


 const datamanagement = async () => {
  const alumniresponse = await fetchAlumni();
  const profileResponse = await fetchProfile(id || "");

  // Fix based on API shape:
  setMockAlumni(alumniresponse?.data?.message || alumniresponse?.data || []); 

  setProfile(
    profileResponse?.data?.user || profileResponse?.data?.message || profileResponse?.data || null
  );
};
  
  useEffect(() => {
    datamanagement()
    console.log("Profile data:", profile);
    console.log("Mock Alumni data:", mockAlumni);
  }, [id]);

  const handleBackToDirectory = () => {
    navigate("/directory");
  };

  const handleViewProfile = (profileId: string) => {
    navigate(`/alumni/${profileId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Error Loading Profile
            </h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="space-x-2">
              <Button onClick={() => id && fetchProfile(id)} variant="outline">
                Try Again
              </Button>
              <Button onClick={handleBackToDirectory}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Directory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Profile not found state
  if (!profile) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-semibold  mb-2">
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
    <div className="min-h-screen ">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage 
                        src={profile.profileImage || `/placeholder-${profile._id}.jpg`} 
                        alt={`${profile.name || 'User'}'s avatar`}
                      />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'NA'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-3xl font-bold ">
                        {profile.name || 'Name not available'}
                      </h1>
                      <p className="text-xl text-muted-foreground">
                        {profile.occupation || 'Occupation not specified'} 
                        {profile.company && ` at ${profile.company}`}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary">
                          <GraduationCap className="mr-1 h-3 w-3" />
                          {profile.graduationYear === "2025"
                            ? "Current Student"
                            : `Class of ${profile.graduationYear || 'N/A'}`}
                        </Badge>
                        {profile.location && (
                          <Badge variant="outline">
                            <MapPin className="mr-1 h-3 w-3" />
                            {profile.location}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            {profile.bio && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Professional Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Professional Information
                </h2>

                <div className="space-y-4">
                  {(profile.occupation || profile.company) && (
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-muted-foreground mr-3" />
                      <div>
                        <span className="font-medium">
                          {profile.occupation || 'Not specified'}
                        </span>
                        {profile.company && (
                          <span className="text-muted-foreground">
                            {" "}at {profile.company}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                      <span className="text-muted-foreground">
                        {profile.location}
                      </span>
                    </div>
                  )}
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
                  {profile.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-blue-600 hover:text-blue-800 text-sm break-all"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}

                  {profile.linkedinProfile && (
                    <div className="flex items-center">
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
                  )}
                  
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
                  )}
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
                      <div className="font-medium">
                        {profile.branch || 'Branch not specified'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {profile.graduationYear === "2025"
                          ? "Current Student"
                          : `Class of ${profile.graduationYear || 'N/A'}`}
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
                  {mockAlumni && Array.isArray(mockAlumni) ? (
                    mockAlumni
                      .filter((alumni) => alumni._id !== profile?._id)
                      .slice(0, 2)
                      .map((alumni) => (
                        <div
                          key={alumni._id}
                          className="flex items-center space-x-3"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage 
                              src={alumni.profileImage} 
                              alt={`${alumni.name || 'User'}'s avatar`}
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                              {alumni.name ? alumni.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'NA'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alumni.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {alumni.occupation || 'Occupation not specified'}
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
                      ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No other alumni found.
                    </p>
                  )}
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