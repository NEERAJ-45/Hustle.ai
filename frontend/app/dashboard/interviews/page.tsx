"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin, CheckCircle, AlertCircle, Plus, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedNumber } from "@/components/ui/animated-number"

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
]

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
]

export default function InterviewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="text-4xl font-bold mb-2">Interviews</h1>
            <p className="text-white/80">Manage and track all your interviews in one place</p>
            <Button className="bg-white text-[#334e68] hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Interview
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
            { label: "Upcoming", value: 3, icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-100" },
            { label: "This Week", value: 2, icon: Clock, color: "text-purple-600", bgColor: "bg-purple-100" },
            { label: "Completed", value: 8, icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
            {
              label: "Success Rate",
              value: 75,
              suffix: "%",
              icon: AlertCircle,
              color: "text-amber-600",
              bgColor: "bg-amber-100",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Interviews */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingInterviews.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="border-l-4 border-[#2563eb] bg-blue-50 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{interview.job}</h3>
                          <p className="text-sm text-gray-600 mb-3">{interview.company}</p>

                          <div className="grid md:grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-[#2563eb]" />
                              <span className="text-gray-700">{interview.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-[#2563eb]" />
                              <span className="text-gray-700">
                                {interview.time} ({interview.duration})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              {interview.format === "Video Call" ? (
                                <>
                                  <Video className="w-4 h-4 text-[#2563eb]" />
                                  <span className="text-gray-700">{interview.format}</span>
                                </>
                              ) : (
                                <>
                                  <MapPin className="w-4 h-4 text-[#2563eb]" />
                                  <span className="text-gray-700">On-site</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  interview.status === "confirmed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-amber-100 text-amber-700"
                                }
                              >
                                {interview.status}
                              </Badge>
                              <Badge variant="secondary">{interview.type}</Badge>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-3 mb-3">
                            <p className="text-sm text-gray-600 mb-1">Interviewer</p>
                            <p className="text-sm font-medium text-gray-900">{interview.interviewer}</p>
                          </div>

                          <div className="flex gap-2">
                            {interview.link && (
                              <Button size="sm" className="bg-gradient-to-r from-[#334e68] to-[#2563eb]">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Join Meeting
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Past Interviews */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Past Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastInterviews.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{interview.job}</h3>
                          <p className="text-sm text-gray-600">{interview.company}</p>
                        </div>
                        <Badge
                          className={
                            interview.outcome.includes("next round")
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {interview.outcome}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{interview.date}</p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 italic">"{interview.feedback}"</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Prep Resources Sidebar */}
          <div className="space-y-6">
            {/* Interview Prep */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-br from-[#334e68] to-[#2563eb] text-white border-0">
                <CardHeader>
                  <CardTitle>Interview Prep</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Review company research notes",
                    "Practice common technical questions",
                    "Prepare STAR method examples",
                    "Test your camera and microphone",
                  ].map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 bg-white/10 rounded-lg p-3"
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{tip}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Common Questions
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Company Research
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Technical Prep
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Follow-up Templates
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
