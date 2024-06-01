import { usePathname } from "next/navigation";
import NavButton from "./NavButton";

type NavItem = {
  label: string;
  link: string;
  isFocused: boolean;
};

type NavButtonGroupProps = {
  navItems: NavItem[];
};

export default function MobileNav({ navItems }: NavButtonGroupProps) {
  const pathName = usePathname();
  return (
    <div className="h-screen bg-background divide-y overflow-hidden gap-1 flex flex-col justify-center">
      {navItems.map((item, index) => (
        <NavButton
          key={index}
          href={item.link}
          styles={`w-auto p-3 hover:none ${
            pathName === item.link || pathName.startsWith(`${item.link}/`)
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
