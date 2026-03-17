"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CalendarDays } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 lg:hidden"
        >
          {/* Schedule button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/schedule"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#CD8E52] text-white shadow-lg shadow-[#B87333]/30 hover:shadow-xl hover:shadow-[#B87333]/40 transition-shadow duration-300"
              aria-label="Schedule service"
            >
              <CalendarDays className="w-6 h-6" />
            </Link>
          </motion.div>

          {/* Phone button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <a
              href="tel:8592948080"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#CD8E52] text-white shadow-lg shadow-[#B87333]/30 hover:shadow-xl hover:shadow-[#B87333]/40 transition-shadow duration-300"
              aria-label="Call 859-294-8080"
            >
              <Phone className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
