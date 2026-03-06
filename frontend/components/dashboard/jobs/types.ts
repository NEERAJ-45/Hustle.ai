import type { JobDetailedJD } from "@/lib/api-client";

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  match?: number;
  posted: string;
  skills: string[];
  postedAt?: string;
}

export interface JobDetailsModalState {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  details: JobDetailedJD | null;
  jobId: string | null;
}

export interface JobsStats {
  total: number;
  newToday: number;
  matched: number;
  saved: number;
  applied: number;
}

export interface MapSummary {
  totalMarkers: number;
  totalJobs: number;
}
