import { useSEO, SEOConfig } from '@/hooks/useSEO';
import { organizationData, websiteData } from '@/utils/seoData';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps extends SEOConfig {
  children?: React.ReactNode;
}

const SEOHead: React.FC<SEOHeadProps> = ({ children, ...seoConfig }) => {
  const { fullUrl, baseUrl, shouldNoindex, schemas } = useSEO(seoConfig);

  // Add base structured data if not provided
  const finalSchemas = seoConfig.structuredData 
    ? schemas 
    : [...schemas, organizationData, websiteData];

  const defaultImage = `${baseUrl}/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.webp`;
  const image = seoConfig.image || defaultImage;

  return (
    <>
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="robots" content={shouldNoindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'} />
        {seoConfig.keywords && <meta name="keywords" content={seoConfig.keywords} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:type" content={seoConfig.type || 'website'} />
        <meta property="og:url" content={seoConfig.url || fullUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="LG TecServ" />
        <meta property="og:locale" content="pt_MZ" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.title} />
        <meta name="twitter:description" content={seoConfig.description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@lgtecserv" />

        {/* Canonical link */}
        {!shouldNoindex && <link rel="canonical" href={seoConfig.url || fullUrl} />}
        {!shouldNoindex && <link rel="alternate" hrefLang="pt-MZ" href={seoConfig.url || fullUrl} />}
        {!shouldNoindex && <link rel="alternate" hrefLang="x-default" href={seoConfig.url || fullUrl} />}

        {/* Structured Data */}
        {finalSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
      {children}
    </>
  );
};

export default SEOHead;