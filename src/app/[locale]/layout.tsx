import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/components/themeProvider";
import { Suspense } from "react";
import Loading from "./loading";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Box from "@mui/material/Box";
import Styles from "./layout.styles";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Skills&Work",
    template: "%s | Skills&Work",
  },
  icons: {
    icon: [
      {
        url: "https://img.icons8.com/doodle/48/office.png",
        type: "image/png",
        sizes: "48x48",
      },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export default async function RootLayout({ params, children }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale (next-intl v4).
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations("A11y");

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            {/* First focusable element: skip link, visually hidden until focused. */}
            <Box component="a" href="#main-content" sx={Styles.skipLink}>
              {t("skip_to_content")}
            </Box>
            <Box sx={Styles.shell}>
              <Navbar locale={locale} />
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <Footer />
            </Box>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
