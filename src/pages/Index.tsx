import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceCard } from "@/components/ui/service-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HeroBanner from "@/components/ui/hero-banner";
import BusinessBanner from "@/components/ui/business-banner";
import OptimizedCounter from "@/components/ui/optimized-counter";
import OptimizedScrollReveal from "@/components/ui/optimized-scroll-reveal";
import OptimizedImage from "@/components/ui/optimized-image";
import FloatingElements from "@/components/ui/floating-elements";
import PromotionalCarousel from "@/components/ui/promotional-carousel";
import { 
  Globe, 
  Palette, 
  TrendingUp, 
  Share2, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Code2,
  Rocket,
  Shield,
  Zap,
  Target,
  Award,
  Clock,
  MessageCircle,
  ChevronRight,
  Monitor,
  Smartphone,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import RelatedLinks from "@/components/ui/related-links";
import { organizationData, websiteData } from "@/utils/seoData";

const Index = () => {
  const services = [
    {
      title: "Criação de Sites",
      description: "Sites responsivos e modernos que convertem visitantes em clientes",
      icon: <Globe className="w-6 h-6" />,
      features: [
        "Design responsivo e moderno",
        "Otimização para motores de busca (SEO)",
        "Integração com redes sociais",
        "Painel administrativo intuitivo"
      ],
      image: "/lovable-uploads/13b16b00-a0c3-4b06-97f3-2a00840fba17.png",
      link: "/servicos/criacao-desenvolvimento-sites-profissionais-mocambique"
    },
    {
      title: "Design Gráfico",
      description: "Identidade visual profissional para destacar a sua marca",
      icon: <Palette className="w-6 h-6" />,
      features: [
        "Criação de logótipos únicos",
        "Material gráfico para marketing",
        "Identidade visual completa",
        "Design para redes sociais"
      ],
      image: "/lovable-uploads/6ebe3952-c9f6-4acb-9671-26f3d73b4d89.png",
      link: "/servicos/design-grafico-profissional-mocambique"
    },
    {
      title: "Tráfego Pago",
      description: "Campanhas estratégicas para aumentar suas vendas online",
      icon: <TrendingUp className="w-6 h-6" />,
      features: [
        "Google Ads e Facebook Ads",
        "Segmentação precisa do público",
        "Relatórios detalhados de performance",
        "Otimização contínua das campanhas"
      ],
      image: "/lovable-uploads/97dafdc2-4228-47b1-b714-a1bac6741704.png",
      link: "/servicos/gestao-trafego-pago-marketing-digital-mocambique"
    },
    {
      title: "Gestão de Redes Sociais",
      description: "Presença digital forte e engajamento com seu público",
      icon: <Share2 className="w-6 h-6" />,
      features: [
        "Criação de conteúdo estratégico",
        "Gestão completa das redes sociais",
        "Aumento do engajamento",
        "Análise de métricas e resultados"
      ],
      image: "/lovable-uploads/956f6140-f148-4d7b-8b9e-46e4e63a8bf2.png",
      link: "/servicos/gestao-redes-sociais-marketing-digital-mocambique"
    },
    {
      title: "Consultoria de Marketing",
      description: "Estratégias personalizadas para otimizar seus resultados",
      icon: <Users className="w-6 h-6" />,
      features: [
        "Análise completa do negócio",
        "Estratégias de crescimento",
        "Otimização de processos",
        "Relatórios de performance"
      ],
      image: "/lovable-uploads/8aa64f23-1d05-4062-baf8-1ebc04598ee1.png",
      link: "/servicos/consultoria-marketing-digital-estrategico-mocambique"
    },
    {
      title: "Instalações Elétricas",
      description: "Soluções elétricas completas para residências e indústrias",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Instalações residenciais e industriais",
        "Manutenção elétrica preventiva",
        "Certificação profissional",
        "Suporte técnico especializado"
      ],
      image: "/lovable-uploads/instalacoes-eletricas-banner.webp",
      link: "/servicos/instalacoes-eletricas-profissionais-mocambique"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Boutique Elegância",
      testimonial: "A LG TecServ transformou completamente a nossa presença online. As vendas aumentaram 150% nos primeiros 3 meses!",
      rating: 5
    },
    {
      name: "João Santos",
      company: "Restaurante Sabor Local",
      testimonial: "Excelente trabalho na criação do nosso site e gestão das redes sociais. Recomendo sem hesitação!",
      rating: 5
    },
    {
      name: "Ana Costa",
      company: "Clínica Saúde Total",
      testimonial: "Profissionais dedicados e resultados extraordinários. A nossa visibilidade online melhorou drasticamente.",
      rating: 5
    }
  ];

  const stats = [
    { number: 200, label: "Clientes Satisfeitos", suffix: "+" },
    { number: 500, label: "Projetos Concluídos", suffix: "+" },
    { number: 5, label: "Anos de Experiência", suffix: "+" },
    { number: 98, label: "Taxa de Satisfação", suffix: "%" }
  ];

  const technologies = [
    { name: "React", icon: <Code2 className="w-8 h-8" />, description: "Desenvolvimento moderno" },
    { name: "Next.js", icon: <Rocket className="w-8 h-8" />, description: "Performance avançada" },
    { name: "WordPress", icon: <Monitor className="w-8 h-8" />, description: "Gestão de conteúdo" },
    { name: "Google Ads", icon: <Target className="w-8 h-8" />, description: "Marketing digital" },
    { name: "Facebook Ads", icon: <Users className="w-8 h-8" />, description: "Redes sociais" },
    { name: "SEO", icon: <Search className="w-8 h-8" />, description: "Otimização de busca" }
  ];

  const process = [
    {
      step: "01",
      title: "Descoberta",
      description: "Analisamos o seu negócio e definimos objetivos claros",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "02", 
      title: "Estratégia",
      description: "Criamos um plano personalizado para o seu sucesso",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Execução",
      description: "Implementamos soluções com qualidade e agilidade", 
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Resultados",
      description: "Entregamos resultados mensuráveis e suporte contínuo",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const achievements = [
    {
      title: "Primeira Empresa Certificada",
      description: "Somos a primeira empresa em Moçambique certificada em Google Ads e Facebook Marketing",
      icon: <Award className="w-8 h-8 text-primary" />
    },
    {
      title: "Crescimento Comprovado",
      description: "Nossos clientes veem em média 300% de aumento em vendas online nos primeiros 6 meses",
      icon: <TrendingUp className="w-8 h-8 text-primary" />
    },
    {
      title: "Suporte 24/7",
      description: "Equipa dedicada disponível sempre que precisar, com resposta em menos de 2 horas",
      icon: <Clock className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <>
      <SEOHead
        title="LG TecServ - Soluções Digitais Completas | Criação de Sites, Design e Marketing Digital"
        description="LG TecServ oferece soluções completas em criação de sites, design gráfico, tráfego pago, gestão de redes sociais e consultoria de marketing em Moçambique. Faça seu negócio crescer!"
        keywords="criação de sites, design gráfico, tráfego pago, gestão redes sociais, marketing digital, LG TecServ, Moçambique, soluções digitais, desenvolvimento web"
        image="https://www.lgtecserv.com/lovable-uploads/7c383221-e93f-4908-a3ab-03f2194a4b5b.png"
        url="https://www.lgtecserv.com/"
        type="website"
        structuredData={[organizationData, websiteData]}
      />
      <div className="min-h-screen relative">
      <FloatingElements />
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner />

      {/* Stats Section with Animated Counters */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <OptimizedScrollReveal key={index} delay={index * 100}>
                  <div className="text-center transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      <OptimizedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </OptimizedScrollReveal>
              ))}
            </div>
          </OptimizedScrollReveal>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Tecnologias que <span className="gradient-text">Dominamos</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Utilizamos as ferramentas mais avançadas do mercado para criar soluções inovadoras.
              </p>
            </div>
          </OptimizedScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <OptimizedScrollReveal key={index} delay={index * 100}>
                <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-6 text-center">
                    <div className="text-primary group-hover:scale-110 transition-transform duration-300 mb-3">
                      {tech.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              </OptimizedScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <OptimizedScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  A Nossa <span className="gradient-text">História</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    A LG TecServ nasceu da paixão por tecnologia e da vontade de ajudar 
                    empresas moçambicanas a prosperarem no mundo digital. Fundada em 
                    2019, começámos como uma pequena equipa de profissionais dedicados 
                    ao desenvolvimento web e design gráfico.
                  </p>
                  <p>
                    Ao longo dos anos, expandimos os nossos serviços para incluir marketing 
                    digital, gestão de redes sociais e consultoria estratégica, sempre 
                    mantendo o nosso compromisso com a qualidade e a satisfação do cliente.
                  </p>
                  <p>
                    Hoje, somos orgulhosamente uma das empresas de referência em soluções 
                    digitais em Moçambique, tendo ajudado centenas de empresas a crescer 
                    e a destacar-se nos seus mercados.
                  </p>
                </div>
              </div>
            </OptimizedScrollReveal>
            
            <OptimizedScrollReveal direction="right">
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden shadow-elegant">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/3phYfGSglH8"
                    title="LG TecServ - Nossa História"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </OptimizedScrollReveal>
          </div>
        </div>
      </section>

      {/* Carrossel de Banners Promocionais */}
      <PromotionalCarousel />

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Nossos <span className="gradient-text">Serviços</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Oferecemos soluções completas em marketing digital para 
                impulsionar o crescimento do seu negócio.
              </p>
            </div>
          </OptimizedScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {services.map((service, index) => (
              <OptimizedScrollReveal key={index} delay={index * 150}>
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <ServiceCard {...service} />
                </div>
              </OptimizedScrollReveal>
            ))}
          </div>
          
          <OptimizedScrollReveal delay={800}>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/servicos-lg-tecserv-mocambique">
                  Ver Todos os Serviços
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </OptimizedScrollReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Como <span className="gradient-text">Trabalhamos</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Um processo estruturado e transparente para garantir o sucesso do seu projeto.
              </p>
            </div>
          </OptimizedScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <OptimizedScrollReveal key={index} delay={index * 200}>
                <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <CardHeader className="text-center pb-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </OptimizedScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Por que Somos <span className="gradient-text">Únicos</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Diferenciais que nos tornam a melhor escolha para o seu negócio.
              </p>
            </div>
          </OptimizedScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <OptimizedScrollReveal key={index} delay={index * 200}>
                <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div className="group-hover:scale-110 transition-transform duration-300 mb-6">
                      {achievement.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{achievement.title}</h3>
                    <p className="text-muted-foreground flex-grow">{achievement.description}</p>
                  </CardContent>
                </Card>
              </OptimizedScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <OptimizedScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Por que Escolher a <span className="gradient-text">LG TecServ?</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Equipa especializada em marketing digital",
                    "Soluções personalizadas para cada negócio",
                    "Resultados comprovados e mensuráveis",
                    "Suporte técnico completo e contínuo",
                    "Preços competitivos e transparentes"
                  ].map((item, index) => (
                    <OptimizedScrollReveal key={index} delay={index * 100}>
                      <div className="flex items-center space-x-3 group">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-lg">{item}</span>
                      </div>
                    </OptimizedScrollReveal>
                  ))}
                </div>
                <OptimizedScrollReveal delay={600}>
                  <div className="mt-8">
                    <Button asChild size="lg" className="bg-gradient-primary shadow-primary group">
                      <Link to="/sobre-nos-lg-tecserv-mocambique">
                        Conhecer Melhor
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </OptimizedScrollReveal>
              </div>
            </OptimizedScrollReveal>
            
            <OptimizedScrollReveal direction="right">
              <div className="relative">
                <Card className="bg-gradient-card border-0 shadow-elegant p-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Foco no Cliente</h3>
                    <p className="text-muted-foreground mb-6">
                      O seu sucesso é o nosso sucesso. Trabalhamos lado a lado 
                      consigo para alcançar os melhores resultados.
                    </p>
                    <div className="flex justify-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      98% de satisfação dos clientes
                    </p>
                  </div>
                </Card>
              </div>
            </OptimizedScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                A Nossa <span className="gradient-text">Equipa</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Profissionais apaixonados e experientes, dedicados ao sucesso 
                dos nossos clientes.
              </p>
            </div>
          </OptimizedScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                name: "Luis Matsenjua",
                role: "Director Geral",
                description: "Líder estratégico responsável pela visão e direção geral da empresa.",
                image: "/lovable-uploads/luis-matsenjua.png"
              },
              {
                name: "Inácio Langa",
                role: "CEO & Fundador",
                description: "Líder visionário com vasta experiência em gestão empresarial e estratégia de negócios.",
                image: "/lovable-uploads/66f9605c-90e0-4c1d-8691-d378145507c4.png"
              },
              {
                name: "Lemos Sabado",
                role: "Agente de Campo e Coordenador Geral",
                description: "Responsável pela coordenação das operações de campo e gestão geral dos projectos.",
                image: "/lovable-uploads/lemos-sabado.png"
              },
              {
                name: "Félex Lourindo",
                role: "Técnico Sénior",
                description: "Profissional especializado em desenvolvimento web e soluções tecnológicas avançadas.",
                image: "/lovable-uploads/felex-lourindo.jpeg"
              },
              {
                name: "Cláudia Armando",
                role: "Assistente Administrativa",
                description: "Responsável pela coordenação administrativa e suporte operacional da empresa.",
                image: "/lovable-uploads/fe69f3f8-90ce-42e0-bb62-d81679a9ba6c.png"
              }
            ].map((member, index) => (
              <OptimizedScrollReveal key={index} delay={index * 150}>
                <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </OptimizedScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                O que Dizem os Nossos <span className="gradient-text">Clientes</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Histórias reais de sucesso de empresas que confiaram em nós.
              </p>
            </div>
          </OptimizedScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <OptimizedScrollReveal key={index} delay={index * 200}>
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <TestimonialCard {...testimonial} />
                </div>
              </OptimizedScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Buttons Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  asChild
                  className="text-lg px-10 py-4 bg-gradient-primary shadow-elegant group relative overflow-hidden transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    <span className="relative z-10 flex items-center justify-center">
                      Consulta Gratuita
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                  className="text-lg px-10 py-4 group transform hover:scale-105 transition-all duration-300"
                >
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20quero%20uma%20consulta%20gratuita%20sobre%20marketing%20digital!" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    WhatsApp Directo
                  </a>
                </Button>
              </div>
            </div>
          </OptimizedScrollReveal>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <OptimizedScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Nossos <span className="gradient-text">Parceiros</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Empresas que confiam na LG TecServ para crescer no mundo digital.
              </p>
            </div>
          </OptimizedScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {[
              { name: "AJC Serviços", logo: "/lovable-uploads/partner-ajc-services.png" },
              { name: "Energia Moderna", logo: "/lovable-uploads/partner-energia-logo.png" },
              { name: "Geoconstrutivo", logo: "/lovable-uploads/partner-geoconstrutivo.png" },
              { name: "QL Group", logo: "/lovable-uploads/partner-ql-group.png" },
              { name: "Clo Sabores", logo: "/lovable-uploads/partner-clo-sabores.png" }
            ].map((partner, index) => (
              <OptimizedScrollReveal key={index} delay={index * 100}>
                <div className="group transform hover:scale-110 transition-all duration-300 p-6 rounded-xl bg-gray-800/90 shadow-lg hover:shadow-xl border border-gray-600/20 hover:bg-gray-700">
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="w-40 h-28 object-contain mx-auto transition-all duration-300 filter brightness-125 contrast-110 group-hover:brightness-130 group-hover:scale-105"
                    style={{
                      maxWidth: '160px',
                      maxHeight: '112px',
                      width: 'auto',
                      height: 'auto'
                    }}
                  />
                  <p className="text-center text-sm font-medium text-gray-300 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {partner.name}
                  </p>
                </div>
              </OptimizedScrollReveal>
            ))}
          </div>
          
          <OptimizedScrollReveal delay={600}>
            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground">
                Junte-se aos nossos parceiros de sucesso
              </p>
            </div>
          </OptimizedScrollReveal>
        </div>
        
        {/* Floating background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Related Links */}
      <RelatedLinks currentPath="/" />

      {/* Business Banner */}
      <BusinessBanner />

      <Footer />
      <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
