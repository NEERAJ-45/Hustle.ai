"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  posted: string;
  status: string;
}

interface JobMatchesListProps {
  data?: JobMatch[];
}

export default function JobMatchesList({ data }: JobMatchesListProps) {
  const displayData = data || [];

  if (displayData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No job matches available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayData.map((job) => (
        <div key={job.id}>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {job.company} • {job.location}
                </p>
                <p className="text-xs text-muted-foreground">{job.salary}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-cyan-400 font-bold">
                  {job.match}% Match
                </span>
                <span className="text-xs text-muted-foreground">
                  {typeof job.posted === "string"
                    ? new Date(job.posted).toLocaleDateString()
                    : job.posted}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
