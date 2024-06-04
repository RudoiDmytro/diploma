import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/nav/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ThemeProvider } from "@/app/components/themeProvider";
import { Suspense } from "react";
import Loading from "./loading";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Skills&Work",
    template: "%s | Skills&Work",
  },
};

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

export default async function RootLayout({ params, children }: LayoutProps) {
  const { locale } = params;

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="https://img.icons8.com/doodle/48/office.png"
          type="image/svg"
          sizes="48x48"
        />
      </head>
      <body className={`${inter.className} min-w-[300px]`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <main className="flex flex-col justify-between items-center h-fit min-h-svh">
              <Navbar locale={locale} />
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <Footer />
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
