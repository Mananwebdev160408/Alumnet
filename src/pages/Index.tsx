import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
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
      <div className="bg-gradient-to-tr from-blue-500 via-blue-900 to-blue-500 ">
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
