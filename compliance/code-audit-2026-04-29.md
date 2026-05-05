# MetaOrtho Code Audit

## Summary

MetaOrtho's pre-launch posture is solid for a marketing site: server-only Supabase service-role usage is correctly isolated, RLS policies are restrictive, the `/api/waitlist` route validates input, an in-memory rate limiter is in place, the cookie-gated SITE_PASSWORD is httpOnly + secure-in-prod, and analytics are properly route-and-consent-gated. The biggest concrete defects are (1) most `WaitlistCTA`-driven submissions silently fail server-side validation because their `source` values aren't in the API's allow-list, (2) the `/login` redirect parameter is an open redirect, and (3) the SITE_PASSWORD itself is stored verbatim in the auth cookie. There is also a hardcoded user PII string in the portal sidebar and several `/quiz` links in transactional emails that 404. **Counts: 3 CRITICAL, 7 HIGH, 9 MEDIUM, 10 LOW.**

## CRITICAL [3 findings]

### CRIT-1. `/login` open redirect via `?redirect=` parameter
- **File:** `app/login/page.tsx:13` and `app/login/page.tsx:24`
- **Issue:** `redirect = searchParams.get("redirect") || "/"` is passed straight into `router.push(redirect)` after a successful password POST. There is no allow-list, no `startsWith("/")` check, and no host validation. `proxy.ts:41` itself only sets the redirect to a `pathname`, but the URL is still attacker-controllable when phished — `https://metaortho.com/login?redirect=https://evil.com/looks-like-portal` will full-navigate to `evil.com` immediately after the visitor enters the real site password.
- **Risk:** Phishing platform. Anyone who has the SITE_PASSWORD becomes a high-trust phishing target: they think they're authenticating into the legitimate site, then get bounced to attacker-controlled HTML, where the attacker can stage a fake patient-portal login. Also makes the SITE_PASSWORD page a useful "open-redirector under metaortho.com" for attacks against unrelated targets.
- **Fix:** Reject anything that doesn't start with `/` and doesn't start with `//` (protocol-relative). Concretely:
  ```ts
  const raw = searchParams.get("redirect") || "/";
  const safe = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
  // ... router.push(safe)
  ```

### CRIT-2. Site password stored verbatim as the auth cookie value
- **File:** `app/api/login/route.ts:12-18`
- **Issue:** `response.cookies.set("site-auth", sitePassword, ...)` stores the raw `SITE_PASSWORD` value in the cookie, and `proxy.ts:34` validates with `authCookie?.value === SITE_PASSWORD`. The cookie is httpOnly and `secure` in prod, but its value IS the secret. Any log line that captures cookies (Vercel edge logs, error reporters, browser exports), any unencrypted transit during dev, or any future change that drops `httpOnly` accidentally exposes the password directly.
- **Risk:** Single-secret blast radius. If the cookie is ever disclosed by any one host the user touches (logs, dev proxies, error tooling), the SITE_PASSWORD is leaked, and it's a single shared global value across all visitors. Rotating the password also invalidates everyone's cookie at once with no graceful path.
- **Fix:** Store an opaque token instead of the password. Set the cookie to a random value (`crypto.randomUUID()`) and validate it against a server-side comparison with `SITE_PASSWORD` only at login time. Or sign a short payload with HMAC and verify the signature in `proxy.ts`. At minimum, switch the equality check to `crypto.timingSafeEqual` to defeat timing oracles.

### CRIT-3. `WaitlistCTA` modal submissions fail server-side validation for most launch surfaces
- **File:** `app/api/waitlist/route.ts:38-47` (allow-list) vs. `components/waitlist/WaitlistModal.tsx:93` and ~10 callers
- **Issue:** `ALLOWED_COMPONENTS` only accepts `hero | hero-primary | inline | sticky_footer | modal | final-cta | landing-slide-3 | book-page`. Almost every `WaitlistCTA` in the codebase passes a `source` prop that isn't in that set: `navbar`, `navbar-mobile`, `footer`, `mobile-cta`, `state-gate`, `supplements`, `portal-preview`, `is-this-you`, `about-bottom`, `pricing-bottom`. The modal forwards `opts.source` to `source_component`, so submissions from any of those CTAs hit `app/api/waitlist/route.ts:111` and get a 400 "Invalid form source." response. Affected callers:
  - `components/layout/Navbar.tsx:76` (`navbar`)
  - `components/layout/Navbar.tsx:127` (`navbar-mobile`)
  - `components/layout/Footer.tsx:39` (`footer`)
  - `components/layout/MobileCTA.tsx:28` (`mobile-cta`)
  - `components/intake/StateGate.tsx:57` (`state-gate`)
  - `components/home/Supplements.tsx:83` (`supplements`)
  - `components/home/PortalPreview.tsx:449` (`portal-preview`)
  - `components/home/IsThisYou.tsx:189` (`is-this-you`)
  - `app/about/AboutContent.tsx:199` (`about-bottom`)
  - `app/pricing/PricingContent.tsx:351` (`pricing-bottom`)
- **Risk:** Direct revenue/acquisition impact at launch. The two most-trafficked CTAs (navbar + footer) plus the state-gate "we're not in your state" recovery flow all silently 400 from the user's perspective. They see "Invalid form source." with no path forward. This is the entire point of the pre-launch site.
- **Fix:** Either (a) add the missing values to `ALLOWED_COMPONENTS` (cheapest, safest right now), or (b) drop the strict allow-list and instead validate `component.length <= 64` and `/^[a-z0-9_-]+$/` so the field is just a low-cardinality analytics tag. Option (a) recommended for traceability.

## HIGH [7 findings]

### HIGH-1. Hardcoded patient PII (`jaysaenz99@yahoo.com`) shipped in portal client bundle
- **File:** `components/portal/Sidebar.tsx:122`
- **Issue:** The sidebar prints `jaysaenz99@yahoo.com` as the "user email" placeholder. This is a real personal email belonging to the practice's medical director, and it's being shipped in the static client bundle to anyone who hits `/portal/*` (which is currently behind the SITE_PASSWORD gate, but the gate is being lifted soon, and the LegitScript reviewer will see this email regardless).
- **Risk:** Personal-mailbox exposure at scale once the gate lifts; spammers and credential-stuffing scrapers will pick it up. Also a HIPAA optics issue: the demo portal looks like a real patient view with the medical director's personal address attached.
- **Fix:** Replace with a clearly synthetic placeholder, e.g. `demo.patient@metaortho.com` or read from a `portal-user` localStorage value the prototype already sets in `app/portal/login/page.tsx:29`.

### HIGH-2. `/quiz` route is referenced from every welcome email but does not exist
- **File:** `lib/emails/welcome.ts:130`, `lib/emails/welcome-series-1.ts:137`, `lib/emails/welcome-series-2.ts:139`, `lib/emails/customer-io/03-why-metaortho.html:65`
- **Issue:** Each of the three transactional welcome emails (E1, E2 immediate, E2 +2d, E3 +4d) renders a CTA to `${site}/quiz`. There is no `app/quiz/` route — the closest equivalent is `/assessment`. Every recipient who clicks the "free 5-minute risk quiz" link gets a 404 from the same brand that just promised them clinical care.
- **Risk:** Every signup gets at least one broken-promise touch in their first week. Erodes trust at the worst moment, and the link is in 4 places per recipient.
- **Fix:** Either add a redirect (`next.config.ts` rewrite `/quiz` → `/assessment`) or replace the URL constant in those four files with `${site}/assessment`. The redirect is safer because it future-proofs any external link.

### HIGH-3. Portal pages flash unauthenticated content before client-side gate kicks in
- **File:** `components/portal/PortalShell.tsx:42-55`
- **Issue:** `PortalShell` uses `useEffect` to check `localStorage.portal-auth === "1"` and redirect to `/portal/login`. Server-side rendering and the first client paint render the gated children before the effect runs. Any robot, link preview, or screenshot of an unauthenticated visit captures the full dashboard contents.
- **Risk:** PHI-shaped content (MSK score 82, lab status, "Dr. Saenz" + appointment date, etc.) is leaked to crawlers, link previews, and the LegitScript reviewer's first request before redirect. Combined with HIGH-1, the unauth view also shows the medical director's personal email.
- **Fix:** Render a blank loading state until `ready === true`. Today the code does set `ready = false` initially (`useState(false)`) BUT the `if (!ready) return <Loading />` only fires for non-login routes — verify the logic actually returns the loading view *before* rendering `children` on the very first paint. Cleanest long-term: gate at the `proxy.ts` level on a real session cookie.

### HIGH-4. `renderCta` / `renderPortrait` inject HTML attributes without escaping
- **File:** `lib/emails/template.ts:124` (CTA), `lib/emails/template.ts:215` (portrait)
- **Issue:** `renderCta` interpolates `opts.href` and `opts.label` directly into HTML (`<a href="${opts.href}" style="...">${opts.label}</a>`); `renderPortrait` does the same with `opts.src`. `renderEmail`'s `unsubUrl` is also injected raw into the footer link (line 314-315). Today the only callers pass static literals, but anything that ever renders a per-recipient URL (the unsubscribe URL is generated from the user's email at `app/api/waitlist/route.ts:67-70` and then flows into `welcomeEmailHtml(...)`) reaches an interpolation point with no `escapeHtml`.
- **Risk:** Email HTML injection. The unsubscribe URL is already a per-recipient value — `unsubscribeUrl(email)` `encodeURIComponent`s the email, which makes URL injection unlikely, but a future caller that passes an unescaped subject, label, or attribute would inject HTML or break out of the `style` attribute. The pattern is fragile.
- **Fix:** Always run user-derived inputs through `escapeHtml` (or for URLs, validate they start with `https://` and have no quote/angle characters). For `renderCta`: `<a href="${escapeHtml(opts.href)}" style="${styles.ctaLink}">${opts.label}</a>` (`label` is hardcoded today; if it ever becomes dynamic, escape it too).

### HIGH-5. `WaitlistForm` "inline" / "hero" / "sticky_footer" `Status` shadowed by local variable
- **File:** `components/WaitlistForm.tsx:155`
- **Issue:** `const Status = ( … )` shadows the type `Status` declared at line 28 (`type Status = "idle" | "loading" | "success" | "error"`). It compiles only because TS treats them as different namespaces. This is a footgun — anyone editing this file who tries to use `Status` as a type after the `const` declaration will get the JSX node instead.
- **Risk:** Maintenance footgun. Subtle next-developer trap, will produce confusing type errors. Also harder to read.
- **Fix:** Rename the JSX const to `StatusNode` (or hoist it into a sub-component), keep the `Status` type intact.

### HIGH-6. Race: scheduled-email IDs are written to Supabase only after both Resend schedule calls return
- **File:** `app/api/waitlist/route.ts:227-282`
- **Issue:** The route awaits `resend.emails.send({...scheduledAt: "in 2 days"})` then `await ... "in 4 days"`, then writes both IDs in a single `UPDATE`. If the user opts out via the unsubscribe one-click in the immediate welcome email (E1) before the +2d/+4d sends are scheduled, `cancelScheduledWelcomeSeries` reads `null` IDs from Supabase and the +2d/+4d emails go out anyway. There is no idempotency guard between scheduling and persisting.
- **Risk:** Welcome emails delivered after the user unsubscribed. CAN-SPAM violation potential and a real annoyance.
- **Fix:** Persist the ID immediately after each successful schedule call, not in a single trailing UPDATE. Two sequential `update().eq("email", email)` calls — or, better, an upsert keyed on email — close the window.

### HIGH-7. Unsubscribe `POST` and `GET` handlers are unauthenticated and rate-unlimited
- **File:** `app/api/waitlist/unsubscribe/route.ts:198-279`
- **Issue:** Anyone can hit `GET /api/waitlist/unsubscribe?email=victim@x.com` (or POST with form body) repeatedly and force unsubscribe of any email in the system. There's no token, no signature, no rate-limit, and the handler dutifully runs `update().eq("email", ...)` on Supabase, calls Resend `contacts.update`, calls Customer.io PUT with `subscribed: false`, and cancels the scheduled E2/E3 sends.
- **Risk:** Easy denial-of-marketing: a bot that walks the waitlist (which is small at MVP) or that just guesses common email addresses can unsubscribe arbitrary users. Not a privacy leak (the function returns success regardless to avoid revealing membership), but it permanently removes signups from the welcome series. Also rate-limit-bypass: the regular waitlist POST is rate-limited; unsubscribe isn't.
- **Fix:** Sign the unsubscribe URL with an HMAC over `email`, e.g. `?email=...&t=<hmac>`. The link in transactional emails embeds the `t`; the route rejects anything without a valid signature. Keep the GET handler renderable for the user-clicks case; just refuse without the signature. Also add the same per-IP rate-limit used by the signup route.

## MEDIUM [9 findings]

### MED-1. Rate limiter is per-process and resets on every cold start
- **File:** `lib/rate-limit.ts:9-49`
- **Issue:** Documented as MVP-only. On Vercel each serverless instance has its own `Map`, so an attacker rotating to fresh instances bypasses the 5/min/IP limit.
- **Fix:** Migrate to Upstash Redis when traffic warrants. Also currently the limiter increments before checking the limit on first hit (`bucket.count = 1` initially returns ok), which is correct, but `LIMIT = 5` is generous for an email signup form — consider 3.

### MED-2. `NEXT_PUBLIC_SUPABASE_URL` is read by the *server-only* service-role client
- **File:** `lib/supabase/server.ts:17`
- **Issue:** `getSupabaseServiceClient` reads `process.env.NEXT_PUBLIC_SUPABASE_URL`. That works (server can read public envs), but the naming suggests it's safe to leak — it is, for the URL — but the indirection couples the server code to a client-tier env var. If someone ever swaps the public URL for a different Supabase project, the service-role client points at the wrong DB.
- **Fix:** Read from a server-only `SUPABASE_URL` env (with `NEXT_PUBLIC_SUPABASE_URL` as fallback for now). Less surprising, and it lets you set different Supabase projects per environment cleanly.

### MED-3. `proxy.ts` matcher and skip-list disagree
- **File:** `proxy.ts:22-30` and `proxy.ts:46`
- **Issue:** `config.matcher` excludes `_next/static`, `_next/image`, and `favicon.ico`. The function body adds skips for `_next` (any path), `/api`, `/login`, `/images`, `/favicon.ico`. The `/api` skip is intentional but the matcher doesn't exclude it, so the function runs on every API request just to no-op. Minor performance, but more importantly: the matcher ALSO doesn't exclude `/_next/data` (RSC payloads), which means RSC navigations on a non-authed visitor will redirect to `/login` and break in-app navigation if the password gate is ever turned off mid-session.
- **Fix:** Align the matcher and the skip-list. Either let the matcher do all the exclusion (preferred), or document why the function double-checks. At minimum, exclude `/api` from the matcher.

### MED-4. `parseUtmsFromUrl` accepts arbitrary URL strings without origin check
- **File:** `lib/utm.ts:32-44`
- **Issue:** The function accepts the `Referer` header as-is and parses it. The header is attacker-controlled. No actual injection (values are stored as text and capped at 256 chars), but the assumption that this is a "real referer from our site" is false — bots can supply any string they like.
- **Risk:** Garbage UTM data in Supabase. Not a security issue, but it'll dirty Customer.io segmentation forever.
- **Fix:** Optionally validate `new URL(referer).hostname === "metaortho.com"` (or `endsWith(".metaortho.com")`) before extracting UTMs. Drop foreign-host UTMs.

### MED-5. `app/portal/login/page.tsx` "any password works" prototype is publicly reachable
- **File:** `app/portal/login/page.tsx:27-32`
- **Issue:** The page has a `<div>Prototype · Any email and password will work</div>` banner at line 64-66, sets `localStorage.portal-auth = "1"` on any input, and pushes to `/portal`. With the SITE_PASSWORD gate this is obscured, but the gate is the same shared password, and the moment that gate lifts (after launch), this becomes the actual portal login URL — and the prototype banner reveals it to attackers. Combined with HIGH-3 it's a very small step from "anyone can browse the demo dashboard with the medical director's personal email visible."
- **Fix:** Before lifting SITE_PASSWORD, swap this prototype for a real Supabase auth flow; or, at minimum, add a deploy-time guard that returns 404 in production until the real auth ships. This is already noted as deferred in `compliance/remediation-2026-04-29.md` (R-1, L-1).

### MED-6. `WAITLIST_MAILING_ADDR` falls back to a literal `"[Mailing address placeholder]"` in transactional emails
- **File:** `lib/emails/welcome.ts:53`, `lib/emails/welcome-series-1.ts:48`, `lib/emails/welcome-series-2.ts:51`, `lib/emails/template.ts:298`
- **Issue:** If the env var isn't set in production, every transactional email is sent without a CAN-SPAM-compliant physical address. The fallback string is visible to recipients but is clearly placeholder copy.
- **Risk:** CAN-SPAM violation if env var is omitted in any environment.
- **Fix:** Treat a missing `WAITLIST_MAILING_ADDR` as a hard fail at boot. Don't ship without it. The footer in `components/layout/Footer.tsx:55-57` already hardcodes the address; consider centralizing it.

### MED-7. `/portal/care-team` and `/portal/body` not audited for client-side data
- **File:** `app/portal/care-team/page.tsx`, `app/portal/body/page.tsx`, `app/portal/protocol/page.tsx`
- **Issue:** Not opened in this audit, but flagged as potentially containing realistic-looking PHI mock data that ships in the client bundle (consistent with the dashboard at `app/portal/page.tsx`). The remediation doc itself notes "Pre-launch acceptable; flagged to replace before any real patient sees the portal."
- **Fix:** Confirm there's nothing patient-identifying or insurer-identifying in those mock data sets before LegitScript review. Specifically check for real names, real DOBs, real insurance details, real phone numbers — needs runtime verification.

### MED-8. `NEXT_PUBLIC_SITE_URL` fallback leaks production URL to non-prod environments
- **File:** Many — every email template + `app/api/waitlist/route.ts:68`
- **Issue:** The fallback is `"https://metaortho.com"`. If `NEXT_PUBLIC_SITE_URL` isn't set in a preview/staging environment, every link in the welcome email + the unsubscribe URL points to production. Triggering an unsubscribe from a preview deploy would silently unsubscribe the real user in prod.
- **Fix:** Either fail fast when `NEXT_PUBLIC_SITE_URL` is missing in non-development, or read `process.env.VERCEL_URL` / `VERCEL_PROJECT_PRODUCTION_URL` as a smarter fallback.

### MED-9. Edge function does not verify Supabase webhook signature
- **File:** `supabase/functions/waitlist-notify/index.ts:55-65`
- **Issue:** `Deno.serve` accepts any POST. There's no check that the request actually came from Supabase's database webhook system. The function URL is publicly reachable. Anyone who guesses or scrapes the URL can forge a Slack notification ("New MetaOrtho waitlist signup: phishing@evil.com"), and the function will dutifully call `count` against your DB and post to Slack.
- **Risk:** Slack channel spam; minor reputational risk; the count-query also lets the attacker probe whether the function and DB are wired up.
- **Fix:** Supabase database webhooks support a signing secret. Set one in `Database → Webhooks`, then verify the `X-Webhook-Signature` header (or whichever Supabase exposes) at the top of the handler, returning 401 on mismatch.

## LOW [10 findings]

- `app/login/page.tsx:24-25` — `router.push(redirect); router.refresh()` — the refresh is redundant after push, and during the brief race the user sees a stale page.
- `app/api/login/route.ts:7` — `password !== sitePassword` is not constant-time. Single-secret gate makes timing attack very low impact, but using `crypto.timingSafeEqual` is one-liner and removes the class.
- `lib/emails/welcome.ts:127`, `welcome-series-1.ts:134`, `welcome-series-2.ts:136` — the same `// TODO: confirm URL` comment is duplicated across three files. Centralize the assessment URL into one constant.
- `lib/emails/template.ts:306` — `// TODO: confirm /privacy page exists` — this works only because of the 301 redirect in `next.config.ts`. Update the URL to the canonical `/legal/privacy-policy` and remove the redirect dependency.
- `components/Analytics.tsx:13` — `BLOCKED_PREFIXES` includes `/login` but not `/portal/login`. The portal login page would still get gtag if a visitor with marketing consent reached it directly — the parent `/portal` prefix is in the list, so this is actually fine, but worth a comment.
- `components/portal/Sidebar.tsx:115` — Avatar initials are hardcoded `"JS"` and the user's display name is hardcoded `"Jay Saenz"`. Same shipping-PII pattern as HIGH-1 but lower severity since these aren't unique identifiers.
- `app/api/waitlist/route.ts:73-65` — `getClientIp` reads only the first IP from `x-forwarded-for`. On Vercel that's the visitor's IP, but a misconfigured proxy in front would let an attacker spoof the IP and bypass the rate limiter (LIMIT=5/min/IP). Consider also hashing the IP before logging — currently it's stored verbatim in the `ip_address` column, which is PII for some jurisdictions.
- `app/api/waitlist/route.ts:155` — Status is set to `'pending'` on insert; the migration's CHECK constraint allows `pending|confirmed|unsubscribed|bounced`, but there is no flow that ever sets status to `'confirmed'`. Either drop the state machine or add a confirmation step.
- `components/layout/Footer.tsx:66` — Phone number is `[pending]`. Already documented as a known placeholder in remediation; mentioned here so it doesn't get forgotten.
- `app/blog/[slug]/page.tsx:117-123` — Markdown-ish renderer uses regex replace + `dangerouslySetInnerHTML`. Content comes from `content/blog/*.ts` (statically imported), so XSS risk is internal-only, but if blog content ever moves to a CMS this becomes a sink. Worth a comment in the code.

## Notable patterns / things done well

- **Service-role isolation is correct.** `lib/supabase/server.ts` is the only place the service role key is read, it's clearly documented as server-only, and RLS in `0001_waitlist.sql` denies anon/authenticated explicitly. Good belt-and-suspenders.
- **Analytics gating is principled.** `components/Analytics.tsx` blocks gtag both by route prefix (portal, login, assessment, api) AND by consent state, plus listens for the consent-changed event for live updates. This is the right HHS-OCR posture for HIPAA.
- **Unsubscribe is wired across all three downstream systems.** `cancelScheduledWelcomeSeries` + Supabase + Resend + Customer.io are all hit via `Promise.allSettled`, the route always returns success to avoid leaking membership, and List-Unsubscribe-Post is correctly implemented for RFC 8058 one-click. The mechanism just needs the HMAC signing fix from HIGH-7.
- **Migration discipline.** SQL migrations are idempotent (`if not exists`, `drop policy if exists`), commented for Supabase Studio, and explicitly enable RLS with named deny policies for visibility.
- **Email template hygiene.** `lib/emails/template.ts` has a real `escapeHtml` function and uses it on the recipient email and the alt text in the portrait. Most user-derived content flows through it already; HIGH-4 is about a handful of attribute-level interpolations that don't.
