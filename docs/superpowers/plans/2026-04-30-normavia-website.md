# Norma Via Group Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 9-page static marketing website for Norma Via Group — a Seattle-based ISO certification + cybersecurity consultancy — with SEO baked in, modern slate+cyan visual style, and zero build tooling.

**Architecture:** Plain static HTML + one shared CSS file + one shared JS file. No framework. No bundler. No CMS. Each page is a self-contained `.html` file that can be opened directly in a browser. JSON-LD structured data inlined per page. Single-page-per-service approach with a shared template structure.

**Tech Stack:** HTML5 / CSS3 (custom properties, grid, flexbox) / vanilla ES6+ JS. No external dependencies at runtime except an `Inter` web font from Google Fonts. Validation tools: W3C HTML validator, Google Rich Results Test, Lighthouse.

**Spec:** `docs/superpowers/specs/2026-04-30-normavia-website-design.md`

---

## File Structure

```
D:\source\qexcellence-site\
├── index.html                          (homepage)
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
│   ├── css\styles.css                  (all styles, single file)
│   ├── js\main.js                      (nav, accordion, contact form)
│   └── img\
│       ├── happy.jpg
│       ├── card.jpg
│       ├── manuf.jpg
│       ├── founder.jpg
│       ├── oksana.webp
│       ├── safety_first.jpg
│       ├── mfg_check.jpg
│       ├── assembly.jpg
│       ├── factory-industry-ai.jpg
│       ├── lock-encryption-ai.jpg
│       └── pcb_repair.jpg
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── favicon.ico                         (legacy fallback)
├── apple-touch-icon.png                (180×180)
└── README.md
```

**Each page's responsibilities:**
- HTML pages own their content + per-page meta + JSON-LD blocks specific to them.
- `styles.css` owns ALL styling — no inline styles in pages except where unavoidable (hero gradients).
- `main.js` owns ALL interactive behavior — mobile nav toggle, FAQ accordion, contact form mailto build.
- `robots.txt` + `sitemap.xml` own crawler hints.

**Reuse strategy:** Since this is plain HTML with no templating, header and footer markup are duplicated across pages. The plan provides canonical snippets in early tasks; later page-build tasks reference and reuse them verbatim.

---

## Verification approach

Static HTML/CSS/JS doesn't unit-test naturally. Verification per task uses:

- **HTML pages:** Open in browser → check console (no errors) → run W3C validator (`https://validator.w3.org/nu/?doc=<file>` or paste source) → check responsive at 360/768/1024/1440px widths.
- **CSS work:** Open homepage in browser, visually verify no layout breaks, check responsive.
- **JS work:** Manually exercise the feature (click hamburger, expand FAQ, submit form).
- **SEO:** Final task runs Lighthouse + Google Rich Results Test.

**Browser command (opens default browser to a local file):**
```bash
start "" "D:\source\qexcellence-site\index.html"
```

---

## Tasks

### Task 1: Create directory scaffold

**Files:**
- Create: `assets/css/`, `assets/js/`, `assets/img/`, `services/` (directories)

- [ ] **Step 1: Create directories**

```bash
cd /d/source/qexcellence-site
mkdir -p assets/css assets/js assets/img services
```

- [ ] **Step 2: Verify**

```bash
ls -la /d/source/qexcellence-site/
ls -la /d/source/qexcellence-site/assets/
```

Expected: see `assets/`, `services/` directories. `assets/` contains `css/`, `js/`, `img/`.

- [ ] **Step 3: Commit**

Nothing to commit yet — empty directories aren't tracked by git. Proceed.

---

### Task 2: Download images from q-excel.com

**Files:**
- Create: 8 `.jpg` files in `assets/img/`

- [ ] **Step 1: Download all 8 images**

```bash
cd /d/source/qexcellence-site/assets/img

curl -fsSL -o happy.jpg         https://www.q-excel.com/assets/img/happy.jpg
curl -fsSL -o card.jpg          https://www.q-excel.com/assets/img/card.jpg
curl -fsSL -o manuf.jpg         https://www.q-excel.com/assets/img/manuf.jpg
curl -fsSL -o founder.jpg       https://www.q-excel.com/assets/img/founder.jpg
curl -fsSL -o safety_first.jpg  https://www.q-excel.com/assets/img/safety_first.jpg
curl -fsSL -o mfg_check.jpg     https://www.q-excel.com/assets/img/mfg_check.jpg
curl -fsSL -o assembly.jpg      https://www.q-excel.com/assets/img/assembly.jpg
curl -fsSL -o pcb_repair.jpg    https://www.q-excel.com/assets/img/pcb_repair.jpg
```

- [ ] **Step 2: Verify all 8 are non-empty**

```bash
ls -la /d/source/qexcellence-site/assets/img/
```

Expected: 8 `.jpg` files, each > 1 KB.

- [ ] **Step 3: Commit**

```bash
cd /d/source/qexcellence-site
git add assets/img/
git commit -m "chore: add reference imagery sourced from q-excel.com"
```

---

### Task 3: Create README.md

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README.md**

```markdown
# Norma Via Group Website

Static marketing site for Norma Via Group — Seattle-based ISO certification
and cybersecurity compliance consultancy.

## Structure

- `index.html` — homepage
- `about.html` — about page
- `contact.html` — contact page
- `services/*.html` — six service detail pages
- `assets/css/styles.css` — all styles
- `assets/js/main.js` — all interactive behavior
- `assets/img/` — image assets
- `robots.txt`, `sitemap.xml`, `favicon.*` — SEO + browser metadata

## Local development

No build step. Open any `.html` file directly in a browser, or serve the
folder with a static server:

```bash
# Python 3
python -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then open <http://localhost:8000>.

## Hosting

Deploy with Azure Static Web Apps so the static site and `api/` folder are
hosted together. Configure Microsoft Graph mail settings in Azure app settings,
not in source control.

## Editing content

Each HTML page is self-contained. Edit copy directly in the page. Update
`<title>`, `<meta name="description">`, and JSON-LD blocks if you change
section headings.

## Known placeholders (replace before launch)

- Phone number: `+1 (425) 381-0191`
- LinkedIn: `https://www.linkedin.com/company/normaviagroup/`
- Logo: typographic SVG wordmark in header — replace with branded asset when ready
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with structure and local-dev instructions"
```

---

### Task 4: Create logo SVG (canonical reusable snippet)

**Files:**
- Create: `assets/img/logo.svg` (used as standalone for `<img>` references and inlined in headers)

This is the wordmark used in every page header and footer. We define it as a single SVG file so it's edit-once, render-everywhere.

- [ ] **Step 1: Write `assets/img/logo.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 36" role="img" aria-label="Norma Via Group">
  <g fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 28 L4 8 L20 28 L20 8" />
  </g>
  <text x="30" y="24" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="700" fill="#0f172a" letter-spacing="0.04em">NORMA VIA</text>
  <text x="30" y="34" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="500" fill="#64748b" letter-spacing="0.18em">GROUP</text>
</svg>
```

- [ ] **Step 2: Define the dark-bg variant inline (used in footer, hero overlays)**

The footer sits on dark slate, so wordmark text needs to be light. We create a second variant.

Append `assets/img/logo-dark-bg.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 36" role="img" aria-label="Norma Via Group">
  <g fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 28 L4 8 L20 28 L20 8" />
  </g>
  <text x="30" y="24" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="700" fill="#f1f5f9" letter-spacing="0.04em">NORMA VIA</text>
  <text x="30" y="34" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="500" fill="#94a3b8" letter-spacing="0.18em">GROUP</text>
</svg>
```

- [ ] **Step 3: Verify**

Open both `.svg` files in a browser. Expected: see "NORMA VIA / GROUP" wordmark with a cyan stylized "N" mark to the left.

- [ ] **Step 4: Commit**

```bash
git add assets/img/logo.svg assets/img/logo-dark-bg.svg
git commit -m "feat: add Norma Via Group SVG logo (light + dark variants)"
```

---

### Task 5: CSS — design tokens, reset, base typography

**Files:**
- Create: `assets/css/styles.css`

This task establishes the design-token layer (CSS custom properties from spec §3), a minimal reset, and base typography. Subsequent CSS tasks append components.

- [ ] **Step 1: Create `assets/css/styles.css`**

```css
/* ---------- DESIGN TOKENS ---------- */
:root {
  /* Color palette (spec §3) */
  --color-bg-dark: #0f172a;
  --color-bg-darker: #020617;
  --color-surface: #1e293b;
  --color-border-dark: #334155;
  --color-bg-light: #f8fafc;
  --color-bg-light-alt: #ffffff;
  --color-text-dark: #0f172a;
  --color-text-light: #f1f5f9;
  --color-text-muted: #64748b;
  --color-text-muted-on-dark: #94a3b8;
  --color-accent: #06b6d4;
  --color-accent-hover: #0891b2;
  --color-accent-on-dark-text: #0f172a;
  --color-border-light: #e2e8f0;

  /* Typography */
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", "Consolas", monospace;

  /* Spacing scale (spec §3) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Layout */
  --container-max: 1200px;
  --container-pad: 24px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 12px 32px rgba(15, 23, 42, 0.12);

  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: 150ms var(--ease);
  --transition-med: 250ms var(--ease);
}

/* ---------- RESET ---------- */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text-dark);
  background: var(--color-bg-light);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img, svg, video { max-width: 100%; height: auto; display: block; }
button { font: inherit; cursor: pointer; }
a { color: var(--color-accent); text-decoration: none; transition: color var(--transition-fast); }
a:hover { color: var(--color-accent-hover); text-decoration: underline; }
ul, ol { padding-left: 1.25em; }
figure { margin: 0; }

/* ---------- TYPOGRAPHY ---------- */
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 var(--space-4);
  line-height: 1.2;
  font-weight: 700;
  color: var(--color-text-dark);
}
h1 { font-size: clamp(36px, 5vw, 60px); letter-spacing: -0.02em; }
h2 { font-size: clamp(28px, 3.5vw, 36px); letter-spacing: -0.01em; }
h3 { font-size: clamp(20px, 2.5vw, 24px); }
h4 { font-size: 18px; }
p { margin: 0 0 var(--space-4); }
.eyebrow {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: var(--space-3);
}
.lede { font-size: 18px; color: var(--color-text-muted); }

/* ---------- ACCESSIBILITY ---------- */
.visually-hidden {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.skip-link {
  position: absolute; top: -40px; left: 8px;
  background: var(--color-accent); color: var(--color-accent-on-dark-text);
  padding: 8px 12px; border-radius: var(--radius-sm); z-index: 1000;
  transition: top var(--transition-fast);
  font-weight: 600;
}
.skip-link:focus { top: 8px; }

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

- [ ] **Step 2: Verify (smoke test)**

Create a temporary `_smoke.html` at the project root with the following, then open it:

```html
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><title>Smoke</title>
<link rel="stylesheet" href="assets/css/styles.css">
</head><body>
<h1>Hello Norma Via</h1>
<p class="lede">Tokens loaded if this is dark slate text on light background and Inter-fallback.</p>
<a href="#">A test link should be cyan</a>
</body></html>
```

```bash
start "" "D:\source\qexcellence-site\_smoke.html"
```

Expected: Heading sized large, Inter (or system sans) font, cyan link. Then **delete** `_smoke.html`:

```bash
rm /d/source/qexcellence-site/_smoke.html
```

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(css): add design tokens, reset, base typography"
```

---

### Task 6: CSS — layout primitives + buttons

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append layout primitives + button styles**

Append to the end of `assets/css/styles.css`:

```css
/* ---------- LAYOUT PRIMITIVES ---------- */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-left: var(--container-pad);
  padding-right: var(--container-pad);
}
.section { padding: var(--space-16) 0; }
.section--tight { padding: var(--space-12) 0; }
.section--dark { background: var(--color-bg-dark); color: var(--color-text-light); }
.section--dark h1, .section--dark h2, .section--dark h3, .section--dark h4 { color: var(--color-text-light); }
.section--surface { background: var(--color-bg-light-alt); }

.grid { display: grid; gap: var(--space-6); }
.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--4 { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 900px) {
  .grid--2, .grid--3, .grid--4 { grid-template-columns: 1fr; }
}
@media (min-width: 901px) and (max-width: 1100px) {
  .grid--3, .grid--4 { grid-template-columns: repeat(2, 1fr); }
}

.flex { display: flex; }
.flex--center { align-items: center; }
.flex--between { justify-content: space-between; }
.flex--wrap { flex-wrap: wrap; }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }

.text-center { text-align: center; }
.section-header { max-width: 720px; margin: 0 auto var(--space-12); text-align: center; }
.section-header p { color: var(--color-text-muted); }
.section--dark .section-header p { color: var(--color-text-muted-on-dark); }

/* ---------- BUTTONS ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 12px 22px;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
  line-height: 1;
}
.btn:hover { text-decoration: none; transform: translateY(-1px); }
.btn--primary {
  background: var(--color-accent);
  color: var(--color-accent-on-dark-text);
}
.btn--primary:hover { background: var(--color-accent-hover); color: var(--color-accent-on-dark-text); }
.btn--ghost {
  background: transparent;
  color: var(--color-text-light);
  border: 1px solid var(--color-border-dark);
}
.btn--ghost:hover { background: rgba(255, 255, 255, 0.06); color: var(--color-text-light); }
.btn--ghost-light {
  background: transparent;
  color: var(--color-text-dark);
  border: 1px solid var(--color-border-light);
}
.btn--ghost-light:hover { background: var(--color-bg-light); color: var(--color-text-dark); }
.btn-arrow::after { content: "\2192"; transition: transform var(--transition-fast); }
.btn-arrow:hover::after { transform: translateX(3px); }
```

- [ ] **Step 2: Verify**

Quick smoke test — create `_smoke.html` at project root:

```html
<!DOCTYPE html><html><head><link rel="stylesheet" href="assets/css/styles.css"></head><body>
<div class="container">
  <div class="section">
    <a class="btn btn--primary btn-arrow" href="#">Primary CTA</a>
    <a class="btn btn--ghost-light" href="#">Ghost button</a>
  </div>
  <div class="section section--dark">
    <div class="container">
      <a class="btn btn--primary" href="#">Primary on dark</a>
      <a class="btn btn--ghost" href="#">Ghost on dark</a>
    </div>
  </div>
</div>
</body></html>
```

Open in browser. Expected: Cyan primary button, ghost variants, hover lifts slightly. Delete `_smoke.html` after.

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(css): add layout primitives (container, grid, section) and button styles"
```

---

### Task 7: CSS — header, navigation, footer

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append header/nav/footer styles**

```css
/* ---------- HEADER + NAV ---------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(248, 250, 252, 0.92);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid var(--color-border-light);
}
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.site-header__logo { display: inline-flex; align-items: center; }
.site-header__logo img { height: 32px; width: auto; }
.site-nav { display: flex; align-items: center; gap: var(--space-6); }
.site-nav a {
  color: var(--color-text-dark);
  font-weight: 500;
  font-size: 15px;
  padding: 8px 4px;
}
.site-nav a:hover { color: var(--color-accent); text-decoration: none; }
.site-nav .btn { padding: 10px 18px; font-size: 14px; }
.site-nav__toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  color: var(--color-text-dark);
}
.site-nav__toggle-icon { display: block; width: 22px; height: 2px; background: currentColor; position: relative; }
.site-nav__toggle-icon::before, .site-nav__toggle-icon::after {
  content: ""; position: absolute; left: 0; width: 22px; height: 2px; background: currentColor;
}
.site-nav__toggle-icon::before { top: -6px; }
.site-nav__toggle-icon::after { top: 6px; }

@media (max-width: 768px) {
  .site-nav__toggle { display: inline-flex; align-items: center; gap: 8px; }
  .site-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; align-items: stretch;
    background: var(--color-bg-light-alt);
    border-bottom: 1px solid var(--color-border-light);
    padding: var(--space-4) var(--container-pad);
    gap: var(--space-2);
    transform: translateY(-12px);
    opacity: 0; pointer-events: none;
    transition: opacity var(--transition-med), transform var(--transition-med);
  }
  .site-nav.is-open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .site-nav a, .site-nav .btn { padding: 12px 4px; }
}

/* ---------- FOOTER ---------- */
.site-footer {
  background: var(--color-bg-darker);
  color: var(--color-text-muted-on-dark);
  padding: var(--space-16) 0 var(--space-8);
}
.site-footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}
@media (max-width: 900px) { .site-footer__grid { grid-template-columns: 1fr 1fr; gap: var(--space-8); } }
@media (max-width: 540px) { .site-footer__grid { grid-template-columns: 1fr; } }
.site-footer h4 {
  color: var(--color-text-light);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: var(--space-4);
}
.site-footer__brand img { height: 32px; margin-bottom: var(--space-3); }
.site-footer__brand p { font-size: 14px; max-width: 320px; }
.site-footer ul { list-style: none; padding: 0; margin: 0; }
.site-footer li { margin-bottom: var(--space-2); }
.site-footer a {
  color: var(--color-text-muted-on-dark);
  font-size: 14px;
}
.site-footer a:hover { color: var(--color-accent); text-decoration: none; }
.site-footer__contact p { font-size: 14px; margin-bottom: var(--space-2); }
.site-footer__social { display: flex; gap: var(--space-3); margin-top: var(--space-3); }
.site-footer__social a {
  width: 36px; height: 36px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--color-border-dark);
  border-radius: 50%;
  color: var(--color-text-muted-on-dark);
}
.site-footer__social a:hover { color: var(--color-accent); border-color: var(--color-accent); }
.site-footer__bottom {
  border-top: 1px solid var(--color-border-dark);
  padding-top: var(--space-6);
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);
  font-size: 13px;
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(css): add header/nav (with mobile toggle) and footer styles"
```

---

### Task 8: CSS — hero variants

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append hero styles**

```css
/* ---------- HERO ---------- */
.hero {
  position: relative;
  background: linear-gradient(135deg, var(--color-bg-dark) 0%, #1a3a5c 100%);
  color: var(--color-text-light);
  overflow: hidden;
}
.hero::before {
  content: "";
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.16), transparent 60%),
    radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.10), transparent 50%);
  pointer-events: none;
}
.hero__inner {
  position: relative;
  padding: var(--space-24) 0;
  max-width: 820px;
}
.hero h1 { color: var(--color-text-light); margin-bottom: var(--space-4); }
.hero p.lede { color: var(--color-text-muted-on-dark); max-width: 640px; margin-bottom: var(--space-8); font-size: 20px; }
.hero__ctas { display: flex; gap: var(--space-3); flex-wrap: wrap; }

/* Compact hero variant for inner pages */
.hero--compact .hero__inner { padding: var(--space-12) 0 var(--space-12); max-width: 980px; }
.hero--compact h1 { font-size: clamp(28px, 4vw, 44px); }

/* Hero with side image (used on service pages) */
.hero--split .hero__inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--space-12);
  align-items: center;
  max-width: var(--container-max);
  padding: var(--space-16) 0;
}
.hero--split .hero__image {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.hero--split .hero__image img { width: 100%; height: 100%; object-fit: cover; aspect-ratio: 4/3; }
@media (max-width: 800px) {
  .hero--split .hero__inner { grid-template-columns: 1fr; }
  .hero--split .hero__image { order: -1; max-height: 280px; }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(css): add hero styles (full, compact, split variants)"
```

---

### Task 9: CSS — cards, breadcrumb, alternating image+text

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append card / breadcrumb / split-row styles**

```css
/* ---------- CARDS ---------- */
.card {
  background: var(--color-bg-light-alt);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  transition: transform var(--transition-med), box-shadow var(--transition-med), border-color var(--transition-med);
  display: flex; flex-direction: column;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}
.card__icon {
  width: 44px; height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-sm);
  background: rgba(6, 182, 212, 0.08);
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}
.card__icon svg { width: 24px; height: 24px; }
.card h3 { font-size: 18px; margin-bottom: var(--space-2); }
.card p { color: var(--color-text-muted); font-size: 15px; flex-grow: 1; margin-bottom: var(--space-4); }
.card__link { font-weight: 600; font-size: 14px; }

/* On dark sections */
.section--dark .card {
  background: var(--color-surface);
  border-color: var(--color-border-dark);
}
.section--dark .card h3 { color: var(--color-text-light); }
.section--dark .card p { color: var(--color-text-muted-on-dark); }
.section--dark .card:hover { border-color: var(--color-accent); }

/* Pillar (icon-led variant — no border, used in 3-col value-prop) */
.pillar { text-align: left; }
.pillar__icon {
  width: 48px; height: 48px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-sm);
  background: rgba(6, 182, 212, 0.10);
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}
.pillar__icon svg { width: 28px; height: 28px; }
.pillar h3 { font-size: 20px; margin-bottom: var(--space-2); }
.pillar p { color: var(--color-text-muted); font-size: 16px; }

/* ---------- BREADCRUMB ---------- */
.breadcrumb {
  font-size: 13px;
  color: var(--color-text-muted);
  padding: var(--space-4) 0;
  background: var(--color-bg-light);
  border-bottom: 1px solid var(--color-border-light);
}
.breadcrumb ol { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: var(--space-2); }
.breadcrumb li::after { content: "/"; margin-left: var(--space-2); color: var(--color-border-light); }
.breadcrumb li:last-child::after { content: ""; }
.breadcrumb a { color: var(--color-text-muted); }
.breadcrumb a:hover { color: var(--color-accent); text-decoration: none; }
.breadcrumb [aria-current="page"] { color: var(--color-text-dark); font-weight: 600; }

/* ---------- ALTERNATING IMAGE+TEXT ROW ---------- */
.split-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
}
.split-row + .split-row { margin-top: var(--space-16); }
.split-row__image img {
  width: 100%; height: auto; aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
.split-row--reverse .split-row__image { order: 2; }
@media (max-width: 800px) {
  .split-row { grid-template-columns: 1fr; gap: var(--space-6); }
  .split-row--reverse .split-row__image { order: 0; }
}

/* List with cyan check bullets */
.check-list { list-style: none; padding: 0; }
.check-list li {
  position: relative;
  padding-left: 28px;
  margin-bottom: var(--space-2);
  color: var(--color-text-dark);
}
.check-list li::before {
  content: "";
  position: absolute; left: 0; top: 7px;
  width: 16px; height: 16px;
  background: var(--color-accent);
  -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='white' d='M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1z'/></svg>") center/contain no-repeat;
          mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='white' d='M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1z'/></svg>") center/contain no-repeat;
}
.section--dark .check-list li { color: var(--color-text-light); }
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(css): add cards, breadcrumb, split-row, and check-list components"
```

---

### Task 10: CSS — roadmap, FAQ accordion, CTA band, forms

**Files:**
- Modify: `assets/css/styles.css` (append)

- [ ] **Step 1: Append roadmap + accordion + form styles**

```css
/* ---------- ROADMAP (numbered steps) ---------- */
.roadmap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  position: relative;
}
.roadmap::before {
  content: "";
  position: absolute;
  top: 28px;
  left: 4%; right: 4%;
  height: 2px;
  background: var(--color-border-dark);
  z-index: 0;
}
.section--dark .roadmap::before { background: var(--color-border-dark); }
.roadmap__step { position: relative; z-index: 1; text-align: center; }
.roadmap__num {
  width: 56px; height: 56px;
  margin: 0 auto var(--space-4);
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-accent-on-dark-text);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 22px;
  box-shadow: 0 0 0 6px var(--color-bg-dark);
}
.section:not(.section--dark) .roadmap__num { box-shadow: 0 0 0 6px var(--color-bg-light); }
.roadmap__step h3 { font-size: 17px; margin-bottom: var(--space-2); }
.roadmap__step p { font-size: 14px; color: var(--color-text-muted); }
.section--dark .roadmap__step p { color: var(--color-text-muted-on-dark); }
@media (max-width: 800px) {
  .roadmap { grid-template-columns: 1fr; gap: var(--space-8); }
  .roadmap::before { display: none; }
}

/* ---------- FAQ ACCORDION ---------- */
.faq { max-width: 820px; margin: 0 auto; }
.faq__item {
  border-bottom: 1px solid var(--color-border-light);
}
.faq__item:first-child { border-top: 1px solid var(--color-border-light); }
.faq__q {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%;
  padding: var(--space-6) 0;
  background: transparent; border: 0;
  font-size: 17px; font-weight: 600;
  color: var(--color-text-dark);
  text-align: left;
  cursor: pointer;
}
.faq__icon {
  width: 24px; height: 24px;
  flex-shrink: 0;
  position: relative;
  margin-left: var(--space-4);
}
.faq__icon::before, .faq__icon::after {
  content: ""; position: absolute;
  background: var(--color-accent);
  transition: transform var(--transition-med);
}
.faq__icon::before { top: 11px; left: 4px; right: 4px; height: 2px; }
.faq__icon::after { left: 11px; top: 4px; bottom: 4px; width: 2px; }
.faq__item.is-open .faq__icon::after { transform: scaleY(0); }
.faq__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--transition-med);
}
.faq__a-inner { overflow: hidden; }
.faq__item.is-open .faq__a { grid-template-rows: 1fr; }
.faq__a p { padding: 0 0 var(--space-6); color: var(--color-text-muted); font-size: 16px; }

/* ---------- CTA BAND ---------- */
.cta-band {
  background: linear-gradient(135deg, var(--color-bg-dark), #134155);
  color: var(--color-text-light);
  padding: var(--space-16) 0;
  text-align: center;
}
.cta-band h2 { color: var(--color-text-light); margin-bottom: var(--space-3); }
.cta-band p { color: var(--color-text-muted-on-dark); max-width: 640px; margin: 0 auto var(--space-6); font-size: 18px; }

/* ---------- FORMS ---------- */
.form {
  display: grid;
  gap: var(--space-4);
}
.form__row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
@media (max-width: 600px) { .form__row { grid-template-columns: 1fr; } }
.form label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: var(--space-2);
  color: var(--color-text-dark);
}
.section--dark .form label { color: var(--color-text-light); }
.form input, .form select, .form textarea {
  width: 100%;
  padding: 12px 14px;
  font: inherit;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  background: var(--color-bg-light-alt);
  color: var(--color-text-dark);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.form input:focus, .form select:focus, .form textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.18);
}
.form textarea { min-height: 140px; resize: vertical; }
.form__error { font-size: 13px; color: #dc2626; margin-top: 4px; display: none; }
.form__field.has-error .form__error { display: block; }
.form__field.has-error input,
.form__field.has-error select,
.form__field.has-error textarea { border-color: #dc2626; }
.form__success {
  display: none;
  padding: var(--space-4);
  background: rgba(6, 182, 212, 0.10);
  border: 1px solid var(--color-accent);
  color: var(--color-text-dark);
  border-radius: var(--radius-sm);
  font-weight: 500;
}
.form.is-success .form__success { display: block; }
.section--dark .form__success { color: var(--color-text-light); }

/* Inline contact card (used on contact page) */
.contact-card {
  background: var(--color-surface);
  color: var(--color-text-light);
  border-radius: var(--radius-md);
  padding: var(--space-8);
}
.contact-card h3 { color: var(--color-text-light); }
.contact-card a { color: var(--color-accent); }
.contact-card .map-frame {
  margin-top: var(--space-4);
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--color-border-dark);
}
.contact-card iframe { width: 100%; height: 220px; border: 0; display: block; }

/* Service-page CSS-pattern hero (for ISO 27001 — no photo) */
.hero__pattern {
  position: relative;
  border-radius: var(--radius-md);
  background:
    linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  aspect-ratio: 4/3;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.hero__pattern::before {
  content: "";
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.10) 1px, transparent 1px);
  background-size: 24px 24px;
}
.hero__pattern svg { position: relative; width: 56%; height: auto; opacity: 0.95; }
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat(css): add roadmap, FAQ accordion, CTA band, form, and contact card styles"
```

---

### Task 11: JavaScript — `main.js` (nav toggle, FAQ, contact form)

**Files:**
- Create: `assets/js/main.js`

- [ ] **Step 1: Write `assets/js/main.js`**

```javascript
(function () {
  "use strict";

  // ---------- MOBILE NAV TOGGLE ----------
  function initNavToggle() {
    var toggle = document.querySelector(".site-nav__toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) {
      return;
    }
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ---------- FAQ ACCORDION ----------
  function initFaq() {
    var items = document.querySelectorAll(".faq__item");
    items.forEach(function (item) {
      var btn = item.querySelector(".faq__q");
      if (!btn) {
        return;
      }
      btn.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        // Single-open behavior: close any other open item first.
        items.forEach(function (other) {
          other.classList.remove("is-open");
          var b = other.querySelector(".faq__q");
          if (b) {
            b.setAttribute("aria-expanded", "false");
          }
        });
        if (willOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // ---------- CONTACT FORM (mailto submission) ----------
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) {
      return;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Clear previous errors
      form.querySelectorAll(".form__field.has-error").forEach(function (f) {
        f.classList.remove("has-error");
      });

      var name = form.querySelector("[name='name']");
      var email = form.querySelector("[name='email']");
      var company = form.querySelector("[name='company']");
      var phone = form.querySelector("[name='phone']");
      var service = form.querySelector("[name='service']");
      var message = form.querySelector("[name='message']");

      var hasError = false;
      function flagError(input) {
        if (!input) {
          return;
        }
        var field = input.closest(".form__field");
        if (field) {
          field.classList.add("has-error");
        }
        hasError = true;
      }

      if (!name || !name.value.trim()) {
        flagError(name);
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        flagError(email);
      }
      if (!message || !message.value.trim()) {
        flagError(message);
      }
      if (hasError) {
        return;
      }

      var to = "oksana@norma-via.com";
      var subject = "Consultation request from " + name.value.trim();
      var bodyLines = [
        "Name: " + name.value.trim(),
        "Email: " + email.value.trim(),
        "Company: " + (company && company.value.trim() ? company.value.trim() : "(not provided)"),
        "Phone: " + (phone && phone.value.trim() ? phone.value.trim() : "(not provided)"),
        "Service of interest: " + (service && service.value ? service.value : "(not specified)"),
        "",
        "Message:",
        message.value.trim()
      ];
      var mailto = "mailto:" + to
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(bodyLines.join("\n"));
      window.location.href = mailto;

      form.classList.add("is-success");
    });
  }

  // ---------- INIT ----------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initNavToggle();
      initFaq();
      initContactForm();
    });
  } else {
    initNavToggle();
    initFaq();
    initContactForm();
  }
})();
```

- [ ] **Step 2: Verify (deferred)**

JS is verified once it has DOM to interact with — final verification happens in Task 18 (homepage build) and Task 23 (contact page).

- [ ] **Step 3: Commit**

```bash
git add assets/js/main.js
git commit -m "feat(js): add main.js with nav toggle, FAQ accordion, and contact form mailto handler"
```

---

## Canonical HTML snippets (referenced by every page-build task)

The following snippets are **canonical**. Page-build tasks reference them by name (e.g., "use SNIPPET-HEAD with title=X, description=Y"). Do **not** modify the snippet logic page-by-page — only fill the per-page placeholders shown in `{{ }}`.

### SNIPPET-HEAD (every page's `<head>`)

Replace `{{TITLE}}`, `{{DESCRIPTION}}`, `{{CANONICAL}}`, `{{OG_IMAGE_RELATIVE_PATH}}` per page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>{{TITLE}}</title>
<meta name="description" content="{{DESCRIPTION}}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="{{CANONICAL}}">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Norma Via Group">
<meta property="og:title" content="{{TITLE}}">
<meta property="og:description" content="{{DESCRIPTION}}">
<meta property="og:image" content="https://www.normaviagroup.com/{{OG_IMAGE_RELATIVE_PATH}}">
<meta property="og:url" content="{{CANONICAL}}">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{TITLE}}">
<meta name="twitter:description" content="{{DESCRIPTION}}">
<meta name="twitter:image" content="https://www.normaviagroup.com/{{OG_IMAGE_RELATIVE_PATH}}">

<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="{{ROOT}}favicon.svg">
<link rel="icon" type="image/x-icon" href="{{ROOT}}favicon.ico">
<link rel="apple-touch-icon" href="{{ROOT}}apple-touch-icon.png">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Styles + scripts -->
<link rel="stylesheet" href="{{ROOT}}assets/css/styles.css">
<script defer src="{{ROOT}}assets/js/main.js"></script>

<!-- Site-wide Organization JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Norma Via Group",
  "alternateName": "QExcellence",
  "description": "ISO certification and cybersecurity compliance consulting for quality and regulated industries.",
  "url": "https://www.norma-via.com/",
  "logo": "https://www.norma-via.com/assets/img/logo.svg",
  "image": "https://www.norma-via.com/assets/img/manuf.jpg",
  "telephone": "+1-425-381-0191",
  "email": "oksana@norma-via.com",
  "foundingDate": "2025",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "addressCountry": "US"
  },
  "areaServed": "United States",
  "sameAs": [
    "https://www.linkedin.com/company/qexcellence/",
    "https://www.facebook.com/QExcellence-103945661194339",
    "https://www.instagram.com/_qexcellence_/"
  ]
}
</script>

<!-- {{ANALYTICS}} placeholder for GA4/Plausible/Clarity tag -->
<!-- {{PER_PAGE_JSONLD}} per-page Service/BreadcrumbList JSON-LD inserted here -->
</head>
```

**`{{ROOT}}` rule:** the root path is `""` (empty string) for top-level pages (`index.html`, `about.html`, `contact.html`) and `"../"` for service pages (since they live in `/services/`). All `{{ROOT}}`-prefixed asset paths are relative.

### SNIPPET-HEADER (top of every `<body>`)

Replace `{{ROOT}}` per the rule above.

```html
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__logo" href="{{ROOT}}index.html" aria-label="Norma Via Group home">
      <img src="{{ROOT}}assets/img/logo.svg" alt="Norma Via Group" width="180" height="32">
    </a>
    <button class="site-nav__toggle" type="button" aria-controls="site-nav" aria-expanded="false">
      <span class="site-nav__toggle-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Toggle navigation</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Primary">
      <a href="{{ROOT}}index.html#services">Services</a>
      <a href="{{ROOT}}about.html">About</a>
      <a href="{{ROOT}}contact.html">Contact</a>
      <a class="btn btn--primary" href="{{ROOT}}contact.html">Start Your Audit-Ready Plan Today</a>
    </nav>
  </div>
</header>
```

### SNIPPET-FOOTER (every page, immediately before `</body>`)

```html
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        <img src="{{ROOT}}assets/img/logo-dark-bg.svg" alt="Norma Via Group" width="180" height="32">
        <p>ISO certification and cybersecurity compliance consulting. Seattle, WA &mdash; serving the United States.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="{{ROOT}}services/iso-9001.html">ISO 9001</a></li>
          <li><a href="{{ROOT}}services/cmmc-nist-800-171.html">CMMC / NIST&nbsp;800-171</a></li>
          <li><a href="{{ROOT}}services/iso-27001.html">ISO 27001</a></li>
          <li><a href="{{ROOT}}services/as9100.html">AS9100</a></li>
          <li><a href="{{ROOT}}services/gmp-iso-13485.html">GMP / ISO 13485</a></li>
          <li><a href="{{ROOT}}services/internal-auditing.html">Internal Auditing</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="{{ROOT}}about.html">About</a></li>
          <li><a href="{{ROOT}}contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="site-footer__contact">
        <h4>Contact</h4>
        <p>Seattle, WA, USA</p>
        <p><a href="mailto:oksana@norma-via.com">oksana@norma-via.com</a></p>
        <p><a href="tel:+14250000000">+1 (425) 000-0000</a></p>
        <div class="site-footer__social" aria-label="Social profiles">
          <a href="https://www.linkedin.com/company/qexcellence/" aria-label="LinkedIn" rel="noopener" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-.9 1.7-1.9 3.6-1.9 3.9 0 4.6 2.5 4.6 5.8V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>
          </a>
          <a href="https://www.facebook.com/QExcellence-103945661194339" aria-label="Facebook" rel="noopener" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5v1.8h2.6l-.4 2.9h-2.2v7A10 10 0 0022 12z"/></svg>
          </a>
          <a href="https://www.instagram.com/_qexcellence_/" aria-label="Instagram" rel="noopener" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-2.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>&copy; 2026 Norma Via Group. All rights reserved.</p>
      <p>Seattle, WA &middot; oksana@norma-via.com</p>
    </div>
  </div>
</footer>
```

These three snippets — **SNIPPET-HEAD**, **SNIPPET-HEADER**, **SNIPPET-FOOTER** — are referenced by every page-build task that follows.

---

### Task 12: Build `index.html` — head + hero + value pillars

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with `<head>`, header, hero, and pillar grid**

Use SNIPPET-HEAD with:
- `{{TITLE}}` = `ISO Certification Consulting in Seattle | Norma Via Group`
- `{{DESCRIPTION}}` = `Seattle-based ISO and cybersecurity certification consultancy. ISO 9001, CMMC, ISO 27001, AS9100, ISO 13485 — from gap analysis to certificate.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/manuf.jpg`
- `{{ROOT}}` = `` (empty)

Use SNIPPET-HEADER with `{{ROOT}}=""`.

```html
<!-- ... SNIPPET-HEAD here, with the substitutions above ... -->
<body>
<!-- ... SNIPPET-HEADER here, with {{ROOT}}="" ... -->

<main id="main">

<!-- HERO -->
<section class="hero">
  <div class="container hero__inner">
    <span class="eyebrow" style="color: #5eead4;">Norma Via Group</span>
    <h1>From gap analysis to certificate &ndash; without the guesswork.</h1>
    <p class="lede">We guide quality, environmental, safety, and cybersecurity teams through ISO, CMMC, and more. End-to-end, on time, on the first audit &mdash; with compliance that supports business growth.</p>
    <div class="hero__ctas">
      <a class="btn btn--primary btn-arrow" href="contact.html">Start Your Audit-Ready Plan Today</a>
      <a class="btn btn--ghost" href="#services">View our services</a>
    </div>
  </div>
</section>

<!-- VALUE PILLARS -->
<section class="section section--surface">
  <div class="container">
    <div class="section-header">
      <h2>Compliance, simplified.</h2>
      <p>Three things every certification project needs &mdash; and the three things we lead with.</p>
    </div>
    <div class="grid grid--3">
      <div class="pillar">
        <div class="pillar__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h3>Audit-ready systems</h3>
        <p>Documented, lived-in management systems &mdash; not paperwork built the night before the audit.</p>
      </div>
      <div class="pillar">
        <div class="pillar__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h7m4 0h7M12 3v7m0 4v7"/></svg>
        </div>
        <h3>Quality + cybersecurity, one partner</h3>
        <p>Most consultancies pick a lane. We bridge ISO quality systems and cybersecurity frameworks under one roof.</p>
      </div>
      <div class="pillar">
        <div class="pillar__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
        </div>
        <h3>Decades of field experience</h3>
        <p>Our lead consultant has conducted 300+ audits across 22 countries. We&rsquo;ve sat on both sides of the table.</p>
      </div>
    </div>
  </div>
</section>
```

(Continued in Task 13.)

- [ ] **Step 2: Skip commit until Task 13 (incomplete page)**

Continue without committing — `index.html` will be committed once it's complete after Task 16.

---

### Task 13: `index.html` — two-domain split + service grid

**Files:**
- Modify: `index.html` (append before existing `</main>` if any; actually we haven't closed `</main>` yet — append directly)

- [ ] **Step 1: Append two-domain split + service grid sections**

Append to `index.html` (still inside `<main>`):

```html
<!-- TWO-DOMAIN SPLIT -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>A clearer, faster path to compliance.</h2>
      <p>Whether you make products or process data, we cover the standards your customers ask about.</p>
    </div>

    <div class="split-row">
      <div class="split-row__image">
        <img src="assets/img/factory-industry-ai.jpg" alt="Assembly line employees using technology in a manufacturing environment" loading="lazy">
      </div>
      <div>
        <span class="eyebrow">Quality &amp; manufacturing</span>
        <h3>For manufacturers, medical-device makers, aerospace suppliers</h3>
        <p>You ship physical products. Your customers expect documented quality. We help you build a management system that actually runs the business &mdash; not just one that passes the audit.</p>
        <ul class="check-list">
          <li>ISO 9001 &mdash; quality management</li>
          <li>AS9100 &mdash; aerospace quality</li>
          <li>ISO 13485 / GMP &mdash; medical devices</li>
        </ul>
      </div>
    </div>

    <div class="split-row split-row--reverse">
      <div class="split-row__image">
        <img src="assets/img/lock-encryption-ai.jpg" alt="AI-generated lock and encryption cybersecurity illustration" loading="lazy">
      </div>
      <div>
        <span class="eyebrow">Cybersecurity &amp; regulated industries</span>
        <h3>For DoD contractors, SaaS companies, and regulated services</h3>
        <p>You handle data your customers and regulators care about. We translate frameworks into operational controls &mdash; with a clear path to certification.</p>
        <ul class="check-list">
          <li>CMMC / NIST 800-171 &mdash; defense supply chain</li>
          <li>ISO 27001 &mdash; information security management</li>
          <li>Internal audits &mdash; ongoing surveillance &amp; readiness</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- SERVICE GRID -->
<section class="section section--surface" id="services">
  <div class="container">
    <div class="section-header">
      <h2>What we do</h2>
      <p>Six certification programs. One way of working: gap-find, build, audit, certify.</p>
    </div>
    <div class="grid grid--3">
      <a class="card" href="services/iso-9001.html">
        <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg></div>
        <h3>ISO 9001</h3>
        <p>The world&rsquo;s most-recognized quality management standard, applicable across industries.</p>
        <span class="card__link btn-arrow">Learn more</span>
      </a>
      <a class="card" href="services/cmmc-nist-800-171.html">
        <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg></div>
        <h3>CMMC / NIST 800-171</h3>
        <p>The cybersecurity baseline for DoD contractors and the defense industrial base.</p>
        <span class="card__link btn-arrow">Learn more</span>
      </a>
      <a class="card" href="services/iso-27001.html">
        <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
        <h3>ISO 27001</h3>
        <p>The international standard for information security management systems.</p>
        <span class="card__link btn-arrow">Learn more</span>
      </a>
      <a class="card" href="services/as9100.html">
        <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12l20-9-9 20-2-9z"/></svg></div>
        <h3>AS9100</h3>
        <p>Aerospace quality management &mdash; ISO 9001 plus 100+ aerospace-specific requirements.</p>
        <span class="card__link btn-arrow">Learn more</span>
      </a>
      <a class="card" href="services/gmp-iso-13485.html">
        <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 0a4 4 0 014 4v8H8v-8a4 4 0 014-4z"/></svg></div>
        <h3>GMP / ISO 13485</h3>
        <p>Medical-device quality and good manufacturing practice for FDA and international markets.</p>
        <span class="card__link btn-arrow">Learn more</span>
      </a>
      <a class="card" href="services/internal-auditing.html">
        <div class="card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg></div>
        <h3>Internal Auditing</h3>
        <p>On-demand internal auditors who keep your management system audit-ready year-round.</p>
        <span class="card__link btn-arrow">Learn more</span>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Skip commit (continue to Task 14)**

---

### Task 14: `index.html` — roadmap + Why Norma Via + FAQ

**Files:**
- Modify: `index.html` (append)

- [ ] **Step 1: Append roadmap + credibility + FAQ sections**

```html
<!-- ROADMAP -->
<section class="section section--dark">
  <div class="container">
    <div class="section-header">
      <h2>How we work</h2>
      <p>Every engagement follows the same four-step path &mdash; tailored, not formulaic.</p>
    </div>
    <ol class="roadmap" style="list-style: none; padding: 0;">
      <li class="roadmap__step">
        <div class="roadmap__num">1</div>
        <h3>Gap analysis</h3>
        <p>Where you are versus where the standard says you need to be &mdash; clear, prioritized, no fluff.</p>
      </li>
      <li class="roadmap__step">
        <div class="roadmap__num">2</div>
        <h3>Implementation &amp; documentation</h3>
        <p>We build the management system with you &mdash; processes, records, training, controls.</p>
      </li>
      <li class="roadmap__step">
        <div class="roadmap__num">3</div>
        <h3>Internal audit &amp; CAPA</h3>
        <p>We run the dress rehearsal: audit your system, find the issues, drive corrective actions.</p>
      </li>
      <li class="roadmap__step">
        <div class="roadmap__num">4</div>
        <h3>Certification audit support</h3>
        <p>We&rsquo;re in the room &mdash; preparing your team, answering auditor questions, closing findings.</p>
      </li>
    </ol>
  </div>
</section>

<!-- WHY NORMA VIA -->
<section class="section">
  <div class="container">
    <div class="split-row">
      <div>
        <span class="eyebrow">Why Norma Via</span>
        <h2>Led by experts who have done this 300+ times.</h2>
        <p class="lede">Our lead consultant has conducted more than 300 audits across 22 countries and 150+ manufacturers, with deep certifications in quality and operations.</p>
        <p>Norma Via Group is a young firm built on long experience. We bring a triple perspective to every engagement &mdash; manufacturer, auditor, and consultant &mdash; so clients know what to build, what auditors expect, and how to pass with confidence.</p>
        <a class="btn btn--primary btn-arrow" href="about.html">More about our team</a>
      </div>
      <div class="split-row__image split-row__image--portrait">
        <figure>
          <span class="image-tone-frame">
            <img src="assets/img/oksana.webp" alt="Oksana Goncharov, Lead Consultant at Norma Via Group">
          </span>
          <figcaption style="font-size: 13px; color: var(--color-text-muted); margin-top: 8px;">Oksana Goncharov &mdash; Lead Consultant. 20 years in quality and manufacturing.</figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section section--surface">
  <div class="container">
    <div class="section-header">
      <h2>Frequently asked questions</h2>
      <p>The questions we hear most from companies starting their certification journey.</p>
    </div>
    <div class="faq">
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">How long does ISO certification take?<span class="faq__icon" aria-hidden="true"></span></button>
        <div class="faq__a"><div class="faq__a-inner"><p>For a small-to-mid company starting from scratch, expect 6&ndash;9 months from kickoff to certification audit. Companies with mature processes can move faster &mdash; we&rsquo;ve certified in as little as 4 months. The biggest variable is your team&rsquo;s availability for documentation and training.</p></div></div>
      </div>
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">What&rsquo;s the difference between ISO 9001 and AS9100?<span class="faq__icon" aria-hidden="true"></span></button>
        <div class="faq__a"><div class="faq__a-inner"><p>AS9100 is ISO 9001 plus more than 100 additional requirements specific to aerospace &mdash; things like risk management, configuration control, counterfeit-parts prevention, and project management. If you&rsquo;re selling into aerospace primes, AS9100 is non-negotiable.</p></div></div>
      </div>
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">Do you offer remote consulting?<span class="faq__icon" aria-hidden="true"></span></button>
        <div class="faq__a"><div class="faq__a-inner"><p>Yes. Most of our engagements are hybrid &mdash; remote for documentation and training, on-site for audits, gemba walks, and management reviews. We&rsquo;ve worked with companies across the U.S. and internationally.</p></div></div>
      </div>
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">Do you support both initial certification and surveillance audits?<span class="faq__icon" aria-hidden="true"></span></button>
        <div class="faq__a"><div class="faq__a-inner"><p>Both. The hard work is keeping a management system alive between audits. We offer ongoing support that ranges from quarterly check-ins to fully outsourced internal-audit programs.</p></div></div>
      </div>
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">Can you help us prepare for CMMC Level 2?<span class="faq__icon" aria-hidden="true"></span></button>
        <div class="faq__a"><div class="faq__a-inner"><p>Yes. We help DoD contractors map their environment to NIST 800-171 controls, build the System Security Plan and Plan of Action &amp; Milestones, run internal assessments, and prepare for the C3PAO assessment.</p></div></div>
      </div>
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">How do you price your engagements?<span class="faq__icon" aria-hidden="true"></span></button>
        <div class="faq__a"><div class="faq__a-inner"><p>Fixed fee for a defined scope, retainer for ongoing support. We don&rsquo;t bill by the hour for certification projects &mdash; you should know what you&rsquo;re paying before you start. The first conversation is always free.</p></div></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Skip commit (continue to Task 15)**

---

### Task 15: `index.html` — final CTA + form + footer + close page

**Files:**
- Modify: `index.html` (append final sections)

- [ ] **Step 1: Append final CTA + form + close `<main>` + footer**

Append to `index.html`:

```html
<!-- FINAL CTA + FORM -->
<section class="section section--dark" id="get-started">
  <div class="container">
    <div class="section-header">
      <span class="eyebrow" style="color: var(--color-accent);">Get started</span>
      <h2>Ready to take control of your quality and security?</h2>
      <p>Tell us a bit about your company and we&rsquo;ll set up a free 30-minute call.</p>
    </div>

    <form class="form" data-contact-form style="max-width: 720px; margin: 0 auto;" novalidate>
      <div class="form__row">
        <div class="form__field">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" required autocomplete="name">
          <span class="form__error">Please enter your name.</span>
        </div>
        <div class="form__field">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required autocomplete="email">
          <span class="form__error">Please enter a valid email.</span>
        </div>
      </div>
      <div class="form__row">
        <div class="form__field">
          <label for="company">Company</label>
          <input id="company" name="company" type="text" autocomplete="organization">
        </div>
        <div class="form__field">
          <label for="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autocomplete="tel">
        </div>
      </div>
      <div class="form__field">
        <label for="service">Service of interest</label>
        <select id="service" name="service">
          <option value="">Not sure yet</option>
          <option value="ISO 9001">ISO 9001</option>
          <option value="CMMC / NIST 800-171">CMMC / NIST 800-171</option>
          <option value="ISO 27001">ISO 27001</option>
          <option value="AS9100">AS9100</option>
          <option value="GMP / ISO 13485">GMP / ISO 13485</option>
          <option value="Internal Auditing">Internal Auditing</option>
        </select>
      </div>
      <div class="form__field">
        <label for="message">Message</label>
        <textarea id="message" name="message" required></textarea>
        <span class="form__error">Please add a short message.</span>
      </div>
      <div>
        <button class="btn btn--primary btn-arrow" type="submit">Start Your Audit-Ready Plan Today</button>
      </div>
      <div class="form__success" role="status">Thanks &mdash; your message is being prepared in your mail client. If nothing opens, email us at <a href="mailto:oksana@norma-via.com">oksana@norma-via.com</a>.</div>
    </form>
  </div>
</section>

</main>
```

Then immediately follow with **SNIPPET-FOOTER** (with `{{ROOT}}=""`), then `</body></html>`.

- [ ] **Step 2: Verify the homepage end-to-end**

```bash
start "" "D:\source\qexcellence-site\index.html"
```

Expected:
- Hero shows on dark slate gradient with cyan CTAs
- All sections render in order (hero, pillars, two-domain, services, roadmap, why, FAQ, form, footer)
- Click hamburger at <768px viewport — nav opens/closes
- Click an FAQ question — accordion expands; clicking another closes the first
- Submit form with valid data — opens default mail client with pre-filled subject + body
- Submit form with no name/email — fields show red error states
- Browser dev console: no errors

- [ ] **Step 3: Validate the homepage**

Open <https://validator.w3.org/nu/#textarea>, paste full `index.html` source, click "Check". Fix any errors flagged (warnings about `<section>` lacking heading are OK to ignore if a section legitimately lacks one).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(home): build complete homepage with hero, services, roadmap, FAQ, contact form"
```

---

### Task 16: Build `services/iso-9001.html`

**Files:**
- Create: `services/iso-9001.html`

This is the **prototype service page** — the others copy this structure with content substitutions. Build it carefully.

- [ ] **Step 1: Create `services/iso-9001.html`**

Use SNIPPET-HEAD with:
- `{{TITLE}}` = `ISO 9001 Certification Consulting | Norma Via Group`
- `{{DESCRIPTION}}` = `Plan, build, and pass your ISO 9001 quality management system audit. Seattle-based consultancy with 300+ audits of experience.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/services/iso-9001.html`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/manuf.jpg`
- `{{ROOT}}` = `../`

In the `<head>`, after the Organization JSON-LD, add per-page schemas:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "ISO 9001 Certification Consulting",
  "provider": { "@type": "ProfessionalService", "name": "Norma Via Group", "url": "https://www.normaviagroup.com/" },
  "areaServed": "United States",
  "serviceType": "ISO 9001 Quality Management System certification consulting",
  "description": "End-to-end ISO 9001 certification: gap analysis, system implementation, internal audit, and certification audit support."
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.normaviagroup.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.normaviagroup.com/index.html#services" },
    { "@type": "ListItem", "position": 3, "name": "ISO 9001", "item": "https://www.normaviagroup.com/services/iso-9001.html" }
  ]
}
</script>
```

After SNIPPET-HEADER (`{{ROOT}}="../"`), the body of the page:

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container">
    <ol>
      <li><a href="../index.html">Home</a></li>
      <li><a href="../index.html#services">Services</a></li>
      <li aria-current="page">ISO 9001</li>
    </ol>
  </div>
</nav>

<main id="main">

<!-- HERO -->
<section class="hero hero--split">
  <div class="container hero__inner">
    <div>
      <span class="eyebrow" style="color: #5eead4;">Service</span>
      <h1>ISO 9001 Certification Consulting</h1>
      <p class="lede">Build a quality management system that runs your business and passes your audit &mdash; on the first try.</p>
      <a class="btn btn--primary btn-arrow" href="../contact.html">Start Your Audit-Ready Plan Today</a>
    </div>
    <div class="hero__image">
      <img src="../assets/img/manuf.jpg" alt="Manufacturing facility floor with operators at quality stations">
    </div>
  </div>
</section>

<!-- WHAT IT IS -->
<section class="section">
  <div class="container">
    <div class="grid grid--2" style="gap: 64px;">
      <div>
        <span class="eyebrow">What it is</span>
        <h2>The world&rsquo;s most-recognized quality standard</h2>
      </div>
      <div>
        <p>ISO 9001 is the international standard for quality management systems. More than one million organizations across every industry are certified to it. Customers ask for it. Tier-1 suppliers require it. Public-sector tenders demand it.</p>
        <p>Certification means an accredited third party has audited your system and confirmed it conforms to the standard. It&rsquo;s about consistency: doing the same thing the same way every time, learning from problems, and getting better measurably.</p>
      </div>
    </div>
  </div>
</section>

<!-- WHO NEEDS IT -->
<section class="section section--surface">
  <div class="container">
    <div class="section-header">
      <h2>Who needs ISO 9001?</h2>
    </div>
    <div class="grid grid--3">
      <div><h3>Manufacturers</h3><ul class="check-list"><li>Tier-2 / Tier-3 suppliers required to be certified by primes</li><li>Companies pursuing larger or international customers</li><li>Firms expanding into regulated end markets</li></ul></div>
      <div><h3>Service businesses</h3><ul class="check-list"><li>Engineering, IT, and professional-services firms</li><li>Logistics, distribution, and field-service operators</li><li>Companies in public-sector procurement</li></ul></div>
      <div><h3>Companies preparing for adjacent standards</h3><ul class="check-list"><li>AS9100 (aerospace) builds on ISO 9001</li><li>ISO 13485 (medical) shares the same DNA</li><li>ISO 9001 first is often the lowest-friction path</li></ul></div>
    </div>
  </div>
</section>

<!-- OUR APPROACH -->
<section class="section section--dark">
  <div class="container">
    <div class="section-header">
      <h2>Our approach to ISO 9001</h2>
      <p>The same four-step path that has put 300+ audits in the win column.</p>
    </div>
    <ol class="roadmap" style="list-style: none; padding: 0;">
      <li class="roadmap__step"><div class="roadmap__num">1</div><h3>Gap analysis</h3><p>Two-day on-site (or remote) review of your current state versus ISO 9001:2015.</p></li>
      <li class="roadmap__step"><div class="roadmap__num">2</div><h3>Implementation</h3><p>We co-build process documentation, records, training, and management review cadence.</p></li>
      <li class="roadmap__step"><div class="roadmap__num">3</div><h3>Internal audit</h3><p>Full internal audit, CAPA management, and management review &mdash; the dress rehearsal.</p></li>
      <li class="roadmap__step"><div class="roadmap__num">4</div><h3>Certification audit</h3><p>We&rsquo;re in the room with you: stage-1 readiness review, stage-2 audit support, finding closure.</p></li>
    </ol>
  </div>
</section>

<!-- WHAT YOU GET -->
<section class="section">
  <div class="container">
    <div class="section-header"><h2>What you get</h2></div>
    <div class="grid grid--3">
      <div class="card"><h3>Gap analysis report</h3><p>Plain-English, prioritized. What&rsquo;s missing, what&rsquo;s weak, and what to do first.</p></div>
      <div class="card"><h3>Documented system</h3><p>Quality manual, process maps, procedures, forms, and records &mdash; tailored to how you actually work.</p></div>
      <div class="card"><h3>Training plan</h3><p>Role-based training: management, process owners, internal auditors, frontline staff.</p></div>
      <div class="card"><h3>Internal audit program</h3><p>Audit schedule, audit checklists, internal-auditor training, and one full audit cycle.</p></div>
      <div class="card"><h3>Audit support</h3><p>Stage-1 and stage-2 audit attendance. We answer auditor questions alongside your team.</p></div>
      <div class="card"><h3>Surveillance program</h3><p>Optional ongoing support to keep your system audit-ready between recertification cycles.</p></div>
    </div>
  </div>
</section>

<!-- RELATED -->
<section class="section section--surface">
  <div class="container">
    <div class="section-header"><h2>Related services</h2></div>
    <div class="grid grid--3">
      <a class="card" href="as9100.html"><h3>AS9100</h3><p>Aerospace quality &mdash; ISO 9001 plus aerospace-specific requirements.</p><span class="card__link btn-arrow">Learn more</span></a>
      <a class="card" href="gmp-iso-13485.html"><h3>GMP / ISO 13485</h3><p>Medical-device quality and good manufacturing practice.</p><span class="card__link btn-arrow">Learn more</span></a>
      <a class="card" href="internal-auditing.html"><h3>Internal Auditing</h3><p>Outsourced internal audits to keep your ISO 9001 system audit-ready.</p><span class="card__link btn-arrow">Learn more</span></a>
    </div>
  </div>
</section>

<!-- CTA BAND -->
<section class="cta-band">
  <div class="container">
    <h2>Ready to start your ISO 9001 certification?</h2>
    <p>The first conversation is always free. We&rsquo;ll scope the work, give you a realistic timeline, and tell you whether we&rsquo;re the right fit.</p>
    <a class="btn btn--primary btn-arrow" href="../contact.html">Start Your Audit-Ready Plan Today</a>
  </div>
</section>

</main>
```

End with **SNIPPET-FOOTER** (`{{ROOT}}="../"`) and `</body></html>`.

- [ ] **Step 2: Verify**

```bash
start "" "D:\source\qexcellence-site\services\iso-9001.html"
```

Expected: breadcrumb at top, split hero with `manuf.jpg`, all 7 sections render, links from breadcrumb back to home work, related-service cards link sideways correctly. No console errors.

- [ ] **Step 3: Validate JSON-LD**

Copy the page source. Paste into <https://search.google.com/test/rich-results>. Expected: **3 valid items detected** — Service, BreadcrumbList, ProfessionalService.

- [ ] **Step 4: Commit**

```bash
git add services/iso-9001.html
git commit -m "feat(services): build ISO 9001 service page (the template prototype)"
```

---

### Task 17: Build `services/cmmc-nist-800-171.html`

**Files:**
- Create: `services/cmmc-nist-800-171.html`

Same overall structure as `iso-9001.html` (Task 16). Substitute the page-specific content below; keep all section markup (`hero hero--split`, `breadcrumb`, `roadmap`, `cta-band`, etc.) verbatim.

**SNIPPET-HEAD substitutions:**
- `{{TITLE}}` = `CMMC and NIST 800-171 Compliance Consulting | Norma Via Group`
- `{{DESCRIPTION}}` = `CMMC Level 1, Level 2, and NIST 800-171 readiness for DoD contractors and the defense industrial base. Seattle-based, nationwide service.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/services/cmmc-nist-800-171.html`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/pcb_repair.jpg`
- `{{ROOT}}` = `../`

**Per-page JSON-LD (replace the Service block content):**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "CMMC and NIST 800-171 Compliance Consulting",
  "provider": { "@type": "ProfessionalService", "name": "Norma Via Group", "url": "https://www.normaviagroup.com/" },
  "areaServed": "United States",
  "serviceType": "CMMC and NIST 800-171 cybersecurity compliance consulting",
  "description": "CMMC Level 1 / Level 2 readiness, SSP and POA&M development, internal assessments, and C3PAO assessment support for DoD contractors."
}
```

BreadcrumbList: position 3 name = `CMMC / NIST 800-171`, item URL ends with `/services/cmmc-nist-800-171.html`.

**Hero section (in body):**
```html
<section class="hero hero--split">
  <div class="container hero__inner">
    <div>
      <span class="eyebrow" style="color: #5eead4;">Service</span>
      <h1>CMMC &amp; NIST 800-171 Compliance Consulting</h1>
      <p class="lede">DoD contracts demand cybersecurity proof. We get you assessment-ready &mdash; and keep you there.</p>
      <a class="btn btn--primary btn-arrow" href="../contact.html">Start Your Audit-Ready Plan Today</a>
    </div>
    <div class="hero__image">
      <img src="../assets/img/pcb_repair.jpg" alt="Technician working on a circuit board in a controlled environment">
    </div>
  </div>
</section>
```

**Breadcrumb 3rd item:** `CMMC / NIST 800-171`.

**"What it is" section copy:**
> Cybersecurity Maturity Model Certification (CMMC) is the U.S. Department of Defense's framework for protecting sensitive information across the defense industrial base. CMMC builds on NIST SP 800-171 — the 110-control standard required of any contractor handling Controlled Unclassified Information (CUI).
>
> Most DoD contractors land at CMMC Level 2, which requires a third-party (C3PAO) assessment. Level 1 is self-attested. Either way, contracts increasingly require the proof to be verifiable.

**"Who needs this" three columns:**
- "DoD prime contractors and subs" — bullets: Direct DoD awardees / Tier-1 / Tier-2 subcontractors / Anyone receiving CUI
- "Companies in DoD pipelines" — bullets: Aerospace and defense suppliers / Manufacturers with FedGov customers / Engineering services firms bidding on DoD work
- "Adjacent regulated industries" — bullets: Critical infrastructure operators / Companies bridging into FedRAMP / Anyone overlapping with ITAR or EAR

**Roadmap copy** (same structure, different bullets):
- Step 1 — *Gap assessment*: Map your current environment to NIST 800-171 controls. Identify the gap between assumed and actual scope.
- Step 2 — *SSP &amp; POA&amp;M build*: System Security Plan, Plan of Action & Milestones, control narratives, evidence templates.
- Step 3 — *Internal assessment*: Pre-assessment dry run using the official DoD assessment methodology. Close findings before the C3PAO walks in.
- Step 4 — *C3PAO assessment support*: We coordinate with your assessor, prepare your team, and resolve findings during and after the assessment.

**"What you get" 6 cards:**
1. CUI scope analysis
2. System Security Plan (SSP)
3. Plan of Action & Milestones (POA&M)
4. Control implementation roadmap
5. Internal assessment & findings closure
6. C3PAO assessment readiness

**Related services:** ISO 27001, Internal Auditing, ISO 9001 (cards link to those).

**CTA band:**
> Ready to start your CMMC readiness work? The first conversation is free. We'll scope your environment, your timeline, and your assessment target.

- [ ] **Step 1: Create the file** by copying `services/iso-9001.html` and applying all the substitutions above. **Verify** every URL/image/link/text reference is updated.

- [ ] **Step 2: Verify**

```bash
start "" "D:\source\qexcellence-site\services\cmmc-nist-800-171.html"
```

Expected: page renders, image loads, JSON-LD validates at <https://search.google.com/test/rich-results>.

- [ ] **Step 3: Commit**

```bash
git add services/cmmc-nist-800-171.html
git commit -m "feat(services): build CMMC / NIST 800-171 service page"
```

---

### Task 18: Build `services/iso-27001.html` (no photo — uses CSS pattern)

**Files:**
- Create: `services/iso-27001.html`

Same template as Task 16, **but the hero image is replaced by a CSS pattern** because we have no q-excel photo that fits cybersecurity.

**SNIPPET-HEAD substitutions:**
- `{{TITLE}}` = `ISO 27001 Implementation Consultant | Norma Via Group`
- `{{DESCRIPTION}}` = `ISO 27001 information security management system implementation and certification. SaaS, B2B, and regulated industries. Seattle-based.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/services/iso-27001.html`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/pcb_repair.jpg` *(reused for OG only — page itself uses no photo)*
- `{{ROOT}}` = `../`

**Per-page Service JSON-LD:**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "ISO 27001 Implementation Consultant",
  "provider": { "@type": "ProfessionalService", "name": "Norma Via Group", "url": "https://www.normaviagroup.com/" },
  "areaServed": "United States",
  "serviceType": "ISO 27001 information security management system consulting",
  "description": "ISO 27001 ISMS scoping, risk assessment, Statement of Applicability, control implementation, internal audit, and certification audit support."
}
```

BreadcrumbList 3rd item: `ISO 27001`.

**Hero section** — replace the `<div class="hero__image"><img ... /></div>` with a CSS pattern panel:

```html
<section class="hero hero--split">
  <div class="container hero__inner">
    <div>
      <span class="eyebrow" style="color: #5eead4;">Service</span>
      <h1>ISO 27001 Implementation Consulting</h1>
      <p class="lede">A risk-based information-security management system that holds up to enterprise customer audits and certification.</p>
      <a class="btn btn--primary btn-arrow" href="../contact.html">Start Your Audit-Ready Plan Today</a>
    </div>
    <div class="hero__pattern" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="14" y="28" width="36" height="26" rx="3" fill="rgba(15, 23, 42, 0.18)"/>
        <path d="M22 28v-8a10 10 0 0120 0v8"/>
        <circle cx="32" cy="41" r="3"/>
        <path d="M32 44v6"/>
      </svg>
    </div>
  </div>
</section>
```

**"What it is" copy:**
> ISO 27001 is the international standard for information security management. Unlike checklist frameworks, it's risk-based: you identify your assets, the threats and vulnerabilities they face, and select controls to manage that risk to a tolerable level.
>
> Certification proves to enterprise customers, regulators, and auditors that your security program is built on a coherent management system — not a snapshot of point-in-time controls.

**"Who needs ISO 27001" 3 columns:**
- "SaaS and B2B technology" — bullets: Companies selling into enterprise / SOC2 alone is no longer enough / EU and UK customer requirements
- "Regulated services" — bullets: Financial services, fintech, healthcare-adjacent / Cloud and managed services providers / Data processors under GDPR
- "Companies with adjacent compliance" — bullets: Pairs with NIST 800-171 / Foundation for ISO 27017/27018 / Cleaner basis for SOC 2 Type 2

**Roadmap (4 steps):**
- Step 1 — *Scope & risk assessment*: Define ISMS scope, asset register, risk methodology, risk assessment.
- Step 2 — *Statement of Applicability & controls*: Annex A control selection, Statement of Applicability, gap remediation plan.
- Step 3 — *Internal audit*: Full ISMS internal audit, management review, CAPA cycle.
- Step 4 — *Certification audit support*: Stage-1 readiness review, stage-2 audit support, surveillance planning.

**"What you get":**
1. ISMS scope statement
2. Information asset register
3. Risk assessment & treatment plan
4. Statement of Applicability
5. Annex A control documentation
6. Internal audit & management review

**Related services:** CMMC / NIST 800-171, ISO 9001, Internal Auditing.

**CTA band copy:**
> Thinking about ISO 27001? Let's scope it together. We'll tell you whether you're 4 months out or 12 — honestly.

- [ ] **Step 1: Create the file** by copying `iso-9001.html` and applying all substitutions. **Replace** the hero image with the `hero__pattern` block above.

- [ ] **Step 2: Verify**

```bash
start "" "D:\source\qexcellence-site\services\iso-27001.html"
```

Expected: hero shows cyan gradient panel with a lock icon (no photo). JSON-LD validates.

- [ ] **Step 3: Commit**

```bash
git add services/iso-27001.html
git commit -m "feat(services): build ISO 27001 service page (CSS pattern hero, no photo)"
```

---

### Task 19: Build `services/as9100.html`

**Files:**
- Create: `services/as9100.html`

**SNIPPET-HEAD substitutions:**
- `{{TITLE}}` = `AS9100 Aerospace Quality Certification | Norma Via Group`
- `{{DESCRIPTION}}` = `AS9100 Rev D consulting for aerospace suppliers. Build a quality system that primes accept and your auditor approves. Seattle-based.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/services/as9100.html`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/mfg_check.jpg`
- `{{ROOT}}` = `../`

**Service JSON-LD `name`:** `AS9100 Aerospace Quality Certification`. **Description:** `AS9100 Rev D / 9101 / 9110 / 9120 implementation, internal audit, and certification support for aerospace suppliers.`

BreadcrumbList 3rd item: `AS9100`.

**Hero image:** `../assets/img/mfg_check.jpg`, alt `"Quality inspector checking manufactured parts in an aerospace environment"`.

**Hero copy:**
> Aerospace primes don't just ask for AS9100 — they audit your team to it. We build systems that hold up.

**"What it is" copy:**
> AS9100 is ISO 9001 plus more than 100 aerospace-specific requirements: configuration management, project management, risk management, special processes, counterfeit-parts prevention, and more. Most aerospace primes — Boeing, Lockheed, Airbus, GE Aerospace — require it of their suppliers.
>
> Certification is granted by an aerospace-accredited registrar. Surveillance is more rigorous than ISO 9001, and findings have real consequences for prime relationships.

**"Who needs AS9100":**
- "Aerospace suppliers" — Tier 1/2/3 manufacturers, special-process providers, MROs
- "Companies entering aerospace" — Adjacent industries chasing aerospace contracts, Foreign suppliers selling into US primes
- "Companies with ISO 9001" — ISO 9001 certified firms expanding into aerospace, Companies needing combined audits

**Roadmap (same structure):**
- Step 1: Aerospace gap analysis (ISO 9001 baseline + AS-specific requirements)
- Step 2: Implementation focus on configuration, risk, project management
- Step 3: Internal audit using AS9101 audit checklist methodology
- Step 4: Certification audit support with aerospace-accredited registrars

**"What you get":**
1. AS gap analysis vs current ISO 9001 system
2. Configuration management process
3. Risk management framework
4. Counterfeit-parts prevention program
5. Project management / change control
6. Internal audit & certification audit support

**Related services:** ISO 9001, GMP / ISO 13485, Internal Auditing.

**CTA band:** `Ready for your AS9100 certification? The first conversation is free.`

- [ ] **Step 1: Create the file**, copying `iso-9001.html` and substituting per above.

- [ ] **Step 2: Verify**

```bash
start "" "D:\source\qexcellence-site\services\as9100.html"
```

- [ ] **Step 3: Commit**

```bash
git add services/as9100.html
git commit -m "feat(services): build AS9100 aerospace quality service page"
```

---

### Task 20: Build `services/gmp-iso-13485.html`

**Files:**
- Create: `services/gmp-iso-13485.html`

**SNIPPET-HEAD substitutions:**
- `{{TITLE}}` = `ISO 13485 Medical Device Quality Consulting | Norma Via Group`
- `{{DESCRIPTION}}` = `ISO 13485 and FDA GMP consulting for medical-device manufacturers. From design controls to post-market surveillance. Seattle-based.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/services/gmp-iso-13485.html`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/safety_first.jpg`
- `{{ROOT}}` = `../`

**Service JSON-LD `name`:** `ISO 13485 and GMP Medical Device Consulting`.

BreadcrumbList 3rd item: `GMP / ISO 13485`.

**Hero image:** `../assets/img/safety_first.jpg`, alt `"Safety-first signage in a medical-device manufacturing environment"`.

**Hero copy:**
> The medical-device standard. Built for FDA expectations, MDR compliance, and a quality system that ships product safely.

**"What it is":**
> ISO 13485 is the international quality standard for organizations that design, develop, manufacture, install, or service medical devices. It aligns with FDA's 21 CFR Part 820 and is required for CE marking under EU MDR. GMP (Good Manufacturing Practice) is the underlying expectation for safe, consistent production.
>
> Certification gives you market access in the EU, recognition in many other regions, and a defensible system in the face of FDA inspections.

**Who needs ISO 13485:**
- "Device manufacturers" — Class I, II, III medical devices, Combination products
- "Suppliers to device makers" — Component suppliers required by their customers
- "Companies expanding internationally" — CE marking under EU MDR, Health Canada, other markets

**Roadmap focus on:**
- Design controls
- CAPA system
- Post-market surveillance
- Risk management to ISO 14971

**"What you get":**
1. ISO 13485 quality manual & procedures
2. Design control system
3. Risk management file (ISO 14971)
4. CAPA & non-conformance system
5. Post-market surveillance program
6. Internal audit & certification audit support

**Related services:** ISO 9001, AS9100, Internal Auditing.

- [ ] **Step 1: Create the file**, substituting per above.

- [ ] **Step 2: Verify**

```bash
start "" "D:\source\qexcellence-site\services\gmp-iso-13485.html"
```

- [ ] **Step 3: Commit**

```bash
git add services/gmp-iso-13485.html
git commit -m "feat(services): build GMP / ISO 13485 medical device service page"
```

---

### Task 21: Build `services/internal-auditing.html`

**Files:**
- Create: `services/internal-auditing.html`

**SNIPPET-HEAD substitutions:**
- `{{TITLE}}` = `Internal Audit Consulting for ISO Management Systems | Norma Via Group`
- `{{DESCRIPTION}}` = `Outsourced internal auditors for ISO 9001, ISO 27001, AS9100, and ISO 13485. Keep your management system audit-ready year-round.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/services/internal-auditing.html`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/card.jpg`
- `{{ROOT}}` = `../`

**Service JSON-LD `name`:** `Internal Audit Consulting for ISO Management Systems`.

BreadcrumbList 3rd item: `Internal Auditing`.

**Hero image:** `../assets/img/card.jpg`, alt `"Auditor reviewing documentation at a workstation"`.

**Hero copy:**
> Internal audits done right. Independent, evidence-driven, and sized to your real risk &mdash; not the other way around.

**"What it is":**
> Every ISO management system requires an internal audit program. Done right, internal audits drive continuous improvement and surface issues before they reach the certification audit. Done badly, they waste time and create paper findings.
>
> We provide outsourced internal audit services for companies that don't have the bench (or the independence) to run an effective program in-house. Single audits. Multi-year programs. Risk-based scopes.

**Who needs this:**
- "Small and growing certified companies" — No internal staff with audit competence, Need independence from process owners
- "Companies between recertification cycles" — Surveillance audit prep, Mid-cycle health checks
- "Companies with multiple standards" — Combined audits across ISO 9001, ISO 27001, ISO 13485, AS9100

**Roadmap (4-step adapted):**
- Step 1 — *Audit program design*: Risk-based scope, schedule, criteria, reporting cadence.
- Step 2 — *Audit execution*: On-site or remote audits per the program; evidence collection; finding documentation.
- Step 3 — *CAPA management*: Track corrective actions, root-cause analysis support, effectiveness verification.
- Step 4 — *Management review input*: Audit results packaged for management review; trend analysis; recommendations.

**"What you get":**
1. Audit program plan
2. Risk-based audit schedule
3. Audit reports per cycle
4. CAPA tracking system
5. Management review inputs
6. Auditor competence development (optional team training)

**Related services:** ISO 9001, ISO 27001, AS9100.

- [ ] **Step 1: Create the file**, substituting per above.

- [ ] **Step 2: Verify**

```bash
start "" "D:\source\qexcellence-site\services\internal-auditing.html"
```

- [ ] **Step 3: Commit**

```bash
git add services/internal-auditing.html
git commit -m "feat(services): build Internal Auditing service page"
```

---

### Task 22: Build `about.html`

**Files:**
- Create: `about.html`

**SNIPPET-HEAD substitutions:**
- `{{TITLE}}` = `About Norma Via Group | Quality &amp; Cybersecurity Consulting`
- `{{DESCRIPTION}}` = `Norma Via Group is a Seattle-based ISO and cybersecurity certification consultancy launched in 2025, formerly QExcellence, founded in 2018.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/about.html`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/happy.jpg`
- `{{ROOT}}` = `` (empty)

**Per-page BreadcrumbList JSON-LD** (no Service schema on About):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.normaviagroup.com/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.normaviagroup.com/about.html" }
  ]
}
```

- [ ] **Step 1: Create `about.html`**

After SNIPPET-HEAD + SNIPPET-HEADER (`{{ROOT}}=""`):

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><ol>
    <li><a href="index.html">Home</a></li>
    <li aria-current="page">About</li>
  </ol></div>
</nav>

<main id="main">

<!-- HERO -->
<section class="hero hero--split">
  <div class="container hero__inner">
    <div>
      <span class="eyebrow" style="color: #5eead4;">About</span>
      <h1>Compliance guidance built for business momentum.</h1>
      <p class="lede">Norma Via Group helps quality, environmental, safety, and cybersecurity teams get audit-ready faster &mdash; with practical guidance that supports certification, customer trust, and growth.</p>
    </div>
    <div class="hero__image">
      <img src="assets/img/happy.jpg" alt="Norma Via Group team member at the Seattle office">
    </div>
  </div>
</section>

<!-- WHY NORMA VIA -->
<section class="section">
  <div class="container">
    <div class="grid grid--2" style="gap: 64px;">
      <div>
        <span class="eyebrow">Why Norma Via</span>
        <h2>Experienced guidance without the guesswork.</h2>
      </div>
      <div>
        <p>The premise is simple: companies pursuing ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 42001, ISO 20000-1, ISO 13485, and CMMC don&rsquo;t need another consultancy that hands them a binder. They need a partner who understands compliance from three angles: manufacturer, auditor, and consultant.</p>
        <p>We help teams prioritize what matters, close gaps efficiently, and prepare for certification with clear deliverables, realistic timelines, and hands-on support.</p>
        <p>We&rsquo;re based in Seattle and work with clients across the United States &mdash; mostly remote, with on-site audits and management reviews when they matter.</p>
      </div>
    </div>
  </div>
</section>

<!-- COMPANY ROOTS -->
<section class="section">
  <div class="container">
    <div class="grid grid--2" style="gap: 64px;">
      <div>
        <span class="eyebrow">Company roots</span>
        <h2>Founded in quality. Expanded for today&rsquo;s compliance needs.</h2>
      </div>
      <div>
        <p>Norma Via Group launched in 2025 as the next chapter of QExcellence, an ISO and quality consulting practice founded in 2018.</p>
        <p>The new name reflects a broader focus across quality, environmental, safety, cybersecurity, and compliance programs &mdash; while keeping the same practical, audit-tested approach.</p>
      </div>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="section section--surface">
  <div class="container">
    <div class="section-header">
      <h2>Built to get you audit-ready faster.</h2>
      <p>Focused support, proven expertise, and clear expectations from the first conversation.</p>
    </div>
    <div class="grid grid--3">
      <div class="pillar"><div class="pillar__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><h3>Honest scoping</h3><p>If you don&rsquo;t need certification, we&rsquo;ll say so. If your timeline is unrealistic, we&rsquo;ll say that too. The first conversation is always free.</p></div>
      <div class="pillar"><div class="pillar__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/></svg></div><h3>Real expertise</h3><p>You&rsquo;ll work with people who have led 300+ audits across 22 countries &mdash; not a junior assigned a checklist.</p></div>
      <div class="pillar"><div class="pillar__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg></div><h3>Long partnership</h3><p>Certification is the start, not the finish. Most of our clients work with us across multiple recertification cycles.</p></div>
    </div>
  </div>
</section>

<!-- LEADERSHIP -->
<section class="section">
  <div class="container">
    <div class="section-header"><h2>Leadership</h2></div>
    <div class="split-row" style="max-width: 980px; margin: 0 auto;">
      <div class="split-row__image" style="max-width: 360px;">
        <img src="assets/img/founder.jpg" alt="Oksana Goncharov, Lead Consultant at Norma Via Group">
      </div>
      <div>
        <span class="eyebrow">Lead consultant</span>
        <h3>Oksana Goncharov</h3>
        <p class="lede">20 years in quality and manufacturing. 300+ audits conducted. 150+ manufacturers visited across 22 countries.</p>
        <p>Oksana leads Norma Via Group&rsquo;s consulting practice. Her experience spans quality management, lean and six sigma, supplier assessment, customer satisfaction, and manufacturing excellence &mdash; with deep certifications in ISO 9001, internal auditing, and adjacent quality standards.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA BAND -->
<section class="cta-band">
  <div class="container">
    <h2>Want to talk?</h2>
    <p>Tell us a bit about your company and the certification you&rsquo;re working toward. The first conversation is free.</p>
    <a class="btn btn--primary btn-arrow" href="contact.html">Start Your Audit-Ready Plan Today</a>
  </div>
</section>

</main>
```

End with **SNIPPET-FOOTER** (`{{ROOT}}=""`).

- [ ] **Step 2: Verify**

```bash
start "" "D:\source\qexcellence-site\about.html"
```

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat(about): build About page with story, values, and leadership"
```

---

### Task 23: Build `contact.html`

**Files:**
- Create: `contact.html`

**SNIPPET-HEAD substitutions:**
- `{{TITLE}}` = `Contact Norma Via Group | Seattle ISO &amp; Cybersecurity Consulting`
- `{{DESCRIPTION}}` = `Get in touch with Norma Via Group. Free 30-minute consultation for ISO and cybersecurity certification work. Seattle-based, nationwide service.`
- `{{CANONICAL}}` = `https://www.normaviagroup.com/contact.html`
- `{{OG_IMAGE_RELATIVE_PATH}}` = `assets/img/manuf.jpg`
- `{{ROOT}}` = `` (empty)

**Per-page JSON-LD:** ContactPage + BreadcrumbList:

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Norma Via Group",
  "url": "https://www.normaviagroup.com/contact.html"
}
```
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.normaviagroup.com/" },
    { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.normaviagroup.com/contact.html" }
  ]
}
```

- [ ] **Step 1: Create `contact.html`**

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="container"><ol>
    <li><a href="index.html">Home</a></li>
    <li aria-current="page">Contact</li>
  </ol></div>
</nav>

<main id="main">

<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="eyebrow">Contact</span>
      <h1>Get in touch</h1>
      <p class="lede">Tell us about your company and the certification you&rsquo;re pursuing. We&rsquo;ll set up a free 30-minute call.</p>
    </div>

    <div class="grid grid--2" style="gap: 48px; align-items: start;">

      <!-- FORM -->
      <form class="form" data-contact-form novalidate>
        <div class="form__row">
          <div class="form__field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" required autocomplete="name">
            <span class="form__error">Please enter your name.</span>
          </div>
          <div class="form__field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required autocomplete="email">
            <span class="form__error">Please enter a valid email.</span>
          </div>
        </div>
        <div class="form__row">
          <div class="form__field">
            <label for="company">Company</label>
            <input id="company" name="company" type="text" autocomplete="organization">
          </div>
          <div class="form__field">
            <label for="phone">Phone (optional)</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel">
          </div>
        </div>
        <div class="form__field">
          <label for="service">Service of interest</label>
          <select id="service" name="service">
            <option value="">Not sure yet</option>
            <option value="ISO 9001">ISO 9001</option>
            <option value="CMMC / NIST 800-171">CMMC / NIST 800-171</option>
            <option value="ISO 27001">ISO 27001</option>
            <option value="AS9100">AS9100</option>
            <option value="GMP / ISO 13485">GMP / ISO 13485</option>
            <option value="Internal Auditing">Internal Auditing</option>
          </select>
        </div>
        <div class="form__field">
          <label for="message">Message</label>
          <textarea id="message" name="message" required></textarea>
          <span class="form__error">Please add a short message.</span>
        </div>
        <div>
          <button class="btn btn--primary btn-arrow" type="submit">Send message</button>
        </div>
        <div class="form__success" role="status">Thanks &mdash; your message is being prepared in your mail client. If nothing opens, email us at <a href="mailto:oksana@norma-via.com">oksana@norma-via.com</a>.</div>
      </form>

      <!-- CONTACT CARD -->
      <aside class="contact-card">
        <h3>Reach us directly</h3>
        <p><strong>Email</strong><br><a href="mailto:oksana@norma-via.com">oksana@norma-via.com</a></p>
        <p><strong>Phone</strong><br><a href="tel:+14250000000">+1 (425) 000-0000</a></p>
        <p><strong>Office</strong><br>Seattle, WA, USA</p>
        <div class="map-frame">
          <iframe src="https://www.google.com/maps?q=Seattle,WA&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map of Seattle"></iframe>
        </div>
      </aside>

    </div>
  </div>
</section>

</main>
```

End with **SNIPPET-FOOTER** (`{{ROOT}}=""`).

- [ ] **Step 2: Verify form interactivity**

```bash
start "" "D:\source\qexcellence-site\contact.html"
```

- Click "Send message" with empty form → name + email + message fields show red borders + error text
- Fill required fields with valid values, click Send → mail client opens with prefilled subject and body containing all entered values
- Map iframe loads showing Seattle

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat(contact): build Contact page with form and Seattle map"
```

---

### Task 24: SEO infrastructure — `robots.txt`, `sitemap.xml`, `favicon.svg`

**Files:**
- Create: `robots.txt`, `sitemap.xml`, `favicon.svg`

- [ ] **Step 1: Write `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://www.normaviagroup.com/sitemap.xml
```

- [ ] **Step 2: Write `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.normaviagroup.com/</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.normaviagroup.com/about.html</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.normaviagroup.com/contact.html</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://www.normaviagroup.com/services/iso-9001.html</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.normaviagroup.com/services/cmmc-nist-800-171.html</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.normaviagroup.com/services/iso-27001.html</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.normaviagroup.com/services/as9100.html</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.normaviagroup.com/services/gmp-iso-13485.html</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.normaviagroup.com/services/internal-auditing.html</loc><lastmod>2026-04-30</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>
```

- [ ] **Step 3: Write `favicon.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0f172a"/>
  <path d="M9 23 L9 9 L18 23 L18 9" stroke="#06b6d4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
```

- [ ] **Step 4: `favicon.ico` and `apple-touch-icon.png`**

These are binary fallbacks. Generate them from `favicon.svg` using <https://realfavicongenerator.net/> or any equivalent. Save:
- `favicon.ico` (16×16 + 32×32 multi-resolution ico)
- `apple-touch-icon.png` (180×180)

If you don't have generation tooling readily available, both are non-blocking — delete the corresponding `<link>` tags from each page's `<head>` SNIPPET-HEAD until the binaries exist. The `favicon.svg` link is enough for modern browsers.

- [ ] **Step 5: Verify**

Open `https://www.xml-sitemaps.com/validate-xml-sitemap.html` (or any sitemap validator), paste the sitemap URL or content. Expected: valid.

- [ ] **Step 6: Commit**

```bash
git add robots.txt sitemap.xml favicon.svg
# only add the binaries if step 4 produced them:
[ -f favicon.ico ] && git add favicon.ico
[ -f apple-touch-icon.png ] && git add apple-touch-icon.png
git commit -m "feat(seo): add robots.txt, sitemap.xml, and favicons"
```

---

### Task 25: Final validation pass

**Files:** none (verification only)

- [ ] **Step 1: HTML validation — all 9 pages**

For each page, paste source into <https://validator.w3.org/nu/#textarea> and verify zero errors. Pages to check:

- `index.html`
- `about.html`
- `contact.html`
- `services/iso-9001.html`
- `services/cmmc-nist-800-171.html`
- `services/iso-27001.html`
- `services/as9100.html`
- `services/gmp-iso-13485.html`
- `services/internal-auditing.html`

Expected: each page passes. Fix any errors before continuing.

- [ ] **Step 2: Link check**

Open each page in the browser and click every internal link (header nav, footer links, breadcrumbs, service cards, related-service cards, CTA buttons). Expected: no 404s, all destinations exist.

For automation, run a static link checker if available:

```bash
# If you have linkchecker installed (pip install linkchecker):
linkchecker --no-warnings file:///D:/source/qexcellence-site/index.html
```

- [ ] **Step 3: Responsive check**

Open `index.html` in Chrome, F12 → device toolbar. Test viewports: 360px (mobile), 768px (tablet), 1024px (small desktop), 1440px (desktop).

Expected:
- Mobile (<768px): hamburger nav visible, single-column layouts everywhere, hero CTAs stacked, service grid 1-up, roadmap stacked
- Tablet (768–1100px): nav visible, service grid 2-up
- Desktop (>1100px): service grid 3-up, split rows side-by-side

- [ ] **Step 4: Lighthouse audit (homepage)**

Chrome DevTools → Lighthouse → run on `index.html` (Mobile + Desktop).

Expected:
- Performance: ≥ 90 (static site, should be near 100)
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

If any score < target, inspect the failing audit and fix. Common gotchas: missing `lang`, missing `alt`, contrast issues, missing meta description.

- [ ] **Step 5: Rich Results test (homepage + one service page)**

Paste `index.html` into <https://search.google.com/test/rich-results>. Expected: ProfessionalService item detected, valid.

Paste `services/iso-9001.html`. Expected: 3 items detected — ProfessionalService, Service, BreadcrumbList. All valid.

- [ ] **Step 6: Final commit (only if Step 1–5 produced fixes)**

If you fixed anything during validation, commit:

```bash
git add -A
git commit -m "fix: address HTML validation, accessibility, and SEO findings"
```

If everything passed clean, skip the commit.

- [ ] **Step 7: Stop the visual companion server (cleanup)**

```bash
"C:\Users\vladgon\.claude\plugins\cache\claude-plugins-official\superpowers\5.0.7\skills\brainstorming\scripts\stop-server.sh" /d/source/qexcellence-site/.superpowers/brainstorm/38024-1777571302
```

(Optional — the `.superpowers/` directory is gitignored anyway. The server will also auto-exit after 30 minutes of inactivity.)

- [ ] **Step 8: Verify the project ships**

```bash
ls -R /d/source/qexcellence-site/ | head -60
git log --oneline
```

Expected: tidy repo with focused commits per task. Ready to push to a remote when one's chosen.

---

## Self-review (run after writing all tasks)

**Spec coverage check:**

| Spec section | Implementing task(s) |
|---|---|
| §2 Brand & content | Tasks 12-23 (per-page copy uses correct brand facts) |
| §3 Visual style (tokens, typography) | Task 5 |
| §3 Visual style (components) | Tasks 6-10 |
| §4 Site map | Tasks 12-23 (one page each) |
| §5 Homepage flow (9 sections) | Tasks 12-15 (split across 4 sections) |
| §6 Service-page template | Task 16 (prototype) + Tasks 17-21 (instances) |
| §7 About | Task 22 |
| §8 Contact | Task 23 |
| §9 SEO foundation (per-page meta) | SNIPPET-HEAD (used in all page tasks) |
| §9 SEO foundation (JSON-LD) | SNIPPET-HEAD (Organization), per-page Service/Breadcrumb in Tasks 16-23 |
| §9 SEO infrastructure (robots, sitemap, favicons) | Task 24 |
| §10 Image inventory & mapping | Task 2 (download), Tasks 12-22 (per-page placement matches §10 map) |
| §11 JavaScript | Task 11 |
| §12 CSS organization | Tasks 5-10 (sections in spec order) |
| §13 Out of scope | Honored throughout — no testimonials, no partner logos, no blog, no form backend |
| §14 Acceptance criteria | Task 25 (validation) |
| §15 Open items (placeholders) | Acknowledged in README (Task 3) and copy uses placeholder phone/social URLs |

**Placeholder scan:** none. Every task has actual code or actual copy.

**Type / signature consistency:** SNIPPET-HEAD, SNIPPET-HEADER, SNIPPET-FOOTER are referenced consistently. `data-contact-form` attribute and `[name='...']` selectors in `main.js` match form markup in Tasks 15 + 23. Service slugs (e.g., `iso-9001.html`) are consistent across nav, footer, and breadcrumb references.

**Scope check:** 25 tasks covering one self-contained subsystem (a static brochure site). Single plan, single deliverable.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-30-normavia-website.md`.
