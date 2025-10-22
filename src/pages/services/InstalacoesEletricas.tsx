import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";
import { 
  Zap, 
  Shield, 
  Award, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Home,
  Building2,
  Users,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData } from "@/utils/seoData";
import electricalIndustrialImage from "@/assets/electrical-industrial.jpg";
import electricalResidentialImage from "@/assets/electrical-residential.jpg";

const InstalacoesEletricas = () => {
  const mainServices = [
    {
      title: "Instalações Residenciais",
      description: "Soluções elétricas completas para casas, apartamentos e condomínios com foco na segurança da sua família.",
      icon: <Home className="w-8 h-8" />,
      image: electricalResidentialImage,
      features: [
        "Instalação elétrica completa nova",
        "Reformas e adequações às normas",
        "Sistemas de segurança residencial",
        "Automação residencial básica",
        "Manutenção preventiva",
        "Certificação e ART"
      ],
      pricing: "A partir de 12.000 MT",
      link: "/servicos/eletricidade-residencial"
    },
    {
      title: "Instalações Industriais",
      description: "Projetos elétricos industriais robustos com certificação profissional para fábricas e indústrias.",
      icon: <Building2 className="w-8 h-8" />,
      image: electricalIndustrialImage,
      features: [
        "Projetos elétricos industriais",
        "Instalação de painéis e quadros",
        "Sistemas de automação industrial",
        "Manutenção industrial preventiva",
        "Adequação às normas de segurança",
        "Laudos técnicos e certificações"
      ],
      pricing: "Orçamento personalizado",
      link: "/servicos/eletricidade-industrial"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Segurança Garantida",
      description: "Todas as instalações seguem rigorosamente as normas de segurança."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certificação Profissional",
      description: "Eletricistas certificados com ART e responsabilidade técnica."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Prazos Cumpridos",
      description: "Compromisso com prazos de entrega e execução eficiente."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Equipe Especializada",
      description: "Profissionais qualificados com experiência comprovada."
    }
  ];

  const process = [
    {
      step: "01",
      title: "Avaliação Técnica",
      description: "Visita técnica gratuita para análise das necessidades elétricas."
    },
    {
      step: "02",
      title: "Projeto & Orçamento",
      description: "Elaboração do projeto elétrico e orçamento detalhado."
    },
    {
      step: "03",
      title: "Execução",
      description: "Instalação profissional com materiais de primeira qualidade."
    },
    {
      step: "04",
      title: "Certificação",
      description: "Entrega com certificação, garantia e manuais técnicos."
    }
  ];

  const serviceStructuredData = generateServiceData({
    name: "Instalações Elétricas Profissionais",
    description: "Instalações elétricas residenciais e industriais com segurança garantida em Moçambique",
    url: "https://www.lgtecserv.com/servicos/instalacoes-eletricas-profissionais-mocambique",
    price: "A partir de 12,000 MT"
  });

  return (
    <>
      <SEOHead
        title="Instalações Elétricas Profissionais Residenciais e Industriais | Moçambique - LG TecServ"
        description="Instalações elétricas profissionais em Moçambique. Serviços residenciais e industriais com segurança garantida, certificação técnica e manutenção especializada."
        keywords="instalações elétricas Moçambique, eletricista profissional, instalações residenciais, instalações industriais, manutenção elétrica, certificação, LG TecServ"
        image="https://www.lgtecserv.com/lovable-uploads/instalacoes-eletricas-banner.png"
        url="https://www.lgtecserv.com/servicos/instalacoes-eletricas-profissionais-mocambique"
        type="service"
        structuredData={[organizationData, serviceStructuredData]}
      />
      <div className="min-h-screen">
        <Breadcrumbs />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-6">
                <Zap className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Instalações <span className="gradient-text">Elétricas</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
                Soluções elétricas completas para residências e indústrias 
                com segurança, qualidade e certificação profissional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-gradient-primary shadow-primary text-lg px-8"
                >
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20preciso%20de%20or%C3%A7amento%20para%20instala%C3%A7%C3%A3o%20el%C3%A9trica." target="_blank" rel="noopener noreferrer">
                    Orçamento Gratuito
                    <Phone className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="text-lg px-8"
                >
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    Falar com Especialista
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Nossos <span className="gradient-text">Serviços</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Oferecemos soluções elétricas completas para diferentes necessidades 
                e tipos de instalação.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {mainServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 200}>
                <Card className="group relative overflow-hidden hover:shadow-elegant transition-all duration-300 border-0 bg-gradient-card h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="p-3 rounded-lg bg-primary/20 backdrop-blur-sm text-white">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center border-t pt-6">
                      <div>
                        <p className="text-lg font-semibold text-primary">{service.pricing}</p>
                        <p className="text-sm text-muted-foreground">Avaliação técnica gratuita</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        asChild
                      >
                        <Link to={service.link}>
                          Saiba Mais
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
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
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Por que Escolher <span className="gradient-text">Nossa Equipe</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Experiência comprovada e compromisso com a excelência 
                em todas as nossas instalações elétricas.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Nosso <span className="gradient-text">Processo</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Um processo estruturado para garantir a qualidade 
                e segurança em cada projeto.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="text-center">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                Precisa de uma Instalação Elétrica?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-balance">
                Entre em contacto connosco para uma avaliação técnica gratuita 
                e orçamento sem compromisso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  asChild
                  className="text-lg px-8 bg-white text-primary hover:bg-white/90"
                >
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20preciso%20de%20avalia%C3%A7%C3%A3o%20t%C3%A9cnica%20para%20instala%C3%A7%C3%A3o%20el%C3%A9trica." target="_blank" rel="noopener noreferrer">
                    Avaliação Gratuita
                    <Phone className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
                >
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    Falar com Especialista
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      </div>
    </>
  );
};

export default InstalacoesEletricas;