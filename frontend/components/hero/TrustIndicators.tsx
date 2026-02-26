import React from "react";

interface TrustIndicatorsProps {
  logos?: { src: string; alt: string }[];
  ratings?: React.ReactNode;
  stats?: React.ReactNode;
}

/**
 * TrustIndicators: Logos, ratings, or social proof.
 */
const TrustIndicators = ({ logos, ratings, stats }: TrustIndicatorsProps) => (
  <div className="mt-8 flex flex-col md:flex-row items-center gap-4 w-full">
    {logos && logos.length > 0 && (
      <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo.src}
            alt={logo.alt}
            className="h-8 w-auto opacity-70 grayscale hover:opacity-100 transition"
            loading="lazy"
          />
        ))}
      </div>
    )}
    {ratings && <div className="ml-0 md:ml-8">{ratings}</div>}
    {stats && <div className="ml-0 md:ml-8">{stats}</div>}
  </div>
);

export default TrustIndicators;
