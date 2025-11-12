-- Habilitar extensão unaccent para remover acentos
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Dropar triggers existentes
DROP TRIGGER IF EXISTS set_product_slug_trigger ON public.products;
DROP TRIGGER IF EXISTS set_category_slug_trigger ON public.categories;

-- Dropar funções antigas
DROP FUNCTION IF EXISTS public.generate_product_slug();
DROP FUNCTION IF EXISTS public.generate_category_slug();

-- Criar nova função otimizada para gerar slugs de produtos
CREATE OR REPLACE FUNCTION public.generate_product_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
  clean_name TEXT;
  keywords TEXT[];
BEGIN
  -- Se o slug já foi definido manualmente, não fazer nada
  IF NEW.slug IS NOT NULL AND NEW.slug != '' THEN
    RETURN NEW;
  END IF;
  
  -- Remove emojis e caracteres especiais (mantém apenas letras, números, espaços e hífens)
  clean_name := regexp_replace(NEW.name, '[^\w\s-]', '', 'g');
  
  -- Se ficou vazio, usar 'produto'
  IF clean_name IS NULL OR trim(clean_name) = '' THEN
    clean_name := 'produto';
  END IF;
  
  -- Converte para minúsculas E remove acentos
  clean_name := lower(unaccent(clean_name));
  
  -- Remove palavras irrelevantes (stopwords em português)
  clean_name := regexp_replace(clean_name, '\m(novo|nova|unidades|unidade|disponivel|disponiveis|com|sem|fora|da|de|do|caixa|direito|pasta|top|gama|new|original|carregamento|rapido|seguro|tipo)\M', '', 'gi');
  
  -- Limpa espaços múltiplos
  clean_name := regexp_replace(clean_name, '\s+', ' ', 'g');
  clean_name := trim(clean_name);
  
  -- Se ficou vazio após remover stopwords, usar o nome original processado
  IF clean_name IS NULL OR clean_name = '' THEN
    clean_name := lower(unaccent(regexp_replace(NEW.name, '[^\w\s-]', '', 'g')));
  END IF;
  
  -- Extrai apenas as primeiras 5 palavras-chave
  keywords := string_to_array(clean_name, ' ');
  IF array_length(keywords, 1) > 5 THEN
    clean_name := array_to_string(keywords[1:5], ' ');
  END IF;
  
  -- Substitui espaços por hífens
  base_slug := regexp_replace(clean_name, '\s+', '-', 'g');
  
  -- Remove hífens múltiplos
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  
  -- Remove hífens do início e fim
  base_slug := trim(both '-' from base_slug);
  
  -- Limita a 50 caracteres
  IF length(base_slug) > 50 THEN
    base_slug := substring(base_slug from 1 for 50);
    -- Remove última palavra incompleta
    base_slug := regexp_replace(base_slug, '-[^-]*$', '');
    base_slug := trim(both '-' from base_slug);
  END IF;
  
  -- Garante que não está vazio
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Criar nova função otimizada para gerar slugs de categorias
CREATE OR REPLACE FUNCTION public.generate_category_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
  clean_name TEXT;
  keywords TEXT[];
BEGIN
  -- Se o slug já foi definido manualmente, não fazer nada
  IF NEW.slug IS NOT NULL AND NEW.slug != '' THEN
    RETURN NEW;
  END IF;
  
  -- Remove emojis e caracteres especiais
  clean_name := regexp_replace(NEW.name, '[^\w\s-]', '', 'g');
  
  -- Se ficou vazio, usar 'categoria'
  IF clean_name IS NULL OR trim(clean_name) = '' THEN
    clean_name := 'categoria';
  END IF;
  
  -- Converte para minúsculas E remove acentos
  clean_name := lower(unaccent(clean_name));
  
  -- Remove palavras irrelevantes
  clean_name := regexp_replace(clean_name, '\m(novo|nova|de|da|do|para|e|ou)\M', '', 'gi');
  
  -- Limpa espaços múltiplos
  clean_name := regexp_replace(clean_name, '\s+', ' ', 'g');
  clean_name := trim(clean_name);
  
  -- Se ficou vazio após remover stopwords, usar o nome original processado
  IF clean_name IS NULL OR clean_name = '' THEN
    clean_name := lower(unaccent(regexp_replace(NEW.name, '[^\w\s-]', '', 'g')));
  END IF;
  
  -- Extrai apenas as primeiras 3 palavras-chave para categorias
  keywords := string_to_array(clean_name, ' ');
  IF array_length(keywords, 1) > 3 THEN
    clean_name := array_to_string(keywords[1:3], ' ');
  END IF;
  
  -- Substitui espaços por hífens
  base_slug := regexp_replace(clean_name, '\s+', '-', 'g');
  
  -- Remove hífens múltiplos
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  
  -- Remove hífens do início e fim
  base_slug := trim(both '-' from base_slug);
  
  -- Limita a 30 caracteres para categorias
  IF length(base_slug) > 30 THEN
    base_slug := substring(base_slug from 1 for 30);
    base_slug := regexp_replace(base_slug, '-[^-]*$', '');
    base_slug := trim(both '-' from base_slug);
  END IF;
  
  -- Garante que não está vazio
  IF base_slug IS NULL OR base_slug = '' THEN
    base_slug := 'categoria';
  END IF;
  
  final_slug := base_slug;
  
  -- Verificar se o slug já existe e adicionar contador se necessário
  WHILE EXISTS (SELECT 1 FROM public.categories WHERE slug = final_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recriar triggers
CREATE TRIGGER set_product_slug_trigger
  BEFORE INSERT OR UPDATE OF name, slug ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_product_slug();

CREATE TRIGGER set_category_slug_trigger
  BEFORE INSERT OR UPDATE OF name, slug ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_category_slug();

-- Regenerar slugs existentes de categorias (forçar regeneração)
UPDATE public.categories SET slug = NULL;

-- Regenerar slugs existentes de produtos (forçar regeneração)
UPDATE public.products SET slug = NULL;