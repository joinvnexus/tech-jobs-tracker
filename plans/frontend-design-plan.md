# HireHub - Frontend Design Plan

## 📋 Overview
This document outlines the frontend design strategy for HireHub, focusing on brand identity, role-based UX, and responsive interactive design.

---

## 🎨 Brand Design System

### Color Palette

#### Primary Colors (Professional Blue - Trust & Careers)
```css
--brand-50: #eff6ff;    /* Lightest blue - backgrounds */
--brand-100: #dbeafe;
--brand-200: #bfdbfe;
--brand-300: #93c5fd;
--brand-400: #60a5fa;
--brand-500: #3b82f6;  /* Primary brand color */
--brand-600: #2563eb;
--brand-700: #1d4ed8;
--brand-800: #1e40af;
--brand-900: #1e3a8a;  /* Darkest - text emphasis */
```

#### Role-Specific Accent Colors

**Job Seeker (Teal/Green - Growth)**
```css
--seeker-50: #f0fdfa;
--seeker-100: #ccfbf1;
--seeker-500: #14b8a6;  /* Teal primary */
--seeker-600: #0d9488;
--seeker-700: #0f766e;
```

**Employer (Purple - Business)**
```css
--employer-50: #faf5ff;
--employer-100: #f3e8ff;
--employer-500: #a855f7;  /* Purple primary */
--employer-600: #9333ea;
--employer-700: #7e22ce;
```

**Admin (Orange - Authority)**
```css
--admin-50: #fff7ed;
--admin-100: #ffedd5;
--admin-500: #f97316;  /* Orange primary */
--admin-600: #ea580c;
--admin-700: #c2410c;
```

#### Semantic Colors
```css
--success: #22c55e;
--warning: #eab308;
--error: #ef4444;
--info: #0ea5e9;
```

### Typography

#### Font Family
- **Headings**: "Plus Jakarta Sans" - Modern, professional geometric sans
- **Body**: "Inter" - Clean, readable system font
- **Monospace**: "JetBrains Mono" - For code/salaries

#### Font Sizes (with line heights)
```css
--text-xs: 0.75rem/1rem;
--text-sm: 0.875rem/1.25rem;
--text-base: 1rem/1.5rem;
--text-lg: 1.125rem/1.75rem;
--text-xl: 1.25rem/1.75rem;
--text-2xl: 1.5rem/2rem;
--text-3xl: 1.875rem/2.25rem;
--text-4xl: 2.25rem/2.5rem;
--text-5xl: 3rem/1;
```

### Spacing System
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Border Radius
```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-glow: 0 0 40px rgba(59, 130, 246, 0.15);
```

---

## 🎯 Role-Based Dashboard Design

### 1. Job Seeker Dashboard (`/dashboard`)

**Layout Structure:**
```
┌─────────────────────────────────────────────────┐
│ Header: Welcome message + Quick actions         │
├─────────────────────────────────────────────────┤
│ Stats Row: Applications | Saved | Profile Views │
├───────────────────────┬─────────────────────────┤
│                       │                         │
│ Recent Applications  │ Recommended Jobs       │
│ (Status tracking)    │ (AI suggestions)       │
│                       │                         │
├───────────────────────┼─────────────────────────┤
│ Job Search Widget    │ Career Tips            │
│ (Quick search)      │ (Blog highlights)      │
└───────────────────────┴─────────────────────────┘
```

**Key Features:**
- Application status cards with visual progress indicator
- "Easy Apply" quick action buttons
- Profile completion percentage ring
- Job match score badges
- Skill gap analysis visual

**Color Treatment:**
- Background: Soft brand-50 gradient
- Cards: White with seeker-500 left border accent
- Stats: seeker-500 icons with counts

### 2. Employer Dashboard (`/employer`)

**Layout Structure:**
```
┌─────────────────────────────────────────────────┐
│ Company Banner: Logo + Name + Verification badge │
├─────────────────────────────────────────────────┤
│ Stats: Active Jobs | Applicants | Hires | Views │
├───────────────────────┬─────────────────────────┤
│                       │                         │
│ Manage Jobs          │ Recent Applicants      │
│ (List + Actions)     │ (Quick review)         │
│                       │                         │
├───────────────────────┴─────────────────────────┤
│ Quick Actions: Post Job | View Analytics        │
└─────────────────────────────────────────────────┘
```

**Key Features:**
- Company profile completeness indicator
- Applicant pipeline kanban view
- Job performance metrics cards
- Candidate rating system
- Bulk action tools

**Color Treatment:**
- Background: Soft employer-50 gradient  
- Cards: White with employer-500 left border
- Stats: employer-500 icons
- CTA buttons: employer-600 primary

### 3. Admin Dashboard (`/admin`)

**Layout Structure:**
```
┌─────────────────────────────────────────────────┐
│ Admin Header: Logo + System status + User menu │
├─────────────────────────────────────────────────┤
│ Overview Stats: Users | Jobs | Applications    │
├─────────────────────────────────────────────────┤
│                                                 │
│  User Management  │  Job Moderation            │
│  (Table + Actions)│  (Pending approvals)       │
│                                                 │
├─────────────────────────────────────────────────┤
│ Recent Activity  │  System Health             │
│ (Audit log)      │  (Performance metrics)     │
└─────────────────────────────────────────────────┘
```

**Key Features:**
- User/role management table with filters
- Job approval queue with preview
- Analytics charts (line, bar, pie)
- System health indicators
- Quick action buttons with confirmations

**Color Treatment:**
- Background: Neutral gray-50
- Cards: White with admin-500 accents
- Warning states: admin-500 (orange)
- Critical: red-500

---

## 📱 Responsive Design Strategy

### Breakpoints
```css
/* Mobile First */
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Mobile Adaptations

**Navigation:**
- Desktop: Horizontal navbar with dropdowns
- Mobile: Hamburger menu with slide-out drawer
- Bottom navigation bar for dashboard pages

**Cards:**
- Desktop: 3-4 column grid
- Tablet: 2 column grid
- Mobile: Single column stack

**Forms:**
- Desktop: Multi-column layout
- Mobile: Single column with floating labels

**Tables:**
- Desktop: Full table view
- Mobile: Card view or horizontal scroll

---

## ✨ Interactive Elements

### Animations

**Page Transitions:**
- Fade in with slight upward slide (200ms)
- Staggered reveal for list items (50ms delay each)

**Micro-interactions:**
- Button hover: Scale 1.02 + shadow increase
- Card hover: Lift effect with shadow-xl
- Input focus: Border color transition + glow
- Toggle switches: Smooth slide with bounce

**Loading States:**
- Skeleton screens with shimmer effect
- Spinner with brand color
- Progress bar for uploads

**Feedback:**
- Toast notifications slide in from top-right
- Success: Green checkmark animation
- Error: Shake animation
- Form validation: Inline with icons

### Interactive Components

**Job Cards:**
- Hover: Elevate + show action buttons
- Click: Smooth expand to details
- Save: Heart animation fill
- Apply: Checkmark confirmation

**Application Tracker:**
- Status steps: Connected line with active highlight
- Progress: Animated fill bar
- Expand: Accordion style reveal

**Charts:**
- Hover: Tooltip with details
- Click: Drill-down capability
- Animate: Draw-in effect on load

---

## 🎯 Implementation Priority

### Phase 1: Foundation
1. Update Tailwind config with brand colors
2. Create CSS variables in globals.css
3. Add font imports (Plus Jakarta Sans, Inter)
4. Update Button, Card, Input components

### Phase 2: Global Components
1. Redesign Navbar with role indicators
2. Redesign Footer
3. Add responsive navigation
4. Create layout wrappers per role

### Phase 3: Dashboards
1. Enhance Job Seeker dashboard
2. Enhance Employer dashboard  
3. Enhance Admin dashboard
4. Add analytics charts

### Phase 4: Polish
1. Add animation utilities
2. Implement skeleton loaders
3. Enhance form interactions
4. Add hover/focus states
5. Test responsive behavior

---

## 📁 File Structure

```
src/
├── app/
│   ├── (public)/           # Public pages
│   ├── (dashboard)/        # Dashboard layouts
│   │   ├── seeker/        # Job seeker dashboard
│   │   ├── employer/      # Employer dashboard
│   │   └── admin/         # Admin dashboard
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/
│   │   ├── navbar.tsx     # Global navbar
│   │   ├── footer.tsx     # Global footer
│   │   └── sidebar.tsx    # Dashboard sidebar
│   ├── ui/                # Reusable UI
│   ├── dashboard/         # Dashboard specific
│   └── home/              # Homepage components
├── lib/
│   ├── constants.ts       # Design tokens
│   └── utils.ts           # Utility functions
└── styles/
    └── animations.css      # Custom animations
```

---

## ✅ Acceptance Criteria

1. ✅ Brand colors applied consistently across all pages
2. ✅ Role-specific color accents visible on respective dashboards
3. ✅ All pages responsive from 320px to 1920px
4. ✅ Smooth animations on page transitions
5. ✅ Interactive hover/focus states on all clickable elements
6. ✅ Loading states for all async operations
7. ✅ Consistent spacing using design tokens
8. ✅ Typography hierarchy clearly defined
