"use client";

import { useEffect, useMemo, lazy, Suspense } from "react";

import { useDashboardApplications } from "@/context/dashboard-applications-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  FileText,
  Send,
  Eye,
  BarChart3,
  MessageSquare,
} from "lucide-react";

import { AnimatedNumber } from "@/components/ui/animated-number";

const LazyApplicationsChart = lazy(() => import("./ApplicationsChart"));

const getStatusColor = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("offer")) return "green";
  if (normalized.includes("interview")) return "blue";
  if (normalized.includes("reject")) return "red";
  return "amber";
};

export default function ApplicationsPage() {
  const { dashboardData, isLoading, error, loadDashboard } =
    useDashboardApplications();

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const applications = dashboardData?.applicationsList || [];

  const stats = useMemo(() => {
    const total = dashboardData?.applications.total || 0;
    const interviews = dashboardData?.applications.interviews || 0;
    const offers = dashboardData?.applications.offers || 0;
    const rejected = applications.filter((app) =>
      app.status.toLowerCase().includes("reject"),
    ).length;

    return {
      total,
      active: Math.max(total - offers - rejected, 0),
      interviews,
      offers,
      rejected,
    };
  }, [applications, dashboardData]);

  const chartData = useMemo(() => {
    const monthBuckets = Array.from(
      {
        length: 6,
      },

      (_, index) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - index));

        const key = `$ {
            date.getFullYear()
          }

          -$ {
            date.getMonth()
          }

          `;

        return {
          key,
          month: date.toLocaleString("en-US", {
            month: "short",
          }),
          applications: 0,
          interviews: 0,
          offers: 0,
        };
      },
    );

    const monthMap = new Map(
      monthBuckets.map((bucket) => [bucket.key, bucket]),
    );

    for (const item of applications) {
      const date = new Date(item.date);
      if (Number.isNaN(date.getTime())) continue;

      const key = `$ {
          date.getFullYear()
        }

        -$ {
          date.getMonth()
        }

        `;
      const bucket = monthMap.get(key);
      if (!bucket) continue;

      bucket.applications += 1;

      const status = item.status.toLowerCase();
      if (status.includes("interview")) bucket.interviews += 1;
      if (status.includes("offer")) bucket.offers += 1;
    }

    return monthBuckets;
  }, [applications]);

  const successMetrics = useMemo(() => {
    const total = Math.max(stats.total, 1);
    const responseRate = Math.round(
      ((dashboardData?.applications.submitted || 0) / total) * 100,
    );
    const interviewRate = Math.round((stats.interviews / total) * 100);
    const offerRate = Math.round((stats.offers / total) * 100);

    return [
      {
        label: "Response Rate",
        value: responseRate,
        color: "bg-cyan-500",
      },
      {
        label: "Interview Rate",
        value: interviewRate,
        color: "bg-emerald-500",
      },
      {
        label: "Offer Rate",
        value: offerRate,
        color: "bg-violet-500",
      },
    ];
  }, [dashboardData, stats]);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 dark:bg-grid-white/[0.02] bg-grid-black/[0.03]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[13px] font-medium tracking-wide text-cyan-400">
              Track Progress
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
            <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Applications
            </span>
          </h1>
          <p className="text-muted-foreground">
            Track and manage all your job applications in one place
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-6 w-10 bg-muted rounded" />
                      <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-xl border border-border p-4 animate-pulse"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-48 bg-muted rounded" />
                        <div className="h-3 w-32 bg-muted rounded" />
                      </div>
                      <div className="h-6 w-20 bg-muted rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-4 animate-pulse">
                  <div className="h-4 w-32 bg-muted rounded mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between">
                          <div className="h-3 w-24 bg-muted rounded" />
                          <div className="h-3 w-8 bg-muted rounded" />
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[
                {
                  label: "Total",
                  value: stats.total,
                  icon: Send,
                  color: "text-cyan-400",
                  bgColor: "bg-cyan-500/10",
                  borderColor: "border-cyan-500/20",
                },
                {
                  label: "Active",
                  value: stats.active,
                  icon: Clock,
                  color: "text-amber-400",
                  bgColor: "bg-amber-500/10",
                  borderColor: "border-amber-500/20",
                },
                {
                  label: "Interviews",
                  value: stats.interviews,
                  icon: Calendar,
                  color: "text-violet-400",
                  bgColor: "bg-violet-500/10",
                  borderColor: "border-violet-500/20",
                },
                {
                  label: "Offers",
                  value: stats.offers,
                  icon: CheckCircle,
                  color: "text-emerald-400",
                  bgColor: "bg-emerald-500/10",
                  borderColor: "border-emerald-500/20",
                },
                {
                  label: "Rejected",
                  value: stats.rejected,
                  icon: XCircle,
                  color: "text-red-400",
                  bgColor: "bg-red-500/10",
                  borderColor: "border-red-500/20",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`flex items-center gap-3 p-4 rounded-xl bg-card border ${stat.borderColor}`}
                >
                  <div
                    className={`p-2.5 rounded-full ${stat.bgColor} shrink-0`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      <AnimatedNumber value={stat.value} />
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Applications List */}
              <div className="lg:col-span-2 min-w-0 space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Your Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted border border-border">
                        <TabsTrigger
                          value="all"
                          className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                        >
                          All
                        </TabsTrigger>
                        <TabsTrigger
                          value="active"
                          className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                        >
                          Active
                        </TabsTrigger>
                        <TabsTrigger
                          value="interviews"
                          className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                        >
                          Interviews
                        </TabsTrigger>
                        <TabsTrigger
                          value="offers"
                          className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground text-muted-foreground"
                        >
                          Offers
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="space-y-4">
                        {!isLoading && applications.length === 0 ? (
                          <div className="text-sm text-muted-foreground">
                            No applications available.
                          </div>
                        ) : null}
                        {applications.map((app) => (
                          <div
                            key={app.id}
                            className="border border-border rounded-xl p-4 bg-muted/50"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1">
                                  {app.job}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                  <Calendar className="w-4 h-4" /> Applied{" "}
                                  {new Date(app.date).toLocaleDateString()}
                                  <span className="mx-2">•</span> Updated{" "}
                                  {new Date(app.date).toLocaleDateString()}
                                </div>
                              </div>
                              <Badge
                                className={
                                  getStatusColor(app.status) === "green"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : getStatusColor(app.status) === "blue"
                                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                                      : getStatusColor(app.status) === "amber"
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        : "bg-red-500/10 text-red-400 border-red-500/20"
                                }
                              >
                                {app.status}
                              </Badge>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-3 mb-3">
                              <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium text-foreground">
                                  Current Stage:
                                </span>
                                <span className="text-muted-foreground">
                                  {app.stage}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm mt-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium text-foreground">
                                  Next Step:
                                </span>
                                <span className="text-muted-foreground">
                                  {app.stage}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              >
                                <FileText className="w-4 h-4 mr-2" /> View
                                Details
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />{" "}
                                Contact
                              </Button>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Chart & Stats Sidebar */}
              <div className="min-w-0 space-y-6">
                <Suspense
                  fallback={
                    <Card className="h-80 animate-pulse bg-card border-border" />
                  }
                >
                  <LazyApplicationsChart
                    chartData={chartData}
                    successMetrics={successMetrics}
                  />
                </Suspense>

                {/* Quick Actions */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View All Applications
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <Calendar className="w-4 h-4 mr-2" /> Schedule Interview
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <FileText className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
