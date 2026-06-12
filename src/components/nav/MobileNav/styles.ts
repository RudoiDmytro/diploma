import { colors } from "@/styles/colors";

export default {
  // "h-screen bg-background divide-y overflow-hidden gap-1 flex flex-col justify-center"
  container: {
    height: "100vh",
    backgroundColor: colors.background.default,
    overflow: "hidden",
    gap: "0.25rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > li:not(:first-of-type)": {
      borderTop: "1px solid",
      borderColor: colors.border.default,
    },
  },
  // Shared per-link: "w-auto p-3"
  navLink: {
    width: "auto",
    padding: "0.75rem",
  },
  // Active link: "gradient2 font-bold text-white focus:gradient2"
  navLinkActive: {
    background: colors.gradients.gradient2,
    fontWeight: 700,
    color: colors.text.primaryForeground,
    "&:focus": {
      background: colors.gradients.gradient2,
    },
  },
  // Inactive link: "focus:gradient1 focus:text-background"
  navLinkInactive: {
    "&:focus": {
      background: colors.gradients.gradient1,
      color: colors.background.default,
    },
  },
};
