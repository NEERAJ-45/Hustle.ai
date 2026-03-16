"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  lazy,
  Suspense,
} from "react";
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
import { fetchResumes, type ResumeListItem } from "@/lib/api-client";

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
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const loadingRef = useRef(false);

  const loadResumes = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchResumes();
      setResumes(data);
      setSelectedResumeId(data[0]?._id || null);
    } catch (err) {
      loadingRef.current = false;
      setError(err instanceof Error ? err.message : "Failed to load resumes");
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        {/* Removed gradient and grid backgrounds */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[13px] font-medium tracking-wide text-cyan-400">
                AI-Optimized
              </span>
            </div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
              <span className="bg-clip-text text-transparent">
                Resume Manager
              </span>
            </h1>
            <p className="text-muted-foreground">
              Create, optimize, and track your resumes with AI assistance
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">
              <Plus className="w-4 h-4 mr-2" />
              Create New Resume
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 rounded-lg bg-muted shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-6 w-10 bg-muted rounded" />
                      <div className="h-3 w-20 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 min-w-0 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-xl border border-border p-6 animate-pulse"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 w-48 bg-muted rounded" />
                        <div className="h-3 w-32 bg-muted rounded" />
                        <div className="flex gap-2">
                          <div className="h-5 w-16 bg-muted rounded-full" />
                          <div className="h-5 w-16 bg-muted rounded-full" />
                        </div>
                      </div>
                      <div className="h-6 w-16 bg-muted rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-4 animate-pulse">
                  <div className="h-4 w-32 bg-muted rounded mb-4" />
                  <div className="h-48 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Resumes",
                  value: resumes.length,
                  icon: FileText,
                  color: "text-cyan-400",
                  bgColor: "bg-cyan-500/10",
                  borderColor: "border-cyan-500/20",
                },
                {
                  label: "Avg Score",
                  value: avgKeywordScore,
                  suffix: "%",
                  icon: BarChart3,
                  color: "text-violet-400",
                  bgColor: "bg-violet-500/10",
                  borderColor: "border-violet-500/20",
                },
                {
                  label: "Applications",
                  value: totalApplications,
                  icon: CheckCircle,
                  color: "text-emerald-400",
                  bgColor: "bg-emerald-500/10",
                  borderColor: "border-emerald-500/20",
                },
                {
                  label: "Success Rate",
                  value: avgSuccessRate,
                  suffix: "%",
                  icon: Sparkles,
                  color: "text-amber-400",
                  bgColor: "bg-amber-500/10",
                  borderColor: "border-amber-500/20",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`flex items-center gap-3 p-4 rounded-xl bg-card border ${stat.borderColor}`}
                >
                  <div
                    className={`p-2.5 rounded-full ${stat.bgColor} shrink-0`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Resume List */}
              <div className="lg:col-span-2 space-y-4">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    onClick={() => setSelectedResumeId(resume._id)}
                    className={`cursor-pointer ${selectedResume?._id === resume._id ? "ring-2 ring-cyan-500" : ""}`}
                  >
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                              <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground">
                                  {resume.title}
                                </h3>
                                {resume.isDefault && (
                                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                                    Primary
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                Updated{" "}
                                {formatRelativeTime(
                                  resume.updatedAt || resume.createdAt,
                                )}
                              </p>

                              {/* Metrics */}
                              <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Score
                                  </p>
                                  <p className="text-lg font-bold text-foreground">
                                    <AnimatedNumber
                                      value={
                                        (resume.extractedData?.keywords
                                          ?.length || 0) * 4
                                      }
                                      suffix="%"
                                    />
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Keywords
                                  </p>
                                  <p className="text-lg font-bold text-foreground">
                                    <AnimatedNumber
                                      value={
                                        resume.extractedData?.keywords
                                          ?.length || 0
                                      }
                                    />
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Used
                                  </p>
                                  <p className="text-lg font-bold text-foreground">
                                    <AnimatedNumber
                                      value={resume.stats?.timesUsed || 0}
                                    />
                                    x
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Success
                                  </p>
                                  <p className="text-lg font-bold text-foreground">
                                    <AnimatedNumber
                                      value={resume.stats?.successRate || 0}
                                      suffix="%"
                                    />
                                  </p>
                                </div>
                              </div>

                              {/* Score Bar */}
                              <div className="mb-4">
                                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                  <div
                                    className={
                                      (resume.extractedData?.keywords?.length ||
                                        0) *
                                        4 >=
                                      90
                                        ? "bg-emerald-500"
                                        : (resume.extractedData?.keywords
                                              ?.length || 0) *
                                              4 >=
                                            80
                                          ? "bg-cyan-500"
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
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Preview
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="hover:bg-accent"
                                >
                                  <Trash2 className="w-4 h-4 text-red-400" />
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
              <div className="min-w-0 space-y-6">
                <Suspense
                  fallback={
                    <Card className="h-80 animate-pulse bg-card border-border" />
                  }
                >
                  <LazyResumesChart scoreData={scoreData} />
                </Suspense>

                {/* AI Suggestions */}
                <Card className="bg-linear-to-br from-cyan-500/20 via-blue-500/20 to-violet-500/20 border-border backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
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
                        className="flex items-start gap-3 bg-muted/50 rounded-lg p-3"
                      >
                        <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-cyan-400" />
                        <p className="text-sm text-foreground">{suggestion}</p>
                      </div>
                    ))}
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white border-0 mt-4">
                      Apply All
                    </Button>
                  </CardContent>
                </Card>

                {/* Resume Templates */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Templates</CardTitle>
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
                        className="w-full justify-start bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {template}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
