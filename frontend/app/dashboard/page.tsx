"use client"

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import JobMatchesList from "@/components/dashboard/JobMatchesList";
import ApplicationsList from "@/components/dashboard/ApplicationsList";

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("matches")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
            <p className="text-white/80">Your job search is performing great. Keep up the momentum!</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Job Matches", value: 47, icon: Target, color: "text-[#2563eb]", bgColor: "bg-blue-100" },
            {
              label: "Applications Sent",
              value: 23,
              icon: Send,
              color: "text-green-600",
              bgColor: "bg-green-100",
            },
            {
              return (
                <div className="min-h-screen bg-gray-50">
                  <DashboardHeader />
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <DashboardStats />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Job Matches</h2>
                        <JobMatchesList />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Applications</h2>
                        <ApplicationsList />
                      </div>
                    </div>
                  </div>
                </div>
              );
                      </TabsTrigger>
                      <TabsTrigger value="applications">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Applications
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="matches" className="space-y-4 mt-6">
                      {jobMatches.map((job, index) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ x: 4 }}
                          className="border border-gray-200 rounded-lg p-4 hover:border-[#2563eb] transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                              <p className="text-sm text-gray-600">
                                {job.company} • {job.location}
                              </p>
                            </div>
                            <Badge
                              className={
                                job.match >= 95
                                  ? "bg-green-100 text-green-700"
                                  : job.match >= 90
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-amber-100 text-amber-700"
                              }
                            >
                              <AnimatedNumber value={job.match} suffix="%" /> match
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{job.salary}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">{job.posted}</span>
                              {job.status === "new" && <Badge variant="secondary">New</Badge>}
                              {job.status === "applied" && <Badge className="bg-blue-100 text-blue-700">Applied</Badge>}
                              {job.status === "viewed" && <Badge variant="outline">Viewed</Badge>}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="flex-1 bg-gradient-to-r from-[#334e68] to-[#2563eb]">
                              <Send className="w-4 h-4 mr-2" />
                              Quick Apply
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </TabsContent>

                    <TabsContent value="applications" className="space-y-4 mt-6">
                      {applications.map((app, index) => (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{app.job}</h3>
                              <p className="text-sm text-gray-600">{app.stage}</p>
                            </div>
                            <Badge
                              className={
                                app.status === "Offer Received"
                                  ? "bg-green-100 text-green-700"
                                  : app.status === "Interview Scheduled"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                              }
                            >
                              {app.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Applied on {app.date}</span>
                            <Button size="sm" variant="ghost">
                              View Details
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - AI Assistant & Activity */}
          <div className="space-y-6">
            {/* AI Resume Assistant */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-gradient-to-br from-[#334e68] to-[#2563eb] text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Resume Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-white/80">Your resume is being optimized for Senior Frontend roles</p>
                  {[
                    { label: "Relevance", value: 95, color: "bg-green-500" },
                    { label: "Keywords", value: 87, color: "bg-blue-500" },
                    { label: "Formatting", value: 92, color: "bg-purple-500" },
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{metric.label}</span>
                        <span className="font-semibold">
                          <AnimatedNumber value={metric.value} suffix="%" />
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={metric.color}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          style={{ height: "100%" }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-white text-[#334e68] hover:bg-white/90">View Full Report</Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      action: "Applied to Senior Frontend Engineer",
                      time: "2 hours ago",
                      icon: CheckCircle,
                      color: "text-green-600",
                    },
                    {
                      action: "Interview scheduled at TechCorp",
                      time: "5 hours ago",
                      icon: Calendar,
                      color: "text-blue-600",
                    },
                    {
                      action: "Resume updated for React roles",
                      time: "1 day ago",
                      icon: FileText,
                      color: "text-purple-600",
                    },
                    {
                      action: "New job match found",
                      time: "2 days ago",
                      icon: AlertCircle,
                      color: "text-amber-600",
                    },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Applications Sent", value: 12, color: "bg-blue-500" },
                    { label: "Profile Views", value: 34, color: "bg-green-500" },
                    { label: "Interview Requests", value: 3, color: "bg-purple-500" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                        <span className="text-sm font-semibold text-gray-900">
                          <AnimatedNumber value={stat.value} />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
