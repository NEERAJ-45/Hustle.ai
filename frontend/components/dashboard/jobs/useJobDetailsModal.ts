"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchJobById } from "@/lib/api-client";
import type { JobDetailsModalState } from "@/components/dashboard/jobs/types";

export function useJobDetailsModal() {
  const [jobDetailsModal, setJobDetailsModal] = useState<JobDetailsModalState>({
    isOpen: false,
    isLoading: false,
    error: null,
    details: null,
    jobId: null,
  });

  const handleViewDetails = useCallback(async (jobId: string) => {
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
        error: err instanceof Error ? err.message : "Failed to load job details",
        details: null,
        jobId,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const deepLinkJobId = url.searchParams.get("jobId");
    if (!deepLinkJobId) return;

    void handleViewDetails(deepLinkJobId);
    url.searchParams.delete("jobId");
    window.history.replaceState({}, "", url.toString());
  }, [handleViewDetails]);

  const setDetailsOpen = useCallback((open: boolean) => {
    setJobDetailsModal((prev) => ({ ...prev, isOpen: open }));
  }, []);

  return {
    jobDetailsModal,
    handleViewDetails,
    setDetailsOpen,
  };
}
