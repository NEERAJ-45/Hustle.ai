"use client"
  import ApplicationsList from "@/components/dashboard/applications/ApplicationsList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  FileText,
  Send,
  Eye,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const applications = [
  {
    id: 1,
    job: "Senior Frontend Engineer",
    company: "TechCorp",
    status: "Interview Scheduled",
    stage: "Technical Interview",
    appliedDate: "2024-01-15",
    color: "green",
  },
  {
    id: 4,
    job: "Frontend Lead",
    company: "Enterprise Corp",
    status: "Rejected",
    stage: "Final Round",
    appliedDate: "2024-01-08",
    lastUpdate: "2 days ago",
    salary: "$160k - $210k",
    nextStep: "Position filled",
    color: "red",
  },
]

const chartData = [
  { month: "Jul", applications: 8, interviews: 2, offers: 0 },
  { month: "Aug", applications: 12, interviews: 3, offers: 1 },
  { month: "Sep", applications: 15, interviews: 5, offers: 1 },
  { month: "Oct", applications: 18, interviews: 6, offers: 2 },
  { month: "Nov", applications: 22, interviews: 8, offers: 3 },
  { month: "Dec", applications: 23, interviews: 8, offers: 3 },
]

export default function ApplicationsPage() {
  const stats = {
    total: 23,
    active: 15,
    interviews: 8,
    offers: 3,
    rejected: 5,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">Applications</h1>
            <p className="text-white/80">Track and manage all your job applications in one place</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          {[
            { label: "Total", value: stats.total, icon: Send, color: "text-blue-600", bgColor: "bg-blue-100" },
            { label: "Active", value: stats.active, icon: Clock, color: "text-amber-600", bgColor: "bg-amber-100" },
            {
              label: "Interviews",
              value: stats.interviews,
              icon: Calendar,
              color: "text-purple-600",
              bgColor: "bg-purple-100",
            },
            {
              label: "Offers",
              value: stats.offers,
              icon: CheckCircle,
              color: "text-green-600",
              bgColor: "bg-green-100",
            },
            { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-600", bgColor: "bg-red-100" },
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
                      <AnimatedNumber value={stat.value} />
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Your Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="interviews">Interviews</TabsTrigger>
                      <TabsTrigger value="offers">Offers</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                      {applications.map((app, index) => (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="border border-gray-200 rounded-lg p-4 hover:border-[#2563eb] transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{app.job}</h3>
                              <p className="text-sm text-gray-600 mb-2">{app.company}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                <Calendar className="w-4 h-4" />
                                Applied {app.appliedDate}
                                <span className="mx-2">•</span>
                                Updated {app.lastUpdate}
                              </div>
                            </div>
                            <Badge
                              className={
                                app.color === "green"
                                  ? "bg-green-100 text-green-700"
                                  : app.color === "blue"
                                    ? "bg-blue-100 text-blue-700"
                                    : app.color === "amber"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-red-100 text-red-700"
                              }
                            >
                              {app.status}
                            </Badge>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-gray-600" />
                              <span className="font-medium text-gray-700">Current Stage:</span>
                              <span className="text-gray-600">{app.stage}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm mt-2">
                              <Clock className="w-4 h-4 text-gray-600" />
                              <span className="font-medium text-gray-700">Next Step:</span>
                              <span className="text-gray-600">{app.nextStep}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <FileText className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Chart & Stats Sidebar */}
          <div className="space-y-6">
            {/* Progress Chart */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    6-Month Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
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
                        <Line type="monotone" dataKey="interviews" stroke="var(--color-interviews)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Success Metrics */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Success Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Response Rate", value: 65, color: "bg-blue-500" },
                    { label: "Interview Rate", value: 35, color: "bg-green-500" },
                    { label: "Offer Rate", value: 13, color: "bg-purple-500" },
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{metric.label}</span>
                        <span className="font-semibold text-gray-900">
                          <AnimatedNumber value={metric.value} suffix="%" />
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={metric.color}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          style={{ height: "100%" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Applications
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Report
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
