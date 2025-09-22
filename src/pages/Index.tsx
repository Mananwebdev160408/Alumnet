import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/enhanced-card";
import {
  Users,
  MessageCircle,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const [isDark, setIsDark] = useState(false);
  const features = [
    {
      icon: Users,
      title: "Alumni Directory",
      description:
        "Connect with thousands of alumni across different industries and locations.",
    },
    {
      icon: MessageCircle,
      title: "Direct Messaging",
      description:
        "Chat with fellow alumni and students in real-time messaging.",
    },
    {
      icon: BookOpen,
      title: "Mentorship Program",
      description:
        "Find mentors or become one. Share knowledge and grow together.",
    },
    {
      icon: GraduationCap,
      title: "Career Growth",
      description:
        "Access career opportunities and professional development resources.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-tr from-blue-500 via-blue-900 to-blue-500 pt-4 ">
        <div className="navbar rounded-full py-4 px-5 w-[95%] max-w-7xl mx-auto shadow-lg flex items-center justify-between bg-white/50 backdrop-blur-sm">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">Alumnet</span>
          </Link>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center justify-center w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <span
                className={`absolute w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  isDark ? "translate-x-3" : "-translate-x-3"
                }`}
              >
                {isDark ? (
                  <Moon className="w-3 h-3 text-gray-700" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </span>
            </button>

            {/* Login Button */}
            <Button
              onClick={() => navigate("/auth/login")}
              className="hidden sm:inline-flex"
            >
              Login
            </Button>

            {/* Mobile Menu (Login icon instead of text) */}
            <button
              onClick={() => navigate("/auth/login")}
              className="sm:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>

        <section className="relative  min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
                Connect with Your
                <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Alumni Network
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands of alumni and students building meaningful
                connections, sharing opportunities, and growing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <EnhancedButton size="hero" variant="secondary" asChild>
                  <Link to="/auth/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </EnhancedButton>
                <EnhancedButton
                  onClick={() => navigate("/directory")}
                  size="hero"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Explore Directory
                </EnhancedButton>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Everything You Need to Network
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform provides all the tools you need to build lasting
                professional relationships
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    variant="interactive"
                    className="text-center"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-6 w-6 " />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  10,000+
                </div>
                <div className="text-lg text-muted-foreground">
                  Active Alumni
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-lg text-muted-foreground">Companies</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-lg text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-accent-foreground mb-4">
              Ready to Connect?
            </h2>
            <p className="text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto">
              Join your alumni network today and start building meaningful
              professional relationships.
            </p>
            <EnhancedButton size="hero" variant="secondary" asChild>
              <Link to="/auth/signup">
                Join Alumnet Today
                <Star className="ml-2 h-5 w-5" />
              </Link>
            </EnhancedButton>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
