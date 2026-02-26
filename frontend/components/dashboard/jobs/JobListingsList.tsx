import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { jobListings } from "./jobsData";

export default function JobListingsList() {
  return (
    <div className="space-y-4">
      {jobListings.map((job) => (
        <Card key={job.id} className="shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
              <p className="text-xs text-gray-500">{job.salary} • {job.type}</p>
              <p className="text-xs text-gray-400">{job.posted}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-blue-600 font-bold">{job.match}% Match</span>
              <span className="text-xs text-gray-400">{job.skills.join(", ")}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
