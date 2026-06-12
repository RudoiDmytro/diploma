import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridAutoColumns: "auto",
    height: "fit-content",
    gap: "0.5rem",
    gridColumn: "span 2 / span 2",
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
  link: {
    display: "block",
  },
  empty: {
    textAlign: "center",
    margin: "auto",
    color: colors.text.muted,
  },
};
