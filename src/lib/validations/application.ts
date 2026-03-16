import { z } from "zod";

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  phone: z.string().optional(),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Job alert subscription schema
export const jobAlertSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  keywords: z.string().optional(),
  location: z.string().optional(),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE", "REMOTE", "HYBRID"]).optional(),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY"]).default("WEEKLY"),
});

// Payment/subscription schema
export const paymentSchema = z.object({
  packageType: z.enum(["BASIC", "PREMIUM", "ENTERPRISE"]),
  amount: z.number().min(1, "Amount must be at least 1"),
  currency: z.string().default("BDT"),
  paymentMethod: z.enum(["BKASH", "NAGAD", "CARD", "BANK"]),
});

// Blog post schema (for admin)
export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(5, "Slug must be at least 5 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  excerpt: z.string().max(200, "Excerpt must be less than 200 characters").optional(),
  coverImage: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().default(false),
  seoTitle: z.string().max(60, "SEO title should be less than 60 characters").optional(),
  seoDesc: z.string().max(160, "SEO description should be less than 160 characters").optional(),
  keywords: z.array(z.string()).optional(),
});

// User update schema (admin)
export const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  role: z.enum(["SEEKER", "EMPLOYER", "ADMIN", "MODERATOR"]).optional(),
  isActive: z.boolean().optional(),
});

// Job status update schema (admin)
export const jobStatusUpdateSchema = z.object({
  status: z.enum(["DRAFT", "PENDING_REVIEW", "APPROVED", "ACTIVE", "EXPIRED", "CLOSED", "REJECTED", "ARCHIVED"]),
  moderationNote: z.string().optional(),
});

// Saved job note schema
export const savedJobNoteSchema = z.object({
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
});

// Notification mark read schema
export const notificationMarkReadSchema = z.object({
  all: z.boolean().optional(),
  notificationIds: z.array(z.string()).optional(),
});

// Types for validation
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type JobAlertInput = z.infer<typeof jobAlertSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type JobStatusUpdateInput = z.infer<typeof jobStatusUpdateSchema>;
export type SavedJobNoteInput = z.infer<typeof savedJobNoteSchema>;
export type NotificationMarkReadInput = z.infer<typeof notificationMarkReadSchema>;
