import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
const logoUrl = "/lovable-uploads/b1a5e62a-0fc0-447c-8210-6fed000d0b62.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: "Início",
    href: "/"
  }, {
    name: "Sobre Nós",
    href: "/sobre-nos-lg-tecserv-mocambique"
  }, {
    name: "Contacto",
    href: "/pagina-de-contato-lg-tecserv-mocambique"
  }];

  const servicosSubmenu = [
    { name: "Criação de Sites", href: "/servicos/criacao-desenvolvimento-sites-profissionais-mocambique" },
    { name: "Design Gráfico", href: "/servicos/design-grafico-profissional-mocambique" },
    { name: "Tráfego Pago", href: "/servicos/gestao-trafego-pago-marketing-digital-mocambique" },
    { name: "Redes Sociais", href: "/servicos/gestao-redes-sociais-marketing-digital-mocambique" },
    { name: "Consultoria Marketing", href: "/servicos/consultoria-marketing-digital-estrategico-mocambique" },
    { name: "Instalações Elétricas", href: "/servicos/instalacoes-eletricas-profissionais-mocambique" },
    { name: "Eletricidade Residencial", href: "/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique" },
    { name: "Eletricidade Industrial", href: "/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique" },
  ];
  const isActive = (path: string) => location.pathname === path;
  return <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b shadow-sm">
      {/* Top contact bar */}
      

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoUrl} alt="LG TecServ" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-8">
              {navigation.map(item => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link 
                      to={item.href} 
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(item.href) ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              
              {/* Serviços with dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.startsWith('/servicos') ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
                }`}>
                  Serviços
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <div className="col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/servicos-lg-tecserv-mocambique"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Todos os Serviços</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Veja a nossa gama completa de serviços
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    {servicosSubmenu.map((service) => (
                      <NavigationMenuLink key={service.href} asChild>
                        <Link
                          to={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{service.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/pagina-de-contato-lg-tecserv-mocambique">Orçamento Grátis</Link>
            </Button>
            <Button asChild className="bg-gradient-primary shadow-primary">
              <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map(item => <Link key={item.name} to={item.href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.href) ? "text-primary" : "text-muted-foreground"}`} onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
              
              {/* Mobile Serviços menu */}
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/servicos-lg-tecserv-mocambique" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/servicos-lg-tecserv-mocambique' ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </Link>
                <div className="ml-4 flex flex-col space-y-2">
                  {servicosSubmenu.map((service) => (
                    <Link
                      key={service.href}
                      to={service.href}
                      className={`text-xs font-medium transition-colors hover:text-primary ${
                        isActive(service.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button asChild variant="outline" size="sm">
                  <Link to="/pagina-de-contato-lg-tecserv-mocambique" onClick={() => setIsMenuOpen(false)}>
                    Orçamento Grátis
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-primary">
                  <a href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        </div>}
    </header>;
};
export default Header;