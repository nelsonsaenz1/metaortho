# MetaOrtho waitlist — admin access guide

Until we hit ~200 signups, all waitlist administration happens in **Supabase Studio** and **Resend**. Do not build a custom admin dashboard yet.

---

## 1. Supabase Studio

**Table editor:**
https://supabase.com/dashboard/project/anvaltqtqjpzvjlxpwly/editor

**SQL editor (for the queries below):**
https://supabase.com/dashboard/project/anvaltqtqjpzvjlxpwly/sql/new

**Authentication:**
You must be logged in with an account added to the project. If you lose access, the owner of `nelsonsaenz1@yahoo.com`'s Supabase account can re-add you under Project Settings → Access Control.

### In the Table Editor

1. Open the `waitlist` table in the left sidebar.
2. **Filter**: click the funnel icon to filter by `status`, `source_page`, `utm_source`, etc.
3. **Sort**: click any column header.
4. **Export CSV**: click the three-dot menu (upper right of the table grid) → **Export to CSV**. Exports the currently filtered/sorted view.
5. **Edit a row**: click the cell. Lifecycle field is `status`: `pending | confirmed | unsubscribed | bounced`. Free-text notes go in `notes`.

---

## 2. Resend dashboard

**Main dashboard:**
https://resend.com/emails

What to watch:
- **Sent / Delivered** — successful deliveries
- **Bounced** — invalid addresses; mark the matching Supabase row `status = 'bounced'`
- **Unsubscribed** — see the Unsubscribes tab; mark matching row `status = 'unsubscribed'`
- **Opens / Clicks** — relative engagement

Resend automatically adds an unsubscribe link because we send `List-Unsubscribe` headers from `/api/waitlist`.

---

## 3. SQL snippets for the Supabase SQL editor

Paste any of these into https://supabase.com/dashboard/project/anvaltqtqjpzvjlxpwly/sql/new and click **Run**.

### Total signups
```sql
select count(*) as total from public.waitlist;
```

### Signups in the last 7 days
```sql
select count(*) as last_7_days
from public.waitlist
where created_at >= now() - interval '7 days';
```

### Signups in the last 30 days
```sql
select count(*) as last_30_days
from public.waitlist
where created_at >= now() - interval '30 days';
```

### Conversions by source page (which pages convert best)
```sql
select coalesce(source_page, '(unknown)') as page,
       count(*) as signups
from public.waitlist
group by 1
order by signups desc;
```

### Conversions by channel (which UTM sources convert best)
```sql
select coalesce(utm_source, '(direct)') as channel,
       count(*) as signups,
       min(created_at) as first_signup,
       max(created_at) as last_signup
from public.waitlist
group by 1
order by signups desc;
```

### Conversions by campaign with first/last dates
```sql
select coalesce(utm_campaign, '(no campaign)') as campaign,
       coalesce(utm_source, '(direct)')        as source,
       count(*)                                as signups,
       min(created_at)                         as first_signup,
       max(created_at)                         as last_signup
from public.waitlist
group by 1, 2
order by signups desc;
```

### Daily signup count (for charting)
```sql
select date_trunc('day', created_at) as day,
       count(*) as signups
from public.waitlist
where created_at >= now() - interval '90 days'
group by 1
order by 1;
```

### Export all signups, CSV-friendly
```sql
select email,
       created_at,
       source_page,
       source_component,
       utm_source,
       utm_medium,
       utm_campaign,
       status,
       consent_marketing,
       consent_timestamp
from public.waitlist
order by created_at desc;
```
(In the SQL editor, after the query runs, click **Export** → **CSV**.)

### Find duplicates that slipped through (shouldn't happen; defensive)
```sql
select email, count(*) as n
from public.waitlist
group by 1
having count(*) > 1;
```

### Opt-outs / bounces to clean up
```sql
select email, status, created_at, notes
from public.waitlist
where status in ('unsubscribed', 'bounced')
order by created_at desc;
```

---

## 4. Graduation plan

> We use Supabase Studio until 200+ signups, then graduate to Retool.

Trigger to graduate:
- More than one non-dev person reviewing signups
- Need saved filters, tagging, or drip-list selection that Studio can't do
- Need role-based access (CS vs marketing)

When that happens, point Retool at the same Supabase Postgres, using a service-role connection on a server-side resource so the key never ships to Retool's browser.
