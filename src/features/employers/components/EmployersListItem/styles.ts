import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  card: {
    background: colors.gradients.gradient1,
    borderRadius: "1.5rem",
    padding: "1rem",
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      height: "100%",
    },
  },
  inner: {
    display: "flex",
    backgroundColor: colors.background.default,
    borderRadius: "0.75rem",
    padding: "1rem",
    transition: "background-color 500ms ease-in-out",
    "&:hover": {
      backgroundColor: colors.background.card,
    },
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      height: "100%",
    },
  },
  body: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: colors.background.card,
    color: colors.text.cardForeground,
    borderRadius: "0.5rem",
    padding: "0.75rem",
  },
  nameColumn: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: colors.text.muted,
  },
  companyName: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 500,
  },
  frequentColumn: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    borderLeft: `1px solid ${colors.text.primary}`,
    paddingLeft: "0.5rem",
  },
  frequentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    textAlign: "center",
    gap: "0.5rem",
    placeItems: "center",
  },
};
