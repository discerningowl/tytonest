# SASE Codex — Local Development Guide
*v2.0 — 2026-04-19*

The scoring tables on pillar pages load data from `scores.json` using a `fetch()` request. Browsers block `fetch()` on `file://` URLs, so **you cannot open these files by double-clicking them**. You need a local HTTP server.

---

## Quick Start

Open Terminal, navigate to the project root, and start the server:

```bash
cd ~/Documents/Claude/Projects/SASE_Codex
python3 -m http.server 8000
```

Then open the index in your browser:

```
http://localhost:8000/_index.html
```

Leave the Terminal window open while you browse. Press `Ctrl+C` to stop.

---

## Why double-clicking doesn't work

When you open an HTML file directly from Finder, it loads via `file://`. Browsers block `fetch()` requests on `file://` pages — including requests to other local files in the same folder. This is a browser security policy, not a bug.

The scoring tables on all pillar pages fetch `../scores.json` at page load. If the fetch fails, those pages display a callout explaining the issue. The Master Scorecard also loads Chart.js from CDN — that request also fails on `file://`.

---

## v2.0 File Structure

```
SASE_Codex/
├── _index.html                  ← Master navigation index (start here)
├── scores.json                  ← Single source of truth for all scores (v1.5)
├── CLAUDE.md                    ← Architecture decisions, brand reference
├── README.md                    ← This file
│
├── assets/
│   ├── css/
│   │   ├── main.css             ← Edge brand tokens, ambient gradient, glass cards
│   │   └── toc.css              ← Sidebar table of contents
│   └── js/
│       ├── main.js              ← fetch() orchestration, renderScoringTable()
│       └── toc.js               ← Auto-generates TOC from h2/h3 headings
│
├── components/                  ← Component benchmark documents
│   ├── sase_benchmark.html      ← Evaluation rubric, criteria, personas
│   ├── sase_ztna.html           ← ZTNA pillar deep dive
│   ├── sase_sse.html            ← SSE pillar deep dive
│   ├── sase_sdwan.html          ← SD-WAN pillar deep dive
│   ├── sase_aiops.html          ← AIOps pillar deep dive
│   ├── sase_sovereignty.html    ← Sovereignty pillar deep dive
│   ├── sase_scorecard.html      ← Master scorecard + radar chart
│   └── sase_emerging.html       ← Emerging vendor overview (contextual)
│
├── working-docs/                ← Vendor deep-dive working documents
│   ├── cato-networks.html
│   ├── cloudflare.html
│   ├── netskope.html
│   ├── palo-alto-networks.html
│   ├── zscaler.html
│   ├── aryaka.html
│   ├── fortinet.html            ← New in v2.0
│   ├── island.html
│   ├── nile.html
│   └── versa-networks.html      ← New in v2.0
│
├── spin-offs/                   ← Future deliverables (currently empty)
│   ├── vendor-briefs/
│   ├── comparisons/
│   ├── explainers/
│   └── whitepaper-sections/
│
└── _archive/                    ← Superseded flat-root files (date-suffixed)
    ├── sase_benchmark-2026-04.html
    ├── sase_ztna-2026-04.html
    ├── sase_sse-2026-04.html
    ├── sase_sdwan-2026-04.html
    ├── sase_aiops-2026-04.html
    └── sase_sovereignty-2026-04.html
```

---

## All pages at a glance

### Navigation
| Page | Local URL |
|------|-----------|
| Master Index | http://localhost:8000/_index.html |

### Component Benchmarks
| Page | Local URL |
|------|-----------|
| Benchmark Overview | http://localhost:8000/components/sase_benchmark.html |
| ZTNA | http://localhost:8000/components/sase_ztna.html |
| SSE | http://localhost:8000/components/sase_sse.html |
| SD-WAN | http://localhost:8000/components/sase_sdwan.html |
| AIOps | http://localhost:8000/components/sase_aiops.html |
| Sovereignty | http://localhost:8000/components/sase_sovereignty.html |
| Master Scorecard | http://localhost:8000/components/sase_scorecard.html |
| Emerging Overview | http://localhost:8000/components/sase_emerging.html |

### Vendor Working Documents
| Page | Local URL |
|------|-----------|
| Cato Networks | http://localhost:8000/working-docs/cato-networks.html |
| Cloudflare | http://localhost:8000/working-docs/cloudflare.html |
| Netskope | http://localhost:8000/working-docs/netskope.html |
| Palo Alto Networks | http://localhost:8000/working-docs/palo-alto-networks.html |
| Zscaler | http://localhost:8000/working-docs/zscaler.html |
| Aryaka | http://localhost:8000/working-docs/aryaka.html |
| Fortinet | http://localhost:8000/working-docs/fortinet.html |
| Island | http://localhost:8000/working-docs/island.html |
| Nile | http://localhost:8000/working-docs/nile.html |
| Versa Networks | http://localhost:8000/working-docs/versa-networks.html |

---

## Making score updates

All scores live in `scores.json`. Edit that file only — pillar pages read from it dynamically. No hardcoded score copies exist in the HTML files.

After updating scores, refresh the browser. No build step required.

The `last_verified` field on time-sensitive criteria (PoP counts, certifications, dated product launches) records when that data was last confirmed. Check `scores.json` meta for the full convention note.

**Null scores:** `null` means out-of-scope, not zero. Fortinet and Versa currently have null scores in most criteria pending a full research pass. Do not confuse null with a score of zero.

---

## Asset path conventions (v2.0)

The v2.0 restructure moves content into subdirectories. Asset paths use `../` prefixes:

**From `components/` or `working-docs/`:**
```html
<link rel="stylesheet" href="../assets/css/main.css">
<script src="../assets/js/main.js"></script>
```

**From root (`_index.html`):**
```html
<link rel="stylesheet" href="assets/css/main.css">
```

`scores.json` is fetched by `main.js` as `../scores.json` relative to the component file. On the live site, this resolves to `/SASE_Codex/scores.json`.

---

## Live site

Production is deployed at **https://tytonest.xyz/SASE_Codex/** via Cloudflare Pages, where `fetch()` works without a local server. Cloudflare Pages serves clean URLs without `.html` extensions automatically.

**Deployment note:** After any structural change (new files, renamed paths), verify the `../scores.json` fetch resolves correctly in the deployed environment. The path is relative to the component file's URL on the CDN.
