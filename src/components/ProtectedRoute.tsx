import { useEffect } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
    
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [setLocation]);

  const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}