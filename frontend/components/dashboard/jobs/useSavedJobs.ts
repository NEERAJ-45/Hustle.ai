"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { SAVED_JOBS_STORAGE_KEY } from "@/components/dashboard/jobs/constants";

export function useSavedJobs() {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

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

  const toggleSave = useCallback(
    (jobId: string) => {
      const isCurrentlySaved = savedJobIdsSet.has(jobId);

      if (isCurrentlySaved) {
        setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
        toast.info("Removed from saved jobs.");
        return;
      }

      setSavedJobIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
      toast.success("Job saved.");
    },
    [savedJobIdsSet],
  );

  return {
    savedJobIds,
    savedJobIdsSet,
    toggleSave,
  };
}
