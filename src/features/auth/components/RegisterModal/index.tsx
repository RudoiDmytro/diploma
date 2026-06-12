"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import SignUp from "../SignUp";
import LoginPage from "../Login";
import Styles from "./styles";

type modalProps = {
  tab: string;
};

function RegisterModal({ tab }: modalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tab === "register" ? "register" : "sign-in");
  const t = useTranslations("A11y");

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setIsOpen(true)}
        sx={tab === "register" ? Styles.triggerRegister : Styles.triggerSignIn}
      >
        {tab === "register" ? "Sign-Up" : "Sign-In"}
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="register-dialog-title"
        slotProps={{ paper: { sx: Styles.paper } }}
      >
        <DialogTitle id="register-dialog-title" sx={Styles.title}>
          {activeTab === "register" ? "Sign-up" : "Sign-in"}
        </DialogTitle>
        <IconButton
          aria-label={t("close_dialog")}
          onClick={() => setIsOpen(false)}
          sx={Styles.close}
        >
          <Close fontSize="small" aria-hidden />
        </IconButton>
        <DialogContent sx={Styles.content}>
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            variant="fullWidth"
            aria-label="Authentication options"
            sx={Styles.tabs}
          >
            <Tab
              label="Sign-up"
              value="register"
              id="auth-tab-register"
              aria-controls="auth-tabpanel-register"
              sx={Styles.tab}
            />
            <Tab
              label="Sign-in"
              value="sign-in"
              id="auth-tab-sign-in"
              aria-controls="auth-tabpanel-sign-in"
              sx={Styles.tab}
            />
          </Tabs>
          <Box
            role="tabpanel"
            hidden={activeTab !== "register"}
            id="auth-tabpanel-register"
            aria-labelledby="auth-tab-register"
          >
            {activeTab === "register" && <SignUp />}
          </Box>
          <Box
            role="tabpanel"
            hidden={activeTab !== "sign-in"}
            id="auth-tabpanel-sign-in"
            aria-labelledby="auth-tab-sign-in"
          >
            {activeTab === "sign-in" && <LoginPage />}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RegisterModal;
