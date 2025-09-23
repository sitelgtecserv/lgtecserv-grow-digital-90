import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div 
        className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          transition: "transform 0.3s ease-out",
          top: "10%",
          left: "10%",
        }}
      />
      <div 
        className="absolute w-48 h-48 bg-secondary/5 rounded-full blur-2xl"
        style={{
          transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`,
          transition: "transform 0.3s ease-out",
          bottom: "20%",
          right: "15%",
        }}
      />
      <div 
        className="absolute w-32 h-32 bg-accent/5 rounded-full blur-xl"
        style={{
          transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px)`,
          transition: "transform 0.3s ease-out",
          top: "60%",
          left: "70%",
        }}
      />
    </div>
  );
};

export default FloatingElements;