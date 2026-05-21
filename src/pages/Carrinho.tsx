import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle, Tag, X, Gift } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { EmptyState } from '@/components/shop/EmptyState';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
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

const WHATSAPP_NUMBER = '258869824047';

const Carrinho = () => {
  const { cart, coupon, removeFromCart, updateQuantity, clearCart, getCartTotal, applyCoupon, removeCoupon, getDiscount, getFinalTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    await applyCoupon(couponCode.trim());
    setIsApplyingCoupon(false);
    setCouponCode('');
  };

  const handleWhatsAppClick = () => {
    if (cart.length === 0) return;
    let message = `Olá! Gostaria de solicitar os seguintes produtos:\n\n`;
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      message += `*${index + 1}. ${item.name}*\n`;
      message += `Quantidade: ${item.quantity}\n`;
      message += `Preço unitário: ${item.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}\n`;
      message += `Subtotal: ${subtotal.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}\n\n`;
    });
    message += `------------------\n`;
    message += `*Subtotal: ${getCartTotal().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}*\n`;
    if (coupon) {
      const discount = getDiscount();
      message += `*Desconto (${coupon.code}): -${discount.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}*\n`;
    }
    message += `*Total: ${getFinalTotal().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}*\n\n`;
    message += `Aguardo retorno para confirmar o pedido.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`, '_blank');
  };

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
          <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center gap-4 mb-6">
            <div className="flex items-center gap-3 flex-1">
              <Button variant="ghost" size="icon" onClick={() => navigate('/loja')} className="h-9 w-9 shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl min-[360px]:text-3xl font-bold">Meu Carrinho</h1>
                <p className="text-xs min-[360px]:text-sm text-muted-foreground">
                  {cart.length} {cart.length === 1 ? 'item' : 'itens'} no carrinho
                </p>
              </div>
            </div>
            {cart.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="self-end min-[480px]:self-auto text-xs min-[360px]:text-sm">
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
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
                    <CardContent className="p-2.5 sm:p-4">
                      <div className="flex gap-3 sm:gap-4">
                        <div
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-muted flex-shrink-0 cursor-pointer"
                          onClick={() => navigate(`/produto/${item.id}`)}
                        >
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px]">Sem imagem</div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col min-[540px]:flex-row justify-between gap-3 min-w-0">
                          <div className="flex-1 min-w-0 space-y-1">
                            <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2 cursor-pointer hover:text-primary leading-snug" onClick={() => navigate(`/produto/${item.id}`)}>
                              {item.name}
                            </h3>
                            {item.categories?.name && (
                              <p className="text-xs text-muted-foreground">{item.categories.name}</p>
                            )}
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">Preço:</span>
                              <span className="font-semibold text-xs sm:text-sm text-foreground">
                                {item.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mt-2">
                              <div className="flex items-center gap-1 bg-muted/50 p-0.5 rounded-lg border border-border/40">
                                <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-7 sm:w-7 rounded-md" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>
                                  <Minus className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                                </Button>
                                <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                                <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-7 sm:w-7 rounded-md" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                                  <Plus className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                                </Button>
                              </div>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-10 sm:h-8 px-2.5 sm:px-2 text-destructive hover:bg-destructive/10 hover:text-destructive text-xs rounded-lg">
                                    <Trash2 className="h-4 w-4 sm:h-3.5 sm:w-3.5 mr-1" />Remover
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remover produto?</AlertDialogTitle>
                                    <AlertDialogDescription>Tem certeza que deseja remover "{item.name}" do carrinho?</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => removeFromCart(item.cartItemId)}>Sim, remover</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          
                          <div className="flex min-[540px]:flex-col items-baseline min-[540px]:items-end justify-between min-[540px]:justify-start border-t min-[540px]:border-t-0 pt-2 min-[540px]:pt-0 border-border/40 mt-1 min-[540px]:mt-0">
                            <span className="text-xs text-muted-foreground min-[540px]:hidden">Subtotal:</span>
                            <p className="font-extrabold text-sm sm:text-base text-primary">
                              {(item.price * item.quantity).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-3 sm:p-6">
                    <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                    
                    {/* Coupon Section */}
                    <div className="mb-6 space-y-3">
                      {!coupon ? (
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Código do cupom" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()} className="pl-9" />
                          </div>
                          <Button variant="outline" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode.trim()}>
                            {isApplyingCoupon ? 'Aplicando...' : 'Aplicar'}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">{coupon.code}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={removeCoupon} className="h-6 w-6 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{getCartTotal().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>
                      </div>
                      {coupon && (
                        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                          <span>Desconto ({coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : 'Fixo'})</span>
                          <span className="font-medium">-{getDiscount().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Itens</span>
                        <span className="font-medium">{cart.length}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">{getFinalTotal().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>
                      </div>
                    </div>

                    {/* WhatsApp como principal */}
                    <Button size="lg" variant="whatsapp" className="w-full" onClick={handleWhatsAppClick}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Solicitar via WhatsApp
                    </Button>

                    <Button size="lg" variant="outline" className="w-full mt-2" onClick={() => navigate('/checkout')}>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Finalizar com Formulário
                    </Button>

                    {/* Incentivo ao login */}
                    {!user && (
                      <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Gift className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold text-primary">Programa de Fidelidade</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Crie uma conta para acumular compras e ganhar um brinde após 3 pedidos!
                        </p>
                      </div>
                    )}
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
