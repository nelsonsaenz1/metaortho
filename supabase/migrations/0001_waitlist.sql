-- ============================================================================
-- MetaOrtho waitlist table
--
-- Applies the schema, RLS, and indexes for the production waitlist collection
-- system. Run this once per Supabase project.
--
-- To apply:
--   Option 1 (CLI):  supabase db push
--   Option 2 (Studio): Paste into the SQL Editor and click Run
-- ============================================================================

-- Ensure pgcrypto is available for gen_random_uuid().
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Table
-- ----------------------------------------------------------------------------
create table if not exists public.waitlist (
    id                  uuid primary key default gen_random_uuid(),
    email               text not null unique,
    created_at          timestamptz not null default now(),

    -- Attribution
    source_page         text,
    source_component    text,
    utm_source          text,
    utm_medium          text,
    utm_campaign        text,
    utm_content         text,
    utm_term            text,

    -- Consent
    consent_marketing   boolean not null default true,
    consent_timestamp   timestamptz,

    -- Metadata
    ip_address          text,
    user_agent          text,

    -- Lifecycle
    status              text not null default 'pending'
                        check (status in ('pending','confirmed','unsubscribed','bounced')),

    -- Ops
    tags                text[] not null default '{}',
    notes               text
);

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------
create index if not exists waitlist_email_idx        on public.waitlist (lower(email));
create index if not exists waitlist_created_at_idx   on public.waitlist (created_at desc);
create index if not exists waitlist_source_page_idx  on public.waitlist (source_page);
create index if not exists waitlist_utm_source_idx   on public.waitlist (utm_source);

-- ----------------------------------------------------------------------------
-- Row Level Security
--
-- Only the service_role may read or write. The anon and authenticated roles
-- have no access. All inserts happen through our server-side API route using
-- the service role key (never exposed to the browser).
-- ----------------------------------------------------------------------------
alter table public.waitlist enable row level security;

-- Drop any prior policies so this migration is idempotent
drop policy if exists "service_role full access" on public.waitlist;
drop policy if exists "deny anon"                 on public.waitlist;
drop policy if exists "deny authenticated"        on public.waitlist;

create policy "service_role full access"
    on public.waitlist
    for all
    to service_role
    using (true)
    with check (true);

-- Explicit deny-all for anon + authenticated is unnecessary because RLS
-- blocks by default once enabled, but we add named no-op policies for
-- visibility in the Supabase Studio policy editor.
create policy "deny anon"
    on public.waitlist
    for all
    to anon
    using (false)
    with check (false);

create policy "deny authenticated"
    on public.waitlist
    for all
    to authenticated
    using (false)
    with check (false);

-- ----------------------------------------------------------------------------
-- Comments (helpful in Studio)
-- ----------------------------------------------------------------------------
comment on table  public.waitlist                   is 'MetaOrtho waitlist signups (public.metaortho.org).';
comment on column public.waitlist.status            is 'pending | confirmed | unsubscribed | bounced';
comment on column public.waitlist.source_component  is 'hero | inline | sticky_footer';
comment on column public.waitlist.consent_marketing is 'User opted in to marketing emails.';
comment on column public.waitlist.consent_timestamp is 'Time at which the opt-in checkbox was ticked and the form submitted.';
