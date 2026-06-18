import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

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
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      let animationFrameId: number;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutQuart
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      
      animationFrameId = window.requestAnimationFrame(step);

      return () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold">
      {prefix}{count}{suffix}
    </span>
  );
};

export default OptimizedCounter;