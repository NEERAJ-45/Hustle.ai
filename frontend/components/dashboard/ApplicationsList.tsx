"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Application {
  id: string;
  job: string;
  status: string;
  date: string;
  stage: string;
}

interface ApplicationsListProps {
  data?: Application[];
}

export default function ApplicationsList({ data }: ApplicationsListProps) {
  const displayData = data || [];

  if (displayData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No applications yet. Start applying to matched jobs!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayData.map((app) => (
        <div key={app.id}>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {app.job}
                </h3>
                <p className="text-sm text-muted-foreground">{app.status}</p>
                <p className="text-xs text-muted-foreground">
                  {app.stage} • {app.date}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
