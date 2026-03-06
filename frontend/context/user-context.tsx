"use client";

import { useEffect, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/user-store";

type UserContextValue = {
  user: unknown;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const setSessionStatus = useUserStore((state) => state.setSessionStatus);

  useEffect(() => {
    setSessionStatus(session ?? null, status);
  }, [session, setSessionStatus, status]);

  return <>{children}</>;
}

export function useUserContext() {
  return useUserStore(
    useShallow(
      (state): UserContextValue => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
      }),
    ),
  );
}
