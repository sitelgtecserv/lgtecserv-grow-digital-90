import SEOHead from "@/components/seo/SEOHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import OptimizedScrollReveal from "@/components/ui/optimized-scroll-reveal";
import { HardHat, Hammer, Ruler, CheckCircle, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ConstrucaoCivil = () => {
  const services = [
    {
      title: "Construção de Raiz",
      description: "Construção de moradias, edifícios comerciais e pavilhões industriais com chave na mão.",
      icon: <HardHat className="w-8 h-8" />
    },
    {
      title: "Remodelações e Renovações",
      description: "Renovação completa de espaços, cozinhas, casas de banho e modernização de escritórios.",
      icon: <Hammer className="w-8 h-8" />
    },
    {
      title: "Projetos de Arquitetura",
      description: "Desenvolvimento de projetos arquitetónicos e de engenharia civil com aprovação camarária.",
      icon: <Ruler className="w-8 h-8" />
    },
    {
      title: "Fiscalização de Obras",
      description: "Acompanhamento rigoroso para garantir a qualidade, prazos e orçamento da sua obra.",
      icon: <ShieldCheck className="w-8 h-8" />
    }
  ];

  const benefits = [
    "Cumprimento rigoroso de prazos",
    "Equipa técnica especializada",
    "Materiais de alta qualidade",
    "Acompanhamento transparente",
    "Orçamentos detalhados sem surpresas",
    "Garantia de obra"
  ];

  return (
    <>
      <SEOHead
        title="Serviços de Construção Civil em Moçambique | LG TecServ"
        description="Especialistas em construção civil, remodelações, gestão de obras e projetos de arquitetura em Moçambique. Construímos o seu projeto com qualidade e segurança."
        keywords="construção civil moçambique, obras maputo, remodelações, empreiteiro, arquitetura, engenharia civil, construção de casas"
        image="https://www.lgtecserv.com/lovable-uploads/construcao-civil-banner.webp"
        url="https://www.lgtecserv.com/servicos/construcao-civil-mocambique"
        type="website"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-gray-50 pb-16">
          {/* Hero Banner Section */}
          <section className="w-full bg-white pb-8">
            <div className="w-full">
              <h1 className="sr-only">Serviços de Construção Civil e Obras em Moçambique</h1>
              <img 
                src="/lovable-uploads/construcao-civil-banner.webp" 
                alt="Serviços de Construção Civil - LG TecServ Moçambique" 
                className="w-full max-w-6xl mx-auto h-auto object-cover rounded-b-3xl shadow-lg"
              />
            </div>
            <div className="container mx-auto px-4 text-center mt-12 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                Construímos o Seu <span className="text-primary">Futuro</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Da fundação ao acabamento, oferecemos soluções completas em construção civil e remodelações com a máxima qualidade, segurança e respeito pelos prazos.
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Os Nossos Serviços</h3>
                <p className="text-gray-600 text-lg">Soluções integradas para todas as fases da sua obra.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <OptimizedScrollReveal key={index} delay={index * 100}>
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                        {service.icon}
                      </div>
                      <h4 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h4>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </OptimizedScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Projetos Reais Section 1 */}
          <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <OptimizedScrollReveal direction="left">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src="/lovable-uploads/costrucao sessao 1.webp" 
                      alt="Projeto de construção civil em condomínio fechado com vedação elétrica" 
                      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </OptimizedScrollReveal>
                <OptimizedScrollReveal direction="right">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-semibold">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Projetos Executados com Excelência</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                      Casas Modernas e Condomínios Seguros
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      A nossa equipa trabalha em bairros residenciais e condomínios fechados desenvolvendo fundações sólidas e estruturas arquitetónicas modernas. Adaptamo-nos ao terreno e exigências de cada cliente, garantindo privacidade e harmonia com a vizinhança.
                    </p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Construção adaptada a condomínios de alto padrão
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Garantia de segurança na infraestrutura desde a base
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Estrito cumprimento das normas urbanísticas
                      </li>
                    </ul>
                  </div>
                </OptimizedScrollReveal>
              </div>
            </div>
          </section>

          {/* Projetos Reais Section 2 */}
          <section className="py-16 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <OptimizedScrollReveal direction="left" className="order-2 lg:order-1">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary-foreground px-4 py-2 rounded-full mb-6 font-semibold">
                      <HardHat className="w-5 h-5" />
                      <span>Integração de Segurança</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                      Infraestrutura e Vedação Elétrica
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      Não fazemos apenas o "grosso" da obra. Entendemos que em Moçambique a segurança estrutural perimetral é uma prioridade. Incorporamos vedações, muros fortes e redes elétricas diretamente no projeto civil.
                    </p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Muros de contenção e vedação otimizados
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Instalação acoplada de cerca elétrica
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Acabamentos robustos para máxima durabilidade
                      </li>
                    </ul>
                  </div>
                </OptimizedScrollReveal>
                <OptimizedScrollReveal direction="right" className="order-1 lg:order-2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
                    <img 
                      src="/lovable-uploads/costrucao sessao 2.webp" 
                      alt="Estrutura de betão com instalação de cerca elétrica e segurança" 
                      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </OptimizedScrollReveal>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <OptimizedScrollReveal direction="left">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      Porquê Escolher a LG TecServ para a sua Obra?
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Sabemos que uma obra pode ser sinónimo de stress. A nossa missão é mudar essa perspetiva, oferecendo um serviço chave na mão onde não precisa de se preocupar com nada. Gerimos todos os detalhes técnicos e operacionais.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </OptimizedScrollReveal>
                <OptimizedScrollReveal direction="right">
                  <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <Clock className="w-16 h-16 text-primary mb-6" />
                    <h4 className="text-2xl font-bold mb-4 text-gray-900">Precisa de um Orçamento?</h4>
                    <p className="text-gray-600 mb-8">
                      Avaliamos o seu projeto sem compromisso. Agende uma visita técnica da nossa equipa e receba uma proposta detalhada.
                    </p>
                    <Button asChild size="lg" className="bg-gradient-primary shadow-primary w-full group">
                      <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                        Pedir Orçamento Grátis
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </OptimizedScrollReveal>
              </div>
            </div>
          </section>

        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ConstrucaoCivil;
