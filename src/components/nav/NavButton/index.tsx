import Link from "next/link";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Styles from "./styles";

export default function NavButton({
  children,
  href,
  sx,
  locale,
}: {
  children: React.ReactNode;
  href: string;
  sx?: SxProps<Theme>;
  locale: string;
}) {
  return (
    <Box
      component={Link}
      href={href}
      locale={locale}
      sx={[Styles.base, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Box>
  );
}
