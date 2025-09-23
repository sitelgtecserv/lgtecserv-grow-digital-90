import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-24 right-6 z-40 rounded-full w-12 h-12 shadow-elegant transition-all duration-300",
        "bg-background/80 backdrop-blur-sm border-2 border-primary/20",
        "hover:bg-primary hover:text-primary-foreground hover:border-primary",
        "focus:bg-primary focus:text-primary-foreground",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default BackToTop;