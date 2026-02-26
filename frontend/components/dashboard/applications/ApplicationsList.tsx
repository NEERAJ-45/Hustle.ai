import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { applications } from "./applicationsData";

export default function ApplicationsList() {
  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card key={app.id} className="shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg">{app.job}</h3>
              <p className="text-sm text-gray-600">{app.company}</p>
              <p className="text-xs text-gray-500">{app.status} • {app.stage}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-blue-600 font-bold">{app.salary}</span>
              <span className="text-xs text-gray-400">{app.lastUpdate}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
