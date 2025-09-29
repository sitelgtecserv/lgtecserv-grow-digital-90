import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { Card } from "@/components/ui/card";
import { HelpCircle, Globe, Zap, Camera, DollarSign, Clock, Shield } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { organizationData } from "@/utils/seoData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como posso solicitar um orçamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pode solicitar um orçamento através do nosso formulário de contacto no website, enviando um email para lgtecserv@gmail.com ou ligando para +258 84 1524 822 / +258 869 824 047. Responderemos em até 24 horas úteis."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto custa criar um website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O custo de um website varia conforme a complexidade, funcionalidades e necessidades específicas. Oferecemos desde websites básicos até soluções e-commerce completas. Entre em contacto para um orçamento personalizado."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é o prazo para criar um website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O prazo varia conforme a complexidade do projeto. Um website institucional simples pode estar pronto em 2-3 semanas, enquanto projetos mais complexos podem levar 6-8 semanas. Definimos prazos específicos após análise do projeto."
        }
      },
      {
        "@type": "Question",
        "name": "Oferecem garantia nos serviços?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Todos os nossos serviços incluem garantia. Para websites, oferecemos 30 dias de suporte pós-entrega. Para instalações elétricas, a garantia varia conforme o tipo de serviço. Consulte-nos para detalhes específicos."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Perguntas Frequentes (FAQ) - LG TecServ Moçambique"
        description="Encontre respostas para as perguntas mais frequentes sobre nossos serviços digitais, instalações elétricas, topografia e fotografia. Tire suas dúvidas sobre prazos, preços e processos."
        keywords="FAQ, perguntas frequentes, dúvidas, orçamento, prazos, serviços digitais, instalações elétricas, LG TecServ"
        url="https://www.lgtecserv.com/faq"
        type="website"
        structuredData={[organizationData, faqSchema]}
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
                    <HelpCircle className="h-12 w-12" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Perguntas Frequentes
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                  Encontre respostas rápidas para as suas dúvidas sobre nossos serviços
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* General Questions */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <HelpCircle className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Questões Gerais</h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        Como posso solicitar um orçamento?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Pode solicitar um orçamento de várias formas:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Preenchendo o formulário de contacto no nosso website</li>
                          <li>Enviando um email para lgtecserv@gmail.com</li>
                          <li>Ligando para +258 84 1524 822 ou +258 869 824 047</li>
                          <li>Através do WhatsApp (botão no canto inferior direito)</li>
                        </ul>
                        <p className="mt-2">Responderemos em até 24 horas úteis com um orçamento detalhado.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        Quais formas de pagamento aceitam?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Aceitamos diversas formas de pagamento para sua comodidade:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Transferência bancária</li>
                          <li>M-Pesa e e-Mola</li>
                          <li>Pagamento em dinheiro (para serviços presenciais)</li>
                          <li>Parcelamento em alguns serviços (consulte disponibilidade)</li>
                        </ul>
                        <p className="mt-2">Os detalhes de pagamento são fornecidos na proposta comercial.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        Qual é a área de atuação da LG TecServ?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Atuamos principalmente em Maputo e arredores, mas alguns serviços digitais (como criação de websites, 
                        design gráfico e marketing digital) podem ser prestados remotamente para todo Moçambique e países lusófonos. 
                        Para serviços presenciais (instalações elétricas, topografia, fotografia), consulte disponibilidade para sua região.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">
                        Oferecem garantia nos serviços?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sim! Todos os nossos serviços incluem garantia:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Websites:</strong> 30 dias de suporte pós-entrega para correções</li>
                          <li><strong>Design Gráfico:</strong> Revisões ilimitadas até aprovação final</li>
                          <li><strong>Instalações Elétricas:</strong> Garantia de 6-12 meses conforme serviço</li>
                          <li><strong>Marketing Digital:</strong> Relatórios mensais e ajustes de campanha</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        Como funciona o processo de trabalho?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Nosso processo é simples e transparente:
                        <ol className="list-decimal pl-6 mt-2 space-y-2">
                          <li><strong>Contacto Inicial:</strong> Você nos contacta e descreve suas necessidades</li>
                          <li><strong>Análise:</strong> Analisamos o projeto e preparamos proposta detalhada</li>
                          <li><strong>Orçamento:</strong> Apresentamos orçamento e cronograma</li>
                          <li><strong>Aprovação:</strong> Após aprovação, iniciamos o trabalho</li>
                          <li><strong>Desenvolvimento:</strong> Executamos o projeto com atualizações regulares</li>
                          <li><strong>Entrega:</strong> Entregamos o projeto completo e funcional</li>
                          <li><strong>Suporte:</strong> Prestamos suporte pós-entrega conforme garantia</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </ScrollReveal>

              {/* Digital Services */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Globe className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Serviços Digitais</h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="digital-1">
                      <AccordionTrigger className="text-left">
                        Quanto custa criar um website?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        O custo varia conforme a complexidade e funcionalidades:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Website Institucional Básico:</strong> A partir de 15.000 MZN</li>
                          <li><strong>Website Profissional:</strong> 25.000 - 50.000 MZN</li>
                          <li><strong>E-commerce:</strong> A partir de 60.000 MZN</li>
                          <li><strong>Sistemas Personalizados:</strong> Orçamento sob consulta</li>
                        </ul>
                        <p className="mt-2">Entre em contacto para um orçamento detalhado baseado nas suas necessidades específicas.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="digital-2">
                      <AccordionTrigger className="text-left">
                        Qual é o prazo para criar um website?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Os prazos variam conforme a complexidade:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Landing Page:</strong> 5-7 dias úteis</li>
                          <li><strong>Website Institucional:</strong> 2-3 semanas</li>
                          <li><strong>Website com CMS:</strong> 3-4 semanas</li>
                          <li><strong>E-commerce:</strong> 6-8 semanas</li>
                          <li><strong>Sistemas Personalizados:</strong> 2-4 meses</li>
                        </ul>
                        <p className="mt-2">Prazos mais curtos podem ser acordados mediante disponibilidade.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="digital-3">
                      <AccordionTrigger className="text-left">
                        O website inclui domínio e hospedagem?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oferecemos pacotes completos que podem incluir:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Registo de domínio (.co.mz, .com, etc.)</li>
                          <li>Hospedagem web profissional</li>
                          <li>Emails corporativos</li>
                          <li>Certificado SSL (segurança HTTPS)</li>
                        </ul>
                        <p className="mt-2">Pode optar por incluir no pacote inicial ou contratar separadamente.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="digital-4">
                      <AccordionTrigger className="text-left">
                        Fazem manutenção após a entrega do website?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sim! Oferecemos diferentes níveis de suporte:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Suporte Básico (incluído):</strong> 30 dias de correções pós-entrega</li>
                          <li><strong>Manutenção Mensal:</strong> Atualizações, backups e suporte técnico</li>
                          <li><strong>Suporte Premium:</strong> Monitorização 24/7 e atualizações ilimitadas</li>
                        </ul>
                        <p className="mt-2">Consulte os planos de manutenção disponíveis.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="digital-5">
                      <AccordionTrigger className="text-left">
                        Como funciona a gestão de redes sociais?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Nosso serviço de gestão de redes sociais inclui:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Criação de calendário editorial mensal</li>
                          <li>Design e produção de conteúdos (posts, stories, reels)</li>
                          <li>Publicação programada em múltiplas plataformas</li>
                          <li>Interação com seguidores e resposta a mensagens</li>
                          <li>Relatórios mensais de performance</li>
                          <li>Estratégias de crescimento orgânico</li>
                        </ul>
                        <p className="mt-2">Pacotes a partir de 8.000 MZN/mês.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="digital-6">
                      <AccordionTrigger className="text-left">
                        O que é tráfego pago e como funciona?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Tráfego pago são anúncios pagos em plataformas como Google Ads, Facebook Ads e Instagram Ads. 
                        Funciona assim:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Definimos objetivos (vendas, leads, tráfego, brand awareness)</li>
                          <li>Criamos campanhas segmentadas para seu público-alvo</li>
                          <li>Você define o orçamento de investimento</li>
                          <li>Monitoramos e otimizamos diariamente</li>
                          <li>Relatórios regulares com resultados e ROI</li>
                        </ul>
                        <p className="mt-2">Ideal para resultados rápidos e mensuráveis. Taxa de gestão a partir de 15% do investimento em mídia.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="digital-7">
                      <AccordionTrigger className="text-left">
                        Oferecem consultoria em marketing digital?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sim! Nossa consultoria inclui:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Análise da presença digital atual</li>
                          <li>Definição de estratégia de marketing</li>
                          <li>Planejamento de ações e campanhas</li>
                          <li>Orientação sobre investimentos em mídia</li>
                          <li>Formação de equipes internas</li>
                          <li>Acompanhamento e mentorias periódicas</li>
                        </ul>
                        <p className="mt-2">Ideal para empresas que querem estruturar sua estratégia digital.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </ScrollReveal>

              {/* Electrical Services */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Zap className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Serviços Elétricos</h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="electric-1">
                      <AccordionTrigger className="text-left">
                        Atendem emergências elétricas?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sim! Temos serviço de atendimento para emergências elétricas. Em situações de risco 
                        (curtos-circuitos, quedas de energia, problemas graves), contacte-nos imediatamente 
                        através do +258 84 1524 822. Avaliamos a urgência e enviamos uma equipe no menor tempo possível.
                        <p className="mt-2">
                          <strong>Nota:</strong> Serviços de emergência fora do horário comercial podem ter custo adicional.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="electric-2">
                      <AccordionTrigger className="text-left">
                        Fazem orçamento sem custo?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sim! Oferecemos orçamento gratuito para todos os serviços elétricos. 
                        Nossa equipe pode fazer uma visita ao local (dentro de Maputo) para avaliar 
                        as necessidades e fornecer um orçamento detalhado sem compromisso.
                        <p className="mt-2">
                          Para locais fora de Maputo, pode haver custo de deslocamento que será informado previamente.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="electric-3">
                      <AccordionTrigger className="text-left">
                        Trabalham em fins de semana?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sim, atendemos aos sábados mediante agendamento prévio. Para serviços aos domingos 
                        e feriados, consulte disponibilidade. Esses serviços podem ter custo adicional.
                        <p className="mt-2">
                          Para emergências, estamos disponíveis 24/7.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="electric-4">
                      <AccordionTrigger className="text-left">
                        Qual o prazo para instalações elétricas?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        O prazo varia conforme o tipo e dimensão do serviço:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Reparos simples:</strong> 1-2 dias</li>
                          <li><strong>Instalação residencial completa:</strong> 1-2 semanas</li>
                          <li><strong>Instalação industrial:</strong> 2-4 semanas</li>
                          <li><strong>Projetos elétricos complexos:</strong> A definir após vistoria</li>
                        </ul>
                        <p className="mt-2">Prazos detalhados são fornecidos no orçamento após avaliação técnica.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="electric-5">
                      <AccordionTrigger className="text-left">
                        Fornecem materiais ou só mão de obra?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oferecemos ambas as opções:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Pacote Completo:</strong> Fornecemos materiais e mão de obra (mais comum)</li>
                          <li><strong>Só Mão de Obra:</strong> Se preferir comprar os materiais por conta própria</li>
                        </ul>
                        <p className="mt-2">
                          Recomendamos o pacote completo para garantir qualidade dos materiais e compatibilidade. 
                          Todos os materiais vêm com nota fiscal e garantia.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </ScrollReveal>

              {/* Technical Services */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Camera className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Serviços Técnicos</h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="tech-1">
                      <AccordionTrigger className="text-left">
                        O que inclui o serviço de topografia?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Nossos serviços topográficos incluem:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Levantamento topográfico de terrenos</li>
                          <li>Medição e demarcação de limites</li>
                          <li>Elaboração de plantas topográficas</li>
                          <li>Cálculo de áreas e volumes</li>
                          <li>Georreferenciamento</li>
                          <li>Apoio a projetos de construção</li>
                        </ul>
                        <p className="mt-2">
                          Utilizamos equipamentos modernos para garantir precisão e agilidade. Consulte valores por projeto.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tech-2">
                      <AccordionTrigger className="text-left">
                        Os ensaios fotográficos têm local definido?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Não! Nossos ensaios fotográficos são flexíveis:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Locações Externas:</strong> Praias, parques, ruas, locais icónicos de Maputo</li>
                          <li><strong>Locais do Cliente:</strong> Sua casa, empresa, eventos</li>
                          <li><strong>Estúdios Parceiros:</strong> Mediante disponibilidade e custo adicional</li>
                        </ul>
                        <p className="mt-2">
                          Trabalhamos sem estúdio fixo para oferecer maior variedade e autenticidade nas fotos. 
                          Sugerimos locações conforme o tipo de ensaio.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tech-3">
                      <AccordionTrigger className="text-left">
                        Quanto tempo demora para receber as fotos?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        O prazo de entrega varia conforme o pacote:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Fotos Editadas:</strong> 7-10 dias úteis após o ensaio</li>
                          <li><strong>Preview:</strong> 2-3 dias para seleção das fotos favoritas</li>
                          <li><strong>Entrega Express:</strong> Disponível mediante custo adicional (3-5 dias)</li>
                        </ul>
                        <p className="mt-2">
                          As fotos são entregues em alta resolução via Google Drive ou WeTransfer.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </ScrollReveal>

              {/* Payment & Pricing */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <DollarSign className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Pagamento e Preços</h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="payment-1">
                      <AccordionTrigger className="text-left">
                        É necessário pagar antecipadamente?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Depende do tipo de serviço:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li><strong>Serviços Digitais:</strong> Geralmente 50% no início e 50% na entrega</li>
                          <li><strong>Instalações Elétricas:</strong> 30-40% de sinal, saldo após conclusão</li>
                          <li><strong>Projetos Grandes:</strong> Parcelamento em etapas de acordo com cronograma</li>
                        </ul>
                        <p className="mt-2">As condições específicas são detalhadas na proposta comercial.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="payment-2">
                      <AccordionTrigger className="text-left">
                        Oferecem descontos para pacotes?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sim! Oferecemos condições especiais para:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Contratação de múltiplos serviços (website + marketing, por exemplo)</li>
                          <li>Contratos de longo prazo (gestão mensal de redes sociais)</li>
                          <li>Projetos de grande dimensão</li>
                          <li>Parcerias estratégicas</li>
                        </ul>
                        <p className="mt-2">Entre em contacto para conhecer nossas promoções atuais.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="payment-3">
                      <AccordionTrigger className="text-left">
                        Como funciona o parcelamento?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oferecemos parcelamento em alguns serviços:
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          <li>Websites e sistemas: até 3x sem juros (dependendo do valor)</li>
                          <li>Projetos grandes: parcelamento personalizado em etapas</li>
                          <li>Serviços mensais: pagamento recorrente no início de cada mês</li>
                        </ul>
                        <p className="mt-2">Consulte as opções disponíveis para seu projeto específico.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </ScrollReveal>

              {/* Support & Guarantee */}
              <ScrollReveal>
                <Card className="p-8 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Ainda tem dúvidas?</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Se não encontrou a resposta que procurava, não hesite em contactar-nos! 
                      Nossa equipe está pronta para esclarecer todas as suas dúvidas.
                    </p>
                    
                    <div className="bg-background p-6 rounded-lg space-y-3 border">
                      <p className="text-foreground font-semibold">Entre em contacto:</p>
                      <div className="space-y-2">
                        <p>📧 Email: <a href="mailto:lgtecserv@gmail.com" className="text-primary hover:underline">lgtecserv@gmail.com</a></p>
                        <p>📱 Telefone: +258 84 1524 822 / +258 869 824 047</p>
                        <p>💬 WhatsApp: Clique no botão no canto inferior direito</p>
                        <p>📍 Localização: Maputo, Moçambique</p>
                      </div>
                    </div>

                    <p className="text-sm">
                      Horário de atendimento: Segunda a Sexta, 8h-18h | Sábado, 8h-13h
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

export default FAQ;