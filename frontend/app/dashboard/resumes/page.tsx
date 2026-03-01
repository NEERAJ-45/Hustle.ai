"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  Download,
  Edit,
  Trash2,
  Sparkles,
  Eye,
  Copy,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/animated-number";
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

const resumes = [
  {
    id: 1,
    name: "Frontend Engineer Resume",
    lastUpdated: "2 hours ago",
    score: 95,
    keywords: 28,
    applications: 12,
    successRate: 42,
    isPrimary: true,
  },
  {
    id: 2,
    name: "Full Stack Developer Resume",
    lastUpdated: "1 day ago",
    score: 87,
    keywords: 24,
    applications: 8,
    successRate: 38,
    isPrimary: false,
  },
  {
    id: 3,
    name: "React Native Resume",
    lastUpdated: "3 days ago",
    score: 92,
    keywords: 26,
    applications: 3,
    successRate: 67,
    isPrimary: false,
  },
];

const scoreData = [
  { category: "Keywords", score: 95 },
  { category: "Formatting", score: 92 },
  { category: "Relevance", score: 88 },
  { category: "Length", score: 85 },
  { category: "Impact", score: 90 },
];

export default function ResumesPage() {
  const [selectedResume, setSelectedResume] = useState(resumes[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold mb-2">Resume Manager</h1>
            <p className="text-white/80">
              Create, optimize, and track your resumes with AI assistance
            </p>
            <Button className="bg-white text-[#334e68] hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Resumes", value: 3, icon: FileText },
            { label: "Avg Score", value: 91, suffix: "%", icon: BarChart3 },
            { label: "Applications", value: 23, icon: CheckCircle },
            { label: "Success Rate", value: 42, suffix: "%", icon: Sparkles },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <stat.icon className="w-5 h-5 text-[#2563eb]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        <AnimatedNumber
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Resume List */}
          <div className="lg:col-span-2 space-y-4">
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedResume(resume)}
                className={`cursor-pointer ${selectedResume.id === resume.id ? "ring-2 ring-[#2563eb]" : ""}`}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#334e68] to-[#2563eb] flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {resume.name}
                            </h3>
                            {resume.isPrimary && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Updated {resume.lastUpdated}
                          </p>

                          {/* Metrics */}
                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">
                                Score
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                <AnimatedNumber
                                  value={resume.score}
                                  suffix="%"
                                />
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">
                                Keywords
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                <AnimatedNumber value={resume.keywords} />
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Used</p>
                              <p className="text-lg font-bold text-gray-900">
                                <AnimatedNumber value={resume.applications} />x
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">
                                Success
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                <AnimatedNumber
                                  value={resume.successRate}
                                  suffix="%"
                                />
                              </p>
                            </div>
                          </div>

                          {/* Score Bar */}
                          <div className="mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className={
                                  resume.score >= 90
                                    ? "bg-green-500"
                                    : resume.score >= 80
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }
                                initial={{ width: 0 }}
                                animate={{ width: `${resume.score}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.3 + index * 0.1,
                                }}
                                style={{ height: "100%" }}
                              />
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* AI Analysis Sidebar */}
          <div className="space-y-6">
            {/* AI Score Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
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
                        <Bar
                          dataKey="score"
                          fill="var(--color-score)"
                          radius={4}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-linear-to-br from-[#334e68] to-[#2563eb] text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Add 3 more technical keywords for React roles",
                    "Quantify your achievements with metrics",
                    "Optimize bullet points for ATS scanning",
                  ].map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3 bg-white/10 rounded-lg p-3"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-sm">{suggestion}</p>
                    </motion.div>
                  ))}
                  <Button className="w-full bg-white text-[#334e68] hover:bg-white/90 mt-4">
                    Apply All
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Resume Templates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "Modern Tech",
                    "Executive",
                    "Creative",
                    "ATS-Optimized",
                  ].map((template) => (
                    <Button
                      key={template}
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {template}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
