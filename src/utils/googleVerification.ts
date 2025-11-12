/**
 * Adiciona dinamicamente a meta tag de verificação do Google Search Console
 * @param content - O código de verificação fornecido pelo Google (apenas o valor do atributo content)
 */
export const addGoogleVerification = (content: string) => {
  // Remove meta tag existente se houver
  const existingTag = document.querySelector('meta[name="google-site-verification"]');
  if (existingTag) {
    existingTag.remove();
  }

  // Cria e adiciona nova meta tag
  const meta = document.createElement('meta');
  meta.name = 'google-site-verification';
  meta.content = content;
  document.head.appendChild(meta);
};

/**
 * Remove a meta tag de verificação do Google
 */
export const removeGoogleVerification = () => {
  const existingTag = document.querySelector('meta[name="google-site-verification"]');
  if (existingTag) {
    existingTag.remove();
  }
};

/**
 * Verifica se a meta tag de verificação está presente
 */
export const hasGoogleVerification = (): boolean => {
  return !!document.querySelector('meta[name="google-site-verification"]');
};

/**
 * Obtém o valor da meta tag de verificação
 */
export const getGoogleVerificationContent = (): string | null => {
  const tag = document.querySelector('meta[name="google-site-verification"]');
  return tag?.getAttribute('content') || null;
};
