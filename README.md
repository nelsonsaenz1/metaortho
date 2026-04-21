# MetaOrtho

Physician-led telehealth practice for GLP-1 musculoskeletal care.
Next.js 16 (App Router) + Tailwind 4 + Framer Motion. Deploys to Vercel.

---

## Quick start

```bash
# install
npm install

# local env (first time only)
cp .env.example .env.local    # then fill in real keys

# dev server
npm run dev
```

Visit http://localhost:3000.

---

## Project structure (high level)

```
app/
  page.tsx            3-slide landing (marketing entry)
  home/               Full homepage
  portal/             Patient portal (login + dashboard + protocol + body + care team)
  api/waitlist/       POST endpoint for waitlist signups
components/
  home/               Homepage sections
  layout/             Navbar, Footer, MobileCTA, CookieConsent
  portal/             Portal shell, sidebar, mobile nav
  WaitlistForm.tsx    Hero / inline / sticky-footer variants
  WaitlistStickyFooter.tsx  Site-wide dismissible bar
lib/
  supabase/server.ts  Service-role client (server-only writes)
  rate-limit.ts       In-memory per-IP limiter
  utm.ts              UTM parsing from Referer
  emails/welcome.ts   Waitlist welcome email template
utils/supabase/       @supabase/ssr helpers (future patient auth)
supabase/
  migrations/         SQL migrations (waitlist table + RLS + indexes)
  functions/          Edge functions (waitlist-notify for Slack)
```

---

## Environment variables

See [`.env.example`](.env.example) for the full list. Copy to `.env.local` and fill in.

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | Project URL, e.g. `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Anon key; RLS enforces access |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Bypasses RLS. Never expose to the browser. |
| `RESEND_API_KEY` | server only | Resend API key for welcome emails |
| `WAITLIST_FROM_EMAIL` | server | e.g. `hello@metaortho.com` (must be on verified domain) |
| `WAITLIST_FROM_NAME` | server | e.g. `Dr. Nelson Saenz` |
| `WAITLIST_MAILING_ADDR` | server | Physical address (CAN-SPAM) |
| `SLACK_WEBHOOK_URL` | Supabase Edge Function env | Slack incoming webhook URL |
| `NEXT_PUBLIC_SITE_URL` | public | e.g. `https://metaortho.com` |

On Vercel, set these in **Project Settings → Environment Variables** for **Production** and (with test values) **Preview**.

---

## Waitlist system — first-time setup

Five external systems need to be configured before the waitlist is fully operational:

### 1. Supabase: create the `waitlist` table

Open the Supabase SQL editor at
`https://supabase.com/dashboard/project/<project-ref>/sql/new`
and paste the contents of `supabase/migrations/0001_waitlist.sql`, then click **Run**.

This creates the table, indexes, and Row Level Security policies. Only the service role can read/write.

### 2. Resend: verify the metaortho.com domain

1. Sign in at https://resend.com.
2. **Domains → Add Domain → metaortho.com**.
3. Resend shows DNS records to add. They'll look roughly like:

   | Type | Host | Value |
   |---|---|---|
   | MX | `send` | `feedback-smtp.us-east-1.amazonses.com` (priority 10) |
   | TXT | `send` | `"v=spf1 include:amazonses.com ~all"` |
   | TXT | `resend._domainkey` | `p=MIGfMA0G...` (long DKIM string Resend gives you) |
   | TXT | `_dmarc` | `"v=DMARC1; p=none;"` |

   **The exact values come from Resend's UI — use those, not the table above.**

4. Add each record at your DNS host (wherever you manage `metaortho.com`).
5. Click **Verify** in Resend. Propagation is usually minutes; can take up to 24h.
6. Once the domain is green, create an API key at **API Keys → Create API Key** and paste into `RESEND_API_KEY`.

### 3. Slack: create an incoming webhook

1. Go to https://api.slack.com/apps → **Create New App → From scratch**.
2. Name it (e.g. "MetaOrtho signups"). Pick the workspace.
3. **Features → Incoming Webhooks → Activate**, then **Add New Webhook to Workspace**, and pick the channel.
4. Copy the webhook URL.

### 4. Supabase Edge Function: deploy and configure the webhook

```bash
# one-time
supabase login
supabase link --project-ref <project-ref>

# deploy the function
supabase functions deploy waitlist-notify

# set the Slack URL in the function's env
supabase secrets set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
```

Then in Supabase Studio:

1. **Database → Webhooks → Create a new webhook**
2. Name: `waitlist-notify`
3. Table: `public.waitlist`
4. Events: `Insert`
5. Type: `HTTP Request` → `POST`
6. URL: `https://<project-ref>.supabase.co/functions/v1/waitlist-notify`
7. HTTP Headers: `Authorization: Bearer <SERVICE_ROLE_KEY>`
8. **Create webhook**

Test it: insert a fake row in the Supabase table editor; a Slack message should land within a couple of seconds.

**Local development of the function**:

```bash
supabase functions serve waitlist-notify --env-file .env.local
```

### 5. Vercel: set production env vars

Paste all variables from `.env.local` into **Vercel → Project Settings → Environment Variables** (Production). Redeploy.

---

## Deliverables checklist

- [x] Supabase `waitlist` table + RLS + indexes → `supabase/migrations/0001_waitlist.sql`
- [x] `/api/waitlist` endpoint with validation, dedup, rate limiting
- [x] `<WaitlistForm />` with three variants (`hero`, `inline`, `sticky_footer`)
- [x] Forms embedded on homepage (hero after TheProblem; sticky footer site-wide)
- [x] Resend welcome email (`lib/emails/welcome.ts`)
- [x] DNS documentation in this README
- [x] Supabase Edge Function → Slack (`supabase/functions/waitlist-notify/`)
- [x] `ADMIN_ACCESS.md` with SQL queries
- [x] `.env.example` with every variable documented
- [x] README with setup + deploy instructions

Not built (per spec): custom admin dashboard, drip email sequences.

---

## HIPAA note

The current waitlist captures email, consent, attribution, IP, and user agent only. None of that is PHI under HIPAA.

**Before any form on this site ever collects a health-related field** (symptoms, medications, diagnosis, DEXA result, etc.), verify:

1. Your Supabase project is on the **Pro plan** or higher.
2. You have an executed **Business Associate Agreement (BAA)** with Supabase.
3. You have an executed BAA with **Resend** (or route clinical email through a BAA-covered provider such as Paubox).

Do not collect PHI before confirming the above.

---

## Testing the waitlist end-to-end

From the running dev server:

1. **Homepage hero form** — go to `/home`, scroll past "Is this you?" → submit with a real email.
2. **Sticky footer** — same session, appears at the bottom of any marketing page. Submit or dismiss (dismissal is remembered in `localStorage`).
3. **Inline** — not placed by default; to smoke-test, import `<WaitlistForm variant="inline" />` in any page during dev.
4. Verify:
   - Row appears in `public.waitlist` (Supabase table editor).
   - Welcome email arrives (Resend → Emails).
   - Slack message posts (if webhook configured).
5. **Duplicate handling** — submit the same email twice. First should insert; second should return "You're already on the list."
6. **Rate limit** — submit 6 times in 60 seconds from the same IP. Sixth returns 429.
7. **Invalid email** — `foo@bar`, `not-an-email`, empty → all return 400.

---

## Deploy

Any commit authored by a trusted Vercel team member on `main` triggers a Vercel production deploy. See also: [ADMIN_ACCESS.md](ADMIN_ACCESS.md) for Supabase/Resend dashboards.
