import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BusinessBanner from "@/components/ui/business-banner";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";
import HeroBanner from "@/components/ui/hero-banner";
import { 
  Globe, 
  Search, 
  Smartphone, 
  Shield, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Code,
  Zap,
  Users,
  Star,
  Timer
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/ui/related-links";
import { generateServiceData, organizationData, faqData } from "@/utils/seoData";
import webDevelopmentHero from "@/assets/web-development-hero.jpg";

const CriacaoSites = () => {
  const benefits = [
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Presença Digital 24/7",
      description: "O seu negócio disponível online 24 horas por dia, 7 dias por semana"
    },
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Visibilidade no Google",
      description: "Sites otimizados para aparecer nas primeiras posições de pesquisa"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      title: "Design Responsivo",
      description: "Perfeito funcionamento em computadores, tablets e telemóveis"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Aumento de Vendas",
      description: "Converta mais visitantes em clientes com design estratégico"
    }
  ];

  const features = [
    "Design moderno e profissional",
    "Otimização para motores de busca (SEO)",
    "Sistema de gestão de conteúdos",
    "Integração com redes sociais",
    "Formulários de contacto",
    "Galeria de imagens",
    "Certificado SSL de segurança",
    "Hospedagem incluída no primeiro ano",
    "Suporte técnico 24/7",
    "Relatórios de performance"
  ];

  const whyChoose = [
    {
      title: "Mercado Moçambicano em Crescimento",
      description: "Com mais de 13 milhões de utilizadores de internet em Moçambique, ter um site é essencial para alcançar novos clientes."
    },
    {
      title: "Competitividade Local",
      description: "Destaque-se da concorrência com um site profissional que transmite credibilidade e confiança."
    },
    {
      title: "Crescimento do E-commerce",
      description: "O comércio electrónico em Moçambique cresce 25% ao ano. Não fique de fora desta oportunidade."
    }
  ];

  const serviceStructuredData = generateServiceData({
    name: "Criação de Sites Profissionais",
    description: "Desenvolvimento de sites profissionais, responsivos e otimizados para SEO em Moçambique",
    url: "https://www.lgtecserv.com/servicos/criacao-desenvolvimento-sites-profissionais-mocambique",
    price: "A partir de 15,000 MT"
  });

  return (
    <>
      <SEOHead
        title="Criação de Sites Profissionais em Moçambique | Desenvolvimento Web - LG TecServ"
        description="Criação de sites profissionais e responsivos em Moçambique. Desenvolvimento web com SEO otimizado, design moderno e preços acessíveis. Orçamento gratuito!"
        keywords="criação sites Moçambique, desenvolvimento web, sites responsivos, SEO, design web, programação sites, LG TecServ, Maputo"
        image="https://www.lgtecserv.com/lovable-uploads/criacao-sites-banner.png"
        url="https://www.lgtecserv.com/servicos/criacao-desenvolvimento-sites-profissionais-mocambique"
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
          style={{ backgroundImage: `url(${webDevelopmentHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
        <FloatingElements />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Criação de Sites
                <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Profissionais em Moçambique
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                Desenvolva a presença digital da sua empresa com sites modernos, rápidos e otimizados 
                para conquistar mais clientes no mercado moçambicano.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    Solicitar Orçamento
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                  <a href="https://wa.me/258869824047" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
                O que é <span className="gradient-text">Criação de Sites?</span>
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed">
                A criação de sites é o desenvolvimento de plataformas digitais que representam a sua empresa na internet. 
                É o seu cartão de visita digital, disponível 24 horas por dia para apresentar os seus produtos e serviços 
                aos clientes em Moçambique e no mundo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Code className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Tecnologia Avançada</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Utilizamos as mais recentes tecnologias web para garantir sites rápidos, 
                      seguros e compatíveis com todos os dispositivos.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Zap className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Performance Otimizada</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Sites com carregamento ultra-rápido, essencial para manter os visitantes 
                      engajados e melhorar o posicionamento no Google.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              Benefícios de Ter um <span className="gradient-text">Site Profissional</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="group p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/80">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              Vantagens em <span className="gradient-text">Moçambique</span>
            </h2>
          </ScrollReveal>
          
          <div className="space-y-8">
            {whyChoose.map((item, index) => (
              <ScrollReveal key={index} delay={index * 200}>
                <Card className="group p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-0 bg-gradient-to-r from-card to-card/80">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                        <span className="text-primary font-bold text-xl">{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Como um Site Pode <span className="gradient-text">Transformar o Seu Negócio</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <ScrollReveal delay={100}>
                  <div className="group text-center p-6 rounded-lg hover:bg-muted/50 transition-all duration-300">
                    <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Alcance Mais Clientes</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Chegue a milhões de moçambicanos que pesquisam produtos e serviços online diariamente.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <div className="group text-center p-6 rounded-lg hover:bg-muted/50 transition-all duration-300">
                    <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Shield className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Credibilidade</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Um site profissional transmite confiança e legitima a sua empresa perante os clientes.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={300}>
                  <div className="group text-center p-6 rounded-lg hover:bg-muted/50 transition-all duration-300">
                    <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <TrendingUp className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Aumento de Vendas</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Converta visitantes em clientes com um site otimizado para vendas e conversões.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                O que Está <span className="gradient-text">Incluído</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <ScrollReveal key={index} delay={index * 50}>
                    <div className="group flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300">
                      <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg font-medium group-hover:text-primary transition-colors">{feature}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary via-primary-dark to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Pronto para Ter o Seu Site Profissional?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
                Entre em contacto connosco hoje e comece a transformar a presença digital do seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="group">
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    Solicitar Orçamento Gratuito
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                  <a href="https://wa.me/258869824047" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
              
              <div className="mt-12 flex justify-center items-center gap-8 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  <span>Entrega em 7 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Garantia de qualidade</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Links */}
      <RelatedLinks currentPath="/servicos/criacao-desenvolvimento-sites-profissionais-mocambique" />

      {/* Business Banner */}
      <BusinessBanner />

      <Footer />
      <WhatsAppButton />
      </div>
    </>
  );
};

export default CriacaoSites;