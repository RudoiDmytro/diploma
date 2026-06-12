# Skills&Work

A Next.js platform for job postings and skill assessments (the "diploma" project).
Employers post jobs and create assessments; seekers browse, apply, and take timed
tests. Internationalised (English / Ukrainian) with Google & GitHub sign-in.

## Stack

| Area        | Tech                                                    |
| ----------- | ------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, standalone output) · React 19   |
| Language    | TypeScript 6                                            |
| Database    | PostgreSQL via Prisma 7 (pg driver adapter)             |
| Auth        | NextAuth v4 (Google, GitHub, credentials + bcrypt)      |
| i18n        | next-intl 4 (`en`, `uk`)                                |
| UI          | Tailwind CSS 4 · Radix UI / shadcn · Headless UI 2      |
| Editor      | `@uiw/react-md-editor` (markdown)                       |
| Charts      | Chart.js / react-chartjs-2                              |

## Prerequisites

- Node.js 20.19+ (22 LTS recommended) and npm, **or** Docker + Docker Compose
- A PostgreSQL database (the Compose setup provides one)

## Environment

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

| Variable                  | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `DATABASE_URL`            | PostgreSQL connection string                         |
| `NEXTAUTH_SECRET`         | NextAuth signing secret (`openssl rand -base64 32`)  |
| `NEXT_PUBLIC_NEXTAUTH_URL`| Public base URL (e.g. `http://localhost:3000`)       |
| `GOOGLE_CLIENT_ID/SECRET` | Google OAuth credentials                             |
| `GITHUB_CLIENT_ID/SECRET` | GitHub OAuth credentials                             |
| `apiKey`                  | Bytescale upload key (see `src/app/api/file`)        |

## Run with Docker (recommended)

Brings up PostgreSQL, applies migrations, and starts the app on
[http://localhost:3000](http://localhost:3000):

```bash
make compose-up      # docker compose up --build -d
make compose-logs    # follow logs
make compose-down    # stop (keep data)   /  make compose-down-v to wipe data
```

## Run locally

```bash
make install         # npm ci
make migrate-deploy  # apply migrations to the DB in DATABASE_URL
make dev             # start the dev server on :3000
```

Production build:

```bash
make build && make start
```

## Common Make targets

Run `make` (or `make help`) to list everything. Highlights:

| Target                     | Description                              |
| -------------------------- | ---------------------------------------- |
| `dev` / `build` / `start`  | Next.js dev / production build / serve   |
| `lint` / `typecheck`       | ESLint / `tsc --noEmit`                  |
| `prisma-generate`          | Regenerate the Prisma client             |
| `migrate` / `migrate-deploy` | Create / apply migrations              |
| `db-studio` / `db-reset`   | Prisma Studio / reset the database       |
| `docker-build`             | Build the production image               |
| `compose-up` / `compose-down` | Full stack up / down                  |

## Project layout

```
src/
  app/[locale]/        Localised App Router routes (import UI from features)
  app/api/             Route handlers
  features/            Feature modules: <feature>/{api,components,hooks,types,utils}
                       (jobs, assessments, auth, dashboard, employers)
  components/          Shared UI (ui/ = shadcn primitives, nav/, footer/, ...)
  hooks/               Shared hooks
  lib/                 db client, auth (NextAuth), validation (zod), helpers
  i18n/                next-intl routing / request / navigation config
prisma/                schema + migrations
messages/              en.json / uk.json translations
```

Feature boundaries are enforced by `make lint-deps` (dependency-cruiser): features can't
import each other, and shared code can't import features.
