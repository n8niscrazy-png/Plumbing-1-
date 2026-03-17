"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                     */
/* ------------------------------------------------------------------ */

const variantStyles = {
  primary:
    "bg-gradient-to-r from-copper-500 to-copper-300 text-navy-900 font-bold " +
    "hover:shadow-lg hover:shadow-copper-500/25 " +
    "relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r " +
    "after:from-transparent after:via-white/20 after:to-transparent " +
    "after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-700",
  secondary:
    "bg-navy-700 text-white font-semibold hover:bg-navy-900 " +
    "shadow-sm hover:shadow-md",
  outline:
    "border-2 border-copper-500 text-copper-500 bg-transparent font-semibold " +
    "hover:bg-copper-500/10",
  emergency:
    "bg-emergency-500 text-white font-bold animate-pulse hover:animate-none " +
    "hover:bg-red-700 shadow-lg shadow-emergency-500/30",
  ghost:
    "bg-transparent text-navy-900 font-semibold hover:bg-warm-100",
} as const;

const sizeStyles = {
  sm: "px-4 py-2 text-xs uppercase tracking-wider",
  md: "px-6 py-3 text-sm uppercase tracking-wider",
  lg: "px-8 py-4 text-base uppercase tracking-wider",
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

interface ButtonAsAnchor extends ButtonBaseProps {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
  type?: never;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: "button";
  href?: never;
  target?: never;
  rel?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = "primary",
    size = "md",
    icon: Icon,
    iconRight: IconRight,
    loading = false,
    className = "",
    children,
    disabled,
    as: element,
    ...rest
  } = props;

  const isDisabled = disabled || loading;

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-md transition-colors " +
    "duration-200 focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-copper-500 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none select-none font-body";

  const cls = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const iconSize = size === "sm" ? 14 : size === "md" ? 16 : 20;

  const content = (
    <>
      {loading && <Loader2 className="animate-spin" size={iconSize} />}
      {!loading && Icon && <Icon size={iconSize} />}
      {children}
      {!loading && IconRight && <IconRight size={iconSize} />}
    </>
  );

  const hoverTap = {
    whileHover: isDisabled ? undefined : { scale: 1.02 },
    whileTap: isDisabled ? undefined : { scale: 0.97 },
  };

  if (element === "a") {
    const { href, target, rel, onClick } = rest as Omit<ButtonAsAnchor, keyof ButtonBaseProps | "as">;
    return (
      <motion.a
        className={cls}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-disabled={isDisabled || undefined}
        {...hoverTap}
        transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
      >
        {content}
      </motion.a>
    );
  }

  const { type = "button", onClick } = rest as Omit<ButtonAsButton, keyof ButtonBaseProps | "as">;
  return (
    <motion.button
      className={cls}
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      {...hoverTap}
      transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
    >
      {content}
    </motion.button>
  );
};

export default Button;
