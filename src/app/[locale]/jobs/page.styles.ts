import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  main: {
    paddingInline: "0.75rem",
    margin: "auto",
    maxWidth: "80rem",
    marginBlock: "2.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
    minHeight: "100vh",
  },
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    textAlign: "center",
    paddingInline: "1rem",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      flexDirection: "row",
    },
  },
  h1: {
    fontSize: "2.25rem",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      fontSize: "3rem",
    },
  },
  subtitle: {
    color: colors.text.muted,
  },
  headerAside: {
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      position: "absolute",
      right: 0,
    },
  },
  addLink: {
    minWidth: "10rem",
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      minWidth: "auto",
    },
  },
  infoDisclosure: {
    margin: 0,
  },
  triggerButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    listStyle: "none",
    cursor: "pointer",
    height: "2.5rem",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    borderRadius: "0.375rem",
    border: "none",
    fontSize: "0.875rem",
    fontWeight: 500,
    backgroundColor: colors.primary.main,
    color: colors.text.primaryForeground,
    transition: "background-color 150ms ease-in-out",
    "&::-webkit-details-marker": {
      display: "none",
    },
    "&:hover": {
      filter: "brightness(0.9)",
    },
    "&:focus-visible": {
      outline: `2px solid ${colors.ring}`,
      outlineOffset: "2px",
    },
  },
  infoPopover: {
    marginTop: "0.5rem",
    width: "auto",
    padding: "0.5rem",
    backgroundColor: colors.background.popover,
    color: colors.text.popoverForeground,
    border: `1px solid ${colors.border.default}`,
    borderRadius: "0.5rem",
    textAlign: "center",
  },
  resultsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      flexDirection: "row-reverse",
    },
  },
  mobileFilterWrap: {
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      display: "none",
    },
  },
  filterDisclosure: {
    margin: 0,
  },
  filterSummary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    listStyle: "none",
    cursor: "pointer",
    position: "fixed",
    right: "1.25rem",
    top: "5rem",
    zIndex: 30,
    width: "fit-content",
    height: "2.5rem",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    borderRadius: "0.375rem",
    border: "none",
    fontSize: "0.875rem",
    fontWeight: 500,
    backgroundColor: colors.primary.main,
    color: colors.text.primaryForeground,
    transition: "background-color 150ms ease-in-out",
    "&::-webkit-details-marker": {
      display: "none",
    },
    "&:hover": {
      filter: "brightness(0.9)",
    },
    "&:focus-visible": {
      outline: `2px solid ${colors.ring}`,
      outlineOffset: "2px",
    },
  },
  desktopFilterWrap: {
    display: "none",
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      display: "block",
    },
  },
};
