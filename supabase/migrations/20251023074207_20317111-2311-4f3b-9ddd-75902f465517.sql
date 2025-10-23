-- Adicionar colunas de estoque na tabela products
ALTER TABLE public.products 
ADD COLUMN stock integer NOT NULL DEFAULT 0,
ADD COLUMN stock_alert_threshold integer DEFAULT 5;

-- Criar tabela de categorias
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policies para categories: todos podem ver, apenas admin pode modificar
CREATE POLICY "Categorias são visíveis para todos"
ON public.categories
FOR SELECT
USING (true);

CREATE POLICY "Apenas admins podem criar categorias"
ON public.categories
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Apenas admins podem atualizar categorias"
ON public.categories
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Apenas admins podem deletar categorias"
ON public.categories
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Popular categorias iniciais
INSERT INTO public.categories (name, slug, description) VALUES
('Laptop', 'laptop', 'Computadores portáteis e notebooks'),
('Acessórios', 'acessorios', 'Acessórios diversos para tecnologia');

-- Adicionar coluna category_id em products
ALTER TABLE public.products
ADD COLUMN category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL;

-- Migrar dados existentes: associar produtos com categorias pelo nome
UPDATE public.products
SET category_id = (
  SELECT id FROM public.categories WHERE LOWER(name) = LOWER(products.category)
)
WHERE category IS NOT NULL;