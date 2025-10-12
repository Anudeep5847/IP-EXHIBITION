import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import type { Project } from "@/types/project";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem("projects");
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        const response = await fetch("/projects.json");
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();

    const handleProjectsUpdated = () => {
      loadProjects();
    };

    window.addEventListener("projectsUpdated", handleProjectsUpdated);
    return () => {
      window.removeEventListener("projectsUpdated", handleProjectsUpdated);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero projectCount={projects.length} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-10 lg:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Featured Projects
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl">
            Explore innovative ideas from our talented students showcasing
            creativity, technology, and academic excellence
          </p>
        </div>

        <ProjectGrid projects={projects} isLoading={isLoading} />
      </main>

      <footer className="border-t bg-muted/30 py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2025 MONTFORT IP EXHIBITION. Celebrating Student Innovation.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ by Anudeep, A386
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
