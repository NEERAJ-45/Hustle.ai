"use client";

import { lazy, Suspense } from "react";
import { Bell, FileText, Search, TrendingUp } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LazyJobsSidebarChart = lazy(() => import("./JobsSidebarChart"));

type JobsTrendPoint = {
  month: string;
  matched: number;
  applied: number;
  interviews: number;
};

type JobsMetric = {
  label: string;
  value: number;
  color: string;
};

interface JobsSidebarProps {
  chartData: JobsTrendPoint[];
  matchMetrics: JobsMetric[];
}

export function JobsSidebar({
  chartData = [],
  matchMetrics = [],
}: JobsSidebarProps) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <Card className="h-[200px] animate-pulse bg-card border-border" />
        }
      >
        <LazyJobsSidebarChart chartData={chartData} />
      </Suspense>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-foreground">
            Match Metrics
          </CardTitle>
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
              <div className="h-2 rounded-full bg-muted overflow-hidden">
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

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-foreground">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Search className="h-4 w-4 mr-2" />
            Browse All Jobs
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="h-4 w-4 mr-2" />
            Set Alerts
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export Saved Jobs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
