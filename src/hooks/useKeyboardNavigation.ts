import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const routes = [
  "/",
  "/sobre-nos-lg-tecserv-mocambique",
  "/servicos-lg-tecserv-mocambique",
  "/pagina-de-contato-lg-tecserv-mocambique",
  "/servicos/criacao-desenvolvimento-sites-profissionais-mocambique",
  "/servicos/design-grafico-profissional-mocambique",
  "/servicos/gestao-trafego-pago-marketing-digital-mocambique",
  "/servicos/gestao-redes-sociais-marketing-digital-mocambique",
  "/servicos/consultoria-marketing-digital-estrategico-mocambique",
  "/servicos/instalacoes-eletricas-profissionais-mocambique",
  "/servicos/eletricidade-residencial-instalacoes-domesticas-mocambique",
  "/servicos/eletricidade-industrial-instalacoes-empresariais-mocambique",
];

export const useKeyboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle navigation if no input/textarea is focused
      const activeElement = document.activeElement as HTMLElement;
      const isInputFocused = activeElement?.tagName === "INPUT" || 
                           activeElement?.tagName === "TEXTAREA" ||
                           activeElement?.contentEditable === "true";

      if (isInputFocused) return;

      const currentIndex = routes.indexOf(location.pathname);
      
      // Arrow key navigation with Alt key
      if (e.altKey) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            if (currentIndex > 0) {
              navigate(routes[currentIndex - 1]);
            }
            break;
          case "ArrowRight":
            e.preventDefault();
            if (currentIndex < routes.length - 1) {
              navigate(routes[currentIndex + 1]);
            }
            break;
          case "Home":
            e.preventDefault();
            navigate("/");
            break;
        }
      }

      // Quick navigation shortcuts with Ctrl/Cmd
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "h":
            e.preventDefault();
            navigate("/");
            break;
          case "s":
            e.preventDefault();
            navigate("/servicos-lg-tecserv-mocambique");
            break;
          case "a":
            e.preventDefault();
            navigate("/sobre-nos-lg-tecserv-mocambique");
            break;
          case "c":
            e.preventDefault();
            navigate("/pagina-de-contato-lg-tecserv-mocambique");
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate, location.pathname]);
};

export default useKeyboardNavigation;