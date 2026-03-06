"use client";

import { lazy, Suspense } from "react";
import { Bell, FileText, Search, TrendingUp } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { matchMetrics } from "@/components/dashboard/jobs/constants";

const LazyJobsSidebarChart = lazy(() => import("./JobsSidebarChart"));

export function JobsSidebar() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Card className="h-50 animate-pulse bg-gray-100" />}>
        <LazyJobsSidebarChart />
      </Suspense>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Match Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {matchMetrics.map((metric) => (
            <div key={metric.label} className="mb-4 last:mb-0">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{metric.label}</span>
                <span className="font-medium text-foreground">
                  <AnimatedNumber value={metric.value} />%
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full ${metric.color}`}
                  style={{
                    width: `${metric.value}%`,
                    transition: "width 1s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Search className="h-4 w-4 mr-2" />
            Browse All Jobs
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Set Alerts
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Export Saved Jobs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
