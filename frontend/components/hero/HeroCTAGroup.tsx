import React from "react";

interface HeroCTAGroupProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * HeroCTAGroup: Primary and secondary call-to-action buttons.
 */
const HeroCTAGroup = ({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroCTAGroupProps) => (
  <div className="flex gap-4 mt-2">
    <a
      href={primaryHref}
      className="btn btn-primary px-6 py-3 text-base font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={primaryLabel}
    >
      {primaryLabel}
    </a>
    {secondaryLabel && secondaryHref && (
      <a
        href={secondaryHref}
        className="btn btn-secondary px-6 py-3 text-base font-semibold rounded-lg border border-input bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={secondaryLabel}
      >
        {secondaryLabel}
      </a>
    )}
  </div>
);

export default HeroCTAGroup;
