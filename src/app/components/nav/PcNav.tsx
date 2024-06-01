"use client";

import NavButton from "@/app/components/nav/NavButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/portfolio.png";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import ProfileButton from "./ProfileButton";
import RegisterModal from "@/app//components/auth/RegisterModal";
import { i18n } from "../../../../i18n-config";
import Link from "next/link";

type NavItem = {
  label: string;
  link: string;
  isFocused: boolean;
};

type NavButtonGroupProps = {
  navItems: NavItem[];
};

export default function PcNav({ navItems }: NavButtonGroupProps) {
  const pathName = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const { locales, defaultLocale } = i18n;

  useEffect(() => {
    const theme = Cookies.get("theme");
    setIsDarkMode(theme === "dark");
    setTheme(theme || "light");
  }, []);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    Cookies.set("theme", newTheme);
  };

  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 border-b border-muted w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-10 justify-start h-16">
            <Image src={logo} alt="Skills&Work logo" width={40} height={40} />
            <div className="flex space-x-4">
              {navItems.map((item, index) => (
                <NavButton
                  key={index}
                  href={item.link}
                  styles={`max-lg:hidden min-w-fit p-3 rounded-2xl transition-all duration-150 ease-in-out ${
                    pathName === item.link ||
                    pathName.startsWith(`${item.link}/`)
                      ? "gradient2 font-bold text-white hover:gradient2"
                      : "hover:gradient1 hover:text-background"
                  }`}
                >
                  {item.label}
                </NavButton>
              ))}
            </div>
          </div>
          <div>
            <div className="justify-center space-x-3 flex flex-row items-center transition-all ease-in-out">
              <div className="inline-flex rounded-md shadow-sm " role="group">
                {status === "authenticated" && <ProfileButton />}
                {status === "unauthenticated" && (
                  <>
                    <RegisterModal tab="register" />
                    <RegisterModal tab="sign-in" />
                  </>
                )}
              </div>
              <div className="flex flex-row justify-between toggle">
                <label
                  htmlFor="dark-toggle"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="dark-mode"
                      id="dark-toggle"
                      className="checkbox hidden"
                      checked={isDarkMode}
                      onChange={toggleTheme}
                    />
                    <div className="block border-[1px] dark:border-white border-gray-900 w-14 h-8 rounded-full"></div>
                    <div
                      className={`dot absolute left-1 top-1 dark:bg-white bg-gray-800 w-6 h-6 rounded-full transition duration-500 ${
                        isDarkMode ? "translate-x-full " : ""
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 dark:text-white text-gray-900 font-medium">
                    {isDarkMode ? <Moon /> : <Sun />}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="languages">
          {[...locales].sort().map((locale) => (
            <Link
              key={locale}
              href={locale === defaultLocale ? "/" : `/${locale}`}
            >
              {locale}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
