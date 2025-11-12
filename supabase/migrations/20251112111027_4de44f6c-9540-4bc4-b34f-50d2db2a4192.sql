-- Corrigir avisos de segurança: adicionar search_path nas funções de geração de slug

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
$$;

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
$$;