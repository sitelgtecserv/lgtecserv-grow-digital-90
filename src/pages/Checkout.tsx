import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { EmptyState } from '@/components/shop/EmptyState';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { useEffect } from 'react';

const WHATSAPP_NUMBER = '258869824047';

const Checkout = () => {
  const { user, loading: authLoading } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleWhatsAppCheckout = () => {
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n   Quantidade: ${item.quantity}\n   Preço unitário: ${item.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}\n   Subtotal: ${(item.price * item.quantity).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}`
      )
      .join('\n\n');

    const total = getCartTotal().toLocaleString('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
    });

    const message = `Olá! Gostaria de finalizar meu pedido:\n\n${itemsList}\n\n*Total do Pedido: ${total}*\n\nAguardo confirmação. Obrigado!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after sending
    clearCart();
    navigate('/loja');
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Finalizar Pedido | LG TecServ"
        description="Finalize sua compra via WhatsApp"
        keywords="checkout, finalizar pedido, LG TecServ"
        url="https://www.lgtecserv.com/checkout"
      />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/carrinho')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Finalizar Pedido</h1>
              <p className="text-muted-foreground">
                Revise seu pedido antes de enviar
              </p>
            </div>
          </div>

          {cart.length === 0 ? (
            <EmptyState
              type="empty-cart"
              onAction={() => navigate('/loja')}
              actionLabel="Ir para a Loja"
            />
          ) : (
            <div className="space-y-6">
              {/* Order Items */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Itens do Pedido</h2>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="flex items-center gap-4 pb-4 border-b last:border-0"
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              Sem imagem
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            {(item.price * item.quantity).toLocaleString('pt-MZ', {
                              style: 'currency',
                              currency: 'MZN',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Resumo Final</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'itens'})
                      </span>
                      <span className="font-medium">
                        {getCartTotal().toLocaleString('pt-MZ', {
                          style: 'currency',
                          currency: 'MZN',
                        })}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-primary">
                          {getCartTotal().toLocaleString('pt-MZ', {
                            style: 'currency',
                            currency: 'MZN',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Info */}
              <Card className="bg-gradient-primary">
                <CardContent className="p-6 text-white">
                  <h2 className="text-xl font-bold mb-2">Enviar Pedido via WhatsApp</h2>
                  <p className="text-sm opacity-90 mb-4">
                    Clique no botão abaixo para enviar seu pedido diretamente para nosso WhatsApp.
                    Nossa equipe entrará em contato para confirmar os detalhes e finalizar sua compra.
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full"
                    onClick={handleWhatsAppCheckout}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Enviar Pedido via WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => navigate('/carrinho')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Carrinho
              </Button>
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Checkout;
