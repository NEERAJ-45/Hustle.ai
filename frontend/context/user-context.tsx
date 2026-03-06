"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { fetchCurrentUser, type CurrentUser } from "@/lib/api-client";

type UserContextValue = {
  user: Session["user"] | null;
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCurrentUserLoading: boolean;
  loadCurrentUser: () => Promise<void>;
  reset: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const [user, setUser] = useState<Session["user"] | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUserLoading, setIsCurrentUserLoading] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    setUser(session?.user ?? null);
    setIsAuthenticated(status === "authenticated");
    setIsLoading(status === "loading");
  }, [session, status]);

  const loadCurrentUser = useCallback(async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    setIsCurrentUserLoading(true);
    try {
      const data = await fetchCurrentUser();
      setCurrentUser(data);
    } catch {
      loadedRef.current = false;
    } finally {
      setIsCurrentUserLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUser(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsLoading(true);
    setIsCurrentUserLoading(false);
    loadingRef.current = false;
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        currentUser,
        isAuthenticated,
        isLoading,
        isCurrentUserLoading,
        loadCurrentUser,
        reset,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used within UserProvider");
  return ctx;
}
