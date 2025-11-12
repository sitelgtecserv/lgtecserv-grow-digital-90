import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '@/components/shop/ProductCard';
import { Loader2 } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useProductSearch } from '@/hooks/useProductSearch';
import { generateProductListSchema } from '@/utils/productSchema';
import { useSEO } from '@/hooks/useSEO';
import { SearchBar } from '@/components/shop/SearchBar';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { SortDropdown } from '@/components/shop/SortDropdown';
import { ProductFilters } from '@/components/shop/ProductFilters';
import { EmptyState } from '@/components/shop/EmptyState';
import { SkeletonProductCard } from '@/components/shop/SkeletonProductCard';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CanonicalURL } from '@/components/seo/CanonicalURL';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  slug: string;
  created_at: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
  product_images?: Array<{
    image_url: string;
    is_primary: boolean;
    display_order: number;
  }>;
}

const Loja = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { baseUrl } = useSEO({ title: '', description: '' });
  const [allCategories, setAllCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);

  // Search & Filters
  const { searchQuery, setSearchQuery, debouncedQuery } = useProductSearch();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'newest'>('newest');
  
  // Get price range from products
  const productPriceRange = products.length > 0 
    ? {
        min: Math.floor(Math.min(...products.map(p => p.price))),
        max: Math.ceil(Math.max(...products.map(p => p.price)))
      }
    : { min: 0, max: 10000 };
  
  const [priceRange, setPriceRange] = useState<[number, number]>([
    productPriceRange.min,
    productPriceRange.max
  ]);

  // Update price range when products load
  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([productPriceRange.min, productPriceRange.max]);
    }
  }, [products.length]);

  const { filteredProducts, categories } = useProductFilters(products, {
    searchQuery: debouncedQuery,
    selectedCategory,
    priceRange,
    sortBy,
  });

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceRange[0] !== productPriceRange.min || priceRange[1] !== productPriceRange.max ? 1 : 0);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Set selected category based on URL param
  useEffect(() => {
    if (categorySlug && allCategories.length > 0) {
      const category = allCategories.find(c => c.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    } else if (!categorySlug) {
      setSelectedCategory('all');
    }
  }, [categorySlug, allCategories]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name');
      
      if (error) throw error;
      setAllCategories(data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name, slug),
          product_images(image_url, is_primary, display_order)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Processar produtos para usar a imagem principal ou primeira disponível
      const processedProducts = data?.map(product => ({
        ...product,
        image_url: product.image_url || 
          product.product_images?.find(img => img.is_primary)?.image_url || 
          product.product_images?.[0]?.image_url || 
          null
      })) || [];

      setProducts(processedProducts);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([productPriceRange.min, productPriceRange.max]);
    setSearchQuery('');
  };

  // Gerar structured data para os produtos filtrados
  const productListSchema = generateProductListSchema(filteredProducts.slice(0, 20), baseUrl);
  
  // Pegar categoria selecionada
  const selectedCategoryData = allCategories.find(c => c.id === selectedCategory);
  const selectedCategoryName = selectedCategoryData?.name;
  const canonicalPath = selectedCategoryData ? `/loja/${selectedCategoryData.slug}` : '/loja';

  // Build breadcrumbs
  const breadcrumbs = selectedCategoryName 
    ? [
        { label: 'Loja', href: '/loja' },
        { label: selectedCategoryName }
      ]
    : [];

  return (
    <>
      <SEOHead
        title={`Loja Online${selectedCategoryName ? ` - ${selectedCategoryName}` : ''} - Compre em Moçambique | LG TecServ`}
        description={`${selectedCategoryName ? `${selectedCategoryName}: ` : ''}Descubra nossa loja online com produtos de qualidade e entrega em todo Moçambique. Pagamento seguro, preços competitivos e atendimento personalizado. ${filteredProducts.length} produtos disponíveis.`}
        keywords={`loja online moçambique, comprar online maputo, ${selectedCategoryName ? selectedCategoryName.toLowerCase() + ' moçambique,' : ''} produtos online moçambique, entrega maputo`}
        type="website"
        url={`${baseUrl}${canonicalPath}`}
        structuredData={productListSchema}
      />
      <CanonicalURL baseUrl={baseUrl} canonicalPath={canonicalPath} />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader onCartOpen={() => setCartDrawerOpen(true)} />

        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          {/* Search & Filters Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Buscar produtos..."
                />
              </div>
              <div className="flex gap-2">
                <div className="md:hidden">
                  <ProductFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    minPrice={productPriceRange.min}
                    maxPrice={productPriceRange.max}
                    onReset={handleResetFilters}
                    activeFiltersCount={activeFiltersCount}
                  />
                </div>
                <SortDropdown value={sortBy} onChange={(val) => setSortBy(val as any)} />
              </div>
            </div>

            {/* Category Pills - Desktop */}
            <div className="hidden md:block">
              <CategoryFilter
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              type={products.length === 0 ? 'no-products' : 'no-results'}
              onAction={products.length > 0 ? handleResetFilters : isAdmin ? () => navigate('/admin') : undefined}
              actionLabel={products.length > 0 ? 'Limpar Filtros' : isAdmin ? 'Adicionar Produtos' : undefined}
            />
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <AnimatedProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </>
          )}
        </main>

        <CartDrawer open={cartDrawerOpen} onOpenChange={setCartDrawerOpen} />
        <BottomNav />
      </div>
    </>
  );
};

// Animated wrapper for ProductCard
const AnimatedProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <ProductCard product={product} />
    </motion.div>
  );
};

export default Loja;
