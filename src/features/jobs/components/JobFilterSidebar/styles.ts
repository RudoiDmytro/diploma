import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  aside: {
    marginTop: "0.75rem",
    backgroundColor: colors.background.default,
    border: `1px solid ${colors.border.default}`,
    borderRadius: "0.5rem",
    height: "fit-content",
    padding: "1rem",
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      position: "sticky",
      top: "5rem",
    },
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      width: "300px",
    },
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  groupLabel: {
    fontSize: "0.875rem",
    lineHeight: 1,
    fontWeight: 500,
    color: colors.text.primary,
    padding: 0,
  },
  textField: {
    "& .MuiInputBase-root": {
      backgroundColor: colors.background.default,
    },
  },
  select: {
    width: "100%",
    height: "2.5rem",
    border: `1px solid ${colors.border.input}`,
    borderRadius: "0.375rem",
    appearance: "none",
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    paddingBlock: "0.5rem",
    paddingLeft: "0.75rem",
    paddingRight: "2rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    "&:focus-visible": {
      outline: `2px solid ${colors.ring}`,
      outlineOffset: "2px",
    },
  },
  selectWrap: {
    position: "relative",
    width: "100%",
  },
  selectIcon: {
    position: "absolute",
    right: "0.75rem",
    top: "0.625rem",
    height: "1rem",
    width: "1rem",
    opacity: 0.5,
    pointerEvents: "none",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "0.25rem",
    justifyContent: "space-around",
  },
  remoteRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: 0,
  },
  remoteCheckbox: {
    transform: "scale(1.25)",
    color: colors.text.primary,
    "&.Mui-checked": {
      color: colors.text.primary,
    },
  },
  remoteLabel: {
    fontSize: "0.875rem",
    lineHeight: 1,
    fontWeight: 500,
    color: colors.text.primary,
  },
  submitWrap: {
    width: "100%",
    "& button": {
      width: "100%",
    },
  },
};
