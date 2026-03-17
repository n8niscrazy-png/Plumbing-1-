"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Wrench,
  Building2,
  AlertTriangle,
  Flame,
  Droplets,
  Pipette,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ServiceCard {
  title: string;
  description: string;
  icon: LucideIcon;
  secondaryIcon?: LucideIcon;
  href: string;
  emergency?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services: ServiceCard[] = [
  {
    title: "Residential Plumbing",
    description:
      "From routine repairs to complete repiping, we keep your home's plumbing running perfectly.",
    icon: Home,
    secondaryIcon: Wrench,
    href: "/services/residential",
  },
  {
    title: "Commercial Plumbing",
    description:
      "Full-service commercial plumbing for businesses, restaurants, and medical facilities.",
    icon: Building2,
    href: "/services/commercial",
  },
  {
    title: "Emergency Service",
    description:
      "24/7 emergency plumbing when you need it most. Fast response guaranteed.",
    icon: AlertTriangle,
    href: "/services/emergency",
    emergency: true,
  },
  {
    title: "Water Heaters",
    description:
      "Traditional and tankless water heater repair, installation, and replacement.",
    icon: Flame,
    href: "/services/water-heaters",
  },
  {
    title: "Drain Cleaning",
    description:
      "Professional drain cleaning and clog removal for any drain in your home or business.",
    icon: Droplets,
    href: "/services/drain-cleaning",
  },
  {
    title: "Sewer & Water Lines",
    description:
      "Sewer line repair, replacement, and new water service installation.",
    icon: Pipette,
    href: "/services/sewer-water",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ServiceGrid() {
  return (
    <section className="relative bg-warm-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-navy-950 copper-underline-partial inline-block">
            Our Services
          </h2>
          <p className="mt-6 text-warm-600 font-body text-lg max-w-2xl mx-auto">
            Comprehensive plumbing solutions for every need
          </p>
        </motion.div>

        {/* Service cards grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={`group relative bg-warm-50 rounded-lg p-6 lg:p-8 border transition-all duration-300 ${
                  service.emergency
                    ? "border-emergency-500/30 hover:border-emergency-500/60 hover:shadow-lg hover:shadow-emergency-500/10"
                    : "border-warm-200 hover:border-copper-400/50 hover:shadow-lg hover:shadow-copper-500/10"
                }`}
              >
                {/* Emergency accent bar */}
                {service.emergency && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emergency-500 via-emergency-400 to-emergency-500 rounded-t-lg" />
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${
                    service.emergency
                      ? "bg-emergency-500/15 text-emergency-500"
                      : "bg-gradient-to-br from-copper-500 to-copper-400 text-white"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-navy-950 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-warm-600 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Link */}
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-body font-semibold transition-colors duration-200 ${
                    service.emergency
                      ? "text-emergency-500 hover:text-emergency-600"
                      : "text-copper-500 hover:text-copper-700"
                  }`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Services button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
