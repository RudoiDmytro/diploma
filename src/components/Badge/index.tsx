import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import Styles from "./styles";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
};

export default function Badge({ children, className, sx }: BadgeProps) {
  return (
    <Box
      component="span"
      className={className}
      sx={[Styles.root, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Box>
  );
}
