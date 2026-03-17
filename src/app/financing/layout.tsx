import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financing Options",
  description:
    "Flexible financing options for plumbing services in Lexington, KY. Easy online application with competitive rates. No hard credit check. Plumbing Systems, Inc.",
};

export default function FinancingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
