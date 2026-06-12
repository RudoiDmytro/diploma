import { colors } from "@/styles/colors";

export default {
  // "flex flex-row items-center space-x-1"
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.25rem",
  },
  // "relative text-muted-foreground"
  label: {
    position: "relative",
    color: colors.text.muted,
  },
  labelPending: {
    transition: "opacity 150ms",
  },
  // Visually-hidden accessible label text (replaces Tailwind sr-only without
  // dropping the programmatic association).
  visuallyHidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
  // "inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
  select: {
    display: "inline-flex",
    appearance: "none",
    backgroundColor: "transparent",
    color: "inherit",
    border: "none",
    font: "inherit",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    paddingLeft: "0.5rem",
    paddingRight: "1.5rem",
    "&:disabled": {
      opacity: 0.3,
    },
  },
  // "pointer-events-none absolute right-2 top-[8px]"
  chevron: {
    pointerEvents: "none",
    position: "absolute",
    right: "0.5rem",
    top: "8px",
  },
  globe: {
    color: colors.text.muted,
  },
};
