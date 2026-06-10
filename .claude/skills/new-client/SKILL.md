---
name: new-client
description: Scaffold a WAT-aligned project folder for a new client engagement under c:\code\AIS-OS\projects.
bike-method-phase: 1  # Phase 1 — Training wheels. Run manually first. Validate the structure works before wiring to any trigger.
three-ms-attribution: |
  Adapted from The Three Ms of AI™ © 2026 Nate Herk.
---

# New Client Scaffolder

Triggered by: `/new-client <Client Name>`

Creates a standard WAT-aligned project folder at `c:\code\AIS-OS\projects\{client-slug}\` and populates it with starter templates. No AI step — fully deterministic.

## Steps

### Step 1 — Parse and slugify

Take the client name from args. If none provided, ask: *"What's the client name?"*

Slugify rules:
- Lowercase everything
- Replace spaces and special characters with hyphens
- Strip leading/trailing hyphens
- Example: `"Patriot Group"` → `patriot-group`

### Step 2 — Check for conflicts

If `c:\code\AIS-OS\projects\{slug}` already exists, stop and tell Ralph:
> "A folder for `{slug}` already exists at `c:\code\AIS-OS\projects\{slug}`. Did you mean a different client?"

### Step 3 — Create folder structure

Create the following using PowerShell (create parent `c:\code\AIS-OS\projects` first if it doesn't exist):

```
c:\code\AIS-OS\projects\
  {client-slug}\
    context\
      meeting-notes\
    workflows\
    tools\
    deliverables\
    .tmp\
```

### Step 4 — Write template files

Write these four files with the content below, substituting `{Client Name}` and today's date:

---

**`c:\code\AIS-OS\projects\{slug}\README.md`**

```markdown
# {Client Name}

**Status:** Active
**Started:** {YYYY-MM-DD}
**Goal:** [fill in — one sentence on what they're hiring you for]

## Quick reference

| What | Where |
|---|---|
| SOPs / workflow specs | `workflows/` |
| Scripts, n8n exports | `tools/` |
| Meeting notes | `context/meeting-notes/` |
| Client brief | `context/brief.md` |
| Deliverables (before Drive) | `deliverables/` |
| Temp files | `.tmp/` (disposable) |

## Next steps

- [ ] Fill in `context/brief.md`
- [ ] Confirm first automation target
- [ ] Create Google Drive folder and link here
```

---

**`c:\code\AIS-OS\projects\{slug}\context\brief.md`**

```markdown
# {Client Name} — Client Brief

**Started:** {YYYY-MM-DD}
**Primary contact:**
**How we connected:** (LinkedIn / referral / Upwork / etc.)

## Problem

[What are they trying to fix or automate?]

## Stakeholders

| Name | Role | Notes |
|---|---|---|

## Goals

1.

## Constraints

- Budget:
- Timeline:
- Technical:

## Automation targets

| # | Process | Priority | Status |
|---|---|---|---|
| 1 |  |  | Backlog |

## Notes

```

---

**`c:\code\AIS-OS\projects\{slug}\.env.example`**

```
# API keys for {Client Name}
# Copy this file to .env and fill in values.
# NEVER commit .env — it is gitignored.

# CLIENT_API_KEY=
# WEBHOOK_URL=
# N8N_BASE_URL=
```

---

**`c:\code\AIS-OS\projects\{slug}\.gitignore`**

```
.env
.tmp/
*.log
__pycache__/
node_modules/
credentials.json
token.json
```

---

### Step 5 — Confirm and surface next steps

Output this block (substituting real values):

```
Client folder ready.

  c:\code\AIS-OS\projects\{slug}\

  context\
    brief.md          ← fill this in first
    meeting-notes\
  workflows\          ← WAT Layer 1: SOPs
  tools\              ← WAT Layer 3: scripts, n8n exports
  deliverables\       ← outputs before Google Drive
  .tmp\               ← disposable (gitignored)

Next:
  1. Open context\brief.md and fill in the problem + first automation target.
  2. Create a matching Google Drive folder and paste the link into brief.md.
  3. Run /level-up when you're ready to scope the first automation for this client.
```

## Notes

- `.tmp/` is disposable. Anything a client needs to see goes to `deliverables/` first, then Google Drive.
- `tools/` holds Python scripts and n8n JSON exports. Keep scripts named `verb_noun.py` (e.g. `pull_ticket_data.py`).
- `workflows/` holds Markdown SOPs — one file per automation. Brief Claude on the workflow before asking it to build.
- One folder per client. Don't nest clients inside each other.
- Full WAT framework reference: `references/wat-framework.md` in AIS-OS root.
