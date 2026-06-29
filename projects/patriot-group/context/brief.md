# Patriot Group — Client Brief

**Started:** 2026-06-08
**Primary contact:** David Dufilho (VP)
**Industry:** Managed print / document services

## Problem

Toner replenishment for copiers and printers is a fully manual process. Ricoh's @remote service (Japan) sends low-toner alert emails through a former employee's inbox, which are forwarded to Mary Gianakos (backup: Cyndi Yalkin). Mary must cross-reference eAutomate and Ricoh ARMS to verify toner levels and check whether a supply order has already been dispatched before creating a new one. No audit trail exists through logs.

## Stakeholders

| Name | Role | Email | Notes |
|---|---|---|---|
| David Dufilho | VP — Primary Stakeholder | ddufilho@patriotgroup.com | |
| Jim Hotze | Owner | jhotze@patriotgroup.com | |
| Mary Gianakos | Primary workflow operator | mGianakos@patriotgroup.com | On vacation 2026-06-30 |
| Cyndi Yalkin | Backup workflow operator | cyaklin@patriotgroup.com | |
| Chris Kobs | IT Manager | — | Internal Patriot Group IT |
| David Kobs | RCL — O365 point of contact | — | External; RCL manages O365 for Patriot Group |

## Goals

1. Automate the toner replenishment workflow to eliminate manual cross-referencing between @remote alerts, eAutomate, and Ricoh ARMS.
2. Replace the insecure former-employee inbox notification path with a direct, auditable channel.

## Constraints

- Budget: TBD
- Timeline: TBD
- Technical: O365 managed externally by RCL (contact: David Kobs); eAutomate sandbox available for testing

## Automation Targets

| # | Process | Priority | Status |
|---|---|---|---|
| 1 | Toner replenishment workflow (eAutomate + Ricoh ARMS) | High | In Progress |
| 2 | @remote notification path — secure inbox or direct API | High | Backlog |

## Technical Notes

- Printers and copiers (MFPs) have different data gathering steps and must be handled separately.
- For printers: alert does not include Equipment ID — must be looked up in eAutomate via serial number.
- For copiers: Equipment ID is included in the alert.
- Ricoh ARMS shows toner install date for copiers/MFPs.
- eAutomate sandbox is available for dev/test.
- Ricoh Smart Integrations (RSI) — Ricoh's native automation suite — should be investigated as a potential automation layer.

### eAutomate API (PIP)

- **Protocol:** SOAP
- **Endpoint:** `PublicAPIService.asmx`
- **Serial number lookup:** `getEquipmentFromSerialNumber` (single); batch variant available
- **Status:** API exists and covers the required lookup; **enablement for Patriot Group's instance is still pending** — needs to be actioned with ECI/Chris Kobs

## Meeting Log

| Date | Summary |
|---|---|
| 2026-05-22 | Initial discovery meeting |
| 2026-06-23 | Workflow verification, corrections, and IT introduction — see `meetings/2026-06-23.md` |
