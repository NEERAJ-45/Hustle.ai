"use client";

import { Briefcase, Bookmark, Send, Sparkles, Target } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Card, CardContent } from "@/components/ui/card";
import type { JobsStats } from "@/components/dashboard/jobs/types";

interface JobsStatsCardsProps {
  stats: JobsStats;
}

export function JobsStatsCards({ stats }: JobsStatsCardsProps) {
  const statsItems = [
    {
      label: "Total Jobs",
      value: stats.total,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "New Today",
      value: stats.newToday,
      icon: Sparkles,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      label: "Matched",
      value: stats.matched,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Saved",
      value: stats.saved,
      icon: Bookmark,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Applied",
      value: stats.applied,
      icon: Send,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {statsItems.map((stat) => (
        <div key={stat.label}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <AnimatedNumber
                    value={stat.value}
                    className="text-2xl font-bold text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
