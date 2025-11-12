import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Copy, ExternalLink, Search, FileText, BarChart3, AlertCircle } from 'lucide-react';
import SEOHead from '@/components/seo/SEOHead';
import { useToast } from '@/hooks/use-toast';

const GoogleSearchConsole = () => {
  const { toast } = useToast();
  const [verificationTag, setVerificationTag] = useState('');
  const baseUrl = 'https://www.lgtecserv.com';
  const sitemapUrl = 'https://cswrwxkjsfxcaoboihdy.supabase.co/functions/v1/sitemap';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copiado!',
      description: `${label} copiado para área de transferência.`,
    });
  };

  const steps = [
    {
      number: 1,
      title: 'Acesse o Google Search Console',
      description: 'Vá para search.google.com/search-console e faça login com sua conta Google.',
      action: (
        <Button 
          variant="outline" 
          onClick={() => window.open('https://search.google.com/search-console', '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Abrir Google Search Console
        </Button>
      )
    },
    {
      number: 2,
      title: 'Adicione uma Propriedade',
      description: 'Clique em "Adicionar propriedade" e escolha "Prefixo de URL".',
      details: [
        `Cole esta URL: ${baseUrl}`,
        'Clique em "Continuar"'
      ]
    },
    {
      number: 3,
      title: 'Escolha o Método de Verificação',
      description: 'Recomendamos usar "Tag HTML" por ser mais simples.',
      details: [
        'Na tela de verificação, selecione "Tag HTML"',
        'Copie o código fornecido pelo Google (algo como: <meta name="google-site-verification" content="xxx" />)',
        'Cole o código abaixo e salve'
      ]
    },
    {
      number: 4,
      title: 'Submeta o Sitemap',
      description: 'Após a verificação, submeta o sitemap dinâmico.',
      details: [
        'No menu lateral, clique em "Sitemaps"',
        'Cole a URL do sitemap na caixa de texto',
        'Clique em "Enviar"'
      ],
      action: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input 
              value={sitemapUrl} 
              readOnly 
              className="flex-1"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={() => copyToClipboard(sitemapUrl, 'URL do Sitemap')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(sitemapUrl, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visualizar Sitemap
          </Button>
        </div>
      )
    }
  ];

  const benefits = [
    {
      icon: Search,
      title: 'Monitoramento de Indexação',
      description: 'Veja quantas páginas estão indexadas e identifique problemas.'
    },
    {
      icon: BarChart3,
      title: 'Análise de Performance',
      description: 'Acompanhe impressões, cliques e posição média nos resultados.'
    },
    {
      icon: FileText,
      title: 'Rich Results',
      description: 'Verifique se seus produtos aparecem com estrelas e preços.'
    },
    {
      icon: AlertCircle,
      title: 'Alertas de Problemas',
      description: 'Receba notificações sobre erros de rastreamento e penalidades.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Configuração Google Search Console | LG TecServ"
        description="Guia completo para configurar o Google Search Console e melhorar o SEO da sua loja online."
        keywords="google search console, seo, indexação, sitemap"
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">
                Configuração do Google Search Console
              </h1>
              <p className="text-xl text-muted-foreground">
                Configure em 4 passos simples e melhore a visibilidade da sua loja no Google
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="setup">Configuração</TabsTrigger>
                <TabsTrigger value="verification">Verificação</TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="space-y-6 mt-6">
                {/* Steps */}
                {steps.map((step, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <CardTitle>{step.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {step.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {step.details && (
                        <ul className="space-y-2 list-none">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {step.action && (
                        <div className="pt-2">
                          {step.action}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {/* Important Notes */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p>• A indexação completa pode levar de 24h a 7 dias</p>
                    <p>• Monitore o Search Console diariamente nas primeiras semanas</p>
                    <p>• Configure alertas de email para receber notificações</p>
                    <p>• Verifique a seção "Cobertura" para identificar problemas</p>
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="verification" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Meta Tag de Verificação do Google</CardTitle>
                    <CardDescription>
                      Cole aqui a meta tag fornecida pelo Google Search Console
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="verification-tag">
                        Meta Tag de Verificação
                      </Label>
                      <Input
                        id="verification-tag"
                        placeholder='<meta name="google-site-verification" content="xxx" />'
                        value={verificationTag}
                        onChange={(e) => setVerificationTag(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Exemplo: &lt;meta name="google-site-verification" content="abc123xyz" /&gt;
                      </p>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Como adicionar ao site</AlertTitle>
                      <AlertDescription className="space-y-2">
                        <p className="font-medium">
                          Para desenvolvedores: Adicione a meta tag ao arquivo index.html na seção &lt;head&gt;
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Caminho: /index.html
                        </p>
                      </AlertDescription>
                    </Alert>

                    {verificationTag && (
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Pronto para verificar!</AlertTitle>
                        <AlertDescription className="text-green-700">
                          Após adicionar a meta tag ao site e fazer o deploy, volte ao Google Search Console e clique em "Verificar".
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Métodos alternativos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Métodos Alternativos de Verificação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Arquivo HTML</p>
                          <p className="text-sm text-muted-foreground">
                            Baixe um arquivo HTML e faça upload na raiz do site
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Google Analytics</p>
                          <p className="text-sm text-muted-foreground">
                            Use a mesma conta do Google Analytics (se já configurado)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Google Tag Manager</p>
                          <p className="text-sm text-muted-foreground">
                            Use o código do GTM para verificação automática
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* URLs úteis */}
            <Card>
              <CardHeader>
                <CardTitle>Links Úteis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Google Search Console</p>
                    <p className="text-sm text-muted-foreground">Painel principal</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open('https://search.google.com/search-console', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Rich Results Test</p>
                    <p className="text-sm text-muted-foreground">Validar structured data</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open('https://search.google.com/test/rich-results', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">URL Inspection Tool</p>
                    <p className="text-sm text-muted-foreground">Verificar indexação de URLs</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open('https://search.google.com/search-console/inspect', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default GoogleSearchConsole;
