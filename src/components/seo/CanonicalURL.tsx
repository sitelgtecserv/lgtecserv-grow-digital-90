import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface CanonicalURLProps {
  baseUrl: string;
  canonicalPath?: string;
}

export const CanonicalURL = ({ baseUrl, canonicalPath }: CanonicalURLProps) => {
  const location = useLocation();

  useEffect(() => {
    // Remove query parameters for canonical URL
    const path = canonicalPath || location.pathname;
    const canonical = `${baseUrl}${path}`;

    // Remove existing canonical tag if present
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', canonical);
    } else {
      // Create new canonical tag
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonical);
      document.head.appendChild(link);
    }

    return () => {
      // Cleanup on unmount
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag && !canonicalPath) {
        canonicalTag.remove();
      }
    };
  }, [baseUrl, canonicalPath, location.pathname]);

  return null;
};
