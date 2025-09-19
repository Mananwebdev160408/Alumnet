import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageCircle,
  UserCheck,
  GraduationCap,
  TrendingUp,
  Calendar,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Connections",
    value: "127",
    icon: UserCheck,
    color: "text-primary",
  },
  { label: "Alumni Network", value: "2.4k", icon: Users, color: "text-accent" },
  {
    label: "Messages",
    value: "12",
    icon: MessageCircle,
    color: "text-success",
  },
  {
    label: "Mentorship Requests",
    value: "3",
    icon: GraduationCap,
    color: "text-warning",
  },
];

const recentConnections = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    year: "2019",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Product Manager at Meta",
    year: "2018",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Data Scientist at Netflix",
    year: "2020",
    avatar: "EW",
  },
];

const mentorshipRequests = [
  {
    id: 1,
    title: "Help with Machine Learning Career Path",
    author: "Alex Thompson",
    year: "Current Student",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Startup Advice Needed",
    author: "Jessica Lee",
    year: "2023 Graduate",
    time: "1 day ago",
  },
];

const upcomingEvents = [
  { id: 1, title: "Alumni Tech Talk", date: "Oct 25", time: "6:00 PM" },
  { id: 2, title: "Career Fair 2024", date: "Nov 5", time: "10:00 AM" },
];

export const Dashboard = () => {
  // Navigation handler for demo purposes
  const handleNavigation = (path) => {
    console.log(`Navigate to: ${path}`);
    // In your actual app, replace this with: 
    // <Link to="/connections"> or your router navigation
  };

  return (
    <>
      {/* Coming Soon Overlay - Responsive */}
      <div className="absolute inset-0 bg-background/60 lg:top-16 lg:left-64 lg:right-0 lg:bottom-0 backdrop-blur-md flex items-center justify-center z-50">
        <div className="text-center space-y-2 px-4">
          <h2 className="text-xl md:text-2xl font-bold">Coming Soon 🚀</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            This feature will be available in a future update
          </p>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6 lg:space-y-8 max-h-screen lg:max-h-[88vh] overflow-y-auto px-4 md:px-6 lg:px-0 py-4 md:py-6 lg:py-0">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, John!
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Here's what's happening in your alumni network today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 md:p-3 rounded-lg bg-muted/50 ${stat.color} self-end md:self-auto`}>
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Recent Connections */}
          <Card className="xl:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div>
                  <CardTitle className="text-lg md:text-xl">Recent Connections</CardTitle>
                  <CardDescription className="text-sm">
                    Alumni you've recently connected with
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="self-start sm:self-auto"
                  onClick={() => handleNavigation('/connections')}
                >
                  <span className="hidden sm:inline">View all</span>
                  <span className="sm:hidden">All</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              {recentConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center space-x-3 md:space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleNavigation(`/profile/${connection.id}`)}
                >
                  <Avatar className="h-10 w-10 md:h-12 md:w-12">
                    <AvatarImage src={`/placeholder-${connection.id}.jpg`} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {connection.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm md:text-base">
                      {connection.name}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      {connection.role}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    <span className="hidden sm:inline">Class of </span>
                    {connection.year}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg md:text-xl">
                <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleNavigation(`/events/${event.id}`)}
                >
                  <h4 className="font-medium text-sm md:text-base">
                    {event.title}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {event.date} at {event.time}
                  </p>
                </div>
              ))}
              <Button 
                className="w-full" 
                variant="outline" 
                size="sm"
                onClick={() => handleNavigation('/calendar')}
              >
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Mentorship Requests */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle className="text-lg md:text-xl">Recent Mentorship Requests</CardTitle>
                <CardDescription className="text-sm">
                  Students seeking guidance from alumni
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="self-start sm:self-auto"
                onClick={() => handleNavigation('/mentorship')}
              >
                <span className="hidden sm:inline">View all</span>
                <span className="sm:hidden">All</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            {mentorshipRequests.map((request) => (
              <div
                key={request.id}
                className="p-3 md:p-4 border border-border rounded-lg hover:border-primary/20 transition-colors cursor-pointer"
                onClick={() => handleNavigation(`/mentorship/${request.id}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium mb-2 text-sm md:text-base">
                      {request.title}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs md:text-sm text-muted-foreground">
                      <span>by {request.author}</span>
                      <Badge variant="outline" className="text-xs self-start">
                        {request.year}
                      </Badge>
                      <span className="text-xs">{request.time}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="self-start sm:self-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigation(`/mentorship/${request.id}/respond`);
                    }}
                  >
                    Respond
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};