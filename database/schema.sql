create extension if not exists "uuid-ossp";

create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique,
  full_name text,
  email text unique not null,
  preferred_language text default 'English',
  created_at timestamptz default now()
);

create table if not exists public.reports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  patient_name text,
  report_date date,
  file_path text,
  raw_text text,
  language text default 'English',
  created_at timestamptz default now()
);

create table if not exists public.extracted_tests (
  id uuid primary key default uuid_generate_v4(),
  report_id uuid references public.reports(id) on delete cascade,
  name text not null,
  value text not null,
  unit text,
  reference_range text,
  status text check (status in ('low', 'normal', 'high', 'unknown')) default 'unknown',
  explanation text,
  created_at timestamptz default now()
);

create table if not exists public.ai_summaries (
  id uuid primary key default uuid_generate_v4(),
  report_id uuid references public.reports(id) on delete cascade,
  summary text not null,
  lifestyle_tips jsonb default '[]'::jsonb,
  disclaimer text not null,
  created_at timestamptz default now()
);

create table if not exists public.chat_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  role text check (role in ('user', 'assistant')) not null,
  content text not null,
  created_at timestamptz default now()
);

create table if not exists public.report_comparisons (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  base_report_id uuid references public.reports(id) on delete cascade,
  comparison_report_id uuid references public.reports(id) on delete cascade,
  insights jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.translations (
  id uuid primary key default uuid_generate_v4(),
  source_text text not null,
  language text not null,
  translated_text text not null,
  created_at timestamptz default now()
);

create table if not exists public.user_settings (
  user_id uuid primary key references public.users(id) on delete cascade,
  language text default 'English',
  notifications_enabled boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete set null,
  action text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

