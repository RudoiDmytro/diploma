# agents.md

AI Agent Guide for **Skills&Work** (Next.js job & assessment platform).

This document provides workflows, patterns, and troubleshooting tips for AI assistants
working with this codebase. For the project overview and tech stack, see `CLAUDE.md`.

## Agent Skill Locations

- `.claude/skills`: project skills for implementation, quality, testing, review,
  documentation, and performance guidance.
- `~/.claude/skills` (global, personal): UI/design/motion/a11y skills (from
  [ui-skills.com](https://www.ui-skills.com/skills/)) plus testing, performance, React/TS,
  and browser/audit skills, invoked **by name** via the Skill tool. See "Global Skills" below.

### Mandatory Skill Check (Every Task)

**Before any code, doc, or workflow change**, every AI agent (Claude Code, Codex, GitHub
Copilot, Cursor, OpenAI agents, and any other assistant) MUST:

1. Read [`.claude/skills/AI-AGENT-GUIDE.md`](.claude/skills/AI-AGENT-GUIDE.md).
2. Read [`.claude/skills/SKILL-DECISION-GUIDE.md`](.claude/skills/SKILL-DECISION-GUIDE.md).
3. Identify every `.claude/skills/*` skill **and** every relevant global skill (see "Global
   Skills" below) for the current task, and invoke each match before executing.
4. Apply all relevant skills. Only skip one after recording "Not applicable" with a concrete reason.

This check is non-negotiable. Do not implement, lint, test, commit, or push until the
relevant skills have been consulted.

### Global Skills (`~/.claude/skills`, personal)

These personal skills are available in every project (not committed here). When a task hits
a skill's triggers, invoke it **by name** with the Skill tool — alongside the project skills
above and, for any UI change, the mandatory `accessibility-lead` agent.

**Stack note:** this project uses **Tailwind CSS 4 + shadcn/Radix**, so the UI skills (many
of which assume Tailwind/shadcn) apply **directly** — no `sx`/`styled()` translation needed.

- **Build & style UI** (creating or beautifying components, pages, dashboards):
  - `frontend-design` — distinctive, production-grade UI that avoids generic AI aesthetics.
  - `interface-design` — dashboards, admin panels, app UI.
  - `bencium-innovative-ux-designer` — distinctive, polished interfaces from a brief.
  - `emil-design-eng` — UI polish, component design, and the invisible details.
  - `make-interfaces-feel-better` — micro-interactions, hover/shadow/border, optical detail.
  - `design-taste-frontend` — anti-slop direction; infers the right design language.
  - `ui-ux-pro-max` — broad UI/UX reference: styles, palettes, font pairings, UX rules.
  - `design-lab` — explore several design variants before committing to one.
- **Redesign & review existing UI:**
  - `redesign-existing-projects` — upgrade existing UI to premium quality, audit-first.
  - `web-design-guidelines` — review UI code against Web Interface Guidelines.
  - `rams` — real-time accessibility and visual design review.
- **Design systems & color:**
  - `swiss-design` — Swiss/modernist grid and typography (Tailwind-oriented).
  - `minimalist-ui` — clean editorial layout, monochrome, restrained visuals.
  - `oklch-skill` — OKLCH color systems: conversion, palettes, contrast, dark mode.
  - `baseline-ui` — validate animation durations, type scale, and layout anti-patterns
    (Tailwind-specific; applies directly here).
- **Motion, animation & interaction:**
  - `interaction-design` — microinteractions, transitions, loading and feedback states.
  - `transitions-dev` — drop-in CSS transitions for modals, dropdowns, badges, page changes.
  - `12-principles-of-animation` — audit motion against Disney's 12 principles.
  - `to-spring-or-not-to-spring` — choose spring vs easing for a given motion.
  - `morphing-icons` — SVG line-based icon-to-icon morph transitions.
  - `pseudo-elements` — CSS pseudo-elements and the View Transitions API.
  - `fixing-motion-performance` — fix jank: layout thrashing, compositor props, blur.
- **Accessibility (design, audit & testing):**
  - `fixing-accessibility` — fix ARIA, keyboard nav, focus, contrast, and form errors.
  - `wcag-audit-patterns` — WCAG 2.2 audit and remediation patterns.
  - `accessibility-testing` — WCAG 2.2 via axe-core + manual strategies.
  - `a11y-playwright-testing` — axe-core + Playwright a11y checks (keyboard, ARIA, contrast).
  - `a11y-debugging` — a11y auditing via Chrome DevTools MCP (semantics, focus, contrast).
- **Metadata, SEO & React health:**
  - `fixing-metadata` — titles, meta descriptions, canonical, Open Graph, JSON-LD, robots
    (pairs well with Next.js `metadata` exports).
  - `react-doctor` — scan React for lint, a11y, bundle, and architecture regressions.
  - `vercel-react-best-practices` — React/Next.js render & bundle performance patterns.
- **Testing & QA** (no suite exists yet — use these if you add one):
  - Playwright: `playwright-best-practices`, `playwright-automation`, `playwright-e2e-testing`,
    `playwright-regression-testing`, `playwright-skill`, `playwright-generate-test`.
  - `visual-testing` — screenshot / visual regression.
  - `test-reliability` — diagnose and heal one flaky test at runtime.
  - `unit-testing`, `javascript-typescript-jest` — units, mocking, coverage, doubles.
  - `semantic-test-selectors` — role/label/text queries; avoid `data-testid`.
  - `api-testing` — REST endpoint, schema, and contract testing.
  - `qa-test-planner` — test plans, manual cases, regression suites, bug reports.
- **Performance:**
  - `performance-optimization`, `performance-testing` — profiling, k6, Web Vitals budgets.
  - `debug-optimize-lcp` — diagnose and improve LCP via Chrome DevTools.
  - `memory-leak-debugging` — heapsnapshots / memlab for leaks and OOM.
- **TypeScript & code quality:**
  - `frontend-ui-engineering` — production-quality components, layout, and state.
  - `typescript-clean-code` — Clean Code for TS; load its `rules.md`/`examples.md` refs.
  - `eliminating-duplication` — DRY vs over-abstraction.
- **Browser, audit & CI:**
  - `chrome-devtools`, `browser-testing-with-devtools`, `webapp-testing` — drive a real
    browser to inspect DOM, console, network, and performance.
  - `web-quality-audit` — Lighthouse-style performance/a11y/SEO/best-practices audit.
  - `web-design-reviewer` — visual inspection to find and fix design/layout issues.
  - `hardening-github-actions-permissions` — least-privilege `GITHUB_TOKEN` in workflows.

Accessibility is non-negotiable here: pair the a11y skills above with the mandatory
`accessibility-lead` agent review for any UI change.

## Quick Start for Agents

1. Install dependencies: `make install` (`npm ci`).
2. Set up env: `cp .env.example .env` and fill it in (DB, NextAuth, OAuth).
3. Start a database — either run Postgres locally, or use `make compose-up` (full stack).
4. Apply migrations: `make migrate-deploy`.
5. Develop: `make dev` (http://localhost:3000); verify with `make typecheck` and `make build`.

## Common Agent Tasks

### Adding a page / route

1. Create it under `src/app/[locale]/<segment>/page.tsx` (server component by default).
2. If it reads `params`/`searchParams`, type them as `Promise<...>` and `await` them
   (Next 16). For client pages, unwrap with `use()`.
3. If it queries the DB at the top level, add `export const dynamic = "force-dynamic"`.
4. Add any new translation keys to **both** `messages/en.json` and `messages/uk.json`.
5. Verify: `make typecheck && make build`.

### Adding a UI component

1. **Invoke `accessibility-lead` first** (and the relevant UI/a11y skills).
2. Shared shadcn primitives → `src/components/ui/`; feature-specific UI →
   `src/features/<feature>/components/`. A feature must **not** import another feature
   (promote shared code to `src/components`/`src/lib`); shared code must not import a feature.
3. Mark client interactivity with `"use client"`. Style with Tailwind utilities + the shadcn
   `cn()` helper (`@/lib/utils`).
4. Keep labels associated with controls, visible focus rings, and dialog titles present.

### Adding an API route / server action

1. Route handlers: `src/app/api/<name>/route.ts`. `await cookies()`/`headers()` (Next 16).
2. Server actions (`"use server"`): **all exports must be `async`**.
3. Access the DB via `import { db } from "@/lib/db"`; validate input with a zod schema.

### Modifying existing code

```bash
rg "ComponentName" src/        # find usage before changing
make typecheck                 # tsc --noEmit
make build                     # full Next build (compile + types + page gen)
```

## Code Review Workflow (PR feedback)

When addressing pull-request review comments, work systematically:

1. **Retrieve** all unresolved comments (e.g. `gh pr view --comments`, or the GitHub MCP).
2. **Prioritise**: (A) committable suggestions → apply as given; (B) refactor instructions →
   implement; (C) questions → answer + make the code self-documenting; (D) general notes → optional.
3. **Implement** one comment (or related group) per focused commit, referencing the comment URL.
4. **Verify after each change**: `make typecheck`, `make lint`, `make build`. For UI changes,
   re-run the `accessibility-lead` review.
5. **Reply** with the commit SHA for each resolved comment; explain anything you couldn't do.

Address security and correctness concerns first; prefer architectural fixes over stylistic ones.

## Architecture Patterns

### Server component reading data

```tsx
// src/app/[locale]/jobs/[slug]/page.tsx
import { db } from "@/lib/db";

interface PageProps { params: Promise<{ slug: string }> }

export default async function Page({ params }: PageProps) {
  const { slug } = await params;            // Next 16: params is async
  const job = await db.job.findUnique({ where: { slug } });
  // ...
}
```

### Prisma 7 client (driver adapter)

```ts
// src/lib/db.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const db = new PrismaClient({ adapter });   // adapter is REQUIRED in Prisma 7
```

### Form + zod validation

```tsx
"use client";
const form = useForm<MyValues>({ resolver: zodResolver(mySchema) });
// If the schema uses z.coerce.*, cast: zodResolver(schema) as Resolver<MyValues>
```

### Localised navigation (next-intl v4)

```ts
import { Link, useRouter, usePathname } from "@/navigation"; // from src/i18n/navigation
```

### shadcn component

```tsx
import { cn } from "@/lib/utils";
// Compose Tailwind classes with cn(); primitives live in src/app/components/ui/
```

## Testing & quality gates

```bash
make test              # unit tests (Jest + RTL, jsdom)         tests/unit
make test-integration  # integration tests (Jest, node)         tests/integration
make test-e2e          # Playwright E2E (needs the app + a DB)   tests/e2e
make lint              # ESLint (eslint.config.mjs)
make lint-deps         # dependency-cruiser (import boundaries)
make lint-metrics      # rust-code-analysis complexity gate
make typecheck && make build   # always green these before declaring work done
```

- Unit/integration tests live in `tests/unit` (jsdom) and `tests/integration` (node, via
  `TEST_ENV=integration`); E2E specs in `tests/e2e` (Playwright; `make test-e2e-install` once).
- Query by role/label/text — **no `data-testid`** (ESLint-enforced via `no-restricted-syntax`).
- The existing app code predates the lint/metrics gates, so they report violations to clean
  up incrementally. Never silence findings with disable/ignore comments — fix the root cause.

## Git Workflow

### Commit message convention

```text
feat(jobs): add salary filter
fix(auth): await cookies() in token route
chore(deps): bump next to 16.2.9
docs(readme): document docker compose setup
```

### Commit safety

- Do **not** commit or push markdown (`.md`) files unless the user explicitly requests it.
- Never commit `.env`; only `.env.example` is tracked.
- Commit/branch only when asked; if on the default branch, branch first.

## Security Considerations

- **Secrets**: `NEXTAUTH_SECRET` and OAuth client secrets come from env (`.env`, never
  committed). `NEXT_PUBLIC_*` vars are inlined into the client bundle at build time — never
  put a secret behind a `NEXT_PUBLIC_` name.
- **Auth**: NextAuth v4 with JWT sessions; passwords hashed with `bcrypt`. Auth config lives
  in `src/app/components/auth/Options.ts` and the `[...nextauth]` route.
- **Server-only data**: assessment answer keys and DB access stay in server components /
  server actions / route handlers — never ship them to the client.
- **Dependencies**: `npm audit` periodically and on Dependabot alerts.

## Agent Best Practices

**Before changing code** — search for usage, read the surrounding patterns, follow existing
conventions, and check whether a skill applies.

**While changing code** — use the `@/` alias over deep relative imports; keep server/client
boundaries clean (`"use client"` only where needed); validate input with zod; add `en` + `uk`
translations for any new string.

**After changing code** — run `make typecheck` and `make build`; for UI, re-run the
`accessibility-lead` review and verify in the browser (`make dev` or `make compose-up`).

### Self-check

- [ ] `make typecheck` clean · `make build` passes
- [ ] No new `any` without justification
- [ ] Server/client boundaries correct; `dynamic`/`force-dynamic` where DB is read
- [ ] Accessibility reviewed (labels, focus, dialog titles, contrast)
- [ ] Translations provided (`en` + `uk`)
- [ ] No hardcoded secrets; `.env.example` updated if new vars

## Useful Commands Reference

```bash
# Development
make dev / build / start / install / lint / typecheck

# Database (Prisma 7)
make prisma-generate · migrate NAME=x · migrate-deploy · db-studio · db-reset

# Docker
make docker-build · docker-run
make compose-up · compose-down · compose-down-v · compose-logs · compose-migrate

# Housekeeping
make clean            # remove .next, out, node_modules
```

## Additional Resources

- **CLAUDE.md** — project overview, stack, architecture.
- **README.md** — user-facing setup & run instructions.
- **`.claude/skills/`** — project skills (start with `AI-AGENT-GUIDE.md`).
- **Dockerfile / docker-compose.yml / Makefile** — build & run.
- **prisma/** + **prisma.config.ts** — schema, migrations, DB config.
