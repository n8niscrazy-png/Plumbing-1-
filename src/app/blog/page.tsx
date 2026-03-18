"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Send,
  BookOpen,
  Tag,
  Flame,
  Snowflake,
  Zap,
  Phone as PhoneIcon,
  Home,
  ClipboardList,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

/* ================================================================== */
/*  Metadata (reference for SSR -- move to layout if needed)           */
/* ================================================================== */

// export const metadata = {
//   title: "Plumbing Tips & Insights",
//   description: "Expert plumbing tips, maintenance guides, and industry insights from Plumbing Systems, Inc. in Lexington, KY.",
// };

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  icon: React.ReactNode;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "signs-replace-water-heater",
    title: "5 Signs You Need to Replace Your Water Heater",
    excerpt:
      "Is your water heater on its last legs? Learn the key warning signs that indicate it's time for a replacement, from inconsistent temperatures to rising energy bills and visible corrosion.",
    category: "Water Heaters",
    date: "January 15, 2026",
    readTime: "5 min read",
    icon: <Flame className="w-5 h-5" />,
  },
  {
    id: 2,
    slug: "prevent-frozen-pipes-winter",
    title: "How to Prevent Frozen Pipes This Winter",
    excerpt:
      "Kentucky winters can be harsh on your plumbing. Discover proven strategies to protect your pipes from freezing, including insulation tips and what to do if you suspect a frozen pipe.",
    category: "Maintenance",
    date: "December 8, 2025",
    readTime: "4 min read",
    icon: <Snowflake className="w-5 h-5" />,
  },
  {
    id: 3,
    slug: "guide-tankless-water-heaters",
    title: "The Complete Guide to Tankless Water Heaters",
    excerpt:
      "Considering a tankless water heater? This comprehensive guide covers the pros and cons, installation costs, energy savings, and whether going tankless is right for your home.",
    category: "Water Heaters",
    date: "November 22, 2025",
    readTime: "7 min read",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 4,
    slug: "when-call-emergency-plumber",
    title: "When to Call an Emergency Plumber",
    excerpt:
      "Not every plumbing issue is an emergency, but some situations require immediate attention. Learn which problems warrant an after-hours call and which can wait until business hours.",
    category: "Emergency",
    date: "October 30, 2025",
    readTime: "4 min read",
    icon: <PhoneIcon className="w-5 h-5" />,
  },
  {
    id: 5,
    slug: "understanding-home-plumbing-system",
    title: "Understanding Your Home's Plumbing System",
    excerpt:
      "A homeowner's guide to how your plumbing system works. Learn about supply lines, drain-waste-vent systems, water heaters, and how everything connects to keep your home running smoothly.",
    category: "Education",
    date: "October 12, 2025",
    readTime: "8 min read",
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: 6,
    slug: "commercial-plumbing-maintenance-checklist",
    title: "Commercial Plumbing Maintenance Checklist",
    excerpt:
      "Keep your commercial property's plumbing in top condition with this seasonal maintenance checklist. Prevent costly repairs and minimize downtime with proactive care.",
    category: "Commercial",
    date: "September 18, 2025",
    readTime: "6 min read",
    icon: <ClipboardList className="w-5 h-5" />,
  },
];

const popularTopics = [
  "Water Heaters",
  "Drain Cleaning",
  "Emergency Plumbing",
  "Pipe Repair",
  "Kitchen Plumbing",
  "Bathroom Remodel",
  "Sewer Lines",
  "Maintenance Tips",
  "Commercial",
  "Tankless",
];

/* ================================================================== */
/*  Animation Variants                                                 */
/* ================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function BlogPage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      console.log("Newsletter signup:", newsletterEmail);
      setNewsletterSubmitted(true);
      setNewsletterEmail("");
    }
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
              <BookOpen className="w-12 h-12 text-copper-500 mx-auto mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Plumbing Tips{" "}
                <span className="text-copper-500">&amp; Insights</span>
              </h1>
              <p className="font-body text-lg text-warm-100/70 max-w-2xl mx-auto">
                Expert advice and helpful guides from our team of licensed
                plumbers in Lexington, KY.
              </p>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-copper-500 via-copper-300 to-copper-500" />
        </section>

        {/* ============ BLOG CONTENT ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* ---------- BLOG POSTS GRID ---------- */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="group rounded-xl bg-warm-50 border border-warm-200/50 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Image placeholder */}
                    <div className="relative aspect-[16/9] bg-navy-800 flex items-center justify-center">
                      <span className="text-copper-500/50">{post.icon}</span>
                      {/* Copper accent on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-copper-500 to-copper-300 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Category & Date */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="default" size="sm">
                          {post.category}
                        </Badge>
                        <span className="text-xs font-body text-navy-500">
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-lg font-bold text-navy-900 mb-2 group-hover:text-copper-500 transition-colors leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="font-body text-sm text-navy-600 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Date & Read More */}
                      <div className="flex items-center justify-between pt-3 border-t border-warm-200">
                        <div className="flex items-center gap-1.5 text-xs font-body text-navy-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-body font-semibold text-copper-500 hover:text-copper-700 transition-colors"
                        >
                          Read More
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* ---------- SIDEBAR ---------- */}
            <div className="lg:col-span-1 space-y-8">
              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl bg-navy-900 p-6"
              >
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Newsletter
                </h3>
                <p className="font-body text-sm text-warm-100/60 mb-5">
                  Get plumbing tips and seasonal maintenance reminders
                  delivered to your inbox.
                </p>

                {newsletterSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Send className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    <p className="font-body text-sm font-semibold text-white">
                      You&apos;re subscribed!
                    </p>
                    <p className="font-body text-xs text-warm-100/50 mt-1">
                      Check your inbox for a welcome email.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={newsletterEmail}
                      onChange={(e) =>
                        setNewsletterEmail(
                          (e as React.ChangeEvent<HTMLInputElement>).target.value
                        )
                      }
                      className="bg-navy-800 border-navy-700 text-white placeholder:text-warm-100/30 focus:border-copper-500"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      icon={Send}
                      className="w-full justify-center"
                    >
                      Subscribe
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Popular Topics */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl bg-white border border-warm-200/50 shadow-sm p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-copper-500" />
                  <h3 className="font-display text-lg font-bold text-navy-900">
                    Popular Topics
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map((topic) => (
                    <Link
                      key={topic}
                      href={`/blog?topic=${encodeURIComponent(topic.toLowerCase())}`}
                      className="inline-block rounded-full bg-warm-100 border border-warm-200 px-3 py-1.5 text-xs font-body font-medium text-navy-700 hover:bg-copper-500/10 hover:border-copper-500/30 hover:text-copper-700 transition-colors"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl bg-gradient-to-br from-copper-500 to-copper-300 p-6"
              >
                <h3 className="font-display text-lg font-bold text-navy-900 mb-2">
                  Need a Plumber?
                </h3>
                <p className="font-body text-sm text-navy-900/70 mb-4">
                  Our licensed team is ready to help with any plumbing
                  issue &mdash; big or small.
                </p>
                <div className="space-y-2">
                  <Button
                    as="a"
                    href="/schedule"
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center"
                  >
                    Schedule Service
                  </Button>
                  <Button
                    as="a"
                    href="tel:8592948080"
                    variant="ghost"
                    size="sm"
                    icon={PhoneIcon}
                    className="w-full justify-center text-navy-900 hover:bg-navy-900/10"
                  >
                    859.294.8080
                  </Button>
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
