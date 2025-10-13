import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";

interface HeroProps {
  projectCount: number;
}

export function Hero({ projectCount }: HeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <section className="relative overflow-hidden border-b min-h-[500px] flex flex-col justify-end transition-all duration-500">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 z-0"
        style={{ 
          backgroundImage: `url('/slider1.jpg')`,
          filter: isDark ? 'brightness(0.7) contrast(1.1)' : 'none',
        }}
      />

      {/* Gradient Overlay */}
      <div 
        className={`absolute inset-0 transition-all duration-500 z-10 ${
          isDark 
            ? 'bg-gradient-to-b from-black/70 via-black/50 to-black/80' 
            : 'bg-gradient-to-b from-transparent via-white/10 to-white/60'
        }`}
      />

      {/* Dot Pattern */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 z-20 ${
          isDark ? 'opacity-20' : 'opacity-5'
        }`}
        style={{ 
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          color: isDark ? 'white' : 'black'
        }} 
      />

      {/* Main Content */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-[120px]">
        <div className="mx-auto max-w-4xl text-center space-y-6 mb-10">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-300 ${
              isDark ? 'text-white drop-shadow-2xl' : 'text-gray-900 drop-shadow-lg'
            }`}
          >
            MONTFORT IP
            <span
              className={`block mt-3 bg-clip-text text-transparent ${
                isDark
                  ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500'
                  : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700'
              }`}
            >
              EXHIBITION 2025
            </span>
          </h1>

          <p
            className={`mx-auto max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed transition-all duration-300 ${
              isDark 
                ? 'text-gray-100 drop-shadow-lg' 
                : 'text-gray-800 drop-shadow-md font-medium'
            }`}
          >
            Discover innovative student projects showcasing creativity, 
            technology, and academic excellence. Explore groundbreaking ideas 
            from our talented innovators.
          </p>
        </div>

        {/* Badge at Bottom */}
        <div className="flex justify-center pb-6">
          <Badge 
            variant="outline" 
            className={`backdrop-blur-md shadow-lg transition-all duration-300 ${
              isDark
                ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                : 'border-black/20 bg-white/60 text-gray-900 hover:bg-white/80'
            }`}
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {projectCount} Featured Projects
          </Badge>
        </div>
      </div>
    </section>
  );
}
