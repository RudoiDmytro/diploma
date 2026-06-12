import { Metadata } from "next";
import Box from "@mui/material/Box";
import NewJobForm from "./NewJobForm";
import Styles from "./page.styles";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default function page() {
  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <NewJobForm />
    </Box>
  );
}
