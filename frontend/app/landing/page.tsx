"use client";

import dynamic from "next/dynamic";
import { NavbarAceternity } from "@/components/navbar-aceternity";
import { HeroAceternity } from "@/components/hero-aceternity";
import { FooterAceternity } from "@/components/footer-aceternity";

const FeaturesSectionAceternity = dynamic(
  () =>
    import("@/components/features-section-aceternity").then((mod) => ({
      default: mod.FeaturesSectionAceternity,
    })),
  { loading: () => <div className="h-screen bg-black" /> },
);

const HowItWorksSectionAceternity = dynamic(
  () =>
    import("@/components/how-it-works-section-aceternity").then((mod) => ({
      default: mod.HowItWorksSectionAceternity,
    })),
  { loading: () => <div className="h-screen bg-black" /> },
);

const PricingSectionAceternity = dynamic(
  () =>
    import("@/components/pricing-section-aceternity").then((mod) => ({
      default: mod.PricingSectionAceternity,
    })),
  { loading: () => <div className="h-96 bg-black" /> },
);

const TestimonialsSectionAceternity = dynamic(
  () =>
    import("@/components/testimonials-section-aceternity").then((mod) => ({
      default: mod.TestimonialsSectionAceternity,
    })),
  { loading: () => <div className="h-96 bg-black" /> },
);

const FaqSectionAceternity = dynamic(
  () =>
    import("@/components/faq-section-aceternity").then((mod) => ({
      default: mod.FaqSectionAceternity,
    })),
  { loading: () => <div className="h-96 bg-black" /> },
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <NavbarAceternity />
      <main>
        <HeroAceternity />
        <FeaturesSectionAceternity />
        <HowItWorksSectionAceternity />
        <TestimonialsSectionAceternity />
        <PricingSectionAceternity />
        <FaqSectionAceternity />
      </main>
      <FooterAceternity />
    </div>
  );
}
