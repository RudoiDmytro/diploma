import { signIn } from "next-auth/react";
import React from "react";
import { Box, Button } from "@mui/material";
import Styles from "./styles";

function GoogleButton({ callbackUrl }) {
  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth
      onClick={() => signIn("google", { callbackUrl })}
      sx={Styles.button}
      startIcon={
        <Box
          component="img"
          sx={Styles.icon}
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt=""
        />
      }
    >
      Login with Google
    </Button>
  );
}

export default GoogleButton;
