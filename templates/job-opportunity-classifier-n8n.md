---
bike-method-phase: 1  # Phase 1 — Training wheels. Run manually first, spot-check labels for 2 weeks before trusting auto-routing.
three-ms-attribution: |
  Adapted from The Three Ms of AI™ © 2026 Nate Herk.
---

# n8n Text Classify Node — Job Opportunity Sub-Classifier

Add this as a second **Text Classify** node in your existing Job Opportunity n8n workflow.
Place it immediately after the node that applies the "Job Opportunity" Gmail label.

## Input expression

In the "Input" field of the Text Classify node, use:

```
{{ $json.subject }} — {{ $json.snippet }}
```

## Categories (paste each name + description into the node)

### 1. Review
A direct personal outreach from a US-based recruiter or staffing specialist about a job
that is fully remote, hybrid, or onsite within the Houston TX metro area. Houston metro
includes: Houston, Sugar Land, The Woodlands, Katy, Pearland, Clear Lake, Pasadena,
Spring, Conroe, League City, Friendswood, Galveston. The sender works for a
recognizable US company or staffing firm. This email is worth reading and potentially
replying to.

### 2. Skip - Foreign Recruiter
The email is from a staffing specialist at a company that appears to be an offshore or
foreign agency. Indicators: company names ending in "Private Ltd", "Pvt Ltd"; recruiter
first names common in South Asia (Mohit, Vamshi, Anshika, Indal, Rajeshwar, Shubham,
Priya, Deepak, Ravi, etc.); known offshore firms such as ConoV8, Fisec Global,
Tekgence, Largeton, Appian Infotech, NeoTech Solutions, Conov8 Systems. These
recruiters typically do not understand the US job market or Ralph's profile.

### 3. Skip - Location
The job requires onsite presence at a location clearly outside the Houston TX metro area.
The subject or body mentions a specific city or state other than Texas — such as Columbus
OH, Minneapolis MN, Charlotte NC, Chicago IL, Tysons VA, Cincinnati OH, New York NY,
New Jersey, California, Washington DC, Georgia, etc. Note: "Remote" and "Hybrid" are
always acceptable regardless of any listed office location.

### 4. Not a Job Lead
This is not a direct recruiter outreach. It is an automated digest, newsletter, or
marketing email. Examples: LinkedIn job alert digests
(jobalerts-noreply@linkedin.com, jobs-noreply@linkedin.com), Indeed match emails
(donotreply@match.indeed.com), Alignable networking emails, career advice newsletters
(alifeafterlayoff.com), Udemy promotions, Amazon Jobs marketing, Built In job board
digests, LinkedIn "Discover roles" promos. These should not be in the Job Opportunity
label at all.

---

## Recommended downstream routing (after this node)

| Classification     | Gmail action                        | Draft reply? |
|--------------------|-------------------------------------|--------------|
| Review             | Keep label, keep in inbox           | Yes (existing behavior) |
| Skip - Foreign     | Apply label `Job Opportunity/Skip`  | No           |
| Skip - Location    | Apply label `Job Opportunity/Skip`  | No           |
| Not a Job Lead     | Apply label `incorrect label`       | No           |

## Sub-labels to create in Gmail (one-time setup)

- `Job Opportunity/Skip` — for foreign + location skips
- `Job Opportunity/Review` — optional, for clarity once volume justifies it

## Validation (Bike Method Phase 1)

For the first 2 weeks, do NOT auto-archive anything. Let the node apply labels only.
Each day, spot-check 3-4 labeled threads:
- Did any "Review" threads get mis-labeled as Skip?
- Did any obvious skips get labeled Review?

Log false negatives (real leads marked Skip) immediately — each one is a missed income
opportunity. Adjust category descriptions if you see a pattern.

Advance to Phase 2 (auto-archive Skips) only after 2 weeks with zero false negatives.
