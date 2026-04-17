# TODO — SASE Codex
*Last updated: 2026-04-17*

---

## Status: Substantially Complete — 2026 Freshness Pass Applied

Phase I–III content, website refactor, scoring, and housekeeping tasks are complete. A 2026 freshness pass was run on 2026-04-17 in two phases: scores.json v1.2 for baseline corrections, then v1.3 for Cato 2026 product integration.

### 2026-04-17 freshness pass — v1.2 baseline corrections

- [x] `scores.json` bumped to v1.2 with Cloudflare One Appliance scoring corrections (ztp 3→4, multi_link 2→3, 5g_failover reasoning)
- [x] Netskope NewEdge footprint corrected from "50+ PoPs" to "120+ data centers in 75+ regions" across scores.json + sovereignty + ztna pages
- [x] Palo Alto App-ID signature count reconciled to 4,000+ across scores.json + sse + ztna pages (was 17,000+ in ztna, 5,000+ in scores.json, 4,000+ in sse prose)
- [x] Netskope CCI app count adjusted from 59,000+/60,000+ to 50,000+ across scores.json + sse
- [x] Cato FedRAMP status updated to "In Process (High, March 2026)" across scores.json + sovereignty page + certification matrix
- [x] Benchmark page stats corrected: 36→39 criteria, 8→9 vendors; missing `edge-header__bottom` wrapper added
- [x] CLAUDE.md header-wrapper rule corrected (benchmark was the outlier, not the reference)
- [x] Scorecard secondary pill renamed MASTER SCORECARD → SYNTHESIS
- [x] AIOps persona table extended with Zscaler (DEM/RCA) and Cloudflare "not recommended" rows; redundant RCA callout removed
- [x] Emerging page: Island added to summary paragraph and HTML `<title>`
- [x] Sovereignty page: DPDPA / Netskope India management plane (Apr 14 2026) added as 4th regulatory driver
- [x] Inlined FALLBACK_PILLAR in sase_sdwan.html / sase_sse.html / sase_ztna.html synced with v1.2 score changes
- [x] All "Q1 2026" sovereignty page references updated to "Q2 2026"

### 2026-04-17 freshness pass — v1.3 Cato 2026 product integration

- [x] `scores.json` bumped to v1.3 with Cato AI Security + Dynamic Prevention scoring
- [x] Cato GenAI Data Protection (SSE): **4 → 5** — Aim Security acquisition (Q3 2025, GA March 2026) covers public AI inline inspection, private AI firewall, AI-SPM, and MCP governance
- [x] Cato UEBA (AIOps): **4 → 5** — Cato Dynamic Prevention (GA March 3 2026) auto-adaptive threat prevention correlating months of sensor signals
- [x] SSE Cato vendor prose updated: new "AI Security — Aim Security Acquisition" section; Cato Neural Edge GPU backbone referenced; strength/watch cards rewritten
- [x] SSE BLUF updated to reflect March 2026 Cato platform shift
- [x] SSE "Three Defining Shifts" #1 rewritten to include Cato AI Security in 2026 GenAI landscape framing
- [x] AIOps Cato vendor prose updated: new "UEBA + Dynamic Prevention + AI Assistant" section replacing prior "UEBA + AI Assistant"; strength/watch cards rewritten
- [x] AIOps BLUF updated to reflect Dynamic Prevention closing Cato's UEBA gap
- [x] Inlined FALLBACK_PILLAR in sase_sse.html + sase_aiops.html synced with v1.3 Cato score changes

### 2026-04-17 score impact summary

- Cloudflare SD-WAN: 58% → **64%** (+6) from v1.2 ztp and multi_link corrections
- Cato SSE: 81% → **82%** (+1) from v1.3 GenAI Data Protection 4→5
- Cato AIOps: 83% → **88%** (+5) from v1.3 UEBA 4→5
- All other pillar weighted percentages unchanged
- 9 vendor entries in scores.json (Big 5 + Aryaka, Graphiant, Nile, Island)
- 39 total scored criteria (9 ZTNA + 10 SSE + 8 SDWAN + 6 AIOps + 6 Sovereignty)

### Final v1.3 weighted pillar scores

```
Vendor            ZTNA    SSE  SDWAN  AIOPS    SOV
palo_alto          93%    92%    79%    93%    83%
cato               81%    82%   100%    88%    58%
netskope           81%    93%    68%    70%   100%
cloudflare         88%    76%    64%    55%    83%
zscaler            87%    87%    39%    85%    83%
aryaka               –      –    78%    76%      –
graphiant            –      –    53%      –      –
nile               88%      –      –      –      –
island             79%      –      –      –      –
```

---

## Outstanding — Next-Session Scope

### Cato 2026 product updates — context only, not scored

The two score-moving Cato announcements were integrated in v1.3. Remaining Cato 2026 news is contextual and hasn't been worked into prose yet:

- **Cato Neural Edge** (Mar 17 2026): Referenced in SSE Cato prose as GPU backbone for AI Security execution. Could be expanded with more technical detail in a future pass.
- **Cato modular adoption model** (Mar 31 2026): Not yet reflected in scorecard persona framing. Consider adding a "Cato modular adoption" note to the Lean IT persona in the scorecard to explain that Cato now offers standalone AI Security / SD-WAN / SSE / UZTNA modules.
- **Cato 2025 ARR $350M, +43% YoY** (Mar 2026): Context for financial viability discussion; not currently in any page.

### Netskope 2026 product updates not yet scored

- **Netskope MCP (Model Context Protocol) security** (announced Nov 2025, GA H1 2026): Extends CCI risk scoring to MCP traffic, real-time identification of MCP servers/clients. Could affect genai_data_protection framing (currently 5 for Netskope) — but since Cato's new MCP governance was the reason to move Cato up to 5, Netskope's parity on MCP specifically doesn't change its existing 5 rating. Note for vendor prose only.
- **Netskope India management plane** (Apr 14 2026): Integrated into sovereignty page dark-section in v1.2 pass.

### Other deferred work

- [ ] Add `last_verified` date field per score in scores.json for PoP counts and certifications
- [ ] Draft a `sase_methodology.html` page covering weighting, null handling, and verification dates
- [ ] Consider removing or auto-generating the inlined FALLBACK_PILLAR blocks to prevent drift (currently 4 pages carry shadow copies of pillar data)
- [ ] Browser-QA all 8 pages against live scores.json on localhost before next deploy
- [ ] Verify Cato FedRAMP status quarterly — update certification matrix once authorization is granted
- [ ] Review scorecard persona framing once Cato modular adoption becomes established in the market (6–12 months)

---

## Key Reminders

- Read `CLAUDE.md` first — all structural and content decisions are logged there
- Working directory: `~/Documents/Claude/Projects/SASE_Codex/`
- Edge Solutions branding: skill at `/mnt/skills/user/edge-documents/SKILL.md`
- **Website mode** — CSS: `assets/css/`, JS: `assets/js/`, scores: `scores.json` at root
- Phase III scorecard requires a local server — open via `python3 -m http.server` from the project root, not `file://`
- Palo Alto scope = Prisma Access + Strata Cloud Manager (SCM) only
- DLP = vendor philosophy framing, not hierarchy ranking
- Zscaler = verify before asserting; ZIA/ZPA are separate products
- Island = full Chromium fork (not extension); full profile in `sase_emerging.html`, callout in `sase_ztna.html`
- Emerging vendor scoring = in-scope pillars only; cross-pillar totals not computed for emerging vendors
- FALLBACK_PILLAR blocks exist in 4 pillar pages for file:// development — keep in sync with scores.json on any score change
