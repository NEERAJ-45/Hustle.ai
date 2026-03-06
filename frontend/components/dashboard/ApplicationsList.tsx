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
      <div className="text-center py-8 text-gray-500">
        <p>No applications yet. Start applying to matched jobs!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayData.map((app) => (
        <div key={app.id}>
          <Card className="shadow-sm">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg">{app.job}</h3>
                <p className="text-sm text-gray-600">{app.status}</p>
                <p className="text-xs text-gray-500">
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
