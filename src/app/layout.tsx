import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ============================================================
   FONT CONFIGURATION
   ============================================================ */

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

/* ============================================================
   METADATA
   ============================================================ */

const siteUrl = "https://www.plumbingsystemslex.net";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0C1B2A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Plumbing Systems, Inc. | Lexington's Trusted Plumber Since 2005",
    template: "%s | Plumbing Systems, Inc. — Lexington, KY",
  },
  description:
    "Professional residential & commercial plumbing services in Lexington, KY. 24/7 emergency service. Licensed Master Plumber M6813. Call 859-294-8080.",
  keywords: [
    "plumber Lexington KY",
    "plumbing services Lexington",
    "emergency plumber Lexington",
    "residential plumbing Lexington KY",
    "commercial plumbing Lexington KY",
    "water heater repair Lexington",
    "drain cleaning Lexington KY",
    "sewer line repair Lexington",
    "licensed master plumber Lexington",
    "24/7 plumber Lexington KY",
    "Plumbing Systems Inc",
    "plumbing contractor Lexington",
  ],
  authors: [{ name: "Plumbing Systems, Inc." }],
  creator: "Plumbing Systems, Inc.",
  publisher: "Plumbing Systems, Inc.",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Plumbing Systems, Inc.",
    title: "Plumbing Systems, Inc. | Lexington's Trusted Plumber Since 2005",
    description:
      "Professional residential & commercial plumbing services in Lexington, KY. 24/7 emergency service. Licensed Master Plumber M6813. Call 859-294-8080.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Plumbing Systems, Inc. — Professional Plumbing Services in Lexington, KY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plumbing Systems, Inc. | Lexington's Trusted Plumber Since 2005",
    description:
      "Professional residential & commercial plumbing services in Lexington, KY. 24/7 emergency service. Licensed Master Plumber M6813.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* ============================================================
   JSON-LD STRUCTURED DATA
   ============================================================ */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": `${siteUrl}/#organization`,
  name: "Plumbing Systems, Inc.",
  alternateName: "Plumbing Systems",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.jpg`,
  description:
    "Professional residential & commercial plumbing services in Lexington, KY. 24/7 emergency service. Licensed Master Plumber M6813.",
  telephone: "+1-859-294-8080",
  email: "info@plumbingsystemslex.net",
  foundingDate: "2005",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Check",
  address: {
    "@type": "PostalAddress",
    streetAddress: "209 E Loudon Ave",
    addressLocality: "Lexington",
    addressRegion: "KY",
    postalCode: "40505",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.0606,
    longitude: -84.4956,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Lexington",
      sameAs: "https://en.wikipedia.org/wiki/Lexington,_Kentucky",
    },
    {
      "@type": "State",
      name: "Kentucky",
      sameAs: "https://en.wikipedia.org/wiki/Kentucky",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Plumbing Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Residential Plumbing",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drain Cleaning" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Water Heater Installation & Repair" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fixture Installation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pipe Repair & Replacement" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Commercial Plumbing",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Plumbing Installation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backflow Prevention" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Grease Trap Service" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Emergency Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "24/7 Emergency Plumbing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Burst Pipe Repair" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewer Line Emergency" } },
        ],
      },
    ],
  },
  sameAs: [
    "https://www.facebook.com/plumbingsystemslex",
    "https://www.google.com/maps/place/Plumbing+Systems+Inc",
  ],
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
