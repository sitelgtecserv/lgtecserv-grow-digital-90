import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  company: string;
  testimonial: string;
  rating: number;
  avatar?: string;
}

export const TestimonialCard = ({ name, company, testimonial, rating, avatar }: TestimonialCardProps) => {
  return (
    <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        {/* Rating */}
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        
        {/* Testimonial */}
        <blockquote className="text-muted-foreground mb-4 italic">
          "{testimonial}"
        </blockquote>
        
        {/* Author */}
        <div className="flex items-center space-x-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold">
                {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </div>
          )}
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};