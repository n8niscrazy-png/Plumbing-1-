"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronDown,
  CheckCircle2,
  Phone,
  Shield,
  Clock,
  Award,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    title: "Fixture Repairs & Installation",
    description:
      "Leaky faucets, running toilets, and worn-out fixtures waste water and drive up your utility bills. Our technicians diagnose issues quickly and provide long-lasting repairs or expert replacements using quality fixtures from trusted brands. We handle sinks, bathtubs, showers, garbage disposals, and outdoor spigots.",
  },
  {
    title: "Toilet & Faucet Installation",
    description:
      "Upgrade your bathroom or kitchen with professionally installed toilets and faucets. We carry and install all major brands including Kohler, Moen, Delta, and American Standard. Our installations include proper sealing, connection testing, and cleanup so your new fixtures perform flawlessly from day one.",
  },
  {
    title: "Water Heater Repair & Installation",
    description:
      "Whether your water heater is leaking, producing lukewarm water, or has stopped working entirely, we can help. We service and install all types of standard tank water heaters from 30 to 80 gallons. Our technicians will assess your household needs and recommend the right size and model for optimal efficiency.",
  },
  {
    title: "Tankless Water Heater Systems",
    description:
      "Enjoy endless hot water and lower energy bills with a tankless water heater. These compact units heat water on demand, eliminating the energy waste of keeping a large tank hot around the clock. We handle full installation including gas line modifications, venting, and electrical connections as needed.",
  },
  {
    title: "Drain Cleaning & Clearing",
    description:
      "Slow or clogged drains are more than an inconvenience — they can lead to backups and water damage. We use professional-grade drain snakes, hydro-jetting equipment, and camera inspection to locate and eliminate blockages. From kitchen sinks to main sewer lines, we restore full flow and prevent future problems.",
  },
  {
    title: "Backflow Testing & Prevention",
    description:
      "Protect your drinking water from contamination with certified backflow testing and prevention device installation. Required by local code for many properties, backflow preventers ensure water flows in only one direction. We are licensed to test, certify, repair, and install all types of backflow prevention assemblies.",
  },
  {
    title: "Water Line Repairs",
    description:
      "Low water pressure, discolored water, or unexplained wet spots in your yard can indicate a water line problem. We locate and repair water line leaks using minimally invasive techniques whenever possible. For severely damaged lines, we offer complete water line replacement with durable modern materials.",
  },
  {
    title: "PEX Repiping",
    description:
      "If your home has aging galvanized steel or polybutylene pipes, repiping with PEX (cross-linked polyethylene) is a smart investment. PEX is flexible, corrosion-resistant, and delivers better water pressure. We can repipe your entire home with minimal wall disruption, typically completing the project in one to two days.",
  },
  {
    title: "Slab Leak Detection & Repair",
    description:
      "Slab leaks occur when pipes beneath your home's concrete foundation develop cracks or holes. Signs include unexplained high water bills, warm spots on floors, or the sound of running water. We use electronic leak detection equipment to pinpoint the exact location and offer several repair options including spot repair, rerouting, and epoxy lining.",
  },
  {
    title: "Sump Pump Installation & Repair",
    description:
      "Protect your basement or crawl space from flooding with a reliable sump pump system. We install primary sump pumps, battery backup systems, and combination units. If your existing pump is cycling too frequently, making unusual noises, or failing to keep up during heavy rain, we can diagnose and repair or replace it.",
  },
];

const trustPoints = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "KY Master Plumber License M6813. Fully bonded and insured for your protection.",
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    description: "We respect your time with scheduled arrival windows and prompt communication.",
  },
  {
    icon: Award,
    title: "Quality Workmanship",
    description: "Every job is completed to code with quality materials and backed by our warranty.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "We stand behind our work. If you are not satisfied, we will make it right.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-component: Accordion Item                                      */
/* ------------------------------------------------------------------ */

function AccordionItem({
  service,
  isOpen,
  onToggle,
  index,
}: {
  service: (typeof services)[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
    >
      <div
        className={`border rounded-xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? "border-[#B87333]/30 shadow-md bg-white"
            : "border-[#F5F1EC] bg-white hover:border-[#B87333]/20 hover:shadow-sm"
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2
              className={`w-5 h-5 flex-shrink-0 transition-colors ${
                isOpen ? "text-[#B87333]" : "text-[#B87333]/50 group-hover:text-[#B87333]"
              }`}
            />
            <h3
              className={`font-display text-lg sm:text-xl transition-colors ${
                isOpen ? "text-[#0C1B2A]" : "text-[#0C1B2A] group-hover:text-[#1B3A5C]"
              }`}
            >
              {service.title}
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 flex-shrink-0 text-[#B87333] transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <div className="pl-8 border-l-2 border-[#B87333]/20">
                  <p className="font-body text-[#1B3A5C]/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Content Component                                             */
/* ------------------------------------------------------------------ */

export default function ResidentialPageContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whyRef = useRef<HTMLDivElement>(null);
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });
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
              <Home className="w-8 h-8 text-[#D4A574]" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Residential Plumbing{" "}
              <span className="text-[#B87333]">Services</span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-[#F5F1EC]/70 max-w-2xl mx-auto leading-relaxed">
              Complete home plumbing solutions from Lexington&apos;s trusted
              professionals. We keep your home comfortable and your plumbing
              running smoothly.
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mt-8 text-sm font-body text-[#F5F1EC]/40">
              <Link href="/" className="hover:text-[#D4A574] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#D4A574] transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-[#D4A574]">Residential</span>
            </div>
          </motion.div>
        </div>

        <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />
      </section>

      {/* ========== SERVICES ACCORDION ========== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
            What We <span className="text-[#B87333]">Offer</span>
          </h2>
          <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
            Click on any service below to learn more about how we can help
            with your home plumbing needs.
          </p>
        </motion.div>

        <div className="space-y-3">
          {services.map((service, i) => (
            <AccordionItem
              key={service.title}
              service={service}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section
        ref={whyRef}
        className="bg-white border-y border-[#F5F1EC]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
              Why Choose <span className="text-[#B87333]">Plumbing Systems?</span>
            </h2>
            <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
              For over 20 years, Lexington homeowners have trusted us with
              their plumbing needs. Here is what sets us apart.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-6 rounded-xl bg-[#FAFAF8] border border-[#F5F1EC] hover:border-[#B87333]/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#B87333]/10 mb-4">
                    <Icon className="w-6 h-6 text-[#B87333]" />
                  </div>
                  <h3 className="font-display text-lg text-[#0C1B2A] mb-2">
                    {point.title}
                  </h3>
                  <p className="font-body text-sm text-[#1B3A5C]/60 leading-relaxed">
                    {point.description}
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
              Schedule Your{" "}
              <span className="text-[#B87333]">Service Today</span>
            </h2>
            <p className="font-body text-[#F5F1EC]/70 text-lg mb-8 max-w-xl mx-auto">
              Ready to solve your plumbing problem? Contact us for a free
              estimate or to book an appointment at a time that works for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-body font-semibold text-white bg-gradient-to-r from-[#B87333] to-[#CD8E52] hover:from-[#CD8E52] hover:to-[#B87333] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule Service
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
