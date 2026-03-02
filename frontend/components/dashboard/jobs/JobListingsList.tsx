"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Sparkles,
  Target,
  Bookmark,
  Send,
  TrendingUp,
  Search,
  Bell,
  FileText,
  MapPin,
  DollarSign,
  Clock,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  Linkedin,
  Link2,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  fetchJobById,
  fetchJobsPaginated,
  type JobDetailedJD,
  type JobListItem,
} from "@/lib/api-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JobListing {
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

interface JobDetailsModalState {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  details: JobDetailedJD | null;
  jobId: string | null;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const SAVED_JOBS_STORAGE_KEY = "hustleai.savedJobIds";

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

function mapJobItem(job: JobListItem): JobListing {
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

const chartData = [
  { month: "Jul", matched: 12, applied: 4, saved: 8 },
  { month: "Aug", matched: 18, applied: 7, saved: 11 },
  { month: "Sep", matched: 22, applied: 9, saved: 15 },
  { month: "Oct", matched: 28, applied: 12, saved: 19 },
  { month: "Nov", matched: 35, applied: 15, saved: 22 },
  { month: "Dec", matched: 42, applied: 18, saved: 28 },
];

const chartConfig = {
  matched: { label: "Matched", color: "hsl(262, 83%, 58%)" },
  applied: { label: "Applied", color: "hsl(142, 71%, 45%)" },
  saved: { label: "Saved", color: "hsl(217, 91%, 60%)" },
};

function JobListingsList({
  data,
  onViewDetails,
  savedJobIds,
  onToggleSave,
}: {
  data?: JobListing[];
  onViewDetails: (jobId: string) => void;
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
}) {
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
      {displayData.map((job, index) => {
        const isSaved = savedJobIds.has(job.id);

        return (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {job.company}
                    </p>
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
          </motion.div>
        );
      })}
    </div>
  );
}

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobDetailsModal, setJobDetailsModal] = useState<JobDetailsModalState>({
    isOpen: false,
    isLoading: false,
    error: null,
    details: null,
    jobId: null,
  });
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_JOBS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setSavedJobIds(
          parsed.filter((id): id is string => typeof id === "string"),
        );
      }
    } catch {
      setSavedJobIds([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      SAVED_JOBS_STORAGE_KEY,
      JSON.stringify(savedJobIds),
    );
  }, [savedJobIds]);

  const savedJobIdsSet = useMemo(() => new Set(savedJobIds), [savedJobIds]);

  const loadJobsPage = useCallback(
    async (page: number, mode: "replace" | "append") => {
      const isAppend = mode === "append";

      if (isAppend) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await fetchJobsPaginated({
          page,
          limit: pageSize,
          isRemote: activeTab === "remote" ? true : undefined,
        });

        const mapped = response.data.map(mapJobItem);

        setJobs((prev) => {
          if (!isAppend) return mapped;

          const existingIds = new Set(prev.map((job) => job.id));
          const deduped = mapped.filter((job) => !existingIds.has(job.id));
          return [...prev, ...deduped];
        });

        setLoadedPages((prev) => {
          if (prev.includes(page)) return prev;
          return [...prev, page].sort((a, b) => a - b);
        });

        setTotalPages(response.meta.totalPages || 1);
        setTotalJobs(response.meta.total || mapped.length);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch jobs";
        setError(message);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [activeTab, pageSize],
  );

  useEffect(() => {
    setJobs([]);
    setLoadedPages([]);
    setCurrentPage(1);
    setTotalPages(1);
    setTotalJobs(0);
    setError(null);
    void loadJobsPage(1, "replace");
  }, [activeTab, pageSize, loadJobsPage]);

  const maxLoadedPage = useMemo(
    () => (loadedPages.length ? Math.max(...loadedPages) : 0),
    [loadedPages],
  );

  const hasMorePages = activeTab !== "saved" && maxLoadedPage < totalPages;

  const ensurePageLoaded = useCallback(
    async (targetPage: number) => {
      if (loadedPages.includes(targetPage)) return;
      await loadJobsPage(targetPage, "append");
    },
    [loadedPages, loadJobsPage],
  );

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (isLoading || isLoadingMore || !hasMorePages) return;

        const nextPage = maxLoadedPage + 1;
        void loadJobsPage(nextPage, "append");
      },
      { rootMargin: "220px" },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMorePages, isLoading, isLoadingMore, loadJobsPage, maxLoadedPage]);

  const filteredJobs = useMemo(() => {
    if (activeTab === "saved") {
      return jobs.filter((job) => savedJobIdsSet.has(job.id));
    }

    return jobs;
  }, [activeTab, jobs, savedJobIdsSet]);

  const displayTotalJobs =
    activeTab === "saved" ? filteredJobs.length : totalJobs;
  const displayTotalPages = Math.max(1, Math.ceil(displayTotalJobs / pageSize));

  useEffect(() => {
    if (currentPage > displayTotalPages) {
      setCurrentPage(displayTotalPages);
    }
  }, [currentPage, displayTotalPages]);

  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const currentPageJobs = filteredJobs.slice(pageStart, pageEnd);

  const stats = useMemo(() => {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    const newToday = jobs.filter((job) => {
      if (!job.postedAt) return false;
      const date = new Date(job.postedAt);
      if (Number.isNaN(date.getTime())) return false;
      return (
        `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` ===
        todayKey
      );
    }).length;

    const remote = jobs.filter((job) => job.location === "Remote").length;

    return {
      total: totalJobs,
      newToday,
      matched: jobs.filter((job) => (job.match ?? 0) >= 80).length,
      saved: savedJobIds.length,
      applied: remote,
    };
  }, [jobs, totalJobs, savedJobIds.length]);

  const handleNextPage = async () => {
    if (currentPage >= displayTotalPages) return;

    const nextPage = currentPage + 1;
    if (activeTab !== "saved") {
      await ensurePageLoaded(nextPage);
    }
    setCurrentPage(nextPage);
  };

  const handlePreviousPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        toast.info("Removed from saved jobs.");
        return prev.filter((id) => id !== jobId);
      }

      toast.success("Job saved.");
      return [...prev, jobId];
    });
  };

  const handleViewDetails = async (jobId: string) => {
    setJobDetailsModal({
      isOpen: true,
      isLoading: true,
      error: null,
      details: null,
      jobId,
    });

    try {
      const detailsResponse = await fetchJobById(jobId);
      setJobDetailsModal({
        isOpen: true,
        isLoading: false,
        error: null,
        details: detailsResponse.detailedJD,
        jobId,
      });
    } catch (err) {
      setJobDetailsModal({
        isOpen: true,
        isLoading: false,
        error:
          err instanceof Error ? err.message : "Failed to load job details",
        details: null,
        jobId,
      });
    }
  };

  const getShareData = () => {
    if (!jobDetailsModal.details) return null;

    const baseUrl =
      typeof window !== "undefined"
        ? new URL(window.location.href)
        : new URL("http://localhost:3000/dashboard/jobs");

    if (jobDetailsModal.jobId) {
      baseUrl.searchParams.set("jobId", jobDetailsModal.jobId);
    }

    const url = baseUrl.toString();
    const text = `Check out this opening: ${jobDetailsModal.details.title} at ${jobDetailsModal.details.companyName}`;

    return { url, text };
  };

  const openShareUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShareWhatsApp = () => {
    const share = getShareData();
    if (!share) return;
    openShareUrl(
      `https://wa.me/?text=${encodeURIComponent(`${share.text}\n${share.url}`)}`,
    );
  };

  const handleShareEmail = () => {
    const share = getShareData();
    if (!share) return;
    window.location.href = `mailto:?subject=${encodeURIComponent(share.text)}&body=${encodeURIComponent(`${share.text}\n\n${share.url}`)}`;
  };

  const handleShareLinkedIn = () => {
    const share = getShareData();
    if (!share) return;
    openShareUrl(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(share.url)}`,
    );
  };

  const handleShareX = () => {
    const share = getShareData();
    if (!share) return;
    openShareUrl(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(share.text)}&url=${encodeURIComponent(share.url)}`,
    );
  };

  const handleCopyShareLink = async () => {
    const share = getShareData();
    if (!share) return;

    if (!navigator?.clipboard) {
      toast.error("Clipboard is not available on this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(share.url);
      toast.success("Link copied to clipboard.");
    } catch {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const handleShareOther = async () => {
    const share = getShareData();
    if (!share) return;

    if (navigator.share) {
      await navigator.share({
        title: jobDetailsModal.details?.title,
        text: share.text,
        url: share.url,
      });
      return;
    }

    await handleCopyShareLink();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-background border-b"></div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Total Jobs",
              value: stats.total,
              icon: Briefcase,
              color: "text-blue-600",
              bgColor: "bg-blue-100",
            },
            {
              label: "New Today",
              value: stats.newToday,
              icon: Sparkles,
              color: "text-amber-600",
              bgColor: "bg-amber-100",
            },
            {
              label: "Matched",
              value: stats.matched,
              icon: Target,
              color: "text-purple-600",
              bgColor: "bg-purple-100",
            },
            {
              label: "Saved",
              value: stats.saved,
              icon: Bookmark,
              color: "text-green-600",
              bgColor: "bg-green-100",
            },
            {
              label: "Applied",
              value: stats.applied,
              icon: Send,
              color: "text-red-600",
              bgColor: "bg-red-100",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <AnimatedNumber
                        value={stat.value}
                        className="text-2xl font-bold text-foreground"
                      />
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl">Your Job Matches</CardTitle>
                </CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="best">Best Match</TabsTrigger>
                    <TabsTrigger value="remote">Remote</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    {error ? (
                      <div className="py-6 text-sm text-destructive">
                        {error}
                      </div>
                    ) : isLoading ? (
                      <div className="py-6 text-sm text-muted-foreground">
                        Loading jobs...
                      </div>
                    ) : (
                      <JobListingsList
                        data={currentPageJobs}
                        onViewDetails={handleViewDetails}
                        savedJobIds={savedJobIdsSet}
                        onToggleSave={handleToggleSave}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="best">
                    {error ? (
                      <div className="py-6 text-sm text-destructive">
                        {error}
                      </div>
                    ) : isLoading ? (
                      <div className="py-6 text-sm text-muted-foreground">
                        Loading jobs...
                      </div>
                    ) : (
                      <JobListingsList
                        data={currentPageJobs}
                        onViewDetails={handleViewDetails}
                        savedJobIds={savedJobIdsSet}
                        onToggleSave={handleToggleSave}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="remote">
                    {error ? (
                      <div className="py-6 text-sm text-destructive">
                        {error}
                      </div>
                    ) : isLoading ? (
                      <div className="py-6 text-sm text-muted-foreground">
                        Loading jobs...
                      </div>
                    ) : (
                      <JobListingsList
                        data={currentPageJobs}
                        onViewDetails={handleViewDetails}
                        savedJobIds={savedJobIdsSet}
                        onToggleSave={handleToggleSave}
                      />
                    )}
                  </TabsContent>
                  <TabsContent value="saved">
                    {error ? (
                      <div className="py-6 text-sm text-destructive">
                        {error}
                      </div>
                    ) : isLoading ? (
                      <div className="py-6 text-sm text-muted-foreground">
                        Loading jobs...
                      </div>
                    ) : (
                      <JobListingsList
                        data={currentPageJobs}
                        onViewDetails={handleViewDetails}
                        savedJobIds={savedJobIdsSet}
                        onToggleSave={handleToggleSave}
                      />
                    )}
                  </TabsContent>
                </Tabs>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Jobs per page
                    </span>
                    <Select
                      value={String(pageSize)}
                      onValueChange={(value) => setPageSize(Number(value))}
                    >
                      <SelectTrigger size="sm" className="w-22">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAGE_SIZE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={String(option)}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Page {currentPage} of {displayTotalPages} •{" "}
                      {displayTotalJobs} jobs
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage <= 1 || isLoading}
                    >
                      <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={
                        currentPage >= displayTotalPages ||
                        isLoading ||
                        (activeTab !== "saved" && isLoadingMore)
                      }
                    >
                      Next
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>

                <div ref={loadMoreRef} className="h-1" />
                {isLoadingMore ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Lazy loading more jobs...
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  6-Month Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-50 w-full">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="matched"
                      stroke="var(--color-matched)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="applied"
                      stroke="var(--color-applied)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="saved"
                      stroke="var(--color-saved)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Match Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                {[
                  { label: "Match Rate", value: 72, color: "bg-blue-500" },
                  {
                    label: "Application Rate",
                    value: 43,
                    color: "bg-green-500",
                  },
                  { label: "Response Rate", value: 28, color: "bg-purple-500" },
                ].map((metric) => (
                  <div key={metric.label} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        {metric.label}
                      </span>
                      <span className="font-medium text-foreground">
                        <AnimatedNumber value={metric.value} />%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${metric.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Browse All Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Alerts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Saved Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog
        open={jobDetailsModal.isOpen}
        onOpenChange={(open) =>
          setJobDetailsModal((prev) => ({ ...prev, isOpen: open }))
        }
      >
        <DialogContent className="max-w-6xl w-[96vw] min-w-[50vw] min-h-[50vh] max-h-[95vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>Job Details</DialogTitle>
            <DialogDescription>
              Detailed job description and company information
            </DialogDescription>
          </DialogHeader>

          {jobDetailsModal.isLoading ? (
            <div className="py-10 text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading job details...
            </div>
          ) : jobDetailsModal.error ? (
            <div className="py-10 text-sm text-destructive">
              {jobDetailsModal.error}
            </div>
          ) : jobDetailsModal.details ? (
            <div className="space-y-6">
              <div className="space-y-1">
                {jobDetailsModal.details.companyLogo ? (
                  <img
                    src={jobDetailsModal.details.companyLogo}
                    alt={`${jobDetailsModal.details.companyName} logo`}
                    className="h-12 w-auto object-contain"
                  />
                ) : null}
                <p className="font-semibold text-lg">
                  {jobDetailsModal.details.companyName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {jobDetailsModal.details.companyWebsite}
                </p>
              </div>

              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() =>
                  setJobDetailsModal((prev) => ({ ...prev, isOpen: false }))
                }
              >
                {jobDetailsModal.details.backToOpeningsLabel}
              </button>

              <div>
                <h2 className="text-2xl font-semibold">
                  {jobDetailsModal.details.title}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {jobDetailsModal.details.subtitle}
                </p>
              </div>

              <div className="space-y-4 text-sm leading-6">
                <p>
                  <span className="font-semibold">Role - </span>
                  {jobDetailsModal.details.roleTitle}
                </p>
                <p>
                  <span className="font-semibold">Experience - </span>
                  {jobDetailsModal.details.experienceRange}
                </p>

                {jobDetailsModal.details.experienceDetails?.length ? (
                  <div>
                    <p className="font-semibold mb-2">Experience Details:</p>
                    <ul className="list-disc pl-5 space-y-1 max-h-40 overflow-y-auto pr-2">
                      {jobDetailsModal.details.experienceDetails.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p>
                  <span className="font-semibold">Location - </span>
                  {jobDetailsModal.details.locationText}
                </p>

                <div>
                  <p className="font-semibold mb-2">Job Description :</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {jobDetailsModal.details.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">Job Specifications:</p>
                  <ul className="list-disc pl-5 space-y-1 max-h-56 overflow-y-auto pr-2">
                    {jobDetailsModal.details.specifications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">
                    About {jobDetailsModal.details.companyName}
                  </p>
                  <p>{jobDetailsModal.details.aboutCompany}</p>
                  {jobDetailsModal.details.aboutHighlights?.length ? (
                    <ul className="list-disc pl-5 space-y-1 mt-3 max-h-40 overflow-y-auto pr-2">
                      {jobDetailsModal.details.aboutHighlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-2">
                    Website: {jobDetailsModal.details.companyWebsite}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() =>
                  setJobDetailsModal((prev) => ({ ...prev, isOpen: false }))
                }
              >
                {jobDetailsModal.details.backToOpeningsLabel}
              </button>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {jobDetailsModal.details.shareText}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleShareWhatsApp}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleShareEmail}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleShareLinkedIn}
                  >
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleShareX}
                  >
                    X
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void handleCopyShareLink()}
                  >
                    <Link2 className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void handleShareOther()}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Other
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">powered by</p>
                <p className="text-sm font-medium">
                  {jobDetailsModal.details.poweredBy}
                </p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
