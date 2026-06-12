# AI Agent Skills

Modular, AI-agnostic skills for the **Skills&Work** (Next.js) frontend. They are plain
markdown any agent can read and follow. Claude Code discovers and invokes them
automatically; other agents read them manually.

> **Adaptation note.** Ported from the VilnaCRM React template and trimmed for this project.
> The workflow principles transfer; individual `*/SKILL.md` files may still reference CRM
> `make` targets / tooling (rust-code-analysis, jscpd, K6, Mockoon, MUI, `src/modules/`).
> Map those to this project's commands — `make typecheck`, `make build`, `make lint`,
> `make prisma-*`, `make compose-*` — and the `accessibility-lead` agent. There is **no
> automated test suite** yet, so the testing skills are guidance for when you add one.
> Two CRM-only skills (`load-testing`/K6, `observability-instrumentation`/Sentry) were removed.

## Start here

1. Read [AI-AGENT-GUIDE.md](AI-AGENT-GUIDE.md) (cross-agent usage + this project's commands).
2. Read [SKILL-DECISION-GUIDE.md](SKILL-DECISION-GUIDE.md) to pick the right skill.
3. Open the skill's `SKILL.md` and follow its steps; load `reference/` only when needed.

## Mandatory Skill Check

Before any code/doc/workflow change: open the two guides above, identify every applicable
skill, read each `SKILL.md` first, and skip one only with a recorded "Not applicable" reason.
**For any UI change, run the `accessibility-lead` agent first.**

## Skills

| # | Skill | Purpose | Verify with |
| - | ----- | ------- | ----------- |
| 1 | `ci-workflow` | Validate before commit / push / PR. | `make typecheck`, `make lint`, `make build` |
| 2 | `code-review` | Retrieve & address PR review comments. | re-run the gate after each fix |
| 3 | `testing-workflow` | Choose / triage test suites (when tests exist). | — |
| 4 | `frontend-component-development` | Build/change components, hooks, forms (Tailwind + shadcn). | `make build`, `accessibility-lead` |
| 5 | `frontend-testing-workflow` | Write/fix component, E2E, visual tests (if added). | — |
| 6 | `frontend-quality-workflow` | Fix ESLint / TypeScript / markdown. | `make lint`, `make typecheck` |
| 7 | `frontend-performance-accessibility` | Improve Core Web Vitals + accessibility. | `accessibility-lead` + a11y skills |
| 8 | `architecture` | Place features, wire data access, respect boundaries. | `make build` |
| 9 | `quality-standards` | Overview of protected thresholds. | `make typecheck`, `make build` |
| 10 | `complexity-management` | Reduce file/component/hook complexity. | `make typecheck` |
| 11 | `code-organization` | Place, move, name, split files. | `make build` |
| 12 | `documentation-creation` | Create new docs / agent guides. | — |
| 13 | `documentation-sync` | Keep docs aligned after a change. | — |

## Skill structure

Each skill is a directory with a `SKILL.md` (YAML frontmatter: `name`, `description`, then
the workflow) and optional `reference/`, `examples/`, `update-scenarios/` folders for detail.

## Skills vs CLAUDE.md vs agents.md

- **CLAUDE.md** (repo root) — concise project overview/stack/commands, auto-loaded by Claude Code.
- **agents.md** (repo root) — comprehensive agent guide: patterns, the global-skills catalog, conventions.
- **`.claude/skills/`** — modular, task-specific workflows, routed via the two guides above.

## Root-cause policy

`make lint` and `make typecheck` clean, `make build` passes; no `eslint-disable` /
`@ts-ignore` / suppress comments introduced; docs kept in sync; accessibility reviewed.
