import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  selected: string;
  onSelect: (categoryId: string) => void;
}

export const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleCategoryClick = (category: Category | 'all') => {
    if (category === 'all') {
      onSelect('all');
      navigate('/loja');
    } else {
      onSelect(category.id);
      navigate(`/loja/${category.slug}`);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <motion.div
        key="all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex-shrink-0"
      >
        <Badge
          variant={selected === 'all' ? 'default' : 'secondary'}
          className={`cursor-pointer px-5 py-2.5 text-sm font-medium transition-colors ${selected === 'all'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary/50 hover:bg-secondary text-secondary-foreground border-transparent'
            }`}
          onClick={() => handleCategoryClick('all')}
        >
          Todos
        </Badge>
      </motion.div>
      {categories.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-shrink-0"
        >
          <Badge
            variant={selected === category.id ? 'default' : 'secondary'}
            className={`cursor-pointer px-5 py-2.5 text-sm font-medium transition-colors ${selected === category.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary/50 hover:bg-secondary text-secondary-foreground border-transparent'
              }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};
