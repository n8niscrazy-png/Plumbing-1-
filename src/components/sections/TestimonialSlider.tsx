"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Lexington, KY",
    service: "Emergency Repair",
    rating: 5,
    text: "Our basement flooded at 2 AM and Plumbing Systems was there within 45 minutes. They fixed the burst pipe quickly and even helped with the initial cleanup. Truly lifesavers!",
  },
  {
    id: 2,
    name: "James & Linda Carter",
    location: "Fayette County, KY",
    service: "Water Heater Installation",
    rating: 5,
    text: "They replaced our old water heater with a tankless system. The installation was clean, professional, and they walked us through everything. Our energy bills have dropped noticeably.",
  },
  {
    id: 3,
    name: "Dr. Robert Chen",
    location: "Lexington, KY",
    service: "Commercial Plumbing",
    rating: 5,
    text: "We hired Plumbing Systems for our dental office build-out. Their attention to code compliance and the quality of their work was outstanding. Highly recommend for any commercial project.",
  },
  {
    id: 4,
    name: "Maria Gonzalez",
    location: "Jessamine County, KY",
    service: "Drain Cleaning",
    rating: 5,
    text: "Had a persistent kitchen drain clog that two other companies couldn't fix. Plumbing Systems used a camera inspection, found the real issue, and resolved it the same day. Fair pricing too.",
  },
  {
    id: 5,
    name: "Tom Richardson",
    location: "Scott County, KY",
    service: "Sewer Line Repair",
    rating: 4,
    text: "Our sewer line had root intrusion causing backups. They gave us an honest assessment and completed the repair ahead of schedule. The yard restoration was better than expected.",
  },
  {
    id: 6,
    name: "Angela Foster",
    location: "Woodford County, KY",
    service: "Residential Remodel",
    rating: 5,
    text: "We remodeled two bathrooms and the kitchen with Plumbing Systems. From planning to the final walk-through, they were communicative, on time, and the craftsmanship is beautiful.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-copper-500 fill-copper-500"
              : "text-warm-300"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="flex-shrink-0 w-[340px] sm:w-[380px] bg-warm-50 rounded-lg border border-warm-200 p-6 lg:p-7 snap-start"
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-copper-300 mb-4" />

      {/* Review text */}
      <p className="font-body text-navy-800 text-sm leading-relaxed mb-5 line-clamp-5">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Star rating */}
      <StarRating rating={testimonial.rating} />

      {/* Customer info */}
      <div className="mt-4 pt-4 border-t border-warm-200">
        <p className="font-display text-navy-950 text-sm font-semibold">
          {testimonial.name}
        </p>
        <p className="font-body text-warm-600 text-xs mt-0.5">
          {testimonial.location}
        </p>
      </div>

      {/* Service badge */}
      <span className="inline-block mt-3 px-2.5 py-1 text-[10px] font-body font-semibold uppercase tracking-wider text-copper-700 bg-copper-500/10 border border-copper-500/20 rounded-full">
        {testimonial.service}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TestimonialSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const cardWidth = 400;
      el.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
      // Check scroll position after animation
      setTimeout(checkScrollPosition, 400);
    },
    [checkScrollPosition]
  );

  return (
    <section className="relative bg-warm-100 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10"
        >
          <div>
            <h2 className="font-display text-navy-950 copper-underline-partial inline-block">
              What Our Customers Say
            </h2>
            <p className="mt-5 text-warm-600 font-body text-lg max-w-lg">
              Real reviews from real homeowners and businesses across Central
              Kentucky.
            </p>
          </div>

          {/* Desktop navigation arrows */}
          <div className="hidden sm:flex items-center gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-warm-300 flex items-center justify-center text-navy-700 hover:bg-copper-500 hover:text-white hover:border-copper-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy-700 disabled:hover:border-warm-300 transition-all duration-200"
              aria-label="Scroll testimonials left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-warm-300 flex items-center justify-center text-navy-700 hover:bg-copper-500 hover:text-white hover:border-copper-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy-700 disabled:hover:border-warm-300 transition-all duration-200"
              aria-label="Scroll testimonials right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Testimonial cards scroll container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-track-warm-200 scrollbar-thumb-copper-400"
            style={{ scrollbarWidth: "thin" }}
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </motion.div>

        {/* See All Reviews link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/reviews"
            className="text-copper-500 hover:text-copper-700 font-body font-semibold text-sm uppercase tracking-wider transition-colors duration-200"
          >
            See All Reviews &rarr;
          </Link>
        </motion.div>

        {/* Average rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 border border-warm-200 shadow-sm">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-copper-500 fill-copper-500"
                />
              ))}
            </div>
            <div className="h-5 w-px bg-warm-300" />
            <span className="font-display text-navy-950 font-bold text-lg">
              4.9
            </span>
            <span className="font-body text-warm-600 text-sm">
              Average Rating
            </span>
          </div>
          <p className="hidden sm:block font-body text-warm-500 text-sm">
            Based on 200+ Google Reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}
