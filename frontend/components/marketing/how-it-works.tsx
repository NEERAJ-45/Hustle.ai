'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Search, FileEdit, Send, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const steps = [
  {
    step: '01',
    icon: User,
    title: 'Create Your Profile',
    description: 'Upload your resume and set your preferences. Our AI analyzes your skills, experience, and career goals.',
    color: 'text-navy-600',
    bgColor: 'bg-navy-50',
  },
  {
    step: '02',
    icon: Search,
    title: 'AI Finds Matches',
    description: 'Our algorithm scans thousands of jobs and finds perfect matches based on your profile and preferences.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    step: '03',
    icon: FileEdit,
    title: 'Auto-Generate Documents',
    description: 'Get personalized resumes and cover letters tailored for each job application.',
    color: 'text-navy-700',
    bgColor: 'bg-navy-50',
  },
  {
    step: '04',
    icon: Send,
    title: 'One-Click Apply',
    description: 'Apply to multiple jobs with a single click. We handle form filling and submissions.',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  {
    step: '05',
    icon: CheckCircle,
    title: 'Track & Optimize',
    description: 'Monitor your applications, get interview analytics, and optimize your strategy.',
    color: 'text-navy-800',
    bgColor: 'bg-navy-50',
  },
]

export function HowItWorks() {
  const handleStepClick = (step: typeof steps[0]) => {
    toast.info(`Step ${step.step}: ${step.title}`, {
      description: step.description,
      action: {
        label: 'Try It',
        onClick: () => window.open('/register', '_blank')
      },
    })
  }

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              How <span className="text-gradient">Hustle.ai</span> Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get from job search to job offer in 5 simple steps
            </p>
          </motion.div>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Connector (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-navy-300 via-blue-300 to-navy-300 transform -translate-x-1/2" />
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`relative flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}
                >
                  <Card 
                    className="card-hover border-navy-100 cursor-pointer h-full"
                    onClick={() => handleStepClick(step)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-3 rounded-xl ${step.bgColor}`}>
                          <step.icon className={`h-6 w-6 ${step.color}`} />
                        </div>
                        <span className="text-2xl font-bold text-navy-900">{step.step}</span>
                      </div>
                      <CardTitle className="text-navy-900">{step.title}</CardTitle>
                      <CardDescription className="text-base text-navy-600">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${step.color.replace('text-', 'bg-')}`} />
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Center Dot */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full navy-gradient items-center justify-center z-10 border-4 border-white shadow-lg">
                  <span className="text-white font-bold">{step.step.replace('0', '')}</span>
                </div>
                
                {/* Spacer */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-8 shadow-lg border border-navy-100">
            <div className="text-left">
              <h3 className="text-xl font-bold text-navy-900 mb-2">Ready to Get Started?</h3>
              <p className="text-navy-600">Join thousands who found their dream job with Hustle.ai</p>
            </div>
            <button
              onClick={() => toast.success('Starting your journey!', {
                description: 'Redirecting to registration...',
                action: {
                  label: 'Open',
                  onClick: () => window.open('/register', '_blank')
                },
              })}
              className="navy-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Start Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}