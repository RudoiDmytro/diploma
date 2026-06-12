import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  main: {
    paddingInline: "0.75rem",
    margin: "auto",
    maxWidth: "80rem",
    marginTop: "2.5rem",
    marginBottom: "2.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
    minHeight: "100vh",
    textAlign: "center",
  },
  h1: {
    fontSize: "2.25rem",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      fontSize: "3rem",
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    gap: "0.5rem",
    textAlign: "start",
    placeContent: "start",
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
  empty: {
    textAlign: "center",
    margin: "auto",
    color: colors.text.muted,
  },
};
