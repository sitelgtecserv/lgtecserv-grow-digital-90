import { useParams, Navigate, Link } from "react-router-dom";
import { getTeamMemberBySlug, teamMembers } from "@/data/teamMembers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AnimatedCounter from "@/components/ui/animated-counter";
import {
  Briefcase, Award, Target, Heart, Lightbulb, Shield, Users,
  Mail, ArrowRight, Star, CheckCircle, ArrowLeft, Calendar, Wrench
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Banner images
import bannerLuis from "@/assets/banners/banner-luismatsenjua.jpg";
import bannerInacio from "@/assets/banners/banner-inaciolanga.jpg";
import bannerFelex from "@/assets/banners/banner-felexlourindo.jpg";
import bannerLemos from "@/assets/banners/banner-lemossabado.jpg";
import bannerClaudia from "@/assets/banners/banner-claudiaarmando.jpg";

const bannerMap: Record<string, string> = {
  luismatsenjua: bannerLuis,
  inaciolanga: bannerInacio,
  felexlourindo: bannerFelex,
  lemossabado: bannerLemos,
  claudiaarmando: bannerClaudia,
};

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
};

const iconMapSmall: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
};

// Animated section wrapper
const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const MemberProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = window.location.pathname;
  const resolvedSlug = slug || location.replace('/', '');
  const member = resolvedSlug ? getTeamMemberBySlug(resolvedSlug) : undefined;

  if (!member) return <Navigate to="/404" replace />;

  const otherMembers = teamMembers.filter(m => m.slug !== member.slug);

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

        {/* Hero Banner Premium */}
        <section className="relative py-28 md:py-36 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={member.bannerImage ? bannerMap[member.bannerImage] : undefined}
              alt=""
              className="w-full h-full object-cover scale-105"
              style={{ willChange: "transform" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <Button variant="ghost" size="sm" asChild className="mb-8 text-white/80 hover:text-white hover:bg-white/10">
                <Link to="/sobre-nos-lg-tecserv-mocambique">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Voltar à Equipa
                </Link>
              </Button>
            </motion.div>
            <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex-shrink-0"
              >
                <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20 ring-offset-4 ring-offset-transparent">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover bg-white/10" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center md:text-left"
              >
                <p className="text-sm font-medium uppercase tracking-widest text-white/60 mb-2">LG TecServ</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">{member.name}</h1>
                <div className="inline-block backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-5">
                  <p className="text-lg md:text-xl font-medium">{member.role}</p>
                </div>
                <p className="text-lg text-white/75 italic max-w-xl leading-relaxed">"{member.impactPhrase}"</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="relative -mt-8 z-20 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {member.stats.map((stat, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
                    <CardContent className="p-5 text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                        {iconMapSmall[stat.icon] || <Star className="w-5 h-5" />}
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-foreground">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix || ""} duration={1500} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wide">{stat.label}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre o Profissional - Side by side */}
        <AnimatedSection>
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Briefcase className="w-5 h-5" /></div>
                <h2 className="text-3xl font-bold">Sobre o Profissional</h2>
              </div>
              <div className="grid md:grid-cols-5 gap-10">
                <div className="md:col-span-3 space-y-4 text-lg text-muted-foreground leading-relaxed">
                  {member.bio.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="md:col-span-2">
                  <div className="relative bg-muted/50 rounded-2xl p-8 border border-border">
                    <span className="absolute -top-4 left-6 text-6xl text-primary/20 font-serif leading-none">"</span>
                    <p className="text-lg font-medium text-foreground italic leading-relaxed mt-2">
                      {member.impactPhrase}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={member.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Timeline de Carreira */}
        <AnimatedSection>
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Calendar className="w-5 h-5" /></div>
                <h2 className="text-3xl font-bold">Percurso Profissional</h2>
              </div>
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
                {member.timeline.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.15}>
                    <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-10" : "text-left pl-10"}`}>
                        <Card className="border-0 shadow-sm inline-block">
                          <CardContent className="p-5">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md z-10">
                        {item.year.slice(2)}
                      </div>
                      <div className="flex-1 pl-14 md:pl-10 md:hidden">
                        <p className="text-xs font-bold text-primary mb-1">{item.year}</p>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "pl-10" : "pr-10"}`}>
                        <span className="text-sm font-bold text-primary">{item.year}</span>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Função na Empresa */}
        <AnimatedSection>
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Target className="w-5 h-5" /></div>
                <h2 className="text-3xl font-bold">Função na Empresa</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-5">Responsabilidades</h3>
                  <div className="space-y-3">
                    {member.responsibilities.map((r, i) => (
                      <AnimatedSection key={i} delay={i * 0.08}>
                        <div className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border/50 shadow-sm">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{r}</span>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Contribuição Estratégica</h3>
                      <p className="text-muted-foreground leading-relaxed">{member.strategicContribution}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm bg-primary/5">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Impacto</h3>
                      <p className="text-muted-foreground leading-relaxed">{member.impact}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Competências com Barras de Progresso */}
        <AnimatedSection>
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Star className="w-5 h-5" /></div>
                <h2 className="text-3xl font-bold">Competências</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold mb-5">Hard Skills</h3>
                  <div className="space-y-4">
                    {member.skillLevels.map((s, i) => (
                      <AnimatedSection key={i} delay={i * 0.1}>
                        <div>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-sm font-medium text-foreground">{s.skill}</span>
                            <span className="text-xs text-muted-foreground font-mono">{s.level}%</span>
                          </div>
                          <Progress value={s.level} className="h-2" />
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-5">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.softSkills.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Badge variant="secondary" className="text-sm py-1.5 px-3">{s}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                    <Wrench className="w-4 h-4" /> Ferramentas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.tools.map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Badge variant="outline" className="text-sm py-1.5 px-3">{t}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Valores Profissionais */}
        <AnimatedSection>
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Heart className="w-5 h-5" /></div>
                <h2 className="text-3xl font-bold">Valores Profissionais</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {member.values.map((v, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          {iconMap[v.icon] || <Star className="w-6 h-6" />}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                        <p className="text-sm text-muted-foreground">{v.description}</p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Projetos e Resultados Premium */}
        <AnimatedSection>
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Award className="w-5 h-5" /></div>
                <h2 className="text-3xl font-bold">Projetos e Resultados</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {member.projects.map((p, i) => (
                  <AnimatedSection key={i} delay={i * 0.15}>
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full group hover:-translate-y-1">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 font-bold text-lg">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <h3 className="font-semibold text-lg mb-3">{p.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">{p.description}</p>
                        <div className="flex items-start gap-2 bg-primary/5 rounded-xl p-4 border border-primary/10">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-primary">{p.result}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Conheça Também - Navegação entre Membros */}
        <AnimatedSection>
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Users className="w-5 h-5" /></div>
                <h2 className="text-3xl font-bold">Conheça Também</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {otherMembers.map((m, i) => (
                  <AnimatedSection key={m.slug} delay={i * 0.1}>
                    <Link to={`/${m.slug}`} className="group block">
                      <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={m.image}
                            alt={m.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold text-sm">{m.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection>
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
        </AnimatedSection>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default MemberProfile;
