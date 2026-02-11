
# Paginas de Portfolio Profissional para Membros da Equipa

## Resumo
Criar 5 paginas individuais de portfolio profissional para cada membro da empresa, com design corporativo moderno, acessiveis a partir da secao "A Nossa Equipa" na pagina Sobre.

## Estrutura de Ficheiros

### Novos ficheiros a criar:
1. `src/data/teamMembers.ts` - Dados centralizados de todos os membros
2. `src/pages/team/MemberProfile.tsx` - Componente reutilizavel para pagina de perfil
3. Actualizacao de `src/App.lazy.tsx` - Lazy load da pagina
4. Actualizacao de `src/App.tsx` - Nova rota `/equipe/:slug`
5. Actualizacao de `src/pages/About.tsx` - Adicionar botao "Ver Perfil Completo" e link na foto

## URLs individuais
- `/equipe/luis-martins`
- `/equipe/inacio-langa`
- `/equipe/felix-florindo`
- `/equipe/lemos-sabado`
- `/equipe/claudia-muale`

## Design de cada pagina

Cada pagina tera as seguintes secoes:

1. **Banner Hero** - Foto profissional, nome, cargo, frase de impacto, fundo com gradiente da marca
2. **Sobre o Profissional** - Biografia, historico, experiencia, especializacoes
3. **Funcao na Empresa** - Responsabilidades, contribuicao estrategica, impacto
4. **Competencias** - Hard skills, soft skills e ferramentas (com badges visuais)
5. **Valores Profissionais** - Etica, compromisso, inovacao, lideranca, foco em resultados (com icones)
6. **Projectos e Resultados** - Exemplos praticos, resultados, participacao estrategica
7. **CTA** - Botao "Entrar em Contacto" com link para email/formulario

## Detalhes Tecnicos

### `src/data/teamMembers.ts`
- Interface TypeScript `TeamMember` com todos os campos necessarios (bio, skills, values, projects, etc.)
- Array com dados dos 5 membros conforme conteudo fornecido
- Funcao `getTeamMemberBySlug(slug)` para lookup

### `src/pages/team/MemberProfile.tsx`
- Usa `useParams()` para obter o slug da URL
- Busca dados do membro pelo slug
- Redireciona para 404 se membro nao encontrado
- Componentes: Header, SEOHead, Breadcrumbs, Footer, WhatsAppButton
- SEO optimizado com structured data (Person schema)
- Design responsivo (mobile-first)
- Secoes com animacoes suaves (hover, transicoes)

### Actualizacao de `About.tsx`
- Adicionar `Link` a volta de cada card de membro
- Adicionar botao "Ver Perfil Completo" em cada card
- Manter o grid actual (adaptar para 5 membros com layout responsivo)
- Actualizar nomes/cargos conforme dados fornecidos

### Rotas
- Rota dinamica: `/equipe/:slug` -> `MemberProfile`

### SEO
- Titulo: `{Nome} - {Cargo} | LG TecServ`
- Meta description personalizada por membro
- Schema.org Person structured data
- Canonical URL individual
- Open Graph tags

### Componentes visuais utilizados
- Card, Badge (para skills)
- Icones Lucide: Briefcase, Award, Target, Heart, Lightbulb, Shield, Users, Mail, ArrowRight, Star, CheckCircle
- Gradientes da marca existente
- Classes utilitarias ja existentes: `gradient-text`, `bg-gradient-card`, `shadow-elegant`
