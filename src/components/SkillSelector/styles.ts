import { colors } from "@/styles/colors";

export default {
  // flex flex-wrap justify-between
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "0.25rem",
  },
  // Shared chip shape, replacing the previous toggle button classes:
  //   inline-flex items-center px-2.5 py-0.5 mt-1 rounded-lg
  //   text-xs font-medium border  (≥24px tall touch target)
  chip: {
    height: "auto",
    minHeight: "1.5rem",
    marginTop: "0.25rem",
    borderRadius: "0.5rem",
    border: `1px solid ${colors.border.default}`,
    fontSize: "0.75rem",
    fontWeight: 500,
    "& .MuiChip-label": {
      paddingInline: "0.625rem",
      paddingBlock: "0.125rem",
    },
  },
  // Unselected: bg-background, hover -> text-background bg-card-foreground
  chipUnselected: {
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    transition: "color 500ms ease-in-out, background-color 500ms ease-in-out",
    "&:hover, &.MuiChip-clickable:hover": {
      backgroundColor: colors.text.cardForeground,
      color: colors.background.default,
    },
  },
  // Selected: gradient2 text-background (no hover colour change)
  chipSelected: {
    background: colors.gradients.gradient2,
    color: colors.background.default,
    "&:hover, &.MuiChip-clickable:hover": {
      background: colors.gradients.gradient2,
      color: colors.background.default,
    },
    // keep the delete (X) icon visible on the gradient and a comfortable size
    "& .MuiChip-deleteIcon": {
      color: colors.background.default,
      fontSize: "1rem",
      "&:hover": { color: colors.background.default, opacity: 0.8 },
    },
  },
};
