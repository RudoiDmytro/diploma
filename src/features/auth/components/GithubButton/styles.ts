import { colors } from "@/styles/colors";

export default {
  button: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    gap: "0.5rem",
    borderRadius: "0.5rem",
    borderColor: colors.text.muted,
    color: colors.text.muted,
    textTransform: "none",
    fontSize: "1rem",
    "&:hover": {
      borderColor: colors.text.primary,
      color: colors.text.primary,
      boxShadow:
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      backgroundColor: "transparent",
    },
  },
  icon: {
    width: "1.5rem",
    height: "1.5rem",
  },
};
