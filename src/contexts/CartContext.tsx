import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  created_at?: string;
  categories?: {
    name: string;
  } | null;
}

interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
}

interface Coupon {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
}

interface CartContextType {
  cart: CartItem[];
  coupon: Coupon | null;
  addToCart: (product: Product) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  getCartTotal: () => number;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  getDiscount: () => number;
  getFinalTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  // Load cart and coupon from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedCoupon = localStorage.getItem('coupon');
    if (savedCoupon) {
      setCoupon(JSON.parse(savedCoupon));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (coupon) {
      localStorage.setItem('coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('coupon');
    }
  }, [coupon]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast({
        title: 'Quantidade atualizada',
        description: `${product.name} - Quantidade aumentada no carrinho`,
      });
    } else {
      const newItem: CartItem = {
        ...product,
        quantity: 1,
        cartItemId: `${product.id}-${Date.now()}`,
      };
      setCart([...cart, newItem]);
      toast({
        title: 'Adicionado ao carrinho',
        description: `${product.name} foi adicionado ao seu carrinho`,
      });
    }
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((item) => item.cartItemId === cartItemId);
    setCart(cart.filter((item) => item.cartItemId !== cartItemId));
    if (item) {
      toast({
        title: 'Removido do carrinho',
        description: `${item.name} foi removido do carrinho`,
      });
    }
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    localStorage.removeItem('coupon');
    toast({
      title: 'Carrinho limpo',
      description: 'Todos os produtos foram removidos do carrinho',
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      const cartTotal = getCartTotal();
      
      const { data, error } = await supabase.rpc('validate_coupon', {
        p_code: code.toUpperCase(),
        p_cart_total: cartTotal,
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const result = data[0];
        
        if (result.valid) {
          setCoupon({
            code: code.toUpperCase(),
            discount_type: result.discount_type,
            discount_value: result.discount_value,
          });
          toast({
            title: 'Cupom aplicado!',
            description: result.message,
          });
          return true;
        } else {
          toast({
            title: 'Erro ao aplicar cupom',
            description: result.message,
            variant: 'destructive',
          });
          return false;
        }
      }
      
      toast({
        title: 'Erro',
        description: 'Não foi possível validar o cupom',
        variant: 'destructive',
      });
      return false;
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao aplicar cupom',
        variant: 'destructive',
      });
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    toast({
      title: 'Cupom removido',
      description: 'O desconto foi removido do carrinho',
    });
  };

  const getDiscount = () => {
    if (!coupon) return 0;
    
    const cartTotal = getCartTotal();
    
    if (coupon.discount_type === 'percentage') {
      return (cartTotal * coupon.discount_value) / 100;
    } else {
      return coupon.discount_value;
    }
  };

  const getFinalTotal = () => {
    const total = getCartTotal();
    const discount = getDiscount();
    return Math.max(0, total - discount);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        coupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: cart.length,
        getCartTotal,
        applyCoupon,
        removeCoupon,
        getDiscount,
        getFinalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
