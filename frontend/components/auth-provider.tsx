"use client";

import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/user-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
}
