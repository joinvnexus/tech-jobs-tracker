# HireHub Modern UI Redesign - TODO

## Status: ✅ Plan Approved

## Implementation Steps

### 1. Dependencies & Setup [ ]
- [ ] `npm i framer-motion embla-carousel-react`
- [ ] Update package.json scripts if needed
- [ ] `npm install`

### 2. Tailwind & Global Styles [ ]
- [ ] Enhance tailwind.config.ts (add more animations, keyframes)
- [ ] globals.css: Add CSS vars for dark mode, smooth-scroll
- [ ] Add font imports (Inter/Plus Jakarta)

### 3. UI Primitives (src/components/ui/) [✅ sidebar.tsx, stats-card.tsx, carousel.tsx, testimonial-card.tsx]
- [ ] `sidebar.tsx` - Radix collapsible sticky nav
- [ ] `carousel.tsx` - Embla carousel for jobs/testimonials
- [ ] `stepper.tsx` - Multi-step form nav
- [ ] `testimonial-card.tsx` + carousel
- [ ] `stats-card.tsx` - Animated counters
- [ ] Enhance existing: button/card/modal/tabs with cva variants

### 4. Layout Components [ ]
- [ ] `dashboard-shell.tsx` - Sidebar + main content
- [ ] header-client.tsx: Search, notifications, profile, dark toggle

### 5. Landing Page (src/app/page.tsx + home/) [✅ testimonials-section.tsx, newsletter-section.tsx integrated]
- [ ] Hero: Animated gradient, stats counter, CTA buttons
- [ ] FeaturedJobsCarousel
- [ ] Testimonials section + slider
- [ ] Newsletter signup form
- [ ] Update categories/companies sections

### 6. Authentication Pages [ ]
- [ ] signin/register: Background illustrations, Google OAuth
- [ ] Password reset page

### 7. Dashboards [ ]
- [ ] employer/page.tsx: Stats grid, recent jobs table
- [ ] profile/seeker: Completion progress, animated cards
- [ ] Admin dashboard polish

### 8. Job Pages [ ]
- [ ] jobs/[slug]/page.tsx: Related jobs carousel, apply modal animations
- [ ] Update job cards with glassmorphism hovers

### 9. Post Job Flow [ ]
- [ ] employer/jobs/new/: Stepper form (details → requirements → preview)
- [ ] UploadThing drag-drop for company logo/images
- [ ] Live preview panel

### 10. Global Polish [ ]
- [ ] Loading skeletons everywhere
- [ ] Dark mode toggle (full implementation)
- [ ] Responsive testing (mobile/tablet/desktop)
- [ ] Performance: Image optimization, lazy loading
- [ ] `npm run build && npm run lint`

### 11. Testing & Demo [ ]
- [ ] Run `npm run dev`
- [ ] Test all flows: auth → dashboard → post job → apply
- [ ] attempt_completion with demo command

**Current Step: 1. Dependencies**

**Next Actions:** Install deps, then globals.css/tailwind.
