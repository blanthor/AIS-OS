# Patriot Group – Copier Toner to Shipment Workflow

![Copier Toner Auto-Shipment Flowchart](PatriotGroupCopierToner-v2.png)

## Overview

This is workflow for toner replenishment for Ricoh copiers managed by Patriot Group. When a copier's toner level drops to 20% or below, it sends an alert to monitored e-mail notifiying an employee that the toner level is low. The employee must use information in the notification email to check on the identified copier and check its toner levels in real time in the Ricoh ARMS system and look for prior shipment history in eAutomate to determine whether a new shipment of toner must be sent to the customer.

---

## Current Flow Steps
### 1. Trigger
- A copier detects its toner level is **≤ 20%** and sends an alert e-mail.

### 2. E-mail Received
- The alert e-mail lands in the monitored inbox, which is read by the employee.

### 3. eAutomate PTG Prod Lookup
- The employee reads the e-mail noting necessary lookup information which includes:
  - **Customer Unit Name**
  - **Serial #**

### 4. Ricoh ARMS Lookup
Using the Serial #, two checks are performed in Ricoh ARMS:
- Retrieve the **latest shipment sent** and determine whether it was created after notifications began.
- Look up the **current toner level** for the unit.

### 5. Decision — Toner < 5%?
The first decision point is met to see whether the toner is low enough to warrant ordering more toner. Currently we are targeting a limit of 5%. If the toner is not lower than that amount, the alert email may be discarded.

| Condition | Path |
|-----------|------|
| Toner **< 5%** | Proceed to shipment-already-sent check |e-mail → End |
| Toner **≥ 5%** | **Delete or Archive** the alert email

### 6. Decision — Shipment Already Sent? 
The employee determines whether the shipment has already been sent for that copier by looking it up in eAutomate.

| Condition | Path |
|-----------|------|
| Shipment **not yet sent** | **Create Shipment for Customer** → End |
| Shipment **already sent** | **Delete or Archive** the alert e-mail → End |

### 7. Create Shipment for Customer
- A toner shipment is created in the system for the customer tied to the copier's serial number.


---

## Decision Logic Summary

```
Toner ≤ 20%  →  lookup unit  →  lookup Ricoh ARMS
    ├── Toner ≥ 5%                         → Delete / Archive eMail → End
    └── Toner < 5%      
            ├── Shipment already sent      → Delete / Archive eMail → End
            └── No shipment sent yet       → Create Shipment → End
```

---

## Expected Automation Flow Steps
Note: These steps will depend on further investigation. So this is mearly the expected flow of automation, until any corrections are made.
### 1. Trigger
- A copier detects its toner level is **≤ 20%** and sends an alert e-mail.

### 2. E-mail Received
- The alert e-mail lands in the monitored inbox (eAutomate PTG Prod).

### 3. eAutomate PTG Prod Lookup
- The system parses the e-mail to extract:
  - **Customer Unit Name**
  - **Serial #**

### 4. Ricoh ARMS Lookup
Using the Serial #, two checks are performed in Ricoh ARMS:
- Retrieve the **latest shipment sent** and determine whether it was created after notifications began.
- Look up the **current toner level** for the unit.

### 5. Decision — Toner < 5%?

| Condition | Path |
|-----------|------|
| Toner **< 5%** | **Delete or Archive** the alert e-mail → End |
| Toner **≥ 5%** | Proceed to shipment-already-sent check |

### 6. Decision — Shipment Already Sent? *(only if Toner ≥ 5%)*

| Condition | Path |
|-----------|------|
| Shipment **not yet sent** | **Create Shipment for Customer** → End |
| Shipment **already sent** | **Delete or Archive** the alert e-mail → End |

### 7. Create Shipment for Customer
- A toner shipment is created in the system for the customer tied to the copier's serial number.

### 8. Delete or Archive eMail
- The processed alert e-mail is deleted or archived to keep the inbox clean.

---

## Decision Logic Summary

```
Toner ≤ 20%  →  lookup unit  →  lookup Ricoh ARMS
    ├── Toner < 5%  (Yes)                  → Delete / Archive eMail → End
    └── Toner ≥ 5%  (No)
            ├── Shipment already sent      → Delete / Archive eMail → End
            └── No shipment sent yet       → Create Shipment → End
```

---

## Systems Involved

| System | Role |
|--------|------|
| Copier (Ricoh) | Sends toner-low alert e-mail at ≤ 20% |
| eAutomate PTG Prod | Receives e-mail; resolves Customer Name & Serial # |
| Ricoh ARMS | Provides current toner level and shipment history |
| Shipment System | Creates toner shipment orders for customers |
