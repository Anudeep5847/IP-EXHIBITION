import { useState, useEffect } from "react";
import { GraduationCap, LayoutDashboard, LogOut, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showLoginPopover, setShowLoginPopover] = useState(false);
  const isAdmin = location === "/admin";

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAdminAuthenticated") === "true";
      const user = localStorage.getItem("adminUsername") || "";
      setIsAuthenticated(auth);
      setUsername(user);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminUsername");
    setIsAuthenticated(false);
    setUsername("");
    setLocation("/");
  };

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
                <p className="text-xs text-muted-foreground leading-tight mt-1">
                  Exhibition 2025
                </p>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 relative">
            {isAuthenticated && (
              <Badge variant="secondary" className="hidden sm:flex gap-1.5">
                <span className="text-xs">Admin: {username}</span>
              </Badge>
            )}

            {isAuthenticated ? (
              <>
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
                <Button
                  variant="ghost"
                  size="default"
                  onClick={handleLogout}
                  className="gap-2"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                {/* Profile Icon */}
                <Button
                  variant="ghost"
                  size="default"
                  className="p-2"
                  onClick={() => setShowLoginPopover(!showLoginPopover)}
                >
                  <User className="h-6 w-6" />
                </Button>

                {/* Popover */}
                {showLoginPopover && (
                  <div className="absolute right-0 mt-2 w-36 bg-background border rounded-lg shadow-lg z-50">
                    <Link href="/login">
                      <div
                        className="cursor-pointer px-4 py-2 hover:bg-primary/10 text-sm text-foreground"
                        onClick={() => setShowLoginPopover(false)}
                      >
                        Login
                      </div>
                    </Link>
                  </div>
                )}
              </>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
