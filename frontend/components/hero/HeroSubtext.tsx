import React from "react";

/**
 * HeroSubtext: Supporting text for the hero section.
 * Props: children (ReactNode)
 */
const HeroSubtext = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-prose">
    {children}
  </p>
);

export default HeroSubtext;
