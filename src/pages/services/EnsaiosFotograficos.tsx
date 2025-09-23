import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { ArrowRight, CheckCircle, Camera, Clock, MapPin, Palette, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import OptimizedImage from "@/components/ui/optimized-image";
import RelatedLinks from "@/components/ui/related-links";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";

const EnsaiosFotograficos = () => {
  const services = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Retratos Profissionais",
      description: "Fotos incríveis para perfis profissionais, LinkedIn e redes sociais."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Ensaios Casuais", 
      description: "Sessões descontraídas para capturar a sua personalidade autêntica."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Fotos de Família",
      description: "Momentos especiais em família capturados com carinho e profissionalismo."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Edição Profissional",
      description: "Tratamento avançado das imagens para resultados deslumbrantes."
    }
  ];

  const advantages = [
    "Sem necessidade de ir ao estúdio",
    "Flexibilidade total de horário",
    "Qualquer lugar, qualquer roupa", 
    "Edição profissional incluída",
    "Entrega rápida das fotos",
    "Preços acessíveis e justos"
  ];

  const mozambiqueAdvantages = [
    {
      title: "Comodidade Total",
      description: "Fazemos o ensaio onde estiver - em casa, no trabalho ou no local da sua preferência."
    },
    {
      title: "Sem Limitações", 
      description: "Use a roupa que quiser, no momento que preferir. Total liberdade criativa."
    },
    {
      title: "Qualidade Garantida",
      description: "Resultados profissionais com a conveniência que merece, aqui em Moçambique."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ensaios Fotográficos Profissionais Sem Ir ao Estúdio",
    "description": "Ensaios fotográficos profissionais sem precisar ir ao estúdio. Fotos incríveis a qualquer lugar e momento em Moçambique. Transforme suas memórias!",
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
      "priceRange": "A partir de 3,500 MT"
    }
  };

  return (
    <>
      <SEOHead
        title="Ensaios Fotográficos Profissionais Sem Ir ao Estúdio | Fotografia - LG TecServ"
        description="Ensaios fotográficos profissionais sem precisar ir ao estúdio. Fotos incríveis a qualquer lugar e momento em Moçambique. Transforme suas memórias!"
        keywords="ensaios fotográficos Moçambique, fotografia sem estúdio, fotos profissionais, sessão fotográfica, LG TecServ Maputo"
        image="https://www.lgtecserv.com/lovable-uploads/ensaios-fotograficos-banner.webp"
        url="https://www.lgtecserv.com/servicos/ensaios-fotograficos-profissionais-sem-studio-mocambique"
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
              src="/lovable-uploads/ensaios-fotograficos-banner.webp"
              alt="Ensaios Fotográficos Profissionais Sem Ir ao Estúdio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <FloatingElements />
          
          <div className="relative container mx-auto px-4">
            <ScrollReveal className="max-w-4xl">
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium mb-4">
                Fotografia Profissional
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Ensaios <span className="gradient-text">Fotográficos</span> Sem Sair de Casa
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance max-w-3xl">
                Fotos profissionais incríveis sem precisar ir ao estúdio. 
                Flexibilidade total para capturar os seus melhores momentos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-primary shadow-primary">
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20quero%20fazer%20um%20ensaio%20fotogr%C3%A1fico.%20Podem%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                    Agendar Ensaio
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
                Tipos de <span className="gradient-text">Ensaios Fotográficos</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Oferecemos diversos estilos de ensaios fotográficos para 
                capturar a sua essência de forma única e autêntica.
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
                  Por Que Escolher Nossos <span className="gradient-text">Ensaios Fotográficos?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Revolucionamos a fotografia profissional em Moçambique, 
                  oferecendo comodidade sem comprometer a qualidade.
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
                          <Camera className="w-5 h-5 text-primary" />
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
                Cada ensaio fotográfico inclui tudo o que precisa para 
                obter fotos profissionais deslumbrantes.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0}>
                <Card className="bg-gradient-card border-0 shadow-elegant text-center p-6">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Sessão no Local</h3>
                  <p className="text-muted-foreground">
                    Fazemos o ensaio onde estiver - casa, escritório ou local da sua escolha.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <Card className="bg-gradient-card border-0 shadow-elegant text-center p-6">
                  <Palette className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Edição Profissional</h3>
                  <p className="text-muted-foreground">
                    Tratamento avançado das imagens para resultados perfeitos e naturais.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <Card className="bg-gradient-card border-0 shadow-elegant text-center p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Entrega Rápida</h3>
                  <p className="text-muted-foreground">
                    Receba suas fotos editadas em alta resolução em até 48 horas.
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
                Pronto para o Seu Ensaio Fotográfico?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-balance">
                Agende já o seu ensaio fotográfico e transforme os seus 
                momentos em memórias inesquecíveis com qualidade profissional.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  asChild
                  className="text-lg px-8 bg-white text-primary hover:bg-white/90"
                >
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20quero%20fazer%20um%20ensaio%20fotogr%C3%A1fico.%20Podem%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                    Agendar Ensaio
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
          currentPath="/servicos/ensaios-fotograficos-profissionais-sem-studio-mocambique"
        />

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default EnsaiosFotograficos;