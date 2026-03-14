import { z } from "zod";

// Job post validation schema
export const jobPostSchema = z.object({
  // Basic Info
  title: z.string().min(5, "Job title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  responsibilities: z.string().min(20, "Responsibilities must be at least 20 characters"),
  requirements: z.string().min(20, "Requirements must be at least 20 characters"),
  benefits: z.string().optional(),
  
  // Location & Type
  location: z.string().min(1, "Location is required"),
  locationType: z.enum(["ONSITE", "REMOTE", "HYBRID"]),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"]),
  experienceLevel: z.enum([
    "ENTRY_LEVEL",
    "JUNIOR",
    "MID_LEVEL",
    "SENIOR",
    "LEAD",
    "MANAGER",
    "DIRECTOR",
    "EXECUTIVE",
  ]),
  
  // Category & Skills
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  
  // Salary
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
  salaryCurrency: z.string().default("BDT"),
  salaryPeriod: z.enum(["MONTHLY", "YEARLY", "HOURLY"]).default("MONTHLY"),
  isSalaryVisible: z.boolean().default(true),
  
  // Positions & Dates
  positions: z.number().min(1, "At least 1 position is required").default(1),
  applicationDeadline: z.string().transform((str) => new Date(str)),
  applicationStart: z.string().transform((str) => new Date(str)).optional(),
}).refine(
  (data) => {
    if (data.minSalary && data.maxSalary) {
      return data.minSalary <= data.maxSalary;
    }
    return true;
  },
  {
    message: "Minimum salary cannot be greater than maximum salary",
    path: ["minSalary"],
  }
).refine(
  (data) => {
    if (data.applicationDeadline) {
      return new Date(data.applicationDeadline) > new Date();
    }
    return true;
  },
  {
    message: "Application deadline must be in the future",
    path: ["applicationDeadline"],
  }
);

// Job filter schema for search
export const jobFilterSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE", "REMOTE", "HYBRID"]).optional(),
  experienceLevel: z.enum(["ENTRY_LEVEL", "JUNIOR", "MID_LEVEL", "SENIOR", "LEAD", "MANAGER", "DIRECTOR", "EXECUTIVE"]).optional(),
  category: z.string().optional(),
  skills: z.string().optional(),
  minSalary: z.number().optional(),
  maxSalary: z.number().optional(),
  locationType: z.enum(["ONSITE", "REMOTE", "HYBRID"]).optional(),
  sortBy: z.enum(["newest", "oldest", "salary_high", "salary_low", "relevance"]).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(20),
});

// Job application schema
export const jobApplicationSchema = z.object({
  coverLetter: z.string().max(2000, "Cover letter must be less than 2000 characters").optional(),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  expectedSalary: z.number().optional(),
  noticePeriod: z.string().optional(),
  relevantExperience: z.number().optional(),
  currentCompany: z.string().optional(),
  currentPosition: z.string().optional(),
});

// Application status update schema
export const applicationStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "REVIEWED",
    "SHORTLISTED",
    "INTERVIEW_SCHEDULED",
    "INTERVIEWED",
    "TECHNICAL_TEST",
    "OFFERED",
    "HIRED",
    "REJECTED",
    "WITHDRAWN",
    "ON_HOLD",
  ]),
  statusNote: z.string().optional(),
  interviewDate: z.string().transform((str) => new Date(str)).optional(),
  interviewType: z.string().optional(),
  interviewLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Types for validation
export type JobPostInput = z.infer<typeof jobPostSchema>;
export type JobFilterInput = z.infer<typeof jobFilterSchema>;
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
export type ApplicationStatusInput = z.infer<typeof applicationStatusSchema>;
