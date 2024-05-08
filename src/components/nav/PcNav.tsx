"use client";

import NavButton from "@/components/nav/NavButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/portfolio.png";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import SigninButton from "./SigninButton";
import RegisterModal from "../auth/RegisterModal";
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
      <div className=" max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-5 justify-between h-16">
          <Image src={logo} alt="Skills&Work logo" width={40} height={40} />
          <div className="flex space-x-4">
            {navItems.map((item, index) => (
              <NavButton
                key={index}
                href={item.link}
                styles={`max-lg:hidden min-w-fit p-3 rounded-2xl hover:transition-colors duration-500 ease-in-out ${
                  pathName === item.link || pathName.startsWith(`${item.link}/`)
                    ? "gradient2 font-bold text-white hover:gradient2"
                    : "hover:gradient1"
                }`}
              >
                {item.label}
              </NavButton>
            ))}
          </div>
          <div>
            <div className="justify-center space-x-3 flex flex-row items-center transition-all ease-in-out">
              <div className="inline-flex rounded-md shadow-sm " role="group">
                {status === "authenticated" && (
                  <button
                    type="button"
                    className="inline-flex items-center px-2 py-1 gap-2 text-md font-medium text-foreground bg-transparent border rounded-s-lg border-foreground hover:bg-card hover:text-foreground focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white "
                  >
                    <Link href="/profile">Profile</Link>
                  </button>
                )}
                {status === "unauthenticated" && <RegisterModal />}
                <SigninButton />
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
      </div>
    </nav>
  );
}
