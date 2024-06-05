import {
  Pathnames,
  createLocalizedPathnamesNavigation,
} from "next-intl/navigation";

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const defaultLocale = "en" as const;
export const locales = ["en", "uk"] as const;

export const pathnames = {
  "/": "/",
  "/test-library/[slug]": "/test-library/[slug]",
  "/test-library/[slug]/take-assessment":
    "/test-library/[slug]/take-assessment",
  "/jobs/[slug]": "/jobs/[slug]",
} satisfies Pathnames<typeof locales>;

export const localePrefix = "always";

export type AppPathnames = keyof typeof pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
