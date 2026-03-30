# ADTL Africa Platform

Institutional web platform for ADTL Africa, built with Next.js App Router, Neon PostgreSQL, and Clerk-based role access.

## Product Scope

- Public institutional pages: Home, About, Services, Resources, Our People, Blog, Partnership, Career, Contact
- Secure submission handling: Contact, Partnership, and Career application forms
- CMS-like API layer for Blog, Resources, Team members, and Job listings
- Admin dashboard route with role-gated access
- SEO support: route metadata, sitemap, robots

## Stack

- Next.js 16 (App Router)
- TypeScript
- Neon PostgreSQL (`@neondatabase/serverless`)
- Clerk authentication and role checks (`@clerk/nextjs`)
- Zod validation

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Configure values in `.env.local`.

4. Apply database schema from `src/db/schema.sql` to your Neon database.

5. Run development server:

```bash
npm run dev
```

## Environment Variables

Required for production behavior:

- `DATABASE_URL` - Neon connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `ADMIN_NOTIFICATION_EMAIL` - destination for submission notifications

## Clerk Roles

Role is expected in `publicMetadata.role`:

- `admin`
- `editor`
- `public` (default)

Write endpoints are protected for `admin` and `editor`.

## Database Schema

SQL schema is defined in [src/db/schema.sql](src/db/schema.sql).

Tables:

- `users`
- `blog_posts`
- `resources`
- `team_members`
- `job_listings`
- `applications`
- `contact_messages`
- `partnership_requests`

All tables include timestamps and constraints. Indexes are included for common query paths.

## Security Controls Implemented

- Server-side validation using Zod
- Input sanitization for text fields
- Honeypot field checks on form submissions
- Per-IP rate limiting (in-memory baseline)
- Prepared SQL statements via Neon template tagging
- CV upload checks (PDF-only, 5MB max)

## Production Hardening Notes

- Replace in-memory rate limiting with Redis/Upstash for distributed environments.
- Integrate a transactional email provider for real notification delivery.
- Add malware scanning step for CV uploads before durable file storage.
- Configure Clerk sign-in/sign-up flows and production domains.

## Deployment

Recommended hosting: Vercel.

Deployment steps:

1. Connect repository to Vercel
2. Configure environment variables
3. Run Neon schema migration
4. Deploy
