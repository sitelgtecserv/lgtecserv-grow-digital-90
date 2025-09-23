import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export const CookiesBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookies-accepted");
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookies-accepted", "true");
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookies-accepted", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-background/95 backdrop-blur-sm border-border shadow-lg">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img 
              src="/lovable-uploads/b1a5e62a-0fc0-447c-8210-6fed000d0b62.png" 
              alt="LG TecServ" 
              className="h-6 w-6 mt-1 flex-shrink-0 object-contain" 
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Utilizamos Cookies
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Este site utiliza cookies para melhorar a sua experiência de navegação, 
                analisar o tráfego do site e personalizar o conteúdo. Ao continuar a 
                navegar no nosso site, você concorda com o uso de cookies conforme 
                descrito nos nossos{" "}
                <Link 
                  to="/termos-e-condicoes-lg-tecserv" 
                  className="text-primary hover:underline font-medium"
                >
                  Termos e Condições
                </Link>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={acceptCookies}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Aceitar Cookies
                </Button>
                <Button 
                  onClick={rejectCookies}
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  Recusar
                </Button>
              </div>
            </div>
            <Button
              onClick={rejectCookies}
              variant="ghost"
              size="icon"
              className="flex-shrink-0 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};