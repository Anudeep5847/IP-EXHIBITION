import { GraduationCap, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                  MONTFORT IP
                </h1>
                <p className="text-xs text-muted-foreground leading-tight mt-3">
                  Exhibition 2025
                </p>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link href={isAdmin ? "/" : "/admin"}>
              <Button
                variant={isAdmin ? "default" : "outline"}
                size="default"
                className="gap-2 shadow-sm"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isAdmin ? "View Exhibition" : "Manage Projects"}
                </span>
                <span className="sm:hidden">
                  {isAdmin ? "Exhibition" : "Manage"}
                </span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
