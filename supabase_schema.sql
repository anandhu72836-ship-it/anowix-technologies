
-- Anowix Technologies: starter Supabase schema
create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  role text not null default 'student' check (role in ('student','customer','admin')),
  created_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists service_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references profiles(id),
  service_id uuid references services(id),
  title text not null,
  description text,
  status text not null default 'new'
    check (status in ('new','reviewing','in_progress','completed','cancelled')),
  created_at timestamptz default now()
);

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('internship','webinar','hackathon')),
  description text,
  price numeric(10,2) default 0,
  start_at timestamptz,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  program_id uuid references programs(id) on delete cascade,
  payment_status text not null default 'pending'
    check (payment_status in ('not_required','pending','paid','failed','refunded')),
  registration_status text not null default 'pending'
    check (registration_status in ('pending','confirmed','completed','cancelled')),
  created_at timestamptz default now(),
  unique(user_id, program_id)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid references registrations(id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  amount numeric(10,2) not null,
  currency text not null default 'INR',
  status text not null default 'pending'
    check (status in ('pending','paid','failed','refunded')),
  paid_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid unique references registrations(id) on delete cascade,
  certificate_number text unique not null,
  issued_at timestamptz default now(),
  pdf_path text,
  created_at timestamptz default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'new'
    check (status in ('new','contacted','closed')),
  created_at timestamptz default now()
);

-- Seed service list
insert into services (name, description) values
('Website Development','Responsive business websites and portals.'),
('App Development','Mobile and web applications.'),
('Software Development','Custom software and business systems.'),
('AI / ML Solutions','AI-powered prototypes and automation.'),
('UI / UX Design','Modern and user-friendly interfaces.'),
('Cloud & Deployment','Deployment, hosting and production support.')
on conflict do nothing;
