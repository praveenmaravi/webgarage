// src/utils/validation.ts

import { z } from "zod";

/**
 * User Authentication
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const registerSchema = loginSchema.extend({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
});

/**
 * Project Schema
 */
export const projectSchema = z.object({
  title: z.string().min(3, { message: "Project title is required." }),
  description: z.string().max(300, { message: "Description is too long." }).optional(),
  type: z.enum(["website", "webapp", "component", "template"]),
  tags: z.array(z.string()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Component Schema (for Studio UI components)
 */
export const componentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(["button", "form", "card", "image", "custom", "3d-model"]),
  props: z.record(z.any()).optional(),
  styles: z.record(z.any()).optional(),
  animations: z.array(z.string()).optional(),
});

/**
 * Backend API Endpoint Schema (for visual backend builder)
 */
export const apiEndpointSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  path: z.string().min(1),
  secure: z.boolean().default(true),
  body: z.record(z.any()).optional(),
  headers: z.record(z.any()).optional(),
});

/**
 * Timeline Animation Keyframe Schema
 */
export const keyframeSchema = z.object({
  time: z.number().min(0),
  properties: z.record(z.any()), // e.g., { opacity: 0.5, x: 100 }
});

/**
 * AR/VR Config Validation
 */
export const arConfigSchema = z.object({
  enableXR: z.boolean(),
  anchorType: z.enum(["plane", "image", "world"]),
  modelUrl: z.string().url(),
  fallbackImage: z.string().url().optional(),
});

/**
 * Generic form validator helper
 */
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);
  return {
    success: result.success,
    data: result.success ? result.data : null,
    errors: result.success
      ? null
      : result.error.flatten().fieldErrors,
  };
};
