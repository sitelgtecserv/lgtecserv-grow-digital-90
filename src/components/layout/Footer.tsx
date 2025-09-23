import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
const logoUrl = "/lovable-uploads/b1a5e62a-0fc0-447c-8210-6fed000d0b62.png";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Call to Action Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Transforme a Sua Visão Digital em <span className="text-secondary">Realidade</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
            Junte-se a centenas de empresas que confiam em nós para crescer digitalmente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/pagina-de-contato-lg-tecserv-mocambique"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Começar Agora
              <MapPin className="w-5 h-5 ml-2" />
            </Link>
            <a 
              href="https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              WhatsApp
              <Phone className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img src={logoUrl} alt="LG TecServ" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              Soluções digitais inovadoras para empresas que querem crescer e se destacar no mercado competitivo.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://web.facebook.com/profile.php?id=61570482453286" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/lgtecserv/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/lg-tecserv-112b20349/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center">
              Navegação
              <div className="ml-2 w-8 h-0.5 bg-white rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre-nos-lg-tecserv-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/servicos-lg-tecserv-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/pagina-de-contato-lg-tecserv-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center">
              Especialidades
              <div className="ml-2 w-8 h-0.5 bg-white rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/servicos/criacao-desenvolvimento-sites-profissionais-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Criação de Sites
                </Link>
              </li>
              <li>
                <Link to="/servicos/design-grafico-profissional-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Design Gráfico
                </Link>
              </li>
              <li>
                <Link to="/servicos/gestao-trafego-pago-marketing-digital-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Tráfego Pago
                </Link>
              </li>
              <li>
                <Link to="/servicos/gestao-redes-sociais-marketing-digital-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Gestão de Redes Sociais
                </Link>
              </li>
              <li>
                <Link to="/servicos/consultoria-marketing-digital-estrategico-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Consultoria de Marketing
                </Link>
              </li>
              <li>
                <Link to="/servicos/instalacoes-eletricas-profissionais-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Instalações Elétricas
                </Link>
              </li>
              <li>
                <Link to="/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Eletricidade Residencial
                </Link>
              </li>
              <li>
                <Link to="/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique" className="text-sm text-white/90 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-white rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                  Eletricidade Industrial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center">
              Fale Connosco
              <div className="ml-2 w-8 h-0.5 bg-white rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="p-2 rounded-lg bg-white/20">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">Telefones</p>
                  <p className="text-xs text-white/80">+258 84 1524 822</p>
                  <p className="text-xs text-white/80">+258 869 824 047</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="p-2 rounded-lg bg-white/20">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="text-xs text-white/80">lgtecserv@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="p-2 rounded-lg bg-white/20">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Localização</p>
                  <p className="text-xs text-white/80">Maputo, Moçambique</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
              <Link to="/politica-privacidade" className="text-white/80 hover:text-white transition-colors duration-300 relative group">
                Política de Privacidade
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/termos-e-condicoes-lg-tecserv" className="text-white/80 hover:text-white transition-colors duration-300 relative group">
                Termos e Condições
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/faq" className="text-white/80 hover:text-white transition-colors duration-300 relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-white/80">
                © {new Date().getFullYear()} LG TecServ. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;