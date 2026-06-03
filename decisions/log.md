# Decisions Log

Append-only record of meaningful decisions and why they were made. `/level-up` Phase 2 (Method interview) writes scoped automation specs here. You can also append manually whenever you decide something worth remembering.

**Format per entry:**

```
## YYYY-MM-DD — Short title

**Decision:** what was decided.

**Why:** the reasoning, constraints, and what would change your mind.

**Alternatives considered:** what else was on the table.

**Owner:** who's accountable.
```

Keep it terse. Future-you will thank present-you for capturing the *why*, not just the *what*.

---

## 2026-05-22 — Pursue Patriot Group: toner maintenance automation

**Decision:** Pursue toner maintenance workflow automation for Patriot Group as first consulting engagement.

**Why:** Discovery meeting surfaced a clear, bounded automation opportunity between eAutomate PTG Prod and Ricoh ARMS. Bounded scope, real pain point, named stakeholders — strong candidate for a quick win and first case study.

**Alternatives considered:** Continue general outreach with no specific project scoped.

**Owner:** Ralph

---

## 2026-06-01 — Daily outreach drafter + logger skill

**Decision:** Build an AI-assisted skill (`daily-outreach`) that drafts personalized outreach messages, formats interaction log entries, and preps Google Calendar follow-up reminders. Triggered by a daily Google Calendar reminder during Ralph's outreach block.

**Why:** Ralph is sending ~5 outreach messages per month against a target of 10/week. The drafting step is the friction point — no system means no momentum. Removing the "blank page" problem should drive volume closer to target.

**Process map:**
- Trigger: Daily outreach block (Google Calendar reminder)
- Data sources: Google Sheets prospect list (name, platform, notes, last contact date)
- Transformations: Ralph provides prospect details → skill drafts platform-specific message in Ralph's voice → formats log line → outputs follow-up reminder text
- Decision points: Ralph picks prospect, reviews draft, edits, sends
- Destination: Draft copied to LinkedIn/Gmail/SMS; log line pasted into Google Sheets; reminder created manually in Google Calendar

**Autonomy level:** L2 — AI drafts, human reviews and sends. Nothing goes out without Ralph's approval.

**KPI:** Bucket 1 — more customers. Metric: outreach messages sent per week. Baseline: ~1.25/week. Target: 10/week.

**Structural fix:** Add an interaction history column to Google Sheets that appends rows rather than overwrites. Skill outputs formatted log lines to paste in — starts building history today.

**Alternatives considered:** Full Google Sheets + Calendar API integration (Phase 2 after manual phase validates the flow); prompt-only with no skill structure (too unstructured, no consistency).

**Owner:** Ralph

---
