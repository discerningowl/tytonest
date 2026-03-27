# TytoNest — Project Guide

## What This Is

TytoNest is an INTJ landing page disguised as a barn owl enthusiast site. It is also, genuinely, a barn owl enthusiast site. The nuance is the point.

The owl facts are real. The seasonal biology is accurate. The field notes read like field notes. None of that is ironic — the barn owl is a legitimately good subject and the facade only works if it holds up. What lives underneath is a dry, specific worldview that resonates with people who think a certain way. They will find it. Others won't, and that's fine.

**The rule:** never be overt. The moment the site winks at the reader, it's ruined. The humor comes from precision, restraint, and the occasional editorial aside that reveals more than it announces. If a line needs to be explained, it's not the right line.

---

## Voice & Tone

- **Dry and clinical.** Write like someone who takes the subject seriously and has opinions about everything else.
- **Understatement over hyperbole.** "This is a good system. More things should work this way." Not "wow, owls are amazing."
- **The dual meaning lives in word choice and framing**, not in asides or footnotes. Trust the reader.
- **Dark humor through implication.** "Unsentimental about last year's losses." One sentence. Move on.
- **Never explain the joke.** If it requires explanation, rewrite it until it doesn't.
- **The owl facts anchor the credibility.** Seasons, biology, behavior — keep these accurate. Real information is the best cover.

### What to Avoid
- Forced cleverness — if you can feel the effort, it's too much
- Rhetorical questions
- Anything that reads like a marketing site ("join our community," "connect with like-minded people")
- Exclamation points
- Emoji in content

---

## Site Architecture

**Stack:** Pure static HTML/CSS/JS — no build step, no frameworks, no dependencies.

**Hosting:** Cloudflare Pages. Deploy by pushing to the main branch.

**Files that matter for the site:**
- `index.html` — the INTJ/barn owl landing page
- `kettlebell.html` — the workout tracker
- `style.css` — all styles; uses a design token system
- `components.js` — tab switching, header/footer includes, CSV export
- `header.html` / `footer.html` — shared fragments injected via fetch()
- `_headers` — Cloudflare security headers (CSP, HSTS, etc.)
- `favicon.svg` — owl logo
- `robots.txt` / `sitemap.xml` — SEO basics

**Adding a new page:**
1. Create the HTML file
2. Add `<div id="site-header"></div>` and `<div id="site-footer"></div>` placeholders
3. Link `style.css` and `components.js`
4. Add a `<link rel="canonical">` tag
5. Add the page to `sitemap.xml`
6. Update `header.html` and `footer.html` navigation if needed

---

## CSS & Design Principles

### Use the Design Token System
All colors, spacing, typography, and shadows are defined as CSS custom properties in the `:root` block at the top of `style.css`. Always use tokens — do not introduce magic numbers.

```css
/* Right */
padding: var(--space-4);
color: var(--color-brown);

/* Wrong */
padding: 16px;
color: #5C4033;
```

If a value is needed more than once and doesn't exist as a token, add it to the token system first.

### Color Palette
The palette is barn owl (Tyto alba) inspired — warm browns, cream, amber, and a deep twilight dark. It should feel like dusk, not daylight. Do not introduce colors outside the palette without a strong reason.

### Spacing
Use the defined spacing scale (`--space-1` through `--space-16`). For values beyond the scale, use explicit `rem` values rather than inventing new token names.

### Typography
The site uses system fonts — no external font loading. Georgia/serif for body, Trebuchet MS/sans-serif for headings. Maintain the distinction: headings are `var(--font-heading)`, body copy is `var(--font-primary)`.

### Responsiveness
- Mobile-first where practical
- The existing breakpoints are 639px and 767px — work within them
- Nav links hide on mobile (`display: none` at 639px) — if navigation grows, a mobile menu will be needed before adding more links

### Accessibility
- All interactive elements must be keyboard accessible with visible focus states (`:focus-visible` is defined globally)
- Images and SVGs that are decorative get `aria-hidden="true"`
- Meaningful SVGs and icons get descriptive `aria-label` attributes
- Use semantic HTML — `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`, not just `<div>`

### Performance
- No external scripts or stylesheets
- SVGs are inline or served as files — no icon font libraries
- Keep JavaScript minimal and vanilla; `components.js` handles everything site-wide

---

## Workout Content Principles

Any workout programming on this site should follow evidence-based training principles. This is not a place for bro-science.

### Programming
- **Progressive overload** is the primary driver of adaptation — increase reps, sets, or load over time, not all at once
- **Reps before weight** — fill the top of the rep range across all sets before increasing load
- **Two-variable rule** — change no more than one training variable (reps, sets, weight) within a two-week window
- **Specificity** — exercise selection should match the stated goal of the day/phase

### Exercise Descriptions
Describe what the movement *trains*, not just how to perform it. A reader should understand:
1. What muscle groups or physical quality the exercise develops
2. Why it belongs in this program
3. The key technical cue that separates a good rep from a wasted one

### Form and Load
- Form is always the gate — if form breaks down, the load is wrong regardless of the schedule
- The Turkish Get-Up and any other technically complex movement is always **form-gated, never load-gated**
- When introducing a new weight, it is acceptable (and correct) to drop volume temporarily to maintain form

### Recovery
- Rest periods are part of the training, not a break from it
- A 4th round added to a phase is a significant volume increase — treat it as such in the notes
- Recovery, sleep, and hydration are training variables, not lifestyle suggestions

### Tone in Workout Content
Keep it direct and informative. No motivational filler. The exercise descriptions should read like something written by someone who knows what they're talking about and respects the reader's time.

---

## What This Site Is Not

- A social platform
- A content marketing funnel
- A place that explains itself
- Loud about anything

The barn owl does not announce when it's hunting. Neither does this site.
