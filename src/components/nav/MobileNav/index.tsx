import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import NavButton from "../NavButton";
import Styles from "./styles";

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
    <Box component="ul" sx={Styles.container}>
      {navItems.map((item) => {
        const isActive =
          (pathName === "/uk" && pathName.includes(`${item.link}`)) ||
          pathName.endsWith(`${item.link}`) ||
          pathName.includes(`${item.link}/`);
        return (
          <Box component="li" key={item.link} sx={{ listStyle: "none" }}>
            <NavButton
              href={item.link}
              locale={locale}
              sx={[
                Styles.navLink,
                isActive ? Styles.navLinkActive : Styles.navLinkInactive,
              ]}
            >
              {item.label}
            </NavButton>
          </Box>
        );
      })}
    </Box>
  );
}
