import { Card } from "@/components/ui/card";

const BusinessBanner = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-card border-0 shadow-elegant overflow-hidden">
          <div className="relative">
            {/* Banner Image */}
            <div className="aspect-[16/6] md:aspect-[16/4] lg:aspect-[16/3] relative overflow-hidden">
              <img
                src="/lovable-uploads/325d2c5b-6f59-4ea5-9d92-9f389ced5bf8.png"
                alt="Transformação Digital - Tecnologia e Inovação"
                className="w-full h-full object-cover"
              />
              {/* Overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                      Transformação Digital
                    </h3>
                    <p className="text-lg md:text-xl text-white/90 mb-6">
                      Conectamos o seu negócio ao futuro com soluções tecnológicas inovadoras
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BusinessBanner;