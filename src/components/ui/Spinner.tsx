import React from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 40,
} as const;

type SpinnerSize = keyof typeof sizeMap;

export interface SpinnerProps {
  /** Size preset */
  size?: SpinnerSize;
  /** Override colour -- Tailwind text-* class (e.g. "text-navy-700") */
  color?: string;
  /** Extra classes */
  className?: string;
  /** Accessible label (defaults to "Loading") */
  label?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-copper-500",
  className = "",
  label = "Loading",
}) => {
  const px = sizeMap[size];

  return (
    <svg
      className={`animate-spin ${color} ${className}`}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label={label}
    >
      {/* Track */}
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Indicator arc */}
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Spinner;
