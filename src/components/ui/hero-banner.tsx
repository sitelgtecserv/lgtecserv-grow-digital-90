import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const bannerImages = [
    "/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.webp",
    "/lovable-uploads/28debcb6-ac82-49e3-a295-1e7d48776737.webp", 
    "/lovable-uploads/360c27c7-e400-44e2-8dc0-059c833a6322.webp",
    "/lovable-uploads/2e1040f3-64d4-4448-9285-beddd362435d.webp"
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);


  return (
    <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-screen overflow-hidden">
      {/* Background Images with Smooth Transition */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover scale-110"
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance">
              Soluções Digitais que{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Transformam Negócios
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 text-balance">
              Criamos sites, design gráfico e estratégias de marketing digital 
              para fazer o seu negócio crescer e destacar-se da concorrência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-gradient-primary shadow-primary text-base sm:text-lg px-6 sm:px-8">
                <Link to="/pagina-de-contato-lg-tecserv-mocambique">
                  Começar Agora
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="text-base sm:text-lg px-6 sm:px-8 border-2 border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-md shadow-lg"
              >
                <Link to="/servicos-lg-tecserv-mocambique">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Ver Nosso Trabalho
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 transform translate-y-[1px]">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.93,198.39,109.18Z"
            className="text-background fill-current"
          ></path>
        </svg>
      </div>

    </section>
  );
};

export default HeroBanner;