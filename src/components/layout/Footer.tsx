import Link from "next/link";
import {
  Phone,
  MapPin,
  Clock,
  Shield,
  Facebook,
  Star,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FooterLink {
  label: string;
  href: string;
}

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const serviceLinks: FooterLink[] = [
  { label: "Residential", href: "/services/residential" },
  { label: "Commercial", href: "/services/commercial" },
  { label: "Emergency", href: "/services/emergency" },
  { label: "Sewer & Water", href: "/services/sewer-water" },
  { label: "Financing", href: "/financing" },
];

const companyLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Reviews", href: "/reviews" },
];

const contactItems: ContactItem[] = [
  {
    icon: <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />,
    label: "Address",
    value: "834 Winchester Road\nLexington, KY 40505",
    href: "https://maps.google.com/?q=834+Winchester+Road+Lexington+KY+40505",
  },
  {
    icon: <Phone className="w-4 h-4 flex-shrink-0" />,
    label: "Phone",
    value: "859.294.8080",
    href: "tel:8592948080",
  },
  {
    icon: <Clock className="w-4 h-4 flex-shrink-0" />,
    label: "Hours",
    value: "Mon-Fri 8AM-5PM\n24/7 Emergency Service",
  },
  {
    icon: <Shield className="w-4 h-4 flex-shrink-0" />,
    label: "License",
    value: "Master Plumbing License M6813",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FooterLinkList({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm font-body text-[#F5F1EC]/60 hover:text-[#D4A574] transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="relative bg-[#0C1B2A] overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* ========== COPPER GRADIENT DIVIDER ========== */}
      <div className="h-[3px] bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />

      {/* ========== MAIN CONTENT ========== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ---------- Column 1: Brand ---------- */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  PLUMBING <span className="text-[#B87333]">SYSTEMS</span>
                </span>
                <div className="mt-1.5 h-[2px] w-full rounded-full bg-gradient-to-r from-[#B87333] via-[#D4A574] to-[#B87333]" />
              </div>
            </Link>

            <p className="font-display text-sm font-semibold text-[#D4A574] mb-3">
              Lexington&apos;s Trusted Plumber Since 2005
            </p>
            <p className="text-sm font-body text-[#F5F1EC]/50 leading-relaxed max-w-xs">
              Professional plumbing services for residential and commercial
              properties throughout Central Kentucky. Licensed, insured, and
              committed to quality craftsmanship.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1B3A5C]/50 text-white/60 hover:bg-[#B87333]/20 hover:text-[#D4A574] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1B3A5C]/50 text-white/60 hover:bg-[#B87333]/20 hover:text-[#D4A574] transition-colors"
                aria-label="Google Reviews"
              >
                <Star className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ---------- Column 2: Services ---------- */}
          <FooterLinkList title="Services" links={serviceLinks} />

          {/* ---------- Column 3: Company ---------- */}
          <FooterLinkList title="Company" links={companyLinks} />

          {/* ---------- Column 4: Contact ---------- */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              {contactItems.map((item) => {
                const content = (
                  <div className="flex items-start gap-3">
                    <span className="text-[#B87333]">{item.icon}</span>
                    <span className="text-sm font-body text-[#F5F1EC]/60 whitespace-pre-line leading-relaxed">
                      {item.value}
                    </span>
                  </div>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      item.href.startsWith("tel:") || item.href.startsWith("http") ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="block hover:text-[#D4A574] transition-colors group"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-[#B87333] group-hover:text-[#D4A574] transition-colors">
                              {item.icon}
                            </span>
                            <span className="text-sm font-body text-[#F5F1EC]/60 group-hover:text-[#D4A574] whitespace-pre-line leading-relaxed transition-colors">
                              {item.value}
                            </span>
                          </div>
                        </a>
                      ) : (
                        <Link href={item.href} className="block hover:text-[#D4A574] transition-colors">
                          {content}
                        </Link>
                      )
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ========== BOTTOM BAR ========== */}
      <div className="relative border-t border-[#1B3A5C]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-[#F5F1EC]/40">
            <p>
              &copy; 2025 Plumbing Systems, Inc. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              <Shield className="w-3 h-3" />
              <span className="font-mono">KY Master Plumber License M6813</span>
            </p>
            <p>
              Website by{" "}
              <a
                href="#"
                className="text-[#D4A574]/60 hover:text-[#D4A574] transition-colors"
              >
                [Your Agency]
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
