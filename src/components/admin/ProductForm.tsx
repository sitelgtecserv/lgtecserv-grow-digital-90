import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from './ImageUploader';
import { pingProductIndexNow } from '@/utils/indexNow';
import { smartSlugify } from '@/utils/slugify';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  stock_alert_threshold: number;
}

interface ProductFormProps {
  mode?: 'create' | 'edit';
  product?: Product;
  onSuccess: () => void;
}

export const ProductForm = ({ mode = 'create', product, onSuccess }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [categoryId, setCategoryId] = useState(product?.category_id || '');
  const [stock, setStock] = useState(product?.stock.toString() || '0');
  const [stockAlertThreshold, setStockAlertThreshold] = useState(
    product?.stock_alert_threshold?.toString() || '5'
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    if (product?.id) {
      fetchProductImages();
    }
  }, [product?.id]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const fetchProductImages = async () => {
    if (!product?.id) return;

    try {
      const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', product.id)
        .order('display_order');

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  };

  const uploadImages = async (productId: string) => {
    const newImages = images.filter(img => img.file);

    for (const image of newImages) {
      try {
        const fileExt = image.file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, image.file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        await supabase.from('product_images').insert({
          product_id: productId,
          image_url: publicUrl,
          display_order: image.display_order,
          is_primary: image.is_primary,
        });
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        category_id: categoryId || null,
        stock: parseInt(stock),
        stock_alert_threshold: parseInt(stockAlertThreshold),
      };

      if (mode === 'edit' && product) {
        // Update product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        // Upload new images
        await uploadImages(product.id);

        toast({
          title: 'Produto atualizado!',
          description: 'O produto foi atualizado com sucesso.',
        });

        // 🔍 SEO: Pingar IndexNow para indexação instantânea no Bing
        const { data: updatedProduct } = await supabase
          .from('products')
          .select('slug, categories(slug)')
          .eq('id', product.id)
          .single();
        if (updatedProduct) {
          pingProductIndexNow(updatedProduct.slug, updatedProduct.categories?.slug)
            .then(() => console.log('[SEO] IndexNow pingado para produto atualizado'))
            .catch(() => {});
        }
      } else {
        // Insert product
        const newSlug = smartSlugify(name);
        const productDataWithSlug = { ...productData, slug: newSlug };

        const { data, error } = await supabase
          .from('products')
          .insert(productDataWithSlug)
          .select('*, categories(slug)')
          .single();

        if (error) throw error;

        // Upload images for new product
        if (data) {
          await uploadImages(data.id);

          // 🔍 SEO: Pingar IndexNow para indexação instantânea no Bing
          pingProductIndexNow(data.slug, data.categories?.slug)
            .then(() => console.log('[SEO] IndexNow pingado para novo produto'))
            .catch(() => {});
        }

        toast({
          title: 'Produto criado!',
          description: 'O produto foi adicionado com sucesso.',
        });
      }

      // Reset form only in create mode
      if (mode === 'create') {
        setName('');
        setDescription('');
        setPrice('');
        setCategoryId('');
        setStock('0');
        setStockAlertThreshold('5');
        setImages([]);
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: mode === 'edit' ? 'Erro ao atualizar produto' : 'Erro ao criar produto',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      {mode === 'create' && (
        <CardHeader>
          <CardTitle>Adicionar Novo Produto</CardTitle>
        </CardHeader>
      )}
      <CardContent className={mode === 'edit' ? 'pt-6' : ''}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Site Profissional"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Descrição *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!name.trim() || aiGenerating}
                onClick={async () => {
                  setAiGenerating(true);
                  try {
                    const { data, error } = await supabase.functions.invoke('ia-loja', {
                      body: { action: 'generate-description', prompt: `${name}${categoryId ? ' (categoria: ' + categories.find(c => c.id === categoryId)?.name + ')' : ''}` },
                    });
                    if (error) throw error;
                    if (data?.description) setDescription(data.description);
                  } catch (err: any) {
                    toast({ title: 'Erro IA', description: err.message, variant: 'destructive' });
                  } finally {
                    setAiGenerating(false);
                  }
                }}
                className="text-xs h-7 gap-1"
              >
                {aiGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                {aiGenerating ? 'Gerando...' : 'Gerar com IA (SEO)'}
              </Button>
            </div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o produto ou clique em 'Gerar com IA' para criar automaticamente..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (MZN) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Estoque *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockAlert">Alerta de Estoque</Label>
              <Input
                id="stockAlert"
                type="number"
                min="0"
                value={stockAlertThreshold}
                onChange={(e) => setStockAlertThreshold(e.target.value)}
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Imagens do Produto</Label>
            <ImageUploader
              productId={product?.id}
              images={images}
              onImagesChange={setImages}
            />
          </div>

          <Button type="submit" className="w-full" disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'edit' ? 'Atualizando...' : 'Criando produto...'}
              </>
            ) : mode === 'edit' ? (
              'Atualizar Produto'
            ) : (
              'Criar Produto'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
