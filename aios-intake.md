# AIS-OS Intake

This is the source-of-truth file for your AIOS. Fill it in by typing, voice-pasting (Wispr Flow / OS dictation), or running `/onboard` for a guided conversation. Whichever mode, this file is what `/onboard` reads to scaffold your Day-1 setup.

**Hard cap: 7 questions.** Each answerable in under 60 seconds. Don't overthink — you can edit and re-run `/onboard` any time.

---

## Q1 — Who are you, what do you sell, who do you sell it to?

Identity, offer, ICP. One paragraph each is fine.

```
Ralph Compton — Senior Full Stack Engineer turned independent AI Consultant, based in Houston TX. 15+ years building enterprise .NET and cloud-native applications at Avanade for Fortune 500 clients (Delta Air Lines, Johnson Controls, 3M, Schlumberger). Now independent since 2023, focused on AI agentic workflows, generative AI integration, and automation. Currently working primarily with Claude Code and n8n.

Offer: AI consulting services — designing and building AI agentic workflows, automation pipelines, and generative AI integrations for businesses. In the early stage: leading with free or low-cost quick wins to establish credibility and case studies. Long-term goal is a steady income stream from SMB clients.

ICP: Small and medium-sized businesses that have manual, repetitive processes ripe for AI automation but don't have in-house AI expertise. No paying customers yet — currently in the "land first clients" phase.
```

---

## Q2 — Paste 1-2 things you've written recently. Don't edit them.

An email, a LinkedIn post, a DM, a doc — anything that sounds like you when you're not trying. **Paste verbatim.** Do not type these mid-conversation with Claude — chat-shaped samples are worse than no samples (voice contamination).

```
Sample 1 — LinkedIn post (public, professional):

If you are frustrated by the overwhelming amount of spam from recruiters outside of the USA, who do not read your on-site / remote or travel preferences, I just found a great feature from Dice.com. That is Dice Recruiter routes their emails to you, and you can give feedback and then block the sender. Before I was just deleting the e-mails, now I am using this feature, hoping to see a refreshing change in my frustration levels.
```

```
Sample 2 — Client-facing project email (proof of concept kickoff):

Hi Everyone,

I want to thank you all for meeting with me last Friday. The automation of the task we landed on for the proof-of-concept is possible, although challenging.

Here is my tentative plan:
 - I need to meet with Mary again to ensure I fully understand the workflow. I believe this should take only 30 minutes.
 - We may need new email account set up to receive the same automated emails
 - We need information on the e-Automate back-end database. This might involve opening a support request with ECI.
 - We need a way to connect to Ricoh ARMS. This might ARMS involve sending an email directly to the system we are building, or having the system access Ricoh's website.

I will send out a diagram of my current understanding of the steps that Mary has to take, and send out a meeting invitation soon.

Please let me know your thoughts.

Kind regards,
Ralph
```

---

## Q3 — What are your 2-3 biggest priorities for the next 90 days?

Quarterly priorities. Not yearly aspirations. Things that, if not done by July, would make you say "I wasted Q2."

```
1. Reach $3,000/month in revenue from paying AI consulting clients by end of August 2026.
2. Publish 2 case studies / portfolio pieces in the AI automation space by end of August 2026.
3. Better organization in my home office by end of August 2026.
```

---

## Q4 — Where does revenue actually land, and where is it tracked?

Multiple answers OK. Stripe? Skool? GoHighLevel? QuickBooks? A spreadsheet?

```
Revenue tracking: Simplifi by Quicken (https://simplifi.quicken.com/)
Payment method: not yet established (no paying clients yet — pre-revenue)
```

---

## Q5 — Where do you talk to customers, your team, and the outside world day-to-day?

Email (which one — Gmail / Outlook)? Slack? Teams? DMs (Skool / Discord / iMessage)? Phone?

```
Primary: Gmail (ralph.compton@gmail.com), LinkedIn DMs, Google Workspace
Inactive (accounts exist but not used for customer communication): Microsoft Teams, Slack, Facebook
Calendar: Google Calendar (inferred from Gmail)
```

---

## Q6 — Where do meeting recordings, notes, and important docs live?

Granola? Otter? Fireflies? Google Drive? Notion? Dropbox? A folder on your desktop you keep meaning to organize?

```
Notes: Obsidian (recently installed, setting up)
Docs/proposals/contracts: Google Drive / Google Workspace (intended — not yet fully set up)
Meeting recordings: no system yet — recommended Otter.ai or Fireflies
Status: building this system — no established workflow yet
```

---

## Q7 — What's the one task that eats your week, and where do you currently track work?

The single biggest time-suck or recurring drudgery. Plus where tasks/projects live (ClickUp / Asana / Linear / Notion / a notebook).

```
Top pain: lack of organization — no consistent system yet for tracking work, notes, or client progress
Task tracking: Bullet journal (physical), Google Calendar, Windows Tasks
Status: systems are fragmented; consolidating is itself a priority
```

---

When this file is filled, run `/onboard` (or re-run it) and the wizard will scaffold your Day-1 file set: `context/`, `references/voice.md`, populated `connections.md`, and a filled `CLAUDE.md`.
