import { Hero } from '@/app/components/marketing/hero'
import { Features } from '@/app/components/marketing/features'
import { HowItWorks } from '@/app/components/marketing/how-it-works'
import { Pricing } from '@/app/components/marketing/pricing'
import { Testimonials } from '@/app/components/marketing/testimonials'
import { FAQ } from '@/app/components/marketing/faq'
import { Metrics } from '@/app/components/marketing/metrics'

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
    </>
  )
}