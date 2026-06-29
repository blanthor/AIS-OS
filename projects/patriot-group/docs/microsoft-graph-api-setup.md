# Microsoft Graph API Setup — n8n RicohPoC

## Overview

The RicohPoC n8n workflow reads emails to an inbound email box via the Microsoft Graph API. This document covers the one-time setup required to authorize n8n against Patriot Group's Microsoft 365 tenant.

---

## Prerequisites

Before starting, you need three values from the Azure App Registration created by IT support at RCL:

| Azure Entra ID label | Where to find it in Azure | How it is used in n8n |
|---|---|---|
| **Directory (tenant) ID** | Entra ID → Overview | Pasted into the Authorization URL and Access Token URL paths — not a standalone field in n8n |
| **Application (client) ID** | App registrations → n8n-RicohPoC → Overview | Maps to the **Client ID** field in n8n |
| **Value** (under Certificates & secrets) | App registrations → n8n-RicohPoC → Certificates & secrets | Maps to the **Client Secret** field in n8n |

> **Note:** Azure also shows an **Object ID** (on the app overview page) and a **Secret ID** (next to the secret Value). Neither of these are used in n8n — ignore them.

---

## Step 1 — Admin Consent (RCL action required)

Before any user can authenticate, an admin must grant tenant-level consent for the app.

**RCL must do this in the Azure Portal:**

1. Go to **Azure Portal → Entra ID → App registrations → n8n-RicohPoC**
2. Click **API permissions** in the left menu
3. Click **Grant admin consent for Patriot Group**
4. Click **Yes** to confirm

This is a one-time action. Without it, users will see the "Need admin approval" error when trying to connect.

---

## Step 2 — Create the Credential in n8n

1. In n8n, go to **Credentials → Add credential**
2. Search for **OAuth2 API** and select it (the generic one, not a service-specific variant)
3. Fill in the fields:

| Field | Value |
|---|---|
| **OAuth Redirect URL** | `https://oauth.n8n.cloud/oauth2/callback` — read-only, auto-filled by n8n |
| **Grant Type** | Authorization Code |
| **Authorization URL** | `https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize` |
| **Access Token URL** | `https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token` |
| **Client ID** | `{MSGRAPH_CLIENT_ID}` |
| **Client Secret** | `{MSGRAPH_CLIENT_SECRET}` |
| **Scope** | `https://graph.microsoft.com/Mail.ReadWrite offline_access` |
| **Auth URI Query Parameters** | leave blank |

Replace `{TENANT_ID}` in the two URL fields with the **Directory (tenant) ID** from Azure (`be0e2c13-5c05-4c5d-a7ec-23e31b45f8c4`).

4. Click **Connect**
5. A browser window opens — sign in as inbound email account.
6. Approve the permissions when prompted
7. The window closes automatically and the credential is saved

### Redirect URI note

The URL n8n shows in the credential form (`https://oauth.n8n.cloud/oauth2/callback`) differs from the URL originally sent to RCL. RCL must have **both** redirect URIs registered in the Azure App Registration, or replace the original with this one:

`https://oauth.n8n.cloud/oauth2/callback`

Without this, the Connect step will fail with a redirect URI mismatch error.

---

## Step 3 — Wire the Credential to the Workflow

1. Open the **RicohPoC** workflow in n8n
2. Click the **Get Ricoh Emails** node (Node 2)
3. In the **Credential** field, select the Microsoft OAuth2 credential you just created
4. Click the **Mark as Read** node (Node 7)
5. Set the same credential there

---

## Step 4 — Activate the Workflow

Once both credentials are set (Microsoft OAuth2 for nodes 2 and 7, Google Sheets for node 6):

1. Set the correct **Sheet ID** in the Append to Google Sheet node (Node 6)
2. Click **Test workflow** to run a manual test
3. Confirm a row appears in the Google Sheet
4. Confirm the source email is marked as read in rcompton@patriotgroup.com
5. Toggle the workflow **Active**

The workflow will then poll the inbox every 5 minutes automatically.

---

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| "Need admin approval" | Admin consent not granted | RCL must click "Grant admin consent for Patriot Group" in Azure Portal → App registrations → n8n-RicohPoC → API permissions |
| Redirect URI mismatch | Azure has wrong callback URL registered | RCL must add `https://oauth.n8n.cloud/oauth2/callback` to the App Registration's redirect URIs |
| 401 Unauthorized | Credential not connected or token expired | Re-authenticate in n8n Credentials |
| 403 Forbidden | Wrong permissions on the app | RCL must verify Mail.ReadWrite is listed under API permissions |
| No rows appearing in sheet | No unread emails from zjc_atremote_system@jp.ricoh.com | Send a test email or check the filter in Node 2 |
