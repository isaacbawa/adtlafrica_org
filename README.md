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
3. Run Neon schema migration
4. Deploy
