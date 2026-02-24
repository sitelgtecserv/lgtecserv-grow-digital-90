import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import SEOHead from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ImageGallery } from '@/components/shop/ImageGallery';
import { ProductReviews } from '@/components/shop/ProductReviews';
import { StarRating } from '@/components/shop/StarRating';
import { generateProductSchema } from '@/utils/productSchema';
import { generateBreadcrumbData } from '@/utils/seoData';
import { useSEO } from '@/hooks/useSEO';
import { metaPixel } from '@/utils/metaPixel';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  slug: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
  product_images?: Array<{
    image_url: string;
    is_primary: boolean;
    display_order: number;
  }>;
}

const ProductDetail = () => {
  const { slug, categorySlug } = useParams<{ slug: string; categorySlug?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart } = useCart();
  const { toast } = useToast();
  const { baseUrl } = useSEO({ title: '', description: '' });
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState<{ rating: number; reviewCount: number } | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    if (!slug) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *, 
          categories(name, slug),
          product_images(image_url, is_primary, display_order, id)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Processar produto para usar a imagem principal
      const processedProduct = {
        ...data,
        image_url: data.image_url ||
          data.product_images?.find(img => img.is_primary)?.image_url ||
          data.product_images?.[0]?.image_url ||
          null
      };

      setProduct(processedProduct);
      setImages(data.product_images || []);

      // 🎯 TRACKING: ViewContent
      metaPixel.viewContent({
        id: data.id,
        name: data.name,
        price: data.price,
        category: data.categories?.name,
      });

      // Buscar avaliações para Rich Snippets
      const { data: reviews } = await supabase
        .from("product_reviews")
        .select("rating")
        .eq("product_id", data.id);

      if (reviews && reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        setReviewData({
          rating: avgRating,
          reviewCount: reviews.length,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      navigate('/loja');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);

    toast({
      title: 'Produto adicionado',
      description: 'O produto foi adicionado ao carrinho com sucesso.',
    });
  };

  const productInCart = cart.find((item) => item.id === product?.id);

  const handleRemoveFromCart = () => {
    if (productInCart) {
      removeFromCart(productInCart.cartItemId);
      toast({
        title: 'Removido do carrinho',
        description: 'O produto foi removido do carrinho.',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Gerar schemas estruturados
  const productUrl = product.categories?.slug
    ? `/loja/${product.categories.slug}/${product.slug}`
    : `/produto/${product.slug}`;
  const categoryUrl = product.categories?.slug ? `/loja/${product.categories.slug}` : '/loja';

  const productSchema = generateProductSchema(product, baseUrl, reviewData || undefined);
  const breadcrumbSchema = generateBreadcrumbData([
    { name: 'Home', url: baseUrl },
    { name: 'Loja', url: `${baseUrl}/loja` },
    ...(product.categories?.name ? [{ name: product.categories.name, url: `${baseUrl}${categoryUrl}` }] : []),
    { name: product.name, url: `${baseUrl}${productUrl}` }
  ]);

  // Combinar schemas
  const structuredData = [productSchema, breadcrumbSchema];

  return (
    <>
      <SEOHead
        title={`${product.name} - Comprar em Moçambique | LG TecServ`}
        description={`${product.description.substring(0, 150)}... Preço: ${product.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}. ${product.stock > 0 ? 'Em estoque' : 'Sob consulta'}. Entrega rápida em Maputo. ${product.categories?.name || ''}`}
        keywords={`${product.name}, ${product.categories?.name || 'produtos'}, comprar ${product.name.toLowerCase()} moçambique, ${product.name.toLowerCase()} maputo, loja online moçambique`}
        image={product.image_url || undefined}
        url={`${baseUrl}${productUrl}`}
        type="website"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader />

        {/* Product Detail */}
        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Loja', href: '/loja' },
              ...(product.categories?.name ? [{
                label: product.categories.name,
                href: categoryUrl
              }] : []),
              { label: product.name }
            ]}
            className="mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
          >
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <ImageGallery images={images} productName={product.name} />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="space-y-6 lg:space-y-8 flex flex-col"
            >
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight lg:leading-tight">
                  {product.name}
                </h1>
                {reviewData && (
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={reviewData.rating} showValue size={20} />
                    <span className="text-sm font-medium text-muted-foreground">
                      ({reviewData.reviewCount} {reviewData.reviewCount === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  </div>
                )}
                <div className="flex items-center flex-wrap gap-2 pt-1 pb-2">
                  {product.categories?.name && (
                    <Badge variant="secondary" className="px-3 py-1 bg-secondary/60">{product.categories.name}</Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge variant="destructive" className="px-3 py-1 shadow-sm">Vendido</Badge>
                  )}
                  {product.stock > 0 && product.stock < 5 && (
                    <Badge className="bg-orange-500/90 text-white shadow-sm border-0 px-3 py-1">
                      Últimas {product.stock} unidades
                    </Badge>
                  )}
                </div>
                <p className="text-4xl sm:text-5xl font-black text-primary mb-6 drop-shadow-sm">
                  {product.price.toLocaleString('pt-MZ', {
                    style: 'currency',
                    currency: 'MZN',
                  })}
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <Separator />

              {product.stock > 0 && (
                <div className="text-sm text-muted-foreground">
                  <p>Disponível em estoque: {product.stock} unidades</p>
                </div>
              )}

              {/* Cart Status */}
              {productInCart && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      <span className="font-medium">Este produto está no seu carrinho</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFromCart}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Add to Cart Button */}
              {!productInCart ? (
                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  {product.stock === 0 ? 'Produto Vendido' : 'Adicionar ao Carrinho'}
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate('/carrinho')}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ver Carrinho
                </Button>
              )}

              {product.stock === 0 ? (
                <p className="text-sm text-destructive text-center font-medium">
                  Este produto já foi vendido.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  {productInCart
                    ? 'Este produto já está no seu carrinho.'
                    : 'Adicione o produto ao carrinho para finalizar seu pedido.'}
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Seção de Avaliações */}
          <div className="mt-12">
            <ProductReviews productId={product.id} />
          </div>
        </main>
        <BottomNav />
      </div>
    </>
  );
};

export default ProductDetail;
