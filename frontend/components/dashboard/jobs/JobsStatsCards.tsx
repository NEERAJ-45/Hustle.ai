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
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "New Today",
      value: stats.newToday,
      icon: Sparkles,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Matched",
      value: stats.matched,
      icon: Target,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Saved",
      value: stats.saved,
      icon: Bookmark,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Applied",
      value: stats.applied,
      icon: Send,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsItems.slice(0, 4).map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
        >
          <div className={`p-2.5 rounded-full ${stat.bgColor} shrink-0`}>
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
  );
}
