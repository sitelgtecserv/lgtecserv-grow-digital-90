import { useEffect, useRef, useState } from "react";

interface OptimizedScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

// Global observer instance
let globalObserver: IntersectionObserver | null = null;
const observedElements = new Map<Element, () => void>();

const OptimizedScrollReveal = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 600,
  className = "",
  threshold = 0.1
}: OptimizedScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create global observer if it doesn't exist
    if (!globalObserver) {
      globalObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = observedElements.get(entry.target);
            if (callback && entry.isIntersecting) {
              callback();
              globalObserver?.unobserve(entry.target);
              observedElements.delete(entry.target);
            }
          });
        },
        { threshold }
      );
    }

    const callback = () => {
      setTimeout(() => setIsVisible(true), delay);
    };

    observedElements.set(element, callback);
    globalObserver.observe(element);

    return () => {
      if (globalObserver && observedElements.has(element)) {
        globalObserver.unobserve(element);
        observedElements.delete(element);
      }
    };
  }, [delay, threshold]);

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    
    switch (direction) {
      case "up": return "translate3d(0, 30px, 0)";
      case "down": return "translate3d(0, -30px, 0)";
      case "left": return "translate3d(30px, 0, 0)";
      case "right": return "translate3d(-30px, 0, 0)";
      default: return "translate3d(0, 30px, 0)";
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

export default OptimizedScrollReveal;