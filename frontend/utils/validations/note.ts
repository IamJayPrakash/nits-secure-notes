import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be under 200 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(10000, "Description must be under 10,000 characters"),
});

export type NoteInput = z.infer<typeof noteSchema>;
