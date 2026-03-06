"use client";

import { memo } from "react";
import {
  Briefcase,
  Bookmark,
  Clock,
  DollarSign,
  Eye,
  MapPin,
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { JobListing } from "@/components/dashboard/jobs/types";

interface JobListingsCardsProps {
  data?: JobListing[];
  onViewDetails: (jobId: string) => void;
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
}

export function JobListingsCards({
  data,
  onViewDetails,
  savedJobIds,
  onToggleSave,
}: JobListingsCardsProps) {
  const displayData = data || [];

  if (displayData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No job listings available right now. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayData.map((job) => {
        const isSaved = savedJobIds.has(job.id);

        return (
          <JobCardItem
            key={job.id}
            job={job}
            isSaved={isSaved}
            onViewDetails={onViewDetails}
            onToggleSave={onToggleSave}
          />
        );
      })}
    </div>
  );
}

const JobCardItem = memo(function JobCardItem({
  job,
  isSaved,
  onViewDetails,
  onToggleSave,
}: {
  job: JobListing;
  isSaved: boolean;
  onViewDetails: (id: string) => void;
  onToggleSave: (id: string) => void;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">
              {job.title}
            </h3>
            <p className="text-muted-foreground text-sm">{job.company}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" />
                {job.salary}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {job.type}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {job.posted}
              </span>
            </div>
          </div>
          <Badge
            className={`ml-3 ${
              (job.match ?? 0) >= 90
                ? "bg-green-100 text-green-700 border-green-200"
                : (job.match ?? 0) >= 80
                  ? "bg-purple-100 text-purple-700 border-purple-200"
                  : "bg-amber-100 text-amber-700 border-amber-200"
            }`}
          >
            {typeof job.match === "number"
              ? `${job.match}% Match`
              : "Match pending"}
          </Badge>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(job.id)}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleSave(job.id)}
          >
            <Bookmark className="h-3.5 w-3.5 mr-1" />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button size="sm">
            <Send className="h-3.5 w-3.5 mr-1" />
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
