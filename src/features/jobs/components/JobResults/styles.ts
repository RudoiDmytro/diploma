import breakpoints from "@/styles/breakpoints";

export default {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "0.5rem",
    placeContent: "start",
    gridColumn: "span 2 / span 2",
    [`@media (max-width:${breakpoints.values.md - 1}px)`]: {
      gridTemplateColumns: "1fr",
    },
  },
  link: {
    display: "block",
    textDecoration: "none",
    color: "inherit",
  },
  empty: {
    textAlign: "center",
    margin: "auto",
  },
};
