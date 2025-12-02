import { Navbar } from '@/components/marketing/navbar'
import { HeroSection } from '@/components/marketing/hero'
import { FeaturesSection } from '@/components/marketing/features'
import { MetricsSection } from '@/components/marketing/metrics'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { TestimonialsSection } from '@/components/marketing/testimonials'
import { PricingSection } from '@/components/marketing/pricing'
import { FAQSection } from '@/components/marketing/faq'
import { CTASection } from '@/components/marketing/cta'
import { Footer } from '@/components/marketing/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}