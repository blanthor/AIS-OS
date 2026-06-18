# {Client Name} – {Workflow Name} Discovery

<!-- Attach a flowchart image if one exists. Use /flowchart-to-markdown to generate this file from an image. -->
<!-- ![Workflow Flowchart]({filename}.png) -->

## Overview

{1-3 sentence description of what this workflow does and who does it. Cover: what triggers it, what system or inbox it originates from, and what the end state is.}

**Business context:** {Why does this workflow exist? What breaks if it doesn't run?}

---

## Current Flow Steps

### 1. Trigger
- {What starts the process? An email, a scheduled event, a phone call, a threshold being hit?}

### 2. {Step Name}
- {Who does this? What system do they log into?}
- {What information do they look up or enter?}
- {How long does this take?}

### 3. {Step Name}
- {Continue adding steps. Be specific about the system name, not just "the software".}

### 4. Decision — {Decision Name}?

| Condition | Path |
|-----------|------|
| {Condition A} | {What happens} |
| {Condition B} | {What happens} |

### 5. {Step Name}
- {What gets created, sent, or updated?}
- {Who gets notified?}

---

## Decision Logic Summary

```
{Trigger}  →  {Step}  →  {Step}
    ├── {Condition A}    → {Outcome A} → End
    └── {Condition B}
            ├── {Sub-condition 1}    → {Outcome 1} → End
            └── {Sub-condition 2}    → {Outcome 2} → End
```

---

## Systems Involved

| System | Role | Access type |
|--------|------|-------------|
| {System name} | {What it does in this workflow} | {API / web portal / email / manual} |
| {System name} | {What it does in this workflow} | {API / web portal / email / manual} |

---

## Pain Points (captured in discovery)

- {What does the employee hate about doing this?}
- {Where do errors or missed steps happen?}
- {How often does this run per day/week?}
- {What happens when the person who does this is out sick?}

---

## Volume & Frequency

| Metric | Value |
|--------|-------|
| Frequency | {Daily / Weekly / Event-triggered} |
| Volume per run | {e.g., 5-20 alerts/day} |
| Time per instance | {e.g., ~8 min manual} |
| Total weekly hours | {Estimate} |

---

## Expected Automation Flow

> Note: This is the proposed flow based on discovery. Confirm API access before committing.

### 1. Trigger
- {Same trigger as current — or describe how automation detects it}

### 2. {Automated Step}
- {What the system does automatically}
- {Which API or integration handles this?}

### 3. Decision — {Decision Name}?

| Condition | Path |
|-----------|------|
| {Condition A} | {Automated outcome} |
| {Condition B} | {Automated outcome} |

### 4. {Automated Step}
- {What gets created or updated without human touch}

---

## Open Questions / Blockers

- [ ] {Does {System} have an API? Who has credentials?}
- [ ] {Is there a sandbox/test environment available?}
- [ ] {What is the acceptable error rate for automated shipments?}
- [ ] {Who approves the automation before go-live?}

---

## Autonomy Level

| Level | Description |
|-------|-------------|
| L0 | Fully automated — no human in the loop |
| L1 | Automated with human review before action |
| **L2** | AI drafts / prepares — human approves and triggers |
| L3 | Human does it; AI monitors and flags anomalies |

**Target level for this workflow:** {L0 / L1 / L2 / L3}

**Rationale:** {Why this level? What's the risk of going fully autonomous?}

---

## Success Metric

| Metric | Baseline | Target |
|--------|----------|--------|
| {e.g., Time per alert} | {e.g., 8 min} | {e.g., 0 min (automated)} |
| {e.g., Alerts processed/day} | {e.g., 10} | {e.g., 10 (same, no backlog)} |
| {e.g., Missed shipments/month} | {e.g., ~2} | {e.g., 0} |
