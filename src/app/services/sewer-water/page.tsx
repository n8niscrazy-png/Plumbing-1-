import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import SewerWaterPageContent from "@/components/pages/SewerWaterPageContent";

export const metadata: Metadata = {
  title: "Sewer & Water Line Services",
  description:
    "Expert sewer and water line repair, replacement, and installation in Lexington, KY. Camera inspection, trenchless repair, excavation, and water service installation. Licensed Master Plumber M6813. Call 859-294-8080.",
};

export default function SewerWaterPage() {
  return (
    <>
      <Header />
      <SewerWaterPageContent />
      <Footer />
      <FloatingCTA />
    </>
  );
}
