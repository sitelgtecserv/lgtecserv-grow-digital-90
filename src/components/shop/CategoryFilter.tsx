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
    <div className="flex flex-wrap gap-2">
      <motion.div
        key="all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Badge
          variant={selected === 'all' ? 'default' : 'outline'}
          className="cursor-pointer px-4 py-2 text-sm"
          onClick={() => handleCategoryClick('all')}
        >
          Todos
        </Badge>
      </motion.div>
      {categories.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge
            variant={selected === category.id ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};
