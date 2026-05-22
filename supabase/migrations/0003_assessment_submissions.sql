-- ============================================================================
-- MetaOrtho assessment submissions table
--
-- Stores a structured record of every completed v2 GLP-1 Management Profile
-- assessment: the full response set, the deterministic scoring outputs, contact
-- details, and source attribution. This is the durable lead-capture + clinical
-- pre-consult record for the dual-assessment quiz (separate from public.waitlist,
-- which is untouched).
--
-- Unlike waitlist, email is NOT unique here: a person may take the assessment
-- more than once (see Quiz-Question-Architecture-v2.md §13.6, repeat takers).
--
-- To apply:
--   Option 1 (CLI):  supabase db push
--   Option 2 (Studio): Paste into the SQL Editor and click Run
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Table
-- ----------------------------------------------------------------------------
create table if not exists public.assessment_submissions (
    id                  uuid primary key default gen_random_uuid(),
    created_at          timestamptz not null default now(),

    -- Contact
    email               text not null,
    first_name          text,
    state               text,                 -- 2-letter US state code

    -- Attribution
    source_page         text,
    source_component    text,
    utm_source          text,
    utm_medium          text,
    utm_campaign        text,
    utm_content         text,
    utm_term            text,

    -- Consent
    consent_marketing   boolean not null default false,
    consent_timestamp   timestamptz,

    -- Metadata
    ip_address          text,
    user_agent          text,

    -- Deterministic scoring outputs (denormalized for the 1-1-1 dashboard)
    candidacy           text
                        check (candidacy in
                          ('not_candidate','possible_caveats','candidate','strong_candidate')),
    hard_stop           boolean not null default false,
    complexity_tier     text
                        check (complexity_tier in ('standard','enhanced','high_risk')),
    complexity_score    integer,
    bmi                 numeric(5,1),
    drug_flags          text[] not null default '{}',

    -- Full structured payload + the optional free-text note
    responses           jsonb not null default '{}'::jsonb,
    free_text           text,

    -- Lifecycle / ops
    status              text not null default 'new'
                        check (status in ('new','contacted','booked','archived')),
    tags                text[] not null default '{}',
    notes               text
);

-- ----------------------------------------------------------------------------
-- Indexes — sized for the diagnostic dashboard queries (§14.3)
-- ----------------------------------------------------------------------------
create index if not exists assessment_created_at_idx  on public.assessment_submissions (created_at desc);
create index if not exists assessment_email_idx       on public.assessment_submissions (lower(email));
create index if not exists assessment_candidacy_idx   on public.assessment_submissions (candidacy);
create index if not exists assessment_tier_idx        on public.assessment_submissions (complexity_tier);
create index if not exists assessment_state_idx       on public.assessment_submissions (state);
create index if not exists assessment_utm_source_idx  on public.assessment_submissions (utm_source);

-- ----------------------------------------------------------------------------
-- Row Level Security
--
-- Only the service_role may read or write. The anon and authenticated roles
-- have no access. All inserts happen through the server-side API route using
-- the service role key (never exposed to the browser).
-- ----------------------------------------------------------------------------
alter table public.assessment_submissions enable row level security;

drop policy if exists "service_role full access" on public.assessment_submissions;
drop policy if exists "deny anon"                 on public.assessment_submissions;
drop policy if exists "deny authenticated"        on public.assessment_submissions;

create policy "service_role full access"
    on public.assessment_submissions
    for all
    to service_role
    using (true)
    with check (true);

create policy "deny anon"
    on public.assessment_submissions
    for all
    to anon
    using (false)
    with check (false);

create policy "deny authenticated"
    on public.assessment_submissions
    for all
    to authenticated
    using (false)
    with check (false);

-- ----------------------------------------------------------------------------
-- Comments (helpful in Studio)
-- ----------------------------------------------------------------------------
comment on table  public.assessment_submissions                  is 'Completed GLP-1 Management Profile assessments (v2 dual-assessment quiz).';
comment on column public.assessment_submissions.candidacy        is 'not_candidate | possible_caveats | candidate | strong_candidate';
comment on column public.assessment_submissions.complexity_tier  is 'standard | enhanced | high_risk';
comment on column public.assessment_submissions.drug_flags       is 'Prioritized drug-suitability flag keys (max 3).';
comment on column public.assessment_submissions.responses        is 'Full structured answer set keyed by question id.';
comment on column public.assessment_submissions.status           is 'new | contacted | booked | archived';
