-- Supabase Row Level Security (RLS) Policies
-- This file contains RLS policies for database-level security.
-- Apply these policies using: psql -h your-db-host -U postgres -d your-db -f supabase-rls.sql
-- Or via Supabase Dashboard > SQL Editor

-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Company" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "JobApplication" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SavedJob" ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USER TABLE POLICIES
-- ============================================

-- Users can read all users (needed for admin functions)
CREATE POLICY "Users can read all users"
ON "User" FOR SELECT
TO authenticated
USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON "User" FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Only admins can delete users
CREATE POLICY "Admins can delete users"
ON "User" FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "id" = auth.uid() AND "role" = 'ADMIN'
  )
);

-- ============================================
-- USERPROFILE TABLE POLICIES
-- ============================================

-- Users can read any profile
CREATE POLICY "Anyone can read profiles"
ON "UserProfile" FOR SELECT
TO authenticated
USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON "UserProfile" FOR INSERT
TO authenticated
WITH CHECK (userId = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON "UserProfile" FOR UPDATE
TO authenticated
USING (userId = auth.uid());

-- ============================================
-- COMPANY TABLE POLICIES
-- ============================================

-- Anyone can read companies (public directory)
CREATE POLICY "Anyone can read companies"
ON "Company" FOR SELECT
TO authenticated
USING (true);

-- Employers can insert their own company
CREATE POLICY "Employers can insert own company"
ON "Company" FOR INSERT
TO authenticated
WITH CHECK (
  userId = auth.uid() AND
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "id" = auth.uid() AND "role" = 'EMPLOYER'
  )
);

-- Employers can update their own company
CREATE POLICY "Employers can update own company"
ON "Company" FOR UPDATE
TO authenticated
USING (userId = auth.uid());

-- Employers can delete their own company
CREATE POLICY "Employers can delete own company"
ON "Company" FOR DELETE
TO authenticated
USING (userId = auth.uid());

-- ============================================
-- JOB TABLE POLICIES
-- ============================================

-- Anyone can read ACTIVE jobs (public job board)
CREATE POLICY "Anyone can read active jobs"
ON "Job" FOR SELECT
TO authenticated
USING (status = 'ACTIVE');

-- Employers can read their own jobs (including pending/expired)
CREATE POLICY "Employers can read own jobs"
ON "Job" FOR SELECT
TO authenticated
USING (
  status != 'ACTIVE' AND
  EXISTS (
    SELECT 1 FROM "Company"
    WHERE "Company"."id" = "Job"."companyId"
    AND "Company"."userId" = auth.uid()
  )
);

-- Employers can create jobs for their company
CREATE POLICY "Employers can create jobs"
ON "Job" FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "Company"
    WHERE "Company"."id" = "Job"."companyId"
    AND "Company"."userId" = auth.uid()
  )
);

-- Employers can update their own jobs
CREATE POLICY "Employers can update own jobs"
ON "Job" FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "Company"
    WHERE "Company"."id" = "Job"."companyId"
    AND "Company"."userId" = auth.uid()
  )
);

-- Employers can delete their own jobs
CREATE POLICY "Employers can delete own jobs"
ON "Job" FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "Company"
    WHERE "Company"."id" = "Job"."companyId"
    AND "Company"."userId" = auth.uid()
  )
);

-- ============================================
-- JOBAPPLICATION TABLE POLICIES
-- ============================================

-- Seekers can read their own applications
CREATE POLICY "Seekers can read own applications"
ON "JobApplication" FOR SELECT
TO authenticated
USING (userId = auth.uid());

-- Employers can read applications for their jobs
CREATE POLICY "Employers can read applications for own jobs"
ON "JobApplication" FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "Job"
    JOIN "Company" ON "Job"."companyId" = "Company"."id"
    WHERE "Job"."id" = "JobApplication"."jobId"
    AND "Company"."userId" = auth.uid()
  )
);

-- Seekers can create their own applications
CREATE POLICY "Seekers can create own applications"
ON "JobApplication" FOR INSERT
TO authenticated
WITH CHECK (
  userId = auth.uid() AND
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "id" = auth.uid() AND "role" = 'SEEKER'
  )
);

-- Employers can update status for applications to their jobs
CREATE POLICY "Employers can update application status"
ON "JobApplication" FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "Job"
    JOIN "Company" ON "Job"."companyId" = "Company"."id"
    WHERE "Job"."id" = "JobApplication"."jobId"
    AND "Company"."userId" = auth.uid()
  )
);

-- ============================================
-- SAVEDJOB TABLE POLICIES
-- ============================================

-- Users can read their own saved jobs
CREATE POLICY "Users can read own saved jobs"
ON "SavedJob" FOR SELECT
TO authenticated
USING (userId = auth.uid());

-- Users can create their own saved jobs
CREATE POLICY "Users can create own saved jobs"
ON "SavedJob" FOR INSERT
TO authenticated
WITH CHECK (
  userId = auth.uid() AND
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "id" = auth.uid() AND "role" = 'SEEKER'
  )
);

-- Users can delete their own saved jobs
CREATE POLICY "Users can delete own saved jobs"
ON "SavedJob" FOR DELETE
TO authenticated
USING (userId = auth.uid());
