import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductList } from '@/components/admin/ProductList';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Loader2, Shield, Package, Folder } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';

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

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        navigate('/loja');
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchProducts();
    }
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Painel de Administração | LG TecServ Loja Online"
        description="Painel administrativo da loja online LG TecServ"
        url="https://www.lgtecserv.com/admin"
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Painel de Administração</h1>
                <p className="text-sm text-muted-foreground">
                  Gerenciar produtos e categorias
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/loja')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para loja
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produtos
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                Categorias
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div>
                  <ProductForm onSuccess={fetchProducts} />
                </div>

                {/* List Section */}
                <div>
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">Produtos Cadastrados</h2>
                    <p className="text-muted-foreground">
                      Total: {products.length} produto
                      {products.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ProductList products={products} onDelete={fetchProducts} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="mt-6">
              <CategoryManager />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default Admin;
