import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '@/components/shop/ProductCard';
import { Loader2 } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { useProductFilters } from '@/hooks/useProductFilters';
import { useProductSearch } from '@/hooks/useProductSearch';
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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  created_at: string;
  categories?: {
    name: string;
  } | null;
}

const Loja = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

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
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
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

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([productPriceRange.min, productPriceRange.max]);
    setSearchQuery('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Loja Online | LG TecServ - Produtos e Serviços"
        description="Explore nossa loja online com produtos e serviços de qualidade. Criação de sites, design gráfico, marketing digital e muito mais."
        keywords="loja online, produtos, serviços, LG TecServ, Moçambique"
        url="https://www.lgtecserv.com/loja"
      />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader onCartOpen={() => setCartDrawerOpen(true)} />

        <main className="container mx-auto px-4 py-8">
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
