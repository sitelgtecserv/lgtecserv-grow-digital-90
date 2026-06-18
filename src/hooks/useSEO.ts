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
  "image": "https://www.lgtecserv.com/lovable-uploads/lg-tecserv-logo-seo.webp",
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

  let schemas = [];
  if (config.structuredData) {
    schemas = Array.isArray(config.structuredData) ? config.structuredData : [config.structuredData];
  }
  
  // Inject LocalBusiness Schema on Home page
  if (location.pathname === '/' || location.pathname === '/contato') {
    schemas.push(LOCAL_BUSINESS_SCHEMA);
  }

  return { fullUrl, baseUrl, shouldNoindex, schemas };
};