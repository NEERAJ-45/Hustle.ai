"use client";

import type { Session } from "next-auth";
import { create } from "zustand";
import { fetchCurrentUser, type CurrentUser } from "@/lib/api-client";

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

type UserStoreState = {
  user: Session["user"] | null;
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCurrentUserLoading: boolean;
  setSessionStatus: (session: Session | null, status: SessionStatus) => void;
  loadCurrentUser: () => Promise<void>;
  reset: () => void;
};

const initialState = {
  user: null,
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  isCurrentUserLoading: false,
};

export const useUserStore = create<UserStoreState>((set, get) => ({
  ...initialState,
  setSessionStatus: (session, status) => {
    set({
      user: session?.user ?? null,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
    });
  },
  loadCurrentUser: async () => {
    if (get().currentUser || get().isCurrentUserLoading) return;
    set({ isCurrentUserLoading: true });
    try {
      const user = await fetchCurrentUser();
      set({ currentUser: user, isCurrentUserLoading: false });
    } catch {
      set({ isCurrentUserLoading: false });
    }
  },
  reset: () => set(initialState),
}));
