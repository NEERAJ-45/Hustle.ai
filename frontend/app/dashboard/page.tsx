"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { useSession } from "next-auth/react";
import JobMatchesList from "@/components/dashboard/JobMatchesList";
import ApplicationsList from "@/components/dashboard/ApplicationsList";
import { useDashboardApplications } from "@/context/dashboard-applications-context";
import { useUserContext } from "@/context/user-context";

const MotionDiv = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.motion.div })),
);

import {
  Target,
  Send,
  Calendar,
  Sparkles,
  Clock,
  CheckCircle,
  Briefcase,
  AlertCircle,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("matches");
  const { data: session } = useSession();

  const { dashboardData, isLoading, error, loadDashboard } =
    useDashboardApplications();
  const { currentUser, loadCurrentUser } = useUserContext();

  useEffect(() => {
    if (session) {
      void loadDashboard();
      void loadCurrentUser();
    }
  }, [session, loadDashboard, loadCurrentUser]);

  const displayName = currentUser?.name?.trim() || "User";

  const aiMetrics = [
    {
      label: "Profile Completion",
      value: dashboardData?.profile.completionScore || 0,
      color: "bg-emerald-500",
    },
    {
      label: "Job Match Health",
      value: dashboardData?.matches.total
        ? Math.min(
            100,
            Math.round(
              ((dashboardData.matches.applied + dashboardData.matches.saved) /
                dashboardData.matches.total) *
                100,
            ),
          )
        : 0,
      color: "bg-cyan-500",
    },
    {
      label: "Application Momentum",
      value: Math.min(100, (dashboardData?.stats.applicationsSent || 0) * 5),
      color: "bg-violet-500",
    },
  ];

  const recentActivities =
    dashboardData?.applicationsList.slice(0, 4).map((application) => {
      const status = application.status.toLowerCase();
      const icon = status.includes("interview")
        ? Calendar
        : status.includes("offer")
          ? TrendingUp
          : status.includes("reject")
            ? AlertCircle
            : CheckCircle;
      const color = status.includes("interview")
        ? "text-cyan-400"
        : status.includes("offer")
          ? "text-emerald-400"
          : status.includes("reject")
            ? "text-red-400"
            : "text-violet-400";

      return {
        action: `${application.status}: ${application.job}`,
        time: new Date(application.date).toLocaleDateString(),
        icon,
        color,
      };
    }) || [];

  const weeklyStats = [
    {
      label: "Applications",
      value: dashboardData?.applications.total || 0,
      color: "bg-cyan-500",
    },
    {
      label: "Interviews",
      value: dashboardData?.applications.interviews || 0,
      color: "bg-emerald-500",
    },
    {
      label: "Offers",
      value: dashboardData?.applications.offers || 0,
      color: "bg-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Removed gradient and grid backgrounds */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
          <Suspense fallback={null}>
            <MotionDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 mb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[13px] font-medium tracking-wide text-cyan-400">
                  Dashboard
                </span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent">
                  Welcome back, {displayName}!
                </span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Here is your latest job search performance from live data.
              </p>
            </MotionDiv>
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-4"
              >
                <div className="flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 w-12 bg-muted rounded" />
                    <div className="h-3 w-24 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8">
            <p className="font-medium">Failed to load dashboard data</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Job Matches",
                value: dashboardData?.stats.jobMatches || 0,
                icon: Target,
                color: "text-cyan-400",
                bgColor: "bg-cyan-500/10",
                borderColor: "border-cyan-500/20",
              },
              {
                label: "Applications Sent",
                value: dashboardData?.stats.applicationsSent || 0,
                icon: Send,
                color: "text-emerald-400",
                bgColor: "bg-emerald-500/10",
                borderColor: "border-emerald-500/20",
              },
              {
                label: "Interviews",
                value: dashboardData?.stats.interviews || 0,
                icon: Calendar,
                color: "text-violet-400",
                bgColor: "bg-violet-500/10",
                borderColor: "border-violet-500/20",
              },
              {
                label: "Offers",
                value: dashboardData?.stats.offers || 0,
                icon: TrendingUp,
                color: "text-amber-400",
                bgColor: "bg-amber-500/10",
                borderColor: "border-amber-500/20",
              },
            ].map((stat, idx) => (
              <Suspense key={idx} fallback={null}>
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-card border ${stat.borderColor}`}
                >
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      <AnimatedNumber value={stat.value} />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </MotionDiv>
              </Suspense>
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Tabs */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="bg-card border border-border">
                <TabsTrigger
                  value="matches"
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                >
                  Job Matches
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Applications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="matches" className="space-y-4 mt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-card rounded-xl border border-border p-4 animate-pulse"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-muted shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-48 bg-muted rounded" />
                            <div className="h-3 w-32 bg-muted rounded" />
                          </div>
                          <div className="h-8 w-20 bg-muted rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <JobMatchesList data={dashboardData?.jobMatchesList} />
                )}
              </TabsContent>
              <TabsContent value="applications" className="space-y-4 mt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-card rounded-xl border border-border p-4 animate-pulse"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-44 bg-muted rounded" />
                            <div className="h-3 w-28 bg-muted rounded" />
                          </div>
                          <div className="h-6 w-20 bg-muted rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ApplicationsList data={dashboardData?.applicationsList} />
                )}
              </TabsContent>
            </Tabs>
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Resume Assistant */}
            <Card className="relative overflow-hidden border-border">
              {/* Removed gradient background */}
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  AI Resume Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <p className="text-sm text-muted-foreground">
                  AI insights are generated from your current dashboard
                  activity.
                </p>
                {aiMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {metric.label}
                      </span>
                      <span className="font-semibold text-foreground">
                        <AnimatedNumber value={metric.value} suffix="%" />
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={metric.color}
                        style={{
                          height: "100%",
                          width: `${metric.value}%`,
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white border-0">
                  View Full Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                      <span className="text-sm font-semibold text-foreground">
                        <AnimatedNumber value={stat.value} />
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
