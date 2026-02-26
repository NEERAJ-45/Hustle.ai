"use client"

import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/navbar"
import HeroSection from "@/components/HeroSection"
import { Footer } from "@/components/layout/footer"

const FeaturesSection = dynamic(
  () => import("@/components/sections/features-section").then((mod) => ({ default: mod.FeaturesSection })),
  {
    loading: () => <div className="h-screen" />,
  },
)

const HowItWorksSection = dynamic(
  () => import("@/components/sections/how-it-works-section").then((mod) => ({ default: mod.HowItWorksSection })),
  {
    loading: () => <div className="h-screen" />,
  },
)

const PricingSection = dynamic(
  () => import("@/components/sections/pricing-section").then((mod) => ({ default: mod.PricingSection })),
  {
    loading: () => <div className="h-96" />,
  },
)

const TestimonialsSection = dynamic(
  () => import("@/components/sections/testimonials-section").then((mod) => ({ default: mod.TestimonialsSection })),
  {
    loading: () => <div className="h-96" />,
  },
)

const FaqSection = dynamic(
  () => import("@/components/sections/faq-section").then((mod) => ({ default: mod.FaqSection })),
  {
    loading: () => <div className="h-96" />,
  },
)

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
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
