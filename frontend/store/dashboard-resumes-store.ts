"use client";

import { create } from "zustand";
import { fetchResumes, type ResumeListItem } from "@/lib/api-client";

type DashboardResumesState = {
  resumes: ResumeListItem[];
  isLoading: boolean;
  error: string | null;
  selectedResumeId: string | null;
  setSelectedResumeId: (id: string | null) => void;
  loadResumes: () => Promise<void>;
};

export const useDashboardResumesStore = create<DashboardResumesState>((set, get) => ({
  resumes: [],
  isLoading: false,
  error: null,
  selectedResumeId: null,
  setSelectedResumeId: (id) => set({ selectedResumeId: id }),
  loadResumes: async () => {
    if (get().resumes.length > 0 || get().isLoading) return;
    try {
      set({ isLoading: true, error: null });
      const data = await fetchResumes();
      set({
        resumes: data,
        selectedResumeId: data[0]?._id || null,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load resumes",
        isLoading: false,
      });
    }
  },
}));
