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
import { Link } from "react-router-dom";
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
  return (
    <>
      

      <div className="absolute top-16 left-64 right-0 bottom-0 bg-background/60 backdrop-blur-md flex items-center justify-center z-50">
  <div className="text-center space-y-2">
    <h2 className="text-2xl font-bold">Coming Soon 🚀</h2>
    <p className="text-muted-foreground">This feature will be available in a future update</p>
  </div>
</div>
      <div className="space-y-8 max-h-[88vh] overflow-hidden ">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gradient">
            Welcome back, John!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening in your alumni network today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Connections */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Connections</CardTitle>
                  <CardDescription>
                    Alumni you've recently connected with
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/connections">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar>
                    <AvatarImage src={`/placeholder-${connection.id}.jpg`} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {connection.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{connection.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {connection.role}
                    </p>
                  </div>
                  <Badge variant="secondary">Class of {connection.year}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 border border-border rounded-lg"
                >
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.date} at {event.time}
                  </p>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Mentorship Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Mentorship Requests</CardTitle>
                <CardDescription>
                  Students seeking guidance from alumni
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/mentorship">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mentorshipRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 border border-border rounded-lg hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{request.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>by {request.author}</span>
                      <Badge variant="outline">{request.year}</Badge>
                      <span>{request.time}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
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
