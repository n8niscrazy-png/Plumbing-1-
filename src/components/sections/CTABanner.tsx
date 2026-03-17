"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CTAAction {
  text: string;
  href: string;
}

interface CTABannerProps {
  /** Visual variant */
  variant?: "copper" | "navy" | "emergency";
  /** Main heading */
  title: string;
  /** Supporting description */
  description: string;
  /** Primary call-to-action button */
  primaryAction: CTAAction;
  /** Optional secondary call-to-action button */
  secondaryAction?: CTAAction;
  /** Show phone number alongside actions */
  phone?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Variant styles                                                     */
/* ------------------------------------------------------------------ */

const variantStyles = {
  copper: {
    wrapper:
      "bg-copper-gradient text-navy-900",
    heading: "text-navy-950",
    description: "text-navy-800/80",
    primaryBtn:
      "bg-navy-900 text-white hover:bg-navy-950 shadow-lg hover:shadow-xl",
    secondaryBtn:
      "border-2 border-navy-900/30 text-navy-900 hover:bg-navy-900/10",
    phoneText: "text-navy-900",
  },
  navy: {
    wrapper:
      "bg-navy-900 text-warm-100",
    heading: "text-white",
    description: "text-navy-200",
    primaryBtn:
      "bg-gradient-to-r from-copper-500 to-copper-400 text-white hover:from-copper-600 hover:to-copper-500 shadow-lg hover:shadow-xl",
    secondaryBtn:
      "border-2 border-warm-100/30 text-warm-100 hover:bg-warm-100/10",
    phoneText: "text-copper-400",
  },
  emergency: {
    wrapper:
      "bg-emergency-500 text-white",
    heading: "text-white",
    description: "text-white/90",
    primaryBtn:
      "bg-white text-emergency-500 hover:bg-warm-50 shadow-lg hover:shadow-xl font-bold",
    secondaryBtn:
      "border-2 border-white/40 text-white hover:bg-white/10",
    phoneText: "text-white",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CTABanner({
  variant = "copper",
  title,
  description,
  primaryAction,
  secondaryAction,
  phone = false,
}: CTABannerProps) {
  const styles = variantStyles[variant];

  return (
    <section
      className={`relative overflow-hidden ${styles.wrapper} ${
        variant === "emergency" ? "diagonal-cut" : "diagonal-cut-bottom"
      }`}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Emergency pulse animation ring */}
      {variant === "emergency" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10 animate-ping" style={{ animationDuration: "3s" }} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center"
      >
        {/* Heading */}
        <h2
          className={`font-display mb-4 ${styles.heading}`}
          style={{ fontSize: "clamp(2rem, 3.5vw + 0.5rem, 3rem)" }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className={`font-body text-lg max-w-2xl mx-auto mb-8 ${styles.description}`}
        >
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryAction.href}
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-body font-semibold text-sm uppercase tracking-wider transition-all duration-200 ${styles.primaryBtn}`}
          >
            {primaryAction.text}
          </Link>

          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-body font-semibold text-sm uppercase tracking-wider transition-all duration-200 ${styles.secondaryBtn}`}
            >
              {secondaryAction.text}
            </Link>
          )}

          {phone && (
            <a
              href="tel:8592948080"
              className={`inline-flex items-center gap-2 font-mono text-lg font-semibold transition-opacity hover:opacity-80 ${styles.phoneText}`}
            >
              <Phone className="w-5 h-5" />
              859.294.8080
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
