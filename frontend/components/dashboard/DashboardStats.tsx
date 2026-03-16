"use client";

import React from "react";
import { Target, Briefcase, FileText, TrendingUp } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

const stats = [
  {
    label: "Job Matches",
    value: 47,
    icon: Target,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    label: "Applications Sent",
    value: 23,
    icon: Briefcase,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    label: "Interviews",
    value: 5,
    icon: FileText,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    label: "Offers",
    value: 2,
    icon: TrendingUp,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex items-center gap-4 p-6 rounded-xl bg-card border ${stat.borderColor}`}
        >
          <div className={`p-3 rounded-full ${stat.bgColor}`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              <AnimatedNumber value={stat.value} />
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
