import { useEffect } from "react";
import SkipLink from "./skip-link";

const AccessibilityEnhancer = () => {
  useEffect(() => {
    // Focus management - ensure keyboard navigation works properly
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key functionality
      if (e.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    };

    // Auto-enhance images without alt text
    const enhanceImages = () => {
      const images = document.querySelectorAll("img:not([alt])");
      images.forEach((img) => {
        const htmlImg = img as HTMLImageElement;
        if (htmlImg.src) {
          // Generate descriptive alt text based on image context
          const fileName = htmlImg.src.split("/").pop()?.split(".")[0] || "";
          const context = htmlImg.closest("section")?.getAttribute("aria-label") || "";
          
          let altText = "";
          if (fileName.includes("banner")) altText = "Banner promocional";
          else if (fileName.includes("logo")) altText = "Logotipo";
          else if (fileName.includes("service")) altText = "Imagem do serviço";
          else if (fileName.includes("team")) altText = "Membro da equipe";
          else if (fileName.includes("partner")) altText = "Parceiro comercial";
          else if (context) altText = `Imagem relacionada a ${context}`;
          else altText = "Imagem ilustrativa";

          htmlImg.setAttribute("alt", altText);
        }
      });
    };

    // Add focus indicators to interactive elements
    const enhanceFocusIndicators = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
      );
      
      interactiveElements.forEach((element) => {
        element.addEventListener("focus", () => {
          element.classList.add("accessibility-focus");
        });
        
        element.addEventListener("blur", () => {
          element.classList.remove("accessibility-focus");
        });
      });
    };

    // Ensure proper heading hierarchy
    const validateHeadingHierarchy = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      let currentLevel = 0;
      
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.charAt(1));
        
        if (level > currentLevel + 1) {
          console.warn(`Heading hierarchy issue: ${heading.tagName} follows h${currentLevel}`);
        }
        
        currentLevel = level;
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    
    // Run enhancements
    enhanceImages();
    enhanceFocusIndicators();
    validateHeadingHierarchy();
    
    // Re-run image enhancement when DOM changes
    const observer = new MutationObserver(() => {
      enhanceImages();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Skip navigation links */}
      <SkipLink href="#main-content">
        Ir para o conteúdo principal
      </SkipLink>
      <SkipLink href="#main-navigation">
        Ir para a navegação
      </SkipLink>
      
      {/* Add custom focus indicator styles */}
      <style>
        {`
          .accessibility-focus {
            outline: 3px solid hsl(var(--primary)) !important;
            outline-offset: 2px !important;
            border-radius: 4px !important;
          }
        `}
      </style>
    </>
  );
};

export default AccessibilityEnhancer;