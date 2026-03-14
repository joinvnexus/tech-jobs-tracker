import { z } from "zod";

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Registration validation schema
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
  role: z.enum(["JOBSEEKER", "EMPLOYER"])
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Update profile schema
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

// Job seeker profile schema
export const jobSeekerProfileSchema = z.object({
  title: z.string().min(2, "Professional title is required").optional(),
  bio: z.string().max(1000, "Bio must be less than 1000 characters").optional(),
  skills: z.array(z.string()).optional(),
  experienceLevel: z.string().optional(),
  currentSalary: z.number().optional(),
  expectedSalary: z.number().optional(),
  noticePeriod: z.string().optional(),
  preferredLocations: z.array(z.string()).optional(),
  remotePreferred: z.boolean().optional(),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  openToRelocate: z.boolean().optional(),
  openToRemote: z.boolean().optional(),
});

// Employer profile schema
export const employerProfileSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  companyWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  companySize: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  foundedYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
  headquarters: z.string().optional(),
  locations: z.array(z.string()).optional(),
  contactEmail: z.string().email("Please enter a valid email"),
  contactPhone: z.string().optional(),
  contactPerson: z.string().optional(),
  description: z.string().max(2000, "Description must be less than 2000 characters").optional(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  benefits: z.string().optional(),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  facebookUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Types for validation
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type JobSeekerProfileInput = z.infer<typeof jobSeekerProfileSchema>;
export type EmployerProfileInput = z.infer<typeof employerProfileSchema>;
