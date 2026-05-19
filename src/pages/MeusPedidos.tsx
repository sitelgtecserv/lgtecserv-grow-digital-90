import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, MessageCircle, Gift, History, Star, UserPlus, LogIn, ShoppingBag } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { EmptyState } from '@/components/shop/EmptyState';

interface Order {
  id: string;
  status: string;
  total_amount: number;
  customer_name: string;
  created_at: string;
}

const WHATSAPP_NUMBER = '258869824047';

// Componente de progresso de fidelidade
const LoyaltyProgress = ({ completedOrders }: { completedOrders: number }) => {
  const target = 3;
  const progress = Math.min(completedOrders, target);
  const percentage = (progress / target) * 100;
  const isComplete = progress >= target;

  return (
    <Card className={`mb-6 overflow-hidden ${isComplete ? 'border-amber-400 dark:border-amber-600' : 'border-primary/20'}`}>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-full ${isComplete ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-primary/10'}`}>
            <Gift className={`h-5 w-5 ${isComplete ? 'text-amber-600 dark:text-amber-400' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Programa de Fidelidade</h3>
            <p className="text-xs text-muted-foreground">
              {isComplete ? '🎉 Parabéns! Você ganhou um brinde!' : `${progress} de ${target} compras para ganhar um brinde`}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-3 mb-3">
          <div
            className={`h-3 rounded-full transition-all duration-700 ease-out ${isComplete ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-primary/60 to-primary'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between">
          {Array.from({ length: target }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < progress 
                  ? 'bg-primary text-white' 
                  : i === progress 
                    ? 'bg-primary/20 text-primary border-2 border-primary/40' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {i < progress ? '✓' : i + 1}
              </div>
              <span className="text-[10px] text-muted-foreground">
                {i === target - 1 ? '🎁 Brinde' : `Compra ${i + 1}`}
              </span>
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
              🎉 Contacte-nos via WhatsApp para receber o seu brinde!
            </p>
            <Button variant="whatsapp" size="sm" className="mt-2"
              onClick={() => {
                const msg = encodeURIComponent('Olá! Completei 3 compras no programa de fidelidade e gostaria de receber meu brinde! 🎁');
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
              }}>
              <MessageCircle className="mr-1 h-3 w-3" />Receber Brinde
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Tela para visitantes não logados
const GuestView = ({ navigate }: { navigate: (path: string) => void }) => (
  <div className="max-w-lg mx-auto text-center py-8">
    <div className="mb-8">
      <div className="bg-primary/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
        <History className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Acompanhe seus Pedidos</h2>
      <p className="text-muted-foreground">
        Crie uma conta para ver o histórico de pedidos e participar do programa de fidelidade
      </p>
    </div>

    {/* Benefícios visuais */}
    <div className="grid gap-4 mb-8">
      <Card className="text-left">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-sm">Histórico de Pedidos</p>
            <p className="text-xs text-muted-foreground">Acompanhe o estado de todas as suas compras</p>
          </div>
        </CardContent>
      </Card>
      <Card className="text-left">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
            <Gift className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="font-semibold text-sm">Brinde após 3 compras</p>
            <p className="text-xs text-muted-foreground">Acumule compras e ganhe um brinde especial</p>
          </div>
        </CardContent>
      </Card>
      <Card className="text-left">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
            <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="font-semibold text-sm">Promoções Exclusivas</p>
            <p className="text-xs text-muted-foreground">Receba descontos e ofertas especiais</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="space-y-3">
      <Button className="w-full" size="lg" onClick={() => navigate('/auth?redirect=/meus-pedidos')}>
        <UserPlus className="mr-2 h-4 w-4" />Criar Conta
      </Button>
      <Button variant="outline" className="w-full" size="lg" onClick={() => navigate('/auth?redirect=/meus-pedidos')}>
        <LogIn className="mr-2 h-4 w-4" />Já tenho conta — Entrar
      </Button>
      <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => navigate('/loja')}>
        <ShoppingBag className="mr-2 h-4 w-4" />Voltar à Loja
      </Button>
    </div>
  </div>
);

const MeusPedidos = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [completedCount, setCompletedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchOrders();
      fetchCompletedCount();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, filter]);

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase.from('orders').select('*').eq('user_id', user!.id).order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter as any);
    const { data, error } = await query;
    if (error) console.error('Erro ao buscar pedidos:', error);
    else setOrders(data || []);
    setLoading(false);
  };

  const fetchCompletedCount = async () => {
    const { count } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('user_id', user!.id).eq('status', 'completed');
    setCompletedCount(count || 0);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Pendente', variant: 'secondary' },
      confirmed: { label: 'Confirmado', variant: 'default' },
      processing: { label: 'Processando', variant: 'default' },
      completed: { label: 'Concluído', variant: 'outline' },
      cancelled: { label: 'Cancelado', variant: 'destructive' },
    };
    const statusInfo = variants[status] || { label: status, variant: 'default' };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const handleWhatsAppContact = (orderId: string) => {
    const message = `Olá! Gostaria de obter informações sobre o pedido #${orderId.slice(0, 8).toUpperCase()}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Meus Pedidos | LG TecServ"
        description="Acompanhe seus pedidos e participe do programa de fidelidade"
        keywords="pedidos, histórico, LG TecServ, fidelidade"
        url="https://www.lgtecserv.com/meus-pedidos"
      />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader />

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {!user ? (
            <GuestView navigate={navigate} />
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => navigate('/loja')}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">Meus Pedidos</h1>
                  <p className="text-muted-foreground">Acompanhe o status dos seus pedidos</p>
                </div>
              </div>

              {/* Barra de Fidelidade */}
              <LoyaltyProgress completedOrders={completedCount} />

              {/* Filtros */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                  { value: 'all', label: 'Todos' },
                  { value: 'pending', label: 'Pendentes' },
                  { value: 'confirmed', label: 'Confirmados' },
                  { value: 'processing', label: 'Processando' },
                  { value: 'completed', label: 'Concluídos' },
                ].map((item) => (
                  <Button key={item.value} variant={filter === item.value ? 'default' : 'outline'} size="sm" onClick={() => setFilter(item.value)}>
                    {item.label}
                  </Button>
                ))}
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : orders.length === 0 ? (
                <EmptyState type="no-results" onAction={() => navigate('/loja')} actionLabel="Ir para a Loja" />
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <Package className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </p>
                              <p className="text-lg font-bold text-primary mt-2">
                                {order.total_amount.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleWhatsAppContact(order.id)}>
                              <MessageCircle className="h-4 w-4 mr-2" />Contatar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default MeusPedidos;
