"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import Styles from "./styles";

type BackButtonProps = {
  className?: string;
  sx?: SxProps<Theme>;
};

export default function BackButton({ className, sx }: BackButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant="contained"
      onClick={() => router.back()}
      className={className}
      sx={[Styles.root, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      Go Back
    </Button>
  );
}
