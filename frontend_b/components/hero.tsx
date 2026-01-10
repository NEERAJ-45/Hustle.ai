"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Zap, CheckCircle, Target, Users, BarChart3, Clock, Briefcase, Rocket, Award, LineChart } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useEffect, useState } from "react"

export function Hero() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Responsive Background */}
      <div className="absolute inset-0">
        {/* Mobile-optimized gradients */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-50/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-indigo-50/20 to-transparent" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,#334e6805_1px,transparent_1px),linear-gradient(to_bottom,#334e6805_1px,transparent_1px)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Content - Responsive Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-20 lg:pb-24">
          {/* Left Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-blue-700">
                  AI-Powered Job Search
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4 md:space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              >
                Find Your Dream Job{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block md:inline">
                  10x Faster
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              >
                Hustle.ai automates your job search with intelligent matching, 
                personalized applications, and career tracking—all in one platform.
              </motion.p>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
            >
              {[
                { icon: CheckCircle, text: "AI Job Matching", color: "text-blue-600" },
                { icon: CheckCircle, text: "One-Click Apply", color: "text-indigo-600" },
                { icon: CheckCircle, text: "Resume Optimization", color: "text-purple-600" },
                { icon: CheckCircle, text: "Interview Tracking", color: "text-blue-600" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <feature.icon className={`w-5 h-5 ${feature.color} flex-shrink-0`} />
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons - Responsive Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50"
              >
                <Zap className="w-5 h-5 mr-2" />
                How It Works
              </Button>
            </motion.div>

            {/* Stats - Responsive Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6 md:pt-8"
            >
              {[
                { icon: Target, value: 94, suffix: "%", label: "Match Rate" },
                { icon: Users, value: 2500, suffix: "+", label: "Users" },
                { icon: BarChart3, value: 47, label: "Jobs/Month" },
                { icon: Clock, value: 10, suffix: "x", label: "Faster" },
              ].map((stat, index) => (
                <div key={index} className="text-center space-y-2 p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/50">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mx-auto" />
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {isVisible && <AnimatedNumber value={stat.value} suffix={stat.suffix} />}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Responsive Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Dashboard Card Stack */}
            <div className="space-y-4 md:space-y-6">
              {/* Job Matches Card */}
              <motion.div
                whileHover={!isMobile ? { y: -8 } : {}}
                className="relative"
              >
                <Card className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-lg md:shadow-xl overflow-hidden">
                  <div className="px-4 md:px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">AI Recommended Jobs</h3>
                          <p className="text-xs text-gray-600">Top matches for you</p>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">
                        Active
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                    {[
                      { title: "Senior Frontend Engineer", company: "TechCorp", match: 98 },
                      { title: "Full Stack Developer", company: "StartupXYZ", match: 95 },
                      { title: "UX Engineer", company: "DesignStudio", match: 92 },
                    ].map((job, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900 text-sm md:text-base">{job.title}</p>
                          <p className="text-xs text-gray-600">@{job.company}</p>
                        </div>
                        <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                          {isVisible && <AnimatedNumber value={job.match} suffix="%" />}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Performance Card */}
              <motion.div
                whileHover={!isMobile ? { y: -8 } : {}}
                className="relative"
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl md:rounded-2xl border-0 shadow-lg md:shadow-xl overflow-hidden">
                  <div className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                        <LineChart className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm md:text-base">AI Resume Assistant</h3>
                        <p className="text-xs text-gray-300">Optimization in progress</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { label: "Relevance", value: 95, color: "from-emerald-400 to-teal-500" },
                        { label: "Keywords", value: 87, color: "from-blue-400 to-cyan-500" },
                        { label: "Formatting", value: 92, color: "from-indigo-400 to-purple-500" },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-xs md:text-sm">
                            <span>{metric.label}</span>
                            <span className="font-medium">
                              {isVisible && <AnimatedNumber value={metric.value} suffix="%" />}
                            </span>
                          </div>
                          <div className="h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isVisible ? { width: `${metric.value}%` } : {}}
                              transition={{ duration: 1.5, delay: index * 0.2 }}
                              className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Success Rate Card */}
              <motion.div
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                animate={!isMobile ? { y: [0, -5, 0] } : {}}
                transition={!isMobile ? { duration: 3, repeat: Infinity } : {}}
                className="relative"
              >
                <div className="p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg md:shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5" />
                        <span className="text-sm">Success Rate</span>
                      </div>
                      <p className="text-3xl md:text-4xl font-bold">
                        {isVisible && <AnimatedNumber value={94} suffix="%" />}
                      </p>
                      <p className="text-xs md:text-sm opacity-90 mt-2">Average placement success</p>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="hidden md:block"
                    >
                      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Elements for Desktop */}
            {!isMobile && (
              <>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl" />
              </>
            )}
          </motion.div>
        </div>

        {/* Trust Badges - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-8 md:pt-12 border-t border-gray-200"
        >
          <p className="text-center text-sm text-gray-600 mb-6 md:mb-8">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-70">
            {["TechCorp", "InnovateCo", "FutureLabs", "GlobalTech", "VisionaryAI"].map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                className="text-sm md:text-base font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}