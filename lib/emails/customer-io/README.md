# Customer.io templates

These four HTML files are the source of truth for MetaOrtho's Customer.io email content. The visual system is a one-to-one port of `lib/emails/template.ts` (the Resend templates) so a customer who receives one channel and then the other sees the same brand.

## Files

| File | What it is |
|---|---|
| `_layout.html` | Shared header + footer + doctype. Paste once into Customer.io → Workspace Settings → Email → Layouts. |
| `01-welcome-youre-in.html` | Onboarding email 1 of 3 — fires on waitlist signup. |
| `02-what-we-measure.html` | Onboarding email 2 of 3 — +2 days. |
| `03-why-metaortho.html` | Onboarding email 3 of 3 — +4 days from signup. |
| `weekly-newsletter.html` | Recurring weekly broadcast. Renders a lead article + 3 secondary articles from `trigger` data. |

## Setup, in order

1. **Create a sending domain** — Customer.io → Workspace Settings → Email → Sending domains → Add `mail.metaortho.com` (subdomain — keeps Resend's `metaortho.com` apex untouched). Add the four DNS records Customer.io shows you (DKIM, SPF, return-path, MX). Wait for green checks.
2. **Set sender identity** — From: `Dr. Jay Saenz <hello@mail.metaortho.com>`. Reply-To: `hello@metaortho.com`. Physical mailing address: same value as `WAITLIST_MAILING_ADDR` in `.env.local`.
3. **Paste the layout** — Workspace Settings → Email → Layouts → New Layout, name `MetaOrtho — Standard`, paste `_layout.html`.
4. **Create the onboarding campaign** — Campaigns → New Campaign → Trigger: "Person added to segment" + segment "Waitlist · subscribed". Three emails:
   - Email 1: paste `01-welcome-youre-in.html`. Subject: `GLP-1 Care: You're in — here's what we'll do together`. Preheader: `The part of GLP-1 weight loss most programs don't protect.` Layout: `MetaOrtho — Standard`. Send delay: immediate.
   - Email 2: paste `02-what-we-measure.html`. Subject: `GLP-1 Care: 4 things the scale won't tell you`. Preheader: `Muscle, bone, joint, nutrition — and why each one matters.` Send delay: 2 days.
   - Email 3: paste `03-why-metaortho.html`. Subject: `GLP-1 Care: Why MetaOrtho exists`. Preheader: `One orthopedic finding. Five years. A growing patient population.` Send delay: 2 days.
5. **Create the newsletter broadcast** — Broadcasts → New Broadcast → Audience: segment "Waitlist · subscribed". Paste `weekly-newsletter.html`. Subject: `GLP-1 Care Weekly · {{ trigger.edition_label }}`. Preheader: `{{ trigger.lead.title }} — and 3 more this week.` Layout: `MetaOrtho — Standard`. Save as a draft template; duplicate it each week, fill the trigger payload, send.

## Liquid variables this template assumes

Provided automatically by Customer.io:
- `{{ customer.email }}` — recipient address
- `{{ output.unsubscribe_url }}` — one-click unsubscribe
- `{{ workspace.address_line }}` — physical address (set in Workspace Settings)

Provided per-broadcast (newsletter only) via the trigger payload:
- `{{ trigger.edition_label }}` — e.g. `Apr 30, 2026`
- `{{ trigger.lead.tag }}` / `.title` / `.summary` / `.url`
- `{{ trigger.articles }}` — array of `{ tag, title, summary, url }`
- `{{ trigger.closing_note }}` — optional one-liner; the section is skipped if empty

## Wiring waitlist signups → Customer.io

The site already writes signups to Supabase (`waitlist` table) via `POST /api/waitlist`. Two integration paths:

- **Path A (recommended for v1):** add a single Customer.io Track API call inside `app/api/waitlist/route.ts` after the Supabase insert succeeds. One HTTP call, no infra. Identifies the person and adds them to the `Waitlist · subscribed` segment in one shot. Onboarding campaign fires automatically.
- **Path B (later):** Supabase webhook → Vercel edge function → Customer.io Track API. More resilient if you start writing to `waitlist` from places other than the API route, but more moving parts.

Either way the Track payload is the same: `identify` with email + signup metadata, then `track` event `waitlist_signed_up`. Segment-by-attribute on `subscribed=true`.

## Compliance notes

- The layout already includes the unsubscribe + physical-address line required by CAN-SPAM. Don't strip them.
- Customer.io appends a List-Unsubscribe header automatically when `{{ output.unsubscribe_url }}` is in the body — gives Gmail/Yahoo one-click unsub.
- `{{ workspace.address_line }}` reads from Workspace Settings → Email → Sender info. Set this before any send.
- For HIPAA: do **not** put PHI (lab values, conditions, dates) in marketing emails. The newsletter is research/education only. Treatment-related communication stays in the Resend transactional channel until we sign a BAA.
