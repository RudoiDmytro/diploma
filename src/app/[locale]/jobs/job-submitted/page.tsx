import { Metadata } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Styles from "./page.styles";

export const metadata: Metadata = {
  title: "Job submitted",
};

export default function page() {
  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Typography variant="h1" component="h1" sx={Styles.title}>
        Job submitted
      </Typography>
      <Typography component="p">
        Your job has been submitted and is pending approval.
      </Typography>
    </Box>
  );
}
