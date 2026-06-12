import { colors } from "@/styles/colors";

export default {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    padding: "0.75rem",
  },
  form: {
    backgroundColor: colors.background.muted,
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    borderRadius: "0.25rem",
    paddingInline: "2rem",
    paddingTop: "1.5rem",
    paddingBottom: "2rem",
    width: "100%",
  },
  providers: {
    marginBottom: "1rem",
  },
  roleFieldset: {
    marginTop: "1rem",
    marginBottom: "0.5rem",
    width: "100%",
  },
  legend: {
    color: colors.text.cardForeground,
    fontSize: "0.875rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    "&.Mui-focused": {
      color: colors.text.cardForeground,
    },
  },
  radioRow: {
    justifyContent: "space-between",
  },
  radioLabel: {
    color: colors.text.cardForeground,
    fontWeight: 700,
  },
  field: {
    "& .MuiInputLabel-root": {
      color: colors.text.cardForeground,
    },
    "& .MuiOutlinedInput-root": {
      color: colors.text.cardForeground,
    },
  },
  submit: {
    width: "100%",
    marginTop: "0.5rem",
    textTransform: "none",
    backgroundColor: colors.primary.main,
    color: colors.text.primaryForeground,
  },
};
