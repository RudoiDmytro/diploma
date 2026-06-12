"use client";
import { useFormStatus } from "react-dom";
import type { SxProps, Theme } from "@mui/material";
import LoadingButton from "../LoadingButton";

type FormSubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  sx?: SxProps<Theme>;
};

export default function FormSubmitButton(props: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  return <LoadingButton {...props} loading={pending} type="submit" />;
}
