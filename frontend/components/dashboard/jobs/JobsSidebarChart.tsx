"use client";

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { chartConfig } from "@/components/dashboard/jobs/constants";

type JobsTrendPoint = {
  month: string;
  matched: number;
  applied: number;
  interviews: number;
};

interface JobsSidebarChartProps {
  chartData: JobsTrendPoint[];
}

export default function JobsSidebarChart({ chartData }: JobsSidebarChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 text-foreground">
          <TrendingUp className="h-4 w-4 text-cyan-400" />
          6-Month Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="matched"
              stroke="var(--color-matched)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="applied"
              stroke="var(--color-applied)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="interviews"
              stroke="var(--color-interviews)"
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
