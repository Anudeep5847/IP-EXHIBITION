import { z } from "zod";

// ============================================================
// Project Schema Validation
// ============================================================

export const projectSchema = z.object({
  id: z.string().uuid("Invalid project ID format"), // safer: enforce UUID pattern if using Supabase or Postgres
  name: z.string().min(1, "Project name is required"),
  studentName: z.string().min(1, "Student name is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  imageUrl: z
    .union([
      z.string().url("Must be a valid URL"),
      z.literal(""), // allow empty string for optional URL
      z.undefined(), // allow missing field
    ])
    .optional(),
});

// ============================================================
// Insert Project Schema (for POST requests, no `id` yet)
// ============================================================

export const insertProjectSchema = projectSchema.omit({ id: true });

// ============================================================
// Types
// ============================================================

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
