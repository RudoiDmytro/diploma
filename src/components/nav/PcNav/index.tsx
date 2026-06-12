"use client";

import NavButton from "@/components/nav/NavButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/portfolio.png";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Box, IconButton } from "@mui/material";
import ProfileButton from "../ProfileButton";
import RegisterModal from "@/features/auth/components/RegisterModal";
import LocaleSwitcher from "../LocaleSwitcher";
import Styles from "./styles";

type NavItem = {
  label: string;
  link: string;
};

type NavButtonGroupProps = {
  navItems: NavItem[];
  locale: string;
};

export default function PcNav({ navItems, locale }: NavButtonGroupProps) {
  const pathName = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();
  const { status } = useSession();
  const t = useTranslations("A11y");

  useEffect(() => {
    const stored = Cookies.get("theme");
    setIsDarkMode(stored === "dark");
    setTheme(stored || "light");
  }, [setTheme]);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    Cookies.set("theme", newTheme);
  };

  return (
    <Box component="nav" aria-label={t("primary_navigation")} sx={Styles.nav}>
      <Box sx={Styles.container}>
        <Box sx={Styles.row}>
          <Box sx={Styles.leftGroup}>
            <Image src={logo} alt="Skills&Work logo" width={40} height={40} />
            <Box sx={Styles.links}>
              {navItems.map((item) => {
                const isActive =
                  (pathName === `/${locale}` &&
                    pathName.includes(`${item.link}`)) ||
                  pathName.endsWith(`${item.link}`) ||
                  pathName.includes(`${item.link}/`);
                return (
                  <NavButton
                    key={item.link}
                    href={item.link}
                    locale={locale}
                    sx={[
                      Styles.navLink,
                      isActive
                        ? Styles.navLinkActive
                        : Styles.navLinkInactive,
                    ]}
                  >
                    {item.label}
                  </NavButton>
                );
              })}
            </Box>
          </Box>
          <Box sx={Styles.rightGroup}>
            <Box sx={Styles.authThemeGroup}>
              <Box sx={Styles.authGroup}>
                {status === "authenticated" && <ProfileButton />}
                {status === "unauthenticated" && (
                  <>
                    <RegisterModal tab="register" />
                    <RegisterModal tab="sign-in" />
                  </>
                )}
              </Box>
              <IconButton
                onClick={toggleTheme}
                aria-label={isDarkMode ? t("switch_to_light") : t("switch_to_dark")}
                sx={Styles.themeToggle}
              >
                {isDarkMode ? (
                  <DarkMode aria-hidden />
                ) : (
                  <LightMode aria-hidden />
                )}
              </IconButton>
            </Box>
            <LocaleSwitcher />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
