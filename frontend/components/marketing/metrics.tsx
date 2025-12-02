'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Clock, TrendingUp, Target, Users } from 'lucide-react'
import { METRICS } from '@/lib/constants'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const iconComponents = {
  Clock,
  TrendingUp,
  Target,
  Users,
} as const

export function MetricsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-12 bg-white border-y border-navy-100">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, index) => {
            const IconComponent = iconComponents[metric.icon]
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-navy-100 hover:border-navy-300 transition-colors h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.gradient} mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-navy-900 mb-1">
                      {metric.value.includes('+') || metric.value.includes('x') ? (
                        metric.value
                      ) : (
                        <CountUp
                          end={inView ? parseInt(metric.value) : 0}
                          suffix={metric.value.includes('%') ? '%' : ''}
                          duration={2}
                          decimals={metric.value.includes('.') ? 1 : 0}
                        />
                      )}
                    </div>
                    <div className="font-semibold text-navy-700 mb-1">{metric.label}</div>
                    <div className="text-sm text-navy-600">{metric.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-navy-600 mb-6">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'].map((company) => (
              <div key={company} className="text-navy-900 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}