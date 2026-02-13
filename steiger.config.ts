import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    ignores: ["**/.next/**", "**/node_modules/**", "**/dist/**"],
  },
  {
    rules: {
      "fsd/no-public-api-sidestep": "warn",
      "fsd/forbidden-imports": "warn",
    },
  },
]);
