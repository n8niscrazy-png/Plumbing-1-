"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Pipette,
  Phone,
  ArrowRight,
  CheckCircle2,
  Search,
  FileSearch,
  Wrench,
  ShieldCheck,
  Camera,
  Shovel,
  CircleDot,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: Pipette,
    title: "Sewer Line Repair & Replacement",
    description:
      "Damaged sewer lines cause slow drains, foul odors, and sewage backups. We use advanced camera inspection to pinpoint the issue, then offer the most effective repair solution — whether it is a targeted spot repair, trenchless pipe lining, or full sewer line replacement. Our goal is always to minimize disruption to your property while delivering a long-lasting fix.",
    features: [
      "Video camera inspection & diagnosis",
      "Spot repairs for localized damage",
      "Trenchless pipe lining options",
      "Full sewer line replacement",
      "Root intrusion removal",
      "Post-repair verification testing",
    ],
  },
  {
    icon: CircleDot,
    title: "Water Service Installation",
    description:
      "Whether you need a new water service line from the meter to your building or a replacement for an aging, corroded line, we handle the complete installation process. We work with local utilities, obtain required permits, and use durable modern materials to ensure reliable water delivery for decades to come.",
    features: [
      "New water service line installation",
      "Water line replacement & upgrades",
      "Copper and PEX piping options",
      "Permit acquisition & coordination",
      "Utility coordination & compliance",
      "Pressure testing & verification",
    ],
  },
  {
    icon: Shovel,
    title: "Plumbing Excavation",
    description:
      "Some plumbing repairs require excavation to access underground pipes. Our team uses professional excavation equipment and careful techniques to reach buried water and sewer lines with minimal impact on your landscaping, driveways, and hardscaping. We backfill and grade the area after repairs for a clean finish.",
    features: [
      "Precision locating before digging",
      "Minimally invasive techniques",
      "Driveway & sidewalk restoration",
      "Landscape protection & restoration",
      "Proper compaction & backfill",
      "Underground utility coordination",
    ],
  },
  {
    icon: Camera,
    title: "Camera Inspection",
    description:
      "Our high-definition sewer cameras allow us to see inside your pipes in real time, identifying blockages, cracks, root intrusion, bellied pipe, and other issues without guesswork. Camera inspection is the first step in any sewer repair and can also be valuable for home buyers wanting to assess a property's plumbing condition.",
    features: [
      "HD video pipe inspection",
      "Real-time viewing & recording",
      "Precise locating of damage",
      "Pre-purchase plumbing assessments",
      "Documentation for insurance claims",
      "Follow-up verification after repairs",
    ],
  },
];

const processSteps = [
  {
    icon: Search,
    title: "Inspection",
    description:
      "We begin with a thorough camera inspection of your sewer or water lines to identify the exact location and nature of the problem.",
  },
  {
    icon: FileSearch,
    title: "Diagnosis",
    description:
      "Our technician reviews the inspection findings and explains the issue in clear terms, along with your repair or replacement options and pricing.",
  },
  {
    icon: Wrench,
    title: "Repair / Replace",
    description:
      "We complete the approved work using professional equipment and quality materials, keeping you informed throughout the process.",
  },
  {
    icon: ShieldCheck,
    title: "Verification",
    description:
      "After the repair, we conduct a final camera inspection and pressure test to confirm everything is working properly before we leave.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-component: Service Card                                        */
/* ------------------------------------------------------------------ */

function ServiceDetailCard({
  service,
  index,
}: {
  service: (typeof services)[number];
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
      className="bg-white rounded-2xl border border-[#F5F1EC] overflow-hidden hover:shadow-lg hover:border-[#B87333]/20 transition-all duration-300"
    >
      <div className="h-1 bg-gradient-to-r from-[#B87333] to-[#CD8E52]" />

      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#B87333]/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#B87333]" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-[#0C1B2A] pt-1">
            {service.title}
          </h3>
        </div>

        <p className="font-body text-[#1B3A5C]/70 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

export default function SewerWaterPageContent() {
  const processRef = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-44 lg:pt-48 pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#B87333]/20 mb-6">
              <Pipette className="w-8 h-8 text-[#D4A574]" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Sewer &amp; Water{" "}
              <span className="text-[#B87333]">Line Services</span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-[#F5F1EC]/70 max-w-2xl mx-auto leading-relaxed">
              Expert sewer and water line repair, replacement, and
              installation. We use advanced technology and proven techniques to
              solve underground plumbing problems.
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
              <span className="text-[#D4A574]">Sewer &amp; Water</span>
            </div>
          </motion.div>
        </div>

        <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />
      </section>

      {/* ========== SERVICE CARDS ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
            Our Sewer &amp; Water{" "}
            <span className="text-[#B87333]">Solutions</span>
          </h2>
          <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
            From camera inspection to complete line replacement, we provide
            comprehensive underground plumbing services.
          </p>
        </motion.div>

        <div className="space-y-8">
          {services.map((service, i) => (
            <ServiceDetailCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section ref={processRef} className="bg-white border-y border-[#F5F1EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
              How It <span className="text-[#B87333]">Works</span>
            </h2>
            <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
              Our proven four-step process ensures accurate diagnosis and
              effective, lasting repairs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative text-center"
                >
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#B87333]/40 to-[#B87333]/10" />
                  )}

                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#B87333]/10 mb-4">
                    <Icon className="w-7 h-7 text-[#B87333]" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#B87333] text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-[#0C1B2A] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-[#1B3A5C]/60 leading-relaxed">
                    {step.description}
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
              Need Sewer or Water{" "}
              <span className="text-[#B87333]">Line Service?</span>
            </h2>
            <p className="font-body text-[#F5F1EC]/70 text-lg mb-8 max-w-xl mx-auto">
              Contact us today to schedule a camera inspection or to discuss
              your sewer and water line needs. Free estimates available.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-body font-semibold text-white bg-gradient-to-r from-[#B87333] to-[#CD8E52] hover:from-[#CD8E52] hover:to-[#B87333] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule an Inspection
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
