'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Play, Mail } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [email, setEmail] = useState('')

  const handleDemoClick = () => {
    toast.success('Demo Video Loading', {
      description: 'Opening product demo in a new window.',
      action: {
        label: 'Open',
        onClick: () => window.open('https://youtu.be/dQw4w9WgXcQ', '_blank')
      },
    })
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Email Required', {
        description: 'Please enter your email address to join the waitlist.',
      })
      return
    }
    
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // Simulate API call
          resolve(true)
        }, 1500)
      }),
      {
        loading: 'Adding to waitlist...',
        success: () => {
          setEmail('')
          return 'You\'re on the waitlist!'
        },
        error: 'Failed to join waitlist. Please try again.',
      }
    )
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-navy-600/5 to-blue-600/5" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-navy-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      
      <div className="container relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-navy-100 text-navy-700 hover:bg-navy-100 border-navy-200">
                <Sparkles className="mr-2 h-4 w-4" />
                AI-Powered Job Search Platform
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Stop Searching.{' '}
                <span className="text-gradient">Start Matching</span>
                {' '}with AI
              </h1>
              
              <p className="text-xl text-navy-600 mb-8">
                Hustle.ai automates your entire job search process with intelligent matching, 
                personalized resumes, and one-click applications. Land better jobs, faster.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="group navy-gradient hover:opacity-90 shadow-lg px-8"
                  onClick={() => toast.success('Redirecting to registration...')}
                  asChild
                >
                  <Link href="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-navy-300"
                  onClick={handleDemoClick}
                >
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Watch Demo
                </Button>
              </div>

              {/* Email Waitlist */}
              <div className="max-w-md">
                <p className="text-sm text-navy-600 mb-3">Join 10,000+ professionals on our waitlist</p>
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-navy-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-navy-200 focus:border-navy-400 focus:ring-2 focus:ring-navy-100 outline-none transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="navy-gradient hover:opacity-90">
                    Join Waitlist
                  </Button>
                </form>
              </div>
            </motion.div>
            
            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-navy-100">
                <div className="bg-gradient-to-r from-navy-600 to-blue-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-lg">Hustle.ai Dashboard</div>
                        <div className="text-sm text-blue-100">Welcome back, Sarah!</div>
                      </div>
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                      <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-2" />
                      AI Active
                    </Badge>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="p-6 border-b border-navy-100">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'New Matches', value: '24', change: '+5' },
                      { label: 'Applications', value: '12', change: '+3' },
                      { label: 'Interviews', value: '4', change: '+2' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 rounded-xl bg-navy-50">
                        <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
                        <div className="text-sm text-navy-600">{stat.label}</div>
                        <div className="text-xs text-green-600 font-medium mt-1">{stat.change} this week</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Job Matches */}
                <div className="p-6">
                  <h3 className="font-semibold text-navy-900 mb-4">Recent Job Matches</h3>
                  <div className="space-y-4">
                    {[
                      { company: 'TechCorp', match: 98, role: 'Senior Full Stack Engineer', salary: '$180K', status: 'Hot Match' },
                      { company: 'StartupXYZ', match: 92, role: 'Frontend Developer', salary: '$140K', status: 'Great Fit' },
                      { company: 'Global Inc', match: 87, role: 'DevOps Engineer', salary: '$160K', status: 'Good Match' },
                    ].map((job, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-4 rounded-xl border border-navy-100 hover:border-navy-300 hover:bg-navy-50/50 transition-all cursor-pointer group"
                        onClick={() => toast.info(`Viewing ${job.role} at ${job.company}`, {
                          description: `Match score: ${job.match}% • Salary: ${job.salary}`,
                          action: {
                            label: 'Apply',
                            onClick: () => toast.success('Application started!')
                          },
                        })}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-navy-900 group-hover:text-navy-700">{job.role}</div>
                          <div className="text-sm text-navy-600">{job.company} • {job.salary}</div>
                          <div className="text-xs text-navy-500 mt-1">{job.status}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-lg font-bold text-navy-900">{job.match}%</div>
                            <div className="text-xs text-navy-500">Match</div>
                          </div>
                          <Button 
                            size="sm" 
                            className="navy-gradient opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              toast.success('Application submitted!', {
                                description: `Applied for ${job.role} at ${job.company}`,
                                action: {
                                  label: 'Track',
                                  onClick: () => toast.info('Tracking application...')
                                },
                              })
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4">
                <Badge className="bg-green-100 text-green-800 border-green-200 shadow-lg">
                  🚀 24 New Matches
                </Badge>
              </div>
              <div className="absolute -bottom-4 -left-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 shadow-lg">
                  ⚡ 95% Match Accuracy
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}