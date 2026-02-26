import React from "react";

/**
 * HeroContainer: Layout wrapper for the hero section.
 * Props: children (ReactNode)
 */
const HeroContainer = ({ children }: { children: React.ReactNode }) => (
  <section className="w-full bg-background py-16 md:py-24 lg:py-32 flex items-center justify-center">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      {children}
    </div>
  </section>
);

export default HeroContainer;
