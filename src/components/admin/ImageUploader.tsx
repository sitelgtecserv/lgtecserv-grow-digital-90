import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Upload, Star, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductImage {
  id?: string;
  image_url: string;
  display_order: number;
  is_primary: boolean;
  file?: File;
}

interface ImageUploaderProps {
  productId?: string;
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
}

export const ImageUploader = ({ productId, images, onImagesChange }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isUnder5MB = file.size <= 5 * 1024 * 1024;
      
      if (!isImage) {
        toast({
          title: 'Formato inválido',
          description: `${file.name} não é uma imagem`,
          variant: 'destructive',
        });
      }
      if (!isUnder5MB) {
        toast({
          title: 'Arquivo muito grande',
          description: `${file.name} excede 5MB`,
          variant: 'destructive',
        });
      }
      
      return isImage && isUnder5MB;
    });

    const newImages: ProductImage[] = validFiles.map((file, index) => ({
      image_url: URL.createObjectURL(file),
      display_order: images.length + index,
      is_primary: images.length === 0 && index === 0,
      file,
    }));

    onImagesChange([...images, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removeImage = async (index: number) => {
    const image = images[index];
    
    if (image.id && productId) {
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', image.id);
      
      if (error) {
        toast({
          title: 'Erro ao remover imagem',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
    }

    const newImages = images.filter((_, i) => i !== index);
    
    // Reajustar display_order
    newImages.forEach((img, i) => {
      img.display_order = i;
    });
    
    // Se removeu a primária, tornar a primeira como primária
    if (image.is_primary && newImages.length > 0) {
      newImages[0].is_primary = true;
    }
    
    onImagesChange(newImages);
  };

  const setPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      is_primary: i === index,
    }));
    onImagesChange(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);
    
    // Atualizar display_order
    newImages.forEach((img, i) => {
      img.display_order = i;
    });
    
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-1">
            Arraste imagens aqui ou clique para selecionar
          </p>
          <p className="text-xs text-muted-foreground">
            Máximo 5MB por imagem • JPG, PNG, WEBP
          </p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <div className="aspect-square bg-muted">
                <img
                  src={image.image_url}
                  alt={`Produto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setPrimary(index)}
                  title="Definir como principal"
                  disabled={image.is_primary}
                >
                  <Star className={`h-4 w-4 ${image.is_primary ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </Button>
                
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => removeImage(index)}
                  title="Remover imagem"
                >
                  <X className="h-4 w-4" />
                </Button>
                
                {index > 0 && (
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => moveImage(index, index - 1)}
                    title="Mover para esquerda"
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {image.is_primary && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-white" />
                  Principal
                </div>
              )}
              
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
