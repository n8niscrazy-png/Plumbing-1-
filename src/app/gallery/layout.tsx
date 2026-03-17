import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse our gallery of completed plumbing projects in Lexington, KY. Residential, commercial, emergency, and remodeling work by Plumbing Systems, Inc.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
