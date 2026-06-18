# Auto-Rebuild da Vercel quando produtos mudam

## Objetivo
Sempre que um produto for criado, atualizado ou eliminado na tabela `products`, disparar automaticamente um POST para o Deploy Hook da Vercel, fazendo rebuild do site (regenera `sitemap.xml` e propaga produtos novos ao Google).

## Abordagem
Usar a extensão `pg_net` (já disponível no Supabase) para chamar `net.http_post` diretamente da base de dados via um trigger AFTER INSERT/UPDATE/DELETE na tabela `products`.

Vantagens: zero código no frontend, zero edge functions, dispara mesmo quando produtos são alterados via SQL ou painel admin.

## Migração SQL a aplicar

```sql
-- 1. Garantir que pg_net está ativo
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 2. Função que chama o Deploy Hook da Vercel
CREATE OR REPLACE FUNCTION public.trigger_vercel_rebuild()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://api.vercel.com/v1/integrations/deploy/prj_IMoVerMnAzaHfZg4TvzOTnBvf8Uj/AOYp6cSYs9',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- 3. Trigger na tabela products (INSERT, UPDATE, DELETE)
DROP TRIGGER IF EXISTS products_vercel_rebuild ON public.products;
CREATE TRIGGER products_vercel_rebuild
AFTER INSERT OR UPDATE OR DELETE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.trigger_vercel_rebuild();
```

## Considerações
- **Silencioso e não-bloqueante:** `net.http_post` é assíncrono — não atrasa nem falha a operação no produto mesmo que a Vercel esteja em baixo.
- **Múltiplas alterações em lote:** se forem editados 10 produtos seguidos, dispara 10 builds. A Vercel agrupa/cancela builds redundantes automaticamente, mas se quiser podemos depois adicionar debounce (não incluído nesta versão para manter simples).
- **Sem alteração no frontend** nem em ficheiros do projeto — só a migração da BD.

## Ficheiros a alterar
- Apenas migração SQL via ferramenta de migrações (sem ficheiros do código).
