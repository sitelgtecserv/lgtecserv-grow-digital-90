import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateServiceData, organizationData } from "@/utils/seoData";
import { mainServices } from "@/data/servicesData";
import { CheckCircle, ArrowRight } from "lucide-react";

// Helper to capitalize city names properly
const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const LocalSEO = () => {
  const { serviceSlug, cidadeSlug } = useParams<{ serviceSlug: string; cidadeSlug: string }>();

  const city = capitalize(cidadeSlug || "Maputo");
  
  // Find the matched service, fallback to first service if not found
  const service = mainServices.find(s => s.slug === serviceSlug) || mainServices[0];

  const pageTitle = `${service.title} em ${city} | Especialistas LG TecServ`;
  const pageDescription = `Procura por ${service.title.toLowerCase()} em ${city}? A LG TecServ é a sua melhor escolha local para soluções digitais e técnicas com qualidade garantida. Peça orçamento.`;
  const pageUrl = `https://www.lgtecserv.com/servicos/${serviceSlug}/local/${cidadeSlug}`;

  const localServiceData = generateServiceData({
    name: `${service.title} em ${city}`,
    description: pageDescription,
    url: pageUrl,
    price: service.pricing
  });

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`${service.title.toLowerCase()}, ${city}, Moçambique, LG TecServ, especialistas, serviços locais, ${serviceSlug}`}
        image={service.image.startsWith('http') ? service.image : `https://www.lgtecserv.com${service.image}`}
        url={pageUrl}
        type="article"
        structuredData={[organizationData, localServiceData]}
      />
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="py-12 sm:py-20 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-elegant text-primary mb-8 animate-bounce">
                {service.icon}
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
                A Melhor Empresa de <span className="gradient-text">{service.title}</span> em <span className="text-primary">{city}</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 text-balance">
                Está em {city} e precisa de especialistas de confiança? 
                Nós entregamos resultados com rapidez, qualidade e garantia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="bg-gradient-primary shadow-primary text-lg px-8 py-6 w-full sm:w-auto">
                  <a href={`https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20estou%20em%20${city}%20e%20tenho%20interesse%20em%20${service.title}.%20Pode%20ajudar-me%3F`} target="_blank" rel="noopener noreferrer">
                    Pedir Orçamento Grátis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                  <Link to="/servicos-lg-tecserv-mocambique">
                    Ver Outros Serviços
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                  Por que Escolher a LG TecServ em {city}?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Sabemos que encontrar profissionais qualificados em {city} pode ser um desafio. 
                  Com a LG TecServ, você tem a segurança de um serviço prestado com excelência, 
                  cumprimento de prazos e o melhor custo-benefício da região.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">O Que Está Incluído:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="font-semibold text-lg text-primary mb-2">Preço Transparente</p>
                  <p className="text-2xl font-bold mb-1">{service.pricing}</p>
                  <p className="text-muted-foreground">Tempo estimado: {service.deliveryTime}</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
                <Card className="bg-white border-0 shadow-xl overflow-hidden rounded-3xl relative z-10">
                  <img 
                    src={service.image} 
                    alt={`${service.title} em ${city}`}
                    className="w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action local */}
        <section className="py-16 bg-black text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar na região de {city}?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Junte-se às dezenas de clientes satisfeitos que já transformaram os seus negócios com a LG TecServ.
            </p>
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6">
              <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                Agendar Reunião Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default LocalSEO;
