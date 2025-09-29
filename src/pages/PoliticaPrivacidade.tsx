import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Users, FileText, AlertCircle } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { organizationData } from "@/utils/seoData";

const PoliticaPrivacidade = () => {
  const lastUpdate = "Janeiro de 2025";

  return (
    <>
      <SEOHead
        title="Política de Privacidade - LG TecServ Moçambique"
        description="Conheça como a LG TecServ coleta, utiliza e protege seus dados pessoais. Políticas de privacidade, cookies e direitos dos utilizadores conforme LGPD e GDPR."
        keywords="política privacidade, proteção dados, LGPD, GDPR, cookies, dados pessoais, LG TecServ"
        url="https://www.lgtecserv.com/politica-privacidade"
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
                    <Shield className="h-12 w-12" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Política de Privacidade
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                  Seu compromisso com a segurança e privacidade dos seus dados
                </p>
                <p className="text-sm text-white/70 mt-4">
                  Última atualização: {lastUpdate}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Introduction */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <FileText className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Introdução</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      A LG TecServ está comprometida em proteger a privacidade e os dados pessoais dos nossos clientes e visitantes. 
                      Esta Política de Privacidade explica como coletamos, utilizamos, armazenamos e protegemos as suas informações 
                      pessoais de acordo com as leis de proteção de dados aplicáveis, incluindo LGPD (Lei Geral de Proteção de Dados) 
                      e GDPR (Regulamento Geral sobre a Proteção de Dados).
                    </p>
                    <p>
                      Ao utilizar os nossos serviços ou visitar o nosso website, você concorda com as práticas descritas nesta política.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Data Collection */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Users className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Dados Coletados</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Coletamos diferentes tipos de informações para fornecer e melhorar os nossos serviços:</p>
                    
                    <h3 className="text-lg font-semibold text-foreground mt-6">Dados Fornecidos Diretamente</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Informações de Contacto:</strong> Nome completo, email, número de telefone, endereço</li>
                      <li><strong>Informações de Negócio:</strong> Nome da empresa, setor de atividade, necessidades de serviço</li>
                      <li><strong>Informações de Projeto:</strong> Detalhes sobre serviços solicitados, preferências, orçamentos</li>
                      <li><strong>Comunicações:</strong> Mensagens, emails, formulários de contacto preenchidos</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mt-6">Dados Coletados Automaticamente</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, sistema operativo</li>
                      <li><strong>Dados de Utilização:</strong> Páginas visitadas, tempo de permanência, links clicados</li>
                      <li><strong>Cookies e Tecnologias Similares:</strong> Dados armazenados através de cookies para melhorar a experiência</li>
                      <li><strong>Localização:</strong> Localização aproximada baseada no endereço IP</li>
                    </ul>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Data Usage */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Eye className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Como Utilizamos os Seus Dados</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Utilizamos as suas informações pessoais para as seguintes finalidades:</p>
                    
                    <h3 className="text-lg font-semibold text-foreground mt-6">Prestação de Serviços</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Fornecer os serviços solicitados (criação de sites, design, marketing, instalações elétricas, etc.)</li>
                      <li>Processar pedidos de orçamento e propostas comerciais</li>
                      <li>Comunicar sobre o andamento de projetos</li>
                      <li>Prestar suporte técnico e atendimento ao cliente</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mt-6">Melhoria e Personalização</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Melhorar a experiência de navegação no website</li>
                      <li>Personalizar conteúdo e ofertas de acordo com os seus interesses</li>
                      <li>Analisar o uso do website para otimizar funcionalidades</li>
                      <li>Realizar pesquisas e análises de mercado</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mt-6">Marketing e Comunicação</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Enviar newsletters com novidades e promoções (com consentimento)</li>
                      <li>Informar sobre novos serviços e produtos</li>
                      <li>Enviar comunicações relacionadas com os nossos serviços</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mt-6">Base Legal</h3>
                    <p>O tratamento dos seus dados baseia-se em:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Consentimento:</strong> Para marketing e cookies não essenciais</li>
                      <li><strong>Execução Contratual:</strong> Para prestação de serviços solicitados</li>
                      <li><strong>Legítimo Interesse:</strong> Para melhorias e segurança do website</li>
                      <li><strong>Obrigação Legal:</strong> Para cumprimento de requisitos legais e fiscais</li>
                    </ul>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Cookies */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <AlertCircle className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Cookies e Tecnologias de Rastreamento</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Utilizamos cookies e tecnologias similares para melhorar a sua experiência no nosso website. 
                      Os cookies são pequenos ficheiros de texto armazenados no seu dispositivo.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-foreground mt-6">Tipos de Cookies Utilizados</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site (não requerem consentimento)</li>
                      <li><strong>Cookies de Performance:</strong> Coletam informações sobre como os visitantes utilizam o site (Google Analytics)</li>
                      <li><strong>Cookies de Funcionalidade:</strong> Lembram suas preferências e escolhas</li>
                      <li><strong>Cookies de Publicidade:</strong> Utilizados para exibir anúncios relevantes (Google AdSense)</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mt-6">Gestão de Cookies</h3>
                    <p>
                      Pode gerir as suas preferências de cookies através do banner de cookies que aparece na primeira visita 
                      ou através das configurações do seu navegador. Note que desativar certos cookies pode afetar a funcionalidade do site.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground mt-6">Serviços de Terceiros</h3>
                    <p>Utilizamos os seguintes serviços de terceiros que podem coletar dados:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento dos utilizadores</li>
                      <li><strong>Google AdSense:</strong> Para exibição de publicidade contextual</li>
                    </ul>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Data Sharing */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Users className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Compartilhamento de Dados</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>A LG TecServ não vende ou aluga os seus dados pessoais a terceiros. Podemos compartilhar suas informações apenas nas seguintes situações:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Prestadores de Serviços:</strong> Parceiros que nos ajudam a operar o negócio (hosting, analytics, etc.)</li>
                      <li><strong>Parceiros de Negócio:</strong> Quando necessário para a prestação de serviços específicos (sempre com o seu consentimento)</li>
                      <li><strong>Requisitos Legais:</strong> Quando exigido por lei ou autoridades competentes</li>
                      <li><strong>Proteção de Direitos:</strong> Para proteger nossos direitos, propriedade ou segurança</li>
                    </ul>

                    <p className="mt-4">
                      Todos os terceiros com quem compartilhamos dados são obrigados a manter a confidencialidade 
                      e segurança das suas informações pessoais.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* User Rights */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Seus Direitos</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>De acordo com as leis de proteção de dados, você tem os seguintes direitos:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Acesso:</strong> Direito de saber quais dados pessoais temos sobre você</li>
                      <li><strong>Retificação:</strong> Direito de corrigir dados incorretos ou incompletos</li>
                      <li><strong>Eliminação:</strong> Direito de solicitar a exclusão dos seus dados pessoais</li>
                      <li><strong>Portabilidade:</strong> Direito de receber seus dados em formato estruturado</li>
                      <li><strong>Oposição:</strong> Direito de se opor ao processamento dos seus dados</li>
                      <li><strong>Limitação:</strong> Direito de limitar o processamento em certas circunstâncias</li>
                      <li><strong>Revogação:</strong> Direito de retirar o consentimento a qualquer momento</li>
                    </ul>

                    <p className="mt-4">
                      Para exercer qualquer um destes direitos, entre em contacto connosco através dos dados fornecidos abaixo.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Security */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Lock className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Segurança e Armazenamento</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <h3 className="text-lg font-semibold text-foreground">Medidas de Segurança</h3>
                    <p>
                      Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais contra 
                      acesso não autorizado, perda, destruição ou alteração. Estas incluem:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Criptografia SSL/TLS para transmissão de dados</li>
                      <li>Controle de acesso rigoroso aos sistemas</li>
                      <li>Backups regulares e seguros</li>
                      <li>Formação de equipe em proteção de dados</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-foreground mt-6">Período de Retenção</h3>
                    <p>
                      Mantemos os seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas 
                      nesta política ou conforme exigido por lei. Após este período, os dados são eliminados de forma segura.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Updates */}
              <ScrollReveal>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <FileText className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Alterações nesta Política</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      A LG TecServ reserva-se o direito de atualizar esta Política de Privacidade periodicamente 
                      para refletir mudanças nas nossas práticas ou requisitos legais. Quando fizermos alterações 
                      significativas, notificaremos através do website ou por email.
                    </p>
                    <p>
                      Recomendamos que reveja esta política regularmente para se manter informado sobre como 
                      protegemos os seus dados.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Contact */}
              <ScrollReveal>
                <Card className="p-8 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <AlertCircle className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Contacto e Encarregado de Dados</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Para questões relacionadas com esta Política de Privacidade, exercício dos seus direitos 
                      ou qualquer outra questão sobre proteção de dados, entre em contacto connosco:
                    </p>
                    
                    <div className="bg-background p-6 rounded-lg space-y-2 border">
                      <p><strong className="text-foreground">LG TecServ - Soluções Tecnológicas</strong></p>
                      <p>Email: <a href="mailto:lgtecserv@gmail.com" className="text-primary hover:underline">lgtecserv@gmail.com</a></p>
                      <p>Telefone: +258 84 1524 822 / +258 869 824 047</p>
                      <p>Endereço: Maputo, Moçambique</p>
                    </div>

                    <p className="mt-4">
                      Responderemos ao seu pedido no prazo de 30 dias úteis, conforme exigido pela legislação aplicável.
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

export default PoliticaPrivacidade;