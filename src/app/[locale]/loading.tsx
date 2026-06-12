import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { getTranslations } from "next-intl/server";
import Styles from "./loading.styles";

export default async function Loading() {
  const t = await getTranslations("A11y");

  return (
    <Box role="status" sx={Styles.wrapper}>
      <CircularProgress aria-label={t("loading")} sx={Styles.spinner} />
    </Box>
  );
}
