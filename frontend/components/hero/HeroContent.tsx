import React from "react";

/**
 * HeroContent: Groups heading, subtext, and CTAs.
 * Props: children (ReactNode)
 */
const HeroContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 flex flex-col items-start gap-6 max-w-xl">
    {children}
  </div>
);

export default HeroContent;
