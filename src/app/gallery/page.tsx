"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Wrench,
  Eye,
  Home,
  Building2,
  AlertTriangle,
  PaintBucket,
  Layers,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Badge from "@/components/ui/Badge";

/* ================================================================== */
/*  Metadata (reference for SSR -- move to layout if needed)           */
/* ================================================================== */

// export const metadata = {
//   title: "Our Work",
//   description: "Browse our gallery of completed plumbing projects in Lexington, KY. Residential, commercial, emergency, and remodeling work by Plumbing Systems, Inc.",
// };

/* ================================================================== */
/*  Data                                                               */
/* ================================================================== */

type Category = "all" | "residential" | "commercial" | "emergency" | "remodeling";

interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<Category, "all">;
  description: string;
}

const categories: { value: Category; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All Projects", icon: <Layers className="w-4 h-4" /> },
  { value: "residential", label: "Residential", icon: <Home className="w-4 h-4" /> },
  { value: "commercial", label: "Commercial", icon: <Building2 className="w-4 h-4" /> },
  { value: "emergency", label: "Emergency", icon: <AlertTriangle className="w-4 h-4" /> },
  { value: "remodeling", label: "Remodeling", icon: <PaintBucket className="w-4 h-4" /> },
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Kitchen Sink Replacement",
    category: "residential",
    description: "Complete kitchen sink and faucet upgrade with garbage disposal installation.",
  },
  {
    id: 2,
    title: "Commercial Restroom Retrofit",
    category: "commercial",
    description: "Full restroom plumbing renovation for a downtown Lexington office building.",
  },
  {
    id: 3,
    title: "Emergency Pipe Burst Repair",
    category: "emergency",
    description: "After-hours burst pipe repair preventing major water damage to a family home.",
  },
  {
    id: 4,
    title: "Master Bathroom Remodel",
    category: "remodeling",
    description: "Luxury bathroom remodel with dual vanity, walk-in shower, and soaking tub.",
  },
  {
    id: 5,
    title: "Tankless Water Heater Install",
    category: "residential",
    description: "Rinnai tankless water heater installation for improved energy efficiency.",
  },
  {
    id: 6,
    title: "Restaurant Grease Trap",
    category: "commercial",
    description: "New grease trap installation and plumbing for a local restaurant kitchen.",
  },
  {
    id: 7,
    title: "Sewer Line Replacement",
    category: "residential",
    description: "Full main sewer line replacement using trenchless technology.",
  },
  {
    id: 8,
    title: "Flood Damage Restoration",
    category: "emergency",
    description: "Emergency plumbing and water extraction after basement flooding.",
  },
  {
    id: 9,
    title: "Kitchen Remodel Plumbing",
    category: "remodeling",
    description: "Complete kitchen plumbing rough-in and fixture installation during remodel.",
  },
  {
    id: 10,
    title: "Multi-Unit Water Heater",
    category: "commercial",
    description: "Commercial water heater system for a 24-unit apartment complex.",
  },
  {
    id: 11,
    title: "Whole-Home Repipe",
    category: "residential",
    description: "Complete copper repipe replacing aging galvanized pipes throughout the home.",
  },
  {
    id: 12,
    title: "Bathroom Addition",
    category: "remodeling",
    description: "New half-bath addition including drain lines, supply lines, and fixture install.",
  },
];

const categoryBadgeVariants: Record<
  Exclude<Category, "all">,
  "default" | "navy" | "emergency" | "success"
> = {
  residential: "default",
  commercial: "navy",
  emergency: "emergency",
  remodeling: "success",
};

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Our <span className="text-copper-500">Work</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-body text-lg text-warm-100/70 max-w-2xl mx-auto"
            >
              Browse our portfolio of completed plumbing projects across
              Lexington and Central Kentucky.
            </motion.p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-copper-500 via-copper-300 to-copper-500" />
        </section>

        {/* ============ FILTER TABS ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-navy-900 text-white shadow-md"
                    : "bg-warm-100 text-navy-700 border border-warm-200 hover:bg-warm-200 hover:border-warm-300"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Count */}
          <p className="text-center mt-4 text-sm font-body text-navy-500">
            Showing{" "}
            <span className="font-semibold text-navy-700">
              {filteredItems.length}
            </span>{" "}
            {filteredItems.length === 1 ? "project" : "projects"}
          </p>
        </section>

        {/* ============ GALLERY GRID ============ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      layout: { type: "spring", stiffness: 300, damping: 30 },
                    }}
                    className="group"
                  >
                    {/* Image placeholder */}
                    <div className="relative aspect-[4/3] rounded-xl bg-navy-800 overflow-hidden cursor-pointer">
                      {/* Wrench icon placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Wrench className="w-10 h-10 text-navy-600" />
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <Badge
                          variant={categoryBadgeVariants[item.category]}
                          size="sm"
                        >
                          {item.category}
                        </Badge>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-navy-900/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Eye className="w-8 h-8 text-copper-500 mb-2" />
                        <span className="font-body text-sm font-semibold text-white">
                          View Project
                        </span>
                      </div>

                      {/* Decorative corner accent on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-copper-500 to-copper-300 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </div>

                    {/* Caption */}
                    <div className="mt-3 px-1">
                      <h3 className="font-display text-base font-semibold text-navy-900 group-hover:text-copper-500 transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-navy-500 capitalize mt-0.5">
                        {item.category}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
