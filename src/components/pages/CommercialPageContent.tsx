"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Phone,
  ArrowRight,
  Clock,
  Shield,
  Hammer,
  Users,
  Utensils,
  HeartPulse,
  Factory,
  HardHat,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const commercialServices = [
  {
    icon: HardHat,
    title: "Commercial Construction Plumbing",
    description:
      "Full-service plumbing installations for new commercial builds. We work with general contractors and project managers to deliver code-compliant plumbing systems on schedule and within budget. From rough-in to trim-out, we manage every phase of commercial plumbing construction.",
    features: [
      "Blueprint review & value engineering",
      "Rough-in & underground plumbing",
      "Fixture trim-out & final connections",
      "Code compliance & inspection coordination",
    ],
  },
  {
    icon: Hammer,
    title: "Facility Maintenance Programs",
    description:
      "Preventive maintenance keeps your plumbing system running smoothly and avoids costly emergency repairs. Our customized maintenance programs include regular inspections, drain cleaning, water heater service, backflow testing, and more — tailored to your facility's specific needs.",
    features: [
      "Scheduled preventive inspections",
      "Priority emergency response",
      "Detailed maintenance reports",
      "Budget-friendly annual contracts",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Repairs & Service",
    description:
      "When your commercial plumbing needs attention, our team responds quickly to minimize business disruption. We handle everything from leaking pipes and clogged drains to water heater failures and fixture replacements in offices, retail spaces, and multi-tenant buildings.",
    features: [
      "Rapid response times",
      "After-hours service available",
      "Minimal business disruption",
      "Transparent pricing",
    ],
  },
  {
    icon: Utensils,
    title: "Restaurant Plumbing",
    description:
      "Restaurants have unique plumbing demands including grease traps, commercial dishwashers, prep sinks, and high-volume drainage. We understand health department requirements and local codes to keep your kitchen running safely and efficiently.",
    features: [
      "Grease trap installation & cleaning",
      "Commercial dishwasher hookups",
      "Floor drain maintenance",
      "Health code compliance",
    ],
  },
  {
    icon: HeartPulse,
    title: "Medical Facility Plumbing",
    description:
      "Medical and dental offices require specialized plumbing systems that meet strict health and safety standards. We install and maintain medical gas systems, vacuum systems, sterilization equipment connections, and ADA-compliant fixtures.",
    features: [
      "Medical gas line installation",
      "Sterilization equipment connections",
      "ADA-compliant fixture installation",
      "Infection control considerations",
    ],
  },
  {
    icon: Factory,
    title: "Industrial Plumbing Systems",
    description:
      "Industrial facilities require heavy-duty plumbing solutions designed for high-demand environments. We install and service process piping, large-diameter drain lines, industrial water heaters, and specialized systems for manufacturing and warehouse facilities.",
    features: [
      "Process piping installation",
      "High-capacity drain systems",
      "Industrial water heating",
      "Backflow prevention & testing",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-component: Service Card                                        */
/* ------------------------------------------------------------------ */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof commercialServices)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-[#F5F1EC] overflow-hidden hover:shadow-lg hover:border-[#1B3A5C]/20 transition-all duration-300"
    >
      <div className="h-1 bg-gradient-to-r from-[#1B3A5C] to-[#0C1B2A]" />

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1B3A5C]/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#1B3A5C]" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-[#0C1B2A] pt-1">
            {service.title}
          </h3>
        </div>

        <p className="font-body text-[#1B3A5C]/70 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="space-y-2">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#B87333]" />
              <span className="text-sm font-body text-[#0C1B2A] font-medium">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Content Component                                             */
/* ------------------------------------------------------------------ */

export default function CommercialPageContent() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* ========== HERO ========== */}
      <section className="relative bg-[#0C1B2A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1B3A5C]/40 mb-6">
              <Building2 className="w-8 h-8 text-[#D4A574]" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Commercial Plumbing{" "}
              <span className="text-[#B87333]">Services</span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-[#F5F1EC]/70 max-w-2xl mx-auto leading-relaxed">
              Professional plumbing solutions for businesses of all sizes.
              Serving Lexington&apos;s commercial community since 2005.
            </p>

            <div className="flex items-center justify-center gap-2 mt-8 text-sm font-body text-[#F5F1EC]/40">
              <Link href="/" className="hover:text-[#D4A574] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#D4A574] transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-[#D4A574]">Commercial</span>
            </div>
          </motion.div>
        </div>

        <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />
      </section>

      {/* ========== STATS BAR ========== */}
      <section ref={statsRef} className="bg-white border-b border-[#F5F1EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "20+", label: "Years Experience" },
              { value: "M6813", label: "Master License" },
              { value: "24/7", label: "Emergency Service" },
              { value: "100%", label: "Satisfaction Rate" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="font-display text-3xl sm:text-4xl text-[#B87333] mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-[#1B3A5C]/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HIGHLIGHT BANNER ========== */}
      <section className="bg-[#1B3A5C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <Shield className="w-5 h-5 text-[#D4A574]" />
            <p className="font-display text-lg text-white">
              Serving Lexington businesses since{" "}
              <span className="text-[#D4A574]">2005</span> &mdash; Licensed,
              insured, and committed to your success.
            </p>
          </div>
        </div>
      </section>

      {/* ========== SERVICE CARDS ========== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
            Our Commercial{" "}
            <span className="text-[#B87333]">Solutions</span>
          </h2>
          <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
            From new construction to ongoing maintenance, we deliver
            dependable plumbing services that keep your business running.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {commercialServices.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ========== WHY BUSINESSES CHOOSE US ========== */}
      <section className="bg-white border-y border-[#F5F1EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
              Why Businesses{" "}
              <span className="text-[#B87333]">Trust Us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Minimal Downtime",
                description:
                  "We schedule around your business hours and work efficiently to get your plumbing back online fast.",
              },
              {
                icon: Users,
                title: "Dedicated Account Manager",
                description:
                  "One point of contact for all your plumbing needs. We know your facility and your expectations.",
              },
              {
                icon: Shield,
                title: "Fully Licensed & Insured",
                description:
                  "KY Master Plumber License M6813. Full liability insurance and workers comp for your peace of mind.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1B3A5C]/10 mb-4">
                    <Icon className="w-7 h-7 text-[#1B3A5C]" />
                  </div>
                  <h3 className="font-display text-xl text-[#0C1B2A] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-[#1B3A5C]/60 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section ref={ctaRef} className="relative bg-[#0C1B2A] overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
              Let&apos;s Discuss Your{" "}
              <span className="text-[#B87333]">Project</span>
            </h2>
            <p className="font-body text-[#F5F1EC]/70 text-lg mb-8 max-w-xl mx-auto">
              Contact us today for a consultation on your commercial plumbing
              needs. We offer free estimates for new projects.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-body font-semibold text-white bg-gradient-to-r from-[#B87333] to-[#CD8E52] hover:from-[#CD8E52] hover:to-[#B87333] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Request a Consultation
                <ArrowRight className="w-4 h-4" />
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
