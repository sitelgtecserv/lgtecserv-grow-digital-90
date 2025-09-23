import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image?: string;
  link?: string;
}

export const ServiceCard = ({ title, description, icon, features, image, link }: ServiceCardProps) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-elegant transition-all duration-300 border-0 bg-gradient-card h-full flex flex-col">
      {image && (
        <div className="aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-t-lg overflow-hidden group-hover:shadow-elegant transition-all duration-500">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            {icon}
          </div>
          <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm sm:text-base">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <ul className="space-y-2 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-sm sm:text-base"
          asChild
        >
          <Link to={link || "#"}>
            Saiba Mais
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};