import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=258869824047&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        variant="whatsapp"
        size="lg"
        className="rounded-full w-14 h-14 animate-pulse"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar via WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </Button>
    </div>
  );
};

export default WhatsAppButton;