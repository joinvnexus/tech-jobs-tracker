# HireHub: Complete Job Portal Development Prompt

## 📋 প্রোজেক্ট overview
তুমি একজন expert full-stack developer। তুমি Next.js 14, TypeScript, PostgreSQL, Prisma, এবং Tailwind CSS ব্যবহার করে একটি production-ready job portal বানাবে। প্রোজেক্টের নাম "HireHub"।

## 🎯 Core Features (Must Have)
1. **Multi-role Authentication** - Job Seeker, Employer, Admin
2. **Job Management** - Post, Search, Filter, Apply
3. **Profile Management** - Resume upload, Skills, Experience
4. **Application Tracking** - Status updates, Notifications
5. **Admin Panel** - User management, Job approval
6. **Payment Integration** - SSLCommerz for job posting
7. **Email Notifications** - Application status, Job alerts
8. **Real-time Updates** - Application status changes

## 📁 Complete Project Structure

```
hirehub/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                    # Homepage
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx                 # Jobs listing
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx             # Job details
│   │   │   ├── companies/
│   │   │   │   ├── page.tsx                 # Companies list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx             # Company profile
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx                 # Blog list
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx             # Blog post
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       ├── page.tsx
│   │   │       └── [role]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx                 # Seeker dashboard
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── applications/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── saved-jobs/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── resume/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── employer/
│   │   │       ├── page.tsx                  # Employer dashboard
│   │   │       ├── layout.tsx
│   │   │       ├── post-job/
│   │   │       │   └── page.tsx
│   │   │       ├── manage-jobs/
│   │   │       │   └── page.tsx
│   │   │       ├── applicants/
│   │   │       │   └── [jobId]/
│   │   │       │       └── page.tsx
│   │   │       ├── company-profile/
│   │   │       │   └── page.tsx
│   │   │       ├── analytics/
│   │   │       │   └── page.tsx
│   │   │       └── billing/
│   │   │           └── page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── page.tsx                      # Admin dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx
│   │   │   │   └── pending/
│   │   │   │       └── page.tsx
│   │   │   ├── companies/
│   │   │   │   └── page.tsx
│   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   ├── reports/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── jobs/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── apply/
│   │   │   │   │       └── route.ts
│   │   │   │   └── featured/
│   │   │   │       └── route.ts
│   │   │   ├── applications/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       └── status/
│   │   │   │           └── route.ts
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   ├── profile/
│   │   │   │   │   └── route.ts
│   │   │   │   └── saved-jobs/
│   │   │   │       └── route.ts
│   │   │   ├── employer/
│   │   │   │   ├── jobs/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── stats/
│   │   │   │   │   └── route.ts
│   │   │   │   └── company/
│   │   │   │       └── route.ts
│   │   │   ├── admin/
│   │   │   │   ├── users/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── jobs/
│   │   │   │   │   └── route.ts
│   │   │   │   └── stats/
│   │   │   │       └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts
│   │   │   ├── payment/
│   │   │   │   ├── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   └── notifications/
│   │   │       └── route.ts
│   │   │
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── jobs/
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobList.tsx
│   │   │   ├── JobFilters.tsx
│   │   │   ├── JobDetails.tsx
│   │   │   ├── ApplyForm.tsx
│   │   │   ├── SaveJobButton.tsx
│   │   │   └── ShareJob.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── JobPostForm.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── ResumeForm.tsx
│   │   │   └── CompanyForm.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   ├── ApplicationCard.tsx
│   │   │   └── Chart.tsx
│   │   │
│   │   ├── employer/
│   │   │   ├── ApplicantCard.tsx
│   │   │   ├── ApplicantTable.tsx
│   │   │   ├── JobCard.tsx
│   │   │   └── Stats.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SearchSection.tsx
│   │   │   ├── FeaturedJobs.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── TopCompanies.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   └── shared/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── EmptyState.tsx
│   │       └── SEOHead.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── email.ts
│   │   ├── payment.ts
│   │   └── validations/
│   │       ├── auth.ts
│   │       ├── job.ts
│   │       ├── profile.ts
│   │       └── application.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useJobs.ts
│   │   ├── useApplications.ts
│   │   ├── useDebounce.ts
│   │   └── useToast.ts
│   │
│   ├── types/
│   │   ├── next-auth.d.ts
│   │   ├── index.ts
│   │   └── api.ts
│   │
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   ├── ToastProvider.tsx
│   │   └── QueryProvider.tsx
│   │
│   └── middleware.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 📦 Required Packages

```json
{
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "next-auth": "^5.0.0-beta.4",
    "@prisma/client": "^5.7.0",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.4",
    "react-hook-form": "^7.48.2",
    "@hookform/resolvers": "^3.3.2",
    "uploadthing": "^6.1.0",
    "@uploadthing/react": "^6.0.2",
    "date-fns": "^2.30.0",
    "lucide-react": "^0.294.0",
    "react-hot-toast": "^2.4.1",
    "nodemailer": "^6.9.7",
    "@tanstack/react-query": "^5.14.2",
    "axios": "^1.6.2",
    "react-chartjs-2": "^5.2.0",
    "chart.js": "^4.4.1",
    "framer-motion": "^10.16.16",
    "slugify": "^1.6.6",
    "pdf-parse": "^1.1.1",
    "stripe": "^14.5.0",
    "sslcommerz": "^1.0.5"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/nodemailer": "^6.4.14",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "prisma": "^5.7.0",
    "eslint": "^8",
    "eslint-config-next": "14.0.4"
  }
}
```

## 🔧 Environment Variables

```env
# .env.example

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hirehub"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# Email (Nodemailer)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@hirehub.com"

# File Upload (Uploadthing)
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

# Payment (SSLCommerz - Bangladesh)
SSL_STORE_ID=""
SSL_STORE_PASSWORD=""
SSL_STORE_URL="https://sandbox.sslcommerz.com"

# Redis (optional for caching)
REDIS_URL="redis://localhost:6379"
```

## 🗄️ Complete Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========== ENUMS ==========
enum Role {
  JOBSEEKER
  EMPLOYER
  ADMIN
  MODERATOR
}

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  INTERNSHIP
  FREELANCE
  REMOTE
  HYBRID
}

enum ExperienceLevel {
  ENTRY_LEVEL
  JUNIOR
  MID_LEVEL
  SENIOR
  LEAD
  MANAGER
  DIRECTOR
  EXECUTIVE
}

enum JobStatus {
  DRAFT
  PENDING_REVIEW
  APPROVED
  ACTIVE
  EXPIRED
  CLOSED
  REJECTED
  ARCHIVED
}

enum ApplicationStatus {
  PENDING
  REVIEWED
  SHORTLISTED
  INTERVIEW_SCHEDULED
  INTERVIEWED
  TECHNICAL_TEST
  OFFERED
  HIRED
  REJECTED
  WITHDRAWN
  ON_HOLD
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

// ========== USER MODEL ==========
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String?   // Null for OAuth users
  name          String
  image         String?
  role          Role      @default(JOBSEEKER)
  phone         String?
  location      String?
  isActive      Boolean   @default(true)
  emailVerified DateTime?
  lastActive    DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  jobSeekerProfile JobSeekerProfile?
  employerProfile  EmployerProfile?
  applications     Application[]
  savedJobs        SavedJob[]
  notifications    Notification[]
  paymentHistory   Payment[]
  sessions         Session[]
  accounts         Account[]
  
  @@index([email])
  @@index([role])
  @@index([createdAt])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([sessionToken])
  @@index([userId])
}

// ========== JOB SEEKER PROFILE ==========
model JobSeekerProfile {
  id              String          @id @default(cuid())
  userId          String          @unique
  user            User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Personal Info
  title           String?         // Professional title (e.g., "Senior Developer")
  bio             String?         @db.Text
  dateOfBirth     DateTime?
  gender          String?
  
  // Professional Info
  skills          String[]
  experienceLevel ExperienceLevel?
  currentSalary   Int?
  expectedSalary  Int?
  noticePeriod    String?         // e.g., "30 days", "Immediate"
  preferredLocations String[]
  remotePreferred Boolean         @default(false)
  
  // Links
  resumeUrl       String?
  resumeName      String?
  resumeUpdatedAt DateTime?
  portfolioUrl    String?
  githubUrl       String?
  linkedinUrl     String?
  
  // Education & Experience (JSON for flexibility)
  education       Json?           // Array of education objects
  experience      Json?           // Array of work experience
  certifications  Json?           // Array of certifications
  languages       Json?           // Array of languages
  
  // Preferences
  jobTypes        JobType[]
  industries      String[]
  openToRelocate  Boolean         @default(false)
  openToRemote    Boolean         @default(true)
  
  // Stats
  profileViews    Int             @default(0)
  searchAppearances Int           @default(0)
  isPublic        Boolean         @default(true)
  
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  
  @@index([userId])
  @@index([skills])
}

// ========== EMPLOYER PROFILE ==========
model EmployerProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Company Details
  companyName     String
  companyLogo     String?
  companyWebsite  String?
  companySize     String?
  industry        String
  foundedYear     Int?
  headquarters    String?
  locations       String[]
  
  // Contact
  contactEmail    String
  contactPhone    String?
  contactPerson   String?
  
  // About
  description     String?  @db.Text
  mission         String?  @db.Text
  vision          String?  @db.Text
  benefits        String?  @db.Text
  
  // Social
  linkedinUrl     String?
  twitterUrl      String?
  facebookUrl     String?
  
  // Verification
  verified        Boolean  @default(false)
  verificationDoc String?
  verifiedAt      DateTime?
  
  // Stats
  totalJobsPosted Int      @default(0)
  totalHires      Int      @default(0)
  profileViews    Int      @default(0)
  followerCount   Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  jobs            Job[]
  reviews         CompanyReview[]
  
  @@index([companyName])
  @@index([industry])
  @@index([verified])
}

// ========== JOB MODEL ==========
model Job {
  id               String       @id @default(cuid())
  
  // Basic Info
  title            String
  slug             String       @unique
  description      String       @db.Text
  responsibilities String       @db.Text
  requirements     String       @db.Text
  benefits         String?      @db.Text
  
  // Location & Type
  location         String
  locationType     String       @default("ONSITE")
  jobType          JobType      @default(FULL_TIME)
  experienceLevel  ExperienceLevel @default(ENTRY_LEVEL)
  
  // Category & Skills
  category         String
  subcategory      String?
  skills           String[]
  
  // Salary
  minSalary        Int?
  maxSalary        Int?
  salaryCurrency   String       @default("BDT")
  salaryPeriod     String       @default("MONTHLY")
  isSalaryVisible  Boolean      @default(true)
  
  // Positions & Applications
  positions        Int          @default(1)
  applicationsCount Int         @default(0)
  views            Int          @default(0)
  savedCount       Int          @default(0)
  
  // Dates
  applicationStart DateTime?
  applicationDeadline DateTime
  publishedAt      DateTime?
  expiresAt        DateTime?
  
  // Status & Moderation
  status           JobStatus    @default(PENDING_REVIEW)
  moderationNote   String?
  reviewedBy       String?
  reviewedAt       DateTime?
  isFeatured       Boolean      @default(false)
  isUrgent         Boolean      @default(false)
  
  // Relations
  createdById      String
  createdBy        EmployerProfile @relation(fields: [createdById], references: [id], onDelete: Cascade)
  applications     Application[]
  savedBy          SavedJob[]
  
  // Payment
  paymentId        String?
  payment          Payment?
  
  // Metadata
  metadata         Json?
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
  
  @@unique([slug])
  @@index([title])
  @@index([status])
  @@index([category])
  @@index([createdById])
  @@index([applicationDeadline])
}

// ========== APPLICATION MODEL ==========
model Application {
  id              String           @id @default(cuid())
  
  // Relations
  jobId           String
  job             Job              @relation(fields: [jobId], references: [id], onDelete: Cascade)
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Application Details
  coverLetter     String?          @db.Text
  resumeUrl       String
  resumeName      String
  portfolioUrl    String?
  linkedinUrl     String?
  githubUrl       String?
  
  // Additional Info
  expectedSalary  Int?
  noticePeriod    String?
  relevantExperience Int?
  currentCompany  String?
  currentPosition String?
  
  // Status Tracking
  status          ApplicationStatus @default(PENDING)
  statusHistory   Json?            // Track all status changes
  statusNote      String?          // Note from employer
  viewedAt        DateTime?
  viewedBy        String?
  
  // Interview Process
  interviewDate   DateTime?
  interviewType   String?          // Phone, Video, In-person
  interviewNotes  String?          @db.Text
  interviewLink   String?
  interviewers    String[]         // User IDs of interviewers
  
  // Hiring
  offerDate       DateTime?
  offerAccepted   Boolean?
  joiningDate     DateTime?
  
  // Ratings
  candidateRating Int?             // 1-5 rating by employer
  feedback        String?          @db.Text
  
  // Metadata
  metadata        Json?
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  @@unique([jobId, userId])
  @@index([jobId])
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

// ========== SAVED JOBS ==========
model SavedJob {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  jobId     String
  job       Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  notes     String?
  createdAt DateTime @default(now())

  @@unique([userId, jobId])
  @@index([userId])
  @@index([createdAt])
}

// ========== COMPANY REVIEWS ==========
model CompanyReview {
  id           String   @id @default(cuid())
  companyId    String
  company      EmployerProfile @relation(fields: [companyId], references: [id], onDelete: Cascade)
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Ratings
  overallRating Float   // 1-5
  careerGrowth  Int
  workLife      Int
  culture       Int
  management    Int
  salary        Int
  
  // Review
  title        String
  pros         String   @db.Text
  cons         String   @db.Text
  advice       String?  @db.Text
  
  // Employment Details
  isCurrent    Boolean
  jobTitle     String
  duration     String   // e.g., "1-2 years"
  
  // Moderation
  isVerified   Boolean  @default(false)
  isApproved   Boolean  @default(false)
  helpfulCount Int      @default(0)
  reportCount  Int      @default(0)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  @@unique([companyId, userId])
  @@index([companyId])
  @@index([overallRating])
  @@index([isApproved])
}

// ========== NOTIFICATIONS ==========
model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type      String   // APPLICATION_RECEIVED, STATUS_CHANGED, INTERVIEW_SCHEDULED, etc.
  title     String
  message   String   @db.Text
  data      Json?    // Additional data
  link      String?  // URL to redirect
  
  isRead    Boolean  @default(false)
  readAt    DateTime?
  
  emailSent Boolean  @default(false)
  emailSentAt DateTime?
  
  createdAt DateTime @default(now())
  
  @@index([userId])
  @@index([isRead])
  @@index([createdAt])
}

// ========== PAYMENTS ==========
model Payment {
  id              String        @id @default(cuid())
  
  // Relations
  userId          String
  user            User          @relation(fields: [userId], references: [id])
  jobId           String?       // If payment is for a job post
  job             Job?          @relation(fields: [jobId], references: [id])
  
  // Payment Details
  amount          Float
  currency        String        @default("BDT")
  status          PaymentStatus @default(PENDING)
  
  // SSLCommerz Fields
  transactionId   String?       @unique
  bankTransactionId String?
  paymentMethod   String?       // bKash, Nagad, Card, etc.
  
  // Package Details
  packageType     String?       // e.g., "BASIC", "PREMIUM"
  jobPostLimit    Int?          // Number of jobs allowed
  duration        Int?          // Duration in days
  
  // Timestamps
  paidAt          DateTime?
  expiresAt       DateTime?     // When the package expires
  
  // Metadata
  metadata        Json?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([transactionId])
}

// ========== BLOG POSTS ==========
model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  excerpt     String?
  coverImage  String?
  
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  
  category    String
  tags        String[]
  
  views       Int      @default(0)
  likes       Int      @default(0)
  
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  
  seoTitle    String?
  seoDesc     String?
  keywords    String[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([slug])
  @@index([category])
  @@index([publishedAt])
}
```

## 🔐 Authentication Setup (NextAuth v5)

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/onboarding",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            jobSeekerProfile: true,
            employerProfile: true,
          }
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastActive: new Date() },
      });
    },
  },
};
```

## 🛡️ Middleware for Route Protection

```typescript
// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const url = req.nextUrl.clone();

    // Public routes that don't need auth
    const publicRoutes = [
      "/",
      "/jobs",
      "/jobs/:path*",
      "/companies",
      "/companies/:path*",
      "/about",
      "/contact",
      "/blog",
      "/blog/:path*",
      "/login",
      "/register",
      "/api/auth/:path*",
    ];

    // Check if route is public
    const isPublicRoute = publicRoutes.some(route => {
      if (route.includes(":path*")) {
        const baseRoute = route.replace("/:path*", "");
        return path.startsWith(baseRoute);
      }
      return path === route;
    });

    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Redirect to login if no token
    if (!token) {
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }

    // Role-based route protection
    const employerRoutes = ["/employer", "/employer/:path*"];
    const adminRoutes = ["/admin", "/admin/:path*"];
    const jobSeekerRoutes = ["/dashboard", "/dashboard/:path*"];

    // Check employer routes
    if (employerRoutes.some(route => path.startsWith(route.replace("/:path*", "")))) {
      if (token.role !== "EMPLOYER" && token.role !== "ADMIN") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }

    // Check admin routes
    if (adminRoutes.some(route => path.startsWith(route.replace("/:path*", "")))) {
      if (token.role !== "ADMIN") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    // Check job seeker routes
    if (jobSeekerRoutes.some(route => path.startsWith(route.replace("/:path*", "")))) {
      if (token.role !== "JOBSEEKER" && token.role !== "ADMIN") {
        url.pathname = "/employer";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
```

## 🎨 Complete UI Components

### Button Component
```typescript
// src/components/ui/Button.tsx
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "transition-all duration-200 ease-in-out",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
```

### Job Card Component
```typescript
// src/components/jobs/JobCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Job } from "@prisma/client";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign,
  Bookmark,
  Share2
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job & {
    createdBy: {
      companyName: string;
      companyLogo: string | null;
    };
  };
  variant?: "default" | "compact" | "featured";
  isSaved?: boolean;
  onSave?: () => void;
}

export default function JobCard({ 
  job, 
  variant = "default", 
  isSaved = false,
  onSave 
}: JobCardProps) {
  const isFeatured = variant === "featured";
  
  return (
    <div
      className={cn(
        "bg-white rounded-xl border transition-all duration-200",
        isFeatured 
          ? "border-blue-200 shadow-lg hover:shadow-xl" 
          : "border-gray-200 hover:shadow-md hover:border-gray-300",
        variant === "compact" ? "p-4" : "p-6"
      )}
    >
      {/* Header with Company Logo */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Company Logo */}
          <div className={cn(
            "relative rounded-lg overflow-hidden bg-gray-100",
            variant === "compact" ? "w-12 h-12" : "w-16 h-16"
          )}>
            {job.createdBy.companyLogo ? (
              <Image
                src={job.createdBy.companyLogo}
                alt={job.createdBy.companyName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-xl">
                {job.createdBy.companyName[0]}
              </div>
            )}
          </div>
          
          {/* Title and Company */}
          <div>
            <Link href={`/jobs/${job.slug}`}>
              <h3 className={cn(
                "font-bold text-gray-900 hover:text-blue-600 transition-colors",
                variant === "compact" ? "text-base" : "text-xl"
              )}>
                {job.title}
              </h3>
            </Link>
            <p className="text-gray-600">
              {job.createdBy.companyName}
            </p>
          </div>
        </div>
        
        {/* Save Button */}
        {onSave && (
          <button
            onClick={onSave}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bookmark 
              className={cn(
                "w-5 h-5",
                isSaved ? "fill-blue-600 text-blue-600" : "text-gray-400"
              )} 
            />
          </button>
        )}
      </div>
      
      {/* Details Grid */}
      <div className={cn(
        "grid gap-3 mt-4",
        variant === "compact" ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4"
      )}>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{job.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span className="text-sm">{job.jobType}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {formatDistanceToNow(new Date(job.createdAt), { 
              addSuffix: true,
              locale: bn 
            })}
          </span>
        </div>
        
        {job.minSalary && job.maxSalary && (
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">
              {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()} {job.salaryCurrency}
            </span>
          </div>
        )}
      </div>
      
      {/* Skills/Tags */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" size="sm">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" size="sm">
              +{job.skills.length - 4}
            </Badge>
          )}
        </div>
      )}
      
      {/* Footer */}
      {variant !== "compact" && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex items-center gap-4">
            <Button size="sm" href={`/jobs/${job.slug}/apply`}>
              আবেদন করুন
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              href={`/jobs/${job.slug}`}
            >
              বিস্তারিত
            </Button>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}
```

## 📝 API Routes Examples

### Jobs API - GET with filters
```typescript
// src/app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const jobFilterSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  q: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  jobType: z.string().optional(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number().optional(),
  experienceLevel: z.string().optional(),
  sort: z.enum(["newest", "oldest", "salary-high", "salary-low"]).default("newest"),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Validate query parameters
    const query = jobFilterSchema.parse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      q: searchParams.get("q"),
      location: searchParams.get("location"),
      category: searchParams.get("category"),
      jobType: searchParams.get("jobType"),
      minSalary: searchParams.get("minSalary"),
      maxSalary: searchParams.get("maxSalary"),
      experienceLevel: searchParams.get("experienceLevel"),
      sort: searchParams.get("sort"),
    });

    const skip = (query.page - 1) * query.limit;

    // Build where clause
    const where: any = {
      status: "ACTIVE",
    };

    if (query.q) {
      where.OR = [
        { title: { contains: query.q, mode: "insensitive" } },
        { description: { contains: query.q, mode: "insensitive" } },
      ];
    }

    if (query.location) {
      where.location = { contains: query.location, mode: "insensitive" };
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.jobType) {
      where.jobType = query.jobType;
    }

    if (query.experienceLevel) {
      where.experienceLevel = query.experienceLevel;
    }

    if (query.minSalary || query.maxSalary) {
      where.minSalary = {};
      if (query.minSalary) where.minSalary.gte = query.minSalary;
      if (query.maxSalary) where.maxSalary.lte = query.maxSalary;
    }

    // Determine sort order
    let orderBy: any = {};
    switch (query.sort) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "salary-high":
        orderBy = { maxSalary: "desc" };
        break;
      case "salary-low":
        orderBy = { minSalary: "asc" };
        break;
    }

    // Get jobs with pagination
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          createdBy: {
            include: {
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy,
        skip,
        take: query.limit,
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json({
      jobs,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        pages: Math.ceil(total / query.limit),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Jobs API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is employer
    if (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only employers can post jobs" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Get employer profile
    const employer = await prisma.employerProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!employer) {
      return NextResponse.json(
        { error: "Employer profile not found" },
        { status: 404 }
      );
    }

    // Check job posting limit for free tier
    if (!employer.verified) {
      const jobsThisMonth = await prisma.job.count({
        where: {
          createdById: employer.id,
          createdAt: {
            gte: new Date(new Date().setDate(1)), // First day of current month
          },
        },
      });

      if (jobsThisMonth >= 3) {
        return NextResponse.json(
          { error: "Free tier limit reached. Please upgrade to post more jobs." },
          { status: 403 }
        );
      }
    }

    // Create job
    const job = await prisma.job.create({
      data: {
        ...body,
        slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        createdById: employer.id,
        status: employer.verified ? "ACTIVE" : "PENDING_REVIEW",
      },
    });

    // Send notifications
    // ... (implement notification logic)

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Job Creation Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## 🚀 Development Phases

### Phase 1: Setup & Authentication (Days 1-3)
- [ ] Initialize Next.js project with TypeScript
- [ ] Install all dependencies
- [ ] Set up Prisma and database
- [ ] Configure NextAuth
- [ ] Create login/register pages
- [ ] Implement middleware
- [ ] Add email verification

### Phase 2: Core Features (Days 4-7)
- [ ] Create home page with hero section
- [ ] Build job listing page with filters
- [ ] Implement job details page
- [ ] Create job application form
- [ ] Add user profile pages
- [ ] Implement resume upload
- [ ] Add save jobs functionality

### Phase 3: Employer Features (Days 8-10)
- [ ] Create employer dashboard
- [ ] Build job posting form
- [ ] Implement job management
- [ ] Add applicant tracking
- [ ] Create company profile
- [ ] Add analytics dashboard
- [ ] Implement candidate filtering

### Phase 4: Admin Panel (Days 11-12)
- [ ] Create admin dashboard
- [ ] Add user management
- [ ] Implement job approval system
- [ ] Add payment management
- [ ] Create reports section
- [ ] Add system settings

### Phase 5: Advanced Features (Days 13-15)
- [ ] Integrate SSLCommerz payment
- [ ] Add email notifications
- [ ] Implement real-time updates
- [ ] Add search with debounce
- [ ] Create blog section
- [ ] Add company reviews
- [ ] Implement job alerts

### Phase 6: Polish & Launch (Days 16-18)
- [ ] Add loading skeletons
- [ ] Implement error boundaries
- [ ] Add SEO meta tags
- [ ] Create sitemap
- [ ] Write tests
- [ ] Deploy to Vercel
- [ ] Set up monitoring

## 🎯 Development Rules

1. **TypeScript**: Strict mode enabled, no `any` types
2. **Components**: Server components by default, client only when needed
3. **Forms**: React Hook Form + Zod validation
4. **Styling**: Tailwind CSS with consistent class ordering
5. **API**: Error handling, rate limiting, input validation
6. **Database**: Prisma with proper indexing
7. **Security**: Input sanitization, CSRF protection, rate limiting
8. **Performance**: Image optimization, lazy loading, ISR
9. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
10. **Mobile**: Responsive design, touch-friendly

## 📱 Mobile Responsive Breakpoints

```css
/* Tailwind config */
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
```

## 🚢 Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Database migrations run
- [ ] Build successful (`npm run build`)
- [ ] All routes working
- [ ] Authentication flow tested
- [ ] Payment integration tested
- [ ] Email service configured
- [ ] SSL certificate active
- [ ] Domain connected
- [ ] Analytics setup
- [ ] Error tracking (Sentry)
- [ ] Backup strategy in place

## 📊 Performance Targets

- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **API Response Time**: < 200ms
- **Database Query**: < 100ms
- **Bundle Size**: < 200kb (initial)

---

## ✅ AI Agent Instructions

1. Start with Phase 1 and complete each phase sequentially
2. After completing each phase, show progress and ask for next phase
3. Use TypeScript strictly - no `any` type
4. Follow the folder structure exactly
5. Implement all database models as given
6. Create all UI components as described
7. Add proper error handling everywhere
8. Make everything responsive
9. Test each feature before moving to next
10. Ask questions if anything is unclear

**Ready to start? Begin with Phase 1: Setup & Authentication**
```
