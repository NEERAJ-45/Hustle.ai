"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Search, FileText, Send, Calendar, Award, ChevronRight, Rocket, Zap, Sparkles, Target, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      number: 1,
      icon: User,
      title: "Create Profile",
      description: "Set up your professional profile with skills, experience, and career goals.",
      color: "from-blue-500 to-cyan-500",
      details: ["AI analyzes your background", "Identify key strengths", "Set career preferences"]
    },
    {
      number: 2,
      icon: Search,
      title: "AI Job Matching",
      description: "Intelligent algorithm scans thousands of jobs to find your perfect matches.",
      color: "from-indigo-500 to-purple-500",
      details: ["Daily job scanning", "Personalized matching", "Priority ranking"]
    },
    {
      number: 3,
      icon: FileText,
      title: "Resume Optimization",
      description: "AI customizes your resume and generates tailored cover letters for each role.",
      color: "from-purple-500 to-pink-500",
      details: ["ATS optimization", "Keyword matching", "Format perfection"]
    },
    {
      number: 4,
      icon: Send,
      title: "One-Click Apply",
      description: "Apply to multiple jobs instantly. We handle all form filling automatically.",
      color: "from-pink-500 to-rose-500",
      details: ["Batch applications", "Auto-fill forms", "Instant submissions"]
    },
    {
      number: 5,
      icon: Calendar,
      title: "Interview Prep",
      description: "Track responses, manage interviews, and get AI-powered preparation tips.",
      color: "from-orange-500 to-amber-500",
      details: ["Schedule management", "Mock interviews", "Company research"]
    },
    {
      number: 6,
      icon: Award,
      title: "Land Your Dream Job",
      description: "Receive offer negotiation support and secure the best compensation package.",
      color: "from-emerald-500 to-teal-500",
      details: ["Offer comparison", "Negotiation tips", "Career transition"]
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 mb-4"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">6 Simple Steps</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            How It <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            From job search to job offer—simplified and accelerated with AI
          </motion.p>
        </div>

        {/* Timeline Visualization */}
        <div className="relative mb-8 md:mb-12 lg:mb-16">
          {/* Progress Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 md:top-8 h-full md:h-2 w-2 md:w-4/5 bg-gradient-to-b md:bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200 rounded-full -z-10" />
          
          {/* Steps - Mobile Vertical / Desktop Horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {steps.map((step) => (
              <motion.button
                key={step.number}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStep(step.number)}
                viewport={{ once: true }}
                transition={{ delay: step.number * 0.1 }}
                className="relative group"
              >
                <div className="flex md:flex-col items-center gap-4 md:gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                  {/* Step Number */}
                  <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-6 h-6 text-white" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-900">{step.number}</span>
                    </div>
                  </div>
                  
                  {/* Step Info */}
                  <div className="flex-1 md:text-center">
                    <h3 className="font-semibold text-gray-900 text-left md:text-center group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 hidden md:block">
                      {step.description.split(' ').slice(0, 8).join(' ')}...
                    </p>
                  </div>
                  
                  {/* Active Indicator */}
                  {activeStep === step.number && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full animate-ping" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              <CardContent className="p-6 md:p-8 lg:p-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Left Column - Step Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${steps[activeStep - 1].color} flex items-center justify-center`}>
                        {(() => {
                          const StepIcon = steps[activeStep - 1].icon
                          return <StepIcon className="w-8 h-8 text-white" />
                        })()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-blue-600">Step {activeStep}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <span className="text-2xl font-bold text-gray-900">{steps[activeStep - 1].title}</span>
                        </div>
                        <p className="text-gray-700 mt-2">{steps[activeStep - 1].description}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">What we do:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {steps[activeStep - 1].details.map((detail, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                              <CheckIcon index={index} />
                            </div>
                            <span className="text-sm text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep(prev => prev > 1 ? prev - 1 : 1)}
                        disabled={activeStep === 1}
                        className="rounded-lg border-gray-300"
                      >
                        Previous
                      </Button>
                      
                      <div className="flex-1 text-center">
                        <span className="text-sm text-gray-600">
                          Step {activeStep} of {steps.length}
                        </span>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${steps[activeStep - 1].color}`}
                            style={{ width: `${(activeStep / steps.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => setActiveStep(prev => prev < steps.length ? prev + 1 : steps.length)}
                        disabled={activeStep === steps.length}
                        className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Visual */}
                  <div className="relative">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold">AI Power</h4>
                          <p className="text-sm text-gray-300">Active in this step</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Accuracy</span>
                          <span className="font-bold">94%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="w-11/12 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Time Saved</span>
                          <span className="font-bold">10x</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl" />
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Begin?</h3>
              <p className="text-gray-700">Start your journey to your dream job today</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-2 border-gray-300 hover:border-blue-600"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CheckIcon({ index }: { index: number }) {
  const icons = [
    <Target className="w-4 h-4 text-blue-600" key="target" />,
    <TrendingUp className="w-4 h-4 text-indigo-600" key="trending" />,
    <Sparkles className="w-4 h-4 text-purple-600" key="sparkles" />,
    <Zap className="w-4 h-4 text-pink-600" key="zap" />,
  ]
  return icons[index % icons.length]
}