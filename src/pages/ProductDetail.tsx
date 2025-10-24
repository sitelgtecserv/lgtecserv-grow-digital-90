import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, MessageCircle, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import SEOHead from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ImageGallery } from '@/components/shop/ImageGallery';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  categories?: {
    name: string;
  } | null;
}

const WHATSAPP_NUMBER = '258869824047'; // WhatsApp LG TecServ

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, removeFromCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);

      // Fetch product images
      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', id)
        .order('display_order');

      setImages(imagesData || []);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      navigate('/loja');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (!product) return;

    const message = `Olá! Tenho interesse no seguinte produto:\n\n` +
      `*${product.name}*\n\n` +
      `Descrição: ${product.description}\n\n` +
      `Preço: ${product.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}\n\n` +
      (product.image_url ? `Imagem: ${product.image_url}\n\n` : '') +
      `Gostaria de mais informações.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
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

  return (
    <>
        <SEOHead
        title={`${product.name} | Loja Online LG TecServ`}
        description={product.description}
        keywords={`${product.name}, ${product.categories?.name || 'produto'}, loja online, LG TecServ`}
        url={`https://www.lgtecserv.com/produto/${product.id}`}
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

              {/* WhatsApp Button */}
              <Button
                size="lg"
                className="w-full"
                onClick={handleWhatsAppClick}
                disabled={product.stock === 0}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {product.stock === 0
                  ? 'Produto Indisponível'
                  : 'Solicitar produto via WhatsApp'}
              </Button>

              {product.stock === 0 ? (
                <p className="text-sm text-destructive text-center">
                  Este produto está temporariamente esgotado.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  Clique no botão acima para enviar uma solicitação pelo WhatsApp com todos os
                  detalhes deste produto.
                </p>
              )}
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </>
  );
};

export default ProductDetail;
