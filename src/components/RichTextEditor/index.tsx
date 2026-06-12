"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import "@uiw/react-md-editor/markdown-editor.css";

import Styles from "./styles";

// react-draft-wysiwyg/draft-js relied on ReactDOM.findDOMNode (removed in
// React 19). Replaced with a controlled markdown editor that emits a markdown
// string directly — the stored data contract (markdown) is unchanged.
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  /** id for the underlying <textarea> so a <label htmlFor> can target it */
  id?: string;
  "aria-label"?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  id,
  "aria-label": ariaLabel,
  className,
}: RichTextEditorProps) {
  const t = useTranslations("A11y");
  return (
    <Box
      // data-color-mode is the @uiw/react-md-editor API for theme inheritance —
      // "inherit" makes the editor follow the next-themes light/dark class.
      data-color-mode="inherit"
      className={className}
      sx={Styles.editorContainer}
    >
      <MDEditor
        value={value ?? ""}
        onChange={(v) => onChange?.(v ?? "")}
        height={200}
        preview="edit"
        textareaProps={{
          id,
          "aria-label": ariaLabel ?? t("markdown_editor"),
          placeholder: "Write markdown here…",
          spellCheck: true,
        }}
      />
    </Box>
  );
}
