import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Styles from "./not-found.styles";

export default function NotFound() {
  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Typography variant="h1" component="h1" sx={Styles.heading}>
        Not found
      </Typography>
      <Typography component="p" sx={Styles.message}>
        The page you are looking for is not exists
      </Typography>
      <Button
        component={Link}
        href="/"
        variant="contained"
        sx={Styles.homeButton}
      >
        Go home
      </Button>
    </Box>
  );
}
