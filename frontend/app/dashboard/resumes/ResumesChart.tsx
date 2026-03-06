"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface ScoreDataItem {
  category: string;
  score: number;
}

interface ResumesChartProps {
  scoreData: ScoreDataItem[];
}

export default function ResumesChart({ scoreData }: ResumesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Score Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            score: {
              label: "Score",
              color: "hsl(217, 91%, 60%)",
            },
          }}
          className="h-62.5"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="category" width={80} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="score" fill="var(--color-score)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
