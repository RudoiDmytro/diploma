import { Box } from "@mui/material";
import Styles from "./styles";

export default function Footer() {
  return (
    <Box component="footer" sx={Styles.footer}>
      <Box component="div">
        {new Date().getFullYear()} All rights reserved.
      </Box>
    </Box>
  );
}
