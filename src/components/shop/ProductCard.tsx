import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  slug: string;
  created_at?: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const isNew = () => {
    if (!product.created_at) return false;
    const createdAt = new Date(product.created_at);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/auth');
      return;
    }
    addToCart(product);
  };

  const productUrl = product.categories?.slug
    ? `/loja/${product.categories.slug}/${product.slug}`
    : `/produto/${product.slug}`;

  return (
    <Card
      className="overflow-hidden bg-background border-border/40 hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.05)] transition-all duration-500 cursor-pointer group flex flex-col h-full"
      onClick={() => navigate(productUrl)}
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {product.stock === 0 && (
            <Badge variant="destructive" className="shadow-sm backdrop-blur-md">Vendido</Badge>
          )}
          {product.stock > 0 && product.stock < 5 && (
            <Badge className="bg-orange-500/90 text-white backdrop-blur-md shadow-sm border-0">Últimas unidades</Badge>
          )}
          {isNew() && product.stock > 0 && (
            <Badge className="bg-primary/95 text-primary-foreground backdrop-blur-md shadow-sm border-0">Novo</Badge>
          )}
        </div>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={`${product.name} - ${product.categories?.name || 'produto'} - Comprar em Moçambique | LG TecServ`}
            title={`${product.name} - ${product.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}`}
            width="400"
            height="400"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>
      <CardContent className="p-4 sm:p-5 flex-grow flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-base sm:text-lg tracking-tight group-hover:text-primary transition-colors line-clamp-1 sm:line-clamp-2">
            {product.name}
          </h3>
          {product.categories?.name && (
            <Badge variant="secondary" className="flex-shrink-0 bg-secondary/50">
              {product.categories.name}
            </Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="mt-auto pt-2">
          <p className="text-xl sm:text-2xl font-bold text-primary">
            {product.price.toLocaleString('pt-MZ', {
              style: 'currency',
              currency: 'MZN',
            })}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 sm:p-5 sm:pt-0 transform md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-out">
        <Button
          onClick={handleAddToCart}
          className="w-full h-9 sm:h-11 text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          {product.stock === 0 ? 'Vendido' : 'Adicionar'}
        </Button>
      </CardFooter>
    </Card>
  );
};
