"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FileCheck,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  ListChecks,
  TrendingDown,
  Smartphone,
  ChevronDown,
  Phone,
  Calculator,
  DollarSign,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Button from "@/components/ui/Button";

/* ================================================================== */
/*  Metadata (reference for SSR -- move to layout if needed)           */
/* ================================================================== */

// export const metadata = {
//   title: "Financing Options",
//   description: "Flexible financing options for plumbing services in Lexington, KY. Easy online application with competitive rates. Plumbing Systems, Inc.",
// };

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

const steps = [
  {
    icon: <FileCheck className="w-7 h-7" />,
    step: "01",
    title: "Apply",
    description:
      "Complete a quick online application in just a few minutes. No obligation to proceed.",
  },
  {
    icon: <CheckCircle2 className="w-7 h-7" />,
    step: "02",
    title: "Get Approved",
    description:
      "Receive a decision quickly with multiple plan options tailored to your budget.",
  },
  {
    icon: <CreditCard className="w-7 h-7" />,
    step: "03",
    title: "Choose Your Plan",
    description:
      "Select the payment plan that works best for you and get your plumbing service completed.",
  },
];

const benefits = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "No Hard Credit Check",
    description:
      "Pre-qualify without impacting your credit score. A soft inquiry keeps your score safe.",
  },
  {
    icon: <ListChecks className="w-6 h-6" />,
    title: "Multiple Plan Options",
    description:
      "Choose from a variety of payment plans ranging from 3 to 60 months.",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Competitive Rates",
    description:
      "Access affordable interest rates that make plumbing services fit your budget.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Easy Online Application",
    description:
      "Apply from your phone or computer in minutes. Simple, fast, and secure.",
  },
];

const faqItems = [
  {
    question: "What financing options are available?",
    answer:
      "We offer a variety of financing plans through our partnership with Wisetack. Plans range from 3 to 60 months with competitive rates. You can pre-qualify without affecting your credit score.",
  },
  {
    question: "Is there a minimum or maximum amount I can finance?",
    answer:
      "Financing is available for projects starting at $500. Maximum amounts depend on your pre-qualification, but can go up to $25,000 for eligible customers.",
  },
  {
    question: "Will applying affect my credit score?",
    answer:
      "No. Pre-qualifying uses a soft credit inquiry that does not impact your credit score. A hard inquiry only occurs if you choose to accept and finalize a financing plan.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Most customers receive a decision within minutes of submitting their application. In some cases, additional verification may be needed, which can take up to one business day.",
  },
  {
    question: "Can I pay off my balance early?",
    answer:
      "Yes! There are no prepayment penalties. You can pay off your balance early at any time without any additional fees.",
  },
  {
    question: "What if I'm not approved for financing?",
    answer:
      "If you're not approved for financing, we'll work with you to find alternative payment arrangements. We accept cash, check, and all major credit cards. Call us at 859.294.8080 to discuss options.",
  },
];

/* ================================================================== */
/*  Accordion Component                                                */
/* ================================================================== */

function FAQAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={false}
            className={`rounded-lg border transition-colors duration-200 ${
              isOpen
                ? "border-copper-500/30 bg-white shadow-sm"
                : "border-warm-200 bg-warm-50 hover:border-warm-300"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-body text-sm font-semibold text-navy-900">
                {item.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 text-copper-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4">
                    <p className="font-body text-sm text-navy-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/*  Animation Variants                                                 */
/* ================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function FinancingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-warm-50">
        {/* ============ HERO ============ */}
        <section className="relative bg-navy-900 pt-40 pb-16 sm:pt-44 sm:pb-20 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <DollarSign className="w-12 h-12 text-copper-500 mx-auto mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Flexible{" "}
                <span className="text-copper-500">Financing Options</span>
              </h1>
              <p className="font-body text-lg text-warm-100/70 max-w-2xl mx-auto">
                Don&apos;t let unexpected plumbing costs stress you out. We
                offer affordable financing so you can get the service you need
                today.
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-copper-500 via-copper-300 to-copper-500" />
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              How It Works
            </h2>
            <p className="font-body text-navy-600 max-w-xl mx-auto">
              Getting financing for your plumbing project is simple. Just three
              easy steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative text-center"
              >
                {/* Connector line (between cards on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-copper-500/40 to-copper-500/10" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-copper-500/10 to-copper-500/5 border border-copper-500/20 mb-5">
                    <span className="text-copper-500">{step.icon}</span>
                  </div>
                  <span className="font-mono text-xs text-copper-500 font-semibold tracking-widest uppercase mb-2">
                    Step {step.step}
                  </span>
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-navy-600 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ BENEFITS GRID ============ */}
        <section className="bg-navy-900 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
                Why Choose Our Financing?
              </h2>
              <p className="font-body text-warm-100/60 max-w-xl mx-auto">
                We&apos;ve partnered with trusted lenders to bring you the
                best financing experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-xl bg-navy-800 border border-navy-700 p-6 flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-copper-500/15 text-copper-500">
                    {benefit.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-sm text-warm-100/60 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CALCULATOR PLACEHOLDER ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl bg-warm-100 border-2 border-dashed border-warm-300 p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[280px]"
            >
              <Calculator className="w-12 h-12 text-copper-500/50 mb-4" />
              <h3 className="font-display text-xl font-bold text-navy-900 mb-2">
                Monthly Payment Calculator
              </h3>
              <p className="font-body text-sm text-navy-500 max-w-sm">
                Coming Soon &mdash; Calculate your estimated monthly payment
                based on project cost and financing term.
              </p>
            </motion.div>

            {/* Wisetack Embed Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl bg-gradient-to-br from-navy-900 to-navy-800 border border-navy-700 p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[280px]"
            >
              <Sparkles className="w-12 h-12 text-copper-500 mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Pre-Qualify in Minutes
              </h3>
              <p className="font-body text-sm text-warm-100/60 max-w-sm mb-6">
                Financing pre-qualification powered by{" "}
                <span className="font-semibold text-copper-500">Wisetack</span>.
                Check your options with no impact to your credit score.
              </p>
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Check Your Options
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ============ FAQ SECTION ============ */}
        <section className="bg-warm-100 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="font-body text-navy-600">
                Common questions about our financing options.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FAQAccordion items={faqItems} />
            </motion.div>
          </div>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className="bg-gradient-to-br from-copper-500 via-copper-500 to-copper-300 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="font-body text-navy-900/70 mb-8 max-w-xl mx-auto">
                Apply for financing today and get the plumbing service you
                need with affordable monthly payments.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" size="lg" icon={ArrowRight}>
                  Apply for Financing
                </Button>
                <span className="font-body text-navy-900/60 text-sm">or</span>
                <Button
                  as="a"
                  href="tel:8592948080"
                  variant="ghost"
                  size="lg"
                  icon={Phone}
                  className="text-navy-900 hover:bg-navy-900/10"
                >
                  Call 859.294.8080
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
