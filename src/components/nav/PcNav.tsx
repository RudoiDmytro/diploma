import NavButton from "@/components/nav/NavButton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/portfolio.png"

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
      <Image src={logo} alt="Skills&Work logo" width={40} height={40}/>
      {navItems.map((item, index) => (
        <NavButton
          key={index}
          href={item.link}
          styles={`max-lg:hidden min-w-fit p-3 rounded-2xl ${
            pathName === item.link &&
            "bg-gradient font-bold text-white"
          }`}
        >
          {item.label}
        </NavButton>
      ))}
    </nav>
  );
}
