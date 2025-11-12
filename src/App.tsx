import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import { CookiesBanner } from "./components/layout/CookiesBanner";
import BackToTop from "./components/ui/back-to-top";
import ScrollProgress from "./components/ui/scroll-progress";
import AccessibilityEnhancer from "./components/accessibility/accessibility-enhancer";
import { 
  About, 
  Services, 
  Contact, 
  TermosCondicoes,
  PoliticaPrivacidade,
  FAQ,
  Documentacao,
  ConsultoriaMarketing,
  CriacaoSites,
  DesignGrafico,
  EletricidadeIndustrial,
  EletricidadeResidencial,
  InstalacoesEletricas,
  RedesSociais,
  TrafegoPago,
  Topografia,
  EnsaiosFotograficos,
  Auth,
  Loja,
  ProductDetail,
  Carrinho,
  Checkout,
  OrderConfirmation,
  MeusPedidos,
  Admin,
  GoogleSearchConsole
} from "./App.lazy";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sobre-nos-lg-tecserv-mocambique" element={<About />} />
        <Route path="/servicos-lg-tecserv-mocambique" element={<Services />} />
        <Route path="/servicos/criacao-desenvolvimento-sites-profissionais-mocambique" element={<CriacaoSites />} />
        <Route path="/servicos/design-grafico-profissional-mocambique" element={<DesignGrafico />} />
        <Route path="/servicos/gestao-trafego-pago-marketing-digital-mocambique" element={<TrafegoPago />} />
        <Route path="/servicos/gestao-redes-sociais-marketing-digital-mocambique" element={<RedesSociais />} />
        <Route path="/servicos/consultoria-marketing-digital-estrategico-mocambique" element={<ConsultoriaMarketing />} />
        <Route path="/servicos/instalacoes-eletricas-profissionais-mocambique" element={<InstalacoesEletricas />} />
        <Route path="/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique" element={<EletricidadeResidencial />} />
        <Route path="/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique" element={<EletricidadeIndustrial />} />
        <Route path="/servicos/servicos-topograficos-profissionais-maputo-mocambique" element={<Topografia />} />
        <Route path="/servicos/ensaios-fotograficos-profissionais-sem-studio-mocambique" element={<EnsaiosFotograficos />} />
        <Route path="/pagina-de-contato-lg-tecserv-mocambique" element={<Contact />} />
        <Route path="/termos-e-condicoes-lg-tecserv" element={<TermosCondicoes />} />
        <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/documentacao-oficial-lg-tecserv" element={<Documentacao />} />
        <Route path="/sitemap" element={<Sitemap />} />
        {/* Loja Online Routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/loja/:categorySlug" element={<Loja />} />
        <Route path="/loja/:categorySlug/:slug" element={<ProductDetail />} />
        <Route path="/produto/:slug" element={<ProductDetail />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmacao-pedido" element={<OrderConfirmation />} />
        <Route path="/meus-pedidos" element={<MeusPedidos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/google-search-console" element={<GoogleSearchConsole />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AccessibilityEnhancer />
            <ScrollProgress />
            <Toaster />
            <Sonner />
            <AppContent />
            <BackToTop />
            <CookiesBanner />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;