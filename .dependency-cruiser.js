/** @type {import('dependency-cruiser').IConfiguration} */
// Mirrors the VilnaCRM dependency-cruiser config: the generic hygiene rules are
// kept verbatim, and the bulletproof-react boundary rules are re-pointed from the
// CRM's `src/modules/<m>/features/<f>/...` SPA layout to this Next.js App Router
// project's `src/features/<feature>/...` layout (routes stay in src/app).
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment:
        "This dependency is part of a circular relationship. Use dependency " +
        "inversion or single-responsibility modules to break the cycle.",
      from: {},
      to: { circular: true },
    },
    {
      name: "no-orphans",
      severity: "error",
      comment:
        "Orphan module — likely unused. Remove it, or add an exception if it is " +
        "intentional (config, framework entrypoint, generated, etc.).",
      from: {
        orphan: true,
        pathNot: [
          "(^|/)[.][^/]+[.](?:js|cjs|mjs|ts|cts|mts|json)$", // dot files
          "[.]d[.]ts$", // TypeScript declaration files
          "(^|/)tsconfig[.]json$",
          "(^|/)(?:babel|webpack|next|postcss|tailwind|jest|playwright|prisma)[.]config[.](?:js|cjs|mjs|ts|cts|mts|json)$",
          "(^|/)eslint[.]config[.]mjs$",
          // Next.js App Router framework entrypoints (the framework imports these):
          "^src/app/.*/(?:page|layout|loading|error|not-found|template|default|global-error|route)[.](?:ts|tsx)$",
          "^src/app/(?:robots|sitemap|manifest|icon|apple-icon|opengraph-image)[.](?:ts|tsx)$",
          "^src/middleware[.]ts$",
          "^src/instrumentation[.]ts$",
          "^src/i18n/request[.]ts$",
          "^src/generated/",
          "^coverage/",
          "^test-results/",
          "^playwright-report/",
        ],
      },
      to: {},
    },
    {
      name: "not-to-deprecated",
      comment:
        "This module uses a (version of an) npm module that has been deprecated. " +
        "Upgrade or find an alternative — deprecated modules are a security risk.",
      severity: "warn",
      from: {},
      to: { dependencyTypes: ["deprecated"] },
    },
    {
      name: "no-non-package-json",
      severity: "error",
      comment:
        "This module depends on an npm package that isn't in package.json " +
        "dependencies — it may be missing (or wrong version) in production.",
      from: {},
      to: { dependencyTypes: ["npm-no-pkg", "npm-unknown"] },
    },
    {
      name: "not-to-unresolvable",
      severity: "error",
      comment: "Depends on a module that cannot be resolved on disk.",
      from: {},
      to: { couldNotResolve: true, pathNot: ["^https?://"] },
    },
    {
      name: "no-duplicate-dep-types",
      severity: "warn",
      comment:
        "An npm package appears under more than one dependency type in package.json.",
      from: {},
      to: { moreThanOneDependencyType: true, dependencyTypesNot: ["type-only"] },
    },
    {
      name: "not-to-test",
      severity: "error",
      comment: "Non-test code must not depend on the tests/ folder.",
      from: { pathNot: "^tests" },
      to: { path: "^tests" },
    },
    {
      name: "not-to-spec",
      severity: "error",
      comment: "Don't import a spec/test file from non-test code.",
      from: {},
      to: { path: "[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$" },
    },
    {
      name: "not-to-dev-dep",
      severity: "error",
      comment:
        "Production source must not import a devDependency. Move it to " +
        "dependencies, or keep it out of shipped code.",
      from: {
        path: "^src",
        pathNot: "[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$",
      },
      to: {
        dependencyTypes: ["npm-dev"],
        dependencyTypesNot: ["type-only"],
        pathNot: ["node_modules/@types/"],
      },
    },
    {
      name: "optional-deps-used",
      severity: "info",
      comment: "Depends on an npm package declared as an optional dependency.",
      from: {},
      to: { dependencyTypes: ["npm-optional"] },
    },
    {
      name: "peer-deps-used",
      severity: "warn",
      comment: "Depends on an npm package declared as a peer dependency.",
      from: {},
      to: { dependencyTypes: ["npm-peer"] },
    },

    // ── Feature architecture (re-pointed from the CRM's src/modules to src/features) ──
    {
      name: "no-cross-feature-imports",
      severity: "error",
      comment:
        "A feature must not import another feature. Promote shared code to " +
        "src/components, src/hooks, or src/lib instead.",
      from: { path: "^src/features/([^/]+)/" },
      to: { path: "^src/features/(?!$1/)" },
    },
    {
      name: "no-shared-to-feature",
      severity: "error",
      comment:
        "Shared layers (components, hooks, lib) must not depend on a feature. " +
        "Exception: src/components/nav is the app shell that composes the auth " +
        "entry points (login/register modals).",
      from: {
        path: "^src/(components|hooks|lib)/",
        pathNot: "^src/components/nav/",
      },
      to: { path: "^src/features/" },
    },
    {
      name: "not-to-app-routes",
      severity: "error",
      comment:
        "Feature/shared code must not import Next.js route files (pages, layouts, " +
        "route handlers). Composition flows app -> features -> shared, never back.",
      from: { pathNot: "^src/app/" },
      to: {
        path: "^src/app/.*/(?:page|layout|route|template|loading|error|not-found)[.](?:ts|tsx)$",
      },
    },
    {
      name: "feature-allowed-folders",
      severity: "error",
      comment:
        "A feature may only contain: api, assets, components, hooks, i18n, " +
        "routes, stores, types, utils.",
      from: {
        path:
          "^src/features/[^/]+/" +
          "(?!(?:api|assets|components|hooks|i18n|routes|stores|types|utils)/)[^/]+/",
      },
      to: {},
    },
  ],
  options: {
    doNotFollow: { path: ["node_modules"] },
    tsPreCompilationDeps: true,
    combinedDependencies: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      extensions: [".ts", ".tsx", ".d.ts", ".js", ".jsx", ".mjs"],
      mainFields: ["main", "module", "types", "typings"],
    },
    skipAnalysisNotInRules: true,
    reporterOptions: {
      text: { highlightFocused: true },
    },
  },
};
