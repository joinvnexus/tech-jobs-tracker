import { z } from "zod";

// Education entry schema
export const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentlyStudying: z.boolean().default(false),
  grade: z.string().optional(),
  description: z.string().optional(),
});

// Experience entry schema
export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentlyWorking: z.boolean().default(false),
  description: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

// Certification entry schema
export const certificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Certification name is required"),
  issuingOrganization: z.string().min(1, "Issuing organization is required"),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Language entry schema
export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  proficiency: z.enum(["NATIVE", "FLUENT", "ADVANCED", "INTERMEDIATE", "BEGINNER"]),
});

// Complete profile update schema
export const completeProfileSchema = z.object({
  // Personal Info
  title: z.string().min(2, "Professional title is required").optional(),
  bio: z.string().max(1000, "Bio must be less than 1000 characters").optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  
  // Professional Info
  skills: z.array(z.string()).optional(),
  experienceLevel: z.string().optional(),
  currentSalary: z.number().optional(),
  expectedSalary: z.number().optional(),
  noticePeriod: z.string().optional(),
  preferredLocations: z.array(z.string()).optional(),
  remotePreferred: z.boolean().optional(),
  
  // Links
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  
  // Resume
  resumeUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  
  // Education & Experience
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  languages: z.array(languageSchema).optional(),
  
  // Preferences
  openToRelocate: z.boolean().optional(),
  openToRemote: z.boolean().optional(),
});

// Company review schema
export const companyReviewSchema = z.object({
  overallRating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  careerGrowth: z.number().min(1).max(5),
  workLife: z.number().min(1).max(5),
  culture: z.number().min(1).max(5),
  management: z.number().min(1).max(5),
  salary: z.number().min(1).max(5),
  title: z.string().min(5, "Review title must be at least 5 characters"),
  pros: z.string().min(20, "Pros must be at least 20 characters"),
  cons: z.string().min(20, "Cons must be at least 20 characters"),
  advice: z.string().optional(),
  isCurrent: z.boolean().default(true),
  jobTitle: z.string().min(1, "Job title is required"),
  duration: z.string().min(1, "Duration is required"),
});

// Types for validation
export type EducationInput = z.infer<typeof educationSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type LanguageInput = z.infer<typeof languageSchema>;
export type CompleteProfileInput = z.infer<typeof completeProfileSchema>;
export type CompanyReviewInput = z.infer<typeof companyReviewSchema>;
