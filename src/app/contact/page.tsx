"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

import {
  MapPin,
  Phone,
  Clock,
  Shield,
  Mail,
  Send,
  CheckCircle2,
  User,
  MessageSquare,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

/* ================================================================== */
/*  Metadata (exported for Next.js)                                    */
/* ================================================================== */

// Note: metadata must be exported from a Server Component or a
// separate metadata.ts file in App Router when using "use client".
// We include the object here for reference; move to a layout or
// generateMetadata helper if SSR metadata is needed.

/* ================================================================== */
/*  Zod Schema                                                         */
/* ================================================================== */

const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s().\-+]{7,20}$/,
      "Please enter a valid phone number"
    ),
  serviceType: z.string().min(1, "Please select a service type"),
  preferredContact: z.enum(["phone", "email", "text"], {
    message: "Please select a preferred contact method",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be 2000 characters or less"),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

const serviceOptions = [
  { value: "residential", label: "Residential Plumbing" },
  { value: "commercial", label: "Commercial Plumbing" },
  { value: "emergency", label: "Emergency Service" },
  { value: "water-heater", label: "Water Heater" },
  { value: "drain-cleaning", label: "Drain Cleaning" },
  { value: "sewer-line", label: "Sewer & Water Line" },
  { value: "remodel", label: "Remodel / New Construction" },
  { value: "other", label: "Other" },
];

const contactMethods = [
  { value: "phone" as const, label: "Phone" },
  { value: "email" as const, label: "Email" },
  { value: "text" as const, label: "Text" },
];

/* ================================================================== */
/*  Animation Variants                                                 */
/* ================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ================================================================== */
/*  Contact Info Cards                                                 */
/* ================================================================== */

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function ContactCard({ icon, title, children, delay = 0 }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-start gap-4 rounded-lg bg-warm-50 border border-warm-200/50 p-5 shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-copper-500/10 text-copper-500">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-sm font-semibold text-navy-900 mb-1">
          {title}
        </h3>
        <div className="text-sm font-body text-navy-700 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceType: "",
      preferredContact: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form submitted:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-warm-50">
        {/* ============ HERO ============ */}
        <section className="relative bg-navy-900 pt-40 pb-16 sm:pt-44 sm:pb-20 overflow-hidden">
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Contact <span className="text-copper-500">Us</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-body text-lg text-warm-100/70 max-w-2xl mx-auto"
            >
              Have a question or need service? Reach out to our team and
              we&apos;ll get back to you as soon as possible.
            </motion.p>
          </div>
          {/* Copper divider */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-copper-500 via-copper-300 to-copper-500" />
        </section>

        {/* ============ MAIN CONTENT ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ---------- LEFT: Contact Form (60%) ---------- */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="font-body text-navy-600 mb-8">
                  Fill out the form below and a member of our team will be in
                  touch shortly.
                </p>
              </motion.div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg bg-green-50 border border-green-200 p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="flex justify-center mb-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="font-body text-navy-600 mb-6">
                    Thank you for reaching out. We&apos;ll respond within one
                    business day.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div variants={fadeUp} custom={0}>
                      <Input
                        label="First Name"
                        placeholder="John"
                        leadingIcon={User}
                        error={errors.firstName?.message}
                        {...register("firstName")}
                      />
                    </motion.div>
                    <motion.div variants={fadeUp} custom={1}>
                      <Input
                        label="Last Name"
                        placeholder="Smith"
                        leadingIcon={User}
                        error={errors.lastName?.message}
                        {...register("lastName")}
                      />
                    </motion.div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div variants={fadeUp} custom={2}>
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        leadingIcon={Mail}
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </motion.div>
                    <motion.div variants={fadeUp} custom={3}>
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="(859) 555-0123"
                        leadingIcon={Phone}
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                    </motion.div>
                  </div>

                  {/* Service Type */}
                  <motion.div variants={fadeUp} custom={4}>
                    <Select
                      label="Service Type"
                      placeholder="Select a service..."
                      options={serviceOptions}
                      error={errors.serviceType?.message}
                      {...register("serviceType")}
                    />
                  </motion.div>

                  {/* Preferred Contact Method */}
                  <motion.div variants={fadeUp} custom={5}>
                    <fieldset>
                      <legend className="text-sm font-semibold text-navy-900 font-body mb-3">
                        Preferred Contact Method
                      </legend>
                      <div className="flex flex-wrap gap-4">
                        {contactMethods.map((method) => (
                          <label
                            key={method.value}
                            className="flex items-center gap-2 cursor-pointer group"
                          >
                            <input
                              type="radio"
                              value={method.value}
                              {...register("preferredContact")}
                              className="h-4 w-4 border-2 border-warm-300 text-copper-500 focus:ring-copper-500/30 focus:ring-2 accent-copper-500"
                            />
                            <span className="text-sm font-body text-navy-700 group-hover:text-navy-900 transition-colors">
                              {method.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.preferredContact?.message && (
                        <p className="mt-1.5 text-xs text-emergency-500 font-body">
                          {errors.preferredContact.message}
                        </p>
                      )}
                    </fieldset>
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp} custom={6}>
                    <Input
                      as="textarea"
                      label="Message"
                      placeholder="Tell us about your plumbing needs..."
                      leadingIcon={MessageSquare}
                      rows={5}
                      error={errors.message?.message}
                      {...register("message")}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp} custom={7}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={Send}
                      loading={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </div>

            {/* ---------- RIGHT: Contact Info (40%) ---------- */}
            <div className="lg:col-span-2 space-y-5">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mb-6"
              >
                Get In Touch
              </motion.h2>

              <ContactCard
                icon={<MapPin className="w-5 h-5" />}
                title="Address"
                delay={0.1}
              >
                <a
                  href="https://maps.google.com/?q=834+Winchester+Road+Lexington+KY+40505"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-copper-500 transition-colors underline decoration-copper-500/30 underline-offset-2"
                >
                  834 Winchester Road
                  <br />
                  Lexington, KY 40505
                </a>
              </ContactCard>

              <ContactCard
                icon={<Phone className="w-5 h-5" />}
                title="Phone"
                delay={0.2}
              >
                <a
                  href="tel:8592948080"
                  className="font-mono text-copper-500 hover:text-copper-700 transition-colors text-base font-semibold"
                >
                  859.294.8080
                </a>
              </ContactCard>

              <ContactCard
                icon={<Clock className="w-5 h-5" />}
                title="Business Hours"
                delay={0.3}
              >
                <p>Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM</p>
                <p className="mt-1 text-emergency-500 font-semibold">
                  24/7 Emergency Service Available
                </p>
              </ContactCard>

              <ContactCard
                icon={<Shield className="w-5 h-5" />}
                title="License"
                delay={0.4}
              >
                <p>
                  Kentucky Master Plumber License{" "}
                  <span className="font-mono font-semibold text-navy-900">
                    M6813
                  </span>
                </p>
              </ContactCard>

              <ContactCard
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                delay={0.5}
              >
                <a
                  href="mailto:info@plumbingsystemslex.net"
                  className="hover:text-copper-500 transition-colors underline decoration-copper-500/30 underline-offset-2"
                >
                  info@plumbingsystemslex.net
                </a>
              </ContactCard>

              {/* Emergency CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="rounded-lg bg-emergency-500/10 border border-emergency-500/20 p-5"
              >
                <h3 className="font-display text-lg font-bold text-emergency-500 mb-2">
                  Plumbing Emergency?
                </h3>
                <p className="text-sm font-body text-navy-700 mb-3">
                  Don&apos;t wait &mdash; call us immediately for 24/7
                  emergency plumbing service.
                </p>
                <Button
                  as="a"
                  href="tel:8592948080"
                  variant="emergency"
                  size="md"
                  icon={Phone}
                >
                  Call 859.294.8080
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============ MAP PLACEHOLDER ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl bg-navy-800 h-72 sm:h-96 flex flex-col items-center justify-center overflow-hidden"
          >
            <MapPin className="w-12 h-12 text-copper-500/50 mb-4" />
            <p className="font-display text-xl font-semibold text-warm-100/60">
              Map Coming Soon
            </p>
            <p className="font-body text-sm text-warm-100/40 mt-2">
              834 Winchester Road, Lexington, KY 40505
            </p>
            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-copper-500/30 rounded-tl" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-copper-500/30 rounded-tr" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-copper-500/30 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-copper-500/30 rounded-br" />
          </motion.div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
