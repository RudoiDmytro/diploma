"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Styles from "../EmployerModal/styles";

type EmployerModalDialogProps = {
  hasMultipleJobs: boolean;
  children: React.ReactNode;
};

const TITLE_ID = "employer-modal-title";

export default function EmployerModalDialog({
  hasMultipleJobs,
  children,
}: EmployerModalDialogProps) {
  const t = useTranslations("A11y");
  const router = useRouter();

  const close = () => {
    router.push("/employers");
  };

  return (
    <Dialog
      open
      onClose={close}
      aria-labelledby={TITLE_ID}
      slotProps={{ paper: { sx: Styles.paper } }}
    >
      <DialogTitle id={TITLE_ID} component="h2" sx={Styles.title}>
        All jobs from this employer
        <IconButton
          aria-label={t("close_dialog")}
          onClick={close}
          sx={Styles.closeButton}
        >
          <Close fontSize="small" aria-hidden />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={Styles.content}>
        <Box sx={hasMultipleJobs ? Styles.jobsGrid : Styles.jobsGridSingle}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions sx={Styles.actions}>
        <Button component={Link} href="/employers" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
