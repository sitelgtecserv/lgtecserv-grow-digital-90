import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedLink {
  title: string;
  description: string;
  path: string;
  category?: string;
}

interface RelatedLinksProps {
  currentPath: string;
  maxItems?: number;
  className?: string;
}

const allPages: RelatedLink[] = [
  {
    title: "Sobre Nós",
    description: "Conheça a história e experiência da LG TecServ",
    path: "/sobre-nos-lg-tecserv-mocambique",
    category: "empresa"
  },
  {
    title: "Nossos Serviços",
    description: "Explore todos os nossos serviços especializados",
    path: "/servicos-lg-tecserv-mocambique",
    category: "servicos"
  },
  {
    title: "Contacto",
    description: "Entre em contacto para orçamentos gratuitos",
    path: "/pagina-de-contato-lg-tecserv-mocambique",
    category: "empresa"
  },
  // Serviços Digitais
  {
    title: "Criação de Sites",
    description: "Desenvolvimento de sites profissionais e responsivos",
    path: "/servicos/criacao-desenvolvimento-sites-profissionais-mocambique",
    category: "digital"
  },
  {
    title: "Design Gráfico",
    description: "Criação de identidades visuais e materiais gráficos",
    path: "/servicos/design-grafico-profissional-mocambique",
    category: "digital"
  },
  {
    title: "Tráfego Pago",
    description: "Gestão de campanhas de publicidade digital",
    path: "/servicos/gestao-trafego-pago-marketing-digital-mocambique",
    category: "digital"
  },
  {
    title: "Redes Sociais",
    description: "Gestão profissional de redes sociais",
    path: "/servicos/gestao-redes-sociais-marketing-digital-mocambique",
    category: "digital"
  },
  {
    title: "Consultoria Marketing",
    description: "Estratégias de marketing digital personalizadas",
    path: "/servicos/consultoria-marketing-digital-estrategico-mocambique",
    category: "digital"
  },
  // Serviços Elétricos
  {
    title: "Instalações Elétricas",
    description: "Serviços completos de instalações elétricas",
    path: "/servicos/instalacoes-eletricas-profissionais-mocambique",
    category: "eletrico"
  },
  {
    title: "Eletricidade Residencial",
    description: "Soluções elétricas para residências",
    path: "/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique",
    category: "eletrico"
  },
  {
    title: "Eletricidade Industrial",
    description: "Instalações elétricas para empresas e indústrias",
    path: "/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique",
    category: "eletrico"
  }
];

const getRelatedLinks = (currentPath: string, maxItems: number = 3): RelatedLink[] => {
  const currentPage = allPages.find(page => page.path === currentPath);
  const currentCategory = currentPage?.category;

  // Se estamos numa página de serviço, mostrar outros serviços da mesma categoria
  if (currentCategory && currentCategory !== "empresa") {
    const sameCategory = allPages.filter(
      page => page.category === currentCategory && page.path !== currentPath
    );
    
    if (sameCategory.length >= maxItems) {
      return sameCategory.slice(0, maxItems);
    }
    
    // Se não temos suficientes da mesma categoria, adicionar outros
    const others = allPages.filter(
      page => page.category !== currentCategory && page.path !== currentPath
    );
    
    return [...sameCategory, ...others].slice(0, maxItems);
  }

  // Para outras páginas, mostrar páginas mais relevantes
  return allPages
    .filter(page => page.path !== currentPath)
    .slice(0, maxItems);
};

const RelatedLinks = ({ currentPath, maxItems = 3, className }: RelatedLinksProps) => {
  const relatedLinks = getRelatedLinks(currentPath, maxItems);

  if (relatedLinks.length === 0) return null;

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 gradient-text">
          Páginas Relacionadas
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedLinks.map((link) => (
            <Card key={link.path} className="group hover:shadow-primary transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center justify-between">
                  {link.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </CardTitle>
                <CardDescription className="text-sm">
                  {link.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  to={link.path}
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm group-hover:underline transition-colors"
                  aria-label={`Ir para ${link.title}`}
                >
                  Saiba mais
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;