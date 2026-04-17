# SASE Codex — Local Development Guide

The scoring tables on pillar pages load data from `scores.json` using a `fetch()` request. Browsers block `fetch()` on `file://` URLs for security reasons, so **you cannot open these files by double-clicking them**. You need a local HTTP server.

---

## Quick Start

Open Terminal, navigate to the project root, and start the server:

```bash
cd ~/Documents/Claude/Projects/SASE_Codex
python3 -m http.server 8000
```

Then open any page in your browser:

```
http://localhost:8000/sase_benchmark.html
```

Leave the Terminal window open while you browse. Press `Ctrl+C` to stop the server when you're done.

---

## Why double-clicking doesn't work

When you open an HTML file directly from Finder or Explorer, it loads via a `file://` URL. Browsers treat `file://` pages as untrusted and block any `fetch()` requests — including requests to other local files in the same folder. This is a browser security policy, not a bug in the site.

The scoring tables on five pages (ZTNA, SSE, SD-WAN, AIOps, Sovereignty) fetch `scores.json` at page load. If the fetch fails, those pages display a callout explaining the issue rather than showing stale hardcoded data.

Three pages work fine without a server because they have no `fetch()` calls: Benchmark, Emerging Vendors, and Scorecard. The Scorecard radar chart also requires a server because it loads Chart.js from a CDN — that CDN request will also fail on `file://`.

---

## All pages at a glance

| Page | URL |
|------|-----|
| Benchmark | http://localhost:8000/sase_benchmark.html |
| ZTNA | http://localhost:8000/sase_ztna.html |
| SSE | http://localhost:8000/sase_sse.html |
| SD-WAN | http://localhost:8000/sase_sdwan.html |
| AIOps | http://localhost:8000/sase_aiops.html |
| Sovereignty | http://localhost:8000/sase_sovereignty.html |
| Emerging Vendors | http://localhost:8000/sase_emerging.html |
| Scorecard | http://localhost:8000/sase_scorecard.html |

---

## File structure

```
SASE_Codex/
├── README.md                 ← you are here
├── CLAUDE.md                 ← architecture decisions, brand reference
├── scores.json               ← single source of truth for all scores (v1.4)
├── TODO.md                   ← content and maintenance tracking
├── REFACTOR_TASKS.md         ← refactor progress log
│
├── sase_benchmark.html       ← overview, 9 vendors, 39 criteria summary
├── sase_ztna.html            ← ZTNA deep dive (Big Five)
├── sase_sse.html             ← SSE deep dive (Big Five)
├── sase_sdwan.html           ← SD-WAN deep dive (Big Five)
├── sase_aiops.html           ← AIOps deep dive (Big Five)
├── sase_sovereignty.html     ← Sovereignty deep dive (Big Five)
├── sase_emerging.html        ← Aryaka, Graphiant, Nile, Island
├── sase_scorecard.html       ← master scorecard + radar chart
│
├── assets/
│   ├── css/
│   │   ├── main.css          ← Edge Documents v0.2 tokens, ambient gradient, glass cards
│   │   └── toc.css           ← sidebar table of contents
│   └── js/
│       ├── main.js           ← fetch() orchestration, renderScoringTable()
│       └── toc.js            ← auto-generates TOC from h2/h3 headings
```

---

## Making score updates

All scores live in `scores.json`. Edit that file only — the pillar pages read from it dynamically. There are no hardcoded score copies in the HTML files.

After updating scores, refresh the browser page. No build step required.

The `last_verified` field on time-sensitive criteria (PoP counts, certifications) records when that data was last confirmed. Check `scores.json` meta for the `last_verified_convention` note.

---

## Live site

The production version is deployed at **https://tytonest.xyz/SASE_Codex/** via Cloudflare Pages, where `fetch()` works normally with no local server needed.
