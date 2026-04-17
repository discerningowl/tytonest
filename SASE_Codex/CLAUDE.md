# CLAUDE.md — SASE Codex
## Decision Log & Architecture Reference
*Last updated: 2026-04-17 — scores.json v1.3 with Cato AI Security (Aim acquisition) + Dynamic Prevention scoring; v1.2 baseline Cloudflare One Appliance, Netskope NewEdge footprint, and Cato FedRAMP March 2026 corrections. Edge Documents v0.2 brand refactor complete.*

---

## Project Overview

Edge Solutions SASE Vendor Research Series — **SASE Codex**. Goal: produce a full-fledged website (not a single whitepaper) comparing SASE vendors across pillars. Working directory: `~/Documents/Claude/Projects/SASE_Codex/`.

**Website Architecture:** CSS, JavaScript, and embedded data are extracted into their own files — no bundling everything into self-contained HTML. Each HTML page links to shared assets. No `index.html` — the site is pillar-first navigation.

**Asset file conventions:**
- `assets/css/` — shared stylesheets (Edge brand variables, typography, tables, score badges)
- `assets/js/` — shared scripts (score renderer, chart logic, nav)
- `scores.json` — vendor × criterion data (root of project, fetched by all pages)

---

## Document Structure

| File | Title | Status |
|------|-------|--------|
| `sase_benchmark.html` | Component Benchmark 2026 | ✅ Complete |
| `sase_ztna.html` | ZTNA Deep Dive — Big Five | ✅ Complete |
| `sase_sse.html` | SSE Deep Dive — Big Five | ✅ Complete |
| `sase_sdwan.html` | SD-WAN Deep Dive — Big Five | ✅ Complete |
| `sase_aiops.html` | AIOps Deep Dive — Big Five | ✅ Complete |
| `sase_sovereignty.html` | Sovereignty Deep Dive — Big Five | ✅ Complete |
| `sase_emerging.html` | Emerging Vendors — Aryaka, Graphiant, Nile, Island | ✅ Complete |
| `sase_scorecard.html` | Master Scorecard & Persona Fit Matrix | ✅ Complete |
| `scores.json` | Vendor × Criterion Score Data | ✅ Complete — Big Five all pillars + Emerging in-scope |

---

## Organizational Decisions

### Pillar-First Structure
**Decision:** Documents are organized by pillar (ZTNA, SSE, SD-WAN, AIOps, Sovereignty), not by vendor.
**Rationale:** Readers want to know "who wins on DLP" not "tell me everything about Zscaler." Pillar-first forces apples-to-apples comparison and surfaces vendor strengths/gaps more clearly.

### Big Five vs. Emerging Vendors
**Decision:** Big Five (Palo Alto, Cato, Netskope, Cloudflare, Zscaler) are the primary subjects of all Vendor Deep Dive pillar docs. Emerging vendors (Aryaka, Graphiant, Nile) get their own dedicated document (`sase_emerging.html`).
**Rationale:** Emerging vendors compete on narrower scope and shouldn't dilute the primary comparison. They get a brief callout in relevant pillar docs with a pointer to their dedicated doc. Full analysis lives in `sase_emerging.html`.

### Scored Tables in Both Places
**Decision:** Each pillar deep dive includes a vendor scoring table. The Master Scorecard also includes full consolidated scoring. Both are rendered dynamically from `scores.json`.
**Rationale:** Pillar docs need at-a-glance scores for readers who read only one section. The Scorecard synthesizes everything. Scores maintained once, displayed in multiple places.

---

## Data Architecture

### scores.json — Single Source of Truth
All vendor × criterion scores live in `scores.json`. HTML documents fetch this file and render scores dynamically. A score change in `scores.json` propagates to all documents automatically.

**Schema:**
```json
{
  "meta": {
    "version": "1.0",
    "last_updated": "YYYY-MM-DD",
    "scale_description": "1=Poor/Missing · 2=Below Average · 3=Adequate · 4=Strong · 5=Best-in-Class",
    "weight_multipliers": { "critical": 3, "high": 2, "medium": 1 }
  },
  "vendors": [ ... ],
  "pillars": {
    "ztna": {
      "label": "...",
      "criteria": [
        {
          "id": "device_posture",
          "label": "Device Posture (Continuous)",
          "weight": "critical",
          "scale": "1=No posture · 3=One-time check · 5=Continuous EDR-integrated",
          "scores": {
            "palo_alto": { "score": null, "note": "" }
          }
        }
      ]
    }
  }
}
```

**Note field convention:** Short evidence string, 1–2 sentences maximum. States what the vendor specifically does (or doesn't do) to justify the score. Example: *"Prisma Access integrates with CrowdStrike, SentinelOne, and Microsoft Defender for continuous posture. Session quarantine on posture failure is supported."* Narrative analysis belongs in the HTML, not the JSON.

**How HTML docs consume scores.json:**
```javascript
fetch('scores.json')
  .then(r => r.json())
  .then(data => renderScoringTable(data.pillars.ztna));
```
Each pillar doc fetches only its relevant pillar section. The Scorecard fetches the full file and builds the consolidated matrix.

---

## Vendor-Specific Decisions

### Palo Alto Networks
**Scope:** Prisma Access (cloud SSE/ZTNA delivery) + Strata Cloud Manager (unified management plane). SCM is a key differentiator — it ties Prisma Access and the physical NGFW estate together and is often undersold.
**Architecture type:** Stitched/integrated (not single-pass native).

### Zscaler
**Caution flag:** Zscaler's product naming and architecture has shifted across releases. Do not make confident claims without verification. Flag uncertainty explicitly in the deep dive.
**Known architecture note:** ZIA (internet access) and ZPA (private access) are distinct products. They share policy through integration — not a native unified engine. Confirm current state in the SSE deep dive (`sase_sse.html`) and ZTNA deep dive (`sase_ztna.html`) before scoring.
**Primary identity:** Identity-first proxy / ZTNA + Digital Experience Monitoring (ZDX). DLP is a compliance capability, not the core design philosophy.

### Cato Networks
**Architecture type:** Single-pass, native converged SASE. Private backbone (Cato Cloud). Best reference implementation of true single-vendor SASE.

### Netskope
**Architecture type:** Single-pass (NewEdge network). Data-centric design philosophy — DLP and CASB are the core, not features bolted on.
**DLP:** Industry reference point for ML-based DLP, EDM, OCR, unified inline + API policy.

### Cloudflare
**Architecture type:** Single-pass. Largest PoP network density of any vendor. Developer-friendly. SASE portfolio built on Cloudflare One.

### Aryaka
**Scope:** Managed SASE with focus on global connectivity performance. Competes primarily on SD-WAN (Pillar 3) and AIOps/managed ops (Pillar 4).

### Graphiant
**Scope:** "Network Edge" private connectivity without tunnels. Pillar 3 (SD-WAN) only. Not a full SASE stack.

### Nile
**Scope:** Zero Trust NaaS for campus/LAN edge. Extends ZTNA principles to the physical building. Not a WAN or cloud security play — complementary, not competitive.

### Island
**Scope:** Enterprise Browser. Enforces Zero Trust policy at the browser layer — session isolation, DLP, clipboard control, screenshot prevention, and SaaS access governance without a proxy in the path. Distinct from browser extensions (full Chromium fork). Competes in the ZTNA pillar as a last-mile enforcement point for managed and unmanaged devices.
**Placement:** Full analysis in `sase_emerging.html`. Callout in `sase_ztna.html` under Enterprise Browser criterion.

---

## Content Decisions

### DLP Framing
**Decision:** DLP is framed as vendor philosophy / design center, not a ranked hierarchy.
**Rationale:** Different DLP implementations suit different use cases. Netskope = data-centric. Zscaler = proxy-enforced. Palo Alto = threat-first. Cato/Cloudflare = operational/compliance. No universal "best" — fit depends on the customer's data problem.

### SSL/TLS Decryption
**Decision:** Treated as a first-class SSE capability with its own criterion, not a checkbox under SWG.
**Two scored criteria:** (1) TLS Inspection at Scale — whether full TLS 1.3 decryption works at volume. (2) SSL Decryption Architecture — where and how it happens (PoP-local vs. backhauled, policy controls, CA tooling).

### Enterprise Browser
**Decision:** Added to ZTNA pillar as a distinct criterion from Agentless Access.
**Rationale:** Enterprise browsers (Island, Talon/Palo Alto, Chrome Enterprise) enforce policy at the browser layer — architecturally different from proxy-side agentless access. Changes the inspection scope conversation for managed devices. Fast-moving category in 2026.
**Scoring scope:** Score separately for (1) native enterprise browser and (2) browser extension/plugin. Some vendors (Palo Alto via Prisma Access Browser) offer a full browser; others offer lightweight extensions. Island is scored in `sase_emerging.html` as a standalone emerging vendor.

### RBI (Remote Browser Isolation)
**Decision:** RBI is a distinct SSE criterion — do not collapse it into SWG.
**Placement:** Added to the Benchmark (`sase_benchmark.html`) under the SSE pillar. Scored as its own criterion in `sase_sse.html`.
**Two rendering models to cover:** (1) pixel-push (server renders, streams pixels to client — high fidelity, higher latency) and (2) DOM reconstruction (server fetches, client reconstructs sanitized DOM — lower latency, some fidelity trade-offs).
**Benchmark criteria:** rendering fidelity, latency overhead, unmanaged device / clientless support, integration with SWG policy engine.
**Vendor split:** Zscaler (native), Cloudflare (native), Menlo Security (RBI-first vendor, not in Big Five), Palo Alto (via third-party integration — confirm current state). Cato and Netskope TBD — research before scoring.

### Emerging Vendors in Pillar Docs
**Decision:** Emerging vendors get a brief callout in relevant pillar docs (not a full scored row) with a pointer to `sase_emerging.html` for full analysis.

---

## Styling & Branding

- All HTML documents use Edge Solutions brand (skill: `/mnt/skills/user/edge-documents/SKILL.md`) — **v0.2 kit** as of 2026-04-17 refactor
- **Brand tokens live in `assets/css/main.css` only.** Per-file `<style>` blocks are for page-specific layout only (e.g., scorecard JS-rendered components). Do not redefine brand tokens inline.
- **Fonts:** Atkinson Hyperlegible Next (body + display) via Google Fonts `@import` in `main.css`. Inter for dense UI chrome. Do NOT use Heebo or Roboto.
- **`--font` / `--font-ui`** — CSS variables for Atkinson and Inter respectively. Never hardcode `font-family` values.
- **Ambient layer:** `body::before` radial gradients + `body::after` grain overlay defined in `main.css`. Do not duplicate in per-page styles.
- **Content z-index:** All structural elements (`header`, `nav`, `main`, `footer`, `.page-body`) carry `position: relative; z-index: 2` to render above grain.
- Score badges: CRITICAL = `var(--error)` `#C44536`, HIGH = `var(--warning)` `#E6A817`, MEDIUM = `#F1C40F`
- **Website mode — files are NOT self-contained.** CSS lives in `assets/css/`, JS in `assets/js/`. HTML pages link to shared assets.
- Google Fonts loaded via `@import` in `main.css` — HTML `<head>` needs no font `<link>` tags.
- `scores.json` fetched by all pillar pages from root
- **Left-side TOC:** Every page includes a fixed sidebar TOC. Implementation lives in `assets/js/toc.js` + `assets/css/toc.css`. TOC auto-generates from `<h2>`/`<h3>` headings via JS — no manual per-page markup. Active section highlighted via IntersectionObserver. Collapsible on mobile.

### Core Brand Tokens (v0.2 — use these, never invent others)

| Token | Value | Role |
|---|---|---|
| `--edge-blue` | `#486D87` | Primary — headers, nav, dominant backgrounds |
| `--edge-green` | `#C6D219` | Accent — rules, pills, CTAs. Punctuation only, never dominant |
| `--edge-dark` | `#4C5351` | Body text on light surfaces |
| `--edge-muted` | `#7B7D72` | Secondary text, labels, meta |
| `--edge-light` | `#F2F3F4` | Page canvas, light surfaces |
| `--edge-moss` | `#9DA03C` | Supporting accent |
| `--warning` | `#E6A817` | Caution states |
| `--error` | `#C44536` | Error / destructive |
| `--white` | `#FFFFFF` | — |

**Dark-section background:** `#2d4a5c` (dark tint of edge-blue — used for BLUF boxes, doc-nav, pillar-hero, dark sub-panels). No separate CSS variable — use the literal value.

**Glass card pattern:** `background: rgba(255,255,255,0.72–0.82); backdrop-filter: blur(16px); border: 0.5px solid rgba(72,109,135,0.25);`

### Radar Chart Sizing (sase_scorecard.html)
Do NOT use Chart.js `responsive`/`maintainAspectRatio`/`aspectRatio` options to control chart dimensions — they are unreliable when the chart renders after a `fetch()` resolves.

The correct approach:
- Canvas lives inside `.radar-canvas-wrapper` (position:relative, height:0, padding-bottom:%)
- Canvas is `position:absolute; width:100%; height:100%` inside that wrapper
- Chart.js runs `responsive:true, maintainAspectRatio:false` and fills whatever CSS gives it
- Aspect ratio is controlled entirely by `padding-bottom` percentages in CSS media queries
- Current ratios: ≥1200px → 55% · 900–1199px → 58% · 600–899px → 62% · <600px → 70%
- Do NOT add `layout.padding` to the Chart.js config — it shrinks the radar web without shrinking the canvas, making the chart look tiny.
All pages use the `sase_ztna.html` header as the reference implementation. Do not deviate.

**Structure (top row — right-aligned pills):**
```html
<span class="edge-pill">DOCUMENT TYPE</span>
<span class="edge-pill edge-pill--muted">DESCRIPTOR LABEL</span>
<span class="edge-pill edge-pill--phase">2026</span>
```
- **Pill 1 (lime/green):** Document type — `BENCHMARK`, `ZTNA`, `SSE`, `SD-WAN`, `AIOPS`, `SOVEREIGNTY`, `EMERGING`, `SCORECARD`
- **Pill 2 (gray/muted):** Page type — `COMPONENT ANALYSIS`, `TECHNICAL DEEP DIVE`, `MASTER SCORECARD`, `EMERGING VENDORS`, etc.
- **Pill 3 (dark + green border):** Always `2026`. Class: `edge-pill edge-pill--phase`.

**Brand string:** `EDGE SOLUTIONS` — all caps, always.

**Title font-size:** `26px` on all pages.

**Header padding:** `18px 40px 20px`.

**No `edge-header__bottom` wrapper div in benchmark only — all other pages use the wrapper.** *(This file previously said the opposite — corrected 2026-04-17 after discovering benchmark was the outlier.)* Canonical structure for pillar and scorecard pages is:
```html
<div class="edge-header__bottom">
  <h1 class="edge-header__title">...</h1>
  <p class="edge-header__subtitle">...</p>
</div>
```
The CSS defines `.edge-header__bottom { margin-top: 4px; }` so the wrapper is intentional for spacing.

**Pill class definitions (canonical — v0.2):**
```css
.edge-pill          { background: var(--edge-green); color: var(--edge-dark); }
.edge-pill--muted   { background: var(--edge-muted); color: var(--white); }
.edge-pill--moss    { background: var(--edge-moss);  color: var(--white); }
.edge-pill--phase   { background: #2d4a5c; color: var(--edge-green); border: 1px solid var(--edge-green); }
```
**Note:** `edge-pill--secondary` is a legacy alias mapped to `--muted` in main.css for backward compatibility. Use `edge-pill--muted` in all new and edited markup.

---

## Cloudflare Pages Deployment Notes

**Live URL:** `https://tytonest.xyz/SASE_Codex/`  
**Repo:** `discerningowl/tytonest` (GitHub) · Production branch: `main` · No build command · No output directory

### What works and what doesn't
- **Clean URLs:** Cloudflare Pages natively strips `.html` and serves `sase_scorecard` from `sase_scorecard.html`. No `_redirects` file needed — it causes redirect loops.
- **`_headers` subdirectory rules:** `/SASE_Codex/*` overrides do NOT reliably apply. Use a single global `/*` rule for everything.
- **`scores.json` fetch path:** Use `window.location.pathname` to derive the path — NOT script `src` attribute detection. Cloudflare Rocket Loader rewrites `<script>` tags, breaking src-based detection.
- **Cache:** After any `_headers` change, manually purge via Cloudflare dashboard → Caching → Configuration → Purge Everything.

### Current `_headers` (repo root)
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com; img-src 'self' data:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'
```

---

## Writing Style

- **BLUF:** Lead with the answer, follow with supporting detail
- **Feynman Technique:** Plain-language intuition before going technical. No need to state that it is a Feynman.
- **Precision:** No filler, no hedging without cause, no confident claims about any vendor without verification
- **DLP hierarchy language:** Avoid ranking vendors 1/2/3 — describe philosophy and fit instead
- Working documents are for internal use and client distribution — technical depth is appropriate
