"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import LoginPage from "../Login";
import Styles from "./styles";

function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("A11y");

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setIsOpen(true)}
        sx={Styles.trigger}
      >
        Login
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="login-dialog-title"
        slotProps={{ paper: { sx: Styles.paper } }}
      >
        <DialogTitle id="login-dialog-title" sx={Styles.title}>
          Sign-in
        </DialogTitle>
        <IconButton
          aria-label={t("close_dialog")}
          onClick={() => setIsOpen(false)}
          sx={Styles.close}
        >
          <Close fontSize="small" aria-hidden />
        </IconButton>
        <DialogContent sx={Styles.content}>
          <LoginPage />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LoginModal;
