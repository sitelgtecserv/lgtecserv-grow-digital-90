// Performance utilities for SEO optimization

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

// Preload critical images
export const preloadImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = src;
  link.as = 'image';
  document.head.appendChild(link);
};

// DNS prefetch for external domains
export const dnsPrefetch = (domain: string) => {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = domain;
  document.head.appendChild(link);
};

// Preconnect to critical domains
export const preconnect = (domain: string) => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  document.head.appendChild(link);
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // DNS prefetch for external services
  dnsPrefetch('//www.google-analytics.com');
  dnsPrefetch('//fonts.googleapis.com');
  dnsPrefetch('//api.whatsapp.com');
  
  // Preconnect to critical services
  preconnect('https://fonts.gstatic.com');
  
  // Preload critical images
  preloadImage('/lovable-uploads/7c383221-e93f-4908-a3ab-03f2194a4b5b.png');
  
  // Set up Service Worker for caching (if available)
  if ('serviceWorker' in navigator && 'caches' in window) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, ignore silently
    });
  }
};

// Image optimization helper
export const optimizeImage = (src: string, width?: number, height?: number): string => {
  // For future integration with image optimization service
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', '85'); // Quality 85%
  params.append('f', 'webp'); // WebP format
  
  // Return original for now, can be enhanced with CDN
  return src;
};