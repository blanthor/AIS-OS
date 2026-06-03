---
bike-method-phase: 1.5  # Draft + review still manual. Log and calendar now automated via gws.
three-ms-attribution: |
  Adapted from The Three Ms of AI™ © 2026 Nate Herk.
---

# Daily Outreach — Draft, Log, Remind

Morning ritual skill. One prospect per run. Drafts a platform-specific outreach message in Ralph's voice, writes the interaction log directly to Google Sheets, and creates a Google Calendar follow-up reminder.

**Target:** 10 outreach messages per week. Baseline was 5/month. Friction was the blocker.

## Modes

Ask Ralph at the start:

> "Drafting a new message, or logging an interaction that already happened?"

- **Draft + Log** (default): full flow — intake, draft, confirm send, log it, set reminder.
- **Log Only**: skip drafting — log an interaction that already happened and set a follow-up reminder.

## When to run

Run during your daily outreach block (triggered by your Google Calendar reminder). One run = one message drafted and logged. Aim for 2 runs on busy days to hit the weekly target. Also run any time you need to log an ad-hoc interaction (a meeting, a reply, a call).

---

## Draft + Log flow

### Step 1 — Prospect intake

Ask Ralph for:

1. **Name and how you know them** — friend, former colleague, LinkedIn connection, etc.
2. **Platform** — LinkedIn DM, Gmail, SMS, Facebook message
3. **What you know about their work or business** — role, company, what they do, any recent news
4. **Goal of this message** — reconnecting, introducing your services, following up on a prior conversation
5. **Last interaction** — when, what was said (or "no prior contact")

If Ralph doesn't know some of this, proceed with what's available. Note any gaps in the draft.

### Step 2 — Draft the message

Write a personalized outreach message in Ralph's voice. Match the platform:

- **LinkedIn DM / Facebook**: short, 3-5 sentences. Conversational. No pitch in the first message. End with a low-friction question or ask.
- **Gmail**: slightly longer. Open with a warm personal hook. One clear ask at the end. Sign off "Kind regards, Ralph Compton" or "Kind regards, Ralph" depending on the relationship.
- **SMS/iMessage**: very short. 2-3 sentences max. Feels like a text from a friend, not a sales email.

**Ralph's voice register** (from references/voice.md):
- Formal but warm. Not stiff, not casual.
- Direct and structured. No hype.
- Honest about what he's doing ("I'm building my AI consulting practice and thought of you").
- One clear ask. Not multiple asks in the same message.
- Signs off as "Ralph" for short messages, "Kind regards, Ralph Compton" for email.

Show the draft. Ask Ralph to review, edit, and send. Do not send anything automatically.

### Step 3 — Confirm send

After Ralph sends, ask:

> "Sent? What happened — any response, or sent with no reply yet?"

Capture: sent (yes/no), response summary (or "awaiting reply"), Ralph's read on the relationship temperature (warm/neutral/cold).

---

## Log Only flow

Ask Ralph for:

1. **Name**
2. **Date of interaction** (default: today)
3. **Platform / how it happened** — email, phone, in person, LinkedIn, etc.
4. **Goal or purpose** of the interaction
5. **Status / outcome** — e.g. "Sent — no reply", "Meeting held", "Call received"
6. **Notes** — 1-2 sentence summary
7. **Next follow-up date** (default: 14 days out)

Then proceed directly to Step 4.

---

## Step 4 — Write to Interaction Log

Use `gws` to append a row directly to the Interaction Log tab. Do not ask Ralph to paste anything.

**Sheet ID:** `1nA7Px-NPgx5HEPdMjuKh1m4EAf2D4fhnVvm_mk94SjE`
**Tab:** `Interaction Log`
**Columns:** Date | Name | Platform | Goal | Status | Notes | Next Follow-up

```
gws sheets spreadsheets values append \
  --params '{"spreadsheetId": "1nA7Px-NPgx5HEPdMjuKh1m4EAf2D4fhnVvm_mk94SjE", "range": "Interaction Log!A1", "valueInputOption": "USER_ENTERED", "insertDataOption": "INSERT_ROWS"}' \
  --json '{"values": [["YYYY-MM-DD", "Name", "Platform", "Goal", "Status", "Notes", "YYYY-MM-DD"]]}'
```

Also update the **Last Interaction** date (column D) in Sheet1 for the contact if they appear there. Search column A for the name to find their row, then patch column D.

Confirm to Ralph: "Logged to the Interaction Log."

## Step 5 — Create Google Calendar reminder

Use `gws` to create a follow-up event on Ralph's primary calendar. Do not ask Ralph to create it manually.

```
gws calendar events insert \
  --params '{"calendarId": "primary"}' \
  --json '{
    "summary": "Follow up — [NAME]",
    "description": "Last contact: [DATE]. Platform: [PLATFORM]. Notes: [1-sentence context].",
    "start": {"date": "YYYY-MM-DD"},
    "end": {"date": "YYYY-MM-DD"},
    "reminders": {"useDefault": true}
  }'
```

Use `"date"` (not `"dateTime"`) for an all-day event. Set start and end to the same follow-up date.

Confirm to Ralph: "Follow-up reminder set for [DATE] in Google Calendar."

---

## Phase notes

**Still manual (Phase 1):**
- Ralph provides prospect details
- Ralph reviews and edits every draft
- Ralph sends the message

**Now automated (Phase 2):**
- Interaction Log written directly via `gws`
- Google Calendar follow-up event created via `gws`

Phase 3 will read the prospect list from Sheet1 to suggest who to contact next. Don't build that until this phase has run at least 10 times.

## KPI to watch

Outreach messages sent per week. Log it. Target: 10/week. Review on Fridays when you run `/level-up`.
