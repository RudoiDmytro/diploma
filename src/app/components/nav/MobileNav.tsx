import { usePathname } from "next/navigation";
import NavButton from "./NavButton";

type NavItem = {
  label: string;
  link: string;
};

type NavButtonGroupProps = {
  navItems: NavItem[];
  locale: string;
};

export default function MobileNav({ navItems, locale }: NavButtonGroupProps) {
  const pathName = usePathname();
  return (
    <div className="h-screen bg-background divide-y overflow-hidden gap-1 flex flex-col justify-center">
      {navItems.map((item, index) => (
        <NavButton
          key={index}
          href={item.link}
          locale={locale}
          styles={`w-auto p-3 hover:none ${
            (pathName === "/uk" && pathName.includes(`${item.link}`)) ||
            pathName.endsWith(`${item.link}`) ||
            pathName.includes(`${item.link}/`)
              ? "gradient2 font-bold text-white focus:gradient2"
              : "focus:gradient1 focus:text-background "
          }`}
        >
          {item.label}
        </NavButton>
      ))}
    </div>
  );
}
