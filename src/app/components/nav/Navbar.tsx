"use client";
import { useEffect, useState } from "react";
import PcNav from "./PcNav";
import { SessionProvider } from "next-auth/react";
import MobileNav from "./MobileNav";
import { Drawer, DrawerContent, DrawerTrigger } from "@/app/components/ui/drawer";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Skills&Work", link: "/" },
  { label: "Test library", link: "/test-library" },
  { label: "Find Job", link: "/jobs"},
  { label: "Employers", link: "/employers" },
];

export default function Navbar({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);
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
          <DrawerContent className="w-8/12">
            <MobileNav navItems={navItems} locale={locale}/>
          </DrawerContent>
        </Drawer>
      </div>
    </SessionProvider>
  );
}
