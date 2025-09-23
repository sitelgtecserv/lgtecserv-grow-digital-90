import { useState, useEffect, useRef, useCallback } from "react";

interface OptimizedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  threshold?: number;
}

const OptimizedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = "", 
  prefix = "",
  threshold = 0.3 
}: OptimizedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number>();

  const startAnimation = useCallback(() => {
    if (isVisible) return; // Prevent multiple animations
    
    setIsVisible(true);
    let startTime: number;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount);
      
      setCount(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          startAnimation();
          observer.disconnect(); // Stop observing after animation starts
        }
      },
      { threshold }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startAnimation, isVisible, threshold]);

  return (
    <span ref={counterRef} className="font-bold">
      {prefix}{count}{suffix}
    </span>
  );
};

export default OptimizedCounter;