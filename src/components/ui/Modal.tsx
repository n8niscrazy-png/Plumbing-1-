"use client";

import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface ModalProps {
  /** Controls visibility */
  isOpen: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Optional title rendered in the header */
  title?: string;
  /** Modal contents */
  children?: React.ReactNode;
  /** Max-width utility class (default: "max-w-lg") */
  maxWidth?: string;
  /** Extra classes on the modal panel */
  className?: string;
  /** When false, clicking the backdrop will NOT close the modal */
  closeOnBackdropClick?: boolean;
  /** When false, pressing Escape will NOT close the modal */
  closeOnEscape?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 350, damping: 28 },
  },
  exit: { opacity: 0, y: 20, scale: 0.96, transition: { duration: 0.2 } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
  className = "",
  closeOnBackdropClick = true,
  closeOnEscape = true,
}) => {
  /* ---------- Escape key handler ---------- */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") onClose();
    },
    [closeOnEscape, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  /* ---------- Portal target ---------- */
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        /* Backdrop */
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          aria-modal="true"
          role="dialog"
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
            onClick={closeOnBackdropClick ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className={[
              "relative z-10 w-full rounded-lg bg-warm-50 shadow-2xl",
              "border border-warm-200 font-body",
              maxWidth,
              className,
            ].join(" ")}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || true) && (
              <div className="flex items-center justify-between border-b border-warm-200 px-6 py-4">
                {title && (
                  <h2 className="font-display text-lg font-bold text-navy-900">
                    {title}
                  </h2>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-auto inline-flex items-center justify-center rounded-md p-1.5 text-navy-500 transition-colors hover:bg-warm-200 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
