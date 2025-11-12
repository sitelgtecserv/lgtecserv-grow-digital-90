-- ========================================
-- FASE 1: Melhorar Geração de Slugs
-- ========================================

-- Drop das funções antigas
DROP FUNCTION IF EXISTS public.generate_product_slug() CASCADE;
DROP FUNCTION IF EXISTS public.generate_category_slug() CASCADE;

-- Criar função melhorada para remover emojis e caracteres especiais
CREATE OR REPLACE FUNCTION public.generate_product_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
  clean_name TEXT;
BEGIN
  -- Se o slug já foi definido manualmente, não fazer nada
  IF NEW.slug IS NOT NULL AND NEW.slug != '' THEN
    RETURN NEW;
  END IF;
  
  -- Limpar nome: remover emojis e caracteres não-ASCII
  clean_name := regexp_replace(NEW.name, '[^\x00-\x7F]+', '', 'g');
  
  -- Se ficou vazio, usar 'produto'
  IF clean_name IS NULL OR trim(clean_name) = '' THEN
    clean_name := 'produto';
  END IF;
  
  -- Gerar slug base a partir do nome limpo
  base_slug := lower(regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            regexp_replace(clean_name, '[áàâãäå]', 'a', 'gi'),
            '[éèêë]', 'e', 'gi'
          ),
          '[íìîï]', 'i', 'gi'
        ),
        '[óòôõö]', 'o', 'gi'
      ),
      '[úùûü]', 'u', 'gi'
    ),
    '[^a-z0-9]+', '-', 'g'
  ));
  
  -- Remove hífens duplicados e do início/fim
  base_slug := trim(both '-' from regexp_replace(base_slug, '-+', '-', 'g'));
  
  -- Limitar a 60 caracteres
  IF length(base_slug) > 60 THEN
    base_slug := substring(base_slug from 1 for 60);
    base_slug := trim(both '-' from base_slug);
  END IF;
  
  -- Garantir que não está vazio
  IF base_slug IS NULL OR base_slug = '' THEN
    base_slug := 'produto';
  END IF;
  
  final_slug := base_slug;
  
  -- Verificar se o slug já existe e adicionar contador se necessário
  WHILE EXISTS (SELECT 1 FROM public.products WHERE slug = final_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$;

-- Criar função melhorada para categorias
CREATE OR REPLACE FUNCTION public.generate_category_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
  clean_name TEXT;
BEGIN
  IF NEW.slug IS NOT NULL AND NEW.slug != '' THEN
    RETURN NEW;
  END IF;
  
  -- Limpar nome: remover emojis e caracteres não-ASCII
  clean_name := regexp_replace(NEW.name, '[^\x00-\x7F]+', '', 'g');
  
  -- Se ficou vazio, usar 'categoria'
  IF clean_name IS NULL OR trim(clean_name) = '' THEN
    clean_name := 'categoria';
  END IF;
  
  base_slug := lower(regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            regexp_replace(clean_name, '[áàâãäå]', 'a', 'gi'),
            '[éèêë]', 'e', 'gi'
          ),
          '[íìîï]', 'i', 'gi'
        ),
        '[óòôõö]', 'o', 'gi'
      ),
      '[úùûü]', 'u', 'gi'
    ),
    '[^a-z0-9]+', '-', 'g'
  ));
  
  base_slug := trim(both '-' from regexp_replace(base_slug, '-+', '-', 'g'));
  
  -- Limitar a 50 caracteres
  IF length(base_slug) > 50 THEN
    base_slug := substring(base_slug from 1 for 50);
    base_slug := trim(both '-' from base_slug);
  END IF;
  
  IF base_slug IS NULL OR base_slug = '' THEN
    base_slug := 'categoria';
  END IF;
  
  final_slug := base_slug;
  
  WHILE EXISTS (SELECT 1 FROM public.categories WHERE slug = final_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$;

-- Recriar triggers
CREATE TRIGGER set_product_slug_trigger
  BEFORE INSERT OR UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_product_slug();

CREATE TRIGGER set_category_slug_trigger
  BEFORE INSERT OR UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_category_slug();

-- ========================================
-- Regenerar todos os slugs existentes
-- ========================================

-- Forçar regeneração de slugs de produtos
UPDATE public.products 
SET slug = NULL
WHERE slug IS NOT NULL;

-- Forçar regeneração de slugs de categorias  
UPDATE public.categories
SET slug = NULL
WHERE slug IS NOT NULL;