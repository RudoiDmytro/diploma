import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { i18n } from "../i18n-config";
import type { I18nConfig } from "../i18n-config";

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
  
  let response;
  let nextLocale;

  const { locales, defaultLocale } = i18n;

  const pathname = req.nextUrl.pathname;

  const pathLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathLocale) {
    const isDefaultLocale = pathLocale === defaultLocale;
    if (isDefaultLocale) {
      let pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) || "/";
      if (req.nextUrl.search) pathWithoutLocale += req.nextUrl.search;

      response = NextResponse.redirect(new URL(pathWithoutLocale, req.url));
    }

    nextLocale = pathLocale;
  } else {
    const locale = defaultLocale;

    let newPath = `${locale}${pathname}`;
    if (req.nextUrl.search) newPath += req.nextUrl.search;

    response =
      locale === defaultLocale
        ? NextResponse.rewrite(new URL(newPath, req.url))
        : NextResponse.redirect(new URL(newPath, req.url));
    nextLocale = locale;
  }

  if (!response) response = NextResponse.next();

  if (nextLocale) response.cookies.set("NEXT_LOCALE", nextLocale);

  return response;


}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
