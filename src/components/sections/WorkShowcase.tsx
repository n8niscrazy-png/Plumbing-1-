"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Wrench, Droplets, Flame, ShowerHead } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Showcase data                                                      */
/* ------------------------------------------------------------------ */

const showcaseItems = [
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    alt: "Modern bathroom vanity with dual sinks",
    label: "Bathroom Remodel",
    icon: <ShowerHead className="w-4 h-4" />,
  },
  {
    src: "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?auto=format&fit=crop&w=600&q=80",
    alt: "Walk-in shower and bathtub installation",
    label: "Shower Install",
    icon: <Droplets className="w-4 h-4" />,
  },
  {
    src: "https://images.unsplash.com/photo-1576698483491-8c43f0862543?auto=format&fit=crop&w=600&q=80",
    alt: "Modern white ceramic sink",
    label: "Fixture Upgrade",
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    src: "https://images.unsplash.com/photo-1628746041549-37fb45bd2c96?auto=format&fit=crop&w=600&q=80",
    alt: "Stainless steel faucet on modern sink",
    label: "Faucet Install",
    icon: <Droplets className="w-4 h-4" />,
  },
  {
    src: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=600&q=80",
    alt: "Full bathroom with toilet, sink and bathtub",
    label: "Full Plumbing",
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    src: "https://images.unsplash.com/photo-1604118600242-e7a6d23ec3a9?auto=format&fit=crop&w=600&q=80",
    alt: "Professional tradesperson ready for work",
    label: "Water Heater",
    icon: <Flame className="w-4 h-4" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function WorkShowcase() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-copper-500/10 text-copper-600 text-xs font-body font-semibold uppercase tracking-wider mb-4">
            Our Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-navy-900 mt-3">
            Quality Craftsmanship,{" "}
            <span className="text-copper-500">Every Job</span>
          </h2>
          <p className="mt-4 text-warm-600 font-body text-lg max-w-2xl mx-auto">
            From fixture installations to full bathroom remodels — see why
            Lexington homeowners and businesses trust Plumbing Systems.
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {showcaseItems.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 text-copper-400 mb-1">
                  {item.icon}
                  <span className="text-xs font-body font-semibold uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <p className="text-white/80 text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-10"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-copper-500 font-body font-semibold hover:text-copper-600 transition-colors group"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
