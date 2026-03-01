"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useSession } from "next-auth/react";

type UserContextValue = {
  user: unknown;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const value = useMemo<UserContextValue>(
    () => ({
      user: session?.user,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
    }),
    [session?.user, status],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }

  return context;
}
