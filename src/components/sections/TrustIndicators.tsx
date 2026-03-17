"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Award, Clock, Star, DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TrustItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  numericValue?: number;
  numericSuffix?: string;
  numericPrefix?: string;
  isMono?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const trustItems: TrustItem[] = [
  {
    icon: Shield,
    title: "Master Licensed",
    subtitle: "KY License M6813",
    isMono: true,
  },
  {
    icon: Award,
    title: "20+ Years",
    subtitle: "Serving Lexington Since 2005",
    numericValue: 20,
    numericSuffix: "+",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    subtitle: "Emergency Calls Anytime",
    numericValue: 24,
    numericSuffix: "/7",
  },
  {
    icon: Star,
    title: "4.9 Rating",
    subtitle: "200+ Google Reviews",
    numericValue: 4.9,
  },
  {
    icon: DollarSign,
    title: "Financing",
    subtitle: "Flexible Payment Options",
  },
];

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */

function useAnimatedCounter(
  target: number,
  shouldAnimate: boolean,
  duration: number = 1500
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const startTime = Date.now();
    const isDecimal = !Number.isInteger(target);

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = eased * target;
      setValue(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [target, shouldAnimate, duration]);

  return value;
}

/* ------------------------------------------------------------------ */
/*  Trust item card                                                    */
/* ------------------------------------------------------------------ */

function TrustItemCard({
  item,
  isInView,
}: {
  item: TrustItem;
  isInView: boolean;
}) {
  const Icon = item.icon;
  const animatedValue = useAnimatedCounter(
    item.numericValue ?? 0,
    isInView && item.numericValue !== undefined
  );

  const displayTitle = (() => {
    if (item.numericValue === undefined) return item.title;
    return `${item.numericPrefix ?? ""}${animatedValue}${item.numericSuffix ?? ""}`;
  })();

  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-copper-500/15 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-copper-500" />
      </div>

      {/* Title (with optional counter) */}
      <p
        className={`text-navy-950 font-bold text-lg ${
          item.isMono ? "font-mono" : "font-display"
        }`}
      >
        {item.numericValue !== undefined ? displayTitle : item.title}
      </p>

      {/* Subtitle */}
      <p
        className={`text-warm-600 text-sm mt-1 ${
          item.isMono ? "font-mono" : "font-body"
        }`}
      >
        {item.subtitle}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TrustIndicators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-warm-100">
      {/* Top copper border */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-copper-500 to-transparent" />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-2">
          {trustItems.map((item) => (
            <TrustItemCard
              key={item.title}
              item={item}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom copper border */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-copper-500 to-transparent" />
    </section>
  );
}
