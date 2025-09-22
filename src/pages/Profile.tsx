import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {api} from "../../axios.js"
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
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const graduationYears = Array.from({ length: 50 }, (_, i) => 2024 - i);

export const Profile = () => {
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
    email: "",
    graduationYear: "",
    branch: "",
    occupation: "",
    company: "",
    location: "",
    description: "",
    linkedin: "",
    personalwebsite: "",
    role: "",
    college: "",
  });

  // Fetch current user data when component mounts
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users/getuser")
      
      if (response.data && response.data.data) {
        const userData = response.data.data;
        setProfileData({
          id: userData._id || "",
          name: userData.name || "",
          email: userData.email || "",
          graduationYear: userData.graduationYear?.toString() || "",
          branch: userData.branch || "",
          occupation: userData.occupation || "",
          company: userData.company || "",
          location: userData.location || "",
          description: userData.description || "",
          linkedin: userData.linkedin || "",
          personalwebsite: userData.personalwebsite || "",
          role: userData.role || "",
          college: userData.college || "",
        });
      }
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data. Please try again.",
        variant: "destructive",
      });
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401 || error.response?.status === 404) {
        // Redirect to login page or handle authentication error
        window.location.href = '/auth/login'; // Adjust this based on your routing
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const updateData = {
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        graduationYear: parseInt(profileData.graduationYear),
        branch: profileData.branch,
        occupation: profileData.occupation,
        company: profileData.company,
        location: profileData.location,
        description: profileData.description,
        linkedin: profileData.linkedin,
        personalwebsite: profileData.personalwebsite,
        role: profileData.role,
        college: profileData.college,
      };

      const response= await api.put(`/users/updateuser/${profileData.id}`, updateData)

      if (response.data) {
        toast({
          title: "Profile updated!",
          description: "Your profile has been successfully updated.",
        });
        setIsEditing(false);
        // Optionally refresh the data from server
        await fetchCurrentUser();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="max-w-4xl space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-profile.jpg" />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profileData.name
                    ? profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">
                  {profileData.name || "User Name"}
                </h1>
                <p className="text-xl text-muted-foreground mt-1">
                  {profileData.occupation && profileData.company
                    ? `${profileData.occupation} at ${profileData.company}`
                    : profileData.occupation || "No occupation specified"}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  {profileData.graduationYear && (
                    <Badge variant="secondary" className="flex items-center">
                      <GraduationCap className="mr-1 h-3 w-3" />
                      Class of {profileData.graduationYear}
                    </Badge>
                  )}
                  {profileData.role && (
                    <Badge variant="secondary" className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {profileData.role}
                    </Badge>
                  )}
                  {profileData.location && (
                    <Badge variant="outline" className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {profileData.location}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                disabled={saving}
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
                    value={profileData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {profileData.description || "No description provided."}
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
                    <FormInput
                      label="College"
                      value={profileData.college}
                      onChange={(e) => handleChange("college", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    {(profileData.occupation || profileData.company) && (
                      <div className="flex items-center space-x-3">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        <span>
                          {profileData.occupation && profileData.company
                            ? `${profileData.occupation} at ${profileData.company}`
                            : profileData.occupation || profileData.company}
                        </span>
                      </div>
                    )}
                    {profileData.location && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span>{profileData.location}</span>
                      </div>
                    )}
                    {profileData.college && (
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                        <span>{profileData.college}</span>
                      </div>
                    )}
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
                      label="Personal Website"
                      value={profileData.personalwebsite}
                      onChange={(e) => handleChange("personalwebsite", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    {profileData.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profileData.email}</span>
                      </div>
                    )}
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
                    {profileData.personalwebsite && (
                      <div>
                        <a
                          href={`https://${profileData.personalwebsite}`}
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
                          <SelectValue placeholder="Select graduation year" />
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
                      label="Branch/Department"
                      value={profileData.branch}
                      onChange={(e) => handleChange("branch", e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    {(profileData.branch || profileData.graduationYear) && (
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <div>
                          {profileData.branch && (
                            <p className="font-medium">{profileData.branch}</p>
                          )}
                          {profileData.graduationYear && (
                            <p className="text-sm text-muted-foreground">
                              Class of {profileData.graduationYear}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {isEditing && (
              <Button 
                onClick={handleSave} 
                className="w-full" 
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};