import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, TrendingUp, ShoppingCart, DollarSign, Sparkles, Package, PenLine } from 'lucide-react';

interface OrderedProduct {
  id: string;
  name: string;
  count: number;
}

interface Stats {
  totalOrders: number;
  completedOrders: number;
  totalRevenue: number;
}

export const AiAdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [descLoading, setDescLoading] = useState(false);
  const [mostOrdered, setMostOrdered] = useState<OrderedProduct[]>([]);
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, completedOrders: 0, totalRevenue: 0 });
  const [insights, setInsights] = useState('');
  const [descPrompt, setDescPrompt] = useState('');
  const [descResult, setDescResult] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Produtos mais pedidos
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('product_id, product_name, quantity')
        .not('product_id', 'is', null);

      const orderCounts: Record<string, { name: string; count: number }> = {};
      orderItems?.forEach((o: any) => {
        if (o.product_id) {
          if (!orderCounts[o.product_id]) {
            orderCounts[o.product_id] = { name: o.product_name, count: 0 };
          }
          orderCounts[o.product_id].count += o.quantity;
        }
      });
      const sorted = Object.entries(orderCounts)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 10)
        .map(([id, data]) => ({ id, ...data }));
      setMostOrdered(sorted);

      // Stats
      const { data: orders } = await supabase.from('orders').select('total_amount, status');
      const totalOrders = orders?.length || 0;
      const completedOrders = orders?.filter((o: any) => o.status === 'completed').length || 0;
      const totalRevenue = orders?.filter((o: any) => o.status === 'completed')
        .reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0) || 0;
      setStats({ totalOrders, completedOrders, totalRevenue });
    } catch (err) {
      console.error('Erro analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async () => {
    setInsightsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ia-loja', {
        body: { action: 'ai-insights' },
      });
      if (error) throw error;
      setInsights(data?.insights || 'Sem dados suficientes.');
    } catch (err: any) {
      console.error('Erro insights:', err);
      setInsights('Erro ao gerar insights. Verifique se a Edge Function ia-loja está deployada no Lovable.');
    } finally {
      setInsightsLoading(false);
    }
  };

  const generateDescription = async () => {
    if (!descPrompt.trim()) return;
    setDescLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ia-loja', {
        body: { action: 'generate-description', prompt: descPrompt },
      });
      if (error) throw error;
      setDescResult(data?.description || 'Sem resultado.');
    } catch (err: any) {
      console.error('Erro descrição:', err);
      setDescResult('Erro ao gerar descrição. Verifique a Edge Function.');
    } finally {
      setDescLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-lg hidden sm:block">
              <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold font-price">{stats.totalOrders}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Pedidos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg hidden sm:block">
              <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold font-price">{stats.completedOrders}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Concluídos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2.5 rounded-lg hidden sm:block">
              <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg sm:text-2xl font-bold font-price">
                {stats.totalRevenue.toLocaleString('pt-MZ', { minimumFractionDigits: 0 })}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Receita (MTn)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Ordered + Description Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mostOrdered.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Ainda sem pedidos.</p>
            ) : (
              <div className="space-y-3">
                {mostOrdered.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground/50 w-6 font-price">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                    </div>
                    <Badge variant="default" className="font-price">{p.count} vendas</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Description Generator */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <PenLine className="h-5 w-5 text-purple-600" />
              Gerador de Descrições (IA)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={descPrompt}
              onChange={(e) => setDescPrompt(e.target.value)}
              placeholder="Ex: iPhone 15 Pro Max 256GB cor Titânio Natural, novo na caixa..."
              className="min-h-[80px] text-sm"
            />
            <Button size="sm" onClick={generateDescription} disabled={descLoading || !descPrompt.trim()} className="w-full">
              {descLoading ? <><Loader2 className="mr-2 h-3 w-3 animate-spin" />Gerando...</> : <><Sparkles className="mr-2 h-3 w-3" />Gerar Descrição</>}
            </Button>
            {descResult && (
              <div className="bg-muted p-3 rounded-lg text-sm whitespace-pre-wrap">
                {descResult}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs w-full"
                  onClick={() => navigator.clipboard.writeText(descResult)}
                >
                  📋 Copiar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Sugestões da IA
            </CardTitle>
            <Button variant="outline" size="sm" onClick={fetchInsights} disabled={insightsLoading}>
              {insightsLoading ? <><Loader2 className="mr-2 h-3 w-3 animate-spin" />Analisando...</> : <><Sparkles className="mr-2 h-3 w-3" />Gerar Análise</>}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {insights ? (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{insights}</div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Clique em "Gerar Análise" para a IA analisar o desempenho da loja.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
