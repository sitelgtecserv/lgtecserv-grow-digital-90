import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";
import { 
  Home, 
  Shield, 
  Lightbulb, 
  Plug, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Clock,
  Award,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData, faqData } from "@/utils/seoData";
import electricalResidentialImage from "@/assets/electrical-residential.jpg";

const EletricidadeResidencial = () => {
  const services = [
    {
      title: "Instalação Elétrica Nova",
      description: "Projeto e instalação completa para construções novas",
      features: [
        "Projeto elétrico residencial",
        "Instalação de toda a rede elétrica",
        "Quadro de distribuição",
        "Pontos de tomadas e iluminação",
        "Aterramento e proteção",
        "ART e certificação"
      ]
    },
    {
      title: "Reforma Elétrica",
      description: "Adequação e modernização de instalações existentes",
      features: [
        "Diagnóstico da instalação atual",
        "Adequação às normas NBR 5410",
        "Troca de quadros antigos",
        "Ampliação de circuitos",
        "Instalação de DR e DPS",
        "Laudo técnico"
      ]
    },
    {
      title: "Automação Residencial",
      description: "Soluções inteligentes para conforto e economia",
      features: [
        "Iluminação automatizada",
        "Controle de portões e cancelas",
        "Sistemas de segurança",
        "Controle por smartphone",
        "Sensores de presença",
        "Temporizadores inteligentes"
      ]
    },
    {
      title: "Manutenção Elétrica",
      description: "Serviços de manutenção preventiva e corretiva",
      features: [
        "Inspeção termográfica",
        "Teste de DR e disjuntores",
        "Limpeza de quadros elétricos",
        "Aperto de conexões",
        "Medição de isolamento",
        "Relatório técnico"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Segurança da Família",
      description: "Instalações que protegem sua família contra choques e incêndios."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Normas Técnicas",
      description: "Seguimos rigorosamente a NBR 5410 e demais normas."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Execução Rápida",
      description: "Prazos otimizados sem comprometer a qualidade."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Equipe Especializada",
      description: "Eletricistas residenciais certificados e experientes."
    }
  ];

  const faq = [
    {
      question: "Qual o prazo para instalação elétrica residencial?",
      answer: "Depende do tamanho da residência. Uma casa de 100m² leva entre 3-5 dias úteis."
    },
    {
      question: "É necessário ART para instalação residencial?",
      answer: "Sim, fornecemos ART (Anotação de Responsabilidade Técnica) em todos os projetos."
    },
    {
      question: "Que garantia vocês oferecem?",
      answer: "24 meses de garantia para serviços e 12 meses para materiais fornecidos."
    },
    {
      question: "Fazem orçamento sem compromisso?",
      answer: "Sim, fazemos avaliação técnica e orçamento gratuito sem compromisso."
    }
  ];

  const serviceStructuredData = generateServiceData({
    name: "Eletricidade Residencial",
    description: "Serviços elétricos residenciais especializados, instalações domésticas e manutenção em Moçambique",
    url: "https://www.lgtecserv.com/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique",
    price: "Consulte orçamento"
  });

  const faqStructuredData = faqData(faq.map(item => ({
    question: item.question,
    answer: item.answer
  })));

  return (
    <>
      <SEOHead
        title="Eletricidade Residencial e Instalações Domésticas | Eletricista Moçambique - LG TecServ"
        description="Serviços de eletricidade residencial em Moçambique. Instalações domésticas, manutenção elétrica, reparos e adequações com eletricistas qualificados e certificados."
        keywords="eletricidade residencial Moçambique, eletricista doméstico, instalações casa, manutenção elétrica, reparos elétricos, adequação elétrica, LG TecServ"
        image="https://www.lgtecserv.com/assets/electrical-residential.jpg"
        url="https://www.lgtecserv.com/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique"
        type="service"
        structuredData={[organizationData, serviceStructuredData, faqStructuredData]}
      />
      <div className="min-h-screen">
        <Breadcrumbs />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
                  <Home className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Eletricidade <span className="gradient-text">Residencial</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-balance">
                  Instalações elétricas seguras e confiáveis para sua casa, 
                  seguindo todas as normas técnicas e garantindo a segurança da sua família.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    asChild
                    className="bg-gradient-primary shadow-primary"
                  >
                    <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20preciso%20de%20or%C3%A7amento%20para%20eletricidade%20residencial." target="_blank" rel="noopener noreferrer">
                      Orçamento Grátis
                      <Phone className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    asChild
                  >
                    <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                      Falar com Especialista
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="relative">
                <img 
                  src={electricalResidentialImage} 
                  alt="Eletricidade Residencial"
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Nossos <span className="gradient-text">Serviços</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Soluções completas em eletricidade residencial para todas as suas necessidades.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <Card className="bg-gradient-card border-0 shadow-elegant hover:shadow-2xl transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
                Vantagens dos <span className="gradient-text">Nossos Serviços</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Porque escolher nossa equipe para sua instalação elétrica residencial.
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

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Perguntas <span className="gradient-text">Frequentes</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Esclarecemos as principais dúvidas sobre eletricidade residencial.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="bg-gradient-card border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-left">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
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
                Pronto para Ter uma Instalação Elétrica Segura?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-balance">
                Entre em contacto connosco hoje e garanta a segurança 
                da sua família com uma instalação elétrica profissional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  asChild
                  className="text-lg px-8 bg-white text-primary hover:bg-white/90"
                >
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20quero%20uma%20avalia%C3%A7%C3%A3o%20da%20minha%20instala%C3%A7%C3%A3o%20el%C3%A9trica%20residencial." target="_blank" rel="noopener noreferrer">
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
                    Solicitar Orçamento
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

export default EletricidadeResidencial;