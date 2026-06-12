# AI Agent Guide to the Skills System

**For Claude Code, OpenAI/Codex, GitHub Copilot, Cursor, and other AI coding assistants
working in the Skills&Work (Next.js) frontend.**

> **Adaptation note.** This skills system was ported from the VilnaCRM React template and
> trimmed for this project. The **workflow principles** transfer, but individual
> `*/SKILL.md` files may still reference the CRM's `make` targets and tooling
> (rust-code-analysis, jscpd, K6, Mockoon, MUI, `src/modules/`). Map those to **this**
> project's commands: `make typecheck`, `make build`, `make lint`, the `make prisma-*` /
> `make compose-*` targets, and the `accessibility-lead` agent. This project has **no
> automated test suite** yet, so the testing skills are guidance for when you add one.

## How this works

- **Claude Code** discovers and invokes skills automatically via the `Skill` tool.
- **Other agents** read the markdown manually — start with `SKILL-DECISION-GUIDE.md`, then
  open the relevant `{skill}/SKILL.md` and follow its steps.

## Step 0: Mandatory Skill Check (every task)

Before any code, doc, or workflow change:

1. Read `.claude/skills/AI-AGENT-GUIDE.md` (this file).
2. Read `.claude/skills/SKILL-DECISION-GUIDE.md`.
3. Identify every `.claude/skills/*` skill that applies, and read each `SKILL.md` before executing.
4. If a skill is plausibly relevant, **read it before deciding it does not apply**; record
   "Not applicable" with a concrete reason if you skip it.

**Accessibility is non-negotiable:** any change touching user-facing UI requires the
`accessibility-lead` agent review **first** (enforced by the repo's UI-edit hook).

## Decision tree

```text
What are you trying to do?
│
├─ Fix something broken
│   ├─ ESLint / TypeScript error           → frontend-quality-workflow
│   ├─ A function/file is too complex       → complexity-management
│   ├─ A failing test (if a suite exists)   → frontend-testing-workflow / testing-workflow
│   └─ Readiness before commit/PR           → ci-workflow
│
├─ Create something new
│   ├─ React component / page / form        → frontend-component-development
│   ├─ File placement / naming / splitting   → code-organization
│   ├─ New feature / data boundary           → architecture
│   └─ New project documentation             → documentation-creation
│
├─ Refactor existing code
│   ├─ Move / rename / split files          → code-organization
│   ├─ Reduce complexity                     → complexity-management
│   └─ Improve testability                   → frontend-testing-workflow
│
├─ Review / validate
│   ├─ Before commit / PR                    → ci-workflow
│   ├─ Address PR review comments            → code-review
│   ├─ Performance / accessibility           → frontend-performance-accessibility
│   └─ Which thresholds are protected        → quality-standards
│
└─ Update documentation
    ├─ New docs from scratch                 → documentation-creation
    └─ Sync docs after a change              → documentation-sync
```

## Available skills

| Skill | When to use |
| ----- | ----------- |
| `ci-workflow` | Validate changes before commit / push / PR. |
| `code-review` | Retrieve and address PR review comments. |
| `testing-workflow` | Choose / triage test suites (if/when tests exist). |
| `frontend-component-development` | Build or change React components, hooks, forms, feature UI. |
| `frontend-testing-workflow` | Write or fix component / E2E / visual tests. |
| `frontend-quality-workflow` | Fix ESLint / TypeScript / markdown issues. |
| `frontend-performance-accessibility` | Improve Core Web Vitals and accessibility. |
| `architecture` | Place a feature, wire data access, respect boundaries. |
| `quality-standards` | Overview of protected quality thresholds. |
| `complexity-management` | A file / component / hook is too complex. |
| `code-organization` | Place, move, name, or split files. |
| `documentation-creation` | Create new repository docs or agent guides. |
| `documentation-sync` | Keep docs aligned after a code / command change. |

## This project's command surface

Run everything through the **Makefile** (`make help` lists all targets):

```bash
make typecheck        # tsc --noEmit  — authoritative type gate
make build            # next build    — compile + types + page generation
make lint             # next lint (ESLint)
make dev              # next dev
make prisma-generate · make migrate · make migrate-deploy · make db-studio
make compose-up · make compose-down · make compose-logs
```

There is **no** `make format`, `make pr-comments`, `make lint-metrics/-dup/-md/-deps`,
`make test-*`, or `make lighthouse-*` in this project — ignore those when a ported skill
mentions them, and use the targets above.

## Root-cause policy

Never silence findings with `eslint-disable`, `// @ts-ignore`, `// @ts-expect-error`
(without justification), or `prettier-ignore`. Fix the underlying issue, or refactor so the
rule's intent holds.

## Validate every change

```bash
make typecheck && make build      # both must pass
```

For UI changes, also re-run the `accessibility-lead` review and verify in the browser
(`make dev` or `make compose-up`).

## Related docs

- `CLAUDE.md` — project overview, stack, architecture, commands.
- `agents.md` — comprehensive agent guide (patterns, global skills catalog, conventions).
