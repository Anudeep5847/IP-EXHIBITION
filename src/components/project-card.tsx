import { User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={project.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-card-foreground leading-tight line-clamp-2">
            {project.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <Badge variant="secondary" className="gap-1.5">
          <User className="h-3 w-3" />
          {project.studentName}
        </Badge>
      </CardFooter>
    </Card>
  );
}