-- Etapa 1: Adicionar políticas RLS para proteger a tabela user_roles
-- Bloquear INSERT direto (apenas o trigger handle_new_user pode inserir)
CREATE POLICY "Apenas trigger pode inserir roles"
ON public.user_roles
FOR INSERT
WITH CHECK (false);

-- Apenas admins podem atualizar roles
CREATE POLICY "Apenas admins podem atualizar roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Apenas admins podem deletar roles
CREATE POLICY "Apenas admins podem deletar roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Etapa 2: Promover lgtecserv@gmail.com para admin
-- Primeiro, verificar se o usuário existe e atualizar seu role
UPDATE public.user_roles
SET role = 'admin'::app_role
WHERE user_id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'lgtecserv@gmail.com'
);