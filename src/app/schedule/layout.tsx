import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule Service",
  description:
    "Schedule plumbing service online with Plumbing Systems, Inc. in Lexington, KY. Easy online booking or call 859-294-8080. Emergency, residential & commercial service.",
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
