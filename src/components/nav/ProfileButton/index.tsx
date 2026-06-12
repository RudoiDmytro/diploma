"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import Auth from "@/features/auth/components/LoginModal";
import Styles from "./styles";

const SigninButton = () => {
  const { data: session } = useSession();
  const t = useTranslations("A11y");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (session && session.user) {
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    return (
      <>
        <IconButton
          onClick={handleOpen}
          aria-label={t("open_profile_menu")}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={Styles.trigger}
        >
          {session.user.profileImageUrl ? (
            <Image
              src={session.user.profileImageUrl ?? ""}
              alt={session.user.username ?? ""}
              style={{ borderRadius: "9999px", display: "block" }}
              width={36}
              height={36}
            />
          ) : (
            <Box sx={Styles.avatarFallback}>
              <Typography component="span" sx={Styles.avatarInitial}>
                {session.user.username!.charAt(0).toUpperCase()}
              </Typography>
            </Box>
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          slotProps={{ paper: { sx: Styles.menuPaper } }}
        >
          <Box sx={Styles.userInfo}>
            <Typography component="span">{session.user.username}</Typography>
            <Typography component="span">{session.user.email}</Typography>
          </Box>
          <MenuItem
            onClick={() => {
              handleClose();
              signOut();
            }}
            sx={Styles.signOut}
          >
            Sign Out
          </MenuItem>
        </Menu>
      </>
    );
  }
  return <Auth />;
};

export default SigninButton;
