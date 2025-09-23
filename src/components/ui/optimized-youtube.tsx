import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptimizedYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailQuality?: "default" | "hq" | "mq" | "sd" | "maxres";
}

const OptimizedYouTube = ({ 
  videoId, 
  title, 
  className,
  thumbnailQuality = "hq" 
}: OptimizedYouTubeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}default.jpg`;

  const loadVideo = () => {
    setIsLoaded(true);
  };

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        className={cn("w-full aspect-video rounded-lg", className)}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  return (
    <div 
      className={cn(
        "relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group",
        className
      )}
      onClick={loadVideo}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
        <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </div>
  );
};

export default OptimizedYouTube;