# Diploma — Job Board Platform

A Next.js 14 job board application with multilingual support (English/Ukrainian), OAuth authentication, and employer/seeker roles.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (Google, GitHub, Credentials)
- **i18n:** next-intl (en, uk)
- **UI:** Radix UI, Tailwind CSS, Framer Motion
- **File Storage:** Vercel Blob
- **Validation:** Zod
- **Testing:** Vitest

## Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- PostgreSQL database
- OAuth credentials for Google and/or GitHub (optional)

## Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repo-url>
   cd diploma
   bun install
   ```

2. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Fill in the values in `.env` — at minimum `DATABASE_URL` and `NEXTAUTH_SECRET` are required.

3. **Set up the database:**

   ```bash
   bunx prisma migrate dev
   ```

4. **Start the dev server:**

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `bun dev`          | Start development server     |
| `bun run build`    | Production build             |
| `bun start`        | Start production server      |
| `bun run lint`     | Run ESLint                   |
| `bun test`         | Run tests (Vitest)           |
| `bun run test:watch` | Run tests in watch mode   |

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes (auth, jobs, files, etc.)
│   ├── components/    # React components
│   └── [locale]/      # Locale-based routing (en, uk)
├── lib/               # Shared utilities (db, types)
├── config.ts          # i18n and routing config
├── middleware.ts       # next-intl middleware
└── messages/          # Translation files
prisma/
└── schema.prisma      # Database schema
```

## Environment Variables

See `.env.example` for the full list. Key variables:

- `DATABASE_URL` — PostgreSQL connection string (required)
- `NEXTAUTH_SECRET` — Secret for JWT signing (required)
- `NEXT_PUBLIC_NEXTAUTH_URL` — Base URL of the app
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — GitHub OAuth
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob storage token
