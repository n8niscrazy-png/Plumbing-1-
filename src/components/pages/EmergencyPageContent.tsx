"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  AlertTriangle,
  Phone,
  Clock,
  Droplets,
  Flame,
  ShowerHead,
  CheckCircle2,
  Shield,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const emergencyTypes = [
  {
    icon: Droplets,
    title: "Burst Pipes",
    description:
      "A burst pipe can release gallons of water per minute, causing severe damage to floors, walls, and belongings. We respond immediately to stop the flow, make emergency repairs, and help you minimize water damage.",
  },
  {
    icon: Flame,
    title: "Gas Leaks",
    description:
      "If you smell gas, leave your home immediately and call us. Gas leaks are extremely dangerous. Our licensed plumbers are trained in gas line detection, repair, and safety protocols to protect your family.",
  },
  {
    icon: AlertTriangle,
    title: "Sewage Backups",
    description:
      "Raw sewage backing up into your home is a health hazard that requires immediate professional attention. We identify the blockage, clear the line, and sanitize the affected area to restore safe conditions.",
  },
  {
    icon: ShowerHead,
    title: "No Hot Water",
    description:
      "Waking up to no hot water is more than an inconvenience — it can indicate a water heater failure that may lead to leaks or flooding. We diagnose and repair water heater emergencies the same day.",
  },
  {
    icon: Droplets,
    title: "Emergency Plumbing Repairs",
    description:
      "From overflowing toilets to sudden leaks under sinks, any plumbing failure that threatens your property or safety warrants emergency service. We handle all urgent repairs with the urgency they demand.",
  },
];

const emergencySteps = [
  {
    step: 1,
    title: "Shut Off the Water",
    description:
      "Locate and turn off the main water shutoff valve to your home. This is typically near your water meter or where the main line enters your house. Stopping the water flow prevents additional damage.",
  },
  {
    step: 2,
    title: "Call Us Immediately",
    description:
      "Dial 859.294.8080 — our emergency line is staffed 24 hours a day, 7 days a week. Describe the problem so we can dispatch the right technician with the right equipment.",
  },
  {
    step: 3,
    title: "Protect Your Property",
    description:
      "Move furniture, electronics, and valuables away from standing water. Place towels or buckets to contain leaks. If you smell gas, leave the building and do not operate any electrical switches.",
  },
  {
    step: 4,
    title: "We Arrive & Resolve",
    description:
      "Our licensed emergency plumber arrives promptly, assesses the situation, and performs the necessary repairs to restore safety and function to your plumbing system.",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Content Component                                             */
/* ------------------------------------------------------------------ */

export default function EmergencyPageContent() {
  const typesRef = useRef<HTMLDivElement>(null);
  const typesInView = useInView(typesRef, { once: true, margin: "-60px" });
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-60px" });
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
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C42B2B]/20 text-[#FF6B6B] text-sm font-body font-semibold mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C42B2B] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C42B2B]" />
              </span>
              24/7 Emergency Service Available
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Emergency Plumbing{" "}
              <span className="text-[#C42B2B]">Services</span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-[#F5F1EC]/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Plumbing emergencies demand immediate attention. Our licensed
              technicians are available around the clock to handle urgent
              repairs and protect your property.
            </p>

            <motion.a
              href="tel:8592948080"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#C42B2B] text-white font-mono text-2xl sm:text-3xl font-bold shadow-xl shadow-[#C42B2B]/30 hover:bg-[#A82424] hover:shadow-2xl transition-all duration-300"
            >
              <Phone className="w-8 h-8" />
              Call Now: 859.294.8080
            </motion.a>

            <div className="flex items-center justify-center gap-2 mt-10 text-sm font-body text-[#F5F1EC]/40">
              <Link href="/" className="hover:text-[#D4A574] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#D4A574] transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-[#C42B2B]">Emergency</span>
            </div>
          </motion.div>
        </div>

        <div className="h-[3px] bg-gradient-to-r from-[#C42B2B] via-[#DC4545] to-[#C42B2B]" />
      </section>

      {/* ========== RESPONSE TIME PROMISE ========== */}
      <section className="bg-[#C42B2B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Clock className="w-6 h-6 text-white" />
            <p className="font-display text-lg sm:text-xl text-white">
              Fast Response Times &mdash; We understand that every minute
              counts during a plumbing emergency.
            </p>
          </div>
        </div>
      </section>

      {/* ========== WHAT CONSTITUTES AN EMERGENCY ========== */}
      <section ref={typesRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={typesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
            What Constitutes a Plumbing{" "}
            <span className="text-[#C42B2B]">Emergency?</span>
          </h2>
          <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
            If any of these situations describe what you are experiencing, do
            not wait — call us immediately for emergency service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyTypes.map((type, i) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                animate={typesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[#F5F1EC] p-6 hover:border-[#C42B2B]/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-1 w-12 rounded-full bg-[#C42B2B] mb-5" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C42B2B]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#C42B2B]" />
                  </div>
                  <h3 className="font-display text-lg text-[#0C1B2A]">
                    {type.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-[#1B3A5C]/70 leading-relaxed">
                  {type.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="tel:8592948080"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#C42B2B] text-white font-mono text-xl font-bold shadow-lg shadow-[#C42B2B]/20 hover:bg-[#A82424] hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-6 h-6" />
            859.294.8080
          </a>
        </div>
      </section>

      {/* ========== WHAT TO DO STEPS ========== */}
      <section ref={stepsRef} className="bg-white border-y border-[#F5F1EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
              What to Do in a Plumbing{" "}
              <span className="text-[#C42B2B]">Emergency</span>
            </h2>
            <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
              Follow these steps to protect your property while you wait for
              our emergency technician to arrive.
            </p>
          </motion.div>

          <div className="space-y-6">
            {emergencySteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-5 sm:gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#C42B2B] text-white flex items-center justify-center font-display text-xl font-bold shadow-md">
                    {item.step}
                  </div>
                  {i < emergencySteps.length - 1 && (
                    <div className="w-0.5 h-full mx-auto bg-[#C42B2B]/20 mt-2" />
                  )}
                </div>

                <div className="pb-6">
                  <h3 className="font-display text-xl text-[#0C1B2A] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-[#1B3A5C]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TRUST SIGNALS ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Licensed & Insured", text: "KY Master Plumber License M6813" },
            { icon: Clock, title: "Available 24/7", text: "Nights, weekends, and holidays" },
            { icon: CheckCircle2, title: "No Surprises", text: "Upfront pricing before work begins" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-xl bg-white border border-[#F5F1EC]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C42B2B]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#C42B2B]" />
                </div>
                <div>
                  <h3 className="font-display text-base text-[#0C1B2A]">{item.title}</h3>
                  <p className="font-body text-sm text-[#1B3A5C]/60">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========== GIANT CTA ========== */}
      <section ref={ctaRef} className="relative bg-[#C42B2B] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
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
            <AlertTriangle className="w-16 h-16 text-white/80 mx-auto mb-6" />

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Plumbing Emergency?
            </h2>
            <p className="font-body text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Do not wait for the damage to get worse. Call us now and our
              emergency technician will be on the way.
            </p>

            <a
              href="tel:8592948080"
              className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl bg-white text-[#C42B2B] font-mono text-3xl sm:text-4xl font-bold shadow-2xl hover:bg-[#FAFAF8] transition-all duration-300"
            >
              <Phone className="w-10 h-10" />
              859.294.8080
            </a>

            <p className="mt-6 font-body text-white/60 text-sm">
              Available 24 hours a day, 7 days a week, 365 days a year
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
