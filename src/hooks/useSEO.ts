import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service' | 'product';
  structuredData?: any;
  noindex?: boolean;
}

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LG TecServ",
  "image": "https://www.lgtecserv.com/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.png",
  "@id": "https://www.lgtecserv.com",
  "url": "https://www.lgtecserv.com",
  "telephone": "+258842145328",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Maputo",
    "addressLocality": "Maputo",
    "addressRegion": "Maputo",
    "postalCode": "1100",
    "addressCountry": "MZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -25.9655,
    "longitude": 32.5832
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.facebook.com/lgtecserv",
    "https://www.instagram.com/lgtecserv"
  ]
};

// Pages that should never be indexed
const NOINDEX_PATHS = [
  '/admin',
  '/auth',
  '/carrinho',
  '/checkout',
  '/confirmacao-pedido',
  '/meus-pedidos',
  '/google-search-console',
];

export const useSEO = (config: SEOConfig) => {
  const location = useLocation();
  const baseUrl = 'https://www.lgtecserv.com';
  const fullUrl = `${baseUrl}${location.pathname}`;

  // Auto-detect noindex based on path
  const shouldNoindex = config.noindex || NOINDEX_PATHS.some(p =>
    location.pathname === p || location.pathname.startsWith(p + '/')
  );

  useEffect(() => {
    // Set title
    document.title = config.title;

    // Clear existing dynamic tags
    const existingMetas = document.querySelectorAll('meta[data-dynamic="true"]');
    existingMetas.forEach(meta => meta.remove());

    const existingLinks = document.querySelectorAll('link[data-dynamic="true"]');
    existingLinks.forEach(link => link.remove());

    const existingSchemas = document.querySelectorAll('script[data-schema="true"]');
    existingSchemas.forEach(script => script.remove());

    // Create meta tags
    const metaTags: Array<{ name?: string; property?: string; content: string }> = [
      { name: 'description', content: config.description },
      { name: 'robots', content: shouldNoindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1' },
      { name: 'keywords', content: config.keywords || '' },
      
      // Open Graph
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:type', content: config.type || 'website' },
      { property: 'og:url', content: config.url || fullUrl },
      { property: 'og:image', content: config.image || `${baseUrl}/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.png` },
      { property: 'og:site_name', content: 'LG TecServ' },
      { property: 'og:locale', content: 'pt_MZ' },
      
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

    // Add canonical link (only for indexable pages)
    if (!shouldNoindex) {
      const canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', config.url || fullUrl);
      canonical.setAttribute('data-dynamic', 'true');
      document.head.appendChild(canonical);

      // Add hreflang for Mozambique targeting
      const hreflang = document.createElement('link');
      hreflang.setAttribute('rel', 'alternate');
      hreflang.setAttribute('hreflang', 'pt-MZ');
      hreflang.setAttribute('href', config.url || fullUrl);
      hreflang.setAttribute('data-dynamic', 'true');
      document.head.appendChild(hreflang);

      // Add x-default hreflang
      const hreflangDefault = document.createElement('link');
      hreflangDefault.setAttribute('rel', 'alternate');
      hreflangDefault.setAttribute('hreflang', 'x-default');
      hreflangDefault.setAttribute('href', config.url || fullUrl);
      hreflangDefault.setAttribute('data-dynamic', 'true');
      document.head.appendChild(hreflangDefault);
    }

    // Add structured data
    let schemas = [];
    if (config.structuredData) {
      schemas = Array.isArray(config.structuredData) ? config.structuredData : [config.structuredData];
    }
    
    // Inject LocalBusiness Schema on Home page
    if (location.pathname === '/' || location.pathname === '/contato') {
      schemas.push(LOCAL_BUSINESS_SCHEMA);
    }

    if (schemas.length > 0) {
      schemas.forEach(schema => {
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-schema', 'true');
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

  }, [config, fullUrl, shouldNoindex]);

  return { fullUrl, baseUrl };
};