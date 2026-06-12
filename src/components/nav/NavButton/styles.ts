import { colors } from "@/styles/colors";
import breakpoints from "@/styles/breakpoints";

export default {
  // Base styles shared by every nav link (was:
  // "flex h-10 font-semibold items-center justify-center lg:hover:gradient1").
  base: {
    display: "flex",
    height: "2.5rem",
    fontWeight: 600,
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "inherit",
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      "&:hover": {
        background: colors.gradients.gradient1,
      },
    },
  },
};
