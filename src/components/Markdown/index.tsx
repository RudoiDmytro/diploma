import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

import Styles from "./styles";

interface MarkdownProps {
  children: string;
}

// Visually-hidden style for the "(opens in new tab)" hint — keeps it available
// to assistive tech without showing it, replacing the previous Tailwind sr-only.
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
} as const;

export default function Markdown({ children }: MarkdownProps) {
  return (
    <Box sx={Styles.root}>
      <ReactMarkdown
        components={{
          a: ({ children: linkChildren, ...props }) => (
            <a target="_blank" rel="noopener noreferrer" {...props}>
              {linkChildren}
              <Box component="span" sx={visuallyHidden}>
                {" "}
                (opens in new tab)
              </Box>
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
}
