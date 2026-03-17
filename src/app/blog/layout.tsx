import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plumbing Tips & Insights",
  description:
    "Expert plumbing tips, maintenance guides, and industry insights from Plumbing Systems, Inc. in Lexington, KY. Licensed Master Plumber M6813.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
