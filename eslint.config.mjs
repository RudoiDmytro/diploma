import next from "eslint-config-next";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import prettier from "eslint-config-prettier";

// Jest tests only (`*.test.*`). Playwright e2e specs (`tests/e2e/*.spec.ts`)
// are intentionally excluded — they use Playwright's page queries, not RTL.
const jestTestGlobs = [
  "tests/unit/**/*.{ts,tsx,js,jsx}",
  "tests/integration/**/*.{ts,tsx,js,jsx}",
  "**/*.test.{ts,tsx,js,jsx}",
];

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "bin/**",
      "next-env.d.ts",
      "src/generated/**",
    ],
  },

  // Next.js recommended (Core Web Vitals + TypeScript) — native flat config.
  ...next,

  // Project-wide hygiene rules.
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-alert": "warn",
    },
  },

  // Source must not ship data-testid — query by role/label/text, or expose a stable id.
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    ignores: ["**/*.test.*", "**/*.spec.*"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='data-testid']",
          message:
            "No data-testid in source — query by role/label/text, or expose a stable id.",
        },
      ],
    },
  },

  // Jest tests: Testing Library + jest-dom best practices.
  {
    files: jestTestGlobs,
    plugins: { "testing-library": testingLibrary, "jest-dom": jestDom },
    rules: {
      ...testingLibrary.configs["flat/react"].rules,
      ...jestDom.configs["flat/recommended"].rules,
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Prettier last — disable all formatting-related rules.
  prettier,
];

export default eslintConfig;
