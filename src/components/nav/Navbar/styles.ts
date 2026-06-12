import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  // Wrapper shown only below lg ("lg:hidden").
  mobileOnly: {
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      display: "none",
    },
  },
  // Hamburger trigger: "w-fit fixed left-5 top-20" + below sm:
  // "max-sm:left-0 max-sm:bg-transparent max-sm:text-foreground".
  hamburger: {
    width: "fit-content",
    position: "fixed",
    left: "1.25rem",
    top: "5rem",
    color: colors.text.primary,
    [`@media (max-width:${breakpoints.values.sm - 1}px)`]: {
      left: 0,
      backgroundColor: "transparent",
      color: colors.text.primary,
    },
  },
  // Drawer surface.
  drawerPaper: {
    backgroundColor: colors.background.default,
  },
  // Close control row: "pt-2 fixed top-12".
  drawerFooter: {
    position: "fixed",
    top: "3rem",
    paddingTop: "0.5rem",
    paddingInline: "1rem",
  },
};
