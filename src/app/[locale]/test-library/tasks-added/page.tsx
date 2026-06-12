import { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import Styles from "./page.styles";

export const metadata: Metadata = {
  title: "Tasks added",
};

export default function page() {
  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Typography variant="h1" component="h1" sx={Styles.title}>
        Tasks added
      </Typography>
      <Typography component="p" sx={Styles.text}>
        Your tasks have been added to the assessment.
      </Typography>
    </Box>
  );
}
