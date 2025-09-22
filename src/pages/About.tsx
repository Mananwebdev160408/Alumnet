import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Award, 
  Code, 
  Palette, 
  BarChart, 
  MessageSquare, 
  Bot,
  Sparkles,
  Trophy,
  Lightbulb,
  Rocket,
  Star
} from "lucide-react";

const teamMembers = [
  {
    name: "Kinshuk Kashyap",
    role: "Team Leader",
    description: "Spearheaded UI development using React JS and CSS, ensuring a responsive and intuitive user experience.",
    icon: Code,
    gradient: "from-blue-500 to-purple-600",
    delay: "0s"
  },
  {
    name: "Manan Gupta",
    role: "Full Stack Developer",
    description: "Developed the robust infrastructure with MERN stack, managed database interactions, and assisted in AI Chatbot integration.",
    icon: Users,
    gradient: "from-green-500 to-teal-600",
    delay: "0.2s"
  },
  {
    name: "Tanvi Gupta", 
    role: "Presentation Designer",
    description: "Responsible for presentation design and structure, played a key role in problem ideation and solution conceptualization.",
    icon: Palette,
    gradient: "from-pink-500 to-rose-600",
    delay: "0.4s"
  },
  {
    name: "Rishabh Mishra",
    role: "Research Analyst", 
    description: "Conducted in-depth research to validate problem statements and inform feature development, ensuring data-driven decisions.",
    icon: BarChart,
    gradient: "from-orange-500 to-red-600",
    delay: "0.6s"
  },
  {
    name: "Prashant Singh",
    role: "Marketing Strategist",
    description: "Managed marketing strategies and crafted compelling presentation narratives, communicating AlumNet's value proposition.",
    icon: MessageSquare,
    gradient: "from-indigo-500 to-blue-600",
    delay: "0.8s"
  },
  {
    name: "Sameer",
    role: "AI Developer",
    description: "Engineered and implemented the AI Chatbot functionality, collaborating with Manan Gupta for seamless integration.",
    icon: Bot,
    gradient: "from-cyan-500 to-blue-600",
    delay: "1s"
  }
];

const achievements = [
  { icon: Trophy, text: "SIH 2025 Participants", color: "text-yellow-500" },
  { icon: Target, text: "Problem Statement #25017", color: "text-blue-500" },
  { icon: Star, text: "Smart Education Theme", color: "text-purple-500" },
  { icon: Award, text: "Software Category", color: "text-green-500" }
];

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSection(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className={`text-center space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-accent animate-spin" />
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <Badge variant="outline" className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-primary/10 to-accent/10 border-primary/50 hover:scale-105 transition-transform duration-300">
                SIH 2025 • Smart India Hackathon
              </Badge>
              <div className="relative">
                <Rocket className="h-8 w-8 text-primary animate-bounce" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              AlumNet
            </h1>
            
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground/90">
                Meet Team <span className="text-gradient">Syntax Squad</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our diverse team combined expertise in design, development, and strategy to bring AlumNet to life.
              </p>
            </div>
          </div>

          {/* Problem Statement Card */}
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-strong hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] animate-pulse"></div>
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Lightbulb className="h-8 w-8 text-accent animate-pulse" />
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-primary/10 text-primary border-primary/30">
                  Problem Statement ID: 25017
                </Badge>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-center">
                Digital Platform for Centralized Alumni Data Management and Engagement
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-background to-muted/50 border border-border/50 hover:scale-105 transition-all duration-300 ${currentSection === index ? 'ring-2 ring-primary/50 shadow-medium' : ''}`}
                  >
                    <achievement.icon className={`h-8 w-8 ${achievement.color} animate-bounce`} style={{ animationDelay: `${index * 0.2}s` }} />
                    <span className="text-sm font-medium text-center">{achievement.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Amazing Team
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Six brilliant minds working together to revolutionize alumni engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index}
                className={`group relative bg-gradient-to-br from-card to-card/50 border-0 shadow-soft hover:shadow-strong transition-all duration-700 hover:scale-105 hover:-rotate-1 overflow-hidden animate-fade-in`}
                style={{ animationDelay: member.delay }}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Floating Icon */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <member.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>

                <CardContent className="p-8 space-y-4 relative z-10">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h4>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${member.gradient} text-white border-0 group-hover:scale-105 transition-transform duration-300`}
                    >
                      {member.role}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {member.description}
                  </p>

                  {/* Animated Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-all duration-500"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="text-center space-y-8">
          <Card className="max-w-5xl mx-auto bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20 shadow-strong relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-y-1 animate-pulse"></div>
            </div>
            
            <CardContent className="p-12 space-y-8 relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Target className="h-12 w-12 text-primary animate-spin" style={{ animationDuration: "3s" }} />
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Our Mission
                </h3>
                <Rocket className="h-12 w-12 text-accent animate-bounce" />
              </div>
              
              <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
                To create a revolutionary digital platform that bridges the gap between alumni and their alma mater, 
                fostering meaningful connections, career growth, and continuous engagement through innovative technology and intelligent automation.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Explore Features
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Network
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "6", label: "Team Members", icon: Users },
            { number: "1", label: "Shared Vision", icon: Target },
            { number: "25017", label: "Problem ID", icon: Award },
            { number: "∞", label: "Possibilities", icon: Sparkles }
          ].map((stat, index) => (
            <Card 
              key={index} 
              className="text-center p-6 bg-gradient-to-br from-card to-muted/20 border-primary/20 hover:shadow-strong hover:scale-105 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-3">
                <stat.icon className="h-8 w-8 text-primary mx-auto group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.number}</div>
                <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">{stat.label}</div>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
};