import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  // "sticky top-0 z-10 bg-white/10 backdrop-filter backdrop-blur-lg border-b border-muted w-full"
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid",
    borderColor: colors.background.muted,
    width: "100%",
  },
  // "max-w-7xl mx-auto px-4"
  container: {
    maxWidth: "80rem",
    marginInline: "auto",
    paddingInline: "1rem",
  },
  // "flex items-center justify-between h-16"
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "4rem",
  },
  // "flex items-center space-x-10 justify-start h-16"
  leftGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "2.5rem",
    height: "4rem",
  },
  // "flex space-x-4"
  links: {
    display: "flex",
    gap: "1rem",
  },
  // Shared per-link: "max-lg:hidden min-w-fit p-3 rounded-2xl transition-all duration-150 ease-in-out"
  navLink: {
    minWidth: "fit-content",
    padding: "0.75rem",
    borderRadius: "1rem",
    transition: "all 150ms ease-in-out",
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      display: "none",
    },
  },
  // Active link: "gradient2 font-bold text-white hover:gradient2"
  navLinkActive: {
    background: colors.gradients.gradient2,
    fontWeight: 700,
    color: colors.text.primaryForeground,
    "&:hover": {
      background: colors.gradients.gradient2,
    },
  },
  // Inactive link: "hover:gradient1 hover:text-background"
  navLinkInactive: {
    "&:hover": {
      background: colors.gradients.gradient1,
      color: colors.background.default,
    },
  },
  // "flex flex-row space-x-5"
  rightGroup: {
    display: "flex",
    flexDirection: "row",
    gap: "1.25rem",
  },
  // "justify-center space-x-3 flex flex-row items-center transition-all ease-in-out"
  authThemeGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    transition: "all ease-in-out",
  },
  // "inline-flex rounded-md shadow-sm" (former role="group" wrapper)
  authGroup: {
    display: "inline-flex",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  themeToggle: {
    color: colors.text.primary,
  },
};
