import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import ReviewsPageContent from "@/components/pages/ReviewsPageContent";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read customer reviews for Plumbing Systems, Inc. in Lexington, KY. 4.9 star rating from 287+ verified reviews. See why Lexington trusts us for residential and commercial plumbing. Call 859-294-8080.",
};

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <ReviewsPageContent />
      <Footer />
      <FloatingCTA />
    </>
  );
}
