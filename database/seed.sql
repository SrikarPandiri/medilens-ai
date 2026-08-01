insert into public.users (full_name, email, preferred_language)
values ('Demo Patient', 'demo@medilens.ai', 'English')
on conflict (email) do nothing;

