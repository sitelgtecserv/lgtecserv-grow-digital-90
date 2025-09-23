import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { Card } from "@/components/ui/card";
import { FileText, Shield, Cookie, Eye } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { organizationData } from "@/utils/seoData";

const TermosCondicoes = () => {
  return (
    <>
      <SEOHead
        title="Termos e Condições de Uso - LG TecServ Moçambique"
        description="Leia os termos e condições de uso dos serviços da LG TecServ. Políticas de privacidade, direitos do cliente e condições gerais de prestação de serviços."
        keywords="termos condições, políticas privacidade, LG TecServ, direitos cliente, condições uso, serviços digitais"
        url="https://www.lgtecserv.com/termos-e-condicoes-lg-tecserv"
        type="website"
        structuredData={[organizationData]}
      />
      <Header />
      <Breadcrumbs />
      <main className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/10 rounded-full">
                    <FileText className="h-12 w-12" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Termos e Condições
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                  Conheça os termos de uso dos nossos serviços e a nossa política de privacidade
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Card className="p-8 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Política de Privacidade</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      A LG TecServ está comprometida em proteger a sua privacidade. Esta política explica 
                      como coletamos, usamos e protegemos as suas informações pessoais.
                    </p>
                    <h3 className="text-lg font-semibold text-foreground mt-6">Informações que Coletamos</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Informações de contacto (nome, email, telefone)</li>
                      <li>Informações sobre os serviços solicitados</li>
                      <li>Dados de navegação no website</li>
                    </ul>
                    <h3 className="text-lg font-semibold text-foreground mt-6">Como Utilizamos as Informações</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Para fornecer os nossos serviços</li>
                      <li>Para comunicar sobre projetos e orçamentos</li>
                      <li>Para melhorar a experiência no nosso website</li>
                    </ul>
                  </div>
                </Card>
              </ScrollReveal>

              <ScrollReveal>
                <Card className="p-8 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Cookie className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Política de Cookies</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Utilizamos cookies para melhorar a sua experiência no nosso website. 
                      Os cookies são pequenos ficheiros armazenados no seu dispositivo.
                    </p>
                    <h3 className="text-lg font-semibold text-foreground mt-6">Tipos de Cookies</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site</li>
                      <li><strong>Cookies de Performance:</strong> Ajudam-nos a entender como os visitantes utilizam o site</li>
                      <li><strong>Cookies de Funcionalidade:</strong> Lembram as suas preferências</li>
                    </ul>
                    <p className="mt-4">
                      Pode gerenciar as suas preferências de cookies através do banner que aparece 
                      na primeira visita ao site ou através das configurações do seu navegador.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Eye className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Termos de Utilização</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Ao utilizar os serviços da LG TecServ, concorda com os seguintes termos:
                    </p>
                    <h3 className="text-lg font-semibold text-foreground mt-6">Serviços Oferecidos</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Criação e desenvolvimento de websites</li>
                      <li>Design gráfico e identidade visual</li>
                      <li>Marketing digital e gestão de redes sociais</li>
                      <li>Instalações elétricas residenciais e industriais</li>
                    </ul>
                    <h3 className="text-lg font-semibold text-foreground mt-6">Responsabilidades</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Fornecemos serviços profissionais de alta qualidade</li>
                      <li>Respeitamos prazos acordados e orçamentos aprovados</li>
                      <li>Garantimos suporte pós-entrega nos nossos serviços</li>
                    </ul>
                    <h3 className="text-lg font-semibold text-foreground mt-6">Contacto</h3>
                    <p>
                      Para questões sobre estes termos ou a nossa política de privacidade, 
                      entre em contacto connosco através do email{" "}
                      <a href="mailto:lgtecserv@gmail.com" className="text-primary hover:underline">
                        lgtecserv@gmail.com
                      </a>{" "}
                      ou pelos telefones +258 84 1524 822 / +258 869 824 047.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default TermosCondicoes;