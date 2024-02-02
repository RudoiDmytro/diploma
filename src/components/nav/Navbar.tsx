"use client";
import { useState } from "react";
import PcNav from "./PcNav";
import MobileNav from "./MobileNav";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import EmployerPanel from "./employer/EmployerPanel";
import UserPanel from "./user/UserPanel";

const navItems = [
  { label: "Skills&Work", link: "/", isFocused: true },
  { label: "Test library", link: "/test-library", isFocused: false },
  { label: "Find Job", link: "/jobs", isFocused: false },
  { label: "Employers", link: "/employers", isFocused: false },
  { label: "Pricing Plans", link: "/pricing", isFocused: false },
  { label: "Customer Supports", link: "/support", isFocused: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const session = false;
  const isEmployer = false;
  return (
    <div className="flex min-w-full flex-col p-4 justify-center text-left font-button bg-gray-100">
      <header className="flex h-8 items-center justify-center gap-10 text-left text-sm text-gray-900 font-button">
        <PcNav navItems={navItems} />
        {session ? (
          isEmployer ? (
            <EmployerPanel />
          ) : (
            <UserPanel />
          )
        ) : (
          <Link href="/login">
            <Button className="flex h-10 ml-44 font-semibold items-center justify-center bg-blue-200 rounded-2xl text-black hover:text-white hover:bg-red-400">
              Login
            </Button>
          </Link>
        )}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? <Menu /> : <X />}
        </button>
        {isOpen && (
          <div>
            <MobileNav navItems={navItems} />
          </div>
        )}
      </header>
    </div>
  );
}
