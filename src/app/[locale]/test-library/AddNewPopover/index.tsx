"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Styles from "../page.styles";

type AddNewPopoverProps = {
  label: string;
  message: string;
};

export default function AddNewPopover({ label, message }: AddNewPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="contained"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-haspopup="dialog"
        aria-expanded={open}
        sx={Styles.addNewButton}
      >
        {label}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { sx: Styles.popoverPaper } }}
      >
        <Typography component="span">{message}</Typography>
      </Popover>
    </>
  );
}
