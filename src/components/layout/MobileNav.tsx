"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  Clock,
  Shield,
  ChevronDown,
  Calendar,
  Home,
  Building2,
  AlertTriangle,
  Pipette,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MobileSubLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface MobileNavItem {
  label: string;
  href: string;
  subLinks?: MobileSubLink[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const serviceSubLinks: MobileSubLink[] = [
  { label: "Residential", href: "/services/residential", icon: <Home className="w-4 h-4" /> },
  { label: "Commercial", href: "/services/commercial", icon: <Building2 className="w-4 h-4" /> },
  { label: "Emergency", href: "/services/emergency", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "Sewer & Water", href: "/services/sewer-water", icon: <Pipette className="w-4 h-4" /> },
];

const mobileNavItems: MobileNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", subLinks: serviceSubLinks },
  { label: "Financing", href: "/financing" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, damping: 30, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring" as const, damping: 30, stiffness: 300 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 * i, duration: 0.3, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const handleLinkClick = () => {
    setServicesExpanded(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ========== BACKDROP ========== */}
          <motion.div
            key="mobile-nav-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          {/* ========== DRAWER ========== */}
          <motion.div
            key="mobile-nav-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-[#0C1B2A] flex flex-col lg:hidden"
          >
            {/* ---------- TOP BAR ---------- */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B3A5C]/50">
              {/* Logo */}
              <Link href="/" onClick={handleLinkClick} className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  PLUMBING <span className="text-[#B87333]">SYSTEMS</span>
                </span>
                <div className="mt-1 h-[2px] w-full rounded-full bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />
              </Link>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* ---------- PHONE CTA ---------- */}
            <div className="px-6 py-4">
              <a
                href="tel:8592948080"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#1B3A5C] text-[#D4A574] font-mono text-lg font-medium hover:bg-[#142D45] transition-colors"
              >
                <Phone className="w-5 h-5" />
                859.294.8080
              </a>
            </div>

            {/* ---------- NAV LINKS ---------- */}
            <nav className="flex-1 overflow-y-auto px-6 pb-4">
              <ul className="space-y-1">
                {mobileNavItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {item.subLinks ? (
                      /* --- Services with expandable sub-links --- */
                      <div>
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className="flex-1 py-3 font-display text-xl font-semibold text-white hover:text-[#D4A574] transition-colors"
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={() => setServicesExpanded((prev) => !prev)}
                            className="p-2 text-white/60 hover:text-[#D4A574] transition-colors"
                            aria-label="Toggle services submenu"
                          >
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-200 ${
                                servicesExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden pl-4 border-l-2 border-[#B87333]/40 ml-2 space-y-1"
                            >
                              {item.subLinks.map((sub) => (
                                <li key={sub.label}>
                                  <Link
                                    href={sub.href}
                                    onClick={handleLinkClick}
                                    className="flex items-center gap-3 py-2.5 text-base font-body text-white/80 hover:text-[#D4A574] transition-colors"
                                  >
                                    <span className="text-[#B87333]">{sub.icon}</span>
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* --- Standard link --- */
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block py-3 font-display text-xl font-semibold text-white hover:text-[#D4A574] transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* ---------- BOTTOM SECTION ---------- */}
            <div className="mt-auto px-6 pb-6 pt-4 border-t border-[#1B3A5C]/50 space-y-4">
              {/* Schedule CTA */}
              <Link
                href="/schedule"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-white font-body font-semibold text-base bg-gradient-to-r from-[#B87333] to-[#CD8E52] hover:from-[#CD8E52] hover:to-[#B87333] shadow-lg transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Schedule Service
              </Link>

              {/* Meta info */}
              <div className="space-y-2 text-xs text-white/50 font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mon-Fri 8AM-5PM | 24/7 Emergency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>KY Master Plumber License M6813</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
