# Plumbing Systems, Inc. — Website Documentation v1.0

> **Version**: 1.0
> **Date**: February 9, 2026
> **Client**: Plumbing Systems, Inc.
> **Status**: Frontend Complete — Ready for Content & Deployment

---

## Table of Contents

1. [Business Information](#1-business-information)
2. [Tech Stack](#2-tech-stack)
3. [Project Setup](#3-project-setup)
4. [Directory Structure](#4-directory-structure)
5. [Pages & Routes](#5-pages--routes)
6. [Component Library](#6-component-library)
7. [Design System](#7-design-system)
8. [API Routes](#8-api-routes)
9. [Database Schema](#9-database-schema)
10. [Form Validation](#10-form-validation)
11. [SEO & Structured Data](#11-seo--structured-data)
12. [Images & Assets](#12-images--assets)
13. [Known Limitations](#13-known-limitations)
14. [Deployment Checklist](#14-deployment-checklist)
15. [Troubleshooting](#15-troubleshooting)

---

## 1. Business Information

| Field | Value |
|-------|-------|
| Company | Plumbing Systems, Inc. |
| Website | https://www.plumbingsystemslex.net |
| Address | 209 E Loudon Ave, Lexington, KY 40505 |
| Phone | 859-294-8080 |
| License | Kentucky Master Plumber M6813 |
| Established | 2005 |
| Hours | Mon–Fri 7AM–6PM, Sat 8AM–2PM, 24/7 Emergency |

---

## 2. Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.2.35 | React framework (App Router, SSR/SSG) |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first styling |
| Framer Motion | 12.x | Animations & transitions |
| React Hook Form | 7.x | Form state management |
| Zod | 3.x | Schema validation (**must stay v3**) |
| @hookform/resolvers | 5.x | Zod + React Hook Form bridge |
| Lucide React | 0.563.x | Icon library |
| Prisma | 5.x | Database ORM (**must stay v5**) |
| PostgreSQL | — | Database (not yet connected) |

### Critical Version Pins

- **Zod must be v3** — Zod 4 removed `errorMap` from `z.enum()`, breaking validation schemas
- **Prisma must be v5** — Prisma 7 removed `url` from `datasource` block, breaking schema

---

## 3. Project Setup

### Location
```
c:\Users\Amisa\Plumbing 1\plumbing-systems
```

### Install & Run
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start development server (port 3456)
npx next dev -p 3456

# Build for production
npx next build

# Start production server
npx next start -p 3456
```

### Environment Variables (`.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/plumbing_systems?schema=public"
```
> Currently a placeholder — no database is connected yet.

### Port Conflict Resolution
```bash
# If port 3456 is already in use
npx kill-port 3456
npx next dev -p 3456
```

---

## 4. Directory Structure

```
plumbing-systems/
├── public/
│   └── logo.png                    # PSI company logo
├── prisma/
│   └── schema.prisma               # 13 models, 8+ enums
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, metadata, JSON-LD)
│   │   ├── globals.css             # Tailwind directives + custom styles
│   │   ├── page.tsx                # Home page
│   │   ├── about/page.tsx
│   │   ├── contact/                # layout.tsx + page.tsx
│   │   ├── schedule/               # layout.tsx + page.tsx (multi-step form)
│   │   ├── financing/              # layout.tsx + page.tsx
│   │   ├── gallery/                # layout.tsx + page.tsx
│   │   ├── blog/                   # layout.tsx + page.tsx
│   │   ├── careers/                # layout.tsx + page.tsx
│   │   ├── reviews/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx            # Services overview
│   │   │   ├── residential/page.tsx
│   │   │   ├── commercial/page.tsx
│   │   │   ├── emergency/page.tsx
│   │   │   └── sewer-water/page.tsx
│   │   └── api/
│   │       ├── health/route.ts
│   │       ├── leads/route.ts
│   │       ├── contact/route.ts
│   │       ├── careers/apply/route.ts
│   │       └── testimonials/route.ts
│   ├── components/
│   │   ├── ui/                     # Reusable design system
│   │   │   ├── Button.tsx          # 5 variants, 3 sizes
│   │   │   ├── Card.tsx            # 4 variants + sub-components
│   │   │   ├── Input.tsx           # Input + textarea, forwardRef
│   │   │   ├── Select.tsx          # Custom styled select
│   │   │   ├── Badge.tsx           # 6 color variants
│   │   │   ├── Modal.tsx           # Portal + AnimatePresence
│   │   │   ├── Spinner.tsx         # SVG loading spinner
│   │   │   └── Toast.tsx           # Provider + useToast hook
│   │   ├── layout/                 # Site-wide structure
│   │   │   ├── Header.tsx          # Logo, nav, dropdowns, CTAs
│   │   │   ├── Footer.tsx          # 4-column layout
│   │   │   ├── MobileNav.tsx       # Slide-out drawer
│   │   │   └── FloatingCTA.tsx     # Mobile phone + schedule buttons
│   │   ├── sections/               # Landing page sections
│   │   │   ├── Hero.tsx            # Photo collage + text + badges
│   │   │   ├── ServiceGrid.tsx     # 6 service cards
│   │   │   ├── WorkShowcase.tsx    # 6-photo gallery grid
│   │   │   ├── CTABanner.tsx       # Copper + emergency variants
│   │   │   ├── TestimonialSlider.tsx
│   │   │   ├── TrustIndicators.tsx
│   │   │   └── ServiceAreaMap.tsx
│   │   └── pages/                  # Client-side page content
│   │       ├── ServicesPageContent.tsx
│   │       ├── ResidentialPageContent.tsx
│   │       ├── CommercialPageContent.tsx
│   │       ├── EmergencyPageContent.tsx
│   │       ├── SewerWaterPageContent.tsx
│   │       ├── AboutPageContent.tsx
│   │       └── ReviewsPageContent.tsx
│   └── lib/
│       ├── prisma.ts               # Prisma client singleton
│       └── validations.ts          # Zod validation schemas
├── tailwind.config.ts              # Custom theme
├── next.config.mjs                 # Headers, redirects, image domains
├── tsconfig.json
└── package.json
```

### Architecture Pattern

- **`page.tsx`** files are **server components** — export metadata for SEO
- **`*PageContent.tsx`** files are **client components** (`"use client"`) — handle animations via Framer Motion
- Page files import and render their corresponding PageContent component
- Sub-route `layout.tsx` files wrap pages with Header + Footer + FloatingCTA

---

## 5. Pages & Routes

### Public Pages (14)

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Trust Indicators, Services, Work Showcase, CTA, Testimonials, Service Area |
| `/services` | Services overview |
| `/services/residential` | Residential plumbing detail |
| `/services/commercial` | Commercial plumbing detail |
| `/services/emergency` | 24/7 emergency services |
| `/services/sewer-water` | Sewer & water line services |
| `/contact` | Contact form |
| `/schedule` | Multi-step service scheduling form |
| `/about` | Company story, team, values |
| `/financing` | Payment options & Wisetack integration info |
| `/gallery` | Project photo gallery (mock data) |
| `/blog` | Blog listing (mock data) |
| `/careers` | Job listings + application form |
| `/reviews` | Customer reviews page |

### API Routes (5)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/leads` | Create lead (full schema) |
| POST | `/api/contact` | Contact form submission |
| POST | `/api/careers/apply` | Job application |
| GET/POST | `/api/testimonials` | List / submit testimonials |

### Legacy Redirects (301)

All old `.html` URLs redirect to their new paths (e.g., `/about.html` → `/about`).

---

## 6. Component Library

### UI Components (`src/components/ui/`)

#### Button
- **Variants**: `primary` (copper gradient), `secondary` (navy), `outline` (copper border), `emergency` (red pulse), `ghost` (transparent)
- **Sizes**: `sm`, `md`, `lg`
- **Features**: Icon left/right, loading spinner, `as="a"` for anchor links, Framer Motion hover/tap

#### Card
- **Variants**: `default`, `elevated` (shadow-xl), `bordered` (copper border), `dark` (navy bg)
- **Sub-components**: CardHeader, CardTitle, CardBody, CardFooter
- **Option**: `copperAccent` prop adds top copper bar

#### Input
- Supports `<input>` and `<textarea>` via `as="textarea"` prop
- `forwardRef` for React Hook Form integration
- Leading/trailing icon support, error/helper text states

#### Select
- Custom styled native `<select>` with ChevronDown icon
- `forwardRef` for React Hook Form

#### Badge, Modal, Spinner, Toast
- Badge: 6 color variants, dot indicator, pill shape
- Modal: Portal-based, backdrop blur, body scroll lock
- Toast: Provider pattern with `useToast()` hook, 4 variants, auto-dismiss

### Layout Components (`src/components/layout/`)

| Component | Description |
|-----------|-------------|
| Header | Top utility bar (phone, hours, license) + main nav with Services dropdown + sticky on scroll + logo image |
| Footer | 4-column grid: brand, services links, company links, contact info |
| MobileNav | Slide-out drawer from right with staggered link animations |
| FloatingCTA | Mobile-only fixed bottom bar with phone + schedule buttons |

### Section Components (`src/components/sections/`)

| Component | Description |
|-----------|-------------|
| Hero | Photo collage (3 images) + headline + CTAs + trust badges + floating stat cards |
| ServiceGrid | 6 service cards with Lucide icons and "Learn More" links |
| WorkShowcase | 6-photo masonry grid with hover overlays and category labels |
| CTABanner | Call-to-action section with `copper` and `emergency` variants |
| TestimonialSlider | Horizontal scroll carousel with 6 testimonial cards |
| TrustIndicators | 5 trust badges (license, years, 24/7, rating, financing) |
| ServiceAreaMap | CSS-rendered map showing 8 Central KY counties served |

---

## 7. Design System

### Color Palette

| Token | Hex Range | Usage |
|-------|-----------|-------|
| `navy-950` → `navy-50` | #060E18 → #EDF3F9 | Primary backgrounds, text |
| `copper-900` → `copper-50` | #5C3415 → #FAF3EB | Accents, CTAs, highlights |
| `warm-950` → `warm-50` | #1A1714 → #FAFAF8 | Neutral backgrounds |
| `emergency-600/500/400` | #A02020 / #C42B2B / #E04040 | Alerts, emergency CTA |

### Typography

| Token | Font | Weights | Usage |
|-------|------|---------|-------|
| `font-display` | DM Serif Display | 400 | Headings |
| `font-body` | Plus Jakarta Sans | 200–800 | Body text |
| `font-mono` | JetBrains Mono | 400–700 | License numbers, phone |

### Custom Animations

| Class | Effect |
|-------|--------|
| `animate-fade-in` | Opacity 0→1 over 0.6s |
| `animate-slide-up` | Translate Y + fade over 0.6s |
| `animate-slide-in-right` | Translate X + fade over 0.5s |
| `animate-pulse-glow` | Copper box-shadow pulse (infinite) |
| `animate-float` | Gentle Y-axis bob (infinite, 6s) |

### Custom Gradients

| Class | Description |
|-------|-------------|
| `bg-copper-gradient` | 135deg copper sweep |
| `bg-navy-gradient` | Vertical navy-900 → navy-700 |
| `bg-hero-texture` | Subtle SVG cross pattern at 3% opacity |

---

## 8. API Routes

### POST `/api/contact`
Accepts `contactFormSchema` body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "serviceType": "RESIDENTIAL_REPAIR | ... (optional)",
  "preferredContact": "email | phone | text",
  "message": "string (10-2000 chars)"
}
```

### POST `/api/leads`
Accepts full `leadSchema` body with all fields including `urgency`, `source`, `status`, `assignedToId`.

### POST `/api/careers/apply`
Accepts `applicationFormSchema` body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "position": "string",
  "coverLetter": "string (optional, max 5000)"
}
```

### GET/POST `/api/testimonials`
- **GET**: Returns all approved testimonials
- **POST**: Submit new testimonial (name, location, content, rating, serviceType)

---

## 9. Database Schema

### Models (13)

| Model | Key Fields |
|-------|-----------|
| Lead | name, email, phone, serviceType, urgency, description, status, source |
| LeadNote | content, leadId, authorId |
| Appointment | leadId, technicianId, scheduledAt, duration, status |
| User | email, name, role, passwordHash |
| Service | slug, title, description, category, iconName, featured |
| Testimonial | name, location, content, rating, approved |
| BlogPost | slug, title, excerpt, content, published, authorId |
| GalleryImage | url, alt, caption, category, featured |
| JobPosting | title, slug, description, requirements, type, active |
| JobApplication | jobId, name, email, phone, resumeUrl, status |
| SiteSetting | key, value (key-value store) |

### Enums

| Enum | Values |
|------|--------|
| ServiceType | RESIDENTIAL_REPAIR, RESIDENTIAL_INSTALL, COMMERCIAL_REPAIR, COMMERCIAL_INSTALL, DRAIN_CLEANING, WATER_HEATER, SEWER_LINE, GAS_LINE, EMERGENCY, NEW_CONSTRUCTION, REMODEL, MAINTENANCE, INSPECTION, OTHER |
| Urgency | EMERGENCY, URGENT, STANDARD, FLEXIBLE |
| LeadSource | WEBSITE, PHONE, GOOGLE, FACEBOOK, REFERRAL, WISETACK, OTHER |
| LeadStatus | NEW, CONTACTED, QUOTED, SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, LOST |
| UserRole | ADMIN, MANAGER, STAFF, TECHNICIAN |
| ServiceCategory | RESIDENTIAL, COMMERCIAL, EMERGENCY, SPECIALTY |
| JobType | FULL_TIME, PART_TIME, CONTRACT, APPRENTICE |
| ApplicationStatus | NEW, REVIEWING, INTERVIEW, OFFERED, HIRED, REJECTED |
| AppointmentStatus | SCHEDULED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW |

---

## 10. Form Validation

All schemas defined in `src/lib/validations.ts` using Zod 3.

| Schema | Used By | Key Rules |
|--------|---------|-----------|
| `contactFormSchema` | Contact page, `/api/contact` | Name required, valid email, 10-digit phone, message 10-2000 chars |
| `scheduleFormSchema` | Schedule page | Service type required, preferred date/time, address optional |
| `applicationFormSchema` | Careers page, `/api/careers/apply` | Position required, cover letter max 5000 chars |
| `leadSchema` | Admin/internal, `/api/leads` | Full lead with urgency, source, status, assignedToId |
| `testimonialSchema` | `/api/testimonials` | Name required, content 10-2000 chars, rating 1-5 |

---

## 11. SEO & Structured Data

### Metadata (`src/app/layout.tsx`)
- **Title template**: `%s | Plumbing Systems, Inc. — Lexington, KY`
- **Keywords**: 12 keyword phrases targeting "plumber Lexington KY" variations
- **OpenGraph**: Type website, 1200x630 image, full description
- **Twitter**: Large summary card
- **Robots**: Index, follow, max previews enabled
- **Canonical**: https://www.plumbingsystemslex.net

### JSON-LD Structured Data
- **Type**: `Plumber` (schema.org)
- **Includes**: Name, address, geo coordinates, phone, email, founding date, opening hours, area served (Lexington + Kentucky), service catalogs (Residential, Commercial, Emergency), social profiles (Facebook, Google Maps)

### Security Headers (`next.config.mjs`)
- X-DNS-Prefetch-Control, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy

---

## 12. Images & Assets

### Logo
- **File**: `/public/logo.png`
- **Source**: Client-provided (ChatGPT-generated PSI logo)
- **Used in**: Header component

### Hero Section Images (Unsplash)
| Position | Photo ID | Description |
|----------|----------|-------------|
| Main | `photo-1584622650111-993a426fbf0a` | Modern bathroom with white fixtures |
| Secondary | `photo-1621905252507-b35492cc74b4` | Professional plumber at work |
| Accent | `photo-1638799869566-b17fa794c4de` | Walk-in shower & bathtub |

### Work Showcase Grid (Unsplash)
| Label | Photo ID |
|-------|----------|
| Bathroom Remodel | `photo-1584622650111-993a426fbf0a` |
| Shower Install | `photo-1638799869566-b17fa794c4de` |
| Fixture Upgrade | `photo-1576698483491-8c43f0862543` |
| Faucet Install | `photo-1628746041549-37fb45bd2c96` |
| Full Plumbing | `photo-1631889993959-41b4e9c6e3c5` |
| Water Heater | `photo-1604118600242-e7a6d23ec3a9` |

### Allowed Image Domains (`next.config.mjs`)
- `images.unsplash.com`
- `plus.unsplash.com`
- `res.cloudinary.com`
- `lh3.googleusercontent.com`

### Missing Assets (To Be Provided)
- `/og-image.jpg` — OpenGraph share image (1200x630)
- `/apple-touch-icon.png` — iOS home screen icon
- `/favicon.ico` — Browser favicon (default Next.js placeholder exists)
- Gallery page photos — currently using mock data
- Blog post featured images — currently using mock data

---

## 13. Known Limitations

| Item | Details |
|------|---------|
| Database | No PostgreSQL connected — `.env` has placeholder URL. API routes will fail until a real DB is provisioned and `npx prisma db push` is run. |
| Authentication | No login/auth system. User model exists in Prisma schema but no auth flow is implemented. |
| Admin Dashboard | No admin panel for managing leads, appointments, blog posts, gallery, or site settings. |
| Email | Contact/schedule forms write to DB only — no email notifications are sent. |
| Blog & Gallery | Pages render with hardcoded mock data, not from the database. |
| File Uploads | Career application `resumeUrl` field exists but no file upload handling is implemented. |
| Stock Photos | All photos are Unsplash stock — should be replaced with actual company photos. |
| Payment/Financing | Financing page is informational only — no Wisetack integration is active. |

---

## 14. Deployment Checklist

### Pre-Deployment
- [ ] Provision PostgreSQL database (e.g., Vercel Postgres, Supabase, Railway)
- [ ] Update `.env` with real `DATABASE_URL`
- [ ] Run `npx prisma db push` to create tables
- [ ] Run `npx prisma generate` to create client
- [ ] Replace stock photos with real company photos
- [ ] Create and add `/public/og-image.jpg` (1200x630)
- [ ] Create and add `/public/apple-touch-icon.png` (180x180)
- [ ] Replace favicon with branded version
- [ ] Update Footer "Website by [Your Agency]" credit
- [ ] Verify all phone numbers and addresses are correct
- [ ] Update Google Maps link in Footer with actual business listing
- [ ] Update Facebook/social links with real profile URLs

### Deployment (Vercel Recommended)
- [ ] Connect GitHub repository to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Configure custom domain: `plumbingsystemslex.net`
- [ ] Enable Vercel Analytics (optional)
- [ ] Set up Vercel Cron for sitemap regeneration (optional)

### Post-Deployment
- [ ] Submit sitemap to Google Search Console
- [ ] Verify structured data with Google Rich Results Test
- [ ] Test all forms end-to-end
- [ ] Set up email notifications (SendGrid, Resend, etc.)
- [ ] Configure monitoring/uptime alerts
- [ ] Test mobile responsiveness on real devices

---

## 15. Troubleshooting

### Port Already in Use
```bash
npx kill-port 3456
npx next dev -p 3456
```

### Framer Motion Type Errors
When defining animation variants as objects, string literals like `"easeOut"` get widened to `string`. Fix with `as const`:
```ts
// Error
transition: { ease: "easeOut" }

// Fix
transition: { ease: "easeOut" as const }
```
Same applies to `type: "spring" as const`.

### Zod 4 Installed Instead of 3
```bash
npm install zod@3
```
Symptoms: `errorMap` or `required_error` not valid in `z.enum()`.

### Prisma 7 Installed Instead of 5
```bash
npm install prisma@5 @prisma/client@5
npx prisma generate
```
Symptoms: `url` property error in `datasource` block.

### Build Fails with ESLint Errors
```bash
npx next lint --fix
npx next build
```

### Images Not Loading
Ensure the image hostname is in `next.config.mjs` `remotePatterns` array.

---

*Documentation generated February 9, 2026 — Plumbing Systems, Inc. Website v1.0*
