import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  paper: {
    width: "fit-content",
    maxWidth: "48rem",
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    borderRadius: "0.5rem",
  },
  title: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    paddingRight: "3rem",
  },
  closeButton: {
    position: "absolute",
    right: "0.5rem",
    top: "0.5rem",
    color: colors.text.muted,
    "&:hover": {
      color: colors.text.primary,
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  jobsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gap: "0.5rem",
    [`@media (min-width:${breakpoints.values.xl}px)`]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
  jobsGridSingle: {
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gap: "0.5rem",
  },
  jobLink: {
    display: "block",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1.5rem",
  },
};
