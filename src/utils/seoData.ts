// Base organization data
export const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LG TecServ",
  "description": "Empresa moçambicana especializada em soluções digitais completas: criação de sites, design gráfico, marketing digital, gestão de redes sociais e instalações elétricas.",
  "url": "https://www.lgtecserv.com",
  "logo": "https://www.lgtecserv.com/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.png",
  "image": "https://www.lgtecserv.com/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.png",
  "telephone": "+258869824047",
  "email": "info@lgtecserv.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MZ",
    "addressLocality": "Maputo",
    "addressRegion": "Maputo",
    "streetAddress": "Maputo, Moçambique"
  },
  "sameAs": [
    "https://www.facebook.com/lgtecserv",
    "https://www.instagram.com/lgtecserv",
    "https://wa.me/258869824047"
  ],
  "foundingDate": "2019",
  "numberOfEmployees": "5-10",
  "areaServed": {
    "@type": "Country",
    "name": "Moçambique"
  },
  "serviceType": [
    "Web Development",
    "Graphic Design", 
    "Digital Marketing",
    "Social Media Management",
    "Electrical Installations"
  ]
};

export const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LG TecServ",
  "description": "Soluções digitais completas em Moçambique",
  "url": "https://www.lgtecserv.com",
  "telephone": "+258869824047",
  "email": "info@lgtecserv.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MZ",
    "addressLocality": "Maputo",
    "addressRegion": "Maputo"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-25.9655",
    "longitude": "32.5832"
  },
  "openingHours": "Mo-Fr 08:00-18:00",
  "priceRange": "$$",
  "paymentAccepted": "Cash, Bank Transfer"
};

export const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LG TecServ",
  "url": "https://www.lgtecserv.com",
  "description": "Soluções digitais completas: criação de sites, design gráfico, marketing digital e instalações elétricas em Moçambique",
  "publisher": organizationData,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.lgtecserv.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const generateServiceData = (service: {
  name: string;
  description: string;
  url: string;
  price?: string;
  duration?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "url": service.url,
  "provider": organizationData,
  "areaServed": {
    "@type": "Country",
    "name": "Moçambique"
  },
  "serviceType": service.name,
  "offers": service.price ? {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": "MZN",
    "availability": "https://schema.org/InStock"
  } : undefined
});

export const generateBreadcrumbData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});