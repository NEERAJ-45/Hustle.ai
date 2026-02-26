import React from "react";

interface HeroVisualProps {
  src: string;
  alt: string;
  children?: React.ReactNode; // For overlays or badges
}

/**
 * HeroVisual: Product mockup, illustration, or media.
 */
const HeroVisual = ({ src, alt, children }: HeroVisualProps) => (
  <div className="flex-1 flex items-center justify-center relative w-full max-w-lg mx-auto">
    <img
      src={src}
      alt={alt}
      className="rounded-xl shadow-lg w-full h-auto object-contain"
      loading="eager"
      aria-hidden={alt ? undefined : true}
    />
    {children && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {children}
      </div>
    )}
  </div>
);

export default HeroVisual;
