import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Plumbing Systems, Inc. in Lexington, KY. Call 859-294-8080 or send us a message. 24/7 emergency plumbing service available. License M6813.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
