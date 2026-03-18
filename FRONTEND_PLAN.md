# HireHub Frontend Refactor Plan

## Step 1: Component Tree & Page Structure

### App Shell (Global)
1. app/layout.tsx (server) - Root HTML, global layout, providers
   Interactive: No
   Props/State: children only
2. components/layout/AppShell.tsx (server) - Wraps page content with header/footer
   Interactive: No
3. components/layout/Header.tsx (server) - Brand, primary nav, auth CTA slot
   Interactive: Partially (mobile menu button)
4. components/layout/HeaderClient.tsx (client) - Mobile menu toggle, user dropdown
   Interactive: Yes
   State: isMenuOpen, isUserMenuOpen
5. components/layout/Footer.tsx (server) - Site links, legal
   Interactive: No

### Core Pages
1. app/page.tsx (server) - Home/Landing
2. app/jobs/page.tsx (server) - Jobs Listing
3. app/jobs/[id]/page.tsx (server) - Job Detail
4. app/companies/page.tsx (server) - Company Directory
5. app/companies/[id]/page.tsx (server) - Company Profile
6. app/auth/sign-in/page.tsx (server)
7. app/auth/sign-up/page.tsx (server)
8. app/dashboard/layout.tsx (server) - Dashboard shell
9. app/dashboard/page.tsx (server) - Overview summary
10. app/dashboard/jobs/page.tsx (server) - Employer posted jobs
11. app/dashboard/applications/page.tsx (server) - Applicant applications list
12. app/dashboard/profile/page.tsx (server) - Profile editor
13. app/pricing/page.tsx (server)
14. app/blog/page.tsx and app/blog/[slug]/page.tsx (server)
15. app/contact/page.tsx (server)
16. app/legal/privacy/page.tsx and app/legal/terms/page.tsx (server)
17. app/404.tsx (server)

### Key UI Components
1. components/ui/Button.tsx (server)
   Props: variant, size, asChild
2. components/ui/Input.tsx (server)
3. components/ui/Select.tsx (client)
   State: open, selected
4. components/ui/Badge.tsx (server)
5. components/ui/Card.tsx (server)
6. components/ui/Modal.tsx (client)
   State: open
7. components/ui/Toast.tsx (client)
8. components/ui/Tabs.tsx (client)
9. components/ui/Pagination.tsx (client or server)
10. components/ui/Avatar.tsx (server)
11. components/ui/TagInput.tsx (client)

### Jobs Listing Modules
1. components/jobs/JobsClient.tsx (client)
   State: filters, sort, page, viewMode
2. components/jobs/JobsGrid.tsx (server)
3. components/jobs/JobCard.tsx (server)
4. components/jobs/JobFilterSidebar.tsx (client)
   State: selected filters, search text
5. components/jobs/JobListToolbar.tsx (client)
   State: sort, view mode
6. components/jobs/JobSearchBar.tsx (client)
   State: query

### Job Detail Modules
1. components/job/JobHeader.tsx (server)
2. components/job/JobDescription.tsx (server)
3. components/job/JobApplyPanel.tsx (client)
   State: isSubmitting, resume, coverLetter
4. components/job/SimilarJobs.tsx (server)
5. components/job/CompanySummary.tsx (server)

### Company Modules
1. components/company/CompanyCard.tsx (server)
2. components/company/CompanyHeader.tsx (server)
3. components/company/CompanyJobs.tsx (server)

### Dashboard Modules
1. components/dashboard/Sidebar.tsx (server)
2. components/dashboard/SidebarClient.tsx (client)
   State: isCollapsed, isOpen
3. components/dashboard/StatsCards.tsx (server)
4. components/dashboard/JobsTable.tsx (server)
5. components/dashboard/ApplicationsTable.tsx (server)
6. components/dashboard/ProfileForm.tsx (client)
   State: form fields, validation, save status

## Step 2: Frontend Todo List (todo.md style)

1. [High] App Shell (layout, header, footer) - Global structure, nav, footer links - Props: children; State: HeaderClient.isMenuOpen - Dependencies: none
2. [High] Design tokens in globals.css - Colors, typography, spacing, radii, shadows - Props/State: none - Dependencies: none
3. [High] UI Primitives (Button, Input, Card, Badge, Avatar) - Reusable core UI - Props: variant, size, asChild - Dependencies: tokens
4. [High] Home Page - Hero, featured jobs, categories, CTA - Props: featured jobs list - Dependencies: App Shell, UI Primitives
5. [High] Jobs Listing Page - Server fetch + client filters - Props: jobs list, filters config - State: filters, sort, page - Dependencies: JobsClient, JobCard
6. [High] JobsClient - Handles filtering/sorting/pagination - Props: initial data - State: filters, sort, page, viewMode - Dependencies: JobFilterSidebar, JobListToolbar
7. [High] Job Card - Job summary display - Props: title, company, location, tags, salary, postedAt - Dependencies: UI Card/Badge
8. [High] Job Filter Sidebar - Search, tags, location, salary range - Props: filter schema - State: selected filters - Dependencies: Select, TagInput
9. [High] Job Detail Page - Full job view - Props: job details - Dependencies: JobApplyPanel
10. [High] Job Apply Panel - Application form - Props: jobId, CTA label - State: resume, coverLetter, isSubmitting - Dependencies: Input, Button
11. [Medium] Company Directory - List companies - Props: companies list - Dependencies: CompanyCard
12. [Medium] Company Profile - Company detail + jobs - Props: company, jobs - Dependencies: CompanyHeader, CompanyJobs
13. [Medium] Dashboard Shell - Sidebar + content layout - Props: children - State: SidebarClient isOpen - Dependencies: App Shell
14. [Medium] Dashboard Overview - Stats cards, recent activity - Props: stats - Dependencies: StatsCards
15. [Medium] Dashboard Jobs - Manage postings table - Props: jobs list - Dependencies: JobsTable
16. [Medium] Dashboard Applications - Track applicants - Props: applications - Dependencies: ApplicationsTable
17. [Medium] Profile Form - Edit user profile - Props: user data - State: form fields, isSaving - Dependencies: Input, Select
18. [Medium] Auth Pages - Sign in/up forms - Props: none - State: form fields, loading - Dependencies: UI Primitives
19. [Low] Pricing Page - Plan tiers - Props: plans - Dependencies: Card, Button
20. [Low] Blog Index + Post - Content layout - Props: post list/content - Dependencies: Card
21. [Low] Contact Page - Contact form - Props: none - State: form fields - Dependencies: Input, Button
22. [Low] Legal Pages - Static content - Props: none - Dependencies: App Shell
23. [Low] Not Found Page - 404 content - Props: none - Dependencies: Button

## Step 3: Notes and Guidelines

1. Use server components by default. Only mark "use client" for components with state, effects, event handlers, or browser APIs.
2. Prefer data fetching in server pages; pass serializable data into client components.
3. Keep filter state local in JobsClient and use URL query params for shareable filters.
4. Avoid hydration mismatches by not rendering random IDs or dates on the server.
5. Use useEffect to access window or localStorage.
6. Keep design tokens in globals.css with CSS variables as a single source of truth.
7. Standardize spacing and typography via Tailwind theme extensions instead of ad hoc classes.
8. Use union types for variants and strict props typing.
9. Build composable sections (Hero, Section, Grid) to reduce duplication.
10. Accessibility: focus styles, keyboard navigation, semantic headings and landmarks.
11. Performance: prefer next/image for logos/avatars; keep lists server-rendered when possible.
12. Testing readiness: deterministic rendering and stable selectors; isolate interactive logic in client components.
