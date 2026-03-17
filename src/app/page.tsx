import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Hero from "@/components/sections/Hero";
import TrustIndicators from "@/components/sections/TrustIndicators";
import ServiceGrid from "@/components/sections/ServiceGrid";
import CTABanner from "@/components/sections/CTABanner";
import WorkShowcase from "@/components/sections/WorkShowcase";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import ServiceAreaMap from "@/components/sections/ServiceAreaMap";

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero — full viewport, navy background */}
        <Hero />

        {/* Trust indicators — license, years, 24/7, rating, financing */}
        <TrustIndicators />

        {/* Service grid — 6 service cards */}
        <ServiceGrid />

        {/* Work showcase — photo grid */}
        <WorkShowcase />

        {/* CTA — copper variant */}
        <CTABanner
          variant="copper"
          title="Need a Plumber? Schedule Your Service Today"
          description="Fast, reliable plumbing service from Lexington's most trusted team. Online scheduling available 24/7."
          primaryAction={{ text: "Schedule Service", href: "/schedule" }}
          secondaryAction={{ text: "View Services", href: "/services" }}
          phone
        />

        {/* Testimonials — horizontal slider */}
        <TestimonialSlider />

        {/* Service area map — counties served */}
        <ServiceAreaMap />

        {/* CTA — emergency variant */}
        <CTABanner
          variant="emergency"
          title="Plumbing Emergency? We're Available 24/7"
          description="Burst pipes, sewer backups, gas leaks — don't wait. Call now for immediate emergency plumbing service in Lexington and Central Kentucky."
          primaryAction={{ text: "Call Now: 859.294.8080", href: "tel:8592948080" }}
          secondaryAction={{ text: "Emergency Services", href: "/services/emergency" }}
          phone={false}
        />
      </main>

      <Footer />
      <FloatingCTA />
    </>
  );
}
