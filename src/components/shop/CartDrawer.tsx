import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { EmptyState } from './EmptyState';

const WHATSAPP_NUMBER = '258869824047';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { cart, removeFromCart, clearCart, getCartTotal, getFinalTotal, coupon, getDiscount } = useCart();
  const navigate = useNavigate();

  const handleViewCart = () => {
    onOpenChange(false);
    navigate('/carrinho');
  };

  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };

  const handleWhatsAppClick = () => {
    if (cart.length === 0) return;
    let message = `Olá! Gostaria de solicitar os seguintes produtos:\n\n`;
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      message += `*${index + 1}. ${item.name}*\n`;
      message += `Quantidade: ${item.quantity}\n`;
      message += `Preço: ${item.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}\n`;
      message += `Subtotal: ${subtotal.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}\n\n`;
    });
    message += `------------------\n`;
    message += `*Total: ${getFinalTotal().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}*\n\n`;
    if (coupon) {
      message += `*Desconto (${coupon.code}): -${getDiscount().toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}*\n`;
    }
    message += `Aguardo retorno para confirmar o pedido.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`, '_blank');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Carrinho ({cart.length})
            </SheetTitle>
            {cart.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart}>
                <Trash2 className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
        </SheetHeader>

        {cart.length === 0 ? (
          <EmptyState
            type="empty-cart"
            onAction={() => onOpenChange(false)}
            actionLabel="Continuar Comprando"
          />
        ) : (
          <>
            <div className="flex-1 overflow-auto max-h-[60vh] space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-background flex-shrink-0">
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
                    <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                    <p className="font-bold text-primary mt-1">
                      {(item.price * item.quantity).toLocaleString('pt-MZ', {
                        style: 'currency',
                        currency: 'MZN',
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  {getFinalTotal().toLocaleString('pt-MZ', {
                    style: 'currency',
                    currency: 'MZN',
                  })}
                </span>
              </div>

              {/* WhatsApp como principal */}
              <Button variant="whatsapp" className="w-full" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Solicitar via WhatsApp
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={handleViewCart}>
                  Ver Carrinho
                </Button>
                <Button variant="outline" onClick={handleCheckout}>
                  Formulário
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
