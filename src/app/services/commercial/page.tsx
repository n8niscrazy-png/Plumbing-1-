import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import CommercialPageContent from "@/components/pages/CommercialPageContent";

export const metadata: Metadata = {
  title: "Commercial Plumbing Services",
  description:
    "Professional commercial plumbing services in Lexington, KY. Construction plumbing, facility maintenance, restaurant, medical, and industrial plumbing. Serving businesses since 2005. Call 859-294-8080.",
};

export default function CommercialServicesPage() {
  return (
    <>
      <Header />
      <CommercialPageContent />
      <Footer />
      <FloatingCTA />
    </>
  );
}
