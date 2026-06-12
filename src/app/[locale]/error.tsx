"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import Styles from "./error.styles";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("A11y");

  return (
    <Box component="main" id="main-content" role="alert" sx={Styles.main}>
      <Typography variant="h1" component="h1" sx={Styles.heading}>
        Error
      </Typography>
      <Typography component="p" sx={Styles.message}>
        An unexpected error occured
      </Typography>
      <Button variant="contained" onClick={() => reset()} sx={Styles.retry}>
        {t("retry")}
      </Button>
    </Box>
  );
}
