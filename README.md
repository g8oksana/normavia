# Norma Via Group Website

Static marketing site for Norma Via Group — Seattle-based ISO certification
and cybersecurity compliance consultancy.

## Structure

- `index.html` — homepage
- `about.html` — about page
- `contact.html` — contact page
- `services/*.html` — service detail pages
- `assets/css/styles.css` — all styles
- `assets/js/main.js` — all interactive behavior
- `assets/img/` — image assets
- `api/` — Azure Functions contact-form API
- `robots.txt`, `sitemap.xml`, `favicon.*` — SEO + browser metadata

## Local development

The static pages have no build step. Open any `.html` file directly in a
browser, or serve the folder with a static server:

```bash
# Python 3
python -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then open <http://localhost:8000>.

The contact form posts to the Azure-hosted contact API at
`https://lemon-field-0e2e1601e.7.azurestaticapps.net/api/contact` so the public
site can be hosted from GitHub Pages while email delivery remains server-side.
For local API development, install Azure Functions Core Tools and run:

```bash
cd api
npm install
copy local.settings.example.json local.settings.json
func start
```

Fill `api/local.settings.json` with the Microsoft Entra app settings before
testing email delivery.

## Hosting

The static site can be hosted from GitHub Pages. The contact API remains hosted
in Azure Static Web Apps because it needs server-side Microsoft Graph
credentials. Configure these application settings in Azure; do not commit real
secret values:

- `M365_TENANT_ID`
- `M365_CLIENT_ID`
- `M365_CLIENT_SECRET`
- `CONTACT_FROM_EMAIL=oksana@norma-via.com`
- `CONTACT_TO_EMAIL=oksana@norma-via.com`
- `CONTACT_ALLOWED_ORIGINS=https://norma-via.com,https://www.norma-via.com,https://g8oksana.github.io,https://lemon-field-0e2e1601e.7.azurestaticapps.net`

The Microsoft Entra app registration must have Microsoft Graph application
permission `Mail.Send` with admin consent. The API sends mail from
`CONTACT_FROM_EMAIL` and sets the visitor's address as `replyTo`.

## Editing content

Each HTML page is self-contained. Edit copy directly in the page. Update
`<title>`, `<meta name="description">`, and JSON-LD blocks if you change
section headings.

## Launch details

- Phone number: `+1 (425) 381-0191`
- Email: `oksana@norma-via.com`
- LinkedIn: `https://www.linkedin.com/company/normaviagroup/`
