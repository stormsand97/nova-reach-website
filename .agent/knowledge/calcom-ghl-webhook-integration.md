# Cal.com → GoHighLevel Webhook Integration

## Status: 🟡 PARTIALLY COMPLETE

Last updated: 2026-03-01

---

## What Was Done (Conversation 490fd00f)

### ✅ 1. GHL Inbound Webhook Created
- **GHL Account:** Philipp Udaloy's Account (Charlottetown, Prince...)  
- **Workflow Name:** `New Workflow : 1772417998941`
- **Trigger Type:** Inbound Webhook (⚠️ premium trigger – incurs per-execution charges)
- **Webhook URL:** `https://services.leadconnectorhq.com/hooks/AHQ8vBeqLeVYJOZV8qxm/webhook-trigger/a35dbb9a-c182-4dd2-9417-a7ed34...`
  - *(URL was partially visible in screenshot – verify full URL in GHL)*
- **Mapping Reference:** "Fetch Sample Requests" button was visible but not yet configured
- **Workflow Status:** Draft (NOT published)
- **Max Payload:** 1MB

### ✅ 2. GHL Website → Custom Code Block Added
- A "Custom HTML/Javascript" block was added to the GHL website builder
- The GHL site page shows `https://app.gohighlevel.com/v2/preview/1c12HSiODUN8NCl722fF`
- A "Select domain" modal appeared requiring domain connection before publishing

### ✅ 3. Vercel Serverless Function Created
- **File:** `api/webhook/calcom.js`
- **Endpoint:** `POST /api/webhook/calcom` (when deployed to Vercel)
- **What it does:** Receives Cal.com `BOOKING_CREATED` event, extracts attendee data, forwards to GHL Inbound Webhook
- **Required env vars:**
  - `GHL_WEBHOOK_URL` – The GHL inbound webhook URL (from step 1)
  - `CALCOM_WEBHOOK_SECRET` – (optional) For verifying Cal.com payload signatures

### ✅ 4. Cal.com Account Accessed
- **Username:** `philipp-udaloy` (org: `o18n0l`)
- **Event Types:**
  - Secret meeting (15m) – Hidden
  - 30 min meeting (30m) – Active
  - 15 min meeting (15m) – Active
- **Timezone:** Prompted to update to `America/Halifax`
- **Calendar:** Not yet connected (shown on "Connect your calendar" page)

---

## What Was NOT Done (Remaining Steps)

### ❌ 5. Cal.com Webhook NOT Created
- Navigated to the 15 min meeting → Webhooks → "Create your first webhook" screen
- **The webhook was never actually created/saved**
- The session ended on this screen

### ❌ 6. Vercel Environment Variables NOT Set
- `GHL_WEBHOOK_URL` needs to be added to Vercel project settings
- `CALCOM_WEBHOOK_SECRET` (optional) also needs adding

### ❌ 7. GHL Workflow NOT Published
- Workflow is still in "Draft" state
- Needs to be published for the Inbound Webhook URL to actually accept requests

### ❌ 8. GHL Workflow Actions NOT Configured
- No "Create Contact" action was added after the Inbound Webhook trigger
- The workflow currently just has: Trigger (Inbound Webhook) → END
- Need to add: Trigger → Create/Update Contact → (optional) notifications/tags

### ❌ 9. Integration NOT Tested
- No test booking has been made
- No test HTTP request has been sent to the GHL webhook URL

---

## Errors / Issues Encountered

### 1. High Memory Usage (1.1 GB)
- The browser showed "High memory usage: 1.1 GB" warning during the session
- This likely caused the session to end prematurely before completing all steps
- **Mitigation:** Keep fewer browser tabs open; close GHL builder before switching to Cal.com

### 2. GHL Domain Not Connected
- When trying to publish from the GHL website builder, a "Select domain" modal appeared
- "At least one domain needs to be selected before publishing funnel"
- This blocks GHL website publishing but does NOT block the webhook workflow

### 3. Cal.com Timezone Mismatch
- Cal.com detected timezone `America/Halifax` but the account had a different timezone set
- This could cause booking times to appear incorrectly
- **Action needed:** Confirm timezone is set to `America/Halifax` (Atlantic Time, GMT-4)

### 4. Wrong Cal.com Embed Path
- The website currently uses `calLink="philipp-udaloy-novareach/30min"` 
- But Cal.com shows the actual paths as `/philipp-udaloy-o18n0l/30min`
- **⚠️ Verify:** The `calLink` in `App.jsx` may need updating if organization slug changed

---

## Architecture (How it Should Work)

```
┌──────────────┐     BOOKING_CREATED      ┌────────────────────┐
│   Cal.com    │ ──── webhook POST ──────► │  Vercel Function   │
│  (embedded)  │                           │ /api/webhook/calcom│
└──────────────┘                           └────────┬───────────┘
                                                    │
                                           Maps attendee data
                                                    │
                                                    ▼
                                           ┌────────────────────┐
                                           │   GoHighLevel      │
                                           │  Inbound Webhook   │
                                           │  (Workflow trigger) │
                                           └────────┬───────────┘
                                                    │
                                           Workflow actions:
                                           - Create Contact
                                           - (tag, notify, etc.)
                                                    │
                                                    ▼
                                           ┌────────────────────┐
                                           │   GHL Contact      │
                                           │   Created/Updated  │
                                           └────────────────────┘
```

### Alternative (Simpler) Approach
Instead of using a Vercel middleman function, Cal.com can send webhooks **directly** to GHL's Inbound Webhook URL. This eliminates the need for:
- A Vercel serverless function
- Vercel environment variables
- Extra deployment/hosting

However, the Vercel approach gives more control over:
- Field mapping (Cal.com → GHL format)
- Logging/debugging
- Signature verification
- Additional logic (deduplication, enrichment, etc.)

---

## Quick Reference

| Item | Value |
|------|-------|
| GHL Account | Philipp Udaloy's Account |
| GHL Preview URL | `https://app.gohighlevel.com/v2/preview/1c12HSiODUN8NCl722fF` |
| Cal.com Username | `philipp-udaloy` (org: `o18n0l`) |
| Cal.com Event Types | Secret (15m, hidden), 30min, 15min |
| Vercel Function | `api/webhook/calcom.js` |
| Vercel Endpoint | `POST https://<your-domain>/api/webhook/calcom` |
| GHL Workflow | `New Workflow : 1772417998941` (Draft) |
| GHL Webhook URL | `https://services.leadconnectorhq.com/hooks/AHQ8vBeqLeVYJOZV8qxm/webhook-trigger/a35dbb9a-c182-4dd2-9417-a7ed34...` (verify full URL) |

---

## Next Session Checklist

1. [ ] **Verify GHL Webhook URL** – Go to GHL → Automation → Workflows → open the webhook workflow → copy the full URL
2. [ ] **Add GHL Workflow Actions** – Add a "Create/Update Contact" action after the Inbound Webhook trigger
3. [ ] **Publish GHL Workflow** – Toggle Draft → Publish
4. [ ] **Set Vercel Env Vars** – Add `GHL_WEBHOOK_URL` in Vercel Dashboard → Settings → Environment Variables
5. [ ] **Deploy Vercel Function** – `vercel deploy` or push to deploy
6. [ ] **Create Cal.com Webhook** – In Cal.com → Settings → Developer → Webhooks (or per-event-type) → New webhook:
   - Subscriber URL: `https://<your-vercel-domain>/api/webhook/calcom`
   - Event: `BOOKING_CREATED`
   - (Optional) Set a secret for signature verification
7. [ ] **Verify Cal.com Embed Path** – Confirm `calLink` in `App.jsx` matches the actual Cal.com event slug
8. [ ] **Test End-to-End** – Make a test booking and verify contact appears in GHL
