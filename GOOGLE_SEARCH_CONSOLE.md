# Guia de Configuração do Google Search Console

## 📋 Visão Geral

Este documento fornece instruções detalhadas para configurar o Google Search Console (GSC) na sua loja online LG TecServ e aproveitar ao máximo os benefícios de SEO.

## 🎯 Por que usar o Google Search Console?

- ✅ **Monitoramento**: Veja quantas páginas estão indexadas
- ✅ **Performance**: Acompanhe cliques, impressões e posição nos resultados
- ✅ **Rich Results**: Verifique se produtos aparecem com preços e avaliações
- ✅ **Problemas**: Identifique e corrija erros de rastreamento
- ✅ **Palavras-chave**: Descubra quais termos levam usuários ao seu site

## 🚀 Configuração Passo a Passo

### Passo 1: Acesse o Google Search Console

1. Acesse: [https://search.google.com/search-console](https://search.google.com/search-console)
2. Faça login com sua conta Google
3. Clique em "Adicionar propriedade"

### Passo 2: Adicione sua Propriedade

1. Escolha **"Prefixo de URL"** (recomendado)
2. Cole a URL: `https://www.lgtecserv.com`
3. Clique em "Continuar"

### Passo 3: Verifique a Propriedade

#### Método Recomendado: Meta Tag HTML

1. Na tela de verificação, selecione **"Tag HTML"**
2. Copie a meta tag fornecida pelo Google
   - Formato: `<meta name="google-site-verification" content="CÓDIGO_AQUI" />`
3. Adicione a tag ao arquivo `index.html` do projeto:

```html
<!DOCTYPE html>
<html lang="pt-PT">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Google Search Console Verification -->
    <meta name="google-site-verification" content="SEU_CÓDIGO_AQUI" />
    
    <!-- ... resto do head -->
  </head>
```

4. Faça commit e deploy das alterações
5. Volte ao Google Search Console
6. Clique em **"Verificar"**

#### Métodos Alternativos

**Arquivo HTML:**
- Baixe o arquivo HTML fornecido pelo Google
- Faça upload na pasta `public/` do projeto
- Faça deploy
- Clique em "Verificar"

**Google Analytics:**
- Se já tem Google Analytics configurado
- Use a mesma conta para verificação automática

**Google Tag Manager:**
- Se já tem GTM instalado
- A verificação pode ser automática

### Passo 4: Submeta o Sitemap

Após verificação bem-sucedida:

1. No menu lateral, clique em **"Sitemaps"**
2. Cole a URL do sitemap:
   ```
   https://cswrwxkjsfxcaoboihdy.supabase.co/functions/v1/sitemap
   ```
3. Clique em **"Enviar"**

## 📊 Monitoramento Pós-Configuração

### O que monitorar diariamente:

1. **Cobertura**
   - Páginas indexadas vs. não indexadas
   - Erros de rastreamento
   - Avisos e exclusões

2. **Performance**
   - Total de cliques
   - Total de impressões
   - CTR médio
   - Posição média

3. **Melhorias**
   - Usabilidade mobile
   - Dados estruturados
   - Rich results

4. **Sitemaps**
   - Status do sitemap
   - Páginas descobertas
   - Páginas enviadas vs. indexadas

## 🔍 Ferramentas Úteis

### 1. URL Inspection Tool
- Teste indexação de URLs específicas
- Force re-indexação de páginas atualizadas
- Acesso: [https://search.google.com/search-console/inspect](https://search.google.com/search-console/inspect)

### 2. Rich Results Test
- Valide structured data dos produtos
- Visualize como aparecem nos resultados
- Acesso: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)

### 3. PageSpeed Insights
- Analise performance das páginas
- Obtenha recomendações Core Web Vitals
- Acesso: [https://pagespeed.web.dev/](https://pagespeed.web.dev/)

## ⚡ Dicas de Otimização

### Após Indexação Inicial:

1. **Solicite Indexação Manual**
   - Use URL Inspection Tool para produtos novos
   - Solicite indexação após grandes atualizações

2. **Monitore Palavras-chave**
   - Vá em Performance → Consultas
   - Identifique termos com alta impressão mas baixo CTR
   - Otimize títulos e descrições dessas páginas

3. **Corrija Erros Rapidamente**
   - Configure alertas de email
   - Resolva erros 404 e problemas de rastreamento
   - Verifique mobile usability issues

4. **Atualize Structured Data**
   - Teste rich results regularmente
   - Adicione avaliações quando disponível
   - Mantenha preços e estoque atualizados

## 📈 KPIs para Acompanhar

| Métrica | Meta Inicial | Meta 3 Meses |
|---------|-------------|--------------|
| Páginas Indexadas | 100% produtos | 100% + categorias |
| Impressões | Baseline | +200% |
| CTR Médio | 2-3% | 5%+ |
| Posição Média | Top 50 | Top 20 |
| Cliques | Baseline | +150% |

## ⏰ Cronograma de Indexação

- **24-48h**: Primeiras páginas começam a ser indexadas
- **1 semana**: Maioria dos produtos indexados
- **2 semanas**: Dados de performance começam a aparecer
- **1 mês**: Estatísticas completas e tendências

## 🆘 Resolução de Problemas

### "Descoberto - Atualmente não indexado"
- **Causa**: Google descobriu mas não rastreou ainda
- **Solução**: Solicite indexação manual via URL Inspection Tool

### "Rastreado - Atualmente não indexado"
- **Causa**: Conteúdo considerado de baixa qualidade ou duplicado
- **Solução**: Melhore descrições dos produtos, adicione conteúdo único

### "Sitemap não pode ser lido"
- **Causa**: Erro no formato do XML
- **Solução**: Teste o sitemap em validadores XML online

### "Muitos redirecionamentos"
- **Causa**: Cadeia de redirecionamentos 301/302
- **Solução**: Simplifique estrutura de URLs

## 📱 Integração com Outras Ferramentas

### Google Analytics
- Configure property linking no GSC
- Veja dados do GSC dentro do GA4

### Google Ads
- Importe dados de pesquisa orgânica
- Otimize campanhas com insights do GSC

### Google Business Profile
- Link para melhorar Local SEO
- Sincronize informações do negócio

## 🔐 Segurança e Acesso

- **Proprietário**: Acesso total, pode adicionar/remover usuários
- **Usuário Completo**: Pode ver todos os dados e solicitar ações
- **Usuário Restrito**: Apenas visualização de dados

**Recomendação**: Mantenha pelo menos 2 proprietários (segurança)

## 📚 Recursos Adicionais

- [Documentação Oficial GSC](https://support.google.com/webmasters/)
- [Google Search Central Blog](https://developers.google.com/search/blog)
- [Guia de SEO do Google](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)

## 🎓 Próximos Passos

Após configurar o GSC:

1. ✅ Configure Google Analytics 4
2. ✅ Implemente sistema de avaliações de produtos
3. ✅ Crie páginas de categoria com conteúdo SEO
4. ✅ Configure Google Merchant Center (para Google Shopping)
5. ✅ Implemente FAQ Schema em páginas relevantes

---

**Suporte**: Para dúvidas sobre a configuração, acesse `/google-search-console` no site para um guia interativo.
