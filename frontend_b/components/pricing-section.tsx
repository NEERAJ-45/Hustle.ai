"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for getting started",
      features: [
        "5 job matches per month",
        "Basic resume builder",
        "Manual applications",
        "Email support",
        "Job alerts",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      monthlyPrice: 29,
      annualPrice: 24,
      description: "For serious job seekers",
      features: [
        "50 job matches per month",
        "AI resume optimization",
        "One-click applications",
        "Priority support",
        "Analytics dashboard",
        "Custom cover letters",
        "Interview preparation",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 99,
      annualPrice: 79,
      description: "For career professionals",
      features: [
        "Unlimited job matches",
        "Executive resume service",
        "Dedicated account manager",
        "24/7 priority support",
        "Advanced analytics",
        "Salary negotiation coaching",
        "LinkedIn optimization",
        "Career consulting",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">Choose the plan that fits your job search needs</p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center gap-4 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                !isAnnual ? "bg-white text-[#334e68] shadow-sm" : "text-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                isAnnual ? "bg-white text-[#334e68] shadow-sm" : "text-gray-600"
              }`}
            >
              Annual
              <span className="ml-2 text-xs text-[#2563eb]">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular ? "border-[#2563eb] shadow-lg relative" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-[#334e68] to-[#2563eb] text-white px-4 py-1 text-sm border-0">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pt-8 pb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                {isAnnual && plan.annualPrice < plan.monthlyPrice && (
                  <p className="text-sm text-[#2563eb]">Billed ${plan.annualPrice * 12} annually</p>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#334e68] to-[#2563eb] hover:opacity-90 text-white"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
                <div className="space-y-3 pt-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
