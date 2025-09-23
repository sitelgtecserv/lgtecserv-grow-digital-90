import { useSEO, SEOConfig } from '@/hooks/useSEO';
import { organizationData, websiteData } from '@/utils/seoData';

interface SEOHeadProps extends SEOConfig {
  children?: React.ReactNode;
}

const SEOHead: React.FC<SEOHeadProps> = ({ children, ...seoConfig }) => {
  const { baseUrl } = useSEO(seoConfig);

  // Add base structured data if not provided
  if (!seoConfig.structuredData) {
    seoConfig.structuredData = [organizationData, websiteData];
  }

  return <>{children}</>;
};

export default SEOHead;