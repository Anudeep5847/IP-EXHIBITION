import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  projectCount: number;
}

export function Hero({ projectCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-success/10 border-b">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "hsl(var(--muted-foreground))",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <Badge
            variant="outline"
            className="mb-2 border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {projectCount} Featured {projectCount === 1 ? "Project" : "Projects"}
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
              MONTFORT IP
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-success bg-clip-text text-transparent">
                EXHIBITION 2025
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Discover innovative student projects showcasing creativity,
              technology, and academic excellence. Explore groundbreaking ideas
              from our talented innovators.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}