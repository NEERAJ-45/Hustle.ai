"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkles, ArrowRight, Zap, CheckCircle, Target, Users, BarChart3, Clock, Rocket, Star, TrendingUp, ChevronRight, Cpu, Zap as Lightning, Globe, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const floatingIcons = [
    { Icon: Cpu, size: "w-8 h-8", color: "text-blue-400/30", x: 10, y: 20 },
    { Icon: Globe, size: "w-10 h-10", color: "text-purple-400/20", x: 85, y: 40 },
    { Icon: Shield, size: "w-12 h-12", color: "text-emerald-400/15", x: 20, y: 80 },
    { Icon: Lightning, size: "w-9 h-9", color: "text-amber-400/25", x: 90, y: 70 },
  ]

  return (
    <section ref={ref} className="pt-28 pb-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-purple-50/10" />
      
      {/* Interactive gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,#334e6810_1px,transparent_1px),linear-gradient(to_bottom,#334e6810_1px,transparent_1px)]"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
      </div>

      {/* Floating AI icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className={`absolute ${icon.size} ${icon.color}`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
            }}
          >
            <icon.Icon className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Enhanced */}
          <div className="space-y-10">
            {/* Main Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  AI-Powered Job Search Revolution
                </span>
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="block text-gray-900">Land Your</span>
                <span className="block relative">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Dream Job 10x Faster
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-3 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-sm"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl text-gray-700 leading-relaxed"
              >
                <span className="relative">
                  Hustle.ai automates your entire job search journey. From intelligent job matching to personalized resume
                  generation and one-click applications
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </span>
              </motion.p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {[
                { text: "AI-powered job matching", icon: Cpu },
                { text: "Personalized resume & cover letters", icon: Sparkles },
                { text: "One-click applications", icon: Zap },
                { text: "Interview tracking & analytics", icon: TrendingUp },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="font-medium text-gray-800">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <Rocket className="w-5 h-5 mr-3" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-2 border-gray-300/50 hover:border-blue-400/50 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-gray-900 shadow-sm hover:shadow-md transition-all"
                >
                  <Zap className="w-5 h-5 mr-3" />
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12"
            >
              {[
                { icon: Target, value: 94, suffix: "%", label: "Match Rate", gradient: "from-blue-500 to-cyan-500" },
                { icon: Users, value: 2500, suffix: "+", label: "Active Users", gradient: "from-purple-500 to-pink-500" },
                { icon: BarChart3, value: 47, label: "Jobs/Month", gradient: "from-emerald-500 to-teal-500" },
                { icon: Clock, value: 10, suffix: "x", label: "Faster", gradient: "from-amber-500 to-orange-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r via-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm group-hover:shadow-md transition-all">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10 mb-4`}>
                      <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {isVisible && <AnimatedNumber value={stat.value} suffix={stat.suffix} />}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Enhanced Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Floating card effect */}
            <div className="relative space-y-8">
              {/* Main Dashboard Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20" />
                <Card className="relative bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16" />
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">AI Recommended Jobs</h3>
                          <p className="text-sm text-gray-600">Personalized for you</p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-md">
                        <Star className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Senior Frontend Engineer", company: "TechCorp", match: 98, color: "from-emerald-400 to-teal-500" },
                      { title: "Full Stack Developer", company: "StartupXYZ", match: 95, color: "from-blue-400 to-cyan-500" },
                      { title: "React Native Developer", company: "MobileFirst", match: 92, color: "from-purple-400 to-pink-500" },
                      { title: "UX Engineer", company: "DesignStudio", match: 89, color: "from-amber-400 to-orange-500" },
                    ].map((job, index) => (
                      <motion.div
                        key={job.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        whileHover={{ x: 8, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                        className="group flex items-center justify-between p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 hover:border-blue-200/50 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-sm`}>
                            <span className="text-white font-bold text-sm">{job.match}%</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</p>
                            <p className="text-sm text-gray-600">@ {job.company}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Assistant Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl border-0 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32" />
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Cpu className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">AI Resume Assistant</h3>
                        <p className="text-sm text-gray-300">Real-time optimization</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { label: "Relevance", value: 95, color: "from-emerald-400 to-teal-500" },
                      { label: "Keywords", value: 87, color: "from-blue-400 to-cyan-500" },
                      { label: "Formatting", value: 92, color: "from-purple-400 to-pink-500" },
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{metric.label}</span>
                          <span className="font-bold text-lg">
                            {isVisible && <AnimatedNumber value={metric.value} suffix="%" />}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: `${metric.value}%` } : {}}
                            transition={{ duration: 1.5, delay: 1 + index * 0.1, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Success Rate Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-30" />
                <Card className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white rounded-2xl border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Target className="w-6 h-6" />
                          <span className="text-sm font-medium text-white/90">Success Rate</span>
                        </div>
                        <p className="text-5xl font-bold">
                          {isVisible && <AnimatedNumber value={94} suffix="%" />}
                        </p>
                        <p className="text-white/70">Average match rate across all users</p>
                      </div>
                      <motion.div
                        className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white flex items-center justify-center">
                          <Sparkles className="w-8 h-8" />
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}