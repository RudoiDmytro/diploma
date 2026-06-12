import { colors } from "@/styles/colors";

export default {
  unit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.5rem",
    lineHeight: "1.25rem",
    color: colors.text.primary,
  },
  unitDanger: {
    color: colors.destructive.main,
    fontWeight: 700,
  },
  value: {
    margin: 0,
    fontVariantNumeric: "tabular-nums",
  },
  label: {
    margin: 0,
    fontSize: "0.75rem",
    lineHeight: "1rem",
    color: colors.text.muted,
  },
};
