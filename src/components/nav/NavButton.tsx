import Link from "next/link";
import React from "react";

export default function NavButton({
  children,
  href,
  styles,
}: {
  children: React.ReactNode,
  href: string,
  styles: string,
}) {
  return (
    <Link href={href} className={`flex h-10 font-semibold items-center justify-center hover:bg-slate-300 shadow-inner ${styles}`}>
      {children}
    </Link>
  );
}
