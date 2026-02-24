import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Percent, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase: number;
  max_uses: number | null;
  uses_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at: string;
}

export const CouponManager = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: '',
    min_purchase: '',
    max_uses: '',
    valid_until: '',
    is_active: true,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os cupons',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from('coupons').insert({
        code: formData.code.toUpperCase(),
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        min_purchase: formData.min_purchase ? parseFloat(formData.min_purchase) : 0,
        max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
        valid_until: new Date(formData.valid_until).toISOString(),
        is_active: formData.is_active,
      });

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Cupom criado com sucesso',
      });

      setFormData({
        code: '',
        discount_type: 'percentage',
        discount_value: '',
        min_purchase: '',
        max_uses: '',
        valid_until: '',
        is_active: true,
      });
      setShowForm(false);
      fetchCoupons();
    } catch (error: any) {
      console.error('Error creating coupon:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível criar o cupom',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('coupons').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Cupom excluído com sucesso',
      });
      fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o cupom',
        variant: 'destructive',
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: `Cupom ${!currentStatus ? 'ativado' : 'desativado'} com sucesso`,
      });
      fetchCoupons();
    } catch (error) {
      console.error('Error toggling coupon:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível alterar o status do cupom',
        variant: 'destructive',
      });
    }
  };

  const isExpired = (date: string) => new Date(date) < new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciar Cupons</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {showForm ? 'Cancelar' : 'Novo Cupom'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Criar Novo Cupom</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código do Cupom *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="ex: DESCONTO10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount_type">Tipo de Desconto *</Label>
                  <Select
                    value={formData.discount_type}
                    onValueChange={(value: 'percentage' | 'fixed') =>
                      setFormData({ ...formData, discount_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                      <SelectItem value="fixed">Valor Fixo (MTn)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount_value">
                    Valor do Desconto * {formData.discount_type === 'percentage' ? '(%)' : '(MTn)'}
                  </Label>
                  <Input
                    id="discount_value"
                    type="number"
                    step="0.01"
                    value={formData.discount_value}
                    onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                    placeholder={formData.discount_type === 'percentage' ? '10' : '100'}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min_purchase">Valor Mínimo de Compra (MTn)</Label>
                  <Input
                    id="min_purchase"
                    type="number"
                    step="0.01"
                    value={formData.min_purchase}
                    onChange={(e) => setFormData({ ...formData, min_purchase: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max_uses">Limite de Usos</Label>
                  <Input
                    id="max_uses"
                    type="number"
                    value={formData.max_uses}
                    onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                    placeholder="Ilimitado"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valid_until">Data de Validade *</Label>
                  <Input
                    id="valid_until"
                    type="datetime-local"
                    value={formData.valid_until}
                    onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Criar Cupom'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {coupons.map((coupon) => (
          <Card key={coupon.id}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{coupon.code}</h3>
                    <Badge variant={coupon.is_active ? 'default' : 'secondary'}>
                      {coupon.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                    {isExpired(coupon.valid_until) && (
                      <Badge variant="destructive">Expirado</Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      {coupon.discount_type === 'percentage' ? (
                        <Percent className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="font-medium">
                        {coupon.discount_type === 'percentage'
                          ? `${coupon.discount_value}% de desconto`
                          : `${coupon.discount_value.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })} de desconto`}
                      </span>
                    </div>

                    {coupon.min_purchase > 0 && (
                      <div className="text-muted-foreground">
                        Mín: {coupon.min_purchase.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                      </div>
                    )}

                    <div className="text-muted-foreground">
                      Usos: {coupon.uses_count}
                      {coupon.max_uses ? ` / ${coupon.max_uses}` : ' / Ilimitado'}
                    </div>

                    <div className="text-muted-foreground">
                      Validade: {new Date(coupon.valid_until).toLocaleDateString('pt-MZ')}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 border-t md:pt-0 md:border-t-0 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 md:flex-none"
                    onClick={() => toggleActive(coupon.id, coupon.is_active)}
                  >
                    {coupon.is_active ? 'Desativar' : 'Ativar'}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="flex-1 md:flex-none">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir cupom?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o cupom "{coupon.code}"? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(coupon.id)}>
                          Sim, excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {coupons.length === 0 && !showForm && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Nenhum cupom cadastrado ainda.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
