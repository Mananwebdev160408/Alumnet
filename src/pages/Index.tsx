import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-10rem)] p-8">
      <Card className="max-w-md w-full border-border shadow-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <LayoutDashboard className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome to AlumNet</CardTitle>
          <CardDescription className="text-base mt-2">
            The premium network for verified alumni. Connect, mentor, and grow your career.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-6">
          <Button asChild className="w-full h-12 text-base">
            <Link to="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
