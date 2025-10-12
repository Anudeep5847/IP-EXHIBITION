import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema, type InsertProject } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";

interface ProjectFormProps {
  onSubmit: (data: InsertProject) => Promise<void> | void;
  onCancel?: () => void;
  defaultValues?: Partial<InsertProject>;
  submitLabel?: string;
}

export default function ProjectForm({
  onSubmit,
  onCancel,
  defaultValues,
  submitLabel = "Submit Project",
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: defaultValues || {
      name: "",
      studentName: "",
      description: "",
      imageUrl: "",
    },
  });

  const onFormSubmit = async (data: InsertProject) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Project Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter project name"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Student Name */}
      <div className="space-y-2">
        <Label htmlFor="studentName">
          Student Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="studentName"
          {...register("studentName")}
          placeholder="Enter student name"
          className={errors.studentName ? "border-destructive" : ""}
        />
        {errors.studentName && (
          <p className="text-sm text-destructive">
            {errors.studentName.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe your project (minimum 10 characters)"
          rows={4}
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input
          id="imageUrl"
          {...register("imageUrl")}
          placeholder="https://example.com/image.jpg"
          className={errors.imageUrl ? "border-destructive" : ""}
        />
        {errors.imageUrl && (
          <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Leave empty to use a default placeholder image
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className={onCancel ? "flex-1" : "w-full"}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}