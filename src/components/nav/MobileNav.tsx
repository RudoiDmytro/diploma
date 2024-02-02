import { usePathname } from "next/navigation";
import Link from "next/link";

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
    <div className="absolute top-16 right-0 w-8/12 h-screen overflow-hidden opacity-90 gap-3 bg-gray-300 flex flex-col justify-center">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`p-3 rounded-2xl flex h-10 font-semibold items-center justify-center shadow-inner  ${
            pathName === item.link && "bg-red-400 font-bold text-white"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
