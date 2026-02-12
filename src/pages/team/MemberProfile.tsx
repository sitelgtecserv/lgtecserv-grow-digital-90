import { useParams, Navigate, Link } from "react-router-dom";
import { getTeamMemberBySlug } from "@/data/teamMembers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase, Award, Target, Heart, Lightbulb, Shield, Users,
  Mail, ArrowRight, Star, CheckCircle, ArrowLeft
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
};

const MemberProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = window.location.pathname;
  const resolvedSlug = slug || location.replace('/', '');
  const member = resolvedSlug ? getTeamMemberBySlug(resolvedSlug) : undefined;

  if (!member) return <Navigate to="/404" replace />;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: { "@type": "Organization", name: "LG TecServ" },
    url: `https://www.lgtecserv.com/${member.slug}`,
    image: `https://www.lgtecserv.com${member.image}`,
  };

  return (
    <>
      <SEOHead
        title={`${member.name} - ${member.role} | LG TecServ`}
        description={member.metaDescription}
        url={`https://www.lgtecserv.com/${member.slug}`}
        image={`https://www.lgtecserv.com${member.image}`}
        structuredData={[personSchema]}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <Breadcrumbs />

        {/* Hero Banner */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <Button variant="ghost" size="sm" asChild className="mb-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/sobre-nos-lg-tecserv-mocambique">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar à Equipa
              </Link>
            </Button>
            <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary-foreground/20 shadow-2xl flex-shrink-0">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70 mb-2">LG TecServ</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">{member.name}</h1>
                <p className="text-xl md:text-2xl font-medium text-primary-foreground/90 mb-4">{member.role}</p>
                <p className="text-lg text-primary-foreground/80 italic max-w-xl">"{member.impactPhrase}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre o Profissional */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Briefcase className="w-5 h-5" /></div>
              <h2 className="text-3xl font-bold">Sobre o Profissional</h2>
            </div>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              {member.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* Função na Empresa */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Target className="w-5 h-5" /></div>
              <h2 className="text-3xl font-bold">Função na Empresa</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Responsabilidades</h3>
                <ul className="space-y-3">
                  {member.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Contribuição Estratégica</h3>
                  <p className="text-muted-foreground leading-relaxed">{member.strategicContribution}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Impacto</h3>
                  <p className="text-muted-foreground leading-relaxed">{member.impact}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competências */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Star className="w-5 h-5" /></div>
              <h2 className="text-3xl font-bold">Competências</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Hard Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {member.hardSkills.map((s, i) => <Badge key={i} variant="default" className="text-sm">{s}</Badge>)}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {member.softSkills.map((s, i) => <Badge key={i} variant="secondary" className="text-sm">{s}</Badge>)}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Ferramentas</h3>
                <div className="flex flex-wrap gap-2">
                  {member.tools.map((t, i) => <Badge key={i} variant="outline" className="text-sm">{t}</Badge>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores Profissionais */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Heart className="w-5 h-5" /></div>
              <h2 className="text-3xl font-bold">Valores Profissionais</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {member.values.map((v, i) => (
                <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      {iconMap[v.icon] || <Star className="w-6 h-6" />}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projetos e Resultados */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Award className="w-5 h-5" /></div>
              <h2 className="text-3xl font-bold">Projetos e Resultados</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {member.projects.map((p, i) => (
                <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                    <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-primary">{p.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Entrar em Contacto</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Interessado em saber mais sobre o trabalho de {member.name.split(' ')[0]}? Entre em contacto connosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-background text-foreground hover:bg-background/90">
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Contactar Agora <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href={`mailto:${member.email}`}>
                  <Mail className="w-5 h-5 mr-2" /> Enviar Email
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default MemberProfile;
