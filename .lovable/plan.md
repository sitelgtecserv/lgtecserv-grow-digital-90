

# Fix: Contadores Mostrando 0 e Erro de Build

## Problemas Identificados

1. **Contadores mostram "0+"**: O `AnimatedCounter` usa `IntersectionObserver` para iniciar a animacao, mas os cards estao dentro de `AnimatedSection` (framer-motion) que comeca com `opacity: 0`. O observer pode nao detectar visibilidade correctamente quando o elemento pai esta invisivel, ou o counter ja esta visivel antes da animacao do pai terminar. Solucao: remover a dependencia do IntersectionObserver nos stats e iniciar a contagem automaticamente apos um delay, ja que a secao ja tem animacao propria.

2. **Erro de build no sitemap**: `error` e do tipo `unknown` em TypeScript strict. Corrigir com type guard.

## Alteracoes

### 1. `src/pages/team/MemberProfile.tsx`
- Na secao Stats Bar, substituir `AnimatedCounter` por uma versao inline que anima automaticamente quando o componente monta (sem depender de IntersectionObserver), usando um delay baseado no index
- Ou usar o `OptimizedCounter` existente que ja tem melhor gestao do observer
- Alternativa mais simples: passar os stats sem wrapper `AnimatedSection` e garantir que o counter ref esta visivel

**Abordagem escolhida**: Criar um counter simples inline que usa `useEffect` com timeout para iniciar, removendo a complexidade do observer dentro de cards ja animados.

### 2. `supabase/functions/sitemap/index.ts` (linha 139)
- Mudar `error.message` para `(error as Error).message` ou usar verificacao de tipo

### Ficheiros a modificar
1. `src/pages/team/MemberProfile.tsx` - fix dos contadores
2. `supabase/functions/sitemap/index.ts` - fix do tipo unknown

