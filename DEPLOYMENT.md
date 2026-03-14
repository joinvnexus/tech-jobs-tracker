# HireHub - Deployment Guide

## Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- Vercel account (for deployment)

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/hirehub?schema=public"
AUTH_SECRET="your-generated-secret"

# Optional - For production
NEXT_PUBLIC_APP_URL="https://your-domain.com"
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
```

### Generating AUTH_SECRET

```bash
openssl rand -base64 32
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Run database migrations:
```bash
npx prisma db push
```

4. Start development server:
```bash
npm run dev
```

## Deployment to Vercel

1. Push your code to GitHub

2. Import project to Vercel:
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. Configure environment variables in Vercel:
   - Add all variables from `.env.example`
   - For `DATABASE_URL`, use a PostgreSQL database (Vercel Postgres or Neon)

4. Deploy:
   - Click "Deploy"

## Database Migration on Production

For production, use Prisma Migrate instead of `db push`:

```bash
npx prisma migrate deploy
```

Or use the Prisma Accelerate connection pool for serverless environments.

## Creating Admin User

After deployment, you can create an admin user through:

1. Register a new user via the UI
2. Manually update the user's role in the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-admin-email@example.com';
```

## Default User Roles

- `SEEKER` - Job seeker (default for new registrations)
- `EMPLOYER` - Employer/company recruiter
- `ADMIN` - Site administrator

## Features Checklist

- [x] User authentication (credentials)
- [x] Job listing with search and filters
- [x] Job application system
- [x] User profile management
- [x] Resume upload
- [x] Employer dashboard
- [x] Admin panel
- [x] Job approval workflow
- [x] Save jobs functionality
- [x] SEO optimization (sitemap, robots.txt, metadata)

## Troubleshooting

### Build Errors

If you encounter build errors, ensure:
- All TypeScript types are correct
- All imports resolve correctly

### Database Connection Issues

- Verify DATABASE_URL format
- Check if database allows connections from your IP
- For Vercel, ensure using connection pooling

### Session Issues

- Verify AUTH_SECRET is set
- Clear browser cookies and try again
