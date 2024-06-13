"use client";
import { useEffect, useState } from "react";
import PcNav from "./PcNav";
import { SessionProvider } from "next-auth/react";
import MobileNav from "./MobileNav";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "@uidotdev/usehooks";

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
  else
    return (
      <SessionProvider>
        <PcNav navItems={navItems} locale={locale} />
        <div className="lg:hidden">
          <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button className="w-fit max-sm:text-foreground fixed max-sm:left-0 left-5 top-20 max-sm:bg-transparent">
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <MobileNav navItems={navItems} locale={locale} />
              <DrawerFooter className="pt-2 fixed top-12">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </SessionProvider>
    );
}
