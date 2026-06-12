import { colors } from "@/styles/colors";

export default {
  trigger: {
    padding: 0,
    borderRadius: "9999px",
  },
  avatarImage: {
    borderRadius: "9999px",
    display: "block",
  },
  // Fallback avatar: "relative inline-flex items-center justify-center w-8 h-8
  // overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600".
  avatarFallback: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    overflow: "hidden",
    borderRadius: "9999px",
    backgroundColor: colors.background.muted,
  },
  avatarInitial: {
    fontWeight: 500,
    color: colors.text.muted,
  },
  // Menu surface mirrors the former popover:
  // "bg-background text-sm font-medium text-foreground shadow".
  menuPaper: {
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    textAlign: "start",
    paddingInline: "1rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid",
    borderColor: colors.border.default,
  },
  signOut: {
    color: colors.text.primary,
    "&:hover": {
      backgroundColor: colors.background.muted,
    },
  },
};
