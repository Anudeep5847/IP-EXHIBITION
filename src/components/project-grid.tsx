import { Loader2, FolderOpen } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
}

export function ProjectGrid({ projects, isLoading }: ProjectGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center">
            <FolderOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">No Projects Yet</h3>
          <p className="text-muted-foreground">
            Projects will appear here once they are added. Visit the Manage Projects page to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}