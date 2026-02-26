"use client"

import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

const FeaturesSection = dynamic(
  () => import("@/components/features-section").then((mod) => ({ default: mod.FeaturesSection })),
  { loading: () => <div className="h-screen animate-pulse bg-gray-50" /> },
)

const HowItWorksSection = dynamic(
  () => import("@/components/how-it-works-section").then((mod) => ({ default: mod.HowItWorksSection })),
  { loading: () => <div className="h-screen animate-pulse bg-white" /> },
)

const PricingSection = dynamic(
  () => import("@/components/pricing-section").then((mod) => ({ default: mod.PricingSection })),
  { loading: () => <div className="h-96 animate-pulse bg-gray-50" /> },
)

const TestimonialsSection = dynamic(
  () => import("@/components/testimonials-section").then((mod) => ({ default: mod.TestimonialsSection })),
  { loading: () => <div className="h-96 animate-pulse bg-white" /> },
)

const FaqSection = dynamic(() => import("@/components/faq-section").then((mod) => ({ default: mod.FaqSection })), {
  loading: () => <div className="h-96 animate-pulse bg-gray-50" />,
})

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
