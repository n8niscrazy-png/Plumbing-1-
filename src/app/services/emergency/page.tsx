import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import EmergencyPageContent from "@/components/pages/EmergencyPageContent";

export const metadata: Metadata = {
  title: "24/7 Emergency Plumbing Services",
  description:
    "24/7 emergency plumbing service in Lexington, KY. Burst pipes, gas leaks, sewage backups, and no hot water. Fast response times. Licensed Master Plumber M6813. Call now: 859-294-8080.",
};

export default function EmergencyServicesPage() {
  return (
    <>
      <Header />
      <EmergencyPageContent />
      <Footer />
      <FloatingCTA />
    </>
  );
}
