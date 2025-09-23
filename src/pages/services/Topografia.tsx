import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { ArrowRight, CheckCircle, MapPin, Ruler, FileText, Shield, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import OptimizedImage from "@/components/ui/optimized-image";
import RelatedLinks from "@/components/ui/related-links";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";

const Topografia = () => {
  const services = [
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Levantamentos Topográficos",
      description: "Medições precisas de terrenos e edificações com equipamentos de última geração."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Demarcação de Terrenos", 
      description: "Definição exata de limites e divisões de propriedades conforme documentação legal."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Plantas Topográficas",
      description: "Elaboração de plantas técnicas detalhadas para projetos de construção e licenciamento."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Certificação ART",
      description: "Anotação de Responsabilidade Técnica com validade legal em todo o território nacional."
    }
  ];

  const advantages = [
    "Equipamentos GPS de alta precisão",
    "Profissionais certificados e experientes", 
    "Conformidade com normas técnicas",
    "Relatórios detalhados e organizados",
    "Prazos de entrega garantidos",
    "Suporte técnico pós-entrega"
  ];

  const mozambiqueAdvantages = [
    {
      title: "Conhecimento Local",
      description: "Experiência com as especificidades do terreno moçambicano e regulamentações locais."
    },
    {
      title: "Rapidez na Execução", 
      description: "Equipa local que garante agilidade nos levantamentos e entregas em Maputo e região."
    },
    {
      title: "Preços Competitivos",
      description: "Tarifas justas e transparentes, adequadas ao mercado moçambicano."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Serviços Topográficos Profissionais",
    "description": "Serviços topográficos profissionais em Maputo e Moçambique. Levantamentos topográficos, demarcação de terrenos e projetos técnicos com precisão e qualidade.",
    "provider": {
      "@type": "Organization",
      "name": "LG TecServ",
      "url": "https://www.lgtecserv.com",
      "logo": "https://www.lgtecserv.com/lovable-uploads/7c383221-e93f-4908-a3ab-03f2194a4b5b.png"
    },
    "areaServed": {
      "@type": "Place", 
      "name": "Moçambique"
    },
    "offers": {
      "@type": "Offer",
      "availability": "InStock",
      "priceRange": "A partir de 8,000 MT"
    }
  };

  return (
    <>
      <SEOHead
        title="Serviços Topográficos Profissionais em Maputo | Topografia - LG TecServ"
        description="Serviços topográficos profissionais em Maputo e Moçambique. Levantamentos topográficos, demarcação de terrenos e projetos técnicos com precisão e qualidade."
        keywords="topografia Maputo, levantamentos topográficos, demarcação terrenos, serviços topográficos Moçambique, LG TecServ"
        image="https://www.lgtecserv.com/lovable-uploads/topografia-banner.webp"
        url="https://www.lgtecserv.com/servicos/servicos-topograficos-profissionais-maputo-mocambique"
        type="service"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <OptimizedImage
              src="/lovable-uploads/topografia-banner.webp"
              alt="Serviços Topográficos Profissionais em Maputo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <FloatingElements />
          
          <div className="relative container mx-auto px-4">
            <ScrollReveal className="max-w-4xl">
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium mb-4">
                Topografia Profissional
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Serviços <span className="gradient-text">Topográficos</span> de Precisão
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance max-w-3xl">
                Levantamentos topográficos, demarcação de terrenos e projetos técnicos 
                com a mais alta precisão em Maputo e toda Moçambique.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-primary shadow-primary">
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20preciso%20de%20servi%C3%A7os%20topogr%C3%A1ficos.%20Podem%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    Saiba Mais
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Nossos <span className="gradient-text">Serviços Topográficos</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Oferecemos uma gama completa de serviços topográficos com 
                tecnologia avançada e profissionais especializados.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="bg-gradient-card border-0 shadow-elegant hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-base">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Por Que Escolher Nossos <span className="gradient-text">Serviços Topográficos?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Nossa equipa de topógrafos certificados utiliza equipamentos de 
                  última geração para garantir a máxima precisão em cada projeto.
                </p>
                
                <div className="space-y-4">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-base">{advantage}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="space-y-6">
                  {mozambiqueAdvantages.map((advantage, index) => (
                    <Card key={index} className="bg-gradient-card border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Award className="w-5 h-5 text-primary" />
                          <span>{advantage.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{advantage.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O Que Está <span className="gradient-text">Incluído</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Cada projeto topográfico inclui tudo o que precisa para 
                garantir o sucesso do seu empreendimento.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0}>
                <Card className="bg-gradient-card border-0 shadow-elegant text-center p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Levantamento no Local</h3>
                  <p className="text-muted-foreground">
                    Visita técnica para medições precisas com equipamentos GPS profissionais.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <Card className="bg-gradient-card border-0 shadow-elegant text-center p-6">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Plantas Técnicas</h3>
                  <p className="text-muted-foreground">
                    Elaboração de plantas topográficas detalhadas em formato digital e impresso.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <Card className="bg-gradient-card border-0 shadow-elegant text-center p-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Certificação Legal</h3>
                  <p className="text-muted-foreground">
                    ART (Anotação de Responsabilidade Técnica) e toda documentação necessária.
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <ScrollReveal className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                Precisa de Serviços Topográficos Profissionais?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-balance">
                Entre em contacto connosco hoje e receba um orçamento 
                personalizado para o seu projeto topográfico.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  asChild
                  className="text-lg px-8 bg-white text-primary hover:bg-white/90"
                >
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20preciso%20de%20servi%C3%A7os%20topogr%C3%A1ficos.%20Podem%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                    Solicitar Orçamento
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
                >
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    Mais Informações
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <RelatedLinks 
          currentPath="/servicos/servicos-topograficos-profissionais-maputo-mocambique"
        />

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Topografia;