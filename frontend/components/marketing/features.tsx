'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, FileText, Zap, Target, Shield, BarChart } from 'lucide-react'
import { FEATURES } from '@/lib/constants'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

// Create a mapping of icon names to actual components
const iconMap = {
  Brain: Brain,
  FileText: FileText,
  Zap: Zap,
  Target: Target,
  Shield: Shield,
  BarChart: BarChart,
} as const

export function FeaturesSection() {
  const handleFeatureClick = (feature: typeof FEATURES[0]) => {
    toast.info(feature.title, {
      description: feature.description,
      action: {
        label: 'Learn More',
        onClick: () => window.open(`#${feature.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank')
      },
    })
  }

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="text-gradient">Land Your Dream Job</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              From finding the right opportunities to landing the job, Hustle.ai handles it all.
            </p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            // Get the icon component from the map
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="card-hover border-navy-100 hover:border-navy-300 cursor-pointer h-full"
                  onClick={() => handleFeatureClick(feature)}
                >
                  <CardHeader>
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="mt-4 text-navy-900">{feature.title}</CardTitle>
                    <CardDescription className="text-base text-navy-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-navy-50 to-blue-50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-navy-900 mb-2">See It In Action</h3>
            <p className="text-navy-600">Watch how our AI matches you with perfect opportunities</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Upload Resume', desc: 'AI analyzes your skills' },
              { step: '2', title: 'Get Matches', desc: '95% accurate job matches' },
              { step: '3', title: 'Apply Instantly', desc: 'One-click applications' },
            ].map((step) => (
              <div key={step.step} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full navy-gradient text-white font-bold text-lg mb-4">
                  {step.step}
                </div>
                <h4 className="font-bold text-navy-900 mb-2">{step.title}</h4>
                <p className="text-navy-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}