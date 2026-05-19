import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, MessageCircle, UserPlus, Gift } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { EmptyState } from '@/components/shop/EmptyState';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { metaPixel } from '@/utils/metaPixel';

const WHATSAPP_NUMBER = '258869824047';

const checkoutSchema = z.object({
  customer_name: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100),
  customer_phone: z.string().trim().regex(/^[0-9+\s()-]+$/, 'Formato de telefone inválido').min(9).max(20),
  customer_address: z.string().trim().min(10, 'Endereço deve ter pelo menos 10 caracteres').max(500),
  notes: z.string().max(1000).optional(),
});

const Checkout = () => {
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart, coupon, getDiscount, getFinalTotal } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setCustomerName(data.customerName || '');
        setCustomerPhone(data.customerPhone || '');
        setCustomerAddress(data.customerAddress || '');
        setNotes(data.notes || '');
        localStorage.removeItem('checkoutData');
      } catch (error) {
        console.error('Erro ao recuperar dados do checkout:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      metaPixel.initiateCheckout(
        cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, category: item.categories?.name })),
        getCartTotal()
      );
    }
  }, []);

  const validateForm = () => {
    try {
      checkoutSchema.parse({ customer_name: customerName, customer_phone: customerPhone, customer_address: customerAddress, notes });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => { if (err.path[0]) newErrors[err.path[0].toString()] = err.message; });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleWhatsAppClick = () => {
    if (cart.length === 0) return;
    if (!validateForm()) {
      toast({ title: 'Preencha seus dados', description: 'Por favor, preencha nome, telefone e endereço.', variant: 'destructive' });
      return;
    }
    let message = `Olá! Gostaria de solicitar os seguintes produtos:\n\n`;
    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*\nQuantidade: ${item.quantity}\nPreço: ${item.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}\nSubtotal: ${(item.price * item.quantity).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}\n\n`;
    });
    message += `------------------\n*Total: ${getFinalTotal().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}*\n\n`;
    if (coupon) message += `*Desconto (${coupon.code}): -${getDiscount().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}*\n`;
    message += `*Dados de entrega:*\nNome: ${customerName}\nTelefone: ${customerPhone}\nEndereço: ${customerAddress}\n`;
    if (notes) message += `Observações: ${notes}\n`;
    message += `\nAguardo retorno para confirmar o pedido.`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) { toast({ title: 'Erro de validação', description: 'Por favor, corrija os erros no formulário.', variant: 'destructive' }); return; }
    setSubmitting(true);
    try {
      for (const item of cart) {
        const { data: product } = await supabase.from('products').select('stock').eq('id', item.id).single();
        if (!product || product.stock < item.quantity) {
          toast({ title: 'Estoque insuficiente', description: `Produto "${item.name}" não tem estoque disponível.`, variant: 'destructive' });
          setSubmitting(false);
          return;
        }
      }
      const { data: order, error: orderError } = await supabase.from('orders').insert({
        user_id: user?.id || null,
        total_amount: getFinalTotal(),
        status: 'pending',
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        notes: notes || null,
      }).select().single();
      if (orderError) throw orderError;
      const orderItems = cart.map((item) => ({ order_id: order.id, product_id: item.id, quantity: item.quantity, price_at_purchase: item.price, product_name: item.name }));
      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;
      for (const item of cart) {
        const { data: product } = await supabase.from('products').select('stock').eq('id', item.id).single();
        if (product) await supabase.from('products').update({ stock: product.stock - item.quantity }).eq('id', item.id);
      }
      metaPixel.purchase(cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, category: item.categories?.name })), getFinalTotal(), order.id);
      clearCart();
      toast({ title: 'Pedido realizado!', description: 'Seu pedido foi criado com sucesso.' });
      navigate(`/confirmacao-pedido?orderId=${order.id}`);
    } catch (error: any) {
      console.error('Erro ao criar pedido:', error);
      toast({ title: 'Erro ao criar pedido', description: error.message || 'Ocorreu um erro ao processar seu pedido.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead title="Finalizar Pedido | LG TecServ" description="Finalize sua compra" keywords="checkout, finalizar pedido, LG TecServ" url="https://www.lgtecserv.com/checkout" />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate('/carrinho')}><ArrowLeft className="h-5 w-5" /></Button>
            <div>
              <h1 className="text-3xl font-bold">Finalizar Pedido</h1>
              <p className="text-muted-foreground">Preencha seus dados para finalizar a compra</p>
            </div>
          </div>

          {!user && (
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Crie uma conta e ganhe benefícios!</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">Com uma conta, seu pedido fica registado no histórico e após 3 compras você ganha um brinde especial.</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/40"
                  onClick={() => { localStorage.setItem('checkoutData', JSON.stringify({ customerName, customerPhone, customerAddress, notes })); navigate('/auth?redirect=/checkout'); }}>
                  <UserPlus className="mr-1 h-3 w-3" />Criar conta
                </Button>
              </div>
            </div>
          )}

          {cart.length === 0 ? (
            <EmptyState type="empty-cart" onAction={() => navigate('/loja')} actionLabel="Ir para a Loja" />
          ) : (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Informações de Entrega</h2>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Seu nome completo" required />
                      {errors.customer_name && <p className="text-sm text-destructive">{errors.customer_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input id="phone" type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="+258 XX XXX XXXX" required />
                      {errors.customer_phone && <p className="text-sm text-destructive">{errors.customer_phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço de Entrega *</Label>
                      <Textarea id="address" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Rua, número, bairro, cidade" rows={3} required />
                      {errors.customer_address && <p className="text-sm text-destructive">{errors.customer_address}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Observações (opcional)</Label>
                      <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Instruções especiais, horário preferido, etc." rows={3} />
                      {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.cartItemId} className="flex justify-between text-sm">
                          <span className="flex-1">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                          <span className="font-medium">{(item.price * item.quantity).toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-primary">{getFinalTotal().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>
                      </div>
                    </div>
                    <Button type="button" size="lg" variant="whatsapp" className="w-full" onClick={handleWhatsAppClick}>
                      <MessageCircle className="mr-2 h-4 w-4" />Solicitar via WhatsApp
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">ou</span></div>
                    </div>
                    <Button type="submit" size="lg" variant="outline" className="w-full" disabled={submitting}>
                      {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processando...</>) : 'Confirmar Pedido pelo Site'}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">Nossa equipe entrará em contato para confirmar os detalhes e o pagamento</p>
                  </CardContent>
                </Card>
              </div>
            </form>
          )}
        </main>
        <BottomNav />
      </div>
    </>
  );
};

export default Checkout;
