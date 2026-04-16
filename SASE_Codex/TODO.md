# TODO — SASE Codex
*Last updated: Q2 2026*

---

## Status: All Tasks Complete ✅

All Phase I–III content, website refactor, scoring, and housekeeping tasks are done as of this session.

### What was completed across all sessions

- [x] Phase I benchmark + all Phase II pillar deep dives (ZTNA, SSE, SD-WAN, AIOps, Sovereignty, Emerging)
- [x] Full hostable website — shared CSS/JS, TOC sidebar, all 8 HTML pages
- [x] scores.json — Big Five across all 5 pillars, all criteria, fully scored with evidence notes
- [x] scores.json — Emerging vendors (Aryaka, Graphiant, Nile, Island) added in-scope only
  - Aryaka: SD-WAN (all 8 criteria) + AIOps (all 6 criteria)
  - Graphiant: SD-WAN (all 8 criteria)
  - Nile: ZTNA (all 9 criteria, null where not applicable)
  - Island: ZTNA (all 9 criteria, null where not applicable)
- [x] Phase III scorecard — renderPage() implemented with Chart.js radar, weighted master table, per-pillar ranking bars, and vendor summary cards
- [x] CLAUDE.md document table updated — all Phase II and Phase III status flipped to ✅ Complete
- [x] Island Enterprise Browser added to sase_phase2f_emerging.html
- [x] Enterprise Browser criterion added to sase_phase2a_ztna.html
- [x] RBI criterion added to sase_phase1_benchmark.html and sase_phase2b_sse.html

---

## Key Reminders

- Read `CLAUDE.md` first — all structural and content decisions are logged there
- Working directory: `~/Documents/Claude/Projects/SASE_Codex/`
- Edge Solutions branding: skill at `/mnt/skills/user/edge-solutions-html/SKILL.md`
- **Website mode** — CSS: `assets/css/`, JS: `assets/js/`, scores: `scores.json` at root
- Phase III scorecard requires a local server or browser that allows fetch() to local files — open via `python3 -m http.server` from the project root, not file://
- Palo Alto scope = Prisma Access + Strata Cloud Manager (SCM) only
- DLP = vendor philosophy framing, not hierarchy ranking
- Zscaler = verify before asserting; ZIA/ZPA are separate products
- Island = full Chromium fork (not extension); full profile in phase2f, callout in phase2a
- Emerging vendor scoring = in-scope pillars only; cross-pillar totals not computed for emerging vendors
