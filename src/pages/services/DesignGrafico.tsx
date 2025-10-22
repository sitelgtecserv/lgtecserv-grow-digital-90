import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BusinessBanner from "@/components/ui/business-banner";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";
import { 
  Palette, 
  Eye, 
  Sparkles, 
  Target, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Image,
  Layers,
  Award,
  Star,
  Timer,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData } from "@/utils/seoData";
import designService from "@/assets/design-service.jpg";

const DesignGrafico = () => {
  const benefits = [
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: "Identidade Visual Única",
      description: "Destaque-se da concorrência com um visual profissional e memorável"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Comunicação Eficaz",
      description: "Transmita a mensagem certa para o seu público-alvo moçambicano"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Profissionalismo",
      description: "Ganhe credibilidade e confiança com design de qualidade internacional"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Reconhecimento de Marca",
      description: "Torne a sua marca facilmente reconhecível e lembrada pelos clientes"
    }
  ];

  const services = [
    "Criação de logótipos únicos",
    "Identidade visual completa",
    "Cartões de visita profissionais",
    "Folhetos e brochuras",
    "Banners e cartazes",
    "Design para redes sociais",
    "Embalagens de produtos",
    "Papelaria corporativa",
    "Manual de identidade visual",
    "Aplicação da marca em diversos suportes"
  ];

  const mozambiqueAdvantages = [
    {
      title: "Mercado Empresarial em Expansão",
      description: "Com o crescimento económico de Moçambique, empresas com identidade visual forte destacam-se no mercado competitivo."
    },
    {
      title: "Cultura Visual Rica",
      description: "Aproveitamos a rica herança cultural moçambicana para criar designs autênticos que ressoam com o público local."
    },
    {
      title: "Diferenciação no Mercado",
      description: "Muitas empresas ainda não investem em design profissional. Esta é a sua oportunidade de sair à frente."
    }
  ];

  const serviceStructuredData = generateServiceData({
    name: "Design Gráfico Profissional",
    description: "Serviços de design gráfico profissional, criação de logótipos e identidade visual em Moçambique",
    url: "https://www.lgtecserv.com/servicos/design-grafico-profissional-mocambique",
    price: "A partir de 8,000 MT"
  });

  return (
    <>
      <SEOHead
        title="Design Gráfico Profissional em Moçambique | Logótipos e Identidade Visual - LG TecServ"
        description="Serviços de design gráfico profissional em Moçambique. Criação de logótipos, identidade visual, material promocional e design para redes sociais. Qualidade garantida!"
        keywords="design gráfico Moçambique, criação logótipos, identidade visual, design profissional, material gráfico, LG TecServ, Maputo"
        image="https://www.lgtecserv.com/lovable-uploads/design-grafico-banner.png"
        url="https://www.lgtecserv.com/servicos/design-grafico-profissional-mocambique"
        type="service"
        structuredData={[organizationData, serviceStructuredData]}
      />
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${designService})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90" />
        <FloatingElements />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Design Gráfico
                <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Profissional em Moçambique
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                Crie uma identidade visual marcante que represente a essência da sua empresa 
                e conquiste a confiança dos clientes moçambicanos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    Ver Portfolio
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                  <a href="https://wa.me/258869824047" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What is Graphic Design */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              O que é <span className="gradient-text">Design Gráfico?</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              O design gráfico é a arte de comunicar visualmente através de elementos como cores, formas, 
              tipografia e imagens. É fundamental para criar uma identidade visual que transmita os valores 
              da sua empresa e conecte com o seu público em Moçambique.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Image className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Comunicação Visual</h3>
                </div>
                <p className="text-muted-foreground">
                  Transformamos ideias em elementos visuais que comunicam eficazmente 
                  com o seu público-alvo, criando conexões emocionais duradouras.
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Layers className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Identidade de Marca</h3>
                </div>
                <p className="text-muted-foreground">
                  Desenvolvemos uma identidade visual coesa que reflecte a personalidade 
                  e valores da sua empresa em todos os pontos de contacto.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Benefícios do <span className="gradient-text">Design Profissional</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose in Mozambique */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Vantagens em <span className="gradient-text">Moçambique</span>
          </h2>
          
          <div className="space-y-8">
            {mozambiqueAdvantages.map((item, index) => (
              <Card key={index} className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Palette className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Helps Your Business */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Como o Design Gráfico <span className="gradient-text">Impulsiona o Seu Negócio</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Credibilidade</h3>
                <p className="text-muted-foreground">
                  Um design profissional transmite seriedade e confiabilidade, factores cruciais 
                  para conquistar a confiança dos clientes moçambicanos.
                </p>
              </div>
              
              <div className="text-center">
                <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Reconhecimento</h3>
                <p className="text-muted-foreground">
                  Uma identidade visual marcante torna a sua marca facilmente reconhecível 
                  e memorável no mercado competitivo.
                </p>
              </div>
              
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Crescimento</h3>
                <p className="text-muted-foreground">
                  Empresas com design profissional têm 67% mais probabilidade de serem 
                  escolhidas pelos consumidores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Serviços <span className="gradient-text">Incluídos</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Criar uma Identidade Visual Marcante?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Transforme a imagem da sua empresa com design gráfico profissional que destaca 
              e impressiona os seus clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Ver Portfolio & Orçamento
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                <a href="https://wa.me/258869824047" target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Banner */}
      <BusinessBanner />

      <Footer />
      <WhatsAppButton />
      </div>
    </>
  );
};

export default DesignGrafico;