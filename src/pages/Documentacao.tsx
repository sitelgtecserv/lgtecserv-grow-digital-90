import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { organizationData } from "@/utils/seoData";
import { termosCondicoes } from "@/data/termosCondicoes";
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
  HelpCircle,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";

const Documentacao = () => {
  const [activeTermId, setActiveTermId] = useState<string>(termosCondicoes[0]?.id || "1");

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

  // Helper to render markdown content for Termos safely and easily
  const renderTermContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Bold text handling
      let htmlLine = line;
      
      // Match bold __text__
      if (htmlLine.includes('__')) {
        htmlLine = htmlLine.replace(/__(.*?)__/g, '<strong>$1</strong>');
      }

      // Handle bullets
      if (htmlLine.startsWith('•')) {
        return (
          <li key={index} className="pl-2 ml-4 list-disc text-muted-foreground" dangerouslySetInnerHTML={{ __html: htmlLine.substring(1).trim() }} />
        );
      }
      
      return (
        <p key={index} className="mb-3 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: htmlLine }} />
      );
    });
  };

  const activeTerm = termosCondicoes.find(t => t.id === activeTermId);

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

        {/* Tabs and Main Content Section */}
        <section className="py-12 bg-muted/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <Tabs defaultValue="institucional" className="w-full">
              
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2 h-14 items-center">
                  <TabsTrigger value="institucional" className="text-sm md:text-base h-full rounded-md flex gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="hidden sm:inline">Apresentação & Valores</span>
                    <span className="sm:hidden">Sobre Nós</span>
                  </TabsTrigger>
                  <TabsTrigger value="termos" className="text-sm md:text-base h-full rounded-md flex gap-2">
                    <BookOpen className="w-4 h-4" />
                    Termos e Condições
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* ABA 1: Institucional / Apresentação e Valores */}
              <TabsContent value="institucional" className="space-y-12 animate-fade-in">
                
                {/* Navigation Index (Old Design but slightly adjusted for inside tab) */}
                <Card className="max-w-5xl mx-auto shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <FileText className="w-6 h-6 text-primary" />
                      Índice Institucional
                    </CardTitle>
                    <CardDescription>
                      Navegue rapidamente para a secção desejada
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => scrollToSection('apresentacao')}>
                        <Briefcase className="w-5 h-5 mr-3 text-primary" />
                        <div className="text-left">
                          <div className="font-semibold">Apresentação</div>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => scrollToSection('missao')}>
                        <Target className="w-5 h-5 mr-3 text-primary" />
                        <div className="text-left">
                          <div className="font-semibold">Missão e Valores</div>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => scrollToSection('atendimento')}>
                        <Phone className="w-5 h-5 mr-3 text-primary" />
                        <div className="text-left">
                          <div className="font-semibold">Atendimento</div>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => scrollToSection('suporte')}>
                        <Mail className="w-5 h-5 mr-3 text-primary" />
                        <div className="text-left">
                          <div className="font-semibold">Suporte</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-12 max-w-5xl mx-auto">
                  {/* 1. Apresentação */}
                  <Card id="apresentacao" className="scroll-mt-20 shadow-sm border-t-4 border-t-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Apresentação da Empresa</CardTitle>
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
                  <Card id="missao" className="scroll-mt-20 shadow-sm border-t-4 border-t-secondary">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-secondary/10">
                          <Target className="w-6 h-6 text-secondary" />
                        </div>
                        <CardTitle className="text-2xl">Missão, Visão e Valores</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="space-y-3 p-6 bg-muted/30 rounded-xl border border-border/50">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-background rounded-lg shadow-sm border border-border/50 flex-shrink-0">
                            <Target className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">A Nossa Missão</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              Impulsionar a transformação digital das empresas em Moçambique e no mundo, fornecendo soluções tecnológicas inovadoras, robustas e escaláveis. Comprometemo-nos a entregar serviços de excelência que combinam design sofisticado, engenharia de ponta e estratégias orientadas para resultados, garantindo a total satisfação e o crescimento sustentável dos nossos clientes.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 p-6 bg-muted/30 rounded-xl border border-border/50">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-background rounded-lg shadow-sm border border-border/50 flex-shrink-0">
                            <Eye className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">A Nossa Visão</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              Consolidar a LG TecServ como a principal e mais confiável referência tecnológica em Moçambique e no continente africano. Ambicionamos liderar o mercado de soluções digitais através da inovação contínua, estabelecendo novos padrões de qualidade, segurança e performance no desenvolvimento de ecossistemas web e mobile.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 mb-6">
                          <Heart className="w-6 h-6 text-secondary flex-shrink-0" />
                          <h3 className="text-xl font-bold text-foreground">Os Nossos Valores Essenciais</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg bg-card hover:border-secondary/50 transition-colors">
                            <h4 className="font-semibold text-foreground mb-1">Profissionalismo & Rigor</h4>
                            <p className="text-sm text-muted-foreground">Atuamos com o máximo rigor técnico, excelência operacional e compromisso inabalável com os prazos acordados.</p>
                          </div>
                          
                          <div className="p-4 border rounded-lg bg-card hover:border-secondary/50 transition-colors">
                            <h4 className="font-semibold text-foreground mb-1">Ética & Transparência</h4>
                            <p className="text-sm text-muted-foreground">Mantemos total clareza e honestidade em todas as nossas relações comerciais e processos de desenvolvimento.</p>
                          </div>
                          
                          <div className="p-4 border rounded-lg bg-card hover:border-secondary/50 transition-colors">
                            <h4 className="font-semibold text-foreground mb-1">Inovação Tecnológica</h4>
                            <p className="text-sm text-muted-foreground">Procuramos constantemente as melhores e mais recentes tecnologias para oferecer soluções à prova do futuro.</p>
                          </div>
                          
                          <div className="p-4 border rounded-lg bg-card hover:border-secondary/50 transition-colors">
                            <h4 className="font-semibold text-foreground mb-1">Foco Total no Cliente</h4>
                            <p className="text-sm text-muted-foreground">O sucesso, a escalabilidade e os resultados dos nossos parceiros são a verdadeira métrica do nosso próprio sucesso.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 3. Regras de Atendimento */}
                  <Card id="atendimento" className="scroll-mt-20 shadow-sm">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Regras de Atendimento</CardTitle>
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

                      <div className="space-y-3 text-muted-foreground mt-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <p>Todos os orçamentos são enviados por email, WhatsApp ou formulário do site.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <p>Após aprovação do orçamento, o serviço só inicia mediante confirmação do pagamento combinado.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 4. Comunicação e Suporte */}
                  <Card id="suporte" className="scroll-mt-20 shadow-sm">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Comunicação e Suporte</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                          <Mail className="w-8 h-8 text-primary mb-3" />
                          <p className="font-medium text-foreground mb-1">Email</p>
                          <a href="mailto:contato@lgtecserv.com" className="text-sm text-primary hover:underline">
                            contato@lgtecserv.com
                          </a>
                        </div>
                        
                        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                          <Phone className="w-8 h-8 text-primary mb-3" />
                          <p className="font-medium text-foreground mb-1">WhatsApp</p>
                          <a href="https://api.whatsapp.com/send?phone=258869824047" className="text-sm text-primary hover:underline">
                            +258 869 824 047
                          </a>
                        </div>
                        
                        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-muted/50">
                          <Globe className="w-8 h-8 text-primary mb-3" />
                          <p className="font-medium text-foreground mb-1">Website</p>
                          <a href="https://www.lgtecserv.com" className="text-sm text-primary hover:underline">
                            www.lgtecserv.com
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </TabsContent>

              {/* ABA 2: Termos e Condições (SIDEBAR) */}
              <TabsContent value="termos" className="animate-fade-in">
                <Card className="shadow-lg border-0 bg-background overflow-hidden">
                  <div className="flex flex-col md:flex-row h-[800px]">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-border bg-muted/20">
                      <div className="p-6 border-b border-border bg-card">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Índice de Cláusulas
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">Selecione um tópico para ler os detalhes</p>
                      </div>
                      
                      {/* Mobile Select (visible only on small screens) */}
                      <div className="md:hidden p-4">
                        <select 
                          className="w-full p-2 border rounded-md bg-background"
                          value={activeTermId}
                          onChange={(e) => setActiveTermId(e.target.value)}
                        >
                          {termosCondicoes.map((termo) => (
                            <option key={termo.id} value={termo.id}>
                              {termo.id}. {termo.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Desktop Scroll Area */}
                      <ScrollArea className="h-[600px] hidden md:block">
                        <div className="p-4 space-y-1">
                          {termosCondicoes.map((termo) => (
                            <button
                              key={termo.id}
                              onClick={() => setActiveTermId(termo.id)}
                              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                                activeTermId === termo.id 
                                  ? 'bg-primary text-primary-foreground font-medium shadow-md' 
                                  : 'hover:bg-muted text-foreground'
                              }`}
                            >
                              <span className="truncate pr-2">
                                <span className={activeTermId === termo.id ? 'opacity-100' : 'opacity-50'}>{termo.id}. </span> 
                                {termo.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full md:w-2/3 bg-card relative">
                      <ScrollArea className="h-full p-6 md:p-10">
                        {activeTerm ? (
                          <div className="animate-fade-in max-w-3xl">
                            <Badge variant="outline" className="mb-4">Cláusula {activeTerm.id}</Badge>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                              {activeTerm.title}
                            </h2>
                            <div className="prose prose-sm md:prose-base dark:prose-invert">
                              {renderTermContent(activeTerm.content)}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <BookOpen className="w-12 h-12 mb-4 opacity-20" />
                            <p>Selecione uma cláusula para ler</p>
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
            </Tabs>
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
