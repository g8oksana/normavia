# Norma Via Group Marketing Website — Design Spec

**Date:** 2026-04-30
**Author:** vladgon (with Claude)
**Status:** Approved (pending user review of this written spec)
**Project root:** `D:\source\qexcellence-site`

---

## 1. Overview

A static, multi-page marketing/brochure website for **Norma Via Group**, a
Seattle-based ISO certification and cybersecurity compliance consultancy
launched in 2025 as the next chapter of QExcellence, founded in 2018. The site mirrors the structural conventions of
`fyconsulting.com` (rich landing page + dedicated service subpages) and reuses
text material and imagery from `q-excel.com` (the founder's prior site)
adapted to the Norma Via Group brand.

The site is built as plain static HTML/CSS/JS — no build tooling, no
framework. Any modern web host (or a literal folder share) can serve it.

### Goals

- Establish credibility for a 1-year-old firm by leveraging the founder's
  experience reframed as company capability.
- Generate qualified consultation requests via a contact form.
- Rank organically for ISO and cybersecurity certification consulting
  searches in the Seattle / Pacific Northwest region.

### Non-goals

- No blog / news section.
- No client portal or member-only area.
- No CMS — content edits happen in HTML.
- No backend or form-processing service in v1 — `mailto:` submission only.
- No partner logos in v1.
- Homepage testimonials use short excerpts from Oksana Goncharov's LinkedIn recommendations.

---

## 2. Brand & content basics

| Field | Value |
|---|---|
| Company name | Norma Via Group |
| Founded | Norma Via Group launched in 2025; formerly QExcellence, founded in 2018 |
| Location | Seattle, WA, USA |
| Email | oksana@norma-via.com |
| Phone | +1 (425) 381-0191 |
| LinkedIn | https://www.linkedin.com/company/normaviagroup/ |
| Facebook | Removed |
| Instagram | Removed |
| Founder | Oksana Goncharov, Lead Consultant — 20 years quality/manufacturing, 300+ audits, 22 countries |

**Hero headline (locked):**
> From gap analysis to certificate – without the guesswork.

**Hero sub:**
> We guide quality and cybersecurity teams through ISO, CMMC, AS9100, and
> more. End-to-end, on time, on the first audit — with compliance that supports business growth.

**Primary CTA label:** "Start Your Audit-Ready Plan Today"

---

## 3. Visual style

**Direction:** "Modern Tech" — slate + cyan.

| Token | Hex | Use |
|---|---|---|
| `--color-bg-dark` | `#0f172a` | Hero, footer, dark bands |
| `--color-bg-darker` | `#020617` | Hover states, dark accents |
| `--color-surface` | `#1e293b` | Card backgrounds on dark sections |
| `--color-border-dark` | `#334155` | Card borders on dark |
| `--color-bg-light` | `#f8fafc` | Page body background |
| `--color-text-dark` | `#0f172a` | Body text on light |
| `--color-text-light` | `#f1f5f9` | Body text on dark |
| `--color-text-muted` | `#64748b` | Secondary text |
| `--color-accent` | `#06b6d4` | Cyan — links, CTAs, icon color, accent lines |
| `--color-accent-hover` | `#0891b2` | Cyan hover |
| `--color-accent-on-dark-text` | `#0f172a` | Text color when sitting on cyan CTA |

**Typography:**
- Headings: `Inter`, system sans-serif fallback. Weights 600 / 700.
- Body: `Inter`, system sans-serif fallback. Weight 400 / 500.
- Mono (rare, used in JSON-LD comments only): `ui-monospace`.
- Scale: 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 px.
- Line-height: 1.5 body, 1.2 headings.

**Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px.

**Layout:** Max content width 1200px, centered, with 24px gutter on mobile.

**Responsive breakpoints:**
- mobile-first base
- `>=640px` — small tablet
- `>=768px` — tablet
- `>=1024px` — desktop
- `>=1280px` — wide desktop

**Logo:** Inline SVG wordmark "NORMA VIA" with a small geometric mark
(stylized "N" or check mark) in cyan. No raster image. Placed in header
(top-left) and footer.

---

## 4. Site map

```
/                                      (index.html — homepage)
/about.html
/contact.html
/services/
    iso-9001.html
    cmmc-nist-800-171.html
    iso-27001.html
    as9100.html
    gmp-iso-13485.html
    internal-auditing.html
```

9 pages total.

### File layout

```
D:\source\qexcellence-site\
├── index.html
├── about.html
├── contact.html
├── services\
│   ├── iso-9001.html
│   ├── cmmc-nist-800-171.html
│   ├── iso-27001.html
│   ├── as9100.html
│   ├── gmp-iso-13485.html
│   └── internal-auditing.html
├── assets\
│   ├── css\styles.css
│   ├── js\main.js
│   └── img\
│       ├── happy.jpg
│       ├── card.jpg
│       ├── manuf.jpg
│       ├── founder.jpg
│       ├── safety_first.jpg
│       ├── mfg_check.jpg
│       ├── assembly.jpg
│       ├── factory-industry-ai.jpg
│       ├── lock-encryption-ai.jpg
│       └── pcb_repair.jpg
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── apple-touch-icon.png
├── README.md
└── docs\superpowers\specs\2026-04-30-normavia-website-design.md
```

---

## 5. Homepage section flow

| # | Section | Layout | Content / image |
|---|---|---|---|
| 1 | Hero | Full-width, dark slate gradient, no photo | Headline + sub + primary CTA "Start Your Audit-Ready Plan Today" + secondary "View services" |
| 2 | Three-pillar value prop | 3-column grid with SVG icons | (a) Audit-ready systems  (b) Quality + cybersecurity in one partner  (c) Decades of field experience |
| 3 | Two-domain split | 2-column alternating image+text | Left: manufacturers/quality teams + ISO 9001 / AS9100 / ISO 13485 bullets + image `factory-industry-ai.jpg`. Right: cybersecurity / regulated industries + CMMC / ISO 27001 bullets + image `lock-encryption-ai.jpg` |
| 4 | Service grid (6 cards) | 3×2 grid | One card per service. Icon + title + 1-line + "Learn more →" linking to subpage |
| 5 | 4-step roadmap | Horizontal numbered diagram | 1) Gap analysis  2) Implementation & documentation  3) Internal audit & CAPA  4) Certification audit support |
| 6 | Why Norma Via (credibility) | Alternating image+text | Reframes founder stats as company capability ("Our lead consultant has..."). Image `founder.jpg` as portrait card with caption "Lead Consultant" |
| 7 | FAQ | Accordion, 6 questions | Cert duration / ISO 9001 vs AS9100 / remote consulting / initial + surveillance / CMMC Level 2 / pricing model |
| 8 | Final CTA + form | Dark band, centered form | Name, email, company, service dropdown, message → mailto submission |
| 9 | Footer | 4-column | Brand+tagline / Services links / Company links (About, Contact) / Seattle address + phone + email + social icons |

---

## 6. Service-page template

All 6 service pages share this structure:

| # | Section | Notes |
|---|---|---|
| 1 | Breadcrumb | Home / Services / [Service]. Emits `BreadcrumbList` JSON-LD |
| 2 | Service hero | H1 = primary keyword. Sub = 1-sentence value prop. Hero image right. CTA "Start Your Audit-Ready Plan Today" |
| 3 | What it is | 2-col text. Plain-English explanation of the standard, who it applies to, what certification means |
| 4 | Who needs this | Bullet list. Industries / company sizes / regulatory drivers |
| 5 | Our approach (4 steps) | Numbered grid. Reuses homepage 4-step pattern, scoped to this service |
| 6 | What you get | Icon + bullet grid. Deliverables: gap report, documented system, training plan, internal audit, audit support |
| 7 | Related services | 2-3 cards cross-linking sibling service pages |
| 8 | CTA band | "Ready to start your [service] certification?" → contact.html |
| 9 | Footer | Site-wide |

Each service page emits a `Service` JSON-LD with `name`, `provider`,
`areaServed: "United States"`, `serviceType`, `description`.

---

## 7. About page

1. Breadcrumb
2. Hero — "About Norma Via Group" + image `happy.jpg`
3. Our story — 2-3 paragraphs framing Norma Via as a Seattle quality+cyber consultancy launched in 2025 as the next chapter of QExcellence, founded in 2018
4. Mission/values — 3-pillar grid (integrity / expertise / partnership)
5. Leadership — small section with `founder.jpg` + caption (Lead Consultant — 20yrs / 300+ audits / 22 countries)
6. CTA band → contact.html
7. Footer

---

## 8. Contact page

1. Breadcrumb
2. Header — "Get in touch"
3. 2-column: form (left) + contact card (right with email, phone, Seattle address, social links, and a Google Maps `<iframe>` embed centered on Seattle — using the public `google.com/maps/embed` URL, no API key required)
4. Form fields:
   - Name (required)
   - Email (required, validated)
   - Company
   - Phone (optional)
   - Message (required, textarea)
   - Submit → Azure contact API, which sends email through Microsoft Graph
5. Footer

Client-side JS displays a "Thanks — your message was sent" confirmation after
the Azure contact API accepts the request.

---

## 9. SEO foundation

### Per-page meta (every page)

- Unique `<title>`: `[Page-specific keyword] | Norma Via Group`
- Unique `<meta name="description">` 150-160 chars, primary keyword + Seattle geo signal
- `<link rel="canonical">` → page's clean URL
- `<meta name="robots" content="index,follow">`
- `<html lang="en">`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:type`, `og:url`, `og:site_name`
- Twitter card: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`

### Structured data (JSON-LD)

- **Organization** schema — site-wide in `<head>`. Includes `name`,
  `url`, `logo`, `address`, `contactPoint`, `sameAs` (LinkedIn, Facebook,
  Instagram).
- **LocalBusiness** subtype `ProfessionalService` — Seattle, launched in 2025; formerly QExcellence, founded in 2018.
- **Service** schema on each service subpage.
- **BreadcrumbList** on every subpage.

### Site infrastructure

- `robots.txt` — allow all, point to `sitemap.xml`.
- `sitemap.xml` — all 9 pages with `lastmod`, `changefreq=monthly`,
  `priority` (1.0 home, 0.8 services, 0.6 about/contact).
- `favicon.ico`, `apple-touch-icon.png` (180×180), inline SVG favicon
  via `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.

### Semantic HTML & accessibility

- Single `<h1>` per page (target keyword bearing).
- Landmarks: `<header><nav><main><section><footer>`.
- All content images get descriptive `alt` text.
- WCAG AA color contrast verified (cyan `#06b6d4` on slate `#0f172a` and
  on white both pass).
- Mobile-responsive layout — Google ranks mobile-first.
- Single bundled stylesheet, deferred non-critical JS.
- Skip-to-content link at top of every page.

### Per-page keyword targets

| Page | Primary keyword |
|---|---|
| Home | ISO certification consulting Seattle |
| ISO 9001 | ISO 9001 certification consultant |
| CMMC | CMMC compliance consulting |
| ISO 27001 | ISO 27001 implementation consultant |
| AS9100 | AS9100 aerospace quality certification |
| GMP/ISO 13485 | ISO 13485 medical device consulting |
| Internal Auditing | internal audit ISO consulting |
| About | Norma Via Group quality cybersecurity consulting |
| Contact | contact Norma Via Group Seattle |

### Analytics

A placeholder `<!-- analytics tag -->` slot in every page's `<head>`,
ready for GA4 / Plausible / Microsoft Clarity. No tag added in v1.

---

## 10. Image inventory & mapping

Original images were sourced from q-excel.com; homepage manufacturing and cybersecurity section images were replaced with Pixabay assets copied locally into `assets/img/`.
**Not used:** `QExcelLogo.png` (q-excel branding).

Content photos and illustrations use a shared image treatment in CSS: subtle desaturation/contrast plus a navy-to-teal overlay on hero and split-section image containers. Logos are excluded so brand marks stay crisp.

| File | Alt text (drafted) | Used on |
|---|---|---|
| `factory-industry-ai.jpg` | "Assembly line employees using technology in a manufacturing environment" | Homepage §3 left |
| `lock-encryption-ai.jpg` | "AI-generated lock and encryption cybersecurity illustration" | Homepage §3 right |
| `assembly.jpg` | "Manufacturing assembly line worker inspecting product" | ISO 14001 service page hero |
| `pcb_repair.jpg` | "Technician repairing a printed circuit board" | CMMC service page hero |
| `oksana.webp` | "Lead Consultant Oksana Goncharov" | Homepage §6 |
| `founder.jpg` | "Lead Consultant Oksana Goncharov" | About page leadership |
| `manuf.jpg` | "Manufacturing facility floor" | ISO 9001 service page hero |
| `mfg_check.jpg` | "Quality inspector checking manufactured parts" | AS9100 service page hero |
| `safety_first.jpg` | "Safety-first signage in a manufacturing environment" | GMP/ISO 13485 service page hero |
| `card.jpg` | "Auditor reviewing documentation" | Internal Auditing service page hero |
| `happy.jpg` | "Smiling team member in office setting" | About page hero |

The ISO 27001 service page does not use a photo — instead a CSS gradient
+ pattern panel, to avoid stretching the limited image set with a
poorly-fitting photo.

---

## 11. JavaScript

Single `assets/js/main.js`, vanilla JS, no dependencies. Functions:

- Mobile nav toggle (hamburger menu open/close)
- FAQ accordion (one open at a time)
- Contact form: client-side validation, POST to `/api/contact`, show success/error state
- Optional: smooth-scroll for in-page anchor links

JS is `<script defer>` loaded — never blocks render.

---

## 12. CSS

Single `assets/css/styles.css`. Sections (in order):
1. Reset / base normalization
2. CSS custom properties (the tokens in §3)
3. Typography
4. Layout primitives (container, grid, flex utilities)
5. Components (header/nav, footer, hero, card, button, form, accordion, breadcrumb)
6. Page-specific overrides (only where unavoidable)
7. Responsive media queries

No CSS framework, no preprocessor, no build step.

---

## 13. Out of scope (for v1, can be added later)

- CMS / headless content authoring
- Partner logos
- Blog / news / case studies
- Multi-language / i18n
- Cookie banner (no tracking → not required)
- Real GA4 / analytics tag
- Real social URLs (placeholders carried over from q-excel)
- Real phone number

---

## 14. Acceptance criteria

The implemented site must:

- [ ] Render correctly when opening `index.html` directly in a browser (no server needed)
- [ ] Pass HTML validation (W3C validator) on all 9 pages
- [ ] Pass WCAG AA color contrast check on all text/background pairs
- [ ] Be fully responsive at 360px, 768px, 1024px, 1440px viewport widths
- [ ] All internal links resolve (no 404s)
- [ ] All images have descriptive `alt` text
- [ ] Each page has unique `<title>` and `<meta name="description">`
- [ ] `Organization` JSON-LD validates against Google's Rich Results Test
- [ ] `sitemap.xml` validates against the sitemap protocol
- [ ] Mobile nav toggle works (hamburger menu)
- [ ] FAQ accordion expands/collapses correctly
- [ ] Contact form opens user's mail client with a properly formatted message
- [ ] Lighthouse SEO score ≥ 95 on the homepage
- [ ] Lighthouse Accessibility score ≥ 95 on the homepage
- [ ] No console errors on any page

---

## 15. Open items / future decisions

- Real Norma Via Group LinkedIn / Facebook / Instagram URLs (currently placeholder)
- Real Norma Via Group phone number: `+1 (425) 381-0191`
- Custom logo design (currently a typographic placeholder wordmark)
- Production hosting decision — likely candidates: Azure Static Web Apps, GitHub Pages, Netlify
- Form backend decision (when moving off `mailto:`)
