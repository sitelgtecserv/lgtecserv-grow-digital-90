/**
 * Converte um título num slug amigável para SEO, removendo "stop words"
 * em português que não acrescentam valor semântico à URL.
 */

const STOP_WORDS = new Set([
  'de', 'do', 'da', 'dos', 'das',
  'em', 'no', 'na', 'nos', 'nas',
  'a', 'o', 'as', 'os',
  'e', 'ou', 'com', 'para', 'por',
  'um', 'uma', 'uns', 'umas',
  'novo', 'nova', 'usado', 'usada', 'original'
]);

export function smartSlugify(text: string): string {
  if (!text) return '';

  // 1. Converter para minúsculas e remover acentos
  let slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // 2. Substituir caracteres especiais e espaços por hífens temporários
  slug = slug.replace(/[^a-z0-9]+/g, '-');

  // 3. Remover stop words
  const words = slug.split('-').filter(word => {
    return word.length > 0 && !STOP_WORDS.has(word);
  });

  // 4. Juntar as palavras novamente com hífen
  slug = words.join('-');

  // 5. Garantir que não está vazio (caso extremo de string só com stop words)
  if (!slug) {
    slug = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
  }

  // 6. Remover hifens no início e no fim e limitar tamanho
  return slug.replace(/^-+|-+$/g, '').substring(0, 100);
}
