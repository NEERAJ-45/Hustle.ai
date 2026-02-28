"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import JobMatchesList from "@/components/dashboard/JobMatchesList";
import ApplicationsList from "@/components/dashboard/ApplicationsList";

import { motion } from "framer-motion";
import {
  Target,
  Send,
  Briefcase,
  Sparkles,
  Clock,
  CheckCircle,
  Calendar,
  FileText,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("matches");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-[#334e68] to-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
            <p className="text-white/80">
              Your job search is performing great. Keep up the momentum!
            </p>
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
            {
              label: "Job Matches",
              value: 47,
              icon: Target,
              color: "text-[#2563eb]",
              bgColor: "bg-blue-100",
            },
            {
              label: "Applications Sent",
              value: 23,
              icon: Send,
              color: "text-green-600",
              bgColor: "bg-green-100",
            },
            // ...add more stat objects as needed
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 p-4 rounded-lg shadow-sm ${stat.bgColor}`}
            >
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid: Left = Tabs, Right = AI Assistant & Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Tabs */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="matches">Job Matches</TabsTrigger>
                <TabsTrigger value="applications">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Applications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="matches" className="space-y-4 mt-6">
                <JobMatchesList />
              </TabsContent>
              <TabsContent value="applications" className="space-y-4 mt-6">
                <ApplicationsList />
              </TabsContent>
            </Tabs>
          </div>
          {/* Right Column: AI Assistant & Stats */}
          <div className="space-y-6">
            {/* AI Resume Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-linear-to-br from-[#334e68] to-[#2563eb] text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Resume Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-white/80">
                    Your resume is being optimized for Senior Frontend roles
                  </p>
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
                  <Button className="w-full bg-white text-[#334e68] hover:bg-white/90">
                    View Full Report
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
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
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <activity.icon
                          className={`w-4 h-4 ${activity.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      label: "Applications Sent",
                      value: 12,
                      color: "bg-blue-500",
                    },
                    {
                      label: "Profile Views",
                      value: 34,
                      color: "bg-green-500",
                    },
                    {
                      label: "Interview Requests",
                      value: 3,
                      color: "bg-purple-500",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">
                        {stat.label}
                      </span>
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
  );
}
