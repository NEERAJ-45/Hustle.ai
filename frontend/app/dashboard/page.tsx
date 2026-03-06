"use client";

import { useState, useEffect, useMemo, lazy, Suspense } from "react";
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

  // Shared contexts — no duplicate fetch
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
      color: "bg-green-500",
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
      color: "bg-blue-500",
    },
    {
      label: "Application Momentum",
      value: Math.min(100, (dashboardData?.stats.applicationsSent || 0) * 5),
      color: "bg-purple-500",
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
        ? "text-blue-600"
        : status.includes("offer")
          ? "text-green-600"
          : status.includes("reject")
            ? "text-red-600"
            : "text-purple-600";

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
      color: "bg-blue-500",
    },
    {
      label: "Interviews",
      value: dashboardData?.applications.interviews || 0,
      color: "bg-green-500",
    },
    {
      label: "Offers",
      value: dashboardData?.applications.offers || 0,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={null}>
            <MotionDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold">
                Welcome back, {displayName}!
              </h1>
              <p className="text-white/80">
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
              <div key={i} className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 w-12 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-8">
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
                color: "text-[#2563eb]",
                bgColor: "bg-blue-100",
              },
              {
                label: "Applications Sent",
                value: dashboardData?.stats.applicationsSent || 0,
                icon: Send,
                color: "text-green-600",
                bgColor: "bg-green-100",
              },
              {
                label: "Interviews",
                value: dashboardData?.stats.interviews || 0,
                icon: Calendar,
                color: "text-purple-600",
                bgColor: "bg-purple-100",
              },
              {
                label: "Offers",
                value: dashboardData?.stats.offers || 0,
                icon: TrendingUp,
                color: "text-amber-600",
                bgColor: "bg-amber-100",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-lg shadow-sm bg-white border-2 border-${stat.bgColor}`}
              >
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content Grid: Left = Tabs, Right = AI Assistant & Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Tabs */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="matches">Job Matches</TabsTrigger>
                <TabsTrigger value="applications">
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
                        className="bg-white rounded-lg border p-4 animate-pulse"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-48 bg-gray-200 rounded" />
                            <div className="h-3 w-32 bg-gray-200 rounded" />
                          </div>
                          <div className="h-8 w-20 bg-gray-200 rounded-md" />
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
                        className="bg-white rounded-lg border p-4 animate-pulse"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-44 bg-gray-200 rounded" />
                            <div className="h-3 w-28 bg-gray-200 rounded" />
                          </div>
                          <div className="h-6 w-20 bg-gray-200 rounded-full" />
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
          {/* Right Column: AI Assistant & Stats */}
          <div className="space-y-6">
            {/* AI Resume Assistant */}
            <Card className="bg-linear-to-br from-[#334e68] to-[#2563eb] text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Resume Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-white/80">
                  AI insights are generated from your current dashboard
                  activity.
                </p>
                {aiMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{metric.label}</span>
                      <span className="font-semibold">
                        <AnimatedNumber value={metric.value} suffix="%" />
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
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
                <Button className="w-full bg-white text-[#334e68] hover:bg-white/90">
                  View Full Report
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                      <span className="text-sm font-semibold text-gray-900">
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
