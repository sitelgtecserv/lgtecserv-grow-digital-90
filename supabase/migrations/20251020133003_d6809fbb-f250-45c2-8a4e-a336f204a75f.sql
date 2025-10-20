-- Criar enum para roles de usuário
create type public.app_role as enum ('admin', 'user');

-- Criar tabela de perfis de usuário
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Habilitar RLS em profiles
alter table public.profiles enable row level security;

-- Políticas RLS para profiles
create policy "Usuários podem ver seu próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuários podem atualizar seu próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Perfis são criados automaticamente no signup"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Criar tabela de roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone default now() not null,
  unique (user_id, role)
);

-- Habilitar RLS em user_roles
alter table public.user_roles enable row level security;

-- Políticas RLS para user_roles (apenas leitura para verificar roles)
create policy "Usuários podem ver seus próprios roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

-- Função para verificar se usuário tem um role específico (SECURITY DEFINER)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Criar tabela de produtos
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price decimal(10,2) not null,
  category text,
  image_url text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  created_by uuid references auth.users(id) on delete set null
);

-- Habilitar RLS em products
alter table public.products enable row level security;

-- Políticas RLS para products
create policy "Produtos são visíveis para usuários autenticados"
  on public.products for select
  to authenticated
  using (true);

create policy "Apenas admins podem criar produtos"
  on public.products for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Apenas admins podem atualizar produtos"
  on public.products for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Apenas admins podem deletar produtos"
  on public.products for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Criar bucket de storage para imagens de produtos
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true);

-- Políticas de storage para product-images
create policy "Imagens de produtos são públicas"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Apenas admins podem fazer upload de imagens"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'product-images' 
    and public.has_role(auth.uid(), 'admin')
  );

create policy "Apenas admins podem deletar imagens"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'product-images' 
    and public.has_role(auth.uid(), 'admin')
  );

-- Função para criar perfil automaticamente no signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  
  -- Atribuir role 'user' por padrão
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  return new;
end;
$$;

-- Trigger para criar perfil automaticamente
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Função para atualizar updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers para updated_at
create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();