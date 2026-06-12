"use client";
import { useEffect, useState } from "react";
import PcNav from "../PcNav";
import { SessionProvider } from "next-auth/react";
import MobileNav from "../MobileNav";
import { Menu, Close } from "@mui/icons-material";
import { Drawer, IconButton, Button, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Styles from "./styles";

// SSR-safe media query. @uidotdev/usehooks' useMediaQuery throws during
// server rendering; this returns false until mounted, then tracks the query.
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const navItems = [
  { label: "Skills&Work", link: "/" },
  { label: "Test library", link: "/test-library" },
  { label: "Find Job", link: "/jobs" },
  { label: "Employers", link: "/employers" },
  { label: "Dashboard", link: "/dashboard" },
];

export default function Navbar({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const t = useTranslations("A11y");

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  if (isDesktop)
    return (
      <SessionProvider>
        <PcNav navItems={navItems} locale={locale} />
      </SessionProvider>
    );

  return (
    <SessionProvider>
      <PcNav navItems={navItems} locale={locale} />
      <Box sx={Styles.mobileOnly}>
        <IconButton
          onClick={() => setIsOpen(true)}
          aria-label={t("open_menu")}
          aria-expanded={isOpen}
          sx={Styles.hamburger}
        >
          <Menu aria-hidden />
        </IconButton>
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          slotProps={{
            paper: {
              sx: Styles.drawerPaper,
              "aria-label": t("navigation_menu"),
            },
          }}
        >
          <MobileNav navItems={navItems} locale={locale} />
          <Box sx={Styles.drawerFooter}>
            <Button
              variant="outlined"
              onClick={() => setIsOpen(false)}
              startIcon={<Close aria-hidden />}
            >
              {t("close_menu")}
            </Button>
          </Box>
        </Drawer>
      </Box>
    </SessionProvider>
  );
}
