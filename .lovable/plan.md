

# Correcao de Portfolios e Actualizacao de Emails

## Problema 1: URLs dos Portfolios

As URLs actuais usam o formato `/equipe/luis-martins`. O formato solicitado e raiz directa sem prefixo, com nomes diferentes.

### Mapeamento de URLs

| Membro | URL Actual | URL Solicitada |
|--------|-----------|----------------|
| Luis Martins | /equipe/luis-martins | /luismatsenjua |
| Inacio Langa | /equipe/inacio-langa | /inaciolanga |
| Felix Florindo | /equipe/felix-florindo | /felexlourindo |
| Lemos Sabado | /equipe/lemos-sabado | /lemossabado |
| Claudia Muale | /equipe/claudia-muale | /claudiaarmando |

### Alteracoes necessarias

**1. `src/data/teamMembers.ts`** - Actualizar slugs:
- `luis-martins` -> `luismatsenjua`
- `inacio-langa` -> `inaciolanga`
- `felix-florindo` -> `felexlourindo`
- `lemos-sabado` -> `lemossabado`
- `claudia-muale` -> `claudiaarmando`
- Actualizar todos os emails de `geral@lgtecserv.com` para `contato@lgtecserv.com`

**2. `src/App.tsx`** - Mudar a rota de `/equipe/:slug` para `/:slug` com rotas explicitas para cada membro (para evitar conflitos com outras rotas):
- Adicionar 5 rotas individuais: `/luismatsenjua`, `/inaciolanga`, etc.
- Manter a rota `/equipe/:slug` como redirecionamento para compatibilidade

**3. `src/pages/About.tsx`** - Actualizar links dos membros de `/equipe/${member.slug}` para `/${member.slug}`

**4. `src/pages/team/MemberProfile.tsx`** - Actualizar URLs nos schemas SEO e links internos

---

## Problema 2: Actualizacao dos Emails

### Emails a substituir em todo o site

| Email Actual | Novo Email | Contexto |
|-------------|-----------|----------|
| lgtecserv@gmail.com | contato@lgtecserv.com | Email geral do site |
| info@lgtecserv.com | contato@lgtecserv.com | Dados estruturados SEO |
| geral@lgtecserv.com | contato@lgtecserv.com | Portfolios dos membros |

### Ficheiros a editar

1. **`src/components/layout/Footer.tsx`** (linha 202) - `lgtecserv@gmail.com` -> `contato@lgtecserv.com`
2. **`src/pages/Contact.tsx`** (linhas 28-29, 320) - `lgtecserv@gmail.com` -> `contato@lgtecserv.com`
3. **`src/pages/Documentacao.tsx`** (linhas 510-511) - `lgtecserv@gmail.com` -> `contato@lgtecserv.com`
4. **`src/pages/TermosCondicoes.tsx`** (linhas 129-130) - `lgtecserv@gmail.com` -> `contato@lgtecserv.com`
5. **`src/pages/PoliticaPrivacidade.tsx`** (linha 305) - `lgtecserv@gmail.com` -> `contato@lgtecserv.com`
6. **`src/pages/FAQ.tsx`** (linhas 29, 125) - `lgtecserv@gmail.com` -> `contato@lgtecserv.com`
7. **`src/utils/seoData.ts`** (linhas 11, 46) - `info@lgtecserv.com` -> `contato@lgtecserv.com`
8. **`src/data/teamMembers.ts`** (5 ocorrencias) - `geral@lgtecserv.com` -> `contato@lgtecserv.com`

### Email especifico da topografia
9. **`src/pages/services/Topografia.tsx`** - Verificar e adicionar referencia a `topografia@lgtecserv.com` nos CTAs

### Email especifico da loja
10. **`src/pages/Checkout.tsx`** e **`src/components/layout/ShopHeader.tsx`** - Se existirem referencias de email, usar `loja@lgtecserv.com`

---

## Detalhes Tecnicos

### Estrategia de rotas para evitar conflitos
Em vez de usar `/:slug` generico (que conflitaria com rotas como `/loja`, `/faq`, etc.), sera criada uma rota explicita para cada membro:

```text
<Route path="/luismatsenjua" element={<MemberProfile />} />
<Route path="/inaciolanga" element={<MemberProfile />} />
<Route path="/felexlourindo" element={<MemberProfile />} />
<Route path="/lemossabado" element={<MemberProfile />} />
<Route path="/claudiaarmando" element={<MemberProfile />} />
```

O componente `MemberProfile` sera adaptado para extrair o slug do `pathname` quando nao houver parametro `:slug`.

### SEO e Indexacao
- Actualizar canonical URLs nos schemas Person para usar novo formato
- Actualizar `sitemap.xml` com as novas URLs
- Manter `/equipe/:slug` com redirecionamento 301 para as novas URLs (no `vercel.json`)

### Redirecionamentos (vercel.json)
Adicionar redirecionamentos permanentes das URLs antigas:

```text
/equipe/luis-martins -> /luismatsenjua (301)
/equipe/inacio-langa -> /inaciolanga (301)
/equipe/felix-florindo -> /felexlourindo (301)
/equipe/lemos-sabado -> /lemossabado (301)
/equipe/claudia-muale -> /claudiaarmando (301)
```

