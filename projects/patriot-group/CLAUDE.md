# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project: Patriot Group — Toner Levels

Automates the toner replenishment workflow for a copier maintenance company. Ricoh copiers send low-toner alert emails to the technician's Outlook inbox. The technician currently checks those manually, verifies the toner level in Ricoh ARMS, and checks eAutomate to see if toner was already dispatched before creating a new supply order. This project replaces that manual loop.

**Systems integrated:**
- **Microsoft Outlook** (via Microsoft Graph API) — reads Ricoh alert emails
- **Ricoh ARMS** (fleet management portal) — verifies live toner levels
- **eAutomate by ECI Software** (field service ERP) — checks open supply orders and creates new ones

**Workflow entry point:** `workflows/process_toner_alert.md` — read this first before running any tools.

**Outstanding setup required before first run:**
1. Fill in all credentials in `.env` (see comments in that file for where to get each one)
2. Confirm the Ricoh ARMS API endpoint and field names — see the TODO block in `tools/check_ricoh_arms.py`
3. Confirm the correct eAutomate ORDER_TYPE and endpoint — see the TODO block in `tools/create_eautomate_supply_order.py`
4. Run `pip install -r requirements.txt` to install dependencies
5. Test with `python tools/create_eautomate_supply_order.py ... --dry-run` before live execution

---

# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools). This architecture separates concerns so that probabilistic AI handles reasoning while deterministic code handles execution. That separation is what makes this system reliable.

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which tools to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team

**Layer 2: Agents (The Decision-Maker)**
- This is your role. You're responsible for intelligent coordination.
- Read the relevant workflow, run tools in the correct sequence, handle failures gracefully, and ask clarifying questions when needed
- You connect intent to execution without trying to do everything yourself
- Example: If you need to pull toner data from a printer, don't attempt it directly. Read `workflows/check_toner_levels.md`, figure out the required inputs, then execute the appropriate tool in `tools/`

**Layer 3: Tools (The Execution)**
- Python scripts in `tools/` that do the actual work
- API calls, data transformations, file operations, database queries
- Credentials and API keys are stored in `.env`
- These scripts are consistent, testable, and fast

**Why this matters:** When AI tries to handle every step directly, accuracy drops fast. If each step is 90% accurate, you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you stay focused on orchestration and decision-making where you excel.

## How to Operate

**1. Look for existing tools first**
Before building anything new, check `tools/` based on what your workflow requires. Only create new scripts when nothing exists for that task.

**2. Learn and adapt when things fail**
When you hit an error:
- Read the full error message and trace
- Fix the script and retest (if it uses paid API calls or credits, check with me before running again)
- Document what you learned in the workflow (rate limits, timing quirks, unexpected behavior)

**3. Keep workflows current**
Workflows should evolve as you learn. When you find better methods, discover constraints, or encounter recurring issues, update the workflow. That said, don't create or overwrite workflows without asking unless I explicitly tell you to. These are your instructions and need to be preserved and refined, not tossed after one use.

## The Self-Improvement Loop

Every failure is a chance to make the system stronger:
1. Identify what broke
2. Fix the tool
3. Verify the fix works
4. Update the workflow with the new approach
5. Move on with a more robust system

## File Structure

```
.tmp/           # Temporary files (scraped data, intermediate exports). Regenerated as needed.
tools/          # Python scripts for deterministic execution
workflows/      # Markdown SOPs defining what to do and how
.env            # API keys and environment variables (NEVER store secrets anywhere else)
credentials.json, token.json  # Google OAuth (gitignored)
```

**Core principle:** Local files are just for processing. Anything I need to see or use lives in cloud services (Google Sheets, etc.). Everything in `.tmp/` is disposable.

## Bottom Line

You sit between what I want (workflows) and what actually gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic. Stay reliable. Keep learning.
