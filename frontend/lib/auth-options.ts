import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: [] });
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

type LogType = "ERROR" | "EVENT" | "INFO" | "WARN" | "QUERY";

function logEvent(type: LogType, message: string, meta?: unknown) {
  const logMsg = `[${new Date().toISOString()}] [${type}] ${message} ${meta ? JSON.stringify(meta) : ""}`;

  // eslint-disable-next-line no-console
  console.log(logMsg);

  try {
    const logsDir = path.join(process.cwd(), "logs");
    const logFile = path.join(logsDir, "auth.log");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(logFile, `${logMsg}\n`, "utf8");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to write log file:", err);
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", required: false },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isSignup: { label: "Signup", type: "hidden", required: false },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const isSignup = credentials.isSignup === "true";
          const endpoint = isSignup
            ? `${BACKEND_URL}/api/v1/auth/register`
            : `${BACKEND_URL}/api/v1/auth/login`;

          const payload = isSignup
            ? { name: credentials.name, email: credentials.email, password: credentials.password }
            : { email: credentials.email, password: credentials.password };

          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await res.json();
          if (!data.success || !data.data || !data.data.user) return null;

          return {
            ...data.data.user,
            id: data.data.user.id || data.data.user._id,
            token: data.data.token,
          };
        } catch (error) {
          logEvent("ERROR", "Authorize error", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (!session.user) session.user = {};
      session.user.id = token.id as string | undefined;
      session.user.role = token.role as string | undefined;
      session.user.token = token.backendToken as string | undefined;
      logEvent("EVENT", "Session callback", { hasToken: !!token.backendToken, userId: token.id });
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id;
        token.role = user.role;
        token.backendToken = user.token;
      }

      if (!token.backendToken && token.email) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/v1/auth/oauth-exchange`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: token.email,
              name: token.name,
              provider: "nextauth",
              providerAccountId: token.sub || token.email,
            }),
          });

          const result = await response.json();
          if (response.ok && result?.success && result?.data?.token) {
            token.backendToken = result.data.token;
            token.id = result.data.user?.id || token.id;
            token.role = result.data.user?.role || token.role;
            logEvent("EVENT", "JWT backfill success", { email: token.email });
          }
        } catch (error) {
          logEvent("WARN", "JWT backfill skipped", {
            email: token.email,
            reason: error instanceof Error ? error.message : "unknown_error",
          });
        }
      }

      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        logEvent("EVENT", "SignIn credentials", { userId: user?.id });
        return true;
      }

      try {
        const exchangePayload = {
          email: user?.email,
          name: user?.name,
          provider: account?.provider,
          providerAccountId: account?.providerAccountId,
        };

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/oauth-exchange`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exchangePayload),
        });

        const result = await response.json();

        if (!response.ok || !result?.success || !result?.data?.token) {
          logEvent("ERROR", "OAuth exchange failed", { status: response.status, result });
          return false;
        }

        user.id = result.data.user?.id;
        user.role = result.data.user?.role;
        user.token = result.data.token;

        logEvent("EVENT", "OAuth exchange success", { userId: user.id, provider: account?.provider });
        return true;
      } catch (error) {
        logEvent("ERROR", "SignIn exchange error", error);
        return false;
      }
    },
  },
};
