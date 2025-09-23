import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Home, Users, Briefcase, Phone, FileText } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackToTop from "@/components/ui/back-to-top";
import ScrollProgress from "@/components/ui/scroll-progress";
import AccessibilityEnhancer from "@/components/accessibility/accessibility-enhancer";
import SEOHead from "@/components/seo/SEOHead";

const sitemapData = {
  principal: [
    {
      title: "Página Inicial",
      path: "/",
      description: "Página principal da LG TecServ Moçambique",
      icon: Home
    },
    {
      title: "Sobre Nós",
      path: "/sobre-nos-lg-tecserv-mocambique",
      description: "Conheça nossa história e experiência",
      icon: Users
    },
    {
      title: "Nossos Serviços",
      path: "/servicos-lg-tecserv-mocambique",
      description: "Explore todos os nossos serviços especializados",
      icon: Briefcase
    },
    {
      title: "Contacto",
      path: "/pagina-de-contato-lg-tecserv-mocambique",
      description: "Entre em contacto para orçamentos gratuitos",
      icon: Phone
    },
    {
      title: "Termos e Condições",
      path: "/termos-e-condicoes-lg-tecserv",
      description: "Termos de uso e políticas do site",
      icon: FileText
    }
  ],
  servicosDigitais: [
    {
      title: "Criação de Sites",
      path: "/servicos/criacao-desenvolvimento-sites-profissionais-mocambique",
      description: "Desenvolvimento de sites profissionais e responsivos"
    },
    {
      title: "Design Gráfico",
      path: "/servicos/design-grafico-profissional-mocambique",
      description: "Criação de identidades visuais e materiais gráficos"
    },
    {
      title: "Tráfego Pago",
      path: "/servicos/gestao-trafego-pago-marketing-digital-mocambique",
      description: "Gestão de campanhas de publicidade digital"
    },
    {
      title: "Redes Sociais",
      path: "/servicos/gestao-redes-sociais-marketing-digital-mocambique",
      description: "Gestão profissional de redes sociais"
    },
    {
      title: "Consultoria Marketing",
      path: "/servicos/consultoria-marketing-digital-estrategico-mocambique",
      description: "Estratégias de marketing digital personalizadas"
    }
  ],
  servicosEletricos: [
    {
      title: "Instalações Elétricas",
      path: "/servicos/instalacoes-eletricas-profissionais-mocambique",
      description: "Serviços completos de instalações elétricas"
    },
    {
      title: "Eletricidade Residencial",
      path: "/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique",
      description: "Soluções elétricas para residências"
    },
    {
      title: "Eletricidade Industrial",
      path: "/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique",
      description: "Instalações elétricas para empresas e indústrias"
    }
  ]
};

const Sitemap = () => {
  return (
    <>
      <SEOHead
        title="Mapa do Site | LG TecServ Moçambique"
        description="Navegue facilmente por todas as páginas e serviços da LG TecServ. Encontre rapidamente o que procura no nosso mapa completo do site."
        keywords="mapa do site, navegação, serviços digitais, serviços elétricos, LG TecServ"
        url="https://www.lgtecserv.com/sitemap"
      />
      
      <AccessibilityEnhancer />
      <ScrollProgress />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main id="main-content" className="pt-20">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Mapa do Site
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Navegue facilmente por todas as nossas páginas e serviços
              </p>
            </div>
          </section>

          {/* Sitemap Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              
              {/* Páginas Principais */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 gradient-text">
                  Páginas Principais
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sitemapData.principal.map((page) => {
                    const IconComponent = page.icon;
                    return (
                      <Card key={page.path} className="group hover:shadow-primary transition-all duration-300">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                            <IconComponent className="w-5 h-5" />
                            {page.title}
                          </CardTitle>
                          <CardDescription>
                            {page.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            to={page.path}
                            className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm group-hover:underline transition-colors"
                            aria-label={`Ir para ${page.title}`}
                          >
                            Visitar página
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Separator className="my-12" />

              {/* Serviços Digitais */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 gradient-text">
                  Serviços Digitais
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sitemapData.servicosDigitais.map((service) => (
                    <Card key={service.path} className="group hover:shadow-primary transition-all duration-300">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                        <CardDescription>
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link
                          to={service.path}
                          className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm group-hover:underline transition-colors"
                          aria-label={`Ir para ${service.title}`}
                        >
                          Ver serviço
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="my-12" />

              {/* Serviços Elétricos */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 gradient-text">
                  Serviços Elétricos
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sitemapData.servicosEletricos.map((service) => (
                    <Card key={service.path} className="group hover:shadow-primary transition-all duration-300">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                        <CardDescription>
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link
                          to={service.path}
                          className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm group-hover:underline transition-colors"
                          aria-label={`Ir para ${service.title}`}
                        >
                          Ver serviço
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-16 text-center">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="gradient-text">
                      Precisa de Ajuda?
                    </CardTitle>
                    <CardDescription>
                      Se não encontrar o que procura, entre em contacto connosco
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      to="/pagina-de-contato-lg-tecserv-mocambique"
                      className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary-dark transition-colors font-medium"
                    >
                      Falar Connosco
                      <Phone className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              </div>

            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default Sitemap;