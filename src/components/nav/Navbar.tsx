"use client";
import { useState } from "react";
import PcNav from "./PcNav";
import MobileNav from "./MobileNav";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import EmployerPanel from "./employer/EmployerPanel";
import UserPanel from "./user/UserPanel";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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

  const isEmployer = false;
  return (
    <div className="flex min-w-full flex-col p-4 justify-center text-left font-button bg-gray-100 shadow-md">
      <header className="flex h-8 items-center justify-around mx-auto gap-10 text-left text-sm text-gray-900 font-button space-x-48">
        <PcNav navItems={navItems} />
        <div className="flex space-x-6">
          <SignedOut>
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {isEmployer ? <EmployerPanel /> : <UserPanel />}
            <UserButton />
          </SignedIn>
        </div>
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
