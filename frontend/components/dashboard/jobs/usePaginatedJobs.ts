"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  fetchJobsMapData,
  fetchJobsPaginated,
  type JobListItem,
  type JobsMapPoint,
  type JobsQueryMetadata,
} from "@/lib/api-client";
import { buildMapPoints, getJobsStats, getMapSummary, mapJobItem } from "@/components/dashboard/jobs/helpers";
import type { JobListing } from "@/components/dashboard/jobs/types";
import { useDashboardJobsUiStore } from "@/store/dashboard-jobs-ui-store";

export function usePaginatedJobs(
  savedJobIdsSet: Set<string>,
  savedJobsCount: number,
  isMapOpen = false,
) {
  const {
    activeTab, setActiveTab,
    searchInput, setSearchInput,
    searchTerm, setSearchTerm,
    locationTerm, setLocationTerm,
    pageSize, setPageSize,
    currentPage, setCurrentPage,
    resetFilters,
  } = useDashboardJobsUiStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
      searchInput: state.searchInput,
      setSearchInput: state.setSearchInput,
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
      locationTerm: state.locationTerm,
      setLocationTerm: state.setLocationTerm,
      pageSize: state.pageSize,
      setPageSize: state.setPageSize,
      currentPage: state.currentPage,
      setCurrentPage: state.setCurrentPage,
      resetFilters: state.resetFilters,
    })),
  );
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [jobsRaw, setJobsRaw] = useState<JobListItem[]>([]);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobsMetadata, setJobsMetadata] = useState<JobsQueryMetadata | null>(null);
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

  const stats = useMemo(
    () => getJobsStats(jobs, totalJobs, savedJobsCount),
    [jobs, totalJobs, savedJobsCount],
  );

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
