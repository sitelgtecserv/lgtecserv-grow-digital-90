// Script to replace all ScrollReveal instances with OptimizedScrollReveal
// This is a helper file to avoid manual replacement errors

export const replaceScrollRevealInContent = (content: string): string => {
  return content
    .replace(/import ScrollReveal from/g, 'import OptimizedScrollReveal from')
    .replace(/<ScrollReveal/g, '<OptimizedScrollReveal')
    .replace(/<\/ScrollReveal>/g, '</OptimizedScrollReveal>');
};