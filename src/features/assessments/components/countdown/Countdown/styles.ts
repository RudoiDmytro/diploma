import { colors } from "@/styles/colors";

export default {
  expired: {
    textAlign: "center",
    padding: "2rem",
    border: "1px solid",
    borderColor: colors.border.default,
    borderRadius: "0.25rem",
    margin: "0.5rem",
    color: colors.destructive.main,
  },
  expiredText: {
    fontWeight: 700,
    fontSize: "3rem",
    lineHeight: 1,
    color: colors.destructive.main,
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem",
    border: "1px solid",
    borderColor: colors.border.default,
    borderRadius: "0.25rem",
    width: "fit-content",
    backgroundColor: colors.background.card,
  },
  counterDanger: {
    borderColor: colors.destructive.main,
    borderWidth: "2px",
  },
  separator: {
    margin: 0,
    color: colors.text.muted,
  },
  dangerLabel: {
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: 600,
    color: colors.destructive.main,
    width: "100%",
    textAlign: "center",
  },
  visuallyHidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
};
