import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import AboutPageContent from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Plumbing Systems, Inc. — Lexington, KY's trusted plumbing company since 2005. Licensed Master Plumber M6813. Committed to integrity, quality, and community. Call 859-294-8080.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutPageContent />
      <Footer />
      <FloatingCTA />
    </>
  );
}
