import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProductEditDialog } from './ProductEditDialog';
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
} from '@/components/ui/alert-dialog';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  stock_alert_threshold: number;
  categories?: {
    name: string;
  } | null;
}

interface ProductListProps {
  products: Product[];
  onDelete: () => void;
}

export const ProductList = ({ products, onDelete }: ProductListProps) => {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setEditingProduct(null);
    setDialogOpen(false);
    onDelete(); // Refresh the list
  };

  const handleDelete = async (productId: string, imageUrl: string | null) => {
    try {
      // Tentar remover o produto
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        if (error.code === '23503' || error.message.includes('foreign key constraint')) {
          throw new Error('Não é possível apagar porque já existem encomendas. Para o ocultar da loja, clica em "Editar" e coloca o Estoque a 0 (passará a Vendido).');
        }
        throw error;
      }

      // Se a exclusão na bd for bem sucedida, apagamos a imagem do storage
      if (imageUrl) {
        const path = imageUrl.split('/').pop();
        if (path) {
          await supabase.storage.from('product-images').remove([path]);
        }
      }

      toast({
        title: 'Produto deletado',
        description: 'O produto foi removido com sucesso.',
      });

      onDelete();
    } catch (error: any) {
      toast({
        title: 'Erro ao deletar produto',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (products.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhum produto cadastrado ainda.</p>
      </Card>
    );
  }

  return (
    <>
      {/* Mobile View: Cards */}
      <div className="md:hidden grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4 flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-muted-foreground p-1 text-center">
                    Sem imagem
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <span className="font-semibold">{product.name}</span>
                <span className="text-sm font-medium">
                  {product.price.toLocaleString('pt-MZ', {
                    style: 'currency',
                    currency: 'MZN',
                  })}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  {product.categories?.name && (
                    <Badge variant="secondary" className="text-xs">
                      {product.categories.name}
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge variant="destructive" className="text-[10px]">
                      Vendido
                    </Badge>
                  )}
                  {product.stock > 0 && product.stock < product.stock_alert_threshold && (
                    <Badge variant="default" className="text-[10px] bg-yellow-500">
                      Estoque Baixo ({product.stock})
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-auto border-t pt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(product)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Apagar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja deletar "{product.name}"? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(product.id, product.image_url)}
                    >
                      Deletar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View: Table */}
      <Card className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-16 h-16 bg-muted rounded overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        Sem imagem
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {product.categories?.name ? (
                    <Badge variant="secondary">{product.categories.name}</Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{product.stock}</span>
                    {product.stock === 0 && (
                      <Badge variant="destructive" className="text-xs">
                        Vendido
                      </Badge>
                    )}
                    {product.stock > 0 &&
                      product.stock < product.stock_alert_threshold && (
                        <Badge variant="default" className="text-xs bg-yellow-500">
                          Baixo
                        </Badge>
                      )}
                  </div>
                </TableCell>
                <TableCell>
                  {product.price.toLocaleString('pt-MZ', {
                    style: 'currency',
                    currency: 'MZN',
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja deletar "{product.name}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product.id, product.image_url)}
                          >
                            Deletar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <ProductEditDialog
        product={editingProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};
