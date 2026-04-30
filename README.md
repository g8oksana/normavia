# Normavia Group Website

Static marketing site for Normavia Group — Seattle-based ISO certification
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

Deploy the entire repo as static files to any host (Azure Static Web Apps,
GitHub Pages, Netlify, Vercel, S3+CloudFront, etc.). No environment
variables, no backend.

## Editing content

Each HTML page is self-contained. Edit copy directly in the page. Update
`<title>`, `<meta name="description">`, and JSON-LD blocks if you change
section headings.

## Known placeholders (replace before launch)

- Phone number: `425-000-0000`
- Social URLs: currently QExcellence accounts (LinkedIn, Facebook, Instagram)
- Logo: typographic SVG wordmark in header — replace with branded asset when ready
