"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";

/**
 * Full provider stack for the MUI + Emotion + next-themes setup.
 *
 * - AppRouterCacheProvider: SSR-safe Emotion cache for the App Router.
 * - MuiThemeProvider + CssBaseline: applies the single theme and global resets.
 * - NextThemesProvider: kept as-is; it toggles the `.dark` class on <html>,
 *   which the theme's `cssVariables.colorSchemeSelector: 'class'` reads to
 *   switch color schemes with zero extra JS. We do NOT switch MUI themes here.
 *
 * Must remain a Client Component (Emotion cache + next-themes need the client).
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
