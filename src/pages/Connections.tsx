import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCheck, UserX, Clock, MessageCircle, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockConnections = [
  {
    id: 1,
    name: "Sarah Johnson",
    occupation: "Software Engineer at Google",
    graduationYear: "2019",
    avatar: "SJ",
    connectionDate: "2 weeks ago",
    mutualConnections: 5
  },
  {
    id: 2,
    name: "Mike Chen",
    occupation: "Product Manager at Meta",
    graduationYear: "2018", 
    avatar: "MC",
    connectionDate: "1 month ago",
    mutualConnections: 3
  },
  {
    id: 3,
    name: "Emma Wilson",
    occupation: "Data Scientist at Netflix",
    graduationYear: "2020",
    avatar: "EW",
    connectionDate: "3 days ago",
    mutualConnections: 7
  }
];

const mockPendingRequests = [
  {
    id: 4,
    name: "David Rodriguez",
    occupation: "UX Designer at Apple",
    graduationYear: "2017",
    avatar: "DR",
    requestDate: "2 days ago",
    mutualConnections: 2,
    type: "sent" // sent or received
  },
  {
    id: 5,
    name: "Lisa Zhang", 
    occupation: "Marketing Manager at Spotify",
    graduationYear: "2021",
    avatar: "LZ",
    requestDate: "1 day ago",
    mutualConnections: 4,
    type: "received"
  },
  {
    id: 6,
    name: "Alex Thompson",
    occupation: "Final Year Student",
    graduationYear: "2025",
    avatar: "AT", 
    requestDate: "5 hours ago",
    mutualConnections: 1,
    type: "received"
  }
];

export const Connections = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState(mockConnections);
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);

  const handleAcceptRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      // Move to connections
      setConnections(prev => [...prev, {
        ...request,
        connectionDate: "Just now"
      }]);
      
      // Remove from pending
      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
      
      toast({
        title: "Connection accepted!",
        description: `You are now connected with ${request.name}.`,
      });
    }
  };

  const handleDeclineRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    
    toast({
      title: "Request declined",
      description: `Connection request from ${request?.name} has been declined.`,
    });
  };

  const handleWithdrawRequest = (requestId: number) => {
    const request = pendingRequests.find(r => r.id === requestId);
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    
    toast({
      title: "Request withdrawn",
      description: `Connection request to ${request?.name} has been withdrawn.`,
    });
  };

  const receivedRequests = pendingRequests.filter(r => r.type === "received");
  const sentRequests = pendingRequests.filter(r => r.type === "sent");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient">My Connections</h1>
        <p className="text-muted-foreground mt-2">
          Manage your professional network within the alumni community
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-bold">{connections.length}</p>
            <p className="text-muted-foreground">Total Connections</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-warning" />
            </div>
            <p className="text-2xl font-bold">{receivedRequests.length}</p>
            <p className="text-muted-foreground">Pending Requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <p className="text-2xl font-bold">{sentRequests.length}</p>
            <p className="text-muted-foreground">Sent Requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connections">My Connections ({connections.length})</TabsTrigger>
          <TabsTrigger value="requests">
            Requests ({receivedRequests.length + sentRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4">
          {connections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {connections.map((connection) => (
                <Card key={connection.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={`/placeholder-${connection.id}.jpg`} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {connection.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">{connection.name}</h3>
                        <p className="text-muted-foreground">{connection.occupation}</p>
                        
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary">
                            Class of {connection.graduationYear}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {connection.mutualConnections} mutual connections
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-2">
                          Connected {connection.connectionDate}
                        </p>
                        
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <UserCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No connections yet</h3>
                <p className="text-muted-foreground">
                  Start connecting with alumni and students in the directory
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          {/* Received Requests */}
          {receivedRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Connection Requests</CardTitle>
                <CardDescription>
                  People who want to connect with you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {receivedRequests.map((request) => (
                  <div key={request.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <Avatar>
                      <AvatarImage src={`/placeholder-${request.id}.jpg`} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {request.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{request.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.occupation}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Class of {request.graduationYear}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {request.mutualConnections} mutual • {request.requestDate}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        <UserX className="mr-1 h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Sent Requests */}
          {sentRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Sent Requests</CardTitle>
                <CardDescription>
                  Connection requests you've sent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sentRequests.map((request) => (
                  <div key={request.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <Avatar>
                      <AvatarImage src={`/placeholder-${request.id}.jpg`} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {request.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{request.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.occupation}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Class of {request.graduationYear}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Sent {request.requestDate}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWithdrawRequest(request.id)}
                    >
                      Withdraw
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {receivedRequests.length === 0 && sentRequests.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No pending requests</h3>
                <p className="text-muted-foreground">
                  All your connection requests have been processed
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};