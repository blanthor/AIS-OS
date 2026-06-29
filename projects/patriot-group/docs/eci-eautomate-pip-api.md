# ECI eAutomate PIP API — Serial Number Lookup

Source: AI Automation Society + Community (community research, 2026-06-24)

## The API

eAutomate exposes a SOAP service called **PIP**. Endpoint: `PublicAPIService.asmx`

**Relevant operations:**
- `getEquipmentFromSerialNumber` — single serial lookup
- `getEquipmentsFromSerialNumber` — returns all records matching a serial; prefer this over the singular version in case a serial maps to multiple assets (retired/re-issued units, history records)

## Auth

No API keys. Pass the following inside the SOAP request body:
- eAutomate username
- Password
- Company ID
- Version

Create a dedicated eAutomate user with limited permissions. Do not use a real person's login.

## Hosting Caveat

Patriot Group is on ECI's hosted setup (ecihosted). This means:
- No direct ODBC/SQL access — that only works on self-hosted instances
- No VM workaround needed
- PIP is the only supported integration path

## To Unblock: What ECI Needs to Provide

Have **Patriot Group open or co-sign the request** with their ECI account manager (you can't push this from the outside). This runs through a partner track and may involve an agreement or cost.

Ask ECI to:
1. Enable PIP on their hosted tenant
2. Provide the hosted PIP endpoint URL
3. Provide Dealer/Account ID
4. Authorize equipment read operations

## Build Notes (n8n)

1. Pull the WSDL from the endpoint
2. Use Claude Code to build the HTTP Request node with the SOAP body
3. Add an **XML node** immediately after the HTTP Request to parse the response (it returns XML, not JSON)
4. Match the `SOAPAction` header to the operation name exactly or you'll get a fault back
5. Flow: email trigger → HTTP Request (SOAP) → XML parse → map fields → rest of workflow

Fits into the existing n8n-MCP setup with no structural changes needed.
