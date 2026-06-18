import SEOHead from "@/components/seo/SEOHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import OptimizedScrollReveal from "@/components/ui/optimized-scroll-reveal";
import { Cctv, ShieldAlert, Fingerprint, BellRing, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SegurancaEletronica = () => {
  const services = [
    {
      title: "Videovigilância (CCTV)",
      description: "Sistemas de câmaras de alta definição com acesso remoto 24/7 pelo seu smartphone ou computador.",
      icon: <Cctv className="w-8 h-8" />
    },
    {
      title: "Controlo de Acessos",
      description: "Soluções biométricas, cartões e códigos para gerir quem entra nas suas instalações.",
      icon: <Fingerprint className="w-8 h-8" />
    },
    {
      title: "Alarmes de Intrusão",
      description: "Sistemas avançados de deteção e alarme sonoro para evitar e notificar tentativas de assalto.",
      icon: <BellRing className="w-8 h-8" />
    },
    {
      title: "Segurança Perimetral",
      description: "Cercas elétricas e barreiras de infravermelhos para proteção exterior do seu património.",
      icon: <ShieldAlert className="w-8 h-8" />
    }
  ];

  const benefits = [
    "Instalação profissional e limpa",
    "Equipamentos de marcas reconhecidas",
    "Acesso remoto através da internet",
    "Garantia de material e serviço",
    "Formação de utilização ao cliente",
    "Assistência técnica permanente"
  ];

  return (
    <>
      <SEOHead
        title="Segurança Eletrónica e CCTV em Moçambique | LG TecServ"
        description="Especialistas em sistemas de segurança eletrónica: CCTV, videovigilância, controlo de acessos, alarmes e cercas elétricas em Moçambique. Proteja o seu património."
        keywords="segurança eletrónica, cctv moçambique, videovigilância maputo, instalação alarmes, controlo de acessos, cerca elétrica"
        image="https://www.lgtecserv.com/lovable-uploads/Baner principal seguranca eletronica.webp"
        url="https://www.lgtecserv.com/servicos/seguranca-eletronica-mocambique"
        type="website"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-gray-50 pb-16">
          {/* Hero Banner Section */}
          <section className="w-full bg-white pb-8">
            <div className="w-full">
              <h1 className="sr-only">Serviços de Segurança Eletrónica, CCTV e Alarmes em Moçambique</h1>
              <img 
                src="/lovable-uploads/Baner principal seguranca eletronica.webp" 
                alt="Serviços de Segurança Eletrónica - LG TecServ Moçambique" 
                className="w-full max-w-6xl mx-auto h-auto object-cover rounded-b-3xl shadow-lg"
              />
            </div>
            <div className="container mx-auto px-4 text-center mt-12 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                A Proteção do Seu Património em <span className="text-primary">Boas Mãos</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Oferecemos tecnologia de ponta em segurança eletrónica. Monitorize a sua casa ou empresa em tempo real, de qualquer lugar do mundo.
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Soluções de Segurança</h3>
                <p className="text-gray-600 text-lg">Tecnologia avançada para garantir a sua tranquilidade.</p>
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
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src="/lovable-uploads/seguranca eletronica sessao 1.webp" 
                      alt="Instalação e configuração de sistemas CCTV de alta resolução" 
                      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </OptimizedScrollReveal>
                <OptimizedScrollReveal direction="right">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-semibold">
                      <Cctv className="w-5 h-5" />
                      <span>Vigilância 24 horas</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                      Câmaras de Última Geração e Alta Definição
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      Implementamos sistemas de videovigilância que oferecem imagens cristalinas, mesmo durante a noite. Os nossos gravadores digitais (NVR/DVR) permitem armazenar longos períodos de gravação.
                    </p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Visão noturna infravermelha de longo alcance
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Deteção de movimento com alertas no telemóvel
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Acesso através de App móvel rápida e intuitiva
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
                      <ShieldAlert className="w-5 h-5" />
                      <span>Proteção Preventiva</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                      Instalação Técnica Profissional
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      Uma instalação mal feita compromete todo o sistema de segurança. A LG TecServ garante montagens organizadas, cablagem protegida e configurações de rede robustas para evitar invasões cibernéticas às suas câmaras.
                    </p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Cablagem estruturada e tubagem adequada
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Sistemas UPS para autonomia de energia
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        Integração completa com alarmes e acessos
                      </li>
                    </ul>
                  </div>
                </OptimizedScrollReveal>
                <OptimizedScrollReveal direction="right" className="order-1 lg:order-2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
                    <img 
                      src="/lovable-uploads/seguranca eletronica sessao 2.webp" 
                      alt="Detalhes da instalação técnica de equipamentos de segurança" 
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
                      Porquê confiar a sua segurança à LG TecServ?
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Lidamos com a sua segurança de forma extremamente rigorosa. Oferecemos soluções modulares, escaláveis e, acima de tudo, altamente confiáveis para manter a sua casa ou negócio sempre sob vigilância.
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
                    <h4 className="text-2xl font-bold mb-4 text-gray-900">Proteja-se Agora</h4>
                    <p className="text-gray-600 mb-8">
                      Fazemos visitas técnicas para dimensionar o projeto exato das suas necessidades de segurança. Fale connosco hoje!
                    </p>
                    <Button asChild size="lg" className="bg-gradient-primary shadow-primary w-full group">
                      <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                        Solicitar Visita Técnica
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

export default SegurancaEletronica;
