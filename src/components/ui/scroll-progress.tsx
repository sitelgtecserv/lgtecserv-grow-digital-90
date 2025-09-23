import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
}

const ScrollProgress = ({ className }: ScrollProgressProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        setScrollProgress((currentScrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 w-full h-1 bg-muted z-50",
        className
      )}
    >
      <div
        className="h-full bg-gradient-primary transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        aria-label={`Progresso de leitura: ${Math.round(scrollProgress)}%`}
      />
    </div>
  );
};

export default ScrollProgress;