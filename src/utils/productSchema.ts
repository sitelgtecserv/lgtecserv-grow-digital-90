import { organizationData } from './seoData';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  slug: string;
  stock: number;
  categories?: {
    name: string;
  } | null;
}

interface ReviewData {
  rating: number;
  reviewCount: number;
}

export const generateProductSchema = (
  product: Product, 
  baseUrl: string, 
  reviewData?: ReviewData
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image_url ? {
      "@type": "ImageObject",
      "url": product.image_url,
      "width": "800",
      "height": "800",
      "caption": product.name
    } : undefined,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "LG TecServ"
    },
    "category": product.categories?.name || "Produtos",
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/produto/${product.slug}`,
      "priceCurrency": "MZN",
      "price": product.price.toString(),
      "availability": product.stock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": organizationData,
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  };

  // Adicionar aggregateRating para Rich Snippets se houver avaliações
  if (reviewData && reviewData.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": reviewData.rating.toFixed(1),
      "reviewCount": reviewData.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  return schema;
};

export const generateProductListSchema = (products: Product[], baseUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "url": `${baseUrl}/produto/${product.slug}`,
        "image": product.image_url,
        "offers": {
          "@type": "Offer",
          "price": product.price.toString(),
          "priceCurrency": "MZN",
          "availability": product.stock > 0 
            ? "https://schema.org/InStock" 
            : "https://schema.org/OutOfStock"
        }
      }
    }))
  };
};
