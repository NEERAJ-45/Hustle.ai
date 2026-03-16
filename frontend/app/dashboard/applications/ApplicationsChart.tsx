"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { BarChart3 } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartBucket {
  key: string;
  month: string;
  applications: number;
  interviews: number;
  offers: number;
}

interface SuccessMetric {
  label: string;
  value: number;
  color: string;
}

interface ApplicationsChartProps {
  chartData: ChartBucket[];
  successMetrics: SuccessMetric[];
}

export default function ApplicationsChart({
  chartData,
  successMetrics,
}: ApplicationsChartProps) {
  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            6-Month Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <ChartContainer
            config={{
              applications: {
                label: "Applications",
                color: "hsl(217, 91%, 60%)",
              },
              interviews: {
                label: "Interviews",
                color: "hsl(142, 71%, 45%)",
              },
            }}
            className="h-[250px] w-full"
          >
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="var(--color-applications)"
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

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Success Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {successMetrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{metric.label}</span>
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
        </CardContent>
      </Card>
    </>
  );
}
