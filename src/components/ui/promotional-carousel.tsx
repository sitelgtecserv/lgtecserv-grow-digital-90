import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const PromotionalCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  const banners = [
    {
      id: 1,
      image: "/lovable-uploads/criacao-sites-banner.png",
      alt: "Promoção Criação de Sites",
      whatsappMessage: "Olá! Tenho interesse na mega promoção de criação de sites por 4999 MT. Podem me dar mais informações?"
    },
    {
      id: 2,
      image: "/lovable-uploads/design-grafico-banner.png",
      alt: "Promoção Design Gráfico",
      whatsappMessage: "Olá! Gostaria de saber mais sobre a promoção Paga 1 Leva 2 em Design Gráfico!"
    },
    {
      id: 3,
      image: "/lovable-uploads/consultoria-marketing-banner.png",
      alt: "Consultoria de Marketing",
      whatsappMessage: "Olá! Quero agendar uma consultoria de marketing para fazer minha empresa crescer!"
    },
    {
      id: 4,
      image: "/lovable-uploads/instalacoes-eletricas-banner.png",
      alt: "Instalações Elétricas",
      whatsappMessage: "Olá! Tenho interesse na promoção de instalações elétricas seguras. Podem me ajudar?"
    }
  ];

  const generateWhatsAppUrl = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=258869824047&text=${encodedMessage}`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {banners.map((banner) => (
                <CarouselItem key={banner.id} className="pl-2 md:pl-4">
                  <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02] group">
                    <a
                      href={generateWhatsAppUrl(banner.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative"
                    >
                      <div className="relative overflow-hidden bg-muted/10 rounded-lg">
                        <div className="aspect-[16/9] sm:aspect-[2/1] md:aspect-[5/2] w-full">
                          <img
                            src={banner.image}
                            alt={banner.alt}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Overlay com efeito hover */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500 flex items-center justify-center">
                        <div className="text-white text-center p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="bg-white/90 text-primary px-6 py-3 rounded-full font-semibold shadow-lg">
                            Clique para mais informações
                          </div>
                        </div>
                      </div>
                    </a>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Controles de navegação */}
            <CarouselPrevious className="left-4 bg-white/90 hover:bg-white text-primary border-0 shadow-lg hover:shadow-xl transition-all duration-300" />
            <CarouselNext className="right-4 bg-white/90 hover:bg-white text-primary border-0 shadow-lg hover:shadow-xl transition-all duration-300" />
          </Carousel>
          
          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {banners.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-muted-foreground/30 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalCarousel;