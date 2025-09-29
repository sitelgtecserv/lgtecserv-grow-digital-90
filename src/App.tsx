import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
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
  ConsultoriaMarketing,
  CriacaoSites,
  DesignGrafico,
  EletricidadeIndustrial,
  EletricidadeResidencial,
  InstalacoesEletricas,
  RedesSociais,
  TrafegoPago,
  Topografia,
  EnsaiosFotograficos 
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
        <Route path="/sitemap" element={<Sitemap />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AccessibilityEnhancer />
      <ScrollProgress />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
        <BackToTop />
        <CookiesBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;