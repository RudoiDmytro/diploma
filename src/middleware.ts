import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { locales, localePrefix, pathnames } from "./config";

import createMiddleware from "next-intl/middleware";

export async function middleware(req: NextRequest) {
  if (req.referrer?.includes("/role-selection")) {
    setInterval(async () => {
      return NextResponse.redirect(`${origin}`);
    }, 2000);
  }

  const intlMiddleware = createMiddleware({
    defaultLocale: "en",
    localePrefix,
    locales,
    pathnames,
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/(uk|en)/:path*",
  ],
};
