import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// If you get an error here, ensure @prisma/client is installed and generated
import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';
import path from 'path';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient({ log: [] });
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// Simple logger
type LogType = 'ERROR' | 'EVENT' | 'INFO' | 'WARN' | 'QUERY';
function logEvent(type: LogType, message: string, meta?: unknown) {
  const logMsg = `[${new Date().toISOString()}] [${type}] ${message} ${meta ? JSON.stringify(meta) : ''}`;
  // Console log
  // eslint-disable-next-line no-console
  console.log(logMsg);
  // Write to logs/auth.log
  try {
    const logsDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logsDir, 'auth.log');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(logFile, logMsg + '\n', 'utf8');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to write log file:', err);
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google login is main source
    require('next-auth/providers/google').default({
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
          // Determine if this is a signup or login
          const isSignup = credentials.isSignup === 'true' ;
          const endpoint = isSignup
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/v1/auth/register`
            : `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/v1/auth/login`;
          const payload = isSignup
            ? { name: credentials.name, email: credentials.email, password: credentials.password }
            : { email: credentials.email, password: credentials.password };
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (!data.success || !data.data || !data.data.user) return null;
          // Attach JWT token to user object for session
          return {
            ...data.data.user,
            id: data.data.user.id || data.data.user._id,
            token: data.data.token,
          };
        } catch (error) {
          logEvent('ERROR', 'Authorize error', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async session({ session, token, user }: { session: any; token: any; user: any }) {
      logEvent('EVENT', 'Session callback', { session, token, user });
      return session;
    },
    async signIn(params: {
      user: any;
      account: any;
      profile?: any;
      email?: any;
      credentials?: any;
    }) {
      logEvent('EVENT', 'SignIn callback', params);
      return true;
    },
  },
};

export default NextAuth(authOptions);
