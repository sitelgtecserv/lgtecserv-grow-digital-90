import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter';
import { PriceSlider } from './PriceSlider';
import { Badge } from '@/components/ui/badge';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
  onReset: () => void;
  activeFiltersCount: number;
}

export const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minPrice,
  maxPrice,
  onReset,
  activeFiltersCount,
}: ProductFiltersProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg" className="relative">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle>Filtros</SheetTitle>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onReset}>
                <X className="mr-1 h-4 w-4" />
                Limpar
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6 overflow-auto max-h-[calc(80vh-120px)] pb-6">
          <div>
            <h3 className="font-semibold mb-3">Categorias</h3>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={onCategoryChange}
            />
          </div>

          <div>
            <PriceSlider
              value={priceRange}
              onChange={onPriceRangeChange}
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
