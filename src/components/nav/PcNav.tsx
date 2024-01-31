import NavButton from "@/components/nav/NavButton";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  link: string;
  isFocused: boolean;
};

type NavButtonGroupProps = {
  navItems: NavItem[];
};
export default function PcNav({ navItems }: NavButtonGroupProps) {

  const pathName = usePathname();
  return (
    <nav className="flex justify-center h-10 items-start gap-6">
      {navItems.map((item, index) => (
        <NavButton
          key={index}
          href={item.link}
          styles={`max-lg:hidden min-w-fit p-3 rounded-2xl ${
            pathName === item.link &&
            "bg-red-400 hover:bg-red-500 font-bold text-white"
          }`}
        >
          {item.label}
        </NavButton>
      ))}
    </nav>
  );
}
