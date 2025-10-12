import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import ProjectForm from "@/components/project-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Loader2, AlertCircle } from "lucide-react";
import type { Project, InsertProject } from "@/types/project";
import { ToastContainer, useToast } from "@/components/toast";

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  // Load Projects
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const stored = localStorage.getItem("projects");
        if (stored) {
          setProjects(JSON.parse(stored));
        } else {
          const res = await fetch("/projects.json");
          const data: Project[] = await res.json();
          setProjects(data);
          localStorage.setItem("projects", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
        addToast("Failed to load projects", "error");
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Save Projects to Storage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem("projects", JSON.stringify(newProjects));
    window.dispatchEvent(new Event("projectsUpdated"));
  };

  // Create Project
  const handleCreate = async (data: InsertProject) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: data.name,
      studentName: data.studentName,
      description: data.description,
      imageUrl:
        data.imageUrl ||
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
    };
    const updated = [...projects, newProject];
    saveProjects(updated);
    setIsAddDialogOpen(false);
    addToast("✅ Project added successfully!", "success");
  };

  // Update Project
  const handleUpdate = async (data: InsertProject) => {
    if (!editingProject) return;
    const updated = projects.map((p) =>
      p.id === editingProject.id
        ? {
            ...p,
            name: data.name,
            studentName: data.studentName,
            description: data.description,
            imageUrl: data.imageUrl || p.imageUrl,
          }
        : p
    );
    saveProjects(updated);
    setEditingProject(null);
    addToast("✅ Project updated successfully!", "success");
  };

  // Delete Project
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const filtered = projects.filter((p) => p.id !== id);
    saveProjects(filtered);
    addToast("🗑️ Project deleted successfully", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manage Projects
          </h1>
          <p className="text-muted-foreground">
            Add, edit, or remove projects from the exhibition
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-6">
            <div>
              <CardTitle>All Projects</CardTitle>
              <CardDescription className="mt-1.5">
                {projects.length} {projects.length === 1 ? "project" : "projects"} in the exhibition
              </CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)} 
              className="gap-2 shadow-sm"
              size="default"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-sm text-muted-foreground">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Get started by adding your first project to the exhibition
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Project
                </Button>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%]">Project Name</TableHead>
                      <TableHead className="w-[20%]">Student</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Description
                      </TableHead>
                      <TableHead className="text-right w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          {project.name}
                        </TableCell>
                        <TableCell>{project.studentName}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-md">
                          <p className="truncate text-muted-foreground">
                            {project.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingProject(project)}
                              title="Edit project"
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(project.id)}
                              title="Delete project"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Fill in the project details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <ProjectForm 
            onSubmit={handleCreate}
            onCancel={() => setIsAddDialogOpen(false)}
            submitLabel="Add Project"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog
        open={!!editingProject}
        onOpenChange={(open) => !open && setEditingProject(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update the project details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              onSubmit={handleUpdate}
              onCancel={() => setEditingProject(null)}
              defaultValues={{
                name: editingProject.name,
                studentName: editingProject.studentName,
                description: editingProject.description,
                imageUrl: editingProject.imageUrl,
              }}
              submitLabel="Update Project"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}