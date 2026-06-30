# Connections

Registry of every system your AIOS can reach. Filled by `/onboard` from Q4-Q7 answers; expanded over time as you wire new tools. `/audit` checks this file for domain coverage and freshness.

| # | Domain | Tool | Mechanism | Auth | Last checked |
|---|---|---|---|---|---|
| 1 | Revenue / Financials | Simplifi by Quicken | not yet connected | — | — |
| 2 | Customer interactions | Gmail, LinkedIn, Upwork, Skool | cli (`gws`) · `key+ref` (Upwork) · not yet connected (Skool) | Gmail: OS keyring · GCP project `ai-os-ralph` · Upwork: `.env` → `references/upwork-api.md` · Skool: no public API — manual for now | 2026-06-29 |
| 3 | Calendar | Google Calendar | cli (`gws`) | shared — see row 2 | 2026-06-29 |
| 4 | Communication | Gmail, LinkedIn DMs | cli (`gws`) | shared — see row 2 | 2026-06-29 |
| 5 | Project / task tracking | Bullet journal, Google Calendar, Windows Tasks | cli (`gws`) | shared — see row 2 | 2026-06-29 |
| 6 | Meeting intelligence | Otter.ai or Fireflies (planned) | not yet connected | — | — |
| 7 | Knowledge / files | Obsidian, Google Drive | cli (`gws`) | shared — see row 2 | 2026-06-29 |

**Mechanism options:** `mcp` (MCP server), `script` (Python/Bash hitting an API, in `scripts/`), `export` (CSV/JSON dump pipeline), `key+ref` (`.env` key + `references/{tool}-api.md` guide), `not yet connected`.

When you wire a new tool, also save `references/{tool}-api.md` capturing endpoints, auth flow, and common queries — researched-once-saved-forever.
