'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export function CTASection() {
  const handleStartTrial = () => {
    toast.success('Starting your free trial!', {
      description: 'Redirecting to registration...',
      action: {
        label: 'Open Dashboard',
        onClick: () => window.open('/dashboard', '_blank')
      },
    })
  }

  const benefits = [
    '14-day free trial',
    'No credit card required',
    'Cancel anytime',
    'Priority support',
    'AI resume builder included',
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <Card className="border-0 navy-gradient shadow-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Job Search?
              </h2>
              
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of professionals who landed their dream jobs with Hustle.ai
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    <span className="text-white text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="group bg-white text-navy-700 hover:bg-navy-50 shadow-lg px-8"
                  onClick={handleStartTrial}
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
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => toast.info('Schedule a demo', {
                    description: 'Our team will contact you within 24 hours.',
                    action: {
                      label: 'Schedule',
                      onClick: () => window.open('https://calendly.com/hustle-ai/demo', '_blank')
                    },
                  })}
                >
                  Book a Demo
                </Button>
              </div>

              <div className="mt-8 text-blue-200 text-sm">
                <p>Trusted by professionals at Google, Amazon, Microsoft, and 5,000+ other companies</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}