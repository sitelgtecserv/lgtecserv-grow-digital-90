import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  structuredData?: any;
}

export const useSEO = (config: SEOConfig) => {
  const location = useLocation();
  const baseUrl = 'https://www.lgtecserv.com';
  const fullUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Set title
    document.title = config.title;

    // Clear existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-dynamic="true"]');
    existingMetas.forEach(meta => meta.remove());

    const existingLinks = document.querySelectorAll('link[data-dynamic="true"]');
    existingLinks.forEach(link => link.remove());

    const existingSchemas = document.querySelectorAll('script[data-schema="true"]');
    existingSchemas.forEach(script => script.remove());

    // Create meta tags
    const metaTags = [
      { name: 'description', content: config.description },
      { name: 'robots', content: 'index, follow' },
      { name: 'keywords', content: config.keywords || '' },
      
      // Open Graph
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:type', content: config.type || 'website' },
      { property: 'og:url', content: config.url || fullUrl },
      { property: 'og:image', content: config.image || `${baseUrl}/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.png` },
      { property: 'og:site_name', content: 'LG TecServ' },
      { property: 'og:locale', content: 'pt_PT' },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.image || `${baseUrl}/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.png` },
      { name: 'twitter:site', content: '@lgtecserv' },
    ];

    // Add meta tags to head
    metaTags.forEach(({ name, property, content }) => {
      if (content) {
        const meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (property) meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        meta.setAttribute('data-dynamic', 'true');
        document.head.appendChild(meta);
      }
    });

    // Add canonical link
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', config.url || fullUrl);
    canonical.setAttribute('data-dynamic', 'true');
    document.head.appendChild(canonical);

    // Add structured data
    if (config.structuredData) {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', 'true');
      script.textContent = JSON.stringify(config.structuredData);
      document.head.appendChild(script);
    }

  }, [config, fullUrl]);

  return { fullUrl, baseUrl };
};