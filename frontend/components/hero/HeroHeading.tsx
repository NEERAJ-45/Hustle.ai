import React from "react";

/**
 * HeroHeading: Main headline for the hero section.
 * Props: children (ReactNode)
 */
const HeroHeading = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground mb-4">
    {children}
  </h1>
);

export default HeroHeading;
