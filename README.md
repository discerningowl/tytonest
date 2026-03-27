# TytoNest

A static site about barn owls. Also other things. See `CLAUDE.md` for the full context.

---

## Stack

Pure HTML / CSS / JS. No build step, no frameworks, no dependencies. Hosted on Cloudflare Pages.

## Deploy

Push to `main`. Cloudflare handles the rest.

## Add a Page

1. Create the HTML file
2. Add `<div id="site-header"></div>` and `<div id="site-footer"></div>` placeholders
3. Link `style.css` and `components.js`
4. Add a `<link rel="canonical">` tag
5. Add the URL to `sitemap.xml`
6. Update `header.html` and `footer.html` navigation if needed

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page |
| `kettlebell.html` | Workout tracker |
| `style.css` | All styles — uses a design token system |
| `components.js` | Tab switching, header/footer includes, CSV export |
| `header.html` / `footer.html` | Shared fragments, injected client-side via fetch() |
| `_headers` | Cloudflare security headers |
| `favicon.svg` | Owl logo |
| `robots.txt` / `sitemap.xml` | SEO basics |
