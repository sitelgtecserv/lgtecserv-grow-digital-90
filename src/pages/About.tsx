import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BusinessBanner from "@/components/ui/business-banner";
import { Target, Eye, Heart, Users, Award, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { organizationData, localBusinessData } from "@/utils/seoData";

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Missão",
      description: "Oferecer soluções digitais inovadoras e personalizadas que impulsionem o crescimento dos nossos clientes, criando valor duradouro através da tecnologia e criatividade."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visão",
      description: "Ser a empresa de referência em soluções digitais em Moçambique, reconhecida pela excelência, inovação e pelo impacto positivo nos negócios dos nossos clientes."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Valores",
      description: "Excelência, transparência, inovação, compromisso com resultados e foco na satisfação total dos nossos clientes."
    }
  ];

  const team = [
    { name: "Luís Martins", role: "Director Geral", slug: "luismatsenjua", description: "Líder estratégico com ampla experiência em gestão empresarial e desenvolvimento de negócios.", image: "/lovable-uploads/luis-matsenjua.png" },
    { name: "Inácio Langa", role: "CEO & Fundador", slug: "inaciolanga", description: "Líder visionário com vasta experiência em gestão empresarial e estratégia de negócios.", image: "/lovable-uploads/66f9605c-90e0-4c1d-8691-d378145507c4.png" },
    { name: "Félix Florindo", role: "Técnico Sénior – Marketing Digital", slug: "felexlourindo", description: "Especialista em produção audiovisual e campanhas de marketing digital.", image: "/lovable-uploads/felex-lourindo.jpeg" },
    { name: "Lemos Sábado", role: "Coordenador Geral & Técnico Operacional", slug: "lemossabado", description: "Responsável pela coordenação operacional e execução de serviços técnicos.", image: "/lovable-uploads/lemos-sabado.png" },
    { name: "Cláudia Muale", role: "Assistente Administrativa", slug: "claudiaarmando", description: "Responsável pela gestão administrativa e assuntos legais da empresa.", image: "/lovable-uploads/fe69f3f8-90ce-42e0-bb62-d81679a9ba6c.png" }
  ];

  const achievements = [
    { number: "200+", label: "Clientes Satisfeitos", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Projetos Concluídos", icon: <Award className="w-6 h-6" /> },
    { number: "5+", label: "Anos de Experiência", icon: <Lightbulb className="w-6 h-6" /> },
    { number: "98%", label: "Taxa de Satisfação", icon: <Heart className="w-6 h-6" /> }
  ];

  return (
    <>
      <SEOHead
        title="Sobre a LG TecServ - Empresa de Soluções Digitais em Moçambique"
        description="Conheça a LG TecServ, empresa moçambicana especializada em soluções digitais desde 2019. Nossa equipa experiente oferece serviços de qualidade em criação de sites, marketing digital e instalações elétricas."
        keywords="LG TecServ, sobre nós, empresa moçambicana, soluções digitais, Maputo, história da empresa, equipa, marketing digital Moçambique"
        image="https://www.lgtecserv.com/lovable-uploads/7c383221-e93f-4908-a3ab-03f2194a4b5b.png"
        url="https://www.lgtecserv.com/sobre-nos-lg-tecserv-mocambique"
        type="website"
        structuredData={[organizationData, localBusinessData]}
      />
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre a <span className="gradient-text">LG TecServ</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              Uma empresa moçambicana dedicada a transformar negócios através 
              de soluções digitais inovadoras e estratégias de marketing eficazes.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Os Nossos <span className="gradient-text">Pilares</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Os valores e princípios que orientam o nosso trabalho e relacionamento 
              com os clientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                    {value.icon}
                  </div>
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              A Nossa <span className="gradient-text">Equipa</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Profissionais apaixonados e experientes, dedicados ao sucesso 
              dos nossos clientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {team.map((member, index) => (
              <Link key={index} to={`/${member.slug}`} className="group">
                <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm mb-4">{member.description}</p>
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                      Ver Perfil Completo <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Conheça a Nossa Documentação Oficial</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Transparência total: políticas, processos e compromissos detalhados para sua tranquilidade.
              </p>
              <Button asChild variant="default" size="lg">
                <Link to="/documentacao-oficial-lg-tecserv">
                  Ver Documentação Completa
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              Pronto para Começar o Seu Projeto?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-balance">
              Entre em contacto connosco e descubra como podemos ajudar 
              o seu negócio a crescer no mundo digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary" 
                asChild
                className="text-lg px-8 bg-white text-primary hover:bg-white/90"
              >
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/servicos-lg-tecserv-mocambique">
                  Ver Serviços
                </Link>
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

export default About;