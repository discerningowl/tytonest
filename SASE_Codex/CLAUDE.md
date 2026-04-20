# CLAUDE.md — SASE Codex
## Architecture Reference & Decision Log
*Last updated: 2026-04-20 — v2.1: Fortinet promoted to Big Six; nav.js shared component added; emerging vendor scores isolated to sase_emerging.html. All component benchmarks in `components/`, all vendor working-docs in `working-docs/`. 10 vendor files (5 Big Six + 5 emerging). scores.json v2.2 — Fortinet tier=big_six; nav.js added. Archive files date-suffixed.*

---

## Project Overview

Edge Solutions SASE Vendor Research Series — **SASE Codex**. Goal: a full-fledged website comparing SASE vendors across five pillars. Working directory: `~/Documents/Claude/Projects/SASE_Codex/`. Live: `https://tytonest.xyz/SASE_Codex/`.

**Architecture:** CSS, JavaScript, and data in shared asset files — no self-contained HTML. Each page links to shared assets. Navigation via `_index.html` at root.

---

## v2.0 Directory Structure (current)

```
SASE_Codex/
├── _index.html              ← Master navigation index (root entry point)
├── scores.json              ← Single source of truth for all vendor scores
├── CLAUDE.md                ← This file
├── README.md                ← Server setup and deployment notes
├── assets/
│   ├── css/main.css         ← Brand tokens, shared layout
│   ├── css/toc.css          ← Left-sidebar TOC styles
│   └── js/
│       ├── nav.js           ← shared nav component (code-once, inject everywhere)
│       ├── main.js          ← scores.json fetch, renderScoringTable()
│       └── toc.js           ← Auto-generated TOC from headings
├── components/              ← Component benchmark documents (all 8 complete)
│   ├── sase_benchmark.html  ← Evaluation rubric, criteria, personas
│   ├── sase_ztna.html       ← ZTNA pillar deep dive
│   ├── sase_sse.html        ← SSE pillar deep dive
│   ├── sase_sdwan.html      ← SD-WAN pillar deep dive
│   ├── sase_aiops.html      ← AIOps pillar deep dive
│   ├── sase_sovereignty.html← Sovereignty pillar deep dive
│   ├── sase_scorecard.html  ← Master scorecard (all pillars × all vendors)
│   └── sase_emerging.html   ← Emerging vendor overview (contextual)
├── working-docs/            ← Vendor deep-dive working documents (10 vendors)
│   ├── cato-networks.html
│   ├── cloudflare.html
│   ├── netskope.html
│   ├── palo-alto-networks.html
│   ├── zscaler.html
│   ├── aryaka.html
│   ├── fortinet.html
│   ├── island.html
│   ├── nile.html
│   └── versa-networks.html
├── spin-offs/               ← Future: vendor briefs, comparisons, explainers
│   ├── vendor-briefs/
│   ├── comparisons/
│   ├── explainers/
│   └── whitepaper-sections/
└── _archive/                ← Superseded flat-root files (date-suffixed)
    ├── sase_benchmark-2026-04.html
    ├── sase_ztna-2026-04.html
    ├── sase_sse-2026-04.html
    ├── sase_sdwan-2026-04.html
    ├── sase_aiops-2026-04.html
    └── sase_sovereignty-2026-04.html
```

---

## Relationship Map

*Quick-reference for edit impact. Before changing anything, find it here to see what else needs to move.*

---

### 1. Data Flow — What Feeds What

```
scores.json
  └── fetched by assets/js/main.js at page load
        ├── components/sase_ztna.html        ← renderScoringTable(pillars.ztna, big_six)
        ├── components/sase_sse.html         ← renderScoringTable(pillars.sse, big_six)
        ├── components/sase_sdwan.html       ← renderScoringTable(pillars.sdwan, all_vendors)
        ├── components/sase_aiops.html       ← renderScoringTable(pillars.aiops, scoped_vendors)
        ├── components/sase_sovereignty.html ← renderScoringTable(pillars.sovereignty, scoped_vendors)
        └── components/sase_scorecard.html   ← renderRadar() + renderMasterTable() + renderPillarBars() + renderVendorCards()

assets/css/main.css
  └── linked by every page (components/ and working-docs/ via ../assets/css/main.css)

assets/css/toc.css
  └── linked by every page that has a sidebar TOC

assets/js/toc.js
  └── auto-generates TOC from h2/h3 headings on every page that includes it
```

**Rule:** Score changes go in `scores.json` only. They propagate automatically to all pillar tables and the scorecard. Never hardcode scores in HTML.

---

### 2. Vendor → Pillar Scope Matrix

*Which pillars a vendor is scored on. Null = out of scope, not a zero.*

| Vendor | ZTNA | SSE | SD-WAN | AIOps | Sovereignty | Notes |
|---|---|---|---|---|---|---|
| Palo Alto | ✓ | ✓ | ✓ | ✓ | ✓ | All 5 · Big Six |
| Cato | ✓ | ✓ | ✓ | ✓ | ✓ | All 5 · Big Six |
| Netskope | ✓ | ✓ | ✓ | ✓ | ✓ | All 5 · Big Six |
| Cloudflare | ✓ | ✓ | ✓ | ✓ | ✓ | All 5 · Big Six |
| Zscaler | ✓ | ✓ | ✓ | ✓ | ✓ | All 5 · Big Six; no native SD-WAN CPE |
| Fortinet | ✓ | ✓ | ✓ | ✓ | ✓ | All 5 · Big Six (promoted from Emerging in v2.1) |
| Versa | ✓ | ✓ | ✓ | ✓ | ✓ | All 5 · Emerging; scores in sase_emerging.html only |
| Aryaka | — | — | ✓ | ✓ | — | SD-WAN + AIOps only |
| Island | ✓ | ✓ | — | — | — | ZTNA + SSE only (browser scope) |
| Nile | ✓ | — | — | — | — | ZTNA only (campus/LAN scope) |

---

### 3. Content Dependency Map — What References What

**`_index.html`** references:
- Every file in `working-docs/` (navigation links + vendor count)
- Every file in `components/` (navigation links + doc count)
- Vendor count in header pill and metadata bar
- `assets/css/main.css`

**`components/sase_emerging.html`** references:
- All 5 emerging vendor working-docs (deep links)
- Prose descriptions of each emerging vendor's scope and fit
- Comparison table row per emerging vendor
- `scores.json` (indirectly via main.js, for any score tables)

**`components/sase_scorecard.html`** references:
- `scores.json` (all vendors, all pillars — most data-dense consumer)
- All pillar component docs (cross-links)
- All working-docs (vendor card deep links)

**`components/sase_[pillar].html`** (each of 5 pillar docs) references:
- `scores.json` (its own pillar's criteria and scores)
- All vendor working-docs that are scored on that pillar (summary cards with deep links)
- `components/sase_benchmark.html` (criteria rationale)

**`components/sase_benchmark.html`** references:
- No score data — framework only
- Links to all 5 pillar docs

**`working-docs/[vendor].html`** (each of 10 vendor docs) references:
- `components/sase_[pillar].html` for each scored pillar (back-links)
- No direct `scores.json` dependency — scores display lives in pillar docs

**`CLAUDE.md`** references:
- Vendor roster (must stay in sync with working-docs/ file list)
- Directory structure (must reflect actual files)
- scores.json version (must match meta.version in scores.json)

**`README.md`** references:
- File list in directory tree (must stay in sync with actual files)
- URL table for all pages (must stay in sync with working-docs/ and components/)

**`TODO.md`** references:
- Vendor-specific pending work items (remove when vendor is dropped or work is done)

---

### 4. Change Impact Chains

*Touch X → also update Y.*

**Add a vendor:**
1. Create `working-docs/[vendor].html`
2. Add vendor entry to `scores.json` vendors array (with scope_note and null scores)
3. Add null score blocks for all relevant criteria in `scores.json`
4. Add row to `_index.html` working-docs panel; increment vendor count
5. Add section to `components/sase_emerging.html` (if emerging) or update Big Six count
6. Add row to emerging comparison table in `sase_emerging.html` (if emerging)
7. Update `CLAUDE.md`: vendor roster table, directory structure, key vendor decisions
8. Update `README.md`: directory tree, URL table
9. Bump `scores.json` meta.version and changelog

**Remove a vendor:**
1. Move `working-docs/[vendor].html` to `_archive/[vendor]-YYYY-MM.html`
2. Remove vendor entry from `scores.json` vendors array
3. Remove all vendor score blocks from `scores.json` criteria
4. Remove row from `_index.html`; decrement vendor count
5. Remove section from `components/sase_emerging.html` (if emerging)
6. Remove row from emerging comparison table in `sase_emerging.html`
7. Update `CLAUDE.md`: vendor roster, directory structure, Big Six vs. Emerging note, key vendor decisions
8. Update `README.md`: directory tree, URL table
9. Update `TODO.md`: remove vendor-specific tasks
10. Bump `scores.json` meta.version and changelog

**Update a score:**
1. Edit the score + note in `scores.json` for the relevant criterion
2. Update `last_verified` date on the criterion if it's a time-sensitive fact
3. Bump `scores.json` meta.last_updated and changelog
4. Update the Last Reviewed date in the vendor's working-doc footer
5. Flag any spin-offs derived from that vendor as potentially stale

**Add a pillar criterion:**
1. Add criterion block to `scores.json` under the relevant pillar
2. Add score entries for every vendor scored on that pillar (or explicit null + note)
3. Update the pillar component doc (`components/sase_[pillar].html`) with criterion explanation
4. Update `components/sase_benchmark.html` if criteria weighting table is shown there
5. Bump `scores.json` meta.version and changelog

**Add a new pillar (rare):**
1. Create `components/sase_[pillar].html`
2. Add pillar block to `scores.json` with all criteria
3. Update `_index.html` component panel; increment component count
4. Update nav in every component doc and every working-doc to include new pillar link
5. Update `components/sase_benchmark.html` with pillar definition
6. Update `CLAUDE.md` canonical pillar keys
7. Update `README.md` URL table

**Rename or restructure a file:**
1. Update every inbound link from `_index.html`, component nav bars, and working-doc nav bars
2. Update `README.md` URL table and directory tree
3. Update `CLAUDE.md` directory structure
4. Check `assets/js/main.js` for any hardcoded path references
5. Move old file to `_archive/` with date suffix if it was a published page

**Update vendor scope (e.g. Island from ZTNA-only to ZTNA+SSE):**
1. Update vendor `scope_note` in `scores.json`
2. Add new pillar's score blocks to all criteria for that pillar in `scores.json`
3. Add new pillar section to `working-docs/[vendor].html`
4. Update `components/sase_emerging.html` scope badges and prose
5. Update `CLAUDE.md` vendor roster table
6. Bump `scores.json` meta.version and changelog

**Publish a spin-off:**
1. Create file in `spin-offs/[type]/[name].html` derived from working-docs source
2. Add row to `_index.html` spin-offs panel; increment published count
3. Do NOT modify any working-doc or scores.json — spin-offs consume, never modify

---

### 5. Downstream Staleness Triggers

*When event E occurs, these files may become stale and need review.*

| Event | Files to review |
|---|---|
| Vendor product launch or major update | `working-docs/[vendor].html`, relevant `components/sase_[pillar].html` summary cards, any spin-offs derived from that vendor |
| Gartner MQ position change | `working-docs/[vendor].html`, `components/sase_emerging.html` if emerging, `components/sase_scorecard.html` persona matrix, `CLAUDE.md` key vendor decisions |
| Acquisition (vendor buys or is acquired) | `working-docs/[vendor].html`, `scores.json` scope_note and affected scores, `CLAUDE.md` key vendor decisions |
| New pillar criterion added to benchmark | `scores.json`, all pillar component docs, `components/sase_benchmark.html` |
| Certification status change (FedRAMP, IRAP, C5) | `scores.json` certifications criterion, `components/sase_sovereignty.html`, `working-docs/[vendor].html` sovereignty section |
| PoP count or backbone coverage change | `scores.json` global_latency + private_backbone criteria, `working-docs/[vendor].html`, `last_verified` date on affected criteria |
| scores.json version bump | `CLAUDE.md` scores.json schema section version reference |
| Spin-off published from a working-doc that later updates | Add stale notice to spin-off file header |

---

## Asset Path Conventions (critical — always verify)

**From `components/` files:**
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/toc.css">
<script src="../assets/js/main.js"></script>
<script src="../assets/js/toc.js"></script>
```
scores.json is fetched by `main.js` with path `../scores.json` from `components/`.

**From `working-docs/` files:**
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/toc.css">
<script src="../assets/js/main.js"></script>
<script src="../assets/js/toc.js"></script>
```
scores.json is not directly fetched by working-docs — they link to the component pillar docs for score display.

**From root (`_index.html`):**
```html
<link rel="stylesheet" href="assets/css/main.css">
```

**Nav links within `components/`:** bare filename `sase_x.html` (same directory).

**Nav links from `working-docs/` to components:** `../components/sase_x.html`

**Pillar anchor links from `working-docs/`:** `../working-docs/vendor.html#pillar_id`

**Index link from `components/` or `working-docs/`:** `../_index.html`

---

## Vendor Roster

### Big Six (complete, all 5 pillars)

| ID in scores.json | Name | Product | Arch type |
|---|---|---|---|
| `palo_alto` | Palo Alto Networks | Prisma Access + SCM | `stitched` |
| `cato` | Cato Networks | Cato SASE Cloud | `single_pass` |
| `netskope` | Netskope | Netskope One | `single_pass` |
| `cloudflare` | Cloudflare | Cloudflare One | `single_pass` |
| `zscaler` | Zscaler | ZIA + ZPA + ZDX | `integrated` |
| `fortinet` | Fortinet | FortiSASE + FortiOS | `unified_os` |

### Emerging (pillar-scoped)

| ID | Name | Scope | Notes |
|---|---|---|---|
| `aryaka` | Aryaka | SD-WAN + AIOps | Managed SASE; SSE co-packaged (PA Prisma option) |
| `island` | Island | ZTNA + SSE | Enterprise Browser; March 2026 full SASE stack launch |
| `nile` | Nile | ZTNA (campus) | Zero Trust NaaS; $175M Series C; Gartner Visionary 2025 LAN MQ |
| `versa` | Versa Networks | All 5 pillars | Gartner Challenger 2025 (3rd year); FedRAMP Ready High; all scores complete |

---

## scores.json Schema

```json
{
  "meta": { "version": "2.2", "last_updated": "2026-04-19", ... },
  "vendors": [
    { "id": "palo_alto", "name": "...", "product": "...", "tier": "big_six", "arch_type": "stitched" },
    { "id": "island", "name": "...", "tier": "emerging", "arch_type": "enterprise_browser",
      "scope_note": "Scored on ZTNA + SSE pillars. SD-WAN, AIOps, Sovereignty null by design." }
  ],
  "pillars": {
    "ztna": {
      "label": "Remote Access / ZTNA",
      "criteria": [
        {
          "id": "device_posture",
          "label": "Device Posture (Continuous)",
          "weight": "critical",
          "scale": "1=No posture · 3=One-time check · 5=Continuous EDR-integrated, session termination on failure",
          "scores": {
            "palo_alto": { "score": 5, "note": "1-2 sentence evidence note." },
            "fortinet":  { "score": null, "note": "Pending — note what to verify." }
          }
        }
      ]
    }
  }
}
```

**Score null convention:** Use `null` (not 0) when a vendor is out-of-scope for a criterion. Include a `note` explaining why. Fortinet and Versa have null scores pending full research pass.

**Note field:** 1–2 sentences. States what the vendor specifically does or does not do to justify the score. Narrative analysis belongs in the HTML, not the JSON.

**Weight multipliers:** `"critical": 3 · "high": 2 · "medium": 1`

**Canonical pillar keys:** `ztna · sse · sdwan · aiops · sovereignty`

---

## Canonical Buyer Personas

*All pillar docs use these four. Scorecard adds two additional (Global Performance, Enterprise ZT Transformation).*

| # | Name | Subtitle | Primary Vendor Fit |
|---|------|----------|--------------------|
| P1 | **Lean IT** | SMB–Mid-market | Cato primary; Cloudflare alt |
| P2 | **Global Security Ops** | Large Enterprise | Palo Alto primary; Zscaler alt |
| P3 | **Data-First / Regulated** | Finance · Healthcare · Legal | Netskope primary; Palo Alto alt |
| P4 | **Platform / Network Architect** | 500–5,000 employees | Cato primary; Cloudflare / Aryaka alt |

**Badge classes:** `winner-primary` and `winner-alt`. Legacy `winner-tag` (no modifier) — do not use in new markup.

```html
<!-- Canonical persona row pattern -->
<tr>
  <td><strong>Lean IT</strong><br><span style="font-size:11px;color:var(--edge-muted);">SMB–Mid-market</span></td>
  <td>Profile...</td><td>Primary need...</td>
  <td><span class="winner-tag winner-primary">CATO</span></td>
  <td><span class="winner-tag winner-alt">CLOUDFLARE</span></td>
  <td>Rationale...</td>
</tr>
```

---

## Vendor Working Document Conventions

Each `working-docs/vendor.html` follows this structure:
1. **Header** — Edge brand header with vendor name and subtitle
2. **Nav** — links to `../_index.html`, `../components/sase_benchmark.html`, and relevant pillar pages
3. **BLUF** — 3-paragraph summary (position, pillar scope, primary fit/limitation)
4. **Stats strip** — 4 `edge-stat` blocks (key numbers/badges)
5. **Architecture section** (id=`architecture`) — structural strengths/limitations grid
6. **One section per scored pillar** (id=`ztna`, `sse`, `sdwan`, `aiops`, `sovereignty`)
7. **Persona Fit Table** — 4-row table using canonical personas
8. **Changelog table** — version history

Pillar sections link back to component pillar docs at the bottom:
```html
<p>→ <a href="../components/sase_ztna.html">ZTNA pillar comparison — all vendors</a></p>
```

Emerging vendors with limited scope (Aryaka, Nile, Island) only have sections for their in-scope pillars. Out-of-scope pillars get a brief `edge-card--supplemental` note.

---

## Two-Layer Architecture (v2.0)

**Component docs (`components/`)** own the framework:
- Feynman intuition intro
- Criteria definitions and weighting rationale
- DLP philosophy table, architectural framing
- Scoring table (rendered from `scores.json`)
- Persona fit matrix

**Vendor working docs (`working-docs/`)** own vendor narrative:
- Per-vendor pillar analysis organized by pillar section with anchor IDs
- Summary cards (~100–200 words + strengths/watch areas)
- Changelog

Components contain summary cards that link to vendor working-docs:
```html
<a href="../working-docs/cato-networks.html#sse">Full SSE analysis — cato-networks.html</a>
```

---

## Scoring Table Rendering

`window.renderPage` in each component doc is called by `main.js` after `scores.json` fetch:

```javascript
window.renderPage = function(data) {
  if (!data.pillars || !data.pillars.ztna) {
    document.getElementById('score-container').innerHTML = '<div class="edge-callout...">Local server required...</div>';
    return;
  }
  var vendors = data.vendors.filter(function(v) { return v.tier === 'big_six'; });
  renderScoringTable(data.pillars.ztna, vendors, 'score-container');
};
```

`renderScoringTable(pillar, vendors, containerId)` is defined in `main.js`. It renders a full criterion × vendor matrix with score dots and notes.

The scorecard uses a more complex `window.renderPage` that calls `renderRadar()`, `renderMasterTable()`, `renderPillarBars()`, and `renderVendorCards()`.

---

## Organizational Decisions

### Pillar-First Navigation
Documents organized by pillar (ZTNA, SSE, SD-WAN, AIOps, Sovereignty), not by vendor. Readers asking "who wins on DLP" get a direct answer. Vendor working-docs exist for full vendor context.

### Big Six vs. Emerging
Big Six are the primary subjects of all pillar comparison docs. Emerging vendors (Aryaka, Fortinet, Island, Nile, Versa) each have working-docs with scoped pillar analysis. Emerging vendors appear in pillar docs as callout boxes with links to their working-docs.

### scores.json as Single Source of Truth
All scores live in `scores.json`. A score change propagates automatically to all pillar tables and the Master Scorecard. Do not hardcode scores in HTML.

---

## Key Vendor Decisions

### Palo Alto Networks
Scope: Prisma Access + SCM. SCM ties cloud SASE and physical NGFW estate together — often undersold. Architecture: stitched. Strongest enterprise browser (Prisma Access Browser from Talon acquisition).

### Zscaler
**Caution:** ZIA and ZPA are distinct products. Do not claim native unified engine without verification. ZDX is separately licensed. Architecture: integrated (ZIA + ZPA via policy sync).

### Cato Networks
Single-pass, private backbone (85+ PoPs). Reference implementation of true single-vendor SASE. Cato Dynamic Prevention (March 2026) — auto-adaptive behavioral blocking. Aim Security acquisition closes the AI security gap.

### Netskope
Data-centric design. Industry reference for ML DLP (1,000+ classifiers, EDM, OCR). NewEdge sovereign PoP architecture. FedRAMP High + IRAP Protected. Strongest sovereignty posture in Big Six. Mumbai management plane announced April 2026 for DPDPA.

### Cloudflare
330+ PoPs, best global latency. Developer-native. Strongest GenAI protection dual-side story (workforce + builders). MCP server governance (April 2026).

### Fortinet (Emerging, new in v2.0)
Gartner MQ Leader 2025, #1 Secure Branch Network Modernization. Only vendor in four concurrent Gartner MQ reports. FortiOS unified OS. **Customer experience watch**: Gartner Peer Insights shows below-average support quality, update-induced software instability. Scores pending full research pass.

### Versa Networks (Emerging, new in v2.0)
Gartner SASE Challenger 2025 (3rd year). One of only three vendors in SD-WAN + SSE + SASE Platforms MQs. VOS software-defined architecture (runs on commodity hardware). FedRAMP Ready High. #1 Network Starter Kit use case (Gartner Critical Capabilities). Scores pending full research pass.

### Island (Emerging, updated v2.0)
March 2026: Full SASE stack launched — SWG, ZTNA, CASB, RBI, DLP through the browser layer without SSL break-and-inspect. Pre-encryption enforcement. $4.8B valuation, $730M raised, zero customer churn. Scope updated from ZTNA-only to ZTNA + SSE. Competitor: Palo Alto Prisma Access Browser (PAB).

### Aryaka
Managed SASE. SmartConnect private backbone (40+ PoPs). 24×7 NOC/SOC included. SD-WAN + AIOps scope only (SSE is co-packaged PA Prisma Access option).

### Nile
Zero Trust NaaS for campus/LAN edge. Every wired and wireless port is a ZTNA enforcement point. $175M Series C. Gartner Visionary 2025 LAN MQ. Not a WAN or cloud security play — complements Big Six SASE.

---

## Styling & Branding

All pages use Edge Solutions brand (Edge Documents v0.2).

### Core Brand Tokens (in `assets/css/main.css` — never redefine inline)

| Token | Value | Role |
|---|---|---|
| `--edge-blue` | `#486D87` | Primary — headers, dominant backgrounds |
| `--edge-green` | `#C6D219` | Accent — pills, rules, CTAs. Punctuation only |
| `--edge-dark` | `#4C5351` | Body text on light surfaces |
| `--edge-muted` | `#7B7D72` | Secondary text, labels |
| `--edge-light` | `#F2F3F4` | Page canvas |
| `--edge-moss` | `#9DA03C` | Supporting accent |
| `--warning` | `#E6A817` | Caution states |
| `--error` | `#C44536` | Error / destructive |
| `--white` | `#FFFFFF` | — |

**Dark-section background:** `#2d4a5c` — used for BLUF boxes, doc-nav, pillar-hero. Literal value, no variable.

**Glass card pattern:** `background: rgba(255,255,255,0.72–0.82); backdrop-filter: blur(16px); border: 0.5px solid rgba(72,109,135,0.25);`

**Vendor color vars:** `--v-palo: #E74C3C · --v-cato: #2E86AB · --v-netskope: #8E44AD · --v-cloudflare: #E67E22 · --v-zscaler: #1A7A4A`

**Pillar bar colors:** `--pb-ztna: #1A7A4A · --pb-sse: #2E86AB · --pb-sdwan: #E67E22 · --pb-aiops: #8E44AD · --pb-sovereignty: #C0392B`

### Header Pattern (canonical)
```html
<header class="edge-header">
  <div class="edge-header__top">
    <span class="edge-header__brand">EDGE SOLUTIONS</span>
    <div class="edge-header__pills">
      <span class="edge-pill">VENDOR DEEP DIVE</span>
      <span class="edge-pill edge-pill--muted">VENDOR NAME</span>
      <span class="edge-pill edge-pill--phase">2026</span>
    </div>
  </div>
  <div class="edge-header__bottom">
    <h1 class="edge-header__title">Page Title</h1>
    <p class="edge-header__subtitle">Subtitle text</p>
  </div>
</header>
```

### Nav Pattern (canonical for `components/`)
```html
<nav class="doc-nav">
  <a href="../_index.html">Index</a><span class="doc-nav__sep">›</span>
  <a href="sase_benchmark.html">Benchmark</a><span class="doc-nav__sep">›</span>
  <a href="sase_ztna.html" class="active">ZTNA</a><span class="doc-nav__sep">›</span>
  ...
  <a href="sase_scorecard.html">Scorecard</a>
</nav>
```

### Pill Classes (canonical v0.2)
```css
.edge-pill          /* lime green bg / dark text */
.edge-pill--muted   /* gray bg / white text */
.edge-pill--moss    /* moss green bg / white text */
.edge-pill--phase   /* dark bg / green text + green border */
```
`edge-pill--secondary` is a legacy alias for `--muted`. Use `--muted` in all new markup.

### Score Badge Classes
```
weight-critical  →  var(--error) #C44536
weight-high      →  var(--warning) #E6A817
weight-medium    →  #ccc / #444
```

### Radar Chart (scorecard only)
Use `responsive:true, maintainAspectRatio:false`. Control aspect ratio via CSS `padding-bottom` on `.radar-canvas-wrapper`. Current breakpoints: ≥1200px → 55% · 900–1199px → 58% · 600–899px → 62% · <600px → 70%. Do NOT use `layout.padding` in Chart.js config.

---

## Content & Writing Conventions

- **BLUF first:** Lead with the answer, follow with supporting detail.
- **Feynman intro:** Plain-language intuition before technical depth. No need to label it.
- **Precision:** No confident vendor claims without source or verification note.
- **DLP framing:** Describe philosophy and fit, not a ranked hierarchy. Netskope = data-centric. Zscaler = proxy-enforced. Palo Alto = threat-first. Cato/Cloudflare = operational/compliance. No universal "best."
- **Caution boxes:** Use `edge-callout edge-callout--warning` for Gartner-sourced vendor cautions (Cato sovereignty gap, Fortinet customer experience, Zscaler ZIA/ZPA separation). These are not opinions — they are documented.
- **Null scores:** `null` means out-of-scope, not zero performance. Always include a note explaining the null.
- **"Pending" scores:** Fortinet and Versa scores are null pending a full scoring research pass. The `note` field in each criterion states what to verify.

---

## Cloudflare Pages Deployment

**Live URL:** `https://tytonest.xyz/SASE_Codex/`
**Repo:** `discerningowl/tytonest` · Production branch: `main` · No build command · No output directory

**scores.json fetch path:** Derived from `window.location.pathname` in `main.js` — NOT `document.currentScript.src`. Cloudflare Rocket Loader rewrites `<script>` tags, breaking src-based detection.

**Clean URLs:** Cloudflare Pages natively serves `sase_scorecard` from `sase_scorecard.html`. No `_redirects` file — it causes redirect loops.

**`_headers`:** Single global `/*` rule only. `/SASE_Codex/*` subdirectory overrides do NOT reliably apply.

**Cache:** After any `_headers` change, purge via Cloudflare dashboard → Caching → Configuration → Purge Everything.

**v2.0 deployment note:** The v2.0 restructure moves component files to `components/` subdirectory. Cloudflare Pages will serve `components/sase_benchmark` without `.html` extension automatically. Verify `../scores.json` fetch path resolves correctly after deployment (path is relative to the component file's URL, not the server root).

---

## Pending Work (as of 2026-04-19)

1. **Fortinet + Versa full scoring pass** — all null scores in `scores.json` need research and values
2. **Fortinet + Versa sovereignty certifications** — BSI C5, IRAP, BYOK status to verify directly with vendors
3. **Spin-off documents** — `spin-offs/` directories exist but are empty
4. **scores.json Fortinet/Versa sovereignty certifications** — currently null pending verification
