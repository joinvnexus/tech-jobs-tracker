// User roles
export type Role = "JOBSEEKER" | "EMPLOYER" | "ADMIN" | "MODERATOR";

// Job types
export type JobType = 
  | "FULL_TIME" 
  | "PART_TIME" 
  | "CONTRACT" 
  | "INTERNSHIP" 
  | "FREELANCE" 
  | "REMOTE" 
  | "HYBRID";

// Experience levels
export type ExperienceLevel = 
  | "ENTRY_LEVEL" 
  | "JUNIOR" 
  | "MID_LEVEL" 
  | "SENIOR" 
  | "LEAD" 
  | "MANAGER" 
  | "DIRECTOR" 
  | "EXECUTIVE";

// Job status
export type JobStatus = 
  | "DRAFT" 
  | "PENDING_REVIEW" 
  | "APPROVED" 
  | "ACTIVE" 
  | "EXPIRED" 
  | "CLOSED" 
  | "REJECTED" 
  | "ARCHIVED";

// Application status
export type ApplicationStatus = 
  | "PENDING" 
  | "REVIEWED" 
  | "SHORTLISTED" 
  | "INTERVIEW_SCHEDULED" 
  | "INTERVIEWED" 
  | "TECHNICAL_TEST" 
  | "OFFERED" 
  | "HIRED" 
  | "REJECTED" 
  | "WITHDRAWN" 
  | "ON_HOLD";

// Payment status
export type PaymentStatus = 
  | "PENDING" 
  | "COMPLETED" 
  | "FAILED" 
  | "REFUNDED";

// Location type
export type LocationType = "ONSITE" | "REMOTE" | "HYBRID";

// User type
export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: Role;
  phone?: string | null;
  location?: string | null;
  isActive: boolean;
  emailVerified?: Date | null;
  lastActive?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Job Seeker Profile
export interface JobSeekerProfile {
  id: string;
  userId: string;
  title?: string | null;
  bio?: string | null;
  dateOfBirth?: Date | null;
  gender?: string | null;
  skills: string[];
  experienceLevel?: ExperienceLevel | null;
  currentSalary?: number | null;
  expectedSalary?: number | null;
  noticePeriod?: string | null;
  preferredLocations: string[];
  remotePreferred: boolean;
  resumeUrl?: string | null;
  resumeName?: string | null;
  resumeUpdatedAt?: Date | null;
  portfolioUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  openToRelocate: boolean;
  openToRemote: boolean;
  profileViews: number;
  searchAppearances: number;
  isPublic: boolean;
}

// Employer Profile
export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  companyLogo?: string | null;
  companyWebsite?: string | null;
  companySize?: string | null;
  industry: string;
  foundedYear?: number | null;
  headquarters?: string | null;
  locations: string[];
  contactEmail: string;
  contactPhone?: string | null;
  contactPerson?: string | null;
  description?: string | null;
  mission?: string | null;
  vision?: string | null;
  benefits?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  facebookUrl?: string | null;
  verified: boolean;
  verificationDoc?: string | null;
  verifiedAt?: Date | null;
  totalJobsPosted: number;
  totalHires: number;
  profileViews: number;
  followerCount: number;
}

// Job
export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits?: string | null;
  location: string;
  locationType: LocationType;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  category: string;
  subcategory?: string | null;
  skills: string[];
  minSalary?: number | null;
  maxSalary?: number | null;
  salaryCurrency: string;
  salaryPeriod: string;
  isSalaryVisible: boolean;
  positions: number;
  applicationsCount: number;
  views: number;
  savedCount: number;
  applicationStart?: Date | null;
  applicationDeadline: Date;
  publishedAt?: Date | null;
  expiresAt?: Date | null;
  status: JobStatus;
  moderationNote?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: Date | null;
  isFeatured: boolean;
  isUrgent: boolean;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: EmployerProfile;
  applications?: Application[];
}

// Application
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  coverLetter?: string | null;
  resumeUrl: string;
  resumeName: string;
  portfolioUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  expectedSalary?: number | null;
  noticePeriod?: string | null;
  relevantExperience?: number | null;
  currentCompany?: string | null;
  currentPosition?: string | null;
  status: ApplicationStatus;
  statusHistory?: Record<string, unknown> | null;
  statusNote?: string | null;
  viewedAt?: Date | null;
  viewedBy?: string | null;
  interviewDate?: Date | null;
  interviewType?: string | null;
  interviewNotes?: string | null;
  interviewLink?: string | null;
  offerDate?: Date | null;
  offerAccepted?: boolean | null;
  joiningDate?: Date | null;
  candidateRating?: number | null;
  feedback?: string | null;
  createdAt: Date;
  updatedAt: Date;
  job?: Job;
  user?: User;
}

// Saved Job
export interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  notes?: string | null;
  createdAt: Date;
  job?: Job;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown> | null;
  link?: string | null;
  isRead: boolean;
  readAt?: Date | null;
  emailSent: boolean;
  emailSentAt?: Date | null;
  createdAt: Date;
}

// Payment
export interface Payment {
  id: string;
  userId: string;
  jobId?: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId?: string | null;
  bankTransactionId?: string | null;
  paymentMethod?: string | null;
  packageType?: string | null;
  jobPostLimit?: number | null;
  duration?: number | null;
  paidAt?: Date | null;
  expiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Blog Post
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  coverImage?: string | null;
  authorId: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  isPublished: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  profileViews: number;
  savedJobs: number;
}

// Admin Stats
export interface AdminStats {
  totalUsers: number;
  totalJobSeekers: number;
  totalEmployers: number;
  totalJobs: number;
  pendingJobs: number;
  activeJobs: number;
  totalApplications: number;
  totalPayments: number;
}
