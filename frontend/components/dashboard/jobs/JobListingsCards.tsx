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
    <Card className="bg-card border-border">
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
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : (job.match ?? 0) >= 80
                  ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
          >
            {typeof job.match === "number"
              ? `${job.match}% Match`
              : "Match pending"}
          </Badge>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {job.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs bg-muted/50 text-muted-foreground border-border"
            >
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(job.id)}
            className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleSave(job.id)}
            className={
              isSaved
                ? ""
                : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }
          >
            <Bookmark className="h-3.5 w-3.5 mr-1" />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-600 text-white border-0"
          >
            <Send className="h-3.5 w-3.5 mr-1" />
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
