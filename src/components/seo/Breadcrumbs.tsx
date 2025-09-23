import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateBreadcrumbData } from "@/utils/seoData";
import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  path: string;
}

const routeMap: Record<string, string> = {
  '/': 'Início',
  '/sobre-nos-lg-tecserv-mocambique': 'Sobre Nós',
  '/servicos-lg-tecserv-mocambique': 'Serviços',
  '/pagina-de-contato-lg-tecserv-mocambique': 'Contacto',
  '/termos-e-condicoes-lg-tecserv': 'Termos e Condições',
  '/servicos/criacao-desenvolvimento-sites-profissionais-mocambique': 'Criação de Sites',
  '/servicos/design-grafico-profissional-mocambique': 'Design Gráfico',
  '/servicos/gestao-trafego-pago-marketing-digital-mocambique': 'Tráfego Pago',
  '/servicos/gestao-redes-sociais-marketing-digital-mocambique': 'Redes Sociais',
  '/servicos/consultoria-marketing-digital-estrategico-mocambique': 'Consultoria Marketing',
  '/servicos/instalacoes-eletricas-profissionais-mocambique': 'Instalações Elétricas',
  '/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique': 'Eletricidade Residencial',
  '/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique': 'Eletricidade Industrial',
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Início', path: '/' }
  ];

  // Build breadcrumb trail
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = routeMap[currentPath];
    if (name) {
      breadcrumbs.push({
        name,
        path: currentPath
      });
    }
  });

  // Add breadcrumb structured data
  useEffect(() => {
    const breadcrumbItems = breadcrumbs.map(item => ({
      name: item.name,
      url: `https://www.lgtecserv.com${item.path}`
    }));

    const structuredData = generateBreadcrumbData(breadcrumbItems);
    
    // Remove existing breadcrumb schema
    const existingBreadcrumb = document.querySelector('script[data-breadcrumb="true"]');
    if (existingBreadcrumb) {
      existingBreadcrumb.remove();
    }

    // Add new breadcrumb schema
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-breadcrumb', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [location.pathname]);

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <BreadcrumbItem key={item.path}>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage className="flex items-center">
                  {index === 0 && <Home className="w-4 h-4 mr-1" />}
                  {item.name}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={item.path} className="flex items-center hover:text-primary transition-colors">
                      {index === 0 && <Home className="w-4 h-4 mr-1" />}
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;