# WAT Framework

**WAT = Workflows / Agents / Tools**

Architecture for AI-assisted automation projects. Separates probabilistic AI reasoning from deterministic code execution. Used across all client engagements.

Source: `c:\code\n8n\jd2resume\CLAUDE.md`

---

## The Three Layers

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines: objective, required inputs, which tools to use, expected outputs, edge case handling
- Written in plain language — brief Claude the same way you'd brief a person on your team

**Layer 2: Agents (The Decision-Maker)**
- Claude's role: intelligent coordination
- Read the relevant workflow, run tools in sequence, handle failures, ask clarifying questions
- Connect intent to execution — don't try to do everything directly
- Example: need to pull data from a website → read `workflows/scrape_website.md` → execute `tools/scrape_single_site.py`

**Layer 3: Tools (The Execution)**
- Python scripts (or n8n exports) that do the actual work
- API calls, data transformations, file operations, database queries
- Credentials in `.env` — never anywhere else
- Consistent, testable, fast

## Why it works

Each AI step operating at 90% accuracy compounds to 59% success after five steps. Offloading execution to deterministic scripts keeps Claude focused on orchestration and reasoning — where it excels.

## Operating rules

1. **Look for existing tools first.** Check `tools/` before building anything new.
2. **Learn and adapt when things fail.** Fix the script → verify → update the workflow. Every failure strengthens the system.
3. **Keep workflows current.** Don't create or overwrite workflows without asking unless explicitly told to.

## Self-improvement loop

1. Identify what broke
2. Fix the tool
3. Verify the fix works
4. Update the workflow with the new approach
5. Move on with a more robust system

## File structure per project

```
workflows/      # Markdown SOPs — one file per automation
tools/          # Python scripts / n8n JSON exports
deliverables/   # Final outputs before they go to Google Drive / cloud
.tmp/           # Temporary processing files (disposable, gitignored)
context/        # Client brief, stakeholders, meeting notes
.env            # API keys (NEVER commit)
.env.example    # Key template (safe to commit)
```

**Core principle:** Local files are for processing only. Anything the client needs to see lives in cloud services (Google Drive, Sheets, etc.). Everything in `.tmp/` is regenerable.

## Naming conventions

- Scripts: `verb_noun.py` (e.g. `pull_ticket_data.py`, `format_report.py`)
- Workflows: `verb_noun.md` (e.g. `sync_toner_levels.md`)
- One folder per client under `c:\code\AIS-OS\projects\`
