import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { EmptyState } from '@/components/shop/EmptyState';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Carrinho = () => {
  const { user, loading: authLoading } = useAuth();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

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
        title="Carrinho de Compras | LG TecServ"
        description="Revise seus produtos e finalize sua compra na LG TecServ"
        keywords="carrinho, compras, LG TecServ"
        url="https://www.lgtecserv.com/carrinho"
      />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader />

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/loja')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Meu Carrinho</h1>
              <p className="text-muted-foreground">
                {cart.length} {cart.length === 1 ? 'item' : 'itens'} no carrinho
              </p>
            </div>
            {cart.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpar tudo
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar carrinho?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação removerá todos os produtos do seu carrinho. Tem certeza que deseja continuar?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => clearCart()}>
                      Sim, limpar carrinho
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {cart.length === 0 ? (
            <EmptyState
              type="empty-cart"
              onAction={() => navigate('/loja')}
              actionLabel="Ir para a Loja"
            />
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={item.cartItemId}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div
                          className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0 cursor-pointer"
                          onClick={() => navigate(`/produto/${item.id}`)}
                        >
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
                          <h3
                            className="font-semibold text-lg line-clamp-1 cursor-pointer hover:text-primary"
                            onClick={() => navigate(`/produto/${item.id}`)}
                          >
                          {item.name}
                          </h3>
                          {item.categories?.name && (
                            <p className="text-sm text-muted-foreground">
                              {item.categories.name}
                            </p>
                          )}
                          <p className="font-bold text-primary mt-2">
                            {item.price.toLocaleString('pt-MZ', {
                              style: 'currency',
                              currency: 'MZN',
                            })}
                          </p>

                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.cartItemId, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.cartItemId, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remover
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remover produto?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja remover "{item.name}" do carrinho?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => removeFromCart(item.cartItemId)}>
                                    Sim, remover
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {(item.price * item.quantity).toLocaleString('pt-MZ', {
                              style: 'currency',
                              currency: 'MZN',
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">
                          {getCartTotal().toLocaleString('pt-MZ', {
                            style: 'currency',
                            currency: 'MZN',
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Itens</span>
                        <span className="font-medium">{cart.length}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">
                          {getCartTotal().toLocaleString('pt-MZ', {
                            style: 'currency',
                            currency: 'MZN',
                          })}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => navigate('/checkout')}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Finalizar Pedido
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full mt-2"
                      onClick={() => navigate('/loja')}
                    >
                      Continuar Comprando
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Carrinho;
