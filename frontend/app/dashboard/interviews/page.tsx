"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus,
  ExternalLink,
} from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

const upcomingInterviews = [
  {
    id: 1,
    job: "Senior Frontend Engineer",
    company: "TechCorp",
    date: "Jan 20, 2024",
    time: "2:00 PM PST",
    type: "Technical Interview",
    format: "Video Call",
    link: "https://meet.google.com/xyz",
    duration: "1 hour",
    interviewer: "Sarah Chen, Engineering Manager",
    status: "confirmed",
  },
  {
    id: 2,
    job: "Full Stack Developer",
    company: "StartupXYZ",
    date: "Jan 22, 2024",
    time: "10:00 AM PST",
    type: "Culture Fit",
    format: "Video Call",
    link: "https://zoom.us/j/123",
    duration: "30 min",
    interviewer: "Mike Johnson, CTO",
    status: "confirmed",
  },
  {
    id: 3,
    job: "React Developer",
    company: "WebCo",
    date: "Jan 25, 2024",
    time: "3:00 PM PST",
    type: "Final Round",
    format: "On-site",
    location: "123 Main St, San Francisco",
    duration: "2 hours",
    interviewer: "Team Panel",
    status: "pending",
  },
];

const pastInterviews = [
  {
    id: 1,
    job: "Frontend Lead",
    company: "Enterprise Corp",
    date: "Jan 10, 2024",
    outcome: "Moved to next round",
    feedback: "Strong technical skills, great communication",
  },
  {
    id: 2,
    job: "UI Engineer",
    company: "DesignCo",
    date: "Jan 8, 2024",
    outcome: "Not selected",
    feedback: "Looking for more design system experience",
  },
];

export default function InterviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 dark:bg-grid-white/[0.02] bg-grid-black/[0.03]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[13px] font-medium tracking-wide text-cyan-400">
                Upcoming
              </span>
            </div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
              <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Interviews
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage and track all your interviews in one place
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Interview
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Upcoming",
              value: 3,
              icon: Calendar,
              color: "text-cyan-400",
              bgColor: "bg-cyan-500/10",
              borderColor: "border-cyan-500/20",
            },
            {
              label: "This Week",
              value: 2,
              icon: Clock,
              color: "text-violet-400",
              bgColor: "bg-violet-500/10",
              borderColor: "border-violet-500/20",
            },
            {
              label: "Completed",
              value: 8,
              icon: CheckCircle,
              color: "text-emerald-400",
              bgColor: "bg-emerald-500/10",
              borderColor: "border-emerald-500/20",
            },
            {
              label: "Success Rate",
              value: 75,
              suffix: "%",
              icon: AlertCircle,
              color: "text-amber-400",
              bgColor: "bg-amber-500/10",
              borderColor: "border-amber-500/20",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
            >
              <div className={`p-2.5 rounded-full ${stat.bgColor} shrink-0`}>
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
          {/* Upcoming Interviews */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Upcoming Interviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="border-l-4 border-cyan-500 bg-cyan-500/5 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {interview.job}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {interview.company}
                        </p>

                        <div className="grid md:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span className="text-foreground">
                              {interview.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span className="text-foreground">
                              {interview.time} ({interview.duration})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            {interview.format === "Video Call" ? (
                              <>
                                <Video className="w-4 h-4 text-cyan-400" />
                                <span className="text-foreground">
                                  {interview.format}
                                </span>
                              </>
                            ) : (
                              <>
                                <MapPin className="w-4 h-4 text-cyan-400" />
                                <span className="text-foreground">On-site</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                interview.status === "confirmed"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              }
                            >
                              {interview.status}
                            </Badge>
                            <Badge className="bg-muted/50 text-muted-foreground border-border">
                              {interview.type}
                            </Badge>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-muted-foreground mb-1">
                            Interviewer
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {interview.interviewer}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {interview.link && (
                            <Button
                              size="sm"
                              className="bg-cyan-500 hover:bg-cyan-600 text-white border-0"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Join Meeting
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          >
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Past Interviews */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Past Interviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pastInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {interview.job}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {interview.company}
                        </p>
                      </div>
                      <Badge
                        className={
                          interview.outcome.includes("next round")
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }
                      >
                        {interview.outcome}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {interview.date}
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground italic">
                        &ldquo;{interview.feedback}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Prep Resources Sidebar */}
          <div className="space-y-6">
            {/* Interview Prep */}
            <Card className="bg-linear-to-br from-cyan-500/20 via-blue-500/20 to-violet-500/20 border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Interview Prep
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Review company research notes",
                  "Practice common technical questions",
                  "Prepare STAR method examples",
                  "Test your camera and microphone",
                ].map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-muted/50 rounded-lg p-3"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-cyan-400" />
                    <p className="text-sm text-foreground">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Common Questions
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Company Research
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Technical Prep
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Follow-up Templates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
