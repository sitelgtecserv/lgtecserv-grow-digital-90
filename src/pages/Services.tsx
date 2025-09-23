import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceCard } from "@/components/ui/service-card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { 
  Globe, 
  Palette, 
  TrendingUp, 
  Share2, 
  MessageSquare,
  Zap,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Search,
  BarChart3,
  Settings,
  MapPin,
  Camera
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData } from "@/utils/seoData";

const Services = () => {
  const mainServices = [
    {
      title: "Criação de Sites",
      description: "Sites profissionais, responsivos e otimizados para converter visitantes em clientes.",
      icon: <Globe className="w-8 h-8" />,
      image: "/lovable-uploads/criacao-sites-banner.png",
      features: [
        "Design responsivo para todos os dispositivos",
        "Otimização para motores de busca (SEO)",
        "Integração com redes sociais",
        "Painel administrativo intuitivo",
        "Segurança e backup automático",
        "Suporte técnico contínuo"
      ],
      pricing: "A partir de 15,000 MT",
      deliveryTime: "2-4 semanas"
    },
    {
      title: "Design Gráfico",
      description: "Identidade visual profissional que destaca a sua marca da concorrência.",
      icon: <Palette className="w-8 h-8" />,
      image: "/lovable-uploads/design-grafico-banner.png",
      features: [
        "Criação de logótipos únicos e memoráveis",
        "Manual de identidade visual completo",
        "Material gráfico para marketing",
        "Design para redes sociais",
        "Cartões de visita e papelaria",
        "Banners e materiais promocionais"
      ],
      pricing: "A partir de 8,000 MT",
      deliveryTime: "1-2 semanas"
    },
    {
      title: "Tráfego Pago",
      description: "Campanhas estratégicas no Google e Facebook para aumentar suas vendas.",
      icon: <TrendingUp className="w-8 h-8" />,
      image: "/lovable-uploads/consultoria-marketing-banner.png",
      features: [
        "Google Ads e Facebook Ads",
        "Segmentação precisa do público-alvo",
        "Criação de anúncios persuasivos",
        "Relatórios detalhados de performance",
        "Otimização contínua das campanhas",
        "ROI garantido e mensurável"
      ],
      pricing: "A partir de 5,000 MT/mês",
      deliveryTime: "Início imediato"
    },
    {
      title: "Gestão de Redes Sociais",
      description: "Presença digital forte e engajamento autêntico com o seu público.",
      icon: <Share2 className="w-8 h-8" />,
      image: "/lovable-uploads/consultoria-marketing-banner.png",
      features: [
        "Criação de conteúdo estratégico",
        "Gestão completa das redes sociais",
        "Aumento do engajamento orgânico",
        "Análise de métricas e resultados",
        "Resposta a comentários e mensagens",
        "Estratégia de crescimento personalizada"
      ],
      pricing: "A partir de 6,000 MT/mês",
      deliveryTime: "Início imediato"
    },
    {
      title: "Consultoria de Marketing",
      description: "Estratégias personalizadas para acelerar o crescimento do seu negócio.",
      icon: <MessageSquare className="w-8 h-8" />,
      image: "/lovable-uploads/consultoria-marketing-banner.png",
      features: [
        "Análise completa do mercado",
        "Estratégia de marketing personalizada",
        "Plano de ação detalhado",
        "Acompanhamento e mentoria",
        "Otimização de processos",
        "Relatórios de progresso regulares"
      ],
      pricing: "A partir de 10,000 MT",
      deliveryTime: "1 semana"
    },
    {
      title: "Instalações Elétricas",
      description: "Soluções elétricas completas para residências e indústrias com segurança garantida.",
      icon: <Zap className="w-8 h-8" />,
      image: "/lovable-uploads/instalacoes-eletricas-banner.webp",
      features: [
        "Instalações elétricas residenciais",
        "Projetos elétricos industriais",
        "Manutenção elétrica preventiva",
        "Adequação às normas técnicas",
        "Certificação e ART profissional",
        "Suporte técnico especializado"
      ],
      pricing: "A partir de 12,000 MT",
      deliveryTime: "1-3 semanas"
    },
    {
      title: "Topografia",
      description: "Levantamentos topográficos e demarcação de terrenos com precisão e qualidade.",
      icon: <MapPin className="w-8 h-8" />,
      image: "/lovable-uploads/topografia-banner.webp",
      features: [
        "Levantamentos topográficos precisos",
        "Demarcação e divisão de terrenos",
        "Plantas topográficas detalhadas",
        "Certificação profissional ART",
        "Equipamentos de última geração",
        "Relatórios técnicos completos"
      ],
      pricing: "A partir de 8,000 MT",
      deliveryTime: "1-2 semanas"
    },
    {
      title: "Ensaios Fotográficos",
      description: "Fotografia profissional sem sair de casa com flexibilidade total.",
      icon: <Camera className="w-8 h-8" />,
      image: "/lovable-uploads/ensaios-fotograficos-banner.webp",
      features: [
        "Sessões no local da sua escolha",
        "Edição profissional incluída",
        "Flexibilidade total de horário",
        "Entrega rápida das fotos",
        "Sem limitações de vestuário",
        "Qualidade de estúdio garantida"
      ],
      pricing: "A partir de 3,500 MT",
      deliveryTime: "48 horas"
    }
  ];

  const additionalServices = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Aplicações Mobile",
      description: "Apps nativos para Android e iOS"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Avançado",
      description: "Otimização profunda para motores de busca"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Relatórios",
      description: "Análise detalhada de dados e performance"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Automação de Marketing",
      description: "Sistemas automatizados de vendas e marketing"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consulta Inicial",
      description: "Analisamos as suas necessidades e objetivos de negócio."
    },
    {
      step: "02",
      title: "Proposta Personalizada",
      description: "Criamos uma estratégia e orçamento adaptados ao seu projeto."
    },
    {
      step: "03",
      title: "Desenvolvimento",
      description: "Executamos o projeto com atualizações regulares do progresso."
    },
    {
      step: "04",
      title: "Entrega & Suporte",
      description: "Entregamos o projeto finalizado com suporte contínuo."
    }
  ];

  const servicesStructuredData = mainServices.map(service => 
    generateServiceData({
      name: service.title,
      description: service.description,
      url: `https://www.lgtecserv.com/servicos/${service.title.toLowerCase().replace(/\s+/g, '-')}`,
      price: service.pricing
    })
  );

  return (
    <>
      <SEOHead
        title="Serviços de Marketing Digital e Soluções Técnicas - LG TecServ Moçambique"
        description="Descubra todos os serviços da LG TecServ: criação de sites, design gráfico, tráfego pago, gestão de redes sociais, consultoria de marketing e instalações elétricas em Moçambique."
        keywords="serviços marketing digital, criação sites Moçambique, design gráfico, tráfego pago, redes sociais, consultoria marketing, instalações elétricas, LG TecServ"
        image="https://www.lgtecserv.com/lovable-uploads/consultoria-marketing-banner.png"
        url="https://www.lgtecserv.com/servicos-lg-tecserv-mocambique"
        type="website"
        structuredData={[organizationData, ...servicesStructuredData]}
      />
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nossos <span className="gradient-text">Serviços</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              Soluções digitais completas para fazer o seu negócio crescer 
              e destacar-se no mercado competitivo de hoje.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <Card className="bg-gradient-card border-0 shadow-elegant p-8 h-full">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="font-semibold mb-3">O que inclui:</h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Benefícios extras:</h4>
                        <ul className="space-y-2">
                          {service.features.slice(3).map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-center border-t pt-6">
                      <Button asChild className="bg-gradient-primary shadow-primary">
                        <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                          Solicitar Orçamento
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </Card>
                </div>
                
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-video rounded-lg overflow-hidden shadow-elegant">
                    <img 
                      src={service.image} 
                      alt={`Serviço de ${service.title}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Serviços <span className="gradient-text">Adicionais</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Expandimos constantemente os nossos serviços para atender 
              todas as necessidades digitais do seu negócio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Como <span className="gradient-text">Trabalhamos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Um processo simples e transparente para garantir 
              o sucesso do seu projeto.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white text-xl font-bold">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-primary" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              Pronto para Começar o Seu Projeto?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-balance">
              Entre em contacto connosco hoje e receba um orçamento 
              personalizado e gratuito para o seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary" 
                asChild
                className="text-lg px-8 bg-white text-primary hover:bg-white/90"
              >
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Orçamento Gratuito
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
              >
                <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Gallery */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Galeria dos <span className="gradient-text">Nossos Serviços</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Conheça visualmente os serviços que oferecemos com qualidade e excelência.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} className="group">
                <div className="aspect-video rounded-lg overflow-hidden shadow-elegant bg-gradient-card">
                  <img 
                    src={service.image} 
                    alt={`Serviço de ${service.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      </div>
    </>
  );
};

export default Services;