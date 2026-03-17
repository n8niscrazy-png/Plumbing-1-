"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const serviceAreas: string[] = [
  "Lexington",
  "Fayette County",
  "Scott County",
  "Woodford County",
  "Jessamine County",
  "Clark County",
  "Bourbon County",
  "Madison County",
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ServiceAreaMap() {
  return (
    <section className="relative bg-navy-900 overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ========== LEFT: Service areas list ========== */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-white mb-4">
                Proudly Serving Central Kentucky
              </h2>
              <p className="font-body text-navy-200 text-lg max-w-md mb-8">
                From Lexington to the surrounding counties, our team provides
                reliable plumbing services across the Bluegrass region.
              </p>
            </motion.div>

            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-3"
            >
              {serviceAreas.map((area) => (
                <motion.li
                  key={area}
                  variants={listItemVariants}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-copper-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-copper-500/30 transition-colors">
                    <MapPin className="w-4 h-4 text-copper-400" />
                  </div>
                  <span className="font-body text-warm-200 text-base group-hover:text-copper-300 transition-colors">
                    {area}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <Link
                href="/schedule"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm"
              >
                Schedule Service in Your Area
              </Link>
            </motion.div>
          </div>

          {/* ========== RIGHT: Stylized map area ========== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-copper-500/20" />

              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-copper-500/15" />

              {/* Inner ring */}
              <div className="absolute inset-16 rounded-full border border-copper-500/10" />

              {/* Center point — Lexington */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulse ring */}
                  <div className="absolute inset-0 w-16 h-16 -m-2 rounded-full bg-copper-500/20 animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-copper-500 to-copper-400 flex items-center justify-center shadow-lg shadow-copper-500/30">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Satellite area pins */}
              {[
                { name: "Scott", top: "12%", left: "42%" },
                { name: "Woodford", top: "35%", left: "12%" },
                { name: "Jessamine", top: "78%", left: "38%" },
                { name: "Clark", top: "30%", left: "82%" },
                { name: "Bourbon", top: "15%", left: "72%" },
                { name: "Madison", top: "82%", left: "68%" },
              ].map((pin) => (
                <div
                  key={pin.name}
                  className="absolute group"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className="w-8 h-8 rounded-full bg-navy-700 border border-copper-500/30 flex items-center justify-center hover:bg-copper-500/20 transition-colors cursor-default">
                    <MapPin className="w-3.5 h-3.5 text-copper-400" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-navy-800 rounded text-[10px] font-body text-warm-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {pin.name} County
                  </div>
                </div>
              ))}

              {/* Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <p className="font-display text-white text-sm">Lexington, KY</p>
                <p className="font-body text-navy-300 text-xs mt-0.5">
                  Service Radius: 40+ Miles
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
