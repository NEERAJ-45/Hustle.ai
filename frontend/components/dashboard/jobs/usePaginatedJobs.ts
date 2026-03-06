"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  fetchDashboard,
  fetchJobsMapData,
  fetchJobsPaginated,
  type DashboardData,
  type JobListItem,
  type JobsMapPoint,
  type JobsQueryMetadata,
} from "@/lib/api-client";
import { buildMapPoints, getMapSummary, mapJobItem } from "@/components/dashboard/jobs/helpers";
import type { JobListing, JobsStats } from "@/components/dashboard/jobs/types";

type JobsTrendPoint = {
  key: string;
  month: string;
  matched: number;
  applied: number;
  interviews: number;
};

type JobsMetric = {
  label: string;
  value: number;
  color: string;
};

type MapTrendJob = {
  id: string;
  postedDate: string | null;
};

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

export function usePaginatedJobs(
  savedJobIdsSet: Set<string>,
  savedJobsCount: number,
  isMapOpen = false,
) {
  const [activeTab, setActiveTabRaw] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTermRaw] = useState("");
  const [pageSize, setPageSizeRaw] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const setActiveTab = useCallback((value: string) => {
    setActiveTabRaw(value);
    setCurrentPage(1);
  }, []);
  const setLocationTerm = useCallback((value: string) => {
    setLocationTermRaw(value);
    setCurrentPage(1);
  }, []);
  const setPageSize = useCallback((value: number) => {
    setPageSizeRaw(value);
    setCurrentPage(1);
  }, []);
  const resetFilters = useCallback(() => {
    setSearchInput("");
    setSearchTerm("");
    setLocationTermRaw("");
    setCurrentPage(1);
  }, []);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [jobsRaw, setJobsRaw] = useState<JobListItem[]>([]);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobsMetadata, setJobsMetadata] = useState<JobsQueryMetadata | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [trendJobs, setTrendJobs] = useState<MapTrendJob[]>([]);
  const [mapPoints, setMapPoints] = useState<JobsMapPoint[]>([]);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchTerm(searchInput.trim());
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

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
          search: searchTerm || undefined,
          location: locationTerm || undefined,
          isRemote: activeTab === "remote" ? true : undefined,
        });

        const mapped = response.data.map(mapJobItem);

        setJobs((prev) => {
          if (!isAppend) return mapped;

          const existingIds = new Set(prev.map((job) => job.id));
          const deduped = mapped.filter((job) => !existingIds.has(job.id));
          return [...prev, ...deduped];
        });

        setJobsRaw((prev) => {
          if (!isAppend) return response.data || [];

          const existingIds = new Set(prev.map((job) => job._id));
          const deduped = (response.data || []).filter(
            (job) => !existingIds.has(job._id),
          );
          return [...prev, ...deduped];
        });

        setLoadedPages((prev) => {
          if (prev.includes(page)) return prev;
          return [...prev, page].sort((a, b) => a - b);
        });

        setTotalPages(response.meta.totalPages || 1);
        setTotalJobs(response.meta.total || mapped.length);
        setJobsMetadata(response.meta.metadata || null);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch jobs";
        setError(message);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [activeTab, locationTerm, pageSize, searchTerm],
  );

  useEffect(() => {
    setJobs([]);
    setJobsRaw([]);
    setLoadedPages([]);
    setTotalPages(1);
    setTotalJobs(0);
    setError(null);
    void loadJobsPage(1, "replace");
  }, [activeTab, pageSize, loadJobsPage]);

  useEffect(() => {
    let isCancelled = false;

    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboard();
        if (!isCancelled) {
          setDashboardData(data);
        }
      } catch {
        if (!isCancelled) {
          setDashboardData(null);
        }
      }
    };

    void loadDashboardData();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Fetch full jobs map data for chart/stats aggregation so cards and graph are computed from the same real API dataset.
  useEffect(() => {
    let isCancelled = false;

    const loadTrendJobs = async () => {
      try {
        const response = await fetchJobsMapData();
        let flattened = (response.data || []).flatMap((point) => point.jobs || []);

        if (activeTab === "saved") {
          flattened = flattened.filter((job) => savedJobIdsSet.has(job.id));
        }

        if (!isCancelled) {
          setTrendJobs(
            flattened.map((job) => ({
              id: job.id,
              postedDate: job.postedDate,
            })),
          );
        }
      } catch {
        if (!isCancelled) {
          // Fallback to currently loaded paginated jobs if map aggregation is unavailable.
          setTrendJobs(
            jobsRaw.map((job) => ({
              id: job._id,
              postedDate: job.postedDate || null,
            })),
          );
        }
      }
    };

    void loadTrendJobs();

    return () => {
      isCancelled = true;
    };
  }, [activeTab, jobsRaw, savedJobIdsSet]);

  // Only fetch map data when the map dialog is actually open
  useEffect(() => {
    if (!isMapOpen) return;

    let isCancelled = false;

    const loadMapPoints = async () => {
      setIsMapLoading(true);

      try {
        const response = await fetchJobsMapData({
          search: searchTerm || undefined,
          location: locationTerm || undefined,
          isRemote: activeTab === "remote" ? true : undefined,
        });

        let nextPoints = response.data || [];

        if (activeTab === "saved") {
          nextPoints = nextPoints
            .map((point) => {
              const savedJobs = point.jobs.filter((job) =>
                savedJobIdsSet.has(job.id),
              );

              return {
                ...point,
                jobs: savedJobs,
                totalJobs: savedJobs.length,
              };
            })
            .filter((point) => point.totalJobs > 0);
        }

        if (!isCancelled) {
          setMapPoints(nextPoints);
        }
      } catch {
        if (!isCancelled) {
          setMapPoints(buildMapPoints(jobsRaw, activeTab, savedJobIdsSet));
        }
      } finally {
        if (!isCancelled) {
          setIsMapLoading(false);
        }
      }
    };

    void loadMapPoints();

    return () => {
      isCancelled = true;
    };
  }, [activeTab, isMapOpen, jobsRaw, locationTerm, savedJobIdsSet, searchTerm]);

  const mapSummary = useMemo(() => getMapSummary(mapPoints), [mapPoints]);
  const isMapDataLoading = isMapLoading && mapPoints.length === 0;

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

  const displayTotalJobs = activeTab === "saved" ? filteredJobs.length : totalJobs;
  const displayTotalPages = Math.max(1, Math.ceil(displayTotalJobs / pageSize));

  useEffect(() => {
    if (currentPage > displayTotalPages) {
      setCurrentPage(displayTotalPages);
    }
  }, [currentPage, displayTotalPages]);

  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const currentPageJobs = filteredJobs.slice(pageStart, pageEnd);

  const chartData = useMemo(() => {
    const now = new Date();
    const buckets: JobsTrendPoint[] = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now);
      date.setMonth(now.getMonth() - (5 - index));
      const year = date.getFullYear();
      const month = date.getMonth();

      return {
        key: `${year}-${month}`,
        month: date.toLocaleString("en-US", { month: "short" }),
        matched: 0,
        applied: 0,
        interviews: 0,
      };
    });

    const bucketMap = new Map(buckets.map((bucket) => [bucket.key, bucket]));

    for (const job of trendJobs) {
      const rawDate = job.postedDate;
      if (!rawDate) continue;

      const parsed = new Date(rawDate);
      if (Number.isNaN(parsed.getTime())) continue;

      const key = `${parsed.getFullYear()}-${parsed.getMonth()}`;
      const bucket = bucketMap.get(key);
      if (!bucket) continue;

      bucket.matched += 1;
    }

    for (const application of dashboardData?.applicationsList || []) {
      const parsed = new Date(application.date);
      if (Number.isNaN(parsed.getTime())) continue;

      const key = `${parsed.getFullYear()}-${parsed.getMonth()}`;
      const bucket = bucketMap.get(key);
      if (!bucket) continue;

      bucket.applied += 1;
      if (application.status.toLowerCase().includes("interview")) {
        bucket.interviews += 1;
      }
    }

    return buckets.map(({ key, ...rest }) => rest);
  }, [dashboardData?.applicationsList, trendJobs]);

  const stats = useMemo<JobsStats>(() => {
    const matched = chartData.reduce((sum, item) => sum + item.matched, 0);
    const applied = chartData.reduce((sum, item) => sum + item.applied, 0);

    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const newToday = trendJobs.filter((job) => {
      if (!job.postedDate) return false;
      const parsed = new Date(job.postedDate);
      if (Number.isNaN(parsed.getTime())) return false;
      return `${parsed.getFullYear()}-${parsed.getMonth()}-${parsed.getDate()}` === todayKey;
    }).length;

    return {
      total: Math.max(totalJobs, matched),
      newToday,
      matched,
      saved: savedJobsCount,
      applied,
    };
  }, [chartData, savedJobsCount, totalJobs, trendJobs]);

  const matchMetrics = useMemo<JobsMetric[]>(() => {
    const matchTotal = Math.max(dashboardData?.matches.total || totalJobs, 1);
    const appliedCount = dashboardData?.matches.applied || 0;
    const submittedCount = dashboardData?.applications.submitted || 0;
    const interviewCount = dashboardData?.applications.interviews || 0;

    return [
      {
        label: "Match Rate",
        value: clampPercent(Math.round((appliedCount / matchTotal) * 100)),
        color: "bg-blue-500",
      },
      {
        label: "Application Rate",
        value: clampPercent(Math.round((submittedCount / matchTotal) * 100)),
        color: "bg-green-500",
      },
      {
        label: "Response Rate",
        value: clampPercent(
          Math.round((interviewCount / Math.max(submittedCount, 1)) * 100),
        ),
        color: "bg-purple-500",
      },
    ];
  }, [dashboardData, totalJobs]);

  const handleNextPage = useCallback(async () => {
    if (currentPage >= displayTotalPages) return;

    const nextPage = currentPage + 1;
    if (activeTab !== "saved") {
      await ensurePageLoaded(nextPage);
    }
    setCurrentPage(nextPage);
  }, [activeTab, currentPage, displayTotalPages, ensurePageLoaded]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  return {
    activeTab,
    setActiveTab,
    searchInput,
    setSearchInput,
    locationTerm,
    setLocationTerm,
    pageSize,
    setPageSize,
    currentPage,
    displayTotalPages,
    displayTotalJobs,
    currentPageJobs,
    stats,
    chartData,
    matchMetrics,
    error,
    isLoading,
    isLoadingMore,
    jobsMetadata,
    mapPoints,
    mapSummary,
    isMapDataLoading,
    loadMoreRef,
    handleNextPage,
    handlePreviousPage,
    resetFilters,
  };
}
