import React from "react";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                     */
/* ------------------------------------------------------------------ */

const variantStyles = {
  default:
    "bg-copper-500/15 text-copper-700 border border-copper-500/20",
  navy:
    "bg-navy-700/15 text-navy-900 border border-navy-700/20",
  success:
    "bg-green-100 text-green-800 border border-green-200",
  warning:
    "bg-amber-100 text-amber-800 border border-amber-200",
  emergency:
    "bg-emergency-500/15 text-emergency-500 border border-emergency-500/25",
  outline:
    "bg-transparent text-navy-700 border border-navy-700/30",
} as const;

const dotColors = {
  default: "bg-copper-500",
  navy: "bg-navy-700",
  success: "bg-green-500",
  warning: "bg-amber-500",
  emergency: "bg-emergency-500",
  outline: "bg-navy-500",
} as const;

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type BadgeVariant = keyof typeof variantStyles;
type BadgeSize = keyof typeof sizeStyles;

export interface BadgeProps {
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size preset */
  size?: BadgeSize;
  /** Show a colored dot indicator before the label */
  dot?: boolean;
  /** Extra Tailwind classes */
  className?: string;
  /** Badge contents */
  children?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  children,
}) => {
  const cls = [
    "inline-flex items-center gap-1.5 rounded-full font-body font-semibold uppercase tracking-wider whitespace-nowrap",
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls}>
      {dot && (
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
