

# Melhorias Visuais para os Portfolios Profissionais

## Resumo
Transformar as paginas de portfolio de um layout basico e estatico para um design premium, corporativo e dinamico, com animacoes, melhor hierarquia visual, estatisticas de destaque e navegacao entre membros.

## Melhorias Planeadas

### 1. Hero Banner Premium
- Aumentar a altura do banner (de `py-20` para `py-28 md:py-36`)
- Adicionar efeito parallax suave no fundo com CSS
- Foto do membro com borda animada (gradiente rotativo)
- Badge/tag do cargo com estilo glassmorphism
- Animacao de entrada com framer-motion (fade-in + slide-up)

### 2. Barra de Estatisticas de Destaque (nova secao)
Adicionar uma secao logo abaixo do banner com 3-4 metricas visuais por membro:

Exemplo para Inacio Langa:
- "200+ Clientes" | "500+ Projectos" | "CEO desde 20XX"

Adicionar campo `stats` ao `TeamMember` interface com titulo e valor para cada membro.
Apresentar com icones e contadores animados.

### 3. Secao "Sobre" Melhorada
- Layout side-by-side: texto a esquerda, citacao/frase de destaque a direita num card com aspas decorativas
- Linhas decorativas e separadores visuais entre secoes

### 4. Competencias com Barras de Progresso
- Em vez de simples badges, mostrar hard skills com barras de progresso visuais (nivel de competencia)
- Soft skills mantidas como badges mas com icones individuais
- Ferramentas com logos/icones quando possivel

### 5. Timeline de Carreira (nova secao)
Adicionar campo `timeline` ao `TeamMember` com marcos da carreira.
Apresentar numa timeline vertical com datas, titulos e descricoes.

### 6. Projectos com Cards Premium
- Cards maiores com icone/numero de projecto
- Barra de progresso visual para o resultado
- Efeito hover com elevacao e borda gradiente

### 7. Navegacao entre Membros
Adicionar secao no final "Conheca Tambem" com miniaturas dos outros membros da equipa, permitindo navegar entre portfolios sem voltar a pagina Sobre.

### 8. Animacoes com Framer Motion
- Secoes aparecem com staggered fade-in ao fazer scroll
- Cards com hover scale e shadow transition
- Badges com entrance animation suave
- Hero com parallax e texto com typewriter effect subtil

---

## Detalhes Tecnicos

### Alteracoes no `src/data/teamMembers.ts`
- Adicionar `stats: { label: string; value: string; icon: string }[]` a interface
- Adicionar `timeline: { year: string; title: string; description: string }[]` a interface
- Adicionar `skillLevels: { skill: string; level: number }[]` para barras de progresso
- Preencher dados para todos os 5 membros

### Alteracoes no `src/pages/team/MemberProfile.tsx`
Reescrever completamente o layout com:

1. **Hero**: Banner fullscreen com overlay gradiente, foto com ring animado, animacoes framer-motion
2. **Stats Bar**: Grid de 3-4 estatisticas com contadores animados (usar `animated-counter` existente)
3. **Sobre**: Layout 2 colunas com blockquote decorativo
4. **Timeline**: Componente vertical com linhas e pontos
5. **Funcao**: Manter grid mas com cards em vez de listas simples
6. **Competencias**: Hard skills com barras de progresso, soft skills com badges + icones, ferramentas com destaque
7. **Valores**: Cards com hover gradiente e animacao
8. **Projectos**: Cards premium com numeracao e destaques visuais
9. **Equipa**: Mini-galeria dos outros membros
10. **CTA**: Manter mas com animacao de entrada

### Dependencias utilizadas (ja instaladas)
- `framer-motion` - animacoes
- `lucide-react` - icones
- Componentes UI existentes (Card, Badge, Button)
- `react-intersection-observer` - scroll animations

### Ficheiros a modificar
1. `src/data/teamMembers.ts` - novos campos de dados
2. `src/pages/team/MemberProfile.tsx` - redesign completo

### Ficheiros existentes reutilizados
- `src/components/ui/animated-counter.tsx` - contadores de stats
- `src/components/ui/badge.tsx` - competencias
- `src/components/ui/card.tsx` - cards de valores e projectos
