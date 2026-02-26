import React from "react";
import HeroContainer from "./hero/HeroContainer";
import HeroContent from "./hero/HeroContent";
import HeroHeading from "./hero/HeroHeading";
import HeroSubtext from "./hero/HeroSubtext";
import HeroCTAGroup from "./hero/HeroCTAGroup";
import HeroVisual from "./hero/HeroVisual";
import TrustIndicators from "./hero/TrustIndicators";

// Example props for TrustIndicators and HeroVisual
import { trustLogos } from "./hero/trustLogos";

export default function HeroSection() {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroHeading>
          Land Yousr <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Dream Job 10x Faster</span>
        </HeroHeading>
        <HeroSubtext>
          Hustle.ai automates your entire job search journey. From intelligent job matching to personalized resume generation and one-click applications.
        </HeroSubtext>
        <HeroCTAGroup
          primaryLabel="Start Free Trial"
          primaryHref="/signup"
          secondaryLabel="See How It Works"
          secondaryHref="#how-it-works"
        />
        <TrustIndicators logos={trustLogos} />
      </HeroContent>
      <HeroVisual src="/dashboard-mockup.png" alt="Hustle.ai dashboard preview" />
    </HeroContainer>
  );
}
