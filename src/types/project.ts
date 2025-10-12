import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  studentName: z.string().min(1, "Student name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const insertProjectSchema = projectSchema.omit({ id: true });

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;