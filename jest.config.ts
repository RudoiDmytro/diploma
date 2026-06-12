import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

// TEST_ENV=integration → node environment + tests/integration (like the CRM).
// default                → jsdom + tests/unit (React component / util tests).
const isIntegration = process.env.TEST_ENV === "integration";

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**/layout.tsx",
    "!src/app/**/loading.tsx",
    "!src/generated/**",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  roots: [
    isIntegration ? "<rootDir>/tests/integration" : "<rootDir>/tests/unit",
  ],
  testEnvironment: isIntegration ? "node" : "jsdom",
  testMatch: isIntegration
    ? ["<rootDir>/tests/integration/**/*.integration.test.{ts,tsx}"]
    : ["<rootDir>/tests/unit/**/*.test.{ts,tsx}"],
  setupFilesAfterEnv: isIntegration ? [] : ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
