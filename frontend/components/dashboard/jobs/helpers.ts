import type { JobListItem, JobsMapPoint } from "@/lib/api-client";
import type { JobListing, JobsStats, MapSummary } from "@/components/dashboard/jobs/types";

function formatSalary(job: JobListItem) {
  const min = job.salary?.min;
  const max = job.salary?.max;
  const currency = job.salary?.currency || "USD";

  if (!min && !max) return "Salary not disclosed";

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  }

  if (min) return `From ${formatter.format(min)}`;
  return `Up to ${formatter.format(max as number)}`;
}

function formatLocation(job: JobListItem) {
  if (job.location?.isRemote) return "Remote";

  const city = job.location?.city;
  const state = job.location?.state;
  const country = job.location?.country;
  return (
    [city, state, country].filter(Boolean).join(", ") ||
    "Location not specified"
  );
}

function formatPostedDate(isoDate?: string) {
  if (!isoDate) return "Recently";

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Recently";

  const now = Date.now();
  const diffMs = now - date.getTime();
  const minutes = Math.floor(diffMs / (1000 * 60));

  if (minutes < 60) return `${Math.max(minutes, 1)} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export function mapJobItem(job: JobListItem): JobListing {
  const location = formatLocation(job);
  const postedAt = job.postedDate;

  return {
    id: job._id,
    title: job.title || "Untitled Role",
    company: job.company?.name || "Unknown Company",
    location,
    type: job.jobType || "N/A",
    salary: formatSalary(job),
    match: undefined,
    posted: formatPostedDate(postedAt),
    postedAt,
    skills: (job.requiredSkills || [])
      .map((skill) => skill.name)
      .filter((name): name is string => Boolean(name)),
  };
}

export function buildMapPoints(
  jobsRaw: JobListItem[],
  activeTab: string,
  savedJobIdsSet: Set<string>,
): JobsMapPoint[] {
  const source =
    activeTab === "saved"
      ? jobsRaw.filter((job) => savedJobIdsSet.has(job._id))
      : jobsRaw;

  const grouped = new Map<string, JobsMapPoint>();

  for (const job of source) {
    const coordinates =
      job.locationDetails?.coordinates ||
      (job.location?.coordinates?.latitude != null &&
      job.location?.coordinates?.longitude != null
        ? {
            latitude: job.location.coordinates.latitude,
            longitude: job.location.coordinates.longitude,
          }
        : null);

    if (!coordinates) continue;

    const city = job.locationDetails?.city || job.location?.city || "";
    const state = job.locationDetails?.state || job.location?.state || "";
    const country = job.locationDetails?.country || job.location?.country || "";
    const label =
      job.locationDetails?.label ||
      [city, state, country].filter(Boolean).join(", ") ||
      "Location not specified";
    const normalizedLocationKey = [city, state, country]
      .map((part) => part.trim().toLowerCase())
      .filter(Boolean)
      .join("|");
    const roundedCoordinatesKey = `${coordinates.latitude.toFixed(3)}:${coordinates.longitude.toFixed(3)}`;
    const key = normalizedLocationKey || roundedCoordinatesKey;

    if (!grouped.has(key)) {
      grouped.set(key, {
        location: {
          city,
          state,
          country,
          label,
          coordinates,
        },
        totalJobs: 0,
        jobs: [],
      });
    }

    const group = grouped.get(key);
    if (!group) continue;

    group.totalJobs += 1;
    group.jobs.push({
      id: job._id,
      title: job.title || "Untitled Role",
      companyName: job.company?.name || "Unknown Company",
      jobType: job.jobType || "N/A",
      isRemote: Boolean(job.locationDetails?.isRemote || job.location?.isRemote),
      workArrangement:
        job.locationDetails?.workArrangement ||
        job.location?.workArrangement ||
        "On-site",
      postedDate: job.postedDate || null,
      applicationUrl: `/dashboard/jobs?jobId=${job._id}`,
    });
  }

  return [...grouped.values()].sort((a, b) => b.totalJobs - a.totalJobs);
}

export function getMapSummary(mapPoints: JobsMapPoint[]): MapSummary | null {
  if (!mapPoints.length) return null;

  return {
    totalMarkers: mapPoints.length,
    totalJobs: mapPoints.reduce((sum, point) => sum + point.totalJobs, 0),
  };
}

export function getJobsStats(
  jobs: JobListing[],
  totalJobs: number,
  savedJobsCount: number,
): JobsStats {
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const newToday = jobs.filter((job) => {
    if (!job.postedAt) return false;
    const date = new Date(job.postedAt);
    if (Number.isNaN(date.getTime())) return false;
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` === todayKey;
  }).length;

  const remote = jobs.filter((job) => job.location === "Remote").length;

  return {
    total: totalJobs,
    newToday,
    matched: jobs.filter((job) => (job.match ?? 0) >= 80).length,
    saved: savedJobsCount,
    applied: remote,
  };
}
