"use client";

import React from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                     */
/* ------------------------------------------------------------------ */

const variantStyles = {
  default:
    "bg-warm-50 shadow-sm border border-warm-200/50",
  elevated:
    "bg-warm-50 shadow-md hover:shadow-xl border border-warm-200/30",
  bordered:
    "bg-warm-50 border-2 border-copper-200",
  dark:
    "bg-navy-900 text-white border border-navy-700",
} as const;

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type CardVariant = keyof typeof variantStyles;
type CardPadding = keyof typeof paddingMap;

export interface CardProps {
  /** Visual variant */
  variant?: CardVariant;
  /** Padding preset */
  padding?: CardPadding;
  /** Render a decorative copper stripe across the top */
  copperAccent?: boolean;
  /** Extra Tailwind classes */
  className?: string;
  /** Card contents */
  children?: React.ReactNode;
  /** Optional click handler (makes card appear interactive) */
  onClick?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "md",
  copperAccent = false,
  className = "",
  children,
  onClick,
}) => {
  const isInteractive = !!onClick || variant === "elevated";

  const baseClasses =
    "rounded-lg overflow-hidden transition-shadow duration-300 font-body";

  const cls = [
    baseClasses,
    variantStyles[variant],
    paddingMap[padding],
    onClick ? "cursor-pointer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={cls}
      onClick={onClick}
      whileHover={
        isInteractive
          ? { y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Copper accent bar */}
      {copperAccent && (
        <div
          className={`h-1 w-full bg-gradient-to-r from-copper-500 to-copper-300 ${
            padding !== "none" ? "-mx-6 -mt-6 mb-6 w-[calc(100%+3rem)]" : ""
          } ${padding === "sm" ? "-mx-4 -mt-4 mb-4 w-[calc(100%+2rem)]" : ""}
          ${padding === "lg" ? "-mx-8 -mt-8 mb-8 w-[calc(100%+4rem)]" : ""}
          ${padding === "xl" ? "-mx-10 -mt-10 mb-10 w-[calc(100%+5rem)]" : ""}`}
        />
      )}

      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

export interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className = "",
  children,
}) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export interface CardTitleProps {
  as?: "h2" | "h3" | "h4";
  className?: string;
  children?: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  as: Tag = "h3",
  className = "",
  children,
}) => (
  <Tag
    className={`font-display text-xl font-bold tracking-tight ${
      className.includes("text-") ? "" : "text-navy-900"
    } ${className}`}
  >
    {children}
  </Tag>
);

export interface CardBodyProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({
  className = "",
  children,
}) => <div className={`text-navy-700 leading-relaxed ${className}`}>{children}</div>;

export interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className = "",
  children,
}) => (
  <div className={`mt-6 flex items-center gap-3 ${className}`}>
    {children}
  </div>
);

export default Card;
