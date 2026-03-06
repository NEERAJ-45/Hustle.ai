"use client";

import { create } from "zustand";
import { fetchDashboard, type DashboardData } from "@/lib/api-client";

type DashboardApplicationsState = {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  loadDashboard: () => Promise<void>;
};

export const useDashboardApplicationsStore = create<DashboardApplicationsState>(
  (set, get) => ({
    dashboardData: null,
    isLoading: false,
    error: null,
    loadDashboard: async () => {
      if (get().dashboardData || get().isLoading) return;
      try {
        set({ isLoading: true, error: null });
        const data = await fetchDashboard();
        set({ dashboardData: data, isLoading: false });
      } catch (err) {
        set({
          error:
            err instanceof Error ? err.message : "Failed to load applications",
          isLoading: false,
        });
      }
    },
  }),
);
