## Actualizar Edge Function `ia-loja`

A função já existe em `supabase/functions/ia-loja/index.ts` com `verify_jwt = false` no `config.toml`. Vou actualizá-la para incluir contexto completo da empresa e remover markdown das respostas.

### Alterações em `supabase/functions/ia-loja/index.ts`

**1. Novo SYSTEM_PROMPT enriquecido** com:
- **Contactos**: email contato@lgtecserv.com, telefones +258 84 1524 822 e +258 86 982 4047, WhatsApp +258 86 982 4047
- **8 Serviços**: Criação de Sites, Design Gráfico, Tráfego Pago, Gestão de Redes Sociais, Consultoria de Marketing, Instalações Eléctricas (Residencial e Industrial), Topografia, Ensaios Fotográficos
- **Páginas do site**: Home (/), Loja (/loja), Sobre (/sobre), Serviços (/servicos), Contacto (/contacto), FAQ (/faq), Documentação (/documentacao), Carrinho (/carrinho), Meus Pedidos (/meus-pedidos)
- **Redes sociais**: Facebook, Instagram, WhatsApp
- **Emails segmentados**: contato@ (geral), loja@ (pedidos), topografia@ (topografia)

**2. Regra obrigatória anti-markdown** em todas as 3 acções:
- Instrução explícita: "NUNCA use markdown. Não use asteriscos (*, **), cardinais (#), traços de lista (-), nem qualquer formatação markdown. Escreva em texto corrido natural."
- Adicionar pós-processamento que faz strip de `**`, `*`, `#`, ` ``` ` caso o modelo escape

**3. Acção `chat`** (mantém estrutura actual):
- Busca produtos com `categories(name)` 
- Separa disponíveis vs esgotados
- gpt-4o-mini, max_tokens 500, retorna `{reply}` sem markdown

**4. Acção `ai-insights`** (mantém estrutura actual):
- Busca produtos + orders, calcula stats
- gpt-4o-mini, max_tokens 800, retorna `{insights}` sem markdown

**5. Acção `generate-description`** (reforçada para SEO):
- System prompt actualizado: copywriter SEO focado em keywords moçambicanas, 2-3 frases vendedoras, sem markdown
- gpt-4o-mini, max_tokens 300, retorna `{description}`

**6. CORS** mantido com `Access-Control-Allow-Origin: *` em todas as respostas (incluindo erros).

### Ficheiros
- `supabase/functions/ia-loja/index.ts` — actualizar
- `supabase/config.toml` — já tem `[functions.ia-loja] verify_jwt = false`, sem alterações
- Secret `iadaloja` — já configurado, sem alterações
- Sem alterações no frontend
