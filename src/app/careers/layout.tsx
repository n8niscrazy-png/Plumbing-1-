import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Plumbing Systems team in Lexington, KY. We're hiring licensed plumbers, apprentices, and service dispatchers. Competitive pay, benefits, and growth opportunities.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
