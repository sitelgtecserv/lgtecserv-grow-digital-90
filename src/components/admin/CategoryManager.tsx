import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Badge } from '@/components/ui/badge';
import { Loader2, Trash2, Pencil, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar categorias',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const slug = generateSlug(formData.name);

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('categories')
          .update({
            name: formData.name,
            slug,
            description: formData.description || null,
          })
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: 'Categoria atualizada',
          description: 'A categoria foi atualizada com sucesso.',
        });
      } else {
        // Create
        const { error } = await supabase.from('categories').insert({
          name: formData.name,
          slug,
          description: formData.description || null,
        });

        if (error) throw error;

        toast({
          title: 'Categoria criada',
          description: 'A categoria foi adicionada com sucesso.',
        });
      }

      setFormData({ name: '', description: '' });
      setEditingId(null);
      fetchCategories();
    } catch (error: any) {
      toast({
        title: editingId ? 'Erro ao atualizar' : 'Erro ao criar',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || '',
    });
  };

  const handleDelete = async (categoryId: string) => {
    try {
      // Check if category has products
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', categoryId);

      if (count && count > 0) {
        toast({
          title: 'Não é possível deletar',
          description: `Esta categoria possui ${count} produto(s) vinculado(s).`,
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      toast({
        title: 'Categoria deletada',
        description: 'A categoria foi removida com sucesso.',
      });

      fetchCategories();
    } catch (error: any) {
      toast({
        title: 'Erro ao deletar',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Nome da Categoria *</Label>
              <Input
                id="categoryName"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ex: Laptop"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Descrição</Label>
              <Textarea
                id="categoryDescription"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descreva a categoria..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Atualizar Categoria
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Categoria
                  </>
                )}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categorias Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma categoria cadastrada ainda.
            </p>
          ) : (
            <>
              {/* Mobile View: Cards */}
              <div className="md:hidden grid gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="p-4 flex flex-col gap-3 border shadow-sm">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex flex-col gap-1 overflow-hidden">
                        <span className="font-semibold truncate">{category.name}</span>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge variant="secondary" className="text-xs shrink-0">{category.slug}</Badge>
                        </div>
                      </div>
                    </div>

                    {category.description && (
                      <p className="text-sm text-muted-foreground text-pretty line-clamp-3">
                        {category.description}
                      </p>
                    )}

                    <div className="flex justify-end gap-2 mt-2 pt-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="flex-1">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Apagar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Confirmar exclusão
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja deletar "{category.name}"?
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(category.id)}
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
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{category.slug}</Badge>
                        </TableCell>
                        <TableCell>
                          {category.description || (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(category)}
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
                                  <AlertDialogTitle>
                                    Confirmar exclusão
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja deletar "{category.name}"?
                                    Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(category.id)}
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
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
