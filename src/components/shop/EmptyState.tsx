import { ShoppingBag, Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'no-products' | 'no-results' | 'empty-cart';
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyState = ({ type, onAction, actionLabel }: EmptyStateProps) => {
  const config = {
    'no-products': {
      icon: Package,
      title: 'Nenhum produto disponível',
      description: 'Em breve teremos produtos disponíveis para você.',
    },
    'no-results': {
      icon: Search,
      title: 'Nenhum resultado encontrado',
      description: 'Tente ajustar os filtros ou buscar por outros termos.',
    },
    'empty-cart': {
      icon: ShoppingBag,
      title: 'Seu carrinho está vazio',
      description: 'Adicione produtos para continuar suas compras.',
    },
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {onAction && actionLabel && (
        <Button onClick={onAction} size="lg">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
