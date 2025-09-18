import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/form-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  MessageCircle, 
  Clock, 
  GraduationCap, 
  BookOpen,
  Heart,
  Users,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockRequests = [
  {
    id: 1,
    title: "Need Guidance on Machine Learning Career Path",
    description: "I'm a final-year CS student passionate about ML/AI. Looking for advice on career opportunities, skill development, and industry insights. Would love to connect with someone who has experience in this field.",
    author: "Alex Thompson",
    authorAvatar: "AT",
    graduationYear: "2025",
    category: "Career Guidance",
    tags: ["Machine Learning", "AI", "Career"],
    timePosted: "2 hours ago",
    replies: 3,
    helpful: 5,
    status: "open"
  },
  {
    id: 2,
    title: "Startup Advice - From Idea to Launch",
    description: "I have a SaaS idea and I'm looking for mentorship on the business side. Need guidance on market validation, finding co-founders, and fundraising strategies.",
    author: "Jessica Lee",
    authorAvatar: "JL",
    graduationYear: "2023",
    category: "Entrepreneurship",
    tags: ["Startup", "Business", "SaaS"],
    timePosted: "1 day ago",
    replies: 7,
    helpful: 12,
    status: "open"
  },
  {
    id: 3,
    title: "Transitioning from Academia to Industry",
    description: "After completing my PhD in Computer Science, I'm looking to transition to industry. Would appreciate advice on how to present academic experience to potential employers.",
    author: "Dr. Michael Zhang",
    authorAvatar: "MZ",
    graduationYear: "2019",
    category: "Career Transition",
    tags: ["PhD", "Industry", "Career Change"],
    timePosted: "3 days ago",
    replies: 5,
    helpful: 8,
    status: "answered"
  }
];

const categories = ["All", "Career Guidance", "Entrepreneurship", "Career Transition", "Technical Skills", "Networking"];

export const Mentorship = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockRequests);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    tags: ""
  });

  const filteredRequests = requests.filter(request => 
    selectedCategory === "All" || request.category === selectedCategory
  );

  const handleCreateRequest = () => {
    if (newRequest.title && newRequest.description && newRequest.category) {
      const request = {
        id: requests.length + 1,
        title: newRequest.title,
        description: newRequest.description,
        author: "You",
        authorAvatar: "YO",
        graduationYear: "2020",
        category: newRequest.category,
        tags: newRequest.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        timePosted: "Just now",
        replies: 0,
        helpful: 0,
        status: "open" as const
      };
      
      setRequests(prev => [request, ...prev]);
      setNewRequest({ title: "", description: "", category: "", tags: "" });
      setIsNewRequestOpen(false);
      
      toast({
        title: "Request posted!",
        description: "Your mentorship request has been posted successfully.",
      });
    }
  };

  const handleReply = (requestId: number) => {
    toast({
      title: "Reply sent!",
      description: "Your reply has been sent to the mentorship request.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Mentorship Board</h1>
          <p className="text-muted-foreground mt-2">
            Connect students with alumni for guidance and career advice
          </p>
        </div>
        
        <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent-light">
              <Plus className="mr-2 h-4 w-4" />
              Post Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Mentorship Request</DialogTitle>
              <DialogDescription>
                Ask for guidance from experienced alumni in your field
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <FormInput
                label="Title"
                value={newRequest.title}
                onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief, descriptive title for your request"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select 
                  value={newRequest.category} 
                  onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FormInput
                label="Description"
                multiline
                rows={4}
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide details about what kind of guidance you're seeking..."
              />

              <FormInput
                label="Tags (comma-separated)"
                value={newRequest.tags}
                onChange={(e) => setNewRequest(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="e.g., Machine Learning, Career, Startup"
              />

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleCreateRequest} className="flex-1">
                  Post Request
                </Button>
                <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{requests.length}</p>
            <p className="text-muted-foreground">Total Requests</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">{requests.filter(r => r.status === "open").length}</p>
            <p className="text-muted-foreground">Open Requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{requests.reduce((sum, r) => sum + r.replies, 0)}</p>
            <p className="text-muted-foreground">Total Replies</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">{requests.reduce((sum, r) => sum + r.helpful, 0)}</p>
            <p className="text-muted-foreground">Helpful Votes</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentorship Requests */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover-lift transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder-${request.id}.jpg`} />
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {request.authorAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{request.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.graduationYear === "2025" ? "Current Student" : `Class of ${request.graduationYear}`} • {request.timePosted}
                      </p>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg mb-2">{request.title}</CardTitle>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <Badge variant="secondary">{request.category}</Badge>
                    <Badge 
                      variant={request.status === "open" ? "default" : "outline"}
                      className={request.status === "open" ? "bg-success text-success-foreground" : ""}
                    >
                      {request.status === "open" ? "Open" : "Answered"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {request.description}
              </p>
              
              {request.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {request.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <MessageCircle className="mr-1 h-4 w-4" />
                    {request.replies} replies
                  </span>
                  <span className="flex items-center">
                    <Heart className="mr-1 h-4 w-4" />
                    {request.helpful} helpful
                  </span>
                </div>
                
                <Button 
                  onClick={() => handleReply(request.id)}
                  size="sm"
                  variant={request.status === "open" ? "default" : "outline"}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No requests found</h3>
            <p className="text-muted-foreground mb-4">
              No mentorship requests match your current filter
            </p>
            <Button onClick={() => setSelectedCategory("All")}>
              Show all requests
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};