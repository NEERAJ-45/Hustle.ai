"use client";

import { type ReactNode } from "react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/user-context";

export function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
}
