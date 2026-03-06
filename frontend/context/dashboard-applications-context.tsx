"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { fetchDashboard, type DashboardData } from "@/lib/api-client";

type DashboardApplicationsContextValue = {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  loadDashboard: () => Promise<void>;
};

const DashboardApplicationsContext =
  createContext<DashboardApplicationsContextValue | null>(null);

export function DashboardApplicationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedRef = useRef(false);

  const loadDashboard = useCallback(async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchDashboard();
      setDashboardData(data);
    } catch (err) {
      loadedRef.current = false;
      setError(
        err instanceof Error ? err.message : "Failed to load applications",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <DashboardApplicationsContext.Provider
      value={{ dashboardData, isLoading, error, loadDashboard }}
    >
      {children}
    </DashboardApplicationsContext.Provider>
  );
}

export function useDashboardApplications() {
  const ctx = useContext(DashboardApplicationsContext);
  if (!ctx)
    throw new Error(
      "useDashboardApplications must be used within DashboardApplicationsProvider",
    );
  return ctx;
}
