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
  category: string | null;
}

interface ProductCardProps {
  product: Product & { created_at?: string };
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

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/produto/${product.id}`)}
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        {isNew() && (
          <Badge className="absolute top-2 left-2 z-10 bg-gradient-to-r from-primary to-primary/80">
            Novo
          </Badge>
        )}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          {product.category && <Badge variant="secondary" className="flex-shrink-0">{product.category}</Badge>}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
        <p className="text-2xl font-bold text-primary">
          {product.price.toLocaleString('pt-MZ', {
            style: 'currency',
            currency: 'MZN',
          })}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
};
