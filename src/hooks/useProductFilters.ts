import { useMemo } from 'react';

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
}

interface FilterOptions {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'newest';
}

export const useProductFilters = (
  products: Product[],
  filters: FilterOptions
) => {
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.selectedCategory && filters.selectedCategory !== 'all') {
      result = result.filter((p) => p.category_id === filters.selectedCategory);
    }

    // Price range filter
    const [minPrice, maxPrice] = filters.priceRange;
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sort
    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Already sorted by created_at desc from query
        break;
    }

    return result;
  }, [products, filters]);

  const categories = useMemo(() => {
    // Categories are now fetched directly in CategoryFilter component
    // This is kept for compatibility but not used
    return ['all'];
  }, [products]);

  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 10000 };
    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  return {
    filteredProducts,
    categories,
    priceRange,
  };
};
