import Link from "next/link";

export default function NavButton({
  children,
  href,
  styles,
}: {
  children: React.ReactNode;
  href: string;
  styles: string;
}) {
  return (
    <Link
      href={href}
      className={`flex h-10 font-semibold items-center justify-center lg:hover:gradient1 ${styles}`}
    >
      {children}
    </Link>
  );
}
