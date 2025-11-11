-- FASE 1: Adicionar campo slug e função de geração automática

-- Adicionar coluna slug na tabela products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Criar índice para slug
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);

-- Criar função para gerar slugs automaticamente
CREATE OR REPLACE FUNCTION public.generate_product_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Se o slug já foi definido manualmente, não fazer nada
  IF NEW.slug IS NOT NULL AND NEW.slug != '' THEN
    RETURN NEW;
  END IF;
  
  -- Gerar slug base a partir do nome
  base_slug := lower(regexp_replace(
    regexp_replace(
      regexp_replace(NEW.name, '[áàâãä]', 'a', 'gi'),
      '[éèêë]', 'e', 'gi'
    ), 
    '[^a-z0-9]+', '-', 'g'
  ));
  
  -- Remove hífens duplicados e do início/fim
  base_slug := trim(both '-' from regexp_replace(base_slug, '-+', '-', 'g'));
  
  final_slug := base_slug;
  
  -- Verificar se o slug já existe e adicionar contador se necessário
  WHILE EXISTS (SELECT 1 FROM public.products WHERE slug = final_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para gerar slug automaticamente
DROP TRIGGER IF EXISTS set_product_slug ON public.products;
CREATE TRIGGER set_product_slug
BEFORE INSERT OR UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.generate_product_slug();

-- Gerar slugs para produtos existentes que não têm slug
UPDATE public.products 
SET slug = NULL 
WHERE slug IS NULL OR slug = '';

-- Adicionar coluna slug na tabela categories (para futuras melhorias)
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- Função para gerar slugs de categorias
CREATE OR REPLACE FUNCTION public.generate_category_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  IF NEW.slug IS NOT NULL AND NEW.slug != '' THEN
    RETURN NEW;
  END IF;
  
  base_slug := lower(regexp_replace(
    regexp_replace(
      regexp_replace(NEW.name, '[áàâãä]', 'a', 'gi'),
      '[éèêë]', 'e', 'gi'
    ), 
    '[^a-z0-9]+', '-', 'g'
  ));
  
  base_slug := trim(both '-' from regexp_replace(base_slug, '-+', '-', 'g'));
  final_slug := base_slug;
  
  WHILE EXISTS (SELECT 1 FROM public.categories WHERE slug = final_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_category_slug ON public.categories;
CREATE TRIGGER set_category_slug
BEFORE INSERT OR UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.generate_category_slug();

-- Gerar slugs para categorias existentes
UPDATE public.categories 
SET slug = NULL 
WHERE slug IS NULL OR slug = '';