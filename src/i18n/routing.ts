import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "uk"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/test-library/[slug]": "/test-library/[slug]",
    "/test-library/[slug]/take-assessment":
      "/test-library/[slug]/take-assessment",
    "/jobs/[slug]": "/jobs/[slug]",
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathnames = keyof typeof routing.pathnames;

// Backwards-compatible named exports (previously lived in src/config.ts).
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export const localePrefix = routing.localePrefix;
export const pathnames = routing.pathnames;
