import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import ResidentialPageContent from "@/components/pages/ResidentialPageContent";

export const metadata: Metadata = {
  title: "Residential Plumbing Services",
  description:
    "Complete home plumbing solutions in Lexington, KY. Fixture repairs, water heater installation, drain cleaning, PEX repiping, slab leak repair, and more. Licensed Master Plumber M6813. Call 859-294-8080.",
};

export default function ResidentialServicesPage() {
  return (
    <>
      <Header />
      <ResidentialPageContent />
      <Footer />
      <FloatingCTA />
    </>
  );
}
