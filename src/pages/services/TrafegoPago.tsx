import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BusinessBanner from "@/components/ui/business-banner";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Zap, 
  DollarSign, 
  ArrowRight,
  CheckCircle,
  Search,
  MousePointer,
  Users,
  Star,
  Timer,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData } from "@/utils/seoData";
import marketingService from "@/assets/marketing-service.jpg";

const TrafegoPago = () => {
  const benefits = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Segmentação Precisa",
      description: "Chegue exactamente ao seu público-alvo em Moçambique com precisão cirúrgica"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Resultados Rápidos",
      description: "Veja resultados imediatos e comece a receber clientes em poucos dias"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "ROI Mensurável",
      description: "Acompanhe cada metical investido e o retorno gerado para o seu negócio"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "Controlo de Orçamento",
      description: "Defina exactamente quanto quer investir e controle todos os gastos"
    }
  ];

  const platforms = [
    {
      name: "Google Ads",
      description: "Apareça nas pesquisas quando os clientes procuram pelos seus serviços",
      features: ["Anúncios de pesquisa", "Google Shopping", "YouTube Ads", "Display Network"]
    },
    {
      name: "Facebook & Instagram Ads",
      description: "Alcance milhões de moçambicanos nas redes sociais mais populares",
      features: ["Posts patrocinados", "Stories Ads", "Messenger Ads", "Audience Network"]
    },
    {
      name: "LinkedIn Ads",
      description: "Ideal para negócios B2B e serviços profissionais em Moçambique",
      features: ["Sponsored Content", "Message Ads", "Dynamic Ads", "Event Ads"]
    }
  ];

  const mozambiqueAdvantages = [
    {
      title: "Baixa Concorrência Digital",
      description: "Muitas empresas moçambicanas ainda não exploram o tráfego pago, criando oportunidades únicas com custos menores."
    },
    {
      title: "Crescimento do E-commerce",
      description: "O comércio online em Moçambique cresce 30% ao ano. Posicione-se agora para capturar esta oportunidade."
    },
    {
      title: "Penetração Mobile",
      description: "Com 85% dos moçambicanos acedendo à internet via telemóvel, os anúncios mobile são extremamente eficazes."
    }
  ];

  const services = [
    "Criação e gestão de campanhas Google Ads",
    "Facebook e Instagram Ads profissionais",
    "LinkedIn Ads para negócios B2B",
    "Remarketing e retargeting",
    "Segmentação de audiências personalizadas",
    "Criação de landing pages otimizadas",
    "Relatórios detalhados de performance",
    "Otimização contínua das campanhas",
    "Análise de concorrência",
    "Consultoria estratégica mensal"
  ];

  const serviceStructuredData = generateServiceData({
    name: "Gestão de Tráfego Pago",
    description: "Campanhas de tráfego pago no Google Ads e Facebook Ads para aumentar vendas online em Moçambique",
    url: "https://www.lgtecserv.com/servicos/gestao-trafego-pago-marketing-digital-mocambique",
    price: "A partir de 5,000 MT/mês"
  });

  return (
    <>
      <SEOHead
        title="Gestão de Tráfego Pago Google Ads Facebook Ads | Marketing Digital Moçambique - LG TecServ"
        description="Gestão profissional de tráfego pago em Moçambique. Campanhas no Google Ads e Facebook Ads com ROI garantido. Aumente suas vendas online com a LG TecServ!"
        keywords="tráfego pago Moçambique, Google Ads, Facebook Ads, marketing digital, campanhas pagas, ROI, vendas online, LG TecServ"
        image="https://www.lgtecserv.com/lovable-uploads/consultoria-marketing-banner.png"
        url="https://www.lgtecserv.com/servicos/gestao-trafego-pago-marketing-digital-mocambique"
        type="service"
        structuredData={[organizationData, serviceStructuredData]}
      />
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tráfego Pago
              <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-green-200 to-blue-200 bg-clip-text text-transparent">
                Que Converte em Moçambique
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Atraia clientes qualificados para o seu negócio com campanhas de tráfego pago 
              estratégicas e otimizadas para o mercado moçambicano.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Começar Campanha
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                <a href="https://wa.me/258869824047" target="_blank" rel="noopener noreferrer">
                  Falar com Especialista
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Paid Traffic */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              O que é <span className="gradient-text">Tráfego Pago?</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Tráfego pago é uma estratégia de marketing digital onde investe dinheiro para que os seus anúncios 
              apareçam nas plataformas onde o seu público-alvo está. É a forma mais rápida e eficaz de gerar 
              visitantes qualificados para o seu site e converter em vendas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Search className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Anúncios de Pesquisa</h3>
                </div>
                <p className="text-muted-foreground">
                  Apareça no topo do Google quando os clientes pesquisam pelos seus 
                  produtos ou serviços. Capture a intenção de compra no momento certo.
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <MousePointer className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Anúncios Sociais</h3>
                </div>
                <p className="text-muted-foreground">
                  Alcance o seu público nas redes sociais com anúncios visuais atractivos 
                  que geram interesse e engagement com a sua marca.
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
            Benefícios do <span className="gradient-text">Tráfego Pago</span>
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

      {/* Platforms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="gradient-text">Plataformas</span> que Utilizamos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{platform.name}</h3>
                <p className="text-muted-foreground mb-6">{platform.description}</p>
                <ul className="space-y-2">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mozambique Advantages */}
      <section className="py-20 bg-muted/30">
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
                      <TrendingUp className="w-6 h-6 text-primary" />
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

      {/* How It Helps Business */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Como o Tráfego Pago <span className="gradient-text">Acelera o Seu Negócio</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Mais Leads Qualificados</h3>
                <p className="text-muted-foreground">
                  Atraia pessoas que já têm interesse nos seus produtos ou serviços, 
                  aumentando significativamente as hipóteses de conversão.
                </p>
              </div>
              
              <div className="text-center">
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Crescimento Acelerado</h3>
                <p className="text-muted-foreground">
                  Veja resultados em dias, não em meses. O tráfego pago é a forma mais 
                  rápida de escalar o seu negócio online.
                </p>
              </div>
              
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Dados Precisos</h3>
                <p className="text-muted-foreground">
                  Tenha acesso a dados detalhados sobre o comportamento dos seus clientes 
                  e otimize continuamente os seus resultados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 bg-muted/30">
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
              Pronto para Multiplicar os Seus Resultados?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Comece hoje a receber mais clientes qualificados com campanhas de tráfego pago 
              optimizadas para o mercado moçambicano.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                <a href="https://wa.me/258869824047" target="_blank" rel="noopener noreferrer">
                  Falar com Especialista
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

export default TrafegoPago;