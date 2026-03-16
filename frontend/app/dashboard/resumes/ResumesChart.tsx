"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
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
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          AI Score Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <ChartContainer
          config={{
            score: {
              label: "Score",
              color: "hsl(217, 91%, 60%)",
            },
          }}
          className="h-[250px] w-full"
        >
          <BarChart data={scoreData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="category" width={80} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="score" fill="var(--color-score)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
