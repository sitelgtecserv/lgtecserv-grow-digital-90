import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import OptimizedImage from "@/components/ui/optimized-image";
import RelatedLinks from "@/components/ui/related-links";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FloatingElements from "@/components/ui/floating-elements";
import { 
  Share2, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  ArrowRight,
  CheckCircle,
  Calendar,
  Camera,
  BarChart3,
  Star,
  Timer,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData } from "@/utils/seoData";
import socialMediaService from "@/assets/social-media-service.jpg";

const RedesSociais = () => {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Alcance Massivo",
      description: "Chegue a milhões de moçambicanos que usam redes sociais diariamente"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Engagement Autêntico",
      description: "Crie conexões genuínas e duradouras com o seu público-alvo"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Crescimento Orgânico",
      description: "Desenvolva uma comunidade leal que promove naturalmente a sua marca"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: "Comunicação Directa",
      description: "Interaja directamente com os seus clientes e receba feedback valioso"
    }
  ];

  const platforms = [
    {
      name: "Facebook",
      users: "8.5M+ utilizadores em Moçambique",
      description: "A plataforma mais popular para negócios locais",
      features: ["Posts orgânicos", "Facebook Ads", "Messenger Business", "Eventos"]
    },
    {
      name: "Instagram",
      users: "4.2M+ utilizadores activos",
      description: "Ideal para marcas visuais e público jovem",
      features: ["Feed posts", "Stories", "Reels", "IGTV"]
    },
    {
      name: "WhatsApp Business",
      users: "12M+ utilizadores",
      description: "Canal directo de vendas e atendimento",
      features: ["Catálogo de produtos", "Mensagens automáticas", "Status Business", "API"]
    },
    {
      name: "LinkedIn",
      users: "500K+ profissionais",
      description: "Rede profissional para negócios B2B",
      features: ["Company Page", "Artigos", "Networking", "LinkedIn Ads"]
    }
  ];

  const mozambiqueAdvantages = [
    {
      title: "Alta Penetração Mobile",
      description: "Com 85% dos moçambicanos acedendo às redes sociais via telemóvel, é essencial ter conteúdo optimizado para mobile."
    },
    {
      title: "Crescimento do Digital",
      description: "O uso de redes sociais em Moçambique cresce 15% ao ano, criando novas oportunidades de negócio diariamente."
    },
    {
      title: "Comportamento de Compra",
      description: "67% dos moçambicanos pesquisam produtos nas redes sociais antes de comprar, tornando a presença digital crucial."
    }
  ];

  const services = [
    "Criação e gestão de perfis profissionais",
    "Desenvolvimento de estratégia de conteúdo",
    "Criação de posts visuais atractivos",
    "Gestão de comunidades online",
    "Moderação de comentários e mensagens",
    "Criação de campanhas promocionais",
    "Análise de métricas e performance",
    "Relatórios mensais detalhados",
    "Gestão de crises online",
    "Consultoria estratégica personalizada"
  ];

  const serviceStructuredData = generateServiceData({
    name: "Gestão de Redes Sociais",
    description: "Gestão profissional de redes sociais para empresas em Moçambique, criação de conteúdo e crescimento orgânico",
    url: "https://www.lgtecserv.com/servicos/gestao-redes-sociais-marketing-digital-mocambique",
    price: "A partir de 6,000 MT/mês"
  });

  return (
    <>
      <SEOHead
        title="Gestão de Redes Sociais Profissional | Facebook Instagram WhatsApp - LG TecServ"
        description="Gestão profissional de redes sociais em Moçambique. Criação de conteúdo, crescimento orgânico no Facebook, Instagram e WhatsApp Business. Aumente seu engajamento!"
        keywords="gestão redes sociais Moçambique, Facebook, Instagram, WhatsApp Business, conteúdo social, engajamento, crescimento orgânico, LG TecServ"
        image="https://www.lgtecserv.com/lovable-uploads/consultoria-marketing-banner.png"
        url="https://www.lgtecserv.com/servicos/gestao-redes-sociais-marketing-digital-mocambique"
        type="service"
        structuredData={[organizationData, serviceStructuredData]}
      />
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/lovable-uploads/consultoria-marketing-banner.png"
            alt="Gestão de Redes Sociais Profissional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <FloatingElements />
        
        <div className="relative container mx-auto px-4">
          <ScrollReveal className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium mb-4">
              Redes Sociais Profissionais
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Gestão de <span className="gradient-text">Redes Sociais</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance max-w-3xl">
              Construa uma presença digital forte e engajada que converte seguidores 
              em clientes fiéis no mercado moçambicano.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-gradient-primary shadow-primary">
                <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20preciso%20de%20gest%C3%A3o%20de%20redes%20sociais.%20Podem%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                  Ver Estratégia
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

      {/* What is Social Media Management */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              O que é <span className="gradient-text">Gestão de Redes Sociais?</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              A gestão de redes sociais é o processo estratégico de criar, publicar e gerir conteúdo 
              nas plataformas sociais para construir uma comunidade engajada em torno da sua marca. 
              É essencial para conectar com o público moçambicano de forma autêntica e eficaz.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Planeamento Estratégico</h3>
                </div>
                <p className="text-muted-foreground">
                  Desenvolvemos calendários editoriais personalizados que alinham 
                  com os objectivos do seu negócio e ressoam com o público moçambicano.
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Camera className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Conteúdo Visual</h3>
                </div>
                <p className="text-muted-foreground">
                  Criamos conteúdo visual atractivo e culturalmente relevante 
                  que captura a atenção e gera engagement genuíno.
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
            Benefícios da Gestão <span className="gradient-text">Profissional</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="bg-gradient-card border-0 shadow-elegant hover:shadow-lg transition-all duration-300 p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg mb-3">{benefit.title}</CardTitle>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="gradient-text">Plataformas</span> que Gerimos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <Share2 className="w-8 h-8 text-primary mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold">{platform.name}</h3>
                    <p className="text-sm text-primary">{platform.users}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{platform.description}</p>
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
              <ScrollReveal key={index} delay={index * 200}>
                <Card className="bg-gradient-card border-0 shadow-elegant hover:shadow-lg transition-all duration-300 p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Share2 className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Helps Business */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Como as Redes Sociais <span className="gradient-text">Transformam o Seu Negócio</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Construção de Comunidade</h3>
                <p className="text-muted-foreground">
                  Desenvolva uma base de clientes leais que promovem activamente 
                  a sua marca e recomendam os seus serviços.
                </p>
              </div>
              
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Aumento de Vendas</h3>
                <p className="text-muted-foreground">
                  Converta seguidores em clientes através de estratégias de conteúdo 
                  que educam, envolvem e motivam à acção.
                </p>
              </div>
              
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Insights Valiosos</h3>
                <p className="text-muted-foreground">
                  Obtenha dados detalhados sobre o comportamento e preferências 
                  dos seus clientes para melhorar continuamente.
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
              Pronto para Dominar as Redes Sociais?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Transforme as suas redes sociais numa poderosa ferramenta de vendas 
              e relacionamento com os clientes moçambicanos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Começar Estratégia
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                <a href="https://wa.me/258869824047" target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks 
        currentPath="/servicos/gestao-redes-sociais-marketing-digital-mocambique"
      />

      <Footer />
      <WhatsAppButton />
      </div>
    </>
  );
};

export default RedesSociais;