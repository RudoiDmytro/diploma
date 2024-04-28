"use client";
import { useState } from "react";
import PcNav from "./PcNav";
import MobileNav from "./MobileNav";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import EmployerPanel from "./employer/EmployerPanel";
import UserPanel from "./user/UserPanel";
import { SessionProvider } from "next-auth/react";

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
    <SessionProvider>
      <PcNav navItems={navItems} />
    </SessionProvider>
  );
}