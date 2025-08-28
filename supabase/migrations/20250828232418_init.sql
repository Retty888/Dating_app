-- Enable necessary extension
create extension if not exists "pgcrypto";

-- Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamptz default timezone('utc', now()) not null,
  updated_at timestamptz default timezone('utc', now()) not null
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone" on public.profiles
for select using (true);

create policy "Users can insert their own profile" on public.profiles
for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
for update using (auth.uid() = id);

-- Photos table
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  url text not null,
  created_at timestamptz default timezone('utc', now()) not null
);

alter table public.photos enable row level security;

create policy "Photos are viewable by everyone" on public.photos
for select using (true);

create policy "Users can manage own photos" on public.photos
for all using (auth.uid() = user_id);

-- Likes table
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  liker uuid references public.profiles(id) on delete cascade not null,
  liked uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default timezone('utc', now()) not null,
  unique(liker, liked)
);

alter table public.likes enable row level security;

create policy "Users can insert likes for themselves" on public.likes
for insert with check (auth.uid() = liker);

create policy "Users can view likes they are part of" on public.likes
for select using (auth.uid() = liker or auth.uid() = liked);

create policy "Users can delete their likes" on public.likes
for delete using (auth.uid() = liker);

-- Matches table
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  user1 uuid references public.profiles(id) on delete cascade not null,
  user2 uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default timezone('utc', now()) not null,
  unique(user1, user2)
);

alter table public.matches enable row level security;

create policy "Users can view matches they are in" on public.matches
for select using (auth.uid() = user1 or auth.uid() = user2);

create policy "Users can insert matches they are part of" on public.matches
for insert with check (auth.uid() = user1 or auth.uid() = user2);

-- Messages table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade not null,
  sender uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default timezone('utc', now()) not null
);

alter table public.messages enable row level security;

create policy "Users can view messages from their matches" on public.messages
for select using (
  exists (
    select 1 from public.matches m
    where m.id = match_id and (auth.uid() = m.user1 or auth.uid() = m.user2)
  )
);

create policy "Users can send messages to their matches" on public.messages
for insert with check (
  auth.uid() = sender and exists (
    select 1 from public.matches m
    where m.id = match_id and (auth.uid() = m.user1 or auth.uid() = m.user2)
  )
);

-- Enable realtime on messages table
alter publication supabase_realtime add table messages;
