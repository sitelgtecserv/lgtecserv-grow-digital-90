import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface PriceSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
}

export const PriceSlider = ({ value, onChange, min, max }: PriceSliderProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Faixa de Preço</Label>
        <span className="text-sm text-muted-foreground">
          {formatPrice(value[0])} - {formatPrice(value[1])}
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
        min={min}
        max={max}
        step={100}
        className="w-full"
      />
    </div>
  );
};
