import { z } from "zod";

export const classInputSchema = z.object({
  title: z.string().min(4),
  slug: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().min(12),
  focus: z.string().min(3),
  intensity: z.enum(["low", "moderate", "high"]).default("moderate"),
  durationMinutes: z.number().int().min(10).max(180).default(45),
  schedule: z.array(z.string()).default([]),
  thumbnail: z.string().url().optional(),
  gallery: z.array(z.string().url()).optional(),
  technologyStack: z.array(z.string()).default([]),
  metrics: z
    .object({
      calories: z.number().int().min(0).max(2000).optional(),
      effortIndex: z.number().int().min(0).max(100).optional(),
    })
    .optional(),
  active: z.boolean().optional(),
});

export const trainerInputSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  bio: z.string().min(10),
  avatar: z.string().url().optional(),
  accolades: z.array(z.string()).default([]),
  specialties: z.array(z.string()).default([]),
  social: z
    .object({
      instagram: z.string().url().optional(),
      x: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .optional(),
  active: z.boolean().optional(),
});

export const testimonialInputSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  quote: z.string().min(10),
  avatar: z.string().url().optional(),
  highlight: z.boolean().optional(),
});
