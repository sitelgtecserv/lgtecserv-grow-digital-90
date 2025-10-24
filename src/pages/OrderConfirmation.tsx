import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';

interface Order {
  id: string;
  status: string;
  total_amount: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  created_at: string;
}

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) {
      navigate('/loja');
      return;
    }

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error || !data) {
        console.error('Erro ao buscar pedido:', error);
        navigate('/loja');
        return;
      }

      setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) return null;

  const statusLabels: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    processing: 'Em Processamento',
    completed: 'Concluído',
    cancelled: 'Cancelado',
  };

  return (
    <>
      <SEOHead
        title="Pedido Confirmado | LG TecServ"
        description="Seu pedido foi recebido com sucesso"
        keywords="confirmação, pedido, LG TecServ"
        url="https://www.lgtecserv.com/confirmacao-pedido"
      />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader />

        <main className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Pedido Confirmado!</h1>
            <p className="text-muted-foreground">
              Obrigado pela sua compra. Seu pedido foi recebido com sucesso.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-sm text-muted-foreground">Número do Pedido</p>
                  <p className="font-mono font-semibold">#{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-primary">{statusLabels[order.status]}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Informações de Entrega
                </h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Nome:</span> {order.customer_name}</p>
                  <p><span className="text-muted-foreground">Telefone:</span> {order.customer_phone}</p>
                  <p><span className="text-muted-foreground">Endereço:</span> {order.customer_address}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    {order.total_amount.toLocaleString('pt-MZ', {
                      style: 'currency',
                      currency: 'MZN',
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Próximos Passos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Nossa equipe entrará em contato em breve via WhatsApp para confirmar os detalhes</li>
              <li>• Você receberá atualizações sobre o status do seu pedido</li>
              <li>• Você pode acompanhar seus pedidos na página "Meus Pedidos"</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/loja')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar Comprando
            </Button>
            <Button
              className="flex-1"
              onClick={() => navigate('/meus-pedidos')}
            >
              Ver Meus Pedidos
            </Button>
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default OrderConfirmation;
