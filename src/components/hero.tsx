import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  projectCount: number;
}

export function Hero({ projectCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b min-h-[500px] flex items-center">
      {/* Background Image - Public Folder */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/slider1.jpg')`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      
      {/* Content */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <Badge 
            variant="outline" 
            className="mb-4 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {projectCount} Featured Projects
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            MONTFORT IP
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              EXHIBITION 2025
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed drop-shadow-lg">
            Discover innovative student projects showcasing creativity, 
            technology, and academic excellence. Explore groundbreaking ideas 
            from our talented innovators.
          </p>
        </div>
      </div>
    </section>
  );
}
