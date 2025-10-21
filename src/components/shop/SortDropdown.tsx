import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <ArrowUpDown className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Mais recentes</SelectItem>
        <SelectItem value="name">Nome (A-Z)</SelectItem>
        <SelectItem value="price-asc">Preço (menor)</SelectItem>
        <SelectItem value="price-desc">Preço (maior)</SelectItem>
      </SelectContent>
    </Select>
  );
};
