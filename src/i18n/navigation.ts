import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Replaces next-intl v3's createLocalizedPathnamesNavigation (removed in v4).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
