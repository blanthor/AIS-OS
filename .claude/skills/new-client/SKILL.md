---
name: new-client
description: Scaffold a WAT-aligned project folder for a new client engagement under c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects.
bike-method-phase: 1  # Phase 1 — Training wheels. Run manually first. Validate the structure works before wiring to any trigger.
three-ms-attribution: |
  Adapted from The Three Ms of AI™ © 2026 Nate Herk.
---

# New Client Scaffolder

Triggered by: `/new-client <Client Name>`

Creates a standard WAT-aligned project folder at `c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{client-slug}\` and populates it with starter templates. No AI step — fully deterministic.

## Steps

### Step 1 — Parse and slugify

Take the client name from args. If none provided, ask: *"What's the client name?"*

Slugify rules:
- Lowercase everything
- Replace spaces and special characters with hyphens
- Strip leading/trailing hyphens
- Example: `"Patriot Group"` → `patriot-group`

### Step 2 — Check for conflicts

If `c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{slug}` already exists, stop and tell Ralph:
> "A folder for `{slug}` already exists at `c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{slug}`. Did you mean a different client?"

### Step 3 — Create folder structure

Create the following using PowerShell (create parent `c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects` first if it doesn't exist):

```
c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\
  {client-slug}\
    context\
      meeting-notes\
    workflows\
    tools\
    temp\
      outputs\
      resources\
    deliverables\
```

### Step 4 — Write template files

Write these four files with the content below, substituting `{Client Name}` and today's date:

---

**`c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{slug}\README.md`**

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
| Temp files | `temp/` (disposable, gitignored) |

## Next steps

- [ ] Fill in `context/brief.md`
- [ ] Confirm first automation target
- [ ] Create Google Drive folder and link here
```

---

**`c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{slug}\context\brief.md`**

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

**`c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{slug}\.env.example`**

```
# API keys for {Client Name}
# Copy this file to .env and fill in values.
# NEVER commit .env — it is gitignored.

# CLIENT_API_KEY=
# WEBHOOK_URL=
# N8N_BASE_URL=
```

---

**`c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{slug}\.gitignore`**

```
.env
temp/
*.log
__pycache__/
node_modules/
credentials.json
token.json
```

---

**`c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{slug}\CLAUDE.md`**

```markdown
# {Client Name} — Agentic Workflow Project

This file is the master configuration that Claude Code reads at the start of every session.

## WAT Framework

This project follows the WAT framework (Workflows - Agent - Tools):

- **W — Workflows** (`workflows/`): Step-by-step procedures that orchestrate the work. One Markdown file per automation.
- **A — Agent**: Claude Code — the AI agent that reads this file, plans, and executes tasks.
- **T — Tools** (`tools/`): Scripts and integrations that the agent uses to get things done. Python scripts named `verb_noun.py`. n8n JSON exports live here too.

## Folder structure

| Path | Purpose |
|---|---|
| `workflows/` | Step-by-step procedure files — one per automation |
| `tools/` | Scripts, n8n exports, integrations |
| `temp/` | Temporary working files (disposable, gitignored) |
| `temp/outputs/` | Working outputs during a session |
| `temp/resources/` | Input files Claude needs access to during a run |
| `context/` | Client brief, meeting notes |
| `deliverables/` | Outputs ready to share with client (before Google Drive) |
| `.env` | API keys and secrets — never commit |

## Secrets

API keys and credentials live in `.env`. This file is gitignored and never committed.
Copy `.env.example` to `.env` and fill in values before running any tool.

## Session start

When starting a new session on this project, read:
1. `context/brief.md` — client context and goals
2. Any relevant `workflows/` file for the task at hand
3. This file

Then ask: "What are we working on today?"
```

---

### Step 5 — Confirm and surface next steps

Output this block (substituting real values):

```
Client folder ready.

  c:\Users\ralph\OneDrive\Desktop\AIOS\AIS-OS\projects\{slug}\

  CLAUDE.md           ← WAT config — Claude reads this at session start
  context\
    brief.md          ← fill this in first
    meeting-notes\
  workflows\          ← W: SOPs, one file per automation
  tools\              ← T: scripts, n8n exports
  temp\               ← disposable (gitignored)
    outputs\
    resources\
  deliverables\       ← outputs before Google Drive

Next:
  1. Open context\brief.md and fill in the problem + first automation target.
  2. Create a matching Google Drive folder and paste the link into brief.md.
  3. Run /level-up when you're ready to scope the first automation for this client.
```

## Notes

- `temp/` is disposable and gitignored. Anything a client needs to see goes to `deliverables/` first, then Google Drive.
- `temp/outputs/` — working outputs during a session. `temp/resources/` — input files Claude needs during a run.
- `tools/` holds Python scripts and n8n JSON exports. Keep scripts named `verb_noun.py` (e.g. `pull_ticket_data.py`).
- `workflows/` holds Markdown SOPs — one file per automation. Brief Claude on the workflow before asking it to build.
- `CLAUDE.md` is the session entrypoint. Claude reads it at the start of every session to orient on the project.
- One folder per client. Don't nest clients inside each other.
- Full WAT framework reference: `references/wat-framework.md` in AIS-OS root.
