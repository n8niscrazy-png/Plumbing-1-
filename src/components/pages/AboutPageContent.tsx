"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Heart,
  Award,
  Clock,
  Users,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  Building2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We believe in honest communication, transparent pricing, and doing the right thing — even when no one is watching. Every estimate is accurate, every recommendation is genuine, and we never upsell services you do not need.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We use quality materials from trusted manufacturers and follow industry best practices on every job. Our work meets or exceeds all applicable building codes, and we stand behind every project with our workmanship guarantee.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description:
      "When we say we will be there, we will be there. We respect your time with scheduled arrival windows, clear communication, and efficient work practices. Our clients count on us because we consistently deliver on our promises.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "Lexington is our home. We are proud to serve our neighbors and support the community that has supported us for over two decades. We believe in building lasting relationships, not just fixing pipes.",
  },
];

const credentials = [
  { icon: BadgeCheck, title: "Kentucky Master Plumber License", detail: "License M6813" },
  { icon: Shield, title: "Fully Insured", detail: "General liability & workers compensation coverage" },
  { icon: Award, title: "Backflow Certified", detail: "Licensed to test, repair, and install backflow preventers" },
  { icon: CheckCircle2, title: "Code Compliant", detail: "All work meets or exceeds Kentucky plumbing code requirements" },
  { icon: Building2, title: "Commercial & Residential", detail: "Licensed for both residential and commercial plumbing work" },
  { icon: Clock, title: "Continuing Education", detail: "Team stays current with the latest plumbing techniques and codes" },
];

const serviceAreas = [
  "Lexington", "Georgetown", "Nicholasville", "Richmond", "Winchester",
  "Versailles", "Paris", "Frankfort", "Danville", "Berea", "Mt. Sterling", "Surrounding Areas",
];

/* ------------------------------------------------------------------ */
/*  Main Content Component                                             */
/* ------------------------------------------------------------------ */

export default function AboutPageContent() {
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-60px" });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px" });
  const credRef = useRef<HTMLDivElement>(null);
  const credInView = useInView(credRef, { once: true, margin: "-60px" });
  const areaRef = useRef<HTMLDivElement>(null);
  const areaInView = useInView(areaRef, { once: true, margin: "-60px" });
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-60px" });
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B87333]/20 text-[#D4A574] text-sm font-body font-medium mb-6">
              <Shield className="w-4 h-4" />
              Serving Lexington Since 2005
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              About{" "}
              <span className="text-[#B87333]">Plumbing Systems, Inc.</span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-[#F5F1EC]/70 max-w-2xl mx-auto leading-relaxed">
              A locally owned and operated plumbing company built on
              integrity, quality craftsmanship, and a genuine commitment to
              our customers and community.
            </p>

            <div className="flex items-center justify-center gap-2 mt-8 text-sm font-body text-[#F5F1EC]/40">
              <Link href="/" className="hover:text-[#D4A574] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#D4A574]">About</span>
            </div>
          </motion.div>
        </div>

        <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />
      </section>

      {/* ========== COMPANY STORY ========== */}
      <section ref={storyRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-2">
              Our <span className="text-[#B87333]">Story</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#B87333] to-[#CD8E52] rounded-full mx-auto mt-4" />
          </div>

          <div className="space-y-6 font-body text-[#1B3A5C]/80 leading-relaxed text-lg">
            <p>
              Plumbing Systems, Inc. was founded in 2005 with a simple
              mission: to provide Lexington, Kentucky with honest, reliable
              plumbing services at fair prices. What started as a small
              operation has grown into one of Central Kentucky&apos;s most
              trusted plumbing companies — but our core values have never
              changed.
            </p>
            <p>
              For over 20 years, we have been the plumber that Lexington
              homeowners and businesses call when they need the job done right
              the first time. We have built our reputation one customer at a
              time, earning trust through consistent quality workmanship,
              transparent communication, and a genuine commitment to customer
              satisfaction.
            </p>
            <p>
              As a licensed Master Plumber (License M6813), our team brings
              deep expertise to every project — from straightforward faucet
              repairs to complex commercial installations and emergency
              services. We invest in ongoing training and modern equipment to
              ensure we can handle any plumbing challenge efficiently and
              effectively.
            </p>
            <p>
              We are proud to call Lexington home. Our technicians live and
              work in this community, and we treat every customer&apos;s
              property with the same care and respect we would give our own.
              When you call Plumbing Systems, you are not just hiring a
              plumber — you are partnering with a team that genuinely cares
              about your home and your experience.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 p-8 rounded-2xl bg-white border border-[#F5F1EC]">
            {[
              { value: "2005", label: "Founded" },
              { value: "20+", label: "Years Experience" },
              { value: "M6813", label: "Master License" },
              { value: "24/7", label: "Emergency Service" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={storyInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-2xl sm:text-3xl text-[#B87333] mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-[#1B3A5C]/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== VALUES ========== */}
      <section ref={valuesRef} className="bg-white border-y border-[#F5F1EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
              Our <span className="text-[#B87333]">Values</span>
            </h2>
            <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
              These are the principles that guide everything we do, from the
              first phone call to the final handshake.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] border border-[#F5F1EC] hover:border-[#B87333]/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#B87333]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#B87333]" />
                    </div>
                    <h3 className="font-display text-xl text-[#0C1B2A]">
                      {value.title}
                    </h3>
                  </div>
                  <p className="font-body text-[#1B3A5C]/70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CREDENTIALS ========== */}
      <section ref={credRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={credInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
            Credentials &amp;{" "}
            <span className="text-[#B87333]">Certifications</span>
          </h2>
          <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
            Your peace of mind matters. Here are the licenses, insurance, and
            certifications that back our work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((cred, i) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 20 }}
                animate={credInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#F5F1EC] hover:border-[#B87333]/20 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#B87333]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#B87333]" />
                </div>
                <div>
                  <h3 className="font-display text-base text-[#0C1B2A] mb-0.5">
                    {cred.title}
                  </h3>
                  <p className="font-body text-sm text-[#1B3A5C]/60">
                    {cred.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========== SERVICE AREA ========== */}
      <section ref={areaRef} className="bg-white border-y border-[#F5F1EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={areaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
              Service <span className="text-[#B87333]">Area</span>
            </h2>
            <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
              We proudly serve Lexington and the surrounding Central Kentucky
              communities.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={areaInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAFAF8] border border-[#F5F1EC] text-sm font-body text-[#0C1B2A] font-medium hover:border-[#B87333]/30 hover:bg-[#B87333]/5 transition-all duration-200"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B87333]" />
                {area}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="font-body text-sm text-[#1B3A5C]/50">
              Not sure if we serve your area? Give us a call and we will let
              you know.
            </p>
          </div>
        </div>
      </section>

      {/* ========== TEAM SECTION ========== */}
      <section ref={teamRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
            Our <span className="text-[#B87333]">Team</span>
          </h2>
          <p className="font-body text-[#1B3A5C]/70 max-w-xl mx-auto">
            Our skilled team of licensed plumbers is the backbone of Plumbing
            Systems, Inc. Each technician brings years of experience and a
            commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-[#F5F1EC] overflow-hidden"
            >
              <div className="aspect-square bg-gradient-to-br from-[#F5F1EC] to-[#FAFAF8] flex items-center justify-center">
                <Users className="w-12 h-12 text-[#B87333]/30" />
              </div>
              <div className="p-4 text-center">
                <div className="h-4 w-24 mx-auto rounded bg-[#F5F1EC] mb-2" />
                <div className="h-3 w-20 mx-auto rounded bg-[#F5F1EC]/60" />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-6 font-body text-sm text-[#1B3A5C]/40 italic">
          Team photos coming soon. We are proud of every member of our team.
        </p>
      </section>

      {/* ========== CTA ========== */}
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
              Ready to Work With{" "}
              <span className="text-[#B87333]">Lexington&apos;s Best?</span>
            </h2>
            <p className="font-body text-[#F5F1EC]/70 text-lg mb-8 max-w-xl mx-auto">
              Whether you need a small repair or a major installation, we are
              here to help. Contact us today to experience the Plumbing
              Systems difference.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-body font-semibold text-white bg-gradient-to-r from-[#B87333] to-[#CD8E52] hover:from-[#CD8E52] hover:to-[#B87333] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
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
