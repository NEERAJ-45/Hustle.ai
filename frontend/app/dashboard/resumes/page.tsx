"use client";

import { useEffect, useMemo, lazy, Suspense } from "react";
import { useShallow } from "zustand/react/shallow";
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
import { AnimatedNumber } from "@/components/ui/animated-number";
import { useDashboardResumesStore } from "@/store/dashboard-resumes-store";

const LazyResumesChart = lazy(() => import("./ResumesChart"));

const formatRelativeTime = (value?: string) => {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) return `${Math.max(1, minutes)} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

export default function ResumesPage() {
  const {
    resumes,
    isLoading,
    error,
    selectedResumeId,
    setSelectedResumeId,
    loadResumes,
  } = useDashboardResumesStore(
    useShallow((state) => ({
      resumes: state.resumes,
      isLoading: state.isLoading,
      error: state.error,
      selectedResumeId: state.selectedResumeId,
      setSelectedResumeId: state.setSelectedResumeId,
      loadResumes: state.loadResumes,
    })),
  );

  useEffect(() => {
    void loadResumes();
  }, [loadResumes]);

  const selectedResume = useMemo(
    () =>
      resumes.find((resume) => resume._id === selectedResumeId) || resumes[0],
    [resumes, selectedResumeId],
  );

  const totalApplications = useMemo(
    () =>
      resumes.reduce((sum, resume) => sum + (resume?.stats?.timesUsed || 0), 0),
    [resumes],
  );

  const avgSuccessRate = useMemo(() => {
    if (!resumes.length) return 0;
    const total = resumes.reduce(
      (sum, resume) => sum + (resume?.stats?.successRate || 0),
      0,
    );
    return Math.round(total / resumes.length);
  }, [resumes]);

  const avgKeywordScore = useMemo(() => {
    if (!resumes.length) return 0;
    const total = resumes.reduce(
      (sum, resume) => sum + (resume?.extractedData?.keywords?.length || 0),
      0,
    );
    return Math.round((total / resumes.length) * 4);
  }, [resumes]);

  const scoreData = useMemo(
    () => [
      { category: "Keywords", score: Math.min(100, avgKeywordScore) },
      { category: "Success", score: Math.min(100, avgSuccessRate) },
      {
        category: "Usage",
        score: Math.min(
          100,
          Math.round((totalApplications / Math.max(resumes.length, 1)) * 10),
        ),
      },
      { category: "Coverage", score: resumes.length > 0 ? 100 : 0 },
      {
        category: "Primary",
        score: resumes.some((resume) => resume.isDefault) ? 100 : 0,
      },
    ],
    [avgKeywordScore, avgSuccessRate, resumes, totalApplications],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold mb-2">Resume Manager</h1>
            <p className="text-white/80">
              Create, optimize, and track your resumes with AI assistance
            </p>
            <Button className="bg-white text-[#334e68] hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Resumes", value: resumes.length, icon: FileText },
            {
              label: "Avg Score",
              value: avgKeywordScore,
              suffix: "%",
              icon: BarChart3,
            },
            {
              label: "Applications",
              value: totalApplications,
              icon: CheckCircle,
            },
            {
              label: "Success Rate",
              value: avgSuccessRate,
              suffix: "%",
              icon: Sparkles,
            },
          ].map((stat) => (
            <div key={stat.label}>
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
            </div>
          ))}
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mb-6 rounded-lg border p-4 text-sm text-muted-foreground">
            Loading resumes...
          </div>
        ) : null}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Resume List */}
          <div className="lg:col-span-2 space-y-4">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                onClick={() => setSelectedResumeId(resume._id)}
                className={`cursor-pointer hover:-translate-y-1 transition-transform ${selectedResume?._id === resume._id ? "ring-2 ring-[#2563eb]" : ""}`}
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
                              {resume.title}
                            </h3>
                            {resume.isDefault && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Updated{" "}
                            {formatRelativeTime(
                              resume.updatedAt || resume.createdAt,
                            )}
                          </p>

                          {/* Metrics */}
                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">
                                Score
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                <AnimatedNumber
                                  value={
                                    (resume.extractedData?.keywords?.length ||
                                      0) * 4
                                  }
                                  suffix="%"
                                />
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">
                                Keywords
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                <AnimatedNumber
                                  value={
                                    resume.extractedData?.keywords?.length || 0
                                  }
                                />
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Used</p>
                              <p className="text-lg font-bold text-gray-900">
                                <AnimatedNumber
                                  value={resume.stats?.timesUsed || 0}
                                />
                                x
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">
                                Success
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                <AnimatedNumber
                                  value={resume.stats?.successRate || 0}
                                  suffix="%"
                                />
                              </p>
                            </div>
                          </div>

                          {/* Score Bar */}
                          <div className="mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className={
                                  (resume.extractedData?.keywords?.length ||
                                    0) *
                                    4 >=
                                  90
                                    ? "bg-green-500"
                                    : (resume.extractedData?.keywords?.length ||
                                          0) *
                                          4 >=
                                        80
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }
                                style={{
                                  height: "100%",
                                  width: `${Math.min(100, (resume.extractedData?.keywords?.length || 0) * 4)}%`,
                                  transition: "width 1s ease",
                                }}
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
              </div>
            ))}
          </div>

          {/* AI Analysis Sidebar */}
          <div className="space-y-6">
            {/* AI Score Breakdown - lazy loaded */}
            <Suspense
              fallback={<Card className="h-80 animate-pulse bg-gray-100" />}
            >
              <LazyResumesChart scoreData={scoreData} />
            </Suspense>

            {/* AI Suggestions */}
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
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white/10 rounded-lg p-3"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
                <Button className="w-full bg-white text-[#334e68] hover:bg-white/90 mt-4">
                  Apply All
                </Button>
              </CardContent>
            </Card>

            {/* Resume Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Modern Tech", "Executive", "Creative", "ATS-Optimized"].map(
                  (template) => (
                    <Button
                      key={template}
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {template}
                    </Button>
                  ),
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
