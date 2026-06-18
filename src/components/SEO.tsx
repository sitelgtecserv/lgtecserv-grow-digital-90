import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export const SEO = ({ title, description, canonicalUrl, noindex = false }: SEOProps) => {
  const siteUrl = "https://www.lgtecserv.com";
  
  // Ensure the canonical URL is an absolute URL
  const fullCanonicalUrl = canonicalUrl 
    ? (canonicalUrl.startsWith("http") ? canonicalUrl : `${siteUrl}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`)
    : undefined;

  return (
    <Helmet>
      {title && <title>{title} | LG TecServ</title>}
      {description && <meta name="description" content={description} />}
      
      {/* Canonical URL allows Google to know the primary version of a page */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Used for pages that should not be indexed (like 404s, admin, etc.) */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Fallback to index if noindex is false */}
      {!noindex && <meta name="robots" content="index,follow" />}
    </Helmet>
  );
};

export default SEO;
