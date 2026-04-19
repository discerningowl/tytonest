# SASE Codex — TODO
*Last updated: 2026-04-19 — v2.0 scoring pass complete*

---

## PRIORITY 1 — Future Work (Not Started)

### Spin-Off Documents
`spin-offs/` directory structure exists but all subdirectories are empty. Spin-offs are derived from working-docs on demand — do not re-research from scratch.

Likely first spin-offs (derive from existing working-docs when needed):
- `vendor-briefs/cato-networks.html` — Lean IT persona brief
- `vendor-briefs/netskope.html` — Data-First / Regulated persona brief
- `comparisons/cato-vs-zscaler.html` — SD-WAN-first vs. ZTNA-first comparison
- `comparisons/island-vs-pab.html` — Island vs. Palo Alto Prisma Access Browser
- `explainers/ztna-vs-vpn.html` — ZTNA vs. VPN topic explainer

**Spin-off rule:** Spin-offs consume the Codex; they do not modify it. Always derive from `working-docs/` content, not re-researched from scratch.

### Whitepaper
`whitepaper/sase-codex-whitepaper.html` — synthesis document for publication. Update when major synthesis insights shift — not on every vendor update. Audience: external (prospects, clients, website visitors).

---

## PRIORITY 2 — Scheduled Maintenance

### Q3 2026 Quarterly Review
Scheduled tasks:
- **Review all emerging vendor cards** for continued relevance
- **Stale check** — any working-doc with Last Reviewed date > 6 months from today needs a review flag

### Cato FedRAMP Progress Check
Cato initiated FedRAMP High authorization March 2026 (Coalfire as 3PAO). Typical process 12–24 months. Check status at Q4 2026 quarterly review. Update `sase_sovereignty.html` cert matrix and `scores.json` certifications criterion for Cato when status changes.

### Fortinet + Versa Direct Vendor Verification
Several scores in v1.7 carry conservative values pending direct vendor confirmation. When opportunity arises (partner briefing, RFP response, competitive analysis), verify:
- **Fortinet:** BSI C5 current status · IRAP current status · BYOK GA availability for FortiSASE cloud SSE · FortiSASE cloud PoP count and latency SLA · ML training data isolation audit evidence
- **Versa:** BSI C5 current status · IRAP current status · BYOK / HYOK availability · CSA STAR status · ML training data isolation contractual position · Cloud PoP network coverage for target geographies

---

## PRIORITY 3 — Optional Enhancements (Judgment Calls)

### Consider Adding Fortinet + Versa to Radar Chart
`components/sase_scorecard.html` currently shows radar chart for Big Five only. With v1.7 scores now populated, Fortinet and Versa could be added. Trade-off: visual readability of 7 overlapping radar traces vs. analytical completeness. Recommend keeping Big Five radar primary and adding a separate Fortinet/Versa overlay chart if needed.

### Consider Promoting Fortinet + Versa to Full Vendor Cards in Pillar Docs
Each pillar doc (`sase_ztna.html`, `sase_sse.html`, `sase_sdwan.html`, `sase_aiops.html`, `sase_sovereignty.html`) currently references Fortinet and Versa in callout form rather than as full summary cards like the Big Five. Strongest case for promotion is in `sase_sdwan.html` (both vendors are SD-WAN MQ Leaders/Challengers). Judgment call — additive but not required.

### Consider Adding Fortinet + Versa as Full Vendor Sections in `sase_emerging.html`
The emerging overview page currently has full vendor cards only for Aryaka, Nile, and Island. Fortinet and Versa are referenced in the BLUF and the synthesis dark-section but lack dedicated vendor sections with strengths/watch-areas cards. Their full working-docs serve this purpose; adding sections here would make the overview page more comprehensive but would partially duplicate the working-docs.

### Update Persona Matrix for Fortinet/Versa Recommendations
If Fortinet earns a primary or alt recommendation for Platform/Network Architect persona (Fortinet installed base), and Versa earns primary for Network-Starter-Kit persona, update `sase_scorecard.html` persona matrix accordingly.

---

## DONE (session 2026-04-19 — scoring-pass continuation)

- ✅ **Scores.json v1.7** — Full scoring pass for Fortinet and Versa Networks across all 30 criteria (ZTNA × 9, SSE × 10, SD-WAN × 8, AIOps × 6, Sovereignty × 6 — note SD-WAN was already populated in v1.5). All 60 previously-null cells (30 Fortinet + 30 Versa) populated with scores + 1–2-sentence rationale notes grounded in the working-docs.
- ✅ Scores.json v1.6 archived to `_archive/scores-2026-04.json` (metadata snapshot with pre-scoring vendor/criterion status).
- ✅ Scores.json meta version bumped to v1.7, changelog updated, vendor `scope_note` fields for Fortinet and Versa updated from "pending full scoring pass" to "Fully scored v1.7".
- ✅ Island SSE scores verified against `working-docs/island.html` language — `casb_dual_mode: 3`, `shadow_it: 3`, `ips_threat_intel: 2` all internally consistent, no change required.
- ✅ `_index.html` verified clean — no PENDING badges on Fortinet/Versa rows, meta-bar correctly reads "All 10 complete" (Big Five + Aryaka, Fortinet, Versa, Island, Nile = 10 after Graphiant removal).
- ✅ `components/sase_emerging.html` — removed three stale `(pending)` annotations next to Aryaka, Nile, and Island working-doc links (those working-docs are complete per prior DONE list). Updated Island vendor-body callout language from "Full working document will reflect the expanded scope when built" to "The full working document reflects the expanded scope." Pre-cleanup snapshot archived to `_archive/sase_emerging-2026-04.html`.

## DONE (prior session — 2026-04-19)

- ✅ All 5 pillar docs confirmed fully refactored (ZTNA, SSE, SD-WAN, AIOps, Sovereignty)
- ✅ `components/sase_benchmark.html` — real content replacing redirect stub; asset paths fixed; vendor count updated to 11
- ✅ `components/sase_scorecard.html` — asset paths fixed; nav updated with Index link
- ✅ `components/sase_emerging.html` — asset paths fixed; Island updated for March 2026 SASE launch
- ✅ `_index.html` — all pillar docs marked complete; stale NEEDS REFACTOR badges cleared; benchmark links corrected to `components/`
- ✅ `working-docs/aryaka.html` — built from emerging overview content + expanded
- ✅ `working-docs/nile.html` — built from emerging overview content + expanded
- ✅ `working-docs/island.html` — fully expanded for March 2026 full SASE stack launch; PAB competitive note added
- ✅ `working-docs/fortinet.html` — net-new research, all 5 pillars, customer experience caution
- ✅ `working-docs/versa-networks.html` — net-new research, all 5 pillars, FedRAMP Ready High noted
- ✅ `scores.json` v1.5 — Fortinet + Versa vendor entries added; Island scope updated to ZTNA+SSE; Island SSE scores added; all null scores structured with verification notes
- ✅ `_archive/` — all 6 files date-suffixed (`-2026-04`)
- ✅ `CLAUDE.md` — fully rewritten for v2.0 structure
- ✅ `README.md` — fully rewritten for v2.0 structure; complete URL table for all 19 pages
