import { NextRequest, NextResponse } from "next/server";
import { locales, localePrefix } from "./config";

import createMiddleware from "next-intl/middleware";

export async function middleware(req: NextRequest) {
  if (req.referrer.includes("/role-selection")) {
    setInterval(async () => {
      return NextResponse.redirect(`${origin}`);
    }, 2000);
  }

  const intlMiddleware = createMiddleware({
    defaultLocale: "uk",
    localePrefix,
    locales,
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/(uk|en)/:path*",
  ],
};
