import { colors } from "@/styles/colors";

const base = {
  display: "inline-block",
  textAlign: "center",
  borderRadius: "0.5rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: colors.border.default,
  paddingInline: "0.75rem",
  paddingBlock: "0.5rem",
  minHeight: "2.25rem",
  cursor: "pointer",
  transitionProperty: "color, background-color",
  transitionDuration: "500ms",
  transitionTimingFunction: "ease-in-out",
  "&:hover": {
    color: colors.background.default,
    backgroundColor: colors.text.cardForeground,
  },
};

export default {
  unselected: {
    ...base,
    backgroundColor: colors.background.default,
    color: colors.text.primary,
  },
  selected: {
    ...base,
    background: colors.gradients.gradient2,
    color: colors.background.default,
  },
};
