# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Skills&Work** — a Next.js platform for job postings and skill assessments. Employers
post jobs and create timed assessments; seekers browse, apply, and take tests.
Internationalised (English / Ukrainian) with Google & GitHub sign-in.

## Tech Stack

- **Framework**: Next.js 16 (App Router, `output: 'standalone'`) · React 19
- **Language**: TypeScript 6 (`strict`, `noImplicitAny: false`)
- **Styling**: Tailwind CSS 4 (CSS-first `@config`) + Radix UI / shadcn primitives, Headless UI v2,
  `tailwindcss-animate`, framer-motion
- **Database**: PostgreSQL via **Prisma 7** — the **`@prisma/adapter-pg` driver adapter** (WASM
  query compiler, no native engine), connection config in `prisma.config.ts`
- **Auth**: NextAuth v4 (Google, GitHub, credentials + bcrypt) via `@next-auth/prisma-adapter`
- **i18n**: next-intl 4 (`en`, `uk`) — config in `src/i18n/`, routes under `src/app/[locale]/`
- **Forms / validation**: react-hook-form + zod 4 (`@hookform/resolvers`)
- **Editor**: `@uiw/react-md-editor` (markdown); rendered via `react-markdown`
- **Charts**: Chart.js / react-chartjs-2
- **Package manager**: npm (`package-lock.json`; `.npmrc` sets `legacy-peer-deps=true`)
- **Node**: 20.19+ (Docker image uses Node 22 LTS)

## Development Environment

Tasks are wrapped in a **Makefile** — run `make` (or `make help`) to list everything.

### Local development

```bash
make install          # npm ci
make dev              # next dev (http://localhost:3000)
make build            # next build (production)
make start            # next start (after build)
```

### Full stack with Docker (Postgres + migrations + app)

```bash
make compose-up       # docker compose up --build -d  (db + migrate + app)
make compose-logs     # follow logs
make compose-down     # stop (keep data)   /  make compose-down-v to wipe the volume
make docker-build     # build the production image only
```

The image is multi-stage (`deps → builder → migrator → runner`); the runner serves the
Next.js **standalone** output. `docker-compose.yml` runs a one-shot `migrate` service
(`prisma migrate deploy`) before the app starts.

## Database (Prisma 7)

- Schema: `prisma/schema.prisma` (datasource has **no `url`** — Prisma 7 moved it out).
- Connection for the CLI/migrate: `prisma.config.ts` (reads `DATABASE_URL`).
- Runtime client: `src/lib/db.ts` builds a `PrismaPg` adapter and passes it to
  `new PrismaClient({ adapter })` — **a bare `new PrismaClient()` errors in Prisma 7**.
- Imports stay as `@prisma/client` (legacy `prisma-client-js` generator).

```bash
make prisma-generate  # regenerate the client (also runs on postinstall)
make migrate NAME=x   # create + apply a dev migration
make migrate-deploy   # apply pending migrations (production / CI)
make db-studio        # Prisma Studio
make db-reset         # drop, recreate, re-migrate (DESTRUCTIVE)
```

## Code Quality & Tests

```bash
make lint             # ESLint (flat config: eslint.config.mjs)
make typecheck        # tsc --noEmit
make lint-deps        # dependency-cruiser (import boundaries)
make lint-metrics     # rust-code-analysis complexity gate (config/metrics-policy.json)
make lint-all         # all static checks

make test             # unit tests (Jest + RTL, jsdom)         -> tests/unit
make test-integration # integration tests (Jest, node)         -> tests/integration
make test-e2e         # Playwright E2E (needs the app + a DB)   -> tests/e2e
make test-e2e-install # install Playwright browsers (first run)
```

> **Selectors:** source ships no `data-testid` (ESLint-enforced) — query by role/label/text.
> **Baseline:** the existing app code predates these gates, so `make lint` and
> `make lint-metrics` currently report violations to clean up incrementally;
> `make lint-deps`, `make typecheck`, and `make build` pass. Don't lower thresholds or add
> disable/ignore comments — fix the root cause (`.dependency-cruiser.js`,
> `config/metrics-policy.json`, `eslint.config.mjs` hold the rules).

## Agent Skill Layout

- `.claude/skills`: project skills for implementation, quality, testing, review,
  documentation, and performance guidance.
- `~/.claude/skills` (global, personal): UI / design / motion / a11y skills plus testing,
  performance, React/TS, and browser/audit skills. Catalog & triggers: see "Global Skills"
  in `agents.md`.

### Mandatory Skill Check (Every Task)

**Before any code, doc, or workflow change**, every AI agent (Claude Code, Codex, Copilot,
Cursor, etc.) MUST:

1. Read [`.claude/skills/AI-AGENT-GUIDE.md`](.claude/skills/AI-AGENT-GUIDE.md).
2. Read [`.claude/skills/SKILL-DECISION-GUIDE.md`](.claude/skills/SKILL-DECISION-GUIDE.md).
3. Identify every relevant `.claude/skills/*` skill **and** every relevant global skill,
   then invoke each match before executing.
4. Apply all relevant skills. Only skip one after recording "Not applicable" with a reason.

**Accessibility is non-negotiable.** This is a web project: any change that touches
user-facing UI requires the `accessibility-lead` agent review **first** (the repo's
UI-edit hook enforces this), paired with the a11y skills in `agents.md`.

## Architecture (feature-based App Router)

```text
src/
├── app/
│   ├── [locale]/        # Localised routes (pages, layouts) — import UI from features
│   │   ├── layout.tsx        # awaits params, setRequestLocale, NextIntlClientProvider
│   │   └── jobs/ test-library/ employers/ dashboard/ profile/ ...
│   └── api/             # Route handlers (auth, user, job, skills, file, ...)
├── features/            # Feature modules: <feature>/{api,components,hooks,types,utils}
│   ├── jobs/  assessments/  auth/  dashboard/  employers/
├── components/          # Shared UI — ui/ (shadcn/Radix), nav/, footer/, Markdown, ...
├── hooks/               # Shared hooks
├── lib/                 # db.ts (Prisma) · auth.ts (NextAuth opts) · validation.ts (zod) · utils
├── i18n/                # routing.ts (defineRouting) · request.ts · navigation.ts
prisma/                  # schema.prisma + migrations/   ·   prisma.config.ts (CLI config)
messages/                # en.json · uk.json
```

**Import boundaries** (enforced by `make lint-deps` / `.dependency-cruiser.js`):

- A feature must **not** import another feature — promote shared code to `src/components`/`lib`.
- Shared layers (`components`, `hooks`, `lib`) must **not** import a feature (the `nav` app
  shell is the one documented exception — it composes the auth login/register modals).
- Nothing outside `src/app` may import a Next route file (`page`/`layout`/`route`). Composition
  flows **app → features → shared**, never back.

### Server vs Client components

- Server Components are the default. Mark interactivity with `"use client"`.
- **Next 16**: `params`, `searchParams`, `cookies()`, `headers()` are **async** — `await`
  them in server components / `use()` them in client components.
- `dynamic(() => import(...), { ssr: false })` is **only allowed in Client Components** —
  in a Server Component, import the (client) component directly.
- Pages that query the DB at the top level must be dynamic (`export const dynamic =
  "force-dynamic"`) so `next build` doesn't try to reach the database.

### Internationalisation (next-intl v4)

- Source of truth: `src/i18n/routing.ts` (`defineRouting` with `locales`, `defaultLocale`,
  `localePrefix: "always"`, `pathnames`).
- Navigation API: `createNavigation(routing)` in `src/i18n/navigation.ts` (the v3
  `createLocalizedPathnamesNavigation` is removed). Re-exported from `@/config` and `@/navigation`.
- Request config: `src/i18n/request.ts` (`getRequestConfig` → must return `{ locale, messages }`).
- Add a key to **both** `messages/en.json` and `messages/uk.json`.

### Path Aliases

- `@/*` → `./src/*` (configured in `tsconfig.json`). Prefer the alias over deep
  `../../../` relative chains for cross-folder imports; use `./x` for same-folder.

## Environment Variables

Copy `.env.example` → `.env`. Key variables:

| Variable                   | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `DATABASE_URL`             | PostgreSQL connection string                         |
| `NEXTAUTH_SECRET`          | NextAuth signing secret (`openssl rand -base64 32`)  |
| `NEXT_PUBLIC_NEXTAUTH_URL` | Public base URL — **inlined at build time**          |
| `GOOGLE_CLIENT_ID/SECRET`  | Google OAuth                                         |
| `GITHUB_CLIENT_ID/SECRET`  | GitHub OAuth                                         |
| `apiKey`                   | Bytescale upload key (`src/app/api/file/route.ts`)   |

## Important Patterns

1. **Validation**: zod schemas live in `src/lib/validation.ts`; wire to forms with
   `zodResolver`. With zod 4 + `@hookform/resolvers` 5, schemas that use `z.coerce.*` have
   an `unknown` input type — cast the resolver (`as Resolver<OutputType>`) when `useForm`
   is typed to the output.
2. **Data access**: import `db` from `@/lib/db` in server components / route handlers /
   server actions. Never import it into a client component.
3. **Server Actions**: every export of a `"use server"` file must be an **`async`** function.
4. **Markdown content** is stored as markdown and rendered via `src/app/components/Markdown.tsx`.
5. **Selectors / a11y**: locate elements by user-facing semantics (role, label, text) rather
   than test ids; keep visible labels associated with controls (`htmlFor`/`id`).

## Conventions

- **Commits**: conventional commits (`feat(scope):`, `fix(scope):`, `chore(deps):`, …).
- Do **not** commit or push markdown (`.md`) files unless explicitly asked.
- Never commit `.env`; document new vars in `.env.example`.
- Run `make typecheck` and `make build` before declaring a change done.
