"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  DollarSign,
  Heart,
  TrendingUp,
  Users,
  Briefcase,
  // Clock,
  MapPin,
  ChevronRight,
  Send,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  Wrench,
  GraduationCap,
  Headphones,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/* ================================================================== */
/*  Metadata (reference for SSR -- move to layout if needed)           */
/* ================================================================== */

// export const metadata = {
//   title: "Careers",
//   description: "Join the Plumbing Systems team in Lexington, KY. We're hiring licensed plumbers, apprentices, and service dispatchers. Competitive pay and benefits.",
// };

/* ================================================================== */
/*  Zod Schema                                                         */
/* ================================================================== */

const applicationSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Name must be 100 characters or less"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s().\-+]{7,20}$/, "Please enter a valid phone number"),
  position: z.string().min(1, "Please select a position"),
  coverLetter: z
    .string()
    .max(3000, "Cover letter must be 3000 characters or less")
    .optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

const benefits = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Competitive Pay",
    description:
      "Above-market wages with performance bonuses, overtime pay, and annual raises based on skill and tenure.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Benefits Package",
    description:
      "Health, dental, and vision insurance. Paid time off, holidays, and retirement plan with company match.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Growth Opportunities",
    description:
      "Continuous training, apprenticeship programs, and clear paths to advance your plumbing career.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Culture",
    description:
      "Join a supportive, family-oriented team that values work-life balance and celebrates success together.",
  },
];

interface JobPosting {
  id: string;
  title: string;
  type: string;
  icon: React.ReactNode;
  description: string;
  requirements: string[];
  highlights: string[];
}

const jobPostings: JobPosting[] = [
  {
    id: "licensed-plumber",
    title: "Licensed Plumber",
    type: "Full Time",
    icon: <Wrench className="w-6 h-6" />,
    description:
      "We're looking for experienced, licensed plumbers to join our growing team. You'll handle residential and commercial service calls, repairs, and installations across Lexington and Central Kentucky.",
    requirements: [
      "Valid Kentucky Journeyman or Master Plumber license",
      "Minimum 3 years of plumbing experience",
      "Valid driver's license with clean driving record",
      "Ability to pass background check and drug screening",
      "Strong customer service and communication skills",
      "Willingness to participate in on-call rotation",
    ],
    highlights: [
      "Company vehicle provided",
      "Tool allowance",
      "Continuing education support",
    ],
  },
  {
    id: "plumbing-apprentice",
    title: "Plumbing Apprentice",
    type: "Full Time",
    icon: <GraduationCap className="w-6 h-6" />,
    description:
      "Launch your plumbing career with a paid apprenticeship. Work alongside experienced master plumbers while earning your license. We invest in your future with hands-on training and classroom education support.",
    requirements: [
      "High school diploma or GED",
      "Strong work ethic and eagerness to learn",
      "Valid driver's license",
      "Ability to lift 50+ lbs and work in various conditions",
      "Basic mechanical aptitude",
      "Reliable transportation",
    ],
    highlights: [
      "Paid training program",
      "License exam preparation",
      "Mentorship from master plumbers",
    ],
  },
  {
    id: "service-dispatcher",
    title: "Service Dispatcher",
    type: "Full Time",
    icon: <Headphones className="w-6 h-6" />,
    description:
      "Coordinate our service team to deliver exceptional customer experiences. You'll be the first point of contact for customers, manage scheduling, and ensure our technicians are dispatched efficiently.",
    requirements: [
      "2+ years of dispatching or customer service experience",
      "Excellent phone and communication skills",
      "Proficiency with scheduling software and computers",
      "Ability to multitask in a fast-paced environment",
      "Strong organizational and problem-solving skills",
      "Familiarity with the plumbing or trades industry is a plus",
    ],
    highlights: [
      "Office-based position",
      "Regular business hours",
      "Team leadership opportunities",
    ],
  },
];

const positionOptions = [
  { value: "licensed-plumber", label: "Licensed Plumber" },
  { value: "plumbing-apprentice", label: "Plumbing Apprentice" },
  { value: "service-dispatcher", label: "Service Dispatcher" },
  { value: "other", label: "Other / General Application" },
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

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Application submitted:", data);
    setSubmitted(true);
    reset();
  };

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
              <Briefcase className="w-12 h-12 text-copper-500 mx-auto mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Join Our <span className="text-copper-500">Team</span>
              </h1>
              <p className="font-body text-lg text-warm-100/70 max-w-2xl mx-auto">
                Build your career with Lexington&apos;s trusted plumbing
                company. We&apos;re looking for talented professionals to
                grow with us.
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-copper-500 via-copper-300 to-copper-500" />
        </section>

        {/* ============ WHY WORK HERE ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              Why Work at Plumbing Systems?
            </h2>
            <p className="font-body text-navy-600 max-w-xl mx-auto">
              We invest in our people because they are the foundation of our
              success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-xl bg-white border border-warm-200/50 shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-copper-500/10 text-copper-500 mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm text-navy-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ CURRENT OPENINGS ============ */}
        <section className="bg-warm-100 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
                Current Openings
              </h2>
              <p className="font-body text-navy-600 max-w-xl mx-auto">
                Explore our available positions and find the right fit for
                your skills and career goals.
              </p>
            </motion.div>

            <div className="space-y-6">
              {jobPostings.map((job, index) => (
                <motion.div
                  key={job.id}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-xl bg-white border border-warm-200/50 shadow-sm overflow-hidden"
                >
                  {/* Copper accent bar */}
                  <div className="h-1 bg-gradient-to-r from-copper-500 to-copper-300" />

                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy-900 text-copper-500">
                          {job.icon}
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-navy-900">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="default" size="sm" dot>
                              {job.type}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs font-body text-navy-500">
                              <MapPin className="w-3 h-3" />
                              Lexington, KY
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        as="a"
                        href="#apply"
                        variant="primary"
                        size="sm"
                        iconRight={ChevronRight}
                      >
                        Apply Now
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="font-body text-sm text-navy-600 leading-relaxed mb-5">
                      {job.description}
                    </p>

                    {/* Requirements */}
                    <div className="mb-5">
                      <h4 className="font-body text-sm font-semibold text-navy-900 mb-3">
                        Requirements:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {job.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm font-body text-navy-600"
                          >
                            <ChevronRight className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-warm-200">
                      {job.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-body font-medium text-green-700"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ APPLICATION FORM ============ */}
        <section id="apply" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              Apply Today
            </h2>
            <p className="font-body text-navy-600 max-w-xl mx-auto">
              Fill out the form below to start your application. We&apos;ll
              review your information and get back to you within 2 business
              days.
            </p>
          </motion.div>

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
                className="flex justify-center mb-4"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">
                Application Submitted!
              </h3>
              <p className="font-body text-navy-600 mb-6">
                Thank you for your interest in joining Plumbing Systems. Our
                team will review your application and contact you within 2
                business days.
              </p>
              <Button
                variant="primary"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl bg-white border border-warm-200/50 shadow-sm p-6 sm:p-8 space-y-6"
              noValidate
            >
              <Input
                label="Full Name"
                placeholder="John Smith"
                leadingIcon={User}
                error={errors.name?.message}
                {...register("name")}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  leadingIcon={Mail}
                  error={errors.email?.message}
                  {...register("email")}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(859) 555-0123"
                  leadingIcon={Phone}
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </div>

              <Select
                label="Position"
                placeholder="Select a position..."
                options={positionOptions}
                error={errors.position?.message}
                {...register("position")}
              />

              {/* Resume Upload Placeholder */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-navy-900 font-body">
                  Resume
                </label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-warm-300 bg-warm-100/50 p-8 text-center hover:border-copper-500/40 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center">
                    <FileText className="w-8 h-8 text-copper-500/50 mb-2" />
                    <p className="font-body text-sm text-navy-700 font-medium">
                      Upload your resume
                    </p>
                    <p className="font-body text-xs text-navy-500 mt-1">
                      PDF, DOC, or DOCX (max 5 MB)
                    </p>
                    <p className="font-mono text-xs text-navy-400 mt-2">
                      File upload coming soon
                    </p>
                  </div>
                </div>
              </div>

              <Input
                as="textarea"
                label="Cover Letter (Optional)"
                placeholder="Tell us why you're interested in joining Plumbing Systems and what makes you a great fit..."
                rows={5}
                error={errors.coverLetter?.message}
                {...register("coverLetter")}
              />

              <div className="pt-4 border-t border-warm-200">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  loading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Submit Application
                </Button>
                <p className="font-body text-xs text-navy-500 mt-3">
                  By submitting this application, you confirm that the
                  information provided is accurate and complete.
                </p>
              </div>
            </motion.form>
          )}
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
