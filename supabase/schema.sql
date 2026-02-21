-- Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  role text default 'user' check (role in ('user', 'admin', 'author'))
);

-- Posts Table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  status text default 'draft' check (status in ('draft', 'pending', 'published')),
  author_id uuid references auth.users on delete set null, -- Nullable for migration
  type text default 'post' check (type in ('post', 'tutorial')),
  published_at timestamptz,
  tags text[]
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- Helper function
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- Policies
create policy "Public profiles are viewable by everyone" on public.profiles for select using ( true );
create policy "Users can update own profile" on public.profiles for update using ( auth.uid() = id );
create policy "Users can insert own profile" on public.profiles for insert with check ( auth.uid() = id );

create policy "Published posts are viewable by everyone" on public.posts for select using ( status = 'published' );
create policy "Authors can view own posts" on public.posts for select using ( auth.uid() = author_id );
create policy "Admins can view all posts" on public.posts for select using ( is_admin() );
create policy "Authenticated users can create posts" on public.posts for insert with check ( auth.role() = 'authenticated' );
create policy "Authors can update own posts" on public.posts for update using ( auth.uid() = author_id );
create policy "Admins can update all posts" on public.posts for update using ( is_admin() );
create policy "Authors can delete own posts" on public.posts for delete using ( auth.uid() = author_id );
create policy "Admins can delete all posts" on public.posts for delete using ( is_admin() );
