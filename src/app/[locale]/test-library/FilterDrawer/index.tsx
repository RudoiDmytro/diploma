"use client";

import { ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Styles from "../page.styles";

type FilterDrawerProps = {
  label: string;
  children: ReactNode;
};

export default function FilterDrawer({ label, children }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={Styles.drawerTriggerWrap}>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={Styles.drawerTrigger}
      >
        {label}
      </Button>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { "aria-label": label, sx: Styles.drawerPaper } }}
      >
        <Box sx={Styles.drawerContent}>{children}</Box>
      </Drawer>
    </Box>
  );
}
