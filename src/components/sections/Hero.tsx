"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Award, Clock, Star, CheckCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const floatAnimationDelayed = {
  y: [0, -8, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: 1.5,
  },
};

/* ------------------------------------------------------------------ */
/*  Trust strip items                                                  */
/* ------------------------------------------------------------------ */

interface TrustItem {
  icon: React.ReactNode;
  label: string;
}

const trustItems: TrustItem[] = [
  {
    icon: <Shield className="w-4 h-4" />,
    label: "Licensed M6813",
  },
  {
    icon: <Award className="w-4 h-4" />,
    label: "20+ Years",
  },
  {
    icon: <Clock className="w-4 h-4" />,
    label: "24/7 Emergency",
  },
];

/* ------------------------------------------------------------------ */
/*  Hero images                                                        */
/* ------------------------------------------------------------------ */

const heroImages = {
  main: {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    alt: "Modern bathroom with elegant white fixtures installed by Plumbing Systems",
  },
  secondary: {
    src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
    alt: "Professional plumber at work with tools",
  },
  accent: {
    src: "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?auto=format&fit=crop&w=400&q=80",
    alt: "Beautiful walk-in shower and bathtub installation",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section
      className="relative bg-navy-900 bg-hero-texture overflow-hidden"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/80 via-navy-900/40 to-navy-800/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-16 lg:py-0">
          {/* ========== LEFT SIDE — TEXT ========== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Copper badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-copper-500/15 border border-copper-500/25 text-copper-400 text-xs font-body font-semibold uppercase tracking-wider">
                <CheckCircle className="w-3.5 h-3.5" />
                Serving Lexington Since 2005
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeInUp}
              className="mt-6 font-display text-white leading-[1.1]"
              style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 4.25rem)" }}
            >
              Your Trusted Partner in{" "}
              <span className="text-gradient-copper">Professional Plumbing</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-warm-300 text-lg sm:text-xl font-body leading-relaxed max-w-xl"
            >
              Residential &amp; commercial plumbing solutions backed by 20+ years
              of expertise. Licensed. Insured. Available 24/7.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/schedule"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base"
              >
                Schedule Service
              </Link>
              <a
                href="tel:8592948080"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-body font-semibold text-white border-2 border-white/30 rounded-md uppercase tracking-wider hover:bg-white/10 hover:border-white/50 transition-all duration-200"
              >
                Call 859.294.8080
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-copper-400"
                >
                  {item.icon}
                  <span className="font-mono text-sm">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ========== RIGHT SIDE — PHOTO COLLAGE ========== */}
          <div className="hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Main large photo */}
              <div className="relative w-full aspect-[4/5] max-w-[420px] ml-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-copper-500/20">
                <Image
                  src={heroImages.main.src}
                  alt={heroImages.main.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 420px"
                  priority
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
              </div>

              {/* Secondary overlapping photo (bottom-left) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-6 -left-6 w-52 h-64 rounded-xl overflow-hidden shadow-xl border-4 border-navy-900"
              >
                <Image
                  src={heroImages.secondary.src}
                  alt={heroImages.secondary.alt}
                  fill
                  className="object-cover"
                  sizes="208px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
              </motion.div>

              {/* Small accent photo (top-left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute top-8 -left-4 w-36 h-36 rounded-xl overflow-hidden shadow-xl border-4 border-navy-900"
              >
                <Image
                  src={heroImages.accent.src}
                  alt={heroImages.accent.alt}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </motion.div>

              {/* Floating badge: Google Rating */}
              <motion.div
                animate={floatAnimation}
                className="absolute -top-4 right-8 bg-white rounded-xl shadow-xl px-4 py-3 border border-warm-200 z-10"
              >
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-copper-500 fill-copper-500" />
                  <span className="font-display text-navy-900 font-bold text-sm">
                    4.9
                  </span>
                </div>
                <p className="text-[10px] font-body text-navy-600 mt-0.5">
                  Google Rating
                </p>
              </motion.div>

              {/* Floating badge: Jobs completed */}
              <motion.div
                animate={floatAnimationDelayed}
                className="absolute bottom-16 -left-10 bg-white rounded-xl shadow-xl px-4 py-3 border border-warm-200 z-10"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-copper-500" />
                  <span className="font-display text-navy-900 font-bold text-sm">
                    1000+
                  </span>
                </div>
                <p className="text-[10px] font-body text-navy-600 mt-0.5">
                  Jobs Completed
                </p>
              </motion.div>

              {/* Decorative copper corner accents */}
              <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-copper-500/40 rounded-tr-2xl pointer-events-none" />
              <div className="absolute -bottom-2 right-20 w-16 h-16 border-b-2 border-l-2 border-copper-500/40 rounded-bl-2xl pointer-events-none" />
            </motion.div>
          </div>

          {/* ========== MOBILE HERO IMAGE ========== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:hidden relative w-full aspect-[16/10] rounded-xl overflow-hidden border-2 border-copper-500/20"
          >
            <Image
              src={heroImages.main.src}
              alt={heroImages.main.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 0vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

            {/* Mobile floating badges */}
            <div className="absolute bottom-4 left-4 flex gap-3">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-copper-500 fill-copper-500" />
                  <span className="font-display text-navy-900 font-bold text-xs">4.9</span>
                </div>
                <p className="text-[9px] font-body text-navy-600">Google Rating</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-copper-500" />
                  <span className="font-display text-navy-900 font-bold text-xs">1000+</span>
                </div>
                <p className="text-[9px] font-body text-navy-600">Jobs Done</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge copper accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-copper-500 via-copper-300 to-copper-500" />
    </section>
  );
}
