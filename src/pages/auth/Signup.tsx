import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const graduationYears = Array.from({ length: 50 }, (_, i) => 2024 - i);

export const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    emailaddress: "",
    password: "",
    graduationYear: "",
    branch: "",
    role: "alumni", // alumni or student
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const axiosres = await axios.post(
      "http://localhost:5173/api/v1/users/register",
      formData
    );
    if (axiosres) {
      toast({
        title: "Account created!",
        description: "Welcome to Alumnet. Please complete your profile.",
      });
      navigate("/profile");
    }
    setIsLoading(true);

    // Mock signup - replace with real auth
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Welcome to Alumnet. Please complete your profile.",
      });
      navigate("/profile");
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2">
            <div className="bg-primary p-3 rounded-xl shadow-medium">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-gradient">Alumnet</span>
          </div>
          <p className="mt-2 text-muted-foreground">Join your alumni network</p>
        </div>

        <Card className="shadow-strong border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create account
            </CardTitle>
            <CardDescription className="text-center">
              Sign up to connect with your alumni community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />

              <FormInput
                label="emailaddress"
                name="emailaddress"
                type="emailaddress"
                value={formData.emailaddress}
                onChange={handleChange}
                placeholder="john@university.edu"
                helperText="Use your university emailaddress for verification"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">User Type</label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alumni">Alumni</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Graduation Year</label>
                  <Select
                    value={formData.graduationYear}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        graduationYear: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
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
              </div>

              <FormInput
                label="branch/Department"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Computer Science"
                required
              />

              <div className="relative">
                <FormInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-8 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark transition-all duration-200 shadow-medium hover:shadow-strong"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
