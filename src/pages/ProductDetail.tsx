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
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ImageGallery } from '@/components/shop/ImageGallery';
import { ProductReviews } from '@/components/shop/ProductReviews';
import { StarRating } from '@/components/shop/StarRating';
import { generateProductSchema } from '@/utils/productSchema';
import { generateBreadcrumbData } from '@/utils/seoData';
import { useSEO } from '@/hooks/useSEO';

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
  } | null;
  product_images?: Array<{
    image_url: string;
    is_primary: boolean;
    display_order: number;
  }>;
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
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
          categories(name),
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
  const productSchema = generateProductSchema(product, baseUrl, reviewData || undefined);
  const breadcrumbSchema = generateBreadcrumbData([
    { name: 'Home', url: baseUrl },
    { name: 'Loja', url: `${baseUrl}/loja` },
    ...(product.categories?.name ? [{ name: product.categories.name, url: `${baseUrl}/loja?categoria=${product.category_id}` }] : []),
    { name: product.name, url: `${baseUrl}/produto/${product.slug}` }
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
        url={`${baseUrl}/produto/${product.slug}`}
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
              { label: product.categories?.name || 'Produto', href: `/loja` },
              { label: product.name }
            ]}
            className="mb-6"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Image Gallery */}
            <div>
              <ImageGallery images={images} productName={product.name} />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                {reviewData && (
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={reviewData.rating} showValue size={20} />
                    <span className="text-sm text-muted-foreground">
                      ({reviewData.reviewCount} {reviewData.reviewCount === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {product.categories?.name && (
                    <Badge variant="secondary">{product.categories.name}</Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge variant="destructive">Esgotado</Badge>
                  )}
                  {product.stock > 0 && product.stock < 5 && (
                    <Badge className="bg-yellow-500 text-white">
                      Últimas {product.stock} unidades
                    </Badge>
                  )}
                </div>
                <p className="text-3xl font-bold text-primary mb-4">
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
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.stock === 0 ? 'Produto Indisponível' : 'Adicionar ao Carrinho'}
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
                <p className="text-sm text-destructive text-center">
                  Este produto está temporariamente esgotado.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  {productInCart
                    ? 'Este produto já está no seu carrinho.'
                    : 'Adicione o produto ao carrinho para finalizar seu pedido.'}
                </p>
              )}
            </div>
          </div>

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
