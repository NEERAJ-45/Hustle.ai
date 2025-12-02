'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/constants'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useState } from 'react'

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState('Professional')

  const handlePlanSelect = (plan: typeof PRICING_PLANS[0]) => {
    setSelectedPlan(plan.name)
    
    if (plan.name === 'Enterprise') {
      toast.info('Enterprise Plan', {
        description: 'Our sales team will contact you shortly.',
        action: {
          label: 'Contact Sales',
          onClick: () => window.open('mailto:sales@hustle.ai', '_blank')
        },
      })
    } else {
      toast.success(`Selected ${plan.name} Plan`, {
        description: `Starting your ${plan.price === '$79' ? '14-day free trial' : 'subscription'}...`,
        action: {
          label: 'Continue',
          onClick: () => window.open('/register', '_blank')
        },
      })
    }
  }

  const getPrice = (price: string) => {
    if (price === 'Custom') return price
    if (billingCycle === 'yearly') {
      const monthly = parseFloat(price.replace('$', ''))
      const yearly = monthly * 12 * 0.8 // 20% discount
      return `$${yearly.toFixed(0)}`
    }
    return price
  }

  const getPeriod = (period: string) => {
    if (period === '') return ''
    return billingCycle === 'yearly' ? '/year' : period
  }

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free. Upgrade when you're ready.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-white rounded-full p-1 border border-navy-200 mt-8"
          >
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' ? 'navy-gradient text-white' : 'text-navy-600'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly' ? 'navy-gradient text-white' : 'text-navy-600'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly <span className="text-green-600 ml-1">Save 20%</span>
            </button>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card 
                className={`card-hover relative border-navy-100 h-full flex flex-col ${
                  plan.popular ? 'border-2 border-navy-300 shadow-2xl' : ''
                } ${selectedPlan === plan.name ? 'ring-2 ring-navy-400' : ''}`}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-navy-600 text-white px-4 py-1 shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className={`rounded-t-lg ${plan.popular ? 'navy-gradient text-white' : plan.gradient}`}>
                  <CardTitle className={plan.popular ? 'text-white' : 'text-navy-900'}>
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline mt-2">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-navy-900'}`}>
                      {getPrice(plan.price)}
                    </span>
                    <span className={`ml-2 ${plan.popular ? 'text-blue-100' : 'text-navy-600'}`}>
                      {getPeriod(plan.period)}
                    </span>
                  </div>
                  <CardDescription className={plan.popular ? 'text-blue-100' : 'text-navy-600'}>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6 flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-navy-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-white text-navy-700 hover:bg-navy-50 shadow-lg' 
                        : 'navy-gradient text-white hover:opacity-90'
                    }`}
                    size="lg"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-navy-600"
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-white rounded-xl p-6 shadow-sm border border-navy-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-navy-900">30-day money-back guarantee</div>
                <div className="text-sm text-navy-600">No questions asked</div>
              </div>
            </div>
            <div className="h-6 w-px bg-navy-200 hidden sm:block" />
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-navy-900">No credit card required</div>
                <div className="text-sm text-navy-600">Start your free trial today</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}