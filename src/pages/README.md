# Pages Layer (FSD)

This project now uses `src/pages` as the target place for route-level composition.

Current status:
- Route files remain in `src/app/[locale]/**` (Next.js requirement).
- UI/business blocks have been migrated to `widgets`, `features`, and `shared`.
- `src/app` files should be progressively reduced to thin wrappers that compose from `src/pages`.

Next migration step:
1. Move each `src/app/[locale]/**/page.tsx` implementation into a corresponding `src/pages/*/ui` module.
2. Keep app route files as wrappers exporting from `src/pages`.
