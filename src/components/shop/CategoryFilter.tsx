import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  const getCategoryLabel = (cat: string) => {
    return cat === 'all' ? 'Todos' : cat;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge
            variant={selected === category ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => onSelect(category)}
          >
            {getCategoryLabel(category)}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};
