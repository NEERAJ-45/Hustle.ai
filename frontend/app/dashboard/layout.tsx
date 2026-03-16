"use client";

import type React from "react";
import { Suspense, lazy } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Search,
  Briefcase,
  FileText,
  Calendar,
  Settings,
  Bell,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useUserContext } from "@/context/user-context";
import { DashboardApplicationsProvider } from "@/context/dashboard-applications-context";
import { ThemeToggleButton } from "@/components/ui/skiper26-theme-toggle";

const AnimatePresence = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.AnimatePresence })),
);
const MotionDiv = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.motion.div })),
);

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Job Search", href: "/dashboard/jobs", icon: Search },
  { name: "Applications", href: "/dashboard/applications", icon: Briefcase },
  { name: "Resumes", href: "/dashboard/resumes", icon: FileText },
  { name: "Interviews", href: "/dashboard/interviews", icon: Calendar },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

function LoginToastHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const hasShownLoginToast = useRef(false);

  useEffect(() => {
    if (
      searchParams?.get("loginSuccess") === "1" &&
      !hasShownLoginToast.current
    ) {
      hasShownLoginToast.current = true;
      toast.success("Login successful. Welcome to your dashboard.");
      router.replace(pathname || "/dashboard");
    }
  }, [pathname, router, searchParams]);

  return null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, loadCurrentUser } = useUserContext();

  useEffect(() => {
    void loadCurrentUser();
  }, [loadCurrentUser]);

  const handleLogout = async () => {
    try {
      const result = await signOut({
        redirect: false,
        callbackUrl: "/login?loggedOut=1",
      });

      if (result?.url) {
        router.push(result.url);
        return;
      }

      toast.error("Logout failed. Please try again.");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const displayName = currentUser?.name || "User";
  const avatarFallback =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() || "")
      .join("") || "U";

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Hustle.ai
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`gap-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 ${isActive ? "text-foreground bg-accent border-b-2 border-cyan-500 rounded-b-none" : ""}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <ThemeToggleButton
                variant="circle"
                start="center"
                className="size-8"
              />
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    <Avatar className="w-8 h-8 border border-border">
                      <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-500 text-white text-xs">
                        {avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{displayName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-popover border-border text-popover-foreground"
                >
                  <DropdownMenuLabel className="text-muted-foreground">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    className="hover:bg-accent focus:bg-accent text-foreground"
                    onClick={() =>
                      router.push("/dashboard/settings?tab=profile")
                    }
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-accent focus:bg-accent text-foreground"
                    onClick={() => router.push("/dashboard/settings?tab=job")}
                  >
                    Job Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-accent focus:bg-accent text-foreground"
                    onClick={() =>
                      router.push("/dashboard/settings?tab=billing")
                    }
                  >
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    className="hover:bg-accent focus:bg-accent text-red-400"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Suspense fallback={null}>
            <AnimatePresence>
              <MotionDiv
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-border"
              >
                <div className="container mx-auto px-4 py-4 space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className={`w-full justify-start gap-2 text-muted-foreground hover:text-foreground hover:bg-accent ${isActive ? "text-foreground bg-accent" : ""}`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </Button>
                      </Link>
                    );
                  })}
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-accent"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </div>
              </MotionDiv>
            </AnimatePresence>
          </Suspense>
        )}
      </nav>

      <Suspense fallback={null}>
        <LoginToastHandler />
      </Suspense>

      {/* Main Content */}
      <main>
        <DashboardApplicationsProvider>
          {children}
        </DashboardApplicationsProvider>
      </main>
    </div>
  );
}
