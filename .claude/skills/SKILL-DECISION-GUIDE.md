# Skill Decision Guide

Choose the right `.claude/skills` workflow based on what you are trying to do.

> **Adaptation note.** Ported from the VilnaCRM template and trimmed for this Next.js
> project. Map any CRM `make` targets / tooling referenced inside individual skills to this
> project's commands (`make typecheck`, `make build`, `make lint`, `make prisma-*`,
> `make compose-*`). No automated test suite exists yet. See `AI-AGENT-GUIDE.md`.

**Non-negotiable rule:** fix root causes. Do not silence ESLint or TypeScript with
`eslint-disable` / `// @ts-ignore`. For any UI change, run the `accessibility-lead` agent first.

## Mandatory Skill Check (every task)

1. Open `AI-AGENT-GUIDE.md`.
2. Open this file.
3. Identify every applicable skill and read each `{skill}/SKILL.md` before executing.
4. Skip a skill only after recording "Not applicable" with a concrete reason.

## New feature / significant change gate

For a new feature, route, component family, or schema change, consult these skills after
implementing, and verify with `make typecheck && make build`:

`architecture` · `code-organization` · `frontend-component-development` ·
`frontend-quality-workflow` · `frontend-performance-accessibility` ·
`complexity-management` · `code-review` · `documentation-sync` · `quality-standards`
(plus `frontend-testing-workflow` / `testing-workflow` if you have added a test suite).

## Quick decision tree

```text
What are you trying to do?
│
├─ Fix something broken
│   ├─ ESLint / TypeScript                 → frontend-quality-workflow
│   ├─ Too complex (function/file)         → complexity-management
│   ├─ Failing test                        → frontend-testing-workflow
│   └─ Readiness before commit/PR          → ci-workflow
│
├─ Create something new
│   ├─ React component / page / form       → frontend-component-development
│   ├─ File placement / naming             → code-organization
│   ├─ Feature / data boundary             → architecture
│   └─ New docs                            → documentation-creation
│
├─ Refactor
│   ├─ Move / rename / split               → code-organization
│   ├─ Reduce complexity                   → complexity-management
│   └─ Improve testability                 → frontend-testing-workflow
│
├─ Review / validate
│   ├─ Before commit / PR                  → ci-workflow
│   ├─ PR review comments                  → code-review
│   ├─ Performance / a11y                  → frontend-performance-accessibility
│   └─ Protected thresholds                → quality-standards
│
└─ Update documentation
    ├─ New docs                            → documentation-creation
    └─ Sync after a change                 → documentation-sync
```

## Scenario guide

- **"ESLint or TypeScript fails"** → `frontend-quality-workflow`. Run `make lint` /
  `make typecheck`; fix the root cause (no disable comments).
- **"A function or file is too dense"** → `complexity-management`. Extract named helpers,
  use lookup maps, group params into option objects, split files.
- **"I'm building/changing a component, hook, or form"** → `frontend-component-development`
  (+ `accessibility-lead`). This project: Tailwind + shadcn/Radix, `cn()` from `@/lib/utils`,
  `"use client"` only where needed, zod for validation, `en` + `uk` translations.
- **"Where should this file live?"** → `code-organization` (+ `architecture` for feature
  boundaries). Feature-based App Router: thin routes under `src/app/[locale]/`, feature code in
  `src/features/<feature>/{api,components,hooks,types,utils}`, shared primitives in
  `src/components/ui/`, data access in `src/lib/`, i18n in `src/i18n/`. Features don't import
  each other; shared code doesn't import features (enforced by `make lint-deps`).
- **"Performance or accessibility regression"** → `frontend-performance-accessibility`
  (Core Web Vitals; pair with the global a11y skills + `accessibility-lead`).
- **"Address PR review comments"** → `code-review`. Retrieve comments (e.g. `gh pr view
  --comments` or the GitHub MCP), categorize, fix, re-verify with `make typecheck`/`make build`.
- **"Validate before commit/PR"** → `ci-workflow`. Sequence: `make typecheck`, `make lint`,
  `make build`; for UI, the `accessibility-lead` review.
- **"What's protected?"** → `quality-standards`. For this project the hard gates are a clean
  `make typecheck` and a passing `make build`.
- **"Update docs after a change"** → `documentation-sync`. **"Create docs"** →
  `documentation-creation`.

## Common confusions

| Confusion | Clarification |
| --------- | ------------- |
| frontend-quality-workflow vs complexity-management | Lint/TS errors → quality-workflow; code too complex → complexity-management |
| testing-workflow vs frontend-testing-workflow | Broad suite routing → testing-workflow; specific test work → frontend-testing-workflow |
| ci-workflow vs code-review | Pre-commit gate → ci-workflow; resolve PR comments → code-review |
| code-organization vs complexity-management | Structure/placement → code-organization; reduce complexity → complexity-management |
| documentation-creation vs documentation-sync | New docs → creation; update existing → sync |
