"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Star,
  Phone,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Shield,
  Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overallRating = 4.9;
const totalReviews = 287;

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    service: "Water Heater Replacement",
    date: "January 2025",
    text: "Our water heater died on a Sunday morning and Plumbing Systems had a technician at our house within two hours. They replaced the entire unit the same day. The price was fair and the installer was professional, clean, and explained everything. Could not ask for a better experience.",
  },
  {
    name: "James T.",
    rating: 5,
    service: "Sewer Line Repair",
    date: "December 2024",
    text: "After three other companies gave us wildly different diagnoses, Plumbing Systems did a camera inspection and showed us exactly what was wrong. Their price was the most reasonable and the work was completed in one day. The sewer line has been running perfectly since. Highly recommend.",
  },
  {
    name: "Linda K.",
    rating: 5,
    service: "Kitchen Remodel Plumbing",
    date: "November 2024",
    text: "We used Plumbing Systems for all the plumbing work during our kitchen renovation. They relocated the sink, installed a new dishwasher line, and added a pot filler faucet. Everything was done on time and looks fantastic. Great attention to detail.",
  },
  {
    name: "Robert D.",
    rating: 5,
    service: "Emergency Pipe Repair",
    date: "October 2024",
    text: "A pipe burst in our basement at 11 PM on a weeknight. I called Plumbing Systems and they answered immediately. A plumber arrived within 45 minutes, stopped the leak, and made a permanent repair. They even helped us with the water cleanup. Lifesavers.",
  },
  {
    name: "Patricia H.",
    rating: 5,
    service: "Whole House Repiping",
    date: "September 2024",
    text: "We had our entire home repiped with PEX after years of low water pressure from old galvanized pipes. The crew was incredibly organized — they finished in under two days and the difference in water pressure is night and day. Very impressed with the quality of work.",
  },
  {
    name: "David W.",
    rating: 4,
    service: "Drain Cleaning",
    date: "August 2024",
    text: "Called for a clogged kitchen drain that nothing from the hardware store could fix. The technician cleared it quickly with professional equipment and gave us tips to prevent future clogs. Fair pricing and good communication. Would use them again.",
  },
  {
    name: "Karen S.",
    rating: 5,
    service: "Tankless Water Heater Install",
    date: "July 2024",
    text: "Plumbing Systems installed a tankless water heater in our home and it has been a game-changer. Endless hot water and our gas bill actually went down. The installation was clean and professional. They even handled the permit. Five stars all around.",
  },
  {
    name: "Michael R.",
    rating: 5,
    service: "Commercial Maintenance",
    date: "June 2024",
    text: "We have used Plumbing Systems for our restaurant plumbing for the last three years. Their maintenance program keeps everything running smoothly and when we have had issues, they respond quickly. They understand the urgency of keeping a restaurant operational.",
  },
  {
    name: "Jennifer L.",
    rating: 5,
    service: "Slab Leak Repair",
    date: "May 2024",
    text: "We noticed a warm spot on our floor and Plumbing Systems identified a slab leak within an hour of arriving. They explained our options clearly and rerouted the leaking line above the slab. The repair has been solid and our water bill went back to normal. Excellent service.",
  },
  {
    name: "Thomas B.",
    rating: 5,
    service: "Backflow Testing",
    date: "April 2024",
    text: "Quick, professional backflow testing and certification. The technician was on time, completed the work efficiently, and filed the paperwork with the city. Simple and hassle-free. Will continue using Plumbing Systems for our annual testing.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-component: Star Rating                                         */
/* ------------------------------------------------------------------ */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-[#B87333] fill-[#B87333]"
              : "text-[#F5F1EC] fill-[#F5F1EC]"
          }`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-component: Review Card                                         */
/* ------------------------------------------------------------------ */

function ReviewCard({
  review,
  index,
}: {
  review: (typeof reviews)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-[#F5F1EC] p-6 hover:shadow-lg hover:border-[#B87333]/20 transition-all duration-300"
    >
      <Quote className="w-8 h-8 text-[#B87333]/20 mb-3" />
      <StarRating rating={review.rating} />
      <p className="font-body text-[#1B3A5C]/70 leading-relaxed mt-4 mb-5 text-sm">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="border-t border-[#F5F1EC] pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-base text-[#0C1B2A]">{review.name}</p>
            <p className="font-body text-xs text-[#B87333] font-medium">{review.service}</p>
          </div>
          <p className="font-body text-xs text-[#1B3A5C]/40">{review.date}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Content Component                                             */
/* ------------------------------------------------------------------ */

export default function ReviewsPageContent() {
  const overallRef = useRef<HTMLDivElement>(null);
  const overallInView = useInView(overallRef, { once: true, margin: "-60px" });
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
              <Star className="w-4 h-4 fill-[#D4A574]" />
              {totalReviews} Verified Reviews
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Customer{" "}
              <span className="text-[#B87333]">Reviews</span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-[#F5F1EC]/70 max-w-2xl mx-auto leading-relaxed">
              See what Lexington homeowners and businesses have to say about
              their experience with Plumbing Systems, Inc.
            </p>

            <div className="flex items-center justify-center gap-2 mt-8 text-sm font-body text-[#F5F1EC]/40">
              <Link href="/" className="hover:text-[#D4A574] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#D4A574]">Reviews</span>
            </div>
          </motion.div>
        </div>

        <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />
      </section>

      {/* ========== OVERALL RATING ========== */}
      <section ref={overallRef} className="bg-white border-b border-[#F5F1EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={overallInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
          >
            <div className="text-center">
              <div className="font-display text-6xl sm:text-7xl text-[#0C1B2A] leading-none">
                {overallRating}
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(overallRating)
                        ? "text-[#B87333] fill-[#B87333]"
                        : "text-[#F5F1EC] fill-[#F5F1EC]"
                    }`}
                  />
                ))}
              </div>
              <p className="font-body text-sm text-[#1B3A5C]/60 mt-1">out of 5 stars</p>
            </div>

            <div className="hidden sm:block w-px h-20 bg-[#F5F1EC]" />

            <div className="flex gap-8 text-center">
              <div>
                <div className="font-display text-3xl text-[#B87333]">{totalReviews}</div>
                <p className="font-body text-sm text-[#1B3A5C]/60">Total Reviews</p>
              </div>
              <div>
                <div className="font-display text-3xl text-[#B87333]">98%</div>
                <p className="font-body text-sm text-[#1B3A5C]/60">Recommend</p>
              </div>
              <div>
                <div className="font-display text-3xl text-[#B87333]">20+</div>
                <p className="font-body text-sm text-[#1B3A5C]/60">Years Trusted</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={overallInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mt-8"
          >
            <a
              href="https://www.google.com/maps/place/Plumbing+Systems+Inc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAFAF8] border border-[#F5F1EC] text-sm font-body font-medium text-[#1B3A5C] hover:border-[#B87333]/30 hover:bg-[#B87333]/5 transition-all duration-200"
            >
              <Star className="w-4 h-4 text-[#B87333] fill-[#B87333]" />
              See Our Reviews on Google
              <ExternalLink className="w-3.5 h-3.5 text-[#1B3A5C]/40" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ========== TRUST SIGNALS ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: ThumbsUp, text: "Every review is from a verified customer" },
            { icon: Shield, text: "Licensed Master Plumber M6813" },
            { icon: MessageSquare, text: "We respond to every review personally" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#F5F1EC]"
              >
                <Icon className="w-5 h-5 text-[#B87333] flex-shrink-0" />
                <span className="font-body text-sm text-[#1B3A5C]/70">{item.text}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========== REVIEWS GRID ========== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>
      </section>

      {/* ========== SHARE YOUR EXPERIENCE ========== */}
      <section className="bg-white border-y border-[#F5F1EC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MessageSquare className="w-12 h-12 text-[#B87333]/40 mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl text-[#0C1B2A] mb-4">
              Share Your{" "}
              <span className="text-[#B87333]">Experience</span>
            </h2>
            <p className="font-body text-[#1B3A5C]/70 max-w-lg mx-auto mb-8">
              We appreciate your feedback. If you have used our services, we
              would love to hear about your experience. Your reviews help
              other Lexington residents find a plumber they can trust.
            </p>
            <a
              href="https://www.google.com/maps/place/Plumbing+Systems+Inc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-body font-semibold text-white bg-gradient-to-r from-[#B87333] to-[#CD8E52] hover:from-[#CD8E52] hover:to-[#B87333] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Leave a Review on Google
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
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
              Ready to Experience the{" "}
              <span className="text-[#B87333]">Difference?</span>
            </h2>
            <p className="font-body text-[#F5F1EC]/70 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of satisfied customers across Lexington. Schedule
              your service today and see why our clients keep coming back.
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
