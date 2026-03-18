"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Home,
  Building2,
  AlertTriangle,
  Wrench,
  ArrowRight,
  Phone,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  {
    id: "residential",
    title: "Residential Plumbing",
    href: "/services/residential",
    icon: Home,
    description:
      "Comprehensive plumbing solutions for your home. From minor repairs to complete repiping, our licensed plumbers deliver reliable results you can count on.",
    accent: "from-[#B87333] to-[#CD8E52]",
    accentBg: "bg-[#B87333]/10",
    accentText: "text-[#B87333]",
    services: [
      "Fixture Repairs & Installation",
      "Toilet & Faucet Installation",
      "Water Heater Repair & Install",
      "Tankless Water Heater Systems",
      "Drain Cleaning & Clearing",
      "Backflow Testing & Prevention",
      "Water Line Repairs",
      "PEX Repiping",
      "Slab Leak Detection & Repair",
      "Sump Pump Installation",
    ],
  },
  {
    id: "commercial",
    title: "Commercial Plumbing",
    href: "/services/commercial",
    icon: Building2,
    description:
      "Reliable plumbing services for businesses of all sizes. We minimize downtime and keep your operations flowing smoothly with professional-grade solutions.",
    accent: "from-[#1B3A5C] to-[#0C1B2A]",
    accentBg: "bg-[#1B3A5C]/10",
    accentText: "text-[#1B3A5C]",
    services: [
      "Commercial Construction Plumbing",
      "Facility Maintenance Programs",
      "Commercial Repairs & Service",
      "Restaurant Plumbing",
      "Medical Facility Plumbing",
      "Industrial Plumbing Systems",
    ],
  },
  {
    id: "emergency",
    title: "24/7 Emergency Services",
    href: "/services/emergency",
    icon: AlertTriangle,
    description:
      "Plumbing emergencies don't wait, and neither do we. Our team is available around the clock to handle urgent plumbing issues when you need help most.",
    accent: "from-[#C42B2B] to-[#DC4545]",
    accentBg: "bg-[#C42B2B]/10",
    accentText: "text-[#C42B2B]",
    services: [
      "Emergency Plumbing Repairs",
      "Burst Pipe Repair",
      "Gas Leak Detection & Repair",
      "Sewage Backup Cleanup",
      "No Hot Water Restoration",
    ],
  },
  {
    id: "specialty",
    title: "Specialty Services",
    href: "/services/sewer-water",
    icon: Wrench,
    description:
      "Specialized plumbing work requiring advanced expertise and equipment. From sewer line installation to new construction, we handle the most demanding projects.",
    accent: "from-[#B87333] to-[#1B3A5C]",
    accentBg: "bg-[#B87333]/10",
    accentText: "text-[#B87333]",
    services: [
      "Sewer & Water Service Installation",
      "Plumbing Excavation",
      "New Construction Plumbing",
      "Remodeling & Renovation Plumbing",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ------------------------------------------------------------------ */
/*  Sub-component: Category Card                                       */
/* ------------------------------------------------------------------ */

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = category.icon;
  const isEmergency = category.id === "emergency";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      id={category.id}
      className="scroll-mt-32"
    >
      <div
        className={`relative rounded-2xl border overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
          isEmergency
            ? "border-[#C42B2B]/20 bg-white"
            : "border-[#F5F1EC] bg-white"
        }`}
      >
        {/* Top accent bar */}
        <div className={`h-1 bg-gradient-to-r ${category.accent}`} />

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${category.accentBg}`}
            >
              <Icon className={`w-7 h-7 ${category.accentText}`} />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-[#0C1B2A]">
                {category.title}
              </h2>
              {isEmergency && (
                <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full bg-[#C42B2B]/10 text-[#C42B2B] text-xs font-body font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#C42B2B] animate-pulse" />
                  Available 24/7
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-[#1B3A5C]/70 leading-relaxed mb-8 max-w-2xl">
            {category.description}
          </p>

          {/* Service items grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
          >
            {category.services.map((service) => (
              <motion.div
                key={service}
                variants={itemVariants}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAF8] hover:bg-[#F5F1EC] transition-colors group"
              >
                <CheckCircle2
                  className={`w-4 h-4 flex-shrink-0 ${
                    isEmergency ? "text-[#C42B2B]" : "text-[#B87333]"
                  }`}
                />
                <span className="text-sm font-body text-[#0C1B2A] font-medium group-hover:text-[#1B3A5C]">
                  {service}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Category CTA */}
          <Link
            href={category.href}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold text-sm transition-all duration-300 group ${
              isEmergency
                ? "bg-[#C42B2B] text-white hover:bg-[#A82424] shadow-md hover:shadow-lg"
                : "bg-gradient-to-r from-[#B87333] to-[#CD8E52] text-white hover:from-[#CD8E52] hover:to-[#B87333] shadow-md hover:shadow-lg"
            }`}
          >
            {isEmergency ? "Emergency Service" : "Learn More"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {isEmergency && (
            <a
              href="tel:8592948080"
              className="inline-flex items-center gap-2 ml-4 px-6 py-3 rounded-lg font-mono font-semibold text-sm border-2 border-[#C42B2B] text-[#C42B2B] hover:bg-[#C42B2B] hover:text-white transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              859.294.8080
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Content Component                                             */
/* ------------------------------------------------------------------ */

export default function ServicesPageContent() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* ========== HERO ========== */}
      <section className="relative bg-[#0C1B2A] overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-44 lg:pt-48 pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B87333]/20 text-[#D4A574] text-sm font-body font-medium mb-6">
              <Wrench className="w-4 h-4" />
              Licensed Master Plumber M6813
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Our Plumbing{" "}
              <span className="text-[#B87333]">Services</span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-[#F5F1EC]/70 max-w-2xl mx-auto leading-relaxed">
              Comprehensive plumbing solutions for homes and businesses
              throughout Lexington, KY. From routine maintenance to complex
              installations, we deliver professional results every time.
            </p>

            {/* Quick anchor nav */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B3A5C]/50 text-white/80 hover:bg-[#B87333]/30 hover:text-[#D4A574] text-sm font-body font-medium transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                    {cat.title.replace("24/7 ", "")}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Copper divider */}
        <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />
      </section>

      {/* ========== CATEGORY SECTIONS ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="space-y-12 lg:space-y-16">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section ref={ctaRef} className="relative bg-[#0C1B2A] overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />

        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
              Ready to Get{" "}
              <span className="text-[#B87333]">Started?</span>
            </h2>
            <p className="font-body text-[#F5F1EC]/70 text-lg mb-8 max-w-xl mx-auto">
              Contact us today for a free estimate or to schedule your next
              plumbing service. We serve the entire Lexington metro area.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-body font-semibold text-white bg-gradient-to-r from-[#B87333] to-[#CD8E52] hover:from-[#CD8E52] hover:to-[#B87333] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule Service
                <ChevronRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:8592948080"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-mono font-semibold text-[#D4A574] border-2 border-[#B87333]/40 hover:bg-[#B87333]/10 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                859.294.8080
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
