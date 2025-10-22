import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BusinessBanner from "@/components/ui/business-banner";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { localBusinessData, organizationData } from "@/utils/seoData";

const Contact = () => {

  const contactInfo = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Telefones",
      subtitle: "Ligue agora",
      details: ["+258 84 1524 822", "+258 869 824 047"],
      action: "tel:+258869824047",
      color: "text-blue-500"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      subtitle: "Envie-nos um email",
      details: ["lgtecserv@gmail.com"],
      action: "mailto:lgtecserv@gmail.com",
      color: "text-green-500"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp",
      subtitle: "Resposta imediata",
      details: ["+258 869 824 047"],
      action: "https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F",
      color: "text-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Horário",
      subtitle: "Atendimento",
      details: ["Seg - Sex: 08:00 - 18:00", "Sábado: 08:00 - 13:00"],
      action: "#",
      color: "text-orange-500"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Clientes Satisfeitos",
      color: "text-primary"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "5+",
      label: "Anos de Experiência",
      color: "text-secondary"
    },
    {
      icon: <Navigation className="w-8 h-8" />,
      number: "1000+",
      label: "Projetos Entregues",
      color: "text-accent"
    }
  ];

  return (
    <>
      <SEOHead
        title="Contacte a LG TecServ - Orçamento Gratuito para Soluções Digitais"
        description="Entre em contacto com a LG TecServ para solicitar um orçamento gratuito. Estamos em Maputo, Moçambique, prontos para ajudar o seu negócio a crescer no mundo digital."
        keywords="contacto LG TecServ, orçamento gratuito, Maputo Moçambique, telefone, email, WhatsApp, soluções digitais"
        image="https://www.lgtecserv.com/lovable-uploads/7c383221-e93f-4908-a3ab-03f2194a4b5b.png"
        url="https://www.lgtecserv.com/pagina-de-contato-lg-tecserv-mocambique"
        type="website"
        structuredData={[organizationData, localBusinessData]}
      />
      <div className="min-h-screen">
        <Breadcrumbs />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              Contacte-nos Agora
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Transforme Suas 
              <span className="gradient-text block">Ideias em Realidade</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance max-w-3xl mx-auto">
              Somos uma agência digital especializada em criar soluções inovadoras. 
              Fale connosco e descubra como podemos impulsionar o seu negócio.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary shadow-primary hover:shadow-lg transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
              >
                <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20gostaria%20de%20discutir%20um%20projeto." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar no WhatsApp
                </a>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 px-8 py-6 text-lg"
              >
                <a href="tel:+258869824047">
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar Agora
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/80 ${stat.color} mb-4 shadow-sm`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Como Pode <span className="gradient-text">Contactar-nos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha a forma mais conveniente para si. Estamos sempre disponíveis para ajudar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="group bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                <a 
                  href={info.action} 
                  target={info.action.startsWith('http') ? '_blank' : '_self'}
                  rel={info.action.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="block h-full"
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/80 ${info.color} mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      {info.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{info.title}</CardTitle>
                    <CardDescription className="text-sm font-medium">{info.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm mb-1">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Visite-nos em <span className="gradient-text">Maputo</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estamos localizados no coração de Maputo, prontos para recebê-lo.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="bg-gradient-card border-0 shadow-elegant overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="h-[600px] w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57936.89793088204!2d32.56866727910157!3d-25.96652688048629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69720b7d1f7e3%3A0x1c84c89748bfe5f9!2sMaputo%2C%20Mozambique!5e0!3m2!1sen!2smz!4v1703186400000!5m2!1sen!2smz"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="LG TecServ - Localização em Maputo, Moçambique"
                    />
                  </div>
                  
                  {/* Overlay Info Card */}
                  <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">LG TecServ</h3>
                        <p className="text-sm text-muted-foreground">Agência Digital</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        Maputo, Moçambique
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        +258 869 824 047
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        Seg-Sex: 08:00-18:00
                      </p>
                    </div>
                    <Button 
                      asChild 
                      size="sm" 
                      className="w-full mt-4 bg-gradient-primary shadow-primary"
                    >
                      <a href="https://maps.google.com/?q=Maputo,Mozambique" target="_blank" rel="noopener noreferrer">
                        <Navigation className="w-4 h-4 mr-2" />
                        Obter Direcções
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-0 shadow-elegant p-8 md:p-12 text-center">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Pronto para Começar o Seu Projeto?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Não perca mais tempo. Entre em contacto connosco e transforme as suas ideias em realidade digital.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                  <MessageCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-4">Resposta em minutos</p>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-500"
                  >
                    <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20gostaria%20de%20discutir%20um%20projeto%20digital." target="_blank" rel="noopener noreferrer">
                      Abrir WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                  <Phone className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Telefone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Ligue directamente</p>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="border-blue-500/30 text-blue-600 hover:bg-blue-50 hover:border-blue-500"
                  >
                    <a href="tel:+258869824047">
                      +258 869 824 047
                    </a>
                  </Button>
                </div>

                <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                  <Mail className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground mb-4">Envie detalhes do projeto</p>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="border-purple-500/30 text-purple-600 hover:bg-purple-50 hover:border-purple-500"
                  >
                    <a href="mailto:lgtecserv@gmail.com?subject=Novo%20Projeto%20Digital">
                      Enviar Email
                    </a>
                  </Button>
                </div>
              </div>

              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary shadow-primary hover:shadow-lg transform hover:scale-105 transition-all duration-300 px-12 py-6 text-lg"
              >
                <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20gostaria%20de%20receber%20um%20or%C3%A7amento%20personalizado%20para%20o%20meu%20projeto." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Solicitar Orçamento Gratuito
                </a>
              </Button>
            </Card>
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

export default Contact;