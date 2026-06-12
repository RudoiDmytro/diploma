export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

// Routing/navigation moved to src/i18n/* for next-intl v4. Re-exported here so
// existing `@/config` imports keep working.
export {
  locales,
  defaultLocale,
  localePrefix,
  pathnames,
} from "./i18n/routing";
export type { AppPathnames } from "./i18n/routing";
export {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} from "./i18n/navigation";
