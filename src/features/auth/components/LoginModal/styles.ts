import { colors } from "@/styles/colors";

export default {
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    paddingInline: "0.75rem",
    paddingBlock: "0.5rem",
    fontSize: "1rem",
    fontWeight: 500,
    color: colors.text.primary,
    backgroundColor: "transparent",
    borderColor: colors.text.primary,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: colors.background.card,
      color: colors.text.primary,
      borderColor: colors.text.primary,
    },
  },
  paper: {
    width: "100%",
    maxWidth: "425px",
    backgroundColor: colors.background.popover,
    color: colors.text.popoverForeground,
  },
  title: {
    fontSize: "1rem",
    fontWeight: 500,
    textAlign: "center",
    color: colors.background.default,
    backgroundColor: colors.text.primary,
    borderRadius: "0.375rem",
    padding: "0.5rem",
    marginInline: "1.5rem",
    marginTop: "1.5rem",
  },
  close: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    color: colors.text.popoverForeground,
  },
  content: {
    padding: 0,
  },
};
