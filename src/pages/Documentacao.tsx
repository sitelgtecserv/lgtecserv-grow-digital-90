import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { organizationData } from "@/utils/seoData";
import { 
  FileText, 
  Target, 
  Eye, 
  Heart, 
  Phone, 
  CreditCard, 
  Globe, 
  Shield, 
  Lock, 
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Briefcase,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Documentacao = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Documentação Oficial - LG TecServ",
    "description": "Documentação completa sobre políticas, regras de atendimento, pagamentos e processos da LG TecServ",
    "author": organizationData,
    "publisher": organizationData,
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEOHead
        title="Documentação Oficial | LG TecServ - Políticas, Regras e Processos Completos"
        description="Conheça todas as políticas oficiais da LG TecServ: missão e valores, regras de atendimento, políticas de pagamento e reembolso, criação de sites, direitos de uso, privacidade e muito mais. Total transparência."
        keywords="documentação LG TecServ, políticas oficiais, regras de atendimento, política de pagamento, política de criação sites, direitos de uso, privacidade, proteção de dados, transparência, Moçambique"
        url="https://www.lgtecserv.com/documentacao-oficial-lg-tecserv"
        type="article"
        structuredData={[organizationData, articleSchema]}
      />
      
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <Badge className="mb-4 text-sm px-4 py-1">Documentação Oficial</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transparência e <span className="gradient-text">Profissionalismo</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
                Conheça todas as nossas políticas, processos e compromissos com você
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Index */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Índice de Conteúdos
                </CardTitle>
                <CardDescription>
                  Navegue rapidamente para a secção desejada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => scrollToSection('apresentacao')}
                  >
                    <Briefcase className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Apresentação da Empresa</div>
                      <div className="text-xs text-muted-foreground">Quem somos e o que fazemos</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => scrollToSection('missao')}
                  >
                    <Target className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Missão, Visão e Valores</div>
                      <div className="text-xs text-muted-foreground">Nossos pilares fundamentais</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => scrollToSection('atendimento')}
                  >
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Regras de Atendimento</div>
                      <div className="text-xs text-muted-foreground">Horários e processos</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => scrollToSection('pagamentos')}
                  >
                    <CreditCard className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Pagamentos e Reembolsos</div>
                      <div className="text-xs text-muted-foreground">Formas de pagamento e políticas</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => scrollToSection('criacao-sites')}
                  >
                    <Globe className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Política de Criação de Sites</div>
                      <div className="text-xs text-muted-foreground">Processo e diretrizes</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => scrollToSection('direitos')}
                  >
                    <Shield className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Direitos de Uso</div>
                      <div className="text-xs text-muted-foreground">Propriedade e licenciamento</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => scrollToSection('privacidade')}
                  >
                    <Lock className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Privacidade</div>
                      <div className="text-xs text-muted-foreground">Proteção de dados</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => scrollToSection('suporte')}
                  >
                    <Mail className="w-5 h-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-semibold">Comunicação e Suporte</div>
                      <div className="text-xs text-muted-foreground">Canais de contacto</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl space-y-12">
            
            {/* 1. Apresentação */}
            <Card id="apresentacao" className="scroll-mt-20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Apresentação da Empresa</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  A <strong className="text-foreground">LG TecServ</strong> é uma empresa moçambicana especializada em criação de sites, 
                  design gráfico, tráfego pago, gestão de redes sociais, branding e marketing digital.
                </p>
                <p>
                  Nosso compromisso é oferecer soluções criativas, funcionais e seguras para que cada cliente 
                  conquiste mais visibilidade e resultados no ambiente digital.
                </p>
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Compromisso:</strong> Qualidade, transparência e inovação em todos os nossos serviços.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* 2. Missão, Visão e Valores */}
            <Card id="missao" className="scroll-mt-20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Missão, Visão e Valores</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">Missão</h3>
                      <p className="text-muted-foreground">
                        Fornecer serviços digitais com qualidade, transparência e inovação.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">Visão</h3>
                      <p className="text-muted-foreground">
                        Ser referência em Moçambique na criação de sites e soluções digitais completas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">Valores</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Profissionalismo</Badge>
                        <Badge variant="secondary">Ética</Badge>
                        <Badge variant="secondary">Responsabilidade</Badge>
                        <Badge variant="secondary">Inovação</Badge>
                        <Badge variant="secondary">Respeito ao Cliente</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Regras de Atendimento */}
            <Card id="atendimento" className="scroll-mt-20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Regras de Atendimento</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Horário de Atendimento:</strong><br />
                      Segunda a Sábado, das 8h às 18h
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <Mail className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Canais Oficiais:</strong><br />
                      Email, WhatsApp e formulário do site
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Todos os orçamentos são enviados por email, WhatsApp ou formulário do site.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Após aprovação do orçamento, o serviço só inicia mediante confirmação do pagamento combinado.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Prazos variam conforme o tipo de serviço, e serão definidos em contrato ou proposta individual.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Pagamentos e Reembolsos */}
            <Card id="pagamentos" className="scroll-mt-20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Pagamentos e Reembolsos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Formas de Pagamento Aceites</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Badge variant="outline" className="justify-center py-2 text-sm">M-Pesa</Badge>
                    <Badge variant="outline" className="justify-center py-2 text-sm">eMola</Badge>
                    <Badge variant="outline" className="justify-center py-2 text-sm">Depósito Bancário</Badge>
                    <Badge variant="outline" className="justify-center py-2 text-sm">PayPal</Badge>
                  </div>
                </div>

                <Alert className="border-primary/50 bg-primary/5">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    <strong>Modalidade de Pagamento:</strong><br />
                    60% de adiantamento no início do serviço + 40% na entrega
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Política de Reembolso:</strong><br />
                    Em caso de desistência após o início do projeto, não há reembolso do valor adiantado, 
                    pois envolve tempo e recursos já aplicados.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* 5. Política de Criação de Sites */}
            <Card id="criacao-sites" className="scroll-mt-20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Política de Criação de Sites</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-4 list-decimal list-inside text-muted-foreground">
                  <li className="pl-2">
                    <strong className="text-foreground">Desenvolvimento Personalizado:</strong> Cada site é desenvolvido 
                    com base nas informações, textos e imagens fornecidos pelo cliente.
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Prazo de Entrega:</strong> O prazo médio varia entre 7 e 21 dias úteis, 
                    dependendo da complexidade e da aprovação das etapas.
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Revisões Incluídas:</strong> Após a entrega, o cliente tem direito 
                    a até <Badge variant="secondary" className="mx-1">2 revisões gratuitas</Badge>; alterações extras 
                    podem gerar custos adicionais.
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Hospedagem:</strong> O site é hospedado no domínio do cliente ou 
                    na hospedagem oferecida pela LG TecServ, conforme acordado.
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Propriedade Intelectual:</strong> O design, código e estrutura técnica 
                    permanecem sob propriedade da LG TecServ até o pagamento total.
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Transferência de Direitos:</strong> Após o pagamento, o cliente tem 
                    direito de uso completo, podendo solicitar acesso total aos arquivos e ao painel mediante o pagamento de 
                    uma taxa adicional de aquisição.
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Responsabilidade Pós-Entrega:</strong> A LG TecServ não se responsabiliza 
                    por falhas, exclusões, erros ou uso inadequado que ocorram após a entrega total dos acessos ao cliente.
                  </li>
                  <li className="pl-2">
                    <strong className="text-foreground">Manutenção:</strong> A manutenção e suporte após a entrega são oferecidos 
                    apenas a clientes com plano ativo de manutenção.
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* 6. Direitos de Uso */}
            <Card id="direitos" className="scroll-mt-20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Direitos de Uso e Propriedade</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-primary/50 bg-primary/5">
                  <Shield className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    <strong>Propriedade Intelectual:</strong> Todos os designs, sites e materiais produzidos pela LG TecServ 
                    são de propriedade da empresa até o pagamento total do serviço.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      Após o pagamento integral, o cliente passa a ter o direito de uso completo do material.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p>
                      É <strong className="text-foreground">proibida</strong> a revenda, cópia ou modificação de nossos 
                      produtos sem autorização por escrito.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 7. Privacidade */}
            <Card id="privacidade" className="scroll-mt-20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Privacidade e Proteção de Dados</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-primary/50 bg-primary/5">
                  <Lock className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    Respeitamos a privacidade de todos os clientes e não partilhamos dados pessoais com terceiros.
                  </AlertDescription>
                </Alert>

                <p className="text-muted-foreground leading-relaxed">
                  As informações fornecidas (nome, contacto, logotipos, etc.) são usadas <strong className="text-foreground">apenas 
                  para execução dos serviços contratados</strong>.
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <p>
                    Para mais detalhes, consulte nossa{" "}
                    <Link to="/politica-privacidade" className="text-primary hover:underline font-medium">
                      Política de Privacidade completa
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 8. Comunicação e Suporte */}
            <Card id="suporte" className="scroll-mt-20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl">Comunicação e Suporte</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Canais Oficiais de Contacto</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a href="mailto:lgtecserv@gmail.com" className="text-sm text-primary hover:underline">
                          lgtecserv@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">WhatsApp</p>
                        <a href="https://api.whatsapp.com/send?phone=258869824047" className="text-sm text-primary hover:underline">
                          +258 869 824 047
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Globe className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Website</p>
                        <a href="https://www.lgtecserv.com" className="text-sm text-primary hover:underline">
                          www.lgtecserv.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Importante:</strong> O suporte técnico é oferecido apenas para clientes ativos ou 
                    com contrato de manutenção.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ainda Tem Dúvidas?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Estamos aqui para ajudar! Entre em contacto connosco.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <Link to="/faq">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Ver FAQ
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                    <Mail className="w-5 h-5 mr-2" />
                    Fale Connosco
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <a 
                    href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20tenho%20dúvidas%20sobre%20a%20documentação." 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Documentacao;
