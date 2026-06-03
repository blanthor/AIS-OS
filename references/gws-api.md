# gws CLI Reference

Google Workspace CLI used by this AIOS. Installed and authenticated under GCP project `ai-os-ralph`.

## Auth

Credentials stored in OS keyring. Token is handled automatically.

```
gws auth login       # re-authenticate if token expires
gws auth status      # check current auth state
```

## Pattern

```
gws <service> <resource> [sub-resource] <method> [flags]
```

All commands accept:
- `--params '{"key": "value"}'` — URL/query params
- `--json '{"key": "value"}'` — request body (POST/PATCH)
- `--format table` — human-readable output (default: json)
- `--dry-run` — validate without sending

---

## Gmail

### Send an email

```bash
gws gmail users messages send \
  --params '{"userId": "me"}' \
  --json '{
    "raw": "<base64-encoded RFC 2822 message>"
  }'
```

In practice, use the `workflow` shortcut:

```bash
gws workflow gmail send \
  --to "recipient@example.com" \
  --subject "Subject line" \
  --body "Message body"
```

### Search emails

```bash
gws gmail users threads list \
  --params '{"userId": "me", "q": "from:someone@example.com is:unread"}'
```

### Read a thread

```bash
gws gmail users threads get \
  --params '{"userId": "me", "id": "<threadId>"}'
```

### List recent inbox messages

```bash
gws gmail users messages list \
  --params '{"userId": "me", "maxResults": 10, "labelIds": ["INBOX"]}'
```

---

## Google Sheets

Spreadsheet ID for Warm Outreach: `1nA7Px-NPgx5HEPdMjuKh1m4EAf2D4fhnVvm_mk94SjE`

### Read a range

```bash
gws sheets spreadsheets values get \
  --params '{
    "spreadsheetId": "1nA7Px-NPgx5HEPdMjuKh1m4EAf2D4fhnVvm_mk94SjE",
    "range": "Sheet1!A1:F10"
  }'
```

### Append a row (adds after last row in range)

```bash
gws sheets spreadsheets values append \
  --params '{
    "spreadsheetId": "1nA7Px-NPgx5HEPdMjuKh1m4EAf2D4fhnVvm_mk94SjE",
    "range": "Interaction Log!A:G",
    "valueInputOption": "USER_ENTERED"
  }' \
  --json '{
    "values": [["2026-06-03", "Name", "Platform", "Goal", "Status", "Notes", "2026-06-17"]]
  }'
```

### Update specific cells

```bash
gws sheets spreadsheets values update \
  --params '{
    "spreadsheetId": "1nA7Px-NPgx5HEPdMjuKh1m4EAf2D4fhnVvm_mk94SjE",
    "range": "Sheet1!D15:F15",
    "valueInputOption": "USER_ENTERED"
  }' \
  --json '{
    "values": [["2026-06-03", "LinkedIn DM", "Notes text here"]]
  }'
```

### List sheet tabs (get sheetId values)

```bash
gws sheets spreadsheets get \
  --params '{
    "spreadsheetId": "1nA7Px-NPgx5HEPdMjuKh1m4EAf2D4fhnVvm_mk94SjE"
  }' \
  --format table
```

---

## Google Calendar

### List upcoming events

```bash
gws calendar events list \
  --params '{
    "calendarId": "primary",
    "maxResults": 10,
    "orderBy": "startTime",
    "singleEvents": true,
    "timeMin": "2026-06-03T00:00:00Z"
  }'
```

### Create an event

```bash
gws calendar events insert \
  --params '{"calendarId": "primary"}' \
  --json '{
    "summary": "Follow up — Name",
    "description": "Last contact: 2026-06-03. Platform: LinkedIn DM. Notes: context here.",
    "start": {"dateTime": "2026-06-17T09:00:00-05:00", "timeZone": "America/Chicago"},
    "end":   {"dateTime": "2026-06-17T09:30:00-05:00", "timeZone": "America/Chicago"},
    "reminders": {"useDefault": false, "overrides": [{"method": "popup", "minutes": 30}]}
  }'
```

### Create a recurring daily block

```bash
gws calendar events insert \
  --params '{"calendarId": "primary"}' \
  --json '{
    "summary": "Outreach Block",
    "description": "Run /daily-outreach. Target: 2 messages. Aim for 10/week.",
    "start": {"dateTime": "2026-06-04T08:00:00-05:00", "timeZone": "America/Chicago"},
    "end":   {"dateTime": "2026-06-04T08:30:00-05:00", "timeZone": "America/Chicago"},
    "recurrence": ["RRULE:FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR"]
  }'
```

### List calendars

```bash
gws calendar calendars list --format table
```

---

## Google Drive

### Search for a file

```bash
gws drive files list \
  --params '{
    "q": "name contains '\''Warm Outreach'\'' and mimeType = '\''application/vnd.google-apps.spreadsheet'\''",
    "fields": "files(id,name,modifiedTime)"
  }'
```

### List recent files

```bash
gws drive files list \
  --params '{"orderBy": "modifiedTime desc", "pageSize": 10}' \
  --format table
```

---

## Common patterns for this AIOS

| Task | Command |
|---|---|
| Log outreach interaction | `sheets values append` on `Interaction Log!A:G` |
| Update contact's last-interaction date | `sheets values update` on `Sheet1!D{row}:F{row}` |
| Create follow-up reminder | `calendar events insert` with date = today + 14 days |
| Create daily outreach block | `calendar events insert` with RRULE weekday recurrence |
| Check for email replies | `gmail users threads list` with `q: "from:{email}"` |

---

## Notes

- Timezone for all calendar events: `America/Chicago` (Houston, TX)
- Google Sheets `valueInputOption: "USER_ENTERED"` interprets dates as dates, not strings
- `--page-all` auto-paginates for large result sets
- Schema inspection: `gws schema sheets.spreadsheets.values.append`
