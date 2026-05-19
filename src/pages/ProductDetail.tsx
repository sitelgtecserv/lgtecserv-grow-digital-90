import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  ShoppingCart, 
  Trash2, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Award, 
  CreditCard, 
  MessageCircle, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  ArrowRight,
  TrendingUp,
  Zap,
  Sparkles,
  Package,
  UserCheck
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import SEOHead from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { ShopHeader } from '@/components/layout/ShopHeader';
import { BottomNav } from '@/components/shop/BottomNav';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ImageGallery } from '@/components/shop/ImageGallery';
import { ProductReviews } from '@/components/shop/ProductReviews';
import { StarRating } from '@/components/shop/StarRating';
import { generateProductSchema } from '@/utils/productSchema';
import { generateBreadcrumbData } from '@/utils/seoData';
import { useSEO } from '@/hooks/useSEO';
import { metaPixel } from '@/utils/metaPixel';
import { RelatedProducts } from '@/components/shop/RelatedProducts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  slug: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
  product_images?: Array<{
    image_url: string;
    is_primary: boolean;
    display_order: number;
  }>;
}

const ProductDetail = () => {
  const { slug, categorySlug } = useParams<{ slug: string; categorySlug?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart } = useCart();
  const { toast } = useToast();
  const { baseUrl } = useSEO({ title: '', description: '' });
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState<{ rating: number; reviewCount: number } | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    if (!slug) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *, 
          categories(name, slug),
          product_images(image_url, is_primary, display_order, id)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Processar produto para usar a imagem principal
      const processedProduct = {
        ...data,
        image_url: data.image_url ||
          data.product_images?.find(img => img.is_primary)?.image_url ||
          data.product_images?.[0]?.image_url ||
          null
      };

      setProduct(processedProduct);
      setImages(data.product_images || []);

      // 🎯 TRACKING: ViewContent
      metaPixel.viewContent({
        id: data.id,
        name: data.name,
        price: data.price,
        category: data.categories?.name,
      });

      // 📊 Analytics: registar visualização
      const sessionId = sessionStorage.getItem('session_id') || crypto.randomUUID();
      sessionStorage.setItem('session_id', sessionId);
      supabase.from('product_views').insert({
        product_id: data.id,
        session_id: sessionId,
      }).then(() => {});

      // Buscar avaliações para Rich Snippets
      const { data: reviews } = await supabase
        .from("product_reviews")
        .select("rating")
        .eq("product_id", data.id);

      if (reviews && reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        setReviewData({
          rating: avgRating,
          reviewCount: reviews.length,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      navigate('/loja');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);

    toast({
      title: 'Produto adicionado',
      description: 'O produto foi adicionado ao carrinho com sucesso.',
    });
  };

  const productInCart = cart.find((item) => item.id === product?.id);

  const handleRemoveFromCart = () => {
    if (productInCart) {
      removeFromCart(productInCart.cartItemId);
      toast({
        title: 'Removido do carrinho',
        description: 'O produto foi removido do carrinho.',
      });
    }
  };

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const currentUrl = window.location.href;
    const message = `Olá LG TecServ! Vi o produto *${product.name}* (${product.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}) no vosso site e gostaria de obter mais informações sobre a compra ou entrega.\n\nLink do produto: ${currentUrl}`;
    window.open(`https://wa.me/258869824047?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Gerar schemas estruturados
  const productUrl = product.categories?.slug
    ? `/loja/${product.categories.slug}/${product.slug}`
    : `/produto/${product.slug}`;
  const categoryUrl = product.categories?.slug ? `/loja/${product.categories.slug}` : '/loja';

  const productSchema = generateProductSchema(product, baseUrl, reviewData || undefined);
  const breadcrumbSchema = generateBreadcrumbData([
    { name: 'Home', url: baseUrl },
    { name: 'Loja', url: `${baseUrl}/loja` },
    ...(product.categories?.name ? [{ name: product.categories.name, url: `${baseUrl}${categoryUrl}` }] : []),
    { name: product.name, url: `${baseUrl}${productUrl}` }
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Como funciona a garantia do ${product.name} na LG TecServ?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Todos os nossos produtos contam com uma garantia oficial de engenharia contra defeitos de fabrico por um período mínimo de 3 meses. Asseguramos suporte local no nosso próprio laboratório físico em Maputo."
        }
      },
      {
        "@type": "Question",
        "name": "Quais são as províncias atendidas para envio de mercadorias?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fazemos entregas directas na Grande Maputo e Matola via estafeta em até 48h. Para o resto das províncias de Moçambique (Gaza, Inhambane, Sofala, Tete, Manica, Zambézia, Nampula, Cabo Delgado, Niassa), enviamos via transportadoras terrestres certificadas como o Portador Diário."
        }
      },
      {
        "@type": "Question",
        "name": "Quais as opções de pagamento oficiais corporativas aceites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aceitamos pagamentos corporativos oficiais via M-Pesa comercial, eMola comercial, transferências interbancárias directas para BCI, Millennium BIM ou Standard Bank, ou pagamento em numerário/POS no ato de levantamento presencial."
        }
      }
    ]
  };

  // Combinar schemas
  const structuredData = [productSchema, breadcrumbSchema, faqSchema];

  // Gerar Smart Tags (Teia de Links)
  const firstWord = product.name.split(' ')[0];
  const smartTags = [
    { label: `Mais de ${product.categories?.name || 'nossa loja'}`, url: categoryUrl },
    { label: `Procurar "${firstWord}"`, url: `/loja?search=${firstWord}` },
    { label: 'Todos os produtos', url: '/loja' }
  ];

  return (
    <>
      <SEOHead
        title={`${product.name} - Preço em Moçambique | LG TecServ`}
        description={`${product.description.substring(0, 155)}... Compre ${product.name} com o melhor preço em Moçambique. Garantia oficial local, suporte técnico certificado em Maputo e entrega rápida.`}
        keywords={`${product.name}, comprar ${product.name.toLowerCase()} moçambique, ${product.name.toLowerCase()} preço maputo, loja de tecnologia moçambique, assistência técnica lg tecserv, hardware original moçambique, m-pesa e-mola e-commerce`}
        image={product.image_url || undefined}
        url={`${baseUrl}${productUrl}`}
        type="product"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <ShopHeader />

        {/* Product Detail */}
        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: 'Loja', href: '/loja' },
              ...(product.categories?.name ? [{
                label: product.categories.name,
                href: categoryUrl
              }] : []),
              { label: product.name }
            ]}
            className="mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
          >
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <ImageGallery images={images} productName={product.name} />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="space-y-6 lg:space-y-7 flex flex-col"
            >
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight lg:leading-tight bg-gradient-to-r from-foreground via-foreground/90 to-primary-dark bg-clip-text text-transparent">
                  {product.name}
                </h1>
                {reviewData && (
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={reviewData.rating} showValue size={20} />
                    <span className="text-sm font-medium text-muted-foreground">
                      ({reviewData.reviewCount} {reviewData.reviewCount === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  </div>
                )}
                <div className="flex items-center flex-wrap gap-2 pt-1 pb-1">
                  {product.categories?.name && (
                    <Badge variant="secondary" className="px-3 py-1 bg-secondary/10 text-secondary-dark border border-secondary/20 font-medium">
                      {product.categories.name}
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge variant="destructive" className="px-3 py-1 shadow-sm font-medium">Vendido</Badge>
                  )}
                  {product.stock > 0 && product.stock < 5 && (
                    <Badge className="bg-orange-500 text-white shadow-sm border-0 px-3 py-1 font-medium animate-pulse">
                      Últimas {product.stock} unidades
                    </Badge>
                  )}
                </div>

                {/* Preço com Destaque Premium e Tags de Confiança */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <span className="text-4xl sm:text-5xl font-black text-primary tracking-tight font-price drop-shadow-sm">
                    {product.price.toLocaleString('pt-MZ', {
                      style: 'currency',
                      currency: 'MZN',
                    })}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    Valor integral com impostos • Fatura emitida no levantamento • Sem taxas ocultas
                  </span>
                </div>
              </div>

              {/* Destaques Rápidos de Engenharia (Quick Specs List) */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card border border-border/80 text-center hover:border-primary/20 transition-all shadow-sm">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary mb-2">
                    <Zap className="h-4.5 w-4.5 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-bold text-foreground">Alta Performance</span>
                  <span className="text-[8px] text-muted-foreground mt-0.5">Testado em lab</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card border border-border/80 text-center hover:border-primary/20 transition-all shadow-sm">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary mb-2">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-foreground">Suporte de Elite</span>
                  <span className="text-[8px] text-muted-foreground mt-0.5">Engenharia dedicada</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card border border-border/80 text-center hover:border-primary/20 transition-all shadow-sm">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary mb-2">
                    <Package className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-foreground">Pronto Levantamento</span>
                  <span className="text-[8px] text-muted-foreground mt-0.5">Garantia local</span>
                </div>
              </div>

              <Separator />

              {/* Scarcity / Urgency indicator */}
              {product.stock > 0 && product.stock < 5 && (
                <div className="bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl space-y-2.5 backdrop-blur-sm">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400">
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                      Apenas {product.stock} {product.stock === 1 ? 'unidade restante' : 'unidades restantes'}!
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-bold">Urgência Crítica</span>
                  </div>
                  <div className="h-2 w-full bg-orange-100 dark:bg-orange-950/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-700" 
                      style={{ width: `${(product.stock / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Description preview */}
              <div className="space-y-2 bg-muted/20 border border-border/40 p-4 rounded-2xl">
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2 tracking-tight">
                  <Info className="h-4.5 w-4.5 text-primary" />
                  Visão Geral do Artigo
                </h2>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm line-clamp-4">
                  {product.description}
                </p>
                {product.description.length > 200 && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto text-primary text-xs font-bold hover:underline flex items-center mt-1.5"
                    onClick={() => {
                      const tabsElement = document.getElementById('detailed-info-tabs');
                      tabsElement?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Visualizar ficha técnica e detalhes completos abaixo <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>

              <Separator />

              {/* Cart Status */}
              {productInCart && (
                <Card className="bg-primary/5 border-primary/20 shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <ShoppingCart className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold">Produto adicionado ao carrinho</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-destructive hover:bg-destructive/10 rounded-lg"
                      onClick={handleRemoveFromCart}
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Remover
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                {!productInCart ? (
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg font-bold shadow-primary hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-3 h-5 w-5" />
                    {product.stock === 0 ? 'Produto Vendido' : 'Adicionar ao Carrinho'}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg font-bold rounded-2xl shadow-primary hover:-translate-y-0.5 transition-all"
                    onClick={() => navigate('/carrinho')}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ir para o Carrinho
                  </Button>
                )}

                {product.stock > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full h-14 text-lg font-bold border-emerald-500 text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 hover:-translate-y-0.5 transition-all duration-300 gap-2 rounded-2xl"
                    onClick={handleWhatsAppInquiry}
                  >
                    <MessageCircle className="h-5 w-5 text-emerald-500" />
                    Pedir via WhatsApp
                  </Button>
                )}
              </div>

              {/* Consultoria com Engenheiro de Plantão (Posicionamento Premium) */}
              <div className="p-3.5 bg-muted/40 border border-border/80 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <UserCheck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">Precisa de Suporte de Engenharia?</p>
                    <p className="text-[9px] text-muted-foreground leading-tight">Esclareça dúvidas técnicas complexas com o nosso Engenheiro de Plantão</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/25 rounded-lg flex-shrink-0"
                  onClick={() => {
                    if (!product) return;
                    const message = `Olá! Gostaria de falar com o Engenheiro de Plantão para uma consultoria técnica sobre o produto *${product.name}*.\n\nLink: ${window.location.href}`;
                    window.open(`https://wa.me/258869824047?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                >
                  Consultar
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>

              {/* Selo de Garantia e Inspeção de Engenharia (Posicionamento Premium) */}
              <div className="relative overflow-hidden p-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm shadow-sm">
                <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none select-none">
                  <Award className="h-24 w-24 text-primary" />
                </div>
                <div className="flex gap-3">
                  <div className="p-2 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary border border-primary/15 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                      Garantia & Certificação Técnica LG TecServ
                      <Sparkles className="h-3.5 w-3.5 text-secondary animate-pulse" />
                    </h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                      Cada equipamento é individualmente inspecionado, testado em laboratório e certificado pela equipa de engenharia da <strong>LG TecServ Moçambique</strong> antes de ser selado e despachado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges Grid Glassmorphism */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-card/50 backdrop-blur-md border border-border/80 rounded-2xl space-y-1 hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="p-1 bg-primary/10 rounded-md">
                      <Truck className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-bold text-xs text-foreground">Entrega Rápida</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-snug">Maputo & Matola em 24-48h. Envio nacional seguro via parceiros logísticos.</p>
                </div>
                <div className="p-3 bg-card/50 backdrop-blur-md border border-border/80 rounded-2xl space-y-1 hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="p-1 bg-primary/10 rounded-md">
                      <CreditCard className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-bold text-xs text-foreground">Pagamento Seguro</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-snug">M-Pesa, eMola, transferências electrónicas e levantamento presencial.</p>
                </div>
                <div className="p-3 bg-card/50 backdrop-blur-md border border-border/80 rounded-2xl space-y-1 hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="p-1 bg-primary/10 rounded-md">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-bold text-xs text-foreground">Sede Física</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-snug">Laboratório técnico e escritórios próprios localizados em Maputo.</p>
                </div>
                <div className="p-3 bg-card/50 backdrop-blur-md border border-border/80 rounded-2xl space-y-1 hover:shadow-elegant hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="p-1 bg-primary/10 rounded-md">
                      <Award className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-bold text-xs text-foreground">Garantia Local</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-snug">Assistência local directa assegurada pelos nossos próprios engenheiros.</p>
                </div>
              </div>

              {/* Smart Tags (Internal Linking SEO) */}
              <div className="pt-3 border-t">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Links Rápidos de Navegação:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {smartTags.map((tag, i) => (
                    <Button 
                      key={i}
                      variant="outline" 
                      size="sm" 
                      className="text-xs rounded-full h-8 px-4 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                      onClick={() => navigate(tag.url)}
                    >
                      {tag.label}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Tabs Informativas Premium */}
          <div id="detailed-info-tabs" className="mt-16 max-w-6xl mx-auto border border-border/50 bg-card/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <Tabs defaultValue="detalhes" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-muted p-1 rounded-2xl h-auto">
                <TabsTrigger value="detalhes" className="py-3 rounded-xl text-xs sm:text-sm font-bold transition-all">
                  Descrição Completa
                </TabsTrigger>
                <TabsTrigger value="especificacoes" className="py-3 rounded-xl text-xs sm:text-sm font-bold transition-all">
                  Especificações Técnicas
                </TabsTrigger>
                <TabsTrigger value="envio" className="py-3 rounded-xl text-xs sm:text-sm font-bold transition-all">
                  Envio e Entrega
                </TabsTrigger>
                <TabsTrigger value="pagamento" className="py-3 rounded-xl text-xs sm:text-sm font-bold transition-all">
                  Pagamento e Garantia
                </TabsTrigger>
              </TabsList>

              <TabsContent value="detalhes" className="mt-8 space-y-6 focus-visible:ring-0">
                <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                  <Info className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-extrabold text-foreground">Descrição do Produto</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base space-y-3">
                    {product.description}
                  </div>
                  
                  {/* Uso Recomendado & Perfil (Informação/Posicionamento) */}
                  <div className="space-y-4">
                    <div className="p-5 border border-primary/10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent space-y-3 shadow-sm">
                      <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                        <Award className="h-4.5 w-4.5 text-primary" />
                        Perfil & Indicação de Uso
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Este artigo foi selecionado e homologado pelo nosso laboratório devido aos seus elevados padrões de estabilidade e durabilidade. 
                      </p>
                      <div className="text-[10px] text-muted-foreground space-y-1.5 pt-1">
                        <p><strong>• Recomendação:</strong> Uso Profissional / Alta Produtividade.</p>
                        <p><strong>• Desempenho:</strong> Classificado como de Alta Fidelidade Técnica.</p>
                        <p><strong>• Integridade:</strong> Garantida pelas diretivas de engenharia da LG TecServ.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="especificacoes" className="mt-8 space-y-6 focus-visible:ring-0">
                <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                  <Tag className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-extrabold text-foreground">Especificações Técnicas</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Tabela de especificações estruturada */}
                  <div className="border border-border/80 rounded-2xl overflow-hidden text-sm shadow-sm bg-card">
                    <div className="grid grid-cols-2 border-b border-border/80 p-3.5 bg-muted/50 font-bold">
                      <span>Característica</span>
                      <span>Detalhe Técnico</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-border/60 p-3 hover:bg-muted/10 transition-colors">
                      <span className="text-muted-foreground font-medium">Categoria</span>
                      <span className="font-semibold text-foreground">{product.categories?.name || 'Geral'}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-border/60 p-3 hover:bg-muted/10 transition-colors">
                      <span className="text-muted-foreground font-medium">Estado do Estoque</span>
                      <span className="font-semibold text-foreground">{product.stock > 0 ? `Disponível (${product.stock} un)` : 'Sob Consulta'}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-border/60 p-3 hover:bg-muted/10 transition-colors">
                      <span className="text-muted-foreground font-medium">Garantia Técnica</span>
                      <span className="font-semibold text-foreground">Mínimo de 3 meses local</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 hover:bg-muted/10 transition-colors">
                      <span className="text-muted-foreground font-medium">Suporte Directo</span>
                      <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Canal Exclusivo Engenharia
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* O que está incluído na Caixa (Package Contents) */}
                    <div className="p-5 border border-dashed border-border/80 rounded-2xl bg-muted/20 space-y-3">
                      <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                        <Package className="h-4.5 w-4.5 text-primary" />
                        O que vem incluído na Caixa?
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Todos os pacotes são cuidadosamente embalados com os seguintes itens:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1.5 pl-4 list-disc">
                        <li>1x Equipamento principal {product.name} homologado</li>
                        <li>1x Cabo de ligação/alimentação original certificado</li>
                        <li>1x Adaptador de tomada compatível com a rede de Moçambique</li>
                        <li>1x Certificado de Teste e Inspeção Física LG TecServ</li>
                        <li>1x Guia rápido de instalação e operação</li>
                      </ul>
                    </div>

                    {/* Dica de Especialista */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                      <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-primary-dark space-y-1">
                        <p className="font-bold">Laboratório de Testes LG TecServ</p>
                        <p className="text-muted-foreground leading-relaxed">
                          Os nossos engenheiros validam a integridade dos chips, firmware e componentes físicos de cada lote recebido. Sua segurança e produtividade são nossa principal diretiva.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="envio" className="mt-8 space-y-6 focus-visible:ring-0">
                <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                  <Truck className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-extrabold text-foreground">Políticas e Opções de Envio</h3>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Asseguramos uma logística rápida, transparente e segura para todos os distritos de Moçambique:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  <div className="border border-border/60 p-5 rounded-2xl bg-card space-y-2.5 hover:border-primary/20 transition-all shadow-sm">
                    <h4 className="font-extrabold text-sm sm:text-base text-primary flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Grande Maputo & Matola
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      • <strong>Prazos:</strong> Entrega em 24h a 48h úteis.<br />
                      • <strong>Método:</strong> Estafeta técnico direto à sua porta.<br />
                      • <strong>Opção de Retirada:</strong> Pode levantar diretamente no nosso escritório técnico em Maputo com hora marcada.
                    </p>
                  </div>
                  <div className="border border-border/60 p-5 rounded-2xl bg-card space-y-2.5 hover:border-primary/20 transition-all shadow-sm">
                    <h4 className="font-extrabold text-sm sm:text-base text-primary flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Restantes Províncias
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      • <strong>Prazos:</strong> Envio expresso em 48h a 72h úteis.<br />
                      • <strong>Método:</strong> Despachado por transportadoras terrestres seguras (ex: Portador Diário).<br />
                      • <strong>Coleta:</strong> Retirada conveniente nos escritórios centrais da transportadora na capital provincial.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pagamento" className="mt-8 space-y-6 focus-visible:ring-0">
                <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-extrabold text-foreground">Métodos de Pagamento e Garantia</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm sm:text-base text-foreground">Formas de Pagamento Homologadas</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Para sua conveniência e conformidade tributária em Moçambique, aceitamos pagamento corporativo oficial via:
                    </p>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 pl-4 list-disc">
                      <li><strong>M-Pesa Corporativo:</strong> Pagamento direto para o número de conta comercial oficial da nossa empresa.</li>
                      <li><strong>eMola Corporativo:</strong> Transferências instantâneas homologadas.</li>
                      <li><strong>Transferência Bancária (TED/Directa):</strong> Contas PJ nos bancos <strong>BCI</strong>, <strong>Millennium BIM</strong> ou <strong>Standard Bank</strong> (necessário envio de comprovativo bancário).</li>
                      <li><strong>Pagamento Físico:</strong> Aceito na entrega ou levantamento no escritório (dinheiro ou POS), restrito a Maputo/Matola.</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4 p-5 rounded-2xl bg-muted/20 border border-border/60">
                    <h4 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                      <ShieldCheck className="h-4.5 w-4.5 text-primary" />
                      Termos de Garantia de Engenharia
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Todos os produtos contam com uma garantia mínima de 3 meses cobrindo defeitos funcionais de fábrica. O suporte pós-venda da LG TecServ garante assistência local caso precise de reparações ou substituições.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <em>Nota: Danos provocados por sobretensões elétricas na rede pública local não são cobertos pela garantia legal (recomendamos o uso de estabilizadores de tensão fornecidos pela nossa loja).</em>
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* FAQ Accordion Section */}
          <div className="mt-16 max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                Dúvidas Frequentes
              </h2>
              <p className="text-muted-foreground mt-1">Esclareça suas dúvidas antes de realizar a compra</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full border border-border/60 rounded-2xl bg-card/20 overflow-hidden">
              <AccordionItem value="item-1" className="border-b border-border/60 px-4 sm:px-6">
                <AccordionTrigger className="hover:no-underline font-semibold text-sm sm:text-base py-4 text-left">
                  Como funciona o processo de compra?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4">
                  Adicione o produto desejado ao seu carrinho clicando em "Adicionar ao Carrinho". Em seguida, clique em "Finalizar Pedido" ou "Pedir via WhatsApp". Nossa equipe entrará em contato direto para validar os detalhes de entrega e formas de pagamento mais convenientes para você.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-border/60 px-4 sm:px-6">
                <AccordionTrigger className="hover:no-underline font-semibold text-sm sm:text-base py-4 text-left">
                  Quais as formas de entrega disponíveis?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4">
                  Fazemos entregas ao domicílio em Maputo e Matola através de estafeta. Para clientes em outras províncias de Moçambique, fazemos o envio seguro por meio de parceiros logísticos reconhecidos (Portador Diário ou similares). As encomendas são recolhidas nos terminais das respectivas capitais provinciais.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-border/60 px-4 sm:px-6">
                <AccordionTrigger className="hover:no-underline font-semibold text-sm sm:text-base py-4 text-left">
                  Qual é a garantia dos produtos?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4">
                  Todos os nossos produtos contam com garantia legal contra defeitos de fabricação de pelo menos 3 meses (podendo ser de até 12 meses dependendo do equipamento). A nossa equipa de suporte técnico também está disponível para auxiliar na instalação e dúvidas gerais.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="px-4 sm:px-6">
                <AccordionTrigger className="hover:no-underline font-semibold text-sm sm:text-base py-4 text-left">
                  Como funciona o pagamento por M-Pesa ou eMola?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4">
                  Após confirmar a compra, você poderá efetuar a transferência para as contas oficiais corporativas da LG TecServ via M-Pesa ou eMola. Assim que enviar o comprovante de pagamento à nossa equipe através do WhatsApp ou e-mail, seu pedido será processado e despachado imediatamente.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <RelatedProducts
            currentProductId={product.id}
            categoryId={product.category_id}
            categorySlug={product.categories?.slug}
          />

          {/* Seção de Avaliações */}
          <div className="mt-12">
            <ProductReviews productId={product.id} />
          </div>
        </main>
        <BottomNav />
      </div>
    </>
  );
};

export default ProductDetail;
