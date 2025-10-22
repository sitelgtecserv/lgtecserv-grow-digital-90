import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";
import { 
  Building2, 
  Shield, 
  Cog, 
  FileCheck, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Clock,
  Award,
  Users,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData } from "@/utils/seoData";
import electricalIndustrialImage from "@/assets/electrical-industrial.jpg";

const EletricidadeIndustrial = () => {
  const services = [
    {
      title: "Projetos Elétricos Industriais",
      description: "Desenvolvimento completo de projetos elétricos para indústrias",
      features: [
        "Análise de carga e demanda",
        "Projeto de distribuição elétrica",
        "Dimensionamento de cabos e proteções",
        "Projeto de iluminação industrial",
        "Memorial descritivo completo",
        "ART de projeto e execução"
      ]
    },
    {
      title: "Instalação de Painéis Elétricos",
      description: "Montagem e instalação de quadros de comando e distribuição",
      features: [
        "Painéis de baixa e média tensão",
        "CCM (Centro de Controle de Motores)",
        "Quadros de distribuição geral",
        "Painéis de automação",
        "Sistemas de proteção e medição",
        "Testes e comissionamento"
      ]
    },
    {
      title: "Automação Industrial",
      description: "Sistemas automatizados para otimização de processos",
      features: [
        "Programação de CLPs",
        "Sistemas supervisórios",
        "Redes industriais",
        "Sensores e atuadores",
        "Interfaces homem-máquina",
        "Integração de sistemas"
      ]
    },
    {
      title: "Manutenção Industrial",
      description: "Manutenção preventiva e corretiva de sistemas elétricos",
      features: [
        "Inspeção termográfica",
        "Análise de vibração",
        "Teste de isolamento",
        "Manutenção de motores",
        "Calibração de instrumentos",
        "Relatórios técnicos"
      ]
    }
  ];

  const certifications = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "NR-10 Compliant",
      description: "Seguimos rigorosamente as normas de segurança NR-10."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certificações Técnicas",
      description: "Profissionais certificados com ART e responsabilidade técnica."
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Laudos e Relatórios",
      description: "Documentação completa conforme normas regulamentadoras."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Equipe Especializada",
      description: "Engenheiros e técnicos com experiência industrial comprovada."
    }
  ];

  const industries = [
    "Alimentícia",
    "Petroquímica", 
    "Mineração",
    "Metalúrgica",
    "Farmacêutica",
    "Têxtil",
    "Automotiva",
    "Papel e Celulose"
  ];

  const process = [
    {
      step: "01",
      title: "Análise Técnica",
      description: "Visita técnica para análise das necessidades industriais específicas."
    },
    {
      step: "02",
      title: "Projeto Executivo",
      description: "Desenvolvimento do projeto elétrico completo com memorial descritivo."
    },
    {
      step: "03",
      title: "Execução Profissional",
      description: "Instalação seguindo normas de segurança e qualidade industrial."
    },
    {
      step: "04",
      title: "Comissionamento",
      description: "Testes, certificação e entrega com documentação técnica completa."
    }
  ];

  const serviceStructuredData = generateServiceData({
    name: "Eletricidade Industrial",
    description: "Serviços elétricos industriais especializados, automação e manutenção para empresas em Moçambique",
    url: "https://www.lgtecserv.com/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique",
    price: "Consulte orçamento"
  });

  return (
    <>
      <SEOHead
        title="Eletricidade Industrial e Instalações Empresariais | Automação Moçambique - LG TecServ"
        description="Serviços de eletricidade industrial em Moçambique. Instalações empresariais, automação, manutenção preventiva e projetos elétricos para indústrias com certificação técnica."
        keywords="eletricidade industrial Moçambique, automação industrial, instalações empresariais, manutenção industrial, projetos elétricos, indústria, LG TecServ"
        image="https://www.lgtecserv.com/assets/electrical-industrial.jpg"
        url="https://www.lgtecserv.com/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
                  <Building2 className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Eletricidade <span className="gradient-text">Industrial</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-balance">
                  Soluções elétricas robustas para indústrias e fábricas, 
                  com foco em segurança, eficiência e conformidade normativa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    asChild
                    className="bg-gradient-primary shadow-primary"
                  >
                    <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20preciso%20de%20or%C3%A7amento%20para%20eletricidade%20industrial." target="_blank" rel="noopener noreferrer">
                      Orçamento Personalizado
                      <Phone className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    asChild
                  >
                    <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                      Falar com Engenheiro
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="relative">
                <img 
                  src={electricalIndustrialImage} 
                  alt="Eletricidade Industrial"
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
                Soluções completas em eletricidade industrial para maximizar 
                a eficiência e segurança dos seus processos.
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

      {/* Industries Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Sectores <span className="gradient-text">Atendidos</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Experiência comprovada em diversos sectores industriais.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-md transition-shadow duration-300 text-center p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                    <Cog className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">{industry}</h3>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Certificações e <span className="gradient-text">Qualificações</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Profissionais qualificados e certificados para projetos industriais.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                      {cert.icon}
                    </div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {cert.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Nosso <span className="gradient-text">Processo</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Metodologia estruturada para projetos industriais de excelência.
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
                Precisa de Soluções Elétricas Industriais?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-balance">
                Fale com nossos engenheiros especializados e receba 
                uma proposta técnica personalizada para o seu projeto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  asChild
                  className="text-lg px-8 bg-white text-primary hover:bg-white/90"
                >
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20preciso%20de%20consultoria%20para%20projeto%20el%C3%A9trico%20industrial." target="_blank" rel="noopener noreferrer">
                    Consultoria Técnica
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
                    Solicitar Proposta
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

export default EletricidadeIndustrial;