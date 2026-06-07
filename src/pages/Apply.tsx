import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Apply() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Apply</h1>
      <Card>
        <CardHeader>
          <CardTitle>Application</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Submit your application to join the network.</p>
          <Button>Start Application</Button>
        </CardContent>
      </Card>
    </div>
  );
}
