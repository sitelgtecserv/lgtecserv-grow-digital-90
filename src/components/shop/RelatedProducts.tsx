import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  slug: string;
  stock: number;
  categories?: { name: string; slug: string } | null;
  product_images?: Array<{ image_url: string; is_primary: boolean }>;
}

interface RelatedProductsProps {
  currentProductId: string;
  categoryId: string | null;
  categorySlug?: string | null;
}

export const RelatedProducts = ({ currentProductId, categoryId, categorySlug }: RelatedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRelatedProducts();
  }, [currentProductId, categoryId]);

  const fetchRelatedProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select('id, name, price, image_url, slug, stock, categories(name, slug), product_images(image_url, is_primary)')
        .neq('id', currentProductId)
        .gt('stock', 0)
        .limit(6);

      // Prioritize same category
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      let related = (data || []).map(p => ({
        ...p,
        image_url: p.image_url ||
          p.product_images?.find(img => img.is_primary)?.image_url ||
          p.product_images?.[0]?.image_url ||
          null,
      }));

      // If not enough from same category, fetch from other categories
      if (related.length < 4 && categoryId) {
        const { data: moreData } = await supabase
          .from('products')
          .select('id, name, price, image_url, slug, stock, categories(name, slug), product_images(image_url, is_primary)')
          .neq('id', currentProductId)
          .neq('category_id', categoryId)
          .gt('stock', 0)
          .order('created_at', { ascending: false })
          .limit(6 - related.length);

        const moreProducts = (moreData || []).map(p => ({
          ...p,
          image_url: p.image_url ||
            p.product_images?.find(img => img.is_primary)?.image_url ||
            p.product_images?.[0]?.image_url ||
            null,
        }));

        related = [...related, ...moreProducts];
      }

      setProducts(related);
    } catch (error) {
      console.error('Erro ao carregar produtos relacionados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section aria-label="Produtos Relacionados" className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Produtos Relacionados
        </h2>
        <p className="text-muted-foreground mt-1">
          Outros produtos que podem interessar
        </p>
      </div>

      <div className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
        {products.map((product, index) => {
          const productUrl = product.categories?.slug
            ? `/loja/${product.categories.slug}/${product.slug}`
            : `/produto/${product.slug}`;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card
                className="overflow-hidden cursor-pointer group hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                onClick={() => navigate(productUrl)}
              >
                <div className="aspect-square bg-muted relative overflow-hidden">
                  {product.stock > 0 && product.stock < 5 && (
                    <Badge className="absolute top-2 right-2 z-10 bg-orange-500/90 text-white border-0 text-[9px] sm:text-xs">
                      Últimas
                    </Badge>
                  )}
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={`${product.name} - ${product.categories?.name || 'produto'} - Comprar em Moçambique`}
                      title={product.name}
                      width="300"
                      height="300"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      Sem imagem
                    </div>
                  )}
                </div>
                <CardContent className="p-2 sm:p-3 flex-grow flex flex-col">
                  <h3 className="font-medium text-[10px] sm:text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-base font-bold text-primary mt-auto">
                    {product.price.toLocaleString('pt-MZ', {
                      style: 'currency',
                      currency: 'MZN',
                    })}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
