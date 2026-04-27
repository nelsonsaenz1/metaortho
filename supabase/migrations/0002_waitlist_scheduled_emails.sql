-- ============================================================================
-- Track scheduled welcome-series email IDs.
--
-- E1 fires immediately on signup. E2 (+2 days) and E3 (+4 days) are scheduled
-- via the Resend `scheduledAt` parameter. Resend returns an ID for each
-- scheduled send; we store those IDs here so the /api/waitlist/unsubscribe
-- route can cancel pending sends when a user opts out.
--
-- Both columns are nullable: if Resend scheduling fails (best-effort), the
-- signup is still recorded with the columns left as NULL.
-- ============================================================================

alter table public.waitlist
    add column if not exists scheduled_e2_id text,
    add column if not exists scheduled_e3_id text;

comment on column public.waitlist.scheduled_e2_id is
    'Resend email ID for the scheduled E2 welcome-series send (+2 days). Used to cancel on unsubscribe.';
comment on column public.waitlist.scheduled_e3_id is
    'Resend email ID for the scheduled E3 welcome-series send (+4 days). Used to cancel on unsubscribe.';
