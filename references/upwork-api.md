# Upwork API Reference

## Credentials

Stored in `.env` (never commit this file):
- `UPWORK_PROJECT` — project name/ID
- `UPWORK_CLIENT_KEY` — OAuth 2.0 client key
- `UPWORK_CLIENT_SECRET` — OAuth 2.0 client secret

## Auth flow

Upwork uses OAuth 2.0. The client key + secret are used to obtain an access token. Tokens expire and must be refreshed.

```
POST https://www.upwork.com/api/v3/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id={UPWORK_CLIENT_KEY}
&client_secret={UPWORK_CLIENT_SECRET}
```

Store the returned `access_token` in memory (not in .env — it's ephemeral).

## Base URLs

- REST API: `https://www.upwork.com/api/`
- GraphQL API: `https://api.upwork.com/graphql` (newer, preferred for complex queries)

## Key endpoints

### Freelancer profile
```
GET /api/profiles/v2/users/{username}/profile
Authorization: Bearer {access_token}
```

### Job search (as a freelancer finding work)
```
GET /api/profiles/v2/search/jobs
?q=AI+automation+consulting
&skills=n8n,claude,ai-agents
Authorization: Bearer {access_token}
```

### Proposals submitted
```
GET /api/hr/v2/proposals
Authorization: Bearer {access_token}
```

### Contracts (active engagements)
```
GET /api/hr/v2/contracts
Authorization: Bearer {access_token}
```

### Messages / rooms
```
GET /api/messages/v3/rooms
Authorization: Bearer {access_token}
```

## Common use cases for Ralph's AIOS

- **Prospect tracking**: pull submitted proposals and their status into outreach log
- **Job alerts**: search for SMB clients posting AI automation work
- **Contract status**: check active contracts and upcoming milestones

## Notes

- Upwork's GraphQL API is more powerful for complex queries — check their developer docs for schema
- Rate limits apply — don't poll more than once per few minutes
- The `UPWORK_PROJECT` env var likely maps to a specific project context in the API

## Resources

- Developer portal: https://developers.upwork.com
- OAuth 2.0 guide: https://developers.upwork.com/?lang=python#authentication_oauth-20
