import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {locales, localePrefix} from './config';

import createMiddleware from "next-intl/middleware";

export async function middleware(req: NextRequest) {
  if (req.referrer.includes("/role-selection")) {
    setInterval(async () => {
      const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      const { pathname, origin } = req.nextUrl;

      if (session?.role === "EMPLOYER" || session?.role === "SEEKER") {
        if (pathname === "/role-selection") {
          return NextResponse.redirect(`${origin}`);
        }
      }

      if (session?.role === null && session) {
        if (pathname !== "/role-selection") {
          return NextResponse.redirect(`${origin}/role-selection`);
        }
      }
    }, 2000);
  }

  const intlMiddleware = createMiddleware({
    defaultLocale: "uk",
    localePrefix,
    locales
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/(uk|en)/:path*",
  ],
};
