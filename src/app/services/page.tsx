import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import ServicesPageContent from "@/components/pages/ServicesPageContent";

export const metadata: Metadata = {
  title: "Plumbing Services",
  description:
    "Comprehensive residential and commercial plumbing services in Lexington, KY. Drain cleaning, water heaters, repiping, sewer repair, and 24/7 emergency service. Licensed Master Plumber M6813. Call 859-294-8080.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <ServicesPageContent />
      <Footer />
      <FloatingCTA />
    </>
  );
}
