import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-10rem)] p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-8 border border-border shadow-sm">
          <SearchX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Button asChild size="lg" className="px-8">
            <Link to="/dashboard">
              <Home className="mr-2 h-4 w-4" /> Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
