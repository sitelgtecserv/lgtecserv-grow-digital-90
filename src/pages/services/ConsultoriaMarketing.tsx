import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BusinessBanner from "@/components/ui/business-banner";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";
import { 
  Users, 
  Target, 
  BarChart3, 
  Lightbulb, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Brain,
  Compass,
  Award,
  Star,
  Timer,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData } from "@/utils/seoData";
import marketingService from "@/assets/marketing-service.jpg";

const ConsultoriaMarketing = () => {
  const benefits = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Estratégia Personalizada",
      description: "Planos únicos desenvolvidos especificamente para o seu negócio e mercado"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Análise Profunda",
      description: "Avaliação completa do seu negócio, concorrência e oportunidades de mercado"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Inovação Estratégica",
      description: "Soluções criativas e inovadoras adaptadas ao contexto moçambicano"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Crescimento Sustentável",
      description: "Estratégias focadas no crescimento a longo prazo e sustentabilidade"
    }
  ];

  const consultingAreas = [
    {
      title: "Estratégia de Marketing Digital",
      description: "Desenvolvimento de planos abrangentes para dominar o digital",
      points: ["Análise de mercado", "Definição de personas", "Mix de marketing digital", "Plano de acção"]
    },
    {
      title: "Análise de Concorrência",
      description: "Estudo detalhado dos concorrentes e oportunidades",
      points: ["Benchmarking competitivo", "Análise SWOT", "Posicionamento de mercado", "Diferenciação estratégica"]
    },
    {
      title: "Optimização de Conversões",
      description: "Melhoria dos processos de venda e conversão",
      points: ["Funil de vendas", "Landing pages", "CTAs estratégicos", "Testes A/B"]
    },
    {
      title: "Branding e Posicionamento",
      description: "Desenvolvimento da identidade e posicionamento da marca",
      points: ["Proposta de valor", "Mensagem da marca", "Tom de comunicação", "Arquitectura de marca"]
    }
  ];

  const mozambiqueAdvantages = [
    {
      title: "Conhecimento do Mercado Local",
      description: "Expertise específica sobre o comportamento do consumidor moçambicano, tendências locais e nuances culturais que impactam as decisões de compra."
    },
    {
      title: "Oportunidades de Crescimento",
      description: "Moçambique apresenta oportunidades únicas com o crescimento da classe média e digitalização acelerada pós-pandemia."
    },
    {
      title: "Regulamentação e Compliance",
      description: "Orientação especializada sobre regulamentações locais, impostos digitais e melhores práticas para operar legalmente em Moçambique."
    }
  ];

  const services = [
    "Auditoria completa de marketing digital",
    "Desenvolvimento de estratégia personalizada",
    "Análise de concorrência e mercado",
    "Optimização de funis de vendas",
    "Consultoria em branding e posicionamento",
    "Plano de marketing digital 360°",
    "Formação da equipa interna",
    "Acompanhamento e monitorização",
    "Relatórios mensais de performance",
    "Reuniões estratégicas regulares"
  ];

  const process = [
    {
      step: "01",
      title: "Diagnóstico",
      description: "Análise completa do seu negócio, mercado e concorrência"
    },
    {
      step: "02",
      title: "Estratégia",
      description: "Desenvolvimento de plano personalizado com objectivos claros"
    },
    {
      step: "03",
      title: "Implementação",
      description: "Execução das estratégias com acompanhamento constante"
    },
    {
      step: "04",
      title: "Optimização",
      description: "Ajustes contínuos baseados em dados e resultados"
    }
  ];

  const serviceStructuredData = generateServiceData({
    name: "Consultoria de Marketing Digital",
    description: "Consultoria estratégica de marketing digital personalizada para empresas em Moçambique",
    url: "https://www.lgtecserv.com/servicos/consultoria-marketing-digital-estrategico-mocambique",
    price: "A partir de 10,000 MT"
  });

  return (
    <>
      <SEOHead
        title="Consultoria de Marketing Digital Estratégico | Consultores Especializados - LG TecServ"
        description="Consultoria de marketing digital especializada em Moçambique. Estratégias personalizadas, análise de mercado e planos de crescimento para seu negócio. Consultores experientes!"
        keywords="consultoria marketing digital Moçambique, estratégia marketing, consultores especializados, análise mercado, plano marketing, crescimento negócios, LG TecServ"
        image="https://www.lgtecserv.com/lovable-uploads/consultoria-marketing-banner.png"
        url="https://www.lgtecserv.com/servicos/consultoria-marketing-digital-estrategico-mocambique"
        type="service"
        structuredData={[organizationData, serviceStructuredData]}
      />
      <div className="min-h-screen">
        <Breadcrumbs />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${marketingService})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-orange-600/90" />
        <FloatingElements />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Consultoria de Marketing
                <span className="block text-3xl md:text-4xl mt-2 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Estratégica em Moçambique
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                Transforme o seu negócio com consultoria especializada que combina estratégias 
                globais com conhecimento profundo do mercado moçambicano.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    Solicitar Consultoria
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                  <a href="https://wa.me/258869824047" target="_blank" rel="noopener noreferrer">
                    Falar com Consultor
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What is Marketing Consulting */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              O que é <span className="gradient-text">Consultoria de Marketing?</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              A consultoria de marketing é um serviço especializado que analisa, planeia e optimiza 
              todas as estratégias de marketing da sua empresa. Combinamos experiência internacional 
              com conhecimento profundo do mercado moçambicano para acelerar o crescimento do seu negócio.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Análise Estratégica</h3>
                </div>
                <p className="text-muted-foreground">
                  Avaliamos profundamente o seu negócio, identificando oportunidades 
                  e desenvolvendo estratégias personalizadas para o mercado moçambicano.
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Compass className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Orientação Especializada</h3>
                </div>
                <p className="text-muted-foreground">
                  Fornecemos direccionamento claro e accionável baseado em dados, 
                  experiência e melhores práticas adaptadas à realidade local.
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
            Benefícios da <span className="gradient-text">Consultoria Especializada</span>
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

      {/* Consulting Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Áreas de <span className="gradient-text">Consultoria</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consultingAreas.map((area, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                <p className="text-muted-foreground mb-4">{area.description}</p>
                <ul className="space-y-2">
                  {area.points.map((point, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Nosso <span className="gradient-text">Processo</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mozambique Advantages */}
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
                      <Users className="w-6 h-6 text-primary" />
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Como a Consultoria <span className="gradient-text">Acelera o Seu Crescimento</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Expertise Comprovada</h3>
                <p className="text-muted-foreground">
                  Beneficie da experiência de especialistas que já ajudaram centenas 
                  de empresas a crescer no mercado moçambicano.
                </p>
              </div>
              
              <div className="text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Foco em Resultados</h3>
                <p className="text-muted-foreground">
                  Estratégias orientadas por dados e KPIs claros que garantem 
                  retorno sobre o investimento em consultoria.
                </p>
              </div>
              
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Crescimento Acelerado</h3>
                <p className="text-muted-foreground">
                  Evite erros custosos e acelere o crescimento com estratégias 
                  testadas e validadas no mercado local.
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
              Pronto para Acelerar o Crescimento do Seu Negócio?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Transforme a estratégia de marketing da sua empresa com consultoria especializada 
              que combina visão global e conhecimento local.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Agendar Consultoria
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

export default ConsultoriaMarketing;