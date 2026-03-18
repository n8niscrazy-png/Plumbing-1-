"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Clock,
  Shield,
  Menu,
  ChevronDown,
  Home,
  Building2,
  AlertTriangle,
  Pipette,
  Calendar,
} from "lucide-react";
import MobileNav from "./MobileNav";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SubMenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

interface NavItem {
  label: string;
  href: string;
  submenu?: SubMenuItem[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const serviceSubmenu: SubMenuItem[] = [
  {
    label: "Residential",
    href: "/services/residential",
    icon: <Home className="w-5 h-5" />,
    description: "Complete home plumbing solutions",
  },
  {
    label: "Commercial",
    href: "/services/commercial",
    icon: <Building2 className="w-5 h-5" />,
    description: "Business & industrial plumbing",
  },
  {
    label: "Emergency",
    href: "/services/emergency",
    icon: <AlertTriangle className="w-5 h-5" />,
    description: "24/7 urgent plumbing repair",
  },
  {
    label: "Sewer & Water",
    href: "/services/sewer-water",
    icon: <Pipette className="w-5 h-5" />,
    description: "Sewer lines & water mains",
  },
];

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", submenu: serviceSubmenu },
  { label: "Financing", href: "/financing" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  /* -- scroll listener -------------------------------------------- */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* -- lock body scroll when mobile nav is open -------------------- */
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        {/* ========== UTILITY BAR ========== */}
        <div
          className={`bg-[#0a1520] text-warm-100 transition-all duration-300 ${
            scrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-1.5 text-xs sm:text-sm">
              {/* Phone -- always visible */}
              <a
                href="tel:8592948080"
                className="flex items-center gap-1.5 font-mono text-[#D4A574] hover:text-[#B87333] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>859.294.8080</span>
              </a>

              {/* Hours -- hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1.5 text-[#F5F1EC]/70">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-mono">
                  Mon-Fri 8AM-5PM&nbsp;&nbsp;|&nbsp;&nbsp;24/7 Emergency
                </span>
              </div>

              {/* License -- hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1.5 text-[#F5F1EC]/70">
                <Shield className="w-3.5 h-3.5" />
                <span className="font-mono">License M6813</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== MAIN HEADER ========== */}
        <div
          className={`transition-all duration-300 border-b-[3px] border-[#B87333] ${
            scrolled
              ? "bg-white/95 backdrop-blur-md py-2"
              : "bg-[#FAFAF8] py-3"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* ---------- LOGO ---------- */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Plumbing Systems, Inc. — Lexington, KY"
                  width={400}
                  height={200}
                  className={`transition-all duration-300 ${
                    scrolled ? "h-20 w-auto" : "h-32 sm:h-40 w-auto"
                  }`}
                  priority
                />
              </Link>

              {/* ---------- DESKTOP NAV ---------- */}
              <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                {navItems.map((item) =>
                  item.submenu ? (
                    /* Services with dropdown */
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 px-2 xl:px-3 py-2 text-xs xl:text-sm font-body font-medium text-[#0C1B2A] hover:text-[#B87333] transition-colors rounded-md whitespace-nowrap"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </Link>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72"
                          >
                            <div className="bg-white rounded-xl shadow-xl border border-[#F5F1EC] overflow-hidden">
                              {/* dropdown copper accent */}
                              <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />

                              <div className="p-2">
                                {item.submenu.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FAFAF8] transition-colors group/sub"
                                  >
                                    <span className="mt-0.5 text-[#B87333] group-hover/sub:text-[#CD8E52] transition-colors">
                                      {sub.icon}
                                    </span>
                                    <div>
                                      <p className="text-sm font-display font-semibold text-[#0C1B2A]">
                                        {sub.label}
                                      </p>
                                      <p className="text-xs text-[#1B3A5C]/70 font-body mt-0.5">
                                        {sub.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              <div className="border-t border-[#F5F1EC] p-2">
                                <Link
                                  href="/services"
                                  className="block text-center text-xs font-body font-semibold text-[#B87333] hover:text-[#CD8E52] py-2 transition-colors"
                                >
                                  View All Services &rarr;
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="px-2 xl:px-3 py-2 text-xs xl:text-sm font-body font-medium text-[#0C1B2A] hover:text-[#B87333] transition-colors rounded-md whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </nav>

              {/* ---------- DESKTOP CTA AREA ---------- */}
              <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                {/* Phone button */}
                <a
                  href="tel:8592948080"
                  className="flex items-center gap-1.5 px-2 xl:px-3 py-2 text-xs xl:text-sm font-mono font-medium text-[#0C1B2A] border border-[#0C1B2A]/20 rounded-lg hover:border-[#B87333] hover:text-[#B87333] transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                  <span className="hidden xl:inline">859.294.8080</span>
                </a>

                {/* Schedule CTA */}
                <Link
                  href="/schedule"
                  className="flex items-center gap-1.5 px-3 xl:px-5 py-2 xl:py-2.5 text-xs xl:text-sm font-body font-semibold text-white rounded-lg bg-gradient-to-r from-[#B87333] to-[#CD8E52] hover:from-[#CD8E52] hover:to-[#B87333] shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                  Schedule Service
                </Link>
              </div>

              {/* ---------- MOBILE HAMBURGER ---------- */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden p-2 text-[#0C1B2A] hover:text-[#B87333] transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========== MOBILE NAV ========== */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
}
