# Criar Edge Function `ia-loja`

Criar uma nova Edge Function que serve como proxy para a OpenAI, com 3 acções (`chat`, `ai-insights`, `generate-description`), usando o secret `iadaloja` já configurado.

## Ficheiros a criar/modificar

### 1. `supabase/functions/ia-loja/index.ts` (novo)
Implementar exactamente o código fornecido pelo utilizador:
- Handler `Deno.serve` com CORS
- `createClient` do Supabase com `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`
- Acção `chat`: busca produtos da tabela `products` com `categories(name)`, separa disponíveis vs esgotados, monta system prompt com contexto LG TecServ + catálogo, chama `gpt-4o-mini` (max_tokens 500), retorna `{reply}`
- Acção `ai-insights`: busca produtos + pedidos, calcula stats (total, completos, receita em MTn), pede 3 sugestões + alertas stock + tendências + novos produtos, `gpt-4o-mini` (max_tokens 800), retorna `{insights}`
- Acção `generate-description`: copywriter e-commerce moçambicano, `gpt-4o-mini` (max_tokens 300), retorna `{description}`
- Fallback WhatsApp: `https://wa.me/258869824047`
- Respostas em português de Moçambique, moeda MTn

### 2. `supabase/config.toml` (editar)
Adicionar bloco para desactivar JWT:
```toml
[functions.ia-loja]
verify_jwt = false
```

## Notas
- Secret `iadaloja` já existe — não pedir novamente
- Função será deployed automaticamente
- Nenhuma alteração ao frontend nesta tarefa (apenas a função backend)
