import { Box, Button, CircularProgress } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { useTranslations } from "next-intl";
import Styles from "./styles";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  sx?: SxProps<Theme>;
}

export default function LoadingButton({
  children,
  loading,
  className,
  disabled,
  type,
  sx,
  ...props
}: LoadingButtonProps) {
  const t = useTranslations("A11y");
  return (
    <Button
      {...(props as React.ComponentProps<typeof Button>)}
      variant="contained"
      type={type ?? "submit"}
      className={className}
      disabled={disabled || loading}
      sx={[Styles.root, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box component="span" sx={Styles.content}>
        {loading && (
          <Box component="span" role="status" aria-label={t("loading")} sx={Styles.spinner}>
            <CircularProgress size={16} color="inherit" />
          </Box>
        )}
        {children}
      </Box>
    </Button>
  );
}
