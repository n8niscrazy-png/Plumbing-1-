"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Calendar,
  User,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Zap,
  Shield,
  ThumbsUp,
  ClipboardList,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

/* ================================================================== */
/*  Zod Schemas (per step)                                             */
/* ================================================================== */

const step1Schema = z.object({
  serviceType: z.string().min(1, "Please select a service type"),
  urgency: z.enum(["emergency", "urgent", "standard", "flexible"], {
    message: "Please select an urgency level",
  }),
  description: z
    .string()
    .min(10, "Please provide at least 10 characters describing the issue")
    .max(2000, "Description must be 2000 characters or less"),
});

const step2Schema = z.object({
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  alternateDate: z.string().optional(),
});

const step3Schema = z.object({
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
    .regex(/^[\d\s().\-+]{7,20}$/, "Please enter a valid phone number"),
  address: z
    .string()
    .min(1, "Street address is required")
    .max(200, "Address must be 200 characters or less"),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must be 100 characters or less"),
  zipCode: z
    .string()
    .min(1, "Zip code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid zip code"),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type ScheduleFormData = z.infer<typeof fullSchema>;

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

const serviceOptions = [
  { value: "", label: "", disabled: true },
  { value: "drain-cleaning", label: "Drain Cleaning" },
  { value: "water-heater-repair", label: "Water Heater Repair" },
  { value: "water-heater-install", label: "Water Heater Installation" },
  { value: "leak-repair", label: "Leak Detection & Repair" },
  { value: "pipe-repair", label: "Pipe Repair / Replacement" },
  { value: "sewer-line", label: "Sewer Line Service" },
  { value: "water-line", label: "Water Line Service" },
  { value: "fixture-install", label: "Fixture Installation" },
  { value: "garbage-disposal", label: "Garbage Disposal" },
  { value: "backflow", label: "Backflow Prevention" },
  { value: "remodel", label: "Bathroom / Kitchen Remodel" },
  { value: "commercial", label: "Commercial Plumbing" },
  { value: "inspection", label: "Plumbing Inspection" },
  { value: "other", label: "Other" },
];

const urgencyLevels = [
  {
    value: "emergency" as const,
    label: "Emergency",
    description: "Active leak, flooding, or no water",
    color: "text-emergency-500",
    bgColor: "bg-emergency-500/10 border-emergency-500/30",
  },
  {
    value: "urgent" as const,
    label: "Urgent",
    description: "Within 24 hours",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-300",
  },
  {
    value: "standard" as const,
    label: "Standard",
    description: "Within a few days",
    color: "text-navy-700",
    bgColor: "bg-warm-100 border-warm-300",
  },
  {
    value: "flexible" as const,
    label: "Flexible",
    description: "Schedule at your convenience",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
  },
];

const timeOptions = [
  { value: "morning", label: "Morning (8:00 AM - 12:00 PM)" },
  { value: "afternoon", label: "Afternoon (12:00 PM - 4:00 PM)" },
  { value: "evening", label: "Evening (4:00 PM - 7:00 PM)" },
];

const benefits = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Fast Confirmation",
    text: "Receive booking confirmation within 1 hour during business hours.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Licensed Professionals",
    text: "All technicians are licensed and insured for your peace of mind.",
  },
  {
    icon: <ThumbsUp className="w-5 h-5" />,
    title: "Upfront Pricing",
    text: "No hidden fees. You'll know the cost before any work begins.",
  },
  {
    icon: <ClipboardList className="w-5 h-5" />,
    title: "Flexible Scheduling",
    text: "Choose a date and time that works best for your schedule.",
  },
];

const stepLabels = ["Service Details", "Scheduling", "Your Information"];

/* ================================================================== */
/*  Step Schemas Map                                                   */
/* ================================================================== */


/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function SchedulePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
    defaultValues: {
      serviceType: "",
      urgency: undefined,
      description: "",
      preferredDate: "",
      preferredTime: "",
      alternateDate: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  const urgencyValue = watch("urgency");

  /* ---- Step navigation ---- */
  const stepFieldNames: (keyof ScheduleFormData)[][] = [
    ["serviceType", "urgency", "description"],
    ["preferredDate", "preferredTime", "alternateDate"],
    ["firstName", "lastName", "email", "phone", "address", "city", "zipCode"],
  ];

  const handleNext = async () => {
    const fields = stepFieldNames[currentStep];
    const valid = await trigger(fields);
    if (valid) setCurrentStep((s) => Math.min(s + 1, 2));
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (data: ScheduleFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Schedule form submitted:", data);
    setSubmitted(true);
    reset();
  };

  /* ---- Get today's date string for date input min ---- */
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-warm-50">
        {/* ============ HERO ============ */}
        <section className="relative pt-40 pb-16 sm:pt-44 sm:pb-20 overflow-hidden bg-gradient-to-br from-copper-500 via-copper-500 to-copper-300">
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Calendar className="w-12 h-12 text-navy-900/80 mx-auto mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-4">
                Schedule Your Service
              </h1>
              <p className="font-body text-lg text-navy-900/70 max-w-2xl mx-auto">
                Book online or call{" "}
                <a
                  href="tel:8592948080"
                  className="font-mono font-semibold text-navy-900 underline decoration-navy-900/30 underline-offset-2 hover:decoration-navy-900 transition-colors"
                >
                  859.294.8080
                </a>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============ FORM SECTION ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* ---------- FORM ---------- */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl bg-green-50 border border-green-200 p-10 text-center"
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
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      <CheckCircle2 className="w-20 h-20 text-green-500" />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="absolute -top-1 -right-1 w-8 h-8 bg-copper-500 rounded-full flex items-center justify-center"
                      >
                        <Calendar className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                  <h3 className="font-display text-3xl font-bold text-navy-900 mb-3">
                    Service Scheduled!
                  </h3>
                  <p className="font-body text-navy-600 mb-2 max-w-md mx-auto">
                    Thank you for scheduling with Plumbing Systems. We&apos;ll
                    confirm your appointment within 1 hour during business
                    hours.
                  </p>
                  <p className="font-body text-sm text-navy-500 mb-8">
                    A confirmation email has been sent with your appointment
                    details.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentStep(0);
                    }}
                  >
                    Schedule Another Service
                  </Button>
                </motion.div>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                      {stepLabels.map((label, index) => (
                        <div
                          key={label}
                          className="flex items-center gap-2 flex-1"
                        >
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-body font-bold transition-colors duration-300 ${
                              index < currentStep
                                ? "bg-copper-500 text-white"
                                : index === currentStep
                                ? "bg-navy-900 text-white"
                                : "bg-warm-200 text-navy-500"
                            }`}
                          >
                            {index < currentStep ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span
                            className={`hidden sm:inline text-sm font-body font-medium transition-colors ${
                              index <= currentStep
                                ? "text-navy-900"
                                : "text-navy-400"
                            }`}
                          >
                            {label}
                          </span>
                          {index < stepLabels.length - 1 && (
                            <div className="flex-1 h-[2px] mx-2">
                              <div
                                className={`h-full rounded-full transition-colors duration-500 ${
                                  index < currentStep
                                    ? "bg-copper-500"
                                    : "bg-warm-200"
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <AnimatePresence mode="wait">
                      {/* ---- STEP 1: Service Details ---- */}
                      {currentStep === 0 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">
                              Service Details
                            </h2>
                            <p className="font-body text-navy-600 text-sm">
                              Tell us about the plumbing service you need.
                            </p>
                          </div>

                          <Select
                            label="Service Type"
                            placeholder="Select a service..."
                            options={serviceOptions}
                            error={errors.serviceType?.message}
                            {...register("serviceType")}
                          />

                          {/* Urgency */}
                          <fieldset>
                            <legend className="text-sm font-semibold text-navy-900 font-body mb-3">
                              Urgency Level
                            </legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {urgencyLevels.map((level) => (
                                <label
                                  key={level.value}
                                  className={`relative flex items-start gap-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                                    urgencyValue === level.value
                                      ? level.bgColor +
                                        " ring-2 ring-offset-1 ring-copper-500/40"
                                      : "border-warm-200 bg-white hover:border-warm-300"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    value={level.value}
                                    {...register("urgency")}
                                    className="mt-0.5 h-4 w-4 border-2 border-warm-300 text-copper-500 focus:ring-copper-500/30 accent-copper-500"
                                  />
                                  <div>
                                    <span
                                      className={`text-sm font-body font-semibold ${level.color}`}
                                    >
                                      {level.label}
                                    </span>
                                    <p className="text-xs font-body text-navy-500 mt-0.5">
                                      {level.description}
                                    </p>
                                  </div>
                                </label>
                              ))}
                            </div>
                            {errors.urgency?.message && (
                              <p className="mt-1.5 text-xs text-emergency-500 font-body">
                                {errors.urgency.message}
                              </p>
                            )}
                          </fieldset>

                          <Input
                            as="textarea"
                            label="Describe the Issue"
                            placeholder="Please describe your plumbing issue in detail..."
                            rows={4}
                            error={errors.description?.message}
                            {...register("description")}
                          />
                        </motion.div>
                      )}

                      {/* ---- STEP 2: Scheduling ---- */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">
                              Pick a Date &amp; Time
                            </h2>
                            <p className="font-body text-navy-600 text-sm">
                              Choose your preferred appointment window.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input
                              label="Preferred Date"
                              type="date"
                              min={today}
                              leadingIcon={Calendar}
                              error={errors.preferredDate?.message}
                              {...register("preferredDate")}
                            />
                            <Select
                              label="Preferred Time"
                              placeholder="Select a time window..."
                              options={timeOptions}
                              error={errors.preferredTime?.message}
                              {...register("preferredTime")}
                            />
                          </div>

                          <Input
                            label="Alternate Date (Optional)"
                            type="date"
                            min={today}
                            leadingIcon={Calendar}
                            helperText="In case your first choice is unavailable"
                            error={errors.alternateDate?.message}
                            {...register("alternateDate")}
                          />
                        </motion.div>
                      )}

                      {/* ---- STEP 3: Your Information ---- */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="font-display text-2xl font-bold text-navy-900 mb-1">
                              Your Information
                            </h2>
                            <p className="font-body text-navy-600 text-sm">
                              Where should we send the technician?
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input
                              label="First Name"
                              placeholder="John"
                              leadingIcon={User}
                              error={errors.firstName?.message}
                              {...register("firstName")}
                            />
                            <Input
                              label="Last Name"
                              placeholder="Smith"
                              leadingIcon={User}
                              error={errors.lastName?.message}
                              {...register("lastName")}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input
                              label="Email"
                              type="email"
                              placeholder="john@example.com"
                              leadingIcon={Mail}
                              error={errors.email?.message}
                              {...register("email")}
                            />
                            <Input
                              label="Phone"
                              type="tel"
                              placeholder="(859) 555-0123"
                              leadingIcon={Phone}
                              error={errors.phone?.message}
                              {...register("phone")}
                            />
                          </div>

                          <Input
                            label="Street Address"
                            placeholder="834 Winchester Road"
                            leadingIcon={MapPin}
                            error={errors.address?.message}
                            {...register("address")}
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Input
                              label="City"
                              placeholder="Lexington"
                              error={errors.city?.message}
                              {...register("city")}
                            />
                            <Input
                              label="Zip Code"
                              placeholder="40505"
                              error={errors.zipCode?.message}
                              {...register("zipCode")}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-warm-200">
                      {currentStep > 0 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          icon={ChevronLeft}
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 2 ? (
                        <Button
                          type="button"
                          variant="primary"
                          iconRight={ChevronRight}
                          onClick={handleNext}
                        >
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          icon={Calendar}
                          loading={isSubmitting}
                        >
                          Schedule Service
                        </Button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* ---------- SIDEBAR ---------- */}
            <div className="lg:col-span-1 space-y-8">
              {/* Why Schedule Online */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl bg-white border border-warm-200/50 shadow-sm p-6"
              >
                <h3 className="font-display text-lg font-bold text-navy-900 mb-5">
                  Why Schedule Online?
                </h3>
                <ul className="space-y-5">
                  {benefits.map((benefit) => (
                    <li key={benefit.title} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-copper-500/10 text-copper-500">
                        {benefit.icon}
                      </span>
                      <div>
                        <p className="text-sm font-body font-semibold text-navy-900">
                          {benefit.title}
                        </p>
                        <p className="text-xs font-body text-navy-600 mt-0.5 leading-relaxed">
                          {benefit.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Emergency CTA */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl bg-emergency-500/10 border border-emergency-500/20 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-emergency-500" />
                  <h3 className="font-display text-lg font-bold text-emergency-500">
                    Emergency?
                  </h3>
                </div>
                <p className="text-sm font-body text-navy-700 mb-4">
                  For active leaks, flooding, or no water, call us
                  immediately. Our emergency team is available 24/7.
                </p>
                <Button
                  as="a"
                  href="tel:8592948080"
                  variant="emergency"
                  size="md"
                  icon={Phone}
                  className="w-full justify-center"
                >
                  Call 859.294.8080
                </Button>
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl bg-navy-900 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-copper-500" />
                  <h3 className="font-display text-lg font-semibold text-white">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm font-body text-warm-100/70">
                  <div className="flex justify-between">
                    <span>Monday &ndash; Friday</span>
                    <span className="font-mono text-warm-100">
                      8:00 AM &ndash; 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday &ndash; Sunday</span>
                    <span className="font-mono text-warm-100/50">Closed</span>
                  </div>
                  <div className="pt-2 border-t border-navy-700 mt-2">
                    <span className="text-emergency-500 font-semibold">
                      24/7 Emergency Service Available
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
