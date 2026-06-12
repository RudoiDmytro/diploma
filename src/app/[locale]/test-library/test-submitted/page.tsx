import { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import Styles from "./page.styles";

export const metadata: Metadata = {
  title: "Task submitted",
};

export default function page() {
  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Typography variant="h1" component="h1" sx={Styles.title}>
        Task is submitted
      </Typography>
      <Typography component="p" sx={Styles.text}>
        Your task has been submitted and is pending approval.
      </Typography>
    </Box>
  );
}
