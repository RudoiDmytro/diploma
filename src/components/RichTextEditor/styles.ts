import { colors } from "@/styles/colors";

export default {
  // Replaces the previous Tailwind container classes:
  //   rounded-md border ring-offset-background
  //   focus-within:outline-none focus-within:ring-2 focus-within:ring-ring
  //   focus-within:ring-offset-2
  // The focus-within box-shadow reproduces the 2px ring with a 2px offset
  // (offset colour = the page background, matching ring-offset-background),
  // reading the --ring token so it stays correct in dark mode.
  editorContainer: {
    borderRadius: "0.375rem",
    border: `1px solid ${colors.border.default}`,
    "&:focus-within": {
      outline: "none",
      boxShadow: `0 0 0 2px ${colors.background.default}, 0 0 0 4px ${colors.ring}`,
    },
  },
};
