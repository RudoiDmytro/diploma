import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const routing = defineRouting({
  defaultLocale: "en",
  locales: ["en", "uk"],
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/test-library/[slug]": "/test-library/[slug]",
    "/test-library/[slug]/take-assessment":
      "/test-library/[slug]/take-assessment",
    "/jobs/[slug]": "/jobs/[slug]",
  },
});

export const locales = routing.locales;
export const localePrefix = routing.localePrefix;
export const pathnames = routing.pathnames;

export type AppPathnames = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
